<template>
  <div
    role="carousel-item"
    v-show="state.ready"
    :class="
      m([
        'absolute top-0 left-0 w-full h-full inline-block overflow-hidden z-0',
        state.carouselParent.type === 'card' ? 'w-1/2 transition-transform duration-[400ms] ease-in-out' : '',
        state.hover ? 'opacity-[12]' : '',
        state.animate && !state.moving ? 'transition-transform duration-[400ms] ease-in-out' : '',
        state.inStage && state.carouselParent.type === 'card' ? 'cursor-pointer z-[1] group' : '',
        state.active ? 'z-[2]' : ''
      ])
    "
    :style="state.getTransform"
    @click="handleItemClick"
  >
    <div
      v-if="state.carouselParent.type === 'card'"
      v-show="!state.active"
      class="absolute h-full top-0 left-0 w-full opacity-[24] duration-200 group-hover:opacity-[12]"
      :class="{ 'opacity-[12]': state.inStage && state.carouselParent.type === 'card' && state.hover }"
    ></div>
    <slot></slot>
    <div
      v-if="state.hasTitle"
      class="absolute bottom-0 h-6 w-full text-left text-color-text-inverse leading-6 bg-color-text-disabled"
    >
      <span class="py-0 px-3 text-xs w-4/5 inline-block text-ellipsis overflow-hidden whitespace-nowrap">{{
        title
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { renderless, api } from '@opentiny/vue-renderless/carousel-item/vue'
import { props, setup, defineComponent } from '@opentiny/vue-common'

export default defineComponent({
  props: [...props, 'name', 'title', 'label'],
  setup(props, context) {
    return setup({ props, context, renderless, api })
  }
})
</script>
