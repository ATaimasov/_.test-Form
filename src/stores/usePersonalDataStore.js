import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePersonalDataStore = defineStore('personalData', () => {
  const person = ref({
    name: '',
    age: null,
    children: [],
  })
  
  const savePersonalData  = (data) => {
    person.value = { ...data }
  }

  return { person, savePersonalData  }
})
