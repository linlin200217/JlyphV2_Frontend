import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userData = defineStore('dataProcess', () => {

  const dataTitle = ref('')
  const categorical = ref({})
  const numerical = ref({})
  const wordcloud = ref({})
  const showLoading = ref(false)

  const cat_key = ref([])
  const num_key = ref([])
  const word_data = ref([])

  const categorical_result = ref([])
  const numerical_result = ref([])

  const modi_cat_result = ref([])
  const modi_num_result = ref([])
  const latitude_column = ref('')
  const longitude_column = ref('')

  const process_result = ref('')
  const result_image_id = ref('')

 

  function $reset() {
    categorical_result.value = []
    numerical_result.value = []
    modi_cat_result.value = []
    modi_num_result.value = []
  }

  return {
    dataTitle,
    categorical,
    numerical,
    wordcloud,
    showLoading,
    cat_key,
    num_key,
    word_data,
    numerical_result,
    categorical_result,
    modi_cat_result,
    modi_num_result,
    process_result,
    result_image_id,
    latitude_column,
    longitude_column,
    $reset,
  }
})
