import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const userSelection = defineStore('userSelection', () => {

  const Categorical = ref()
  const Numerical = ref()
  const selectedImageId = ref('')
  const userPrompt = ref('')

  interface mask_data {
    widget: {
      'x': number,
      'y': number,
      'width': number,
      'height': number,
    },
    image_id: string,
    mask_refine: number,
    categorical: string,
    numerical: string,
    mask_id: string
  }

  const maskData = ref<mask_data[]>([])
  const selectedMaskNumber = computed(() => {
    return maskData.value.length;
  })

  const Categorical_key = computed(() => {
    if (Categorical.value) {
      let obj = Categorical.value
      return Object.keys(obj);
    } else {
      return [];
    }
  })

  const Categorical_num = computed(() => {
    if (Categorical.value) {
      let obj = Categorical.value
      return Object.keys(obj).length;
    } else {
      return 0;
    }
  })
  const Cat_selected = ref<string[]>([])

  const Numerical_key = computed(() => {
    if (Numerical.value) {
      let obj = Numerical.value
      return Object.keys(obj);
    } else {
      return [];
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
  const Num_selected = ref<string[]>([])

  const rgba_images_by_category = ref('')
  const element_key = computed(() => {
    return Object.keys(rgba_images_by_category.value)
  })
  return {
    Categorical,
    Categorical_key,
    Categorical_num,
    Cat_selected,
    Numerical,
    Numerical_key,
    Numerical_num,
    Num_selected,
    userPrompt,
    selectedImageId,
    maskData,
    selectedMaskNumber,
    rgba_images_by_category,
    element_key,
  }
})
