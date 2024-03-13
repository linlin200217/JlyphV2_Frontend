import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const userSelection = defineStore('userSelection', () => {

  const userJsonData = ref()
  const dataAttributes = ref<string[]>([])
  const Categorical = ref()
  const Numerical = ref()
  const selectedImageId = ref('')
  const userPrompt = ref<string | null>()

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

  const mask_order = computed(() => {
    let order: Array<string> = []
    for (let i = 0; i < maskData.value.length; i++) {
      if (maskData.value[i].categorical) {
        order.push(maskData.value[i].categorical)
      } else if (maskData.value[i].numerical) {
        order.push(maskData.value[i].numerical)
      }
    }
    return order
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

  const defalt_layer_example = ref([])
  const generated_final_images = ref([])
  const generated_cartoon_images = ref([])
  const startChatting = ref(false)
  const showVegaEmbedding = ref(false)
  const vegaSpec = ref()

  return {
    userJsonData,
    dataAttributes,
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
    mask_order,
    rgba_images_by_category,
    defalt_layer_example,
    generated_final_images,
    generated_cartoon_images,
    startChatting,
    showVegaEmbedding,
    vegaSpec
  }
})
