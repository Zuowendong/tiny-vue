<template>
  <tiny-checkbox-group v-model="checkboxGroup" vertical text-color="#666">
    <tiny-checkbox-button v-for="city in cities" :label="city" :key="city">{{ city }}</tiny-checkbox-button>
  </tiny-checkbox-group>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { CheckboxGroup as TinyCheckboxGroup, CheckboxButton as TinyCheckboxButton } from '@opentiny/vue'

const checkboxGroup = ref(['上海'])
const cities = ref(['上海', '北京', '广州', '深圳'])
</script>
