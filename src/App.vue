<template lang="pug">
v-app#app
  v-app-bar(color="#F48FB1")
    v-app-bar-title.text-white
      h2 番茄鐘
      h5 開始前要先新增代辦事項唷٩(◦`꒳´◦)۶
    v-spacer
    v-btn(icon to='/')
      v-icon(color="white") mdi-timer
    v-btn(icon to='/list')
      v-icon(color="white")  mdi-format-list-bulleted
    v-btn(icon to='/settings')
      v-icon(color="white")  mdi-cog
    v-btn(icon v-if="notify" @click="toggleNotify")
      v-icon(color="white") mdi-bell
    v-btn(icon v-else @click="toggleNotify")
      v-icon(color="white")  mdi-bell-off
  v-main
    v-container
      router-view(v-slot="{ Component }")
        keep-alive(include="HomeView")
          component(:is="Component")
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'
const list = useListStore()
const { notify } = storeToRefs(list)
const { toggleNotify } = list
</script>
<style>
#app {
  background: url('./image/tomato2.jpg') no-repeat center center fixed;
  background-size: cover;
}
</style>
