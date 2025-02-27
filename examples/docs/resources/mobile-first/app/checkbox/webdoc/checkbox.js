export default {
  column: '2',
  owner: '',
  demos: [
    {
      demoId: 'basic-usage',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'basic usage'
      },
      desc: {
        'zh-CN': '<p></p>',
        'en-US': '<p>button type</p>'
      },
      codeFiles: ['basic-usage.vue']
    },

    {
      demoId: 'checkbox-group',
      name: {
        'zh-CN': '复选框组',
        'en-US': 'events'
      },
      desc: {
        'zh-CN':
          '<p>通过 `checkbox-group` 元素把多个 `checkbox` 元素管理为一组，在 `checkbox-group` 中使用 `v-model` 绑定 Array 类型的变量即可实现双向绑定。 `checkbox` 的 `label` 属性是其对应的值，若该标签中无内容，则该属性也充当 checkbox 后的介绍。`label` 与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。<p>',
        'en-US': '<p>bbutton click</p>'
      },
      codeFiles: ['checkbox-group.vue']
    },
    {
      demoId: 'group-options',
      name: {
        'zh-CN': '配置式复选框组',
        'en-US': 'events'
      },
      desc: {
        'zh-CN':
          '<p>提供 `options` 属性，支持通过配置对象数组数据的形式来渲染多选框组。使用该属性后，可以不用再在标签中以插槽的形式插入 `checkbox` 或 `checkbox-button` 元素。<br />`options` 对象数组中包括三个字段：`label`、`text`、`events`。<br />另外还提供 `type` 属性，配合 `options` 属性一起使用，默认值为 `checkbox`。还可以配置为 `button`，配置后复选框组将以按钮的形式展示。<p>',
        'en-US': '<p>bbutton click</p>'
      },
      codeFiles: ['group-options.vue']
    },
    {
      demoId: 'indeterminate',
      name: {
        'zh-CN': '全选与半选',
        'en-US': 'events'
      },
      desc: {
        'zh-CN': '<p>在 `checkbox` 元素中配置 `indeterminate` 属性为 true 后，勾选框将展示为半选的样式。<p>',
        'en-US': '<p>bbutton click</p>'
      },
      codeFiles: ['indeterminate.vue']
    },
    {
      demoId: 'min-max',
      name: {
        'zh-CN': '可选数量限制',
        'en-US': 'events'
      },
      desc: {
        'zh-CN': '<p>在 `checkbox-group` 上可通过 `min`、`max` 属性指定可勾选项目的最小、最大值。<p>',
        'en-US': '<p>bbutton click</p>'
      },
      codeFiles: ['min-max.vue']
    },
    {
      demoId: 'checked',
      name: {
        'zh-CN': '当前是否勾选',
        'en-US': 'events'
      },
      desc: {
        'zh-CN': '<p>在 `checked` 当前是否勾选，通过 `disabled` 设置组件是否禁用。<p>',
        'en-US': '<p>bbutton click</p>'
      },
      codeFiles: ['checked.vue']
    },
    {
      demoId: 'vertical-checkbox',
      name: {
        'zh-CN': '垂直布局',
        'en-US': 'events'
      },
      desc: {
        'zh-CN':
          '<p>在 `checkbox-group` 元素上设置 `vertical` 为 true，则其管理的 `checkbox-button` 或 `checkbox` 将展示为垂直布局。<p>',
        'en-US': '<p>bbutton click</p>'
      },
      codeFiles: ['vertical-checkbox.vue']
    },
    {
      demoId: 'content-overflow',
      name: {
        'zh-CN': '内容超出时的提示信息',
        'en-US': 'events'
      },
      desc: {
        'zh-CN':
          '<p>若复选框后的介绍文字超出时，可以通过 Tooltip 组件增加提示信息，鼠标悬停时可提示所有内容。<br />在 `checkbox` 元素上配置 `border` 属性为 true，可显示边框。<p>',
        'en-US': '<p>bbutton click</p>'
      },
      codeFiles: ['content-overflow.vue']
    },
    {
      demoId: 'checkbox-slot',
      name: {
        'zh-CN': '插槽',
        'en-US': 'events'
      },
      desc: {
        'zh-CN': '<p>Checkbox 的内容<p>',
        'en-US': '<p>bbutton click</p>'
      },
      codeFiles: ['checkbox-slot.vue']
    }
  ],
  apis: []
}
