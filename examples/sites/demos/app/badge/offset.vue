<template>
  <p>使用字符串 offset=['0', '-50%']</p>
  <tiny-badge :value="2" :offset="['0', '-50%']">我的待办</tiny-badge>
  <p>使用数字 offset=[0, -10]</p>
  <tiny-badge :value="2" :offset="[0, -10]">我的待办</tiny-badge>
</template>

<script>
import { Badge } from '@opentiny/vue'

export default {
  components: {
    TinyBadge: Badge
  }
}
</script>
