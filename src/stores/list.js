import { defineStore } from 'pinia'

const time = parseInt(import.meta.env.VITE_TIME)
const timebreak = parseInt(import.meta.env.VITE_TIMEBREAK)

export const useListStore = defineStore({
  id: 'list',
  state () {
    return {
      items: [],
      finished: [],
      current: '',
      id: 1,
      break: false,
      timeleft: time,
      notify: false
    }
  },
  actions: {
    addItem (data) {
      this.items.push({
        id: this.id++,
        name: data,
        edit: false,
        model: data
      })
    },
    delItem (i) {
      this.items.splice(i, 1)
    },
    editItem (i) {
      this.items[i].edit = true
    },
    confirmEditItem (i) {
      this.items[i].name = this.items[i].model
      this.items[i].edit = false
    },
    cancelEditItem (i) {
      this.items[i].model = this.items[i].name
      this.items[i].edit = false
    },
    countdown () {
      this.timeleft--
    },
    start () {
      this.current = this.break ? '休息一下' : this.items.shift().name
    },
    finish () {
      if (!this.break) {
        this.finished.push({
          name: this.current,
          id: this.id++
        })
      }
      const oldCurrent = this.current
      const notification = new Notification('事項完成', {
        body: oldCurrent,
        icon: 'https://github.com/rogeraabbccdd.png'
      })
      this.current = ''
      if (this.items.length > 0) {
        this.break = !this.break
      }
      this.timeleft = this.break ? timebreak : time
    },
    toggleNotify () {
      if (!this.notify && 'Notification' in window) {
        Notification.requestPermission(permission => {
          if (permission === 'granted') {
            this.notify = true
          }
        })
      } else {
        this.notify = false
      }
    }
  }
})
