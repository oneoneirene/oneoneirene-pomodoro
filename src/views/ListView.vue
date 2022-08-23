<template lang="pug">
v-row#list
  v-col(cols='12')
    h1.text-center.text-pink-lighten-2 待辦事項
      v-icon(size="x-small") mdi-star-face
  v-col(cols='12')
    v-text-field(
      variant="underlined"
      v-model="newItem"
      append-icon="mdi-plus"
      :rules="[required]"
      @click:append="onInputSubmit"
      @keydown.enter='onInputSubmit'
    )
    v-table#table
      thead
        tr
          th.text-center 名稱
          th.text-center 操作
      tbody
        tr(v-if="items.length === 0")
          td.text-center(colspan="2") 沒有資料
        tr(v-for="(item, i) in items")
          td
            v-text-field(v-if="item.edit" v-model="item.model" autofocus)
            span(v-else) {{ item.name }}
          td
            span(v-if="item.edit")
              v-btn(icon variant="plain" flat color="blue" @click="confirmEditItem(i)")
                v-icon mdi-check
              v-btn(icon variant="plain" flat color="pink" @click="cancelEditItem(i)")
                v-icon mdi-undo
            span(v-else)
              v-btn(icon variant="plain" flat color="blue" @click="editItem(i)")
                v-icon mdi-pencil
              v-btn(icon variant="plain" flat color="pink" @click="delItem(i)")
                v-icon mdi-delete
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'

const newItem = ref('')
const required = value => {
  return !!value
}

const list = useListStore()
const { items } = storeToRefs(list)
const { addItem, delItem, editItem, confirmEditItem, cancelEditItem } = list

const onInputSubmit = () => {
  const valid = required(newItem.value)
  if (!valid) return
  addItem(newItem.value)
  newItem.value = ''
}
</script>
<style>
#table {
  background: pink;
}
</style>
