<template lang="pug">
v-card#card
  v-row.text-center#home
    v-col(cols="12")
      h1.text-white {{ currentText }}
      h1.text-white {{ timeText }}
    v-col(cols="12")
      v-btn.mx-3(icon color="#white" v-if="status !== 1" @click="startTimer")
        v-icon(color="#F48FB1") mdi-play
      v-btn.mx-3(icon color="blue-lighten-2" v-else @click="pauseTimer")
        v-icon(icon color="white") mdi-pause
      v-btn.mx-3(icon color="pink-lighten-1" v-if="current.length > 0" @click="finishTimer(true)")
        v-icon(icon color="white") mdi-skip-next
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'
import { useSettingsStore } from '@/stores/settings'

const list = useListStore()
const { current, items, timeleft } = storeToRefs(list)
const { countdown, start, finish } = list

const settings = useSettingsStore()
const { selectedAlarmFile } = storeToRefs(settings)

const currentText = computed(() => {
  return current.value.length > 0 ? current.value : items.value.length > 0 ? '點擊開始' : '沒有事項'
})
const timeText = computed(() => {
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})

let timer
// 0 = 停止
// 1 = 倒數中
// 2 = 暫停
const status = ref(0)

const pauseTimer = () => {
  status.value = 2
  clearInterval(timer)
}

const finishTimer = (skip) => {
  clearInterval(timer)
  status.value = 0
  finish()
  if (!skip) {
    const audio = new Audio()
    audio.src = selectedAlarmFile.value
    audio.play()
  }
  if (items.value.length > 0) {
    startTimer()
  }
}

const startTimer = () => {
  if (status.value === 0 && items.value.length > 0) {
    start()
  }
  if (current.value.length > 0) {
    status.value = 1
    timer = setInterval(() => {
      countdown()
      if (timeleft.value === 0) {
        finishTimer(false)
      }
    }, 1000)
  }
}
</script>
<style>
#card {
  margin: auto;
  width: 300px;
  border: none;
  background: #F48FB1;
  top: 100px;
}
</style>
