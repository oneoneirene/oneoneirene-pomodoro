import { defineStore } from 'pinia'

export const useSettingsStore = defineStore({
  id: 'settings',
  state () {
    return {
      selectedAlarm: 1,
      alarms: [
        { id: 4, name: 'Alarm', file: new URL('../assets/alarm.mp3', import.meta.url).href },
        { id: 3, name: 'Yay', file: new URL('../assets/yay.mp3', import.meta.url).href },
        { id: 2, name: 'Yummy', file: new URL('../assets/Yummy Flavor.mp3', import.meta.url).href },
        { id: 1, name: 'Lucky', file: new URL('../assets/Lucky .mp3', import.meta.url).href }
      ]
    }
  },
  getters: {
    selectedAlarmFile () {
      const idx = this.alarms.findIndex(a => a.id === this.selectedAlarm)
      return this.alarms[idx].file
    }
  }
})
