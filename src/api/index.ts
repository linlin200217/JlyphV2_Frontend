import request from './request'

enum API {
  UPLOAD_POST = '/upload',
  PRE_GENERATE_POST = '/pregenerate',
  MASKSELECT_POST = '/maskselect',
  GENERATE_ELEMENT_POST = '/generate_element',
  REGENERATE = '/regenerate',
  GENERATE_NUMERICAL_ELEMENT = '/generate_numerical_element',
  GENERATE_EXAMPLE = '/generate_example',
}

// --------- upload ---------
interface upload_request_form {
  file: File
}

interface upload_response_form {
  data_title: string
  Categorical: Array<any>
  Numerical: Array<any>
  Wordcloud: Array<string>
}

export const upload_post = (data: upload_request_form) =>
  request.post<any, upload_response_form>(API.UPLOAD_POST, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    },
  })

// --------- pregenerate ---------
interface pregenerate_request_form {
  user_prompt: string
}

interface pregenerate_response_form {
  status: string
  image_id: Array<string>
}

export const pregenerate_post = (data: pregenerate_request_form) =>
  request.post<any, pregenerate_response_form>(API.PRE_GENERATE_POST, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })

// --------- maskselect ---------
interface widget_form {
  x: number,
  y: number,
  width: number,
  height: number,
}

interface maskselect_request_form {
  widget: widget_form
  image_id: string,
  mask_refine: number
}

interface maskselect_response_form {
  mask_image_id: string
}

export const maskselect_post = (data: maskselect_request_form) =>
  request.post<any, maskselect_response_form>(API.MASKSELECT_POST, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })

// --------- generate_element ---------
interface all_masks {
  Colname: string,
  Widget: widget_form,
  Refine_num: number,
  Class: string // ( "Categorical"/"Numerical" )
}

interface generate_element_request_form {
  prompt: string,
  mask_forall: Array<all_masks>,
  chosen_image_id: string
}

interface generate_element_response_form {
  rgba_images_by_category: any
}

export const generate_element_post = (data: generate_element_request_form) =>
  request.post<any, generate_element_response_form>(API.GENERATE_ELEMENT_POST, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })

// --------- regenerate ---------
interface regenerate_request_form {
  image_id: string,
  mask: {
    Colname: string,
    Widget: widget_form,
    Refine_num: number
  },
  prompt?: string,
  whole_prompt?: string
}

interface regenerate_response_form {
  re_generate_rgba_id: string
}

export const regenerate_post = (data: regenerate_request_form) =>
  request.post<any, regenerate_response_form>(API.REGENERATE, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })

// --------- generate_numerical_element ---------
interface generate_numerical_element_request {
  mask_forall: Array<all_masks>,
  chosen_image_id: string
}

interface outlier_element {
  Colname: string,
  widget: widget_form,
  Refine_num: number,
  Class: string // ( "Categorical"/"Numerical" )
  outlier_id: string,
  Layer: number,
  Form: string,
  Gap: number
}

interface generate_numerical_element_response {
  defalt_layer_forexample: Array<outlier_element>
}

export const generate_numerical_element = (data: generate_numerical_element_request) =>
  request.post<any, generate_numerical_element_response>(API.GENERATE_NUMERICAL_ELEMENT, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })

// --------- generate_example ---------
interface outlier_element_adjusted {
  "Colname": string,
  "widget": widget_form,
  "Refine_num": number,
  "Class": string, // ( "Categorical"/"Numerical" )
  "outlier_id": string,
  "Layer": number,
  "Form": string, // 'Size' / 'Number_Vertical', 'Number_Horizontal', 'Number_Path', None,
  "Gap": number // ,None,
}

interface generate_example_request {
  dic_array: Array<outlier_element_adjusted>
  image_id: string
}

interface generate_example_response {
  example: string
}
export const generate_example = (data: generate_example_request) =>
  request.post<any, generate_example_response>(API.GENERATE_EXAMPLE, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })

// --------- image ---------
export const get_image_url = (image_id: string) => {
  return import.meta.env.VITE_BASE_URL + '/image/' + image_id
}
