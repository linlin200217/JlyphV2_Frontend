import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const userSelection = defineStore('userSelection', () => {

  const Categorical = ref()
  const Numerical = ref()
  const selectedImageId = ref('')

  const Categorical_num = computed(() => {
    if (Categorical.value) {
      let obj = Categorical.value
      console.log(Object.keys(obj).length);
      
      return Object.keys(obj).length;
    } else {
      return 0;
    }
  })

  const Numerical_num = computed(() => {
    if (Numerical.value) {
      let obj = Numerical.value
      return Object.keys(obj).length;
    } else {
      return 0;
    }
  })

  return {
    Categorical,
    Categorical_num,
    Numerical,
    Numerical_num,
    selectedImageId,
  }
})
