<template lang="pug">
v-row#settings
  v-col(cols="12")
    h1.text-center.text-pink-lighten-2 設定
      v-icon(size="x-small") mdi-heart-cog
  v-col(cols="12")
    v-table#table
      thead
        tr
          th.text-center 名稱
          th.text-center 試聽
          th.text-center 選擇
      tbody
        tr(v-for="alarm in alarms")
          td.text-center {{ alarm.name }}
          td.text-center
            audio(controls :src="alarm.file")
          td
            v-radio(v-model="selectedAlarm" :value="alarm.id")
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

const settings = useSettingsStore()
const { selectedAlarm, alarms } = storeToRefs(settings)
</script>
<style>
audio {
  height: 35px;
}
#table {
  background: pink;
}
</style>
