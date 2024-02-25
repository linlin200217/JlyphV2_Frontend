import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userSelection = defineStore('userSelection', () => {

  const selectedImageId = ref('')
 
  return {
    selectedImageId,
  }
})
