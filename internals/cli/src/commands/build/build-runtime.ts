import path from 'node:path'
import type { UserConfig } from 'vite'
import { build } from 'vite'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { logGreen } from '../../shared/utils'
import type { BuildUiOption, BaseConfig } from './build-ui'
import { pathFromPackages, getBaseConfig, requireModules } from './build-ui'

async function batchBuildAll({ vueVersion, tasks, message, emptyOutDir, npmScope, min }) {
  const rootDir = pathFromPackages('')
  const runtimeDir = `dist${vueVersion}/@opentiny/vue/runtime`
  const outDir = path.resolve(rootDir, runtimeDir)

  await batchBuild({
    vueVersion,
    tasks,
    message,
    emptyOutDir,
    npmScope,
    min
  })

  function toEntry(libs) {
    return libs.reduce((result, { libPath, path: file }) => {
      result[libPath] = pathFromPackages(file)
      return result
    }, {})
  }

  function getExternal() {
    return {
      vue: 'Vue',
      '@vue/composition-api': 'VueCompositionAPI',
      '@opentiny/vue-locale': 'TinyVueLocale',
      '@opentiny/vue-common': 'TinyVueCommon',
      '@opentiny/vue-icon': 'TinyVueIcon'
    }
  }

  async function batchBuild({ vueVersion, tasks, message, emptyOutDir, npmScope, min }) {
    if (tasks.length === 0) return
    logGreen(`====== 开始构建 ${message} ======`)

    const entry = toEntry(tasks)
    const baseConfig = getBaseConfig({
      vueVersion,
      dtsInclude: [] as string[],
      dts: false,
      npmScope,
      isRuntime: true
    } as BaseConfig) as UserConfig

    baseConfig.define = Object.assign(baseConfig.define || {}, {
      'process.env.BUILD_TARGET': JSON.stringify(vueVersion !== '3' ? 'runtime' : 'component'),
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.TINY_MODE': JSON.stringify('pc'),
      'process.env.RUNTIME_VERSION': JSON.stringify(requireModules('packages/renderless/package.json').version),
      'process.env.COMPONENT_VERSION': JSON.stringify(requireModules('packages/vue/package.json').version)
    })

    baseConfig.plugins?.push(
      ...([
        commonjs({
          include: /node_modules/,
          requireReturnsDefault: true,
          defaultIsModuleExports: true,
          // echarts模块本身是esmodules格式不需要经过commonjs转换
          exclude: ['node_modules/echarts/**', 'node_modules/echarts']
        }),
        babel({
          extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
          presets: ['@babel/preset-env']
        })
      ] as any[])
    )

    await build({
      configFile: false,
      ...baseConfig,
      build: {
        emptyOutDir,
        minify: min,
        sourcemap: min,
        rollupOptions: {
          external: (source, importer, isResolved) => {
            if (isResolved || !importer) return false

            return Object.keys(getExternal()).includes(source)
          },
          output: {
            strict: false,
            globals: {
              ...getExternal()
            },
            assetFileNames: ({ name }) => {
              if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
                return 'style/images/[name]-[hash][extname]'
              }

              if (/\.css$/.test(name ?? '')) {
                return `style${min ? '.min' : ''}[extname]`
              }

              return 'style/[name]-[hash][extname]'
            }
          }
        },
        lib: {
          entry,
          formats: ['es'],
          fileName: (format, entryName) => `${entryName}${min ? '.min' : ''}.${format === 'es' ? 'm' : ''}js`,
          name: 'Tiny'
        },
        outDir
      }
    })
  }
}

function getEntryTasks() {
  return [
    {
      path: 'vue-icon/index.ts',
      libPath: 'tiny-vue-icon'
    },
    {
      path: 'vue-locale/src/index.ts',
      libPath: 'tiny-vue-locale'
    },
    {
      path: 'vue-common/src/index.ts',
      libPath: 'tiny-vue-common'
    },
    {
      path: 'vue/app.ts',
      libPath: 'tiny-vue'
    }
  ]
}

export async function buildRuntime({
  vueVersions = ['2', '3'],
  clean = false,
  scope = 'opentiny',
  min = false
}: BuildUiOption) {
  // 是否清空构建目录
  let emptyOutDir = clean

  // 要构建的模块
  let tasks = [...getEntryTasks()]

  // 要构建的vue框架版本
  for (const vueVersion of vueVersions) {
    const message = `TINY for vue${vueVersion}: runtime`

    // 这里注意不能使用多入口打包，rollup多入口打包会抽取公共依赖（再由inlineChunksPlugin插件处理），导致组件库运行时加载失败
    for (let i = 0; i < tasks.length; i++) {
      await batchBuildAll({ vueVersion, tasks: [tasks[i]], message, emptyOutDir, npmScope: scope, min })
    }
    // 确保只运行一次
    emptyOutDir = false
  }
}
