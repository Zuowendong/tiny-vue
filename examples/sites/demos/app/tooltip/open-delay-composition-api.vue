<template>
  <div>
    <tiny-tooltip content="延迟 2000ms 出现" :open-delay="2000">
      <button class="tiny-button tiny-button--primary">延迟 2s 出现</button>
    </tiny-tooltip>
    <tiny-tooltip content="2000ms后自动隐藏" :hide-after="2000">
      <button class="tiny-button tiny-button--primary">2s 后自动隐藏</button>
    </tiny-tooltip>
  </div>
</template>

<script setup lang="jsx">
import { Tooltip as TinyTooltip } from '@opentiny/vue'
</script>
