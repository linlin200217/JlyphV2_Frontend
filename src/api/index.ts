import request from './request'

enum API {
  UPLOAD_POST = '/upload',
  PRE_GENERATE_POST = '/pregenerate',
  MASKSELECT_POST = '/maskselect',
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
  request.post<any, pregenerate_response_form>(API.PRE_GENERATE_POST, data,  {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })

// --------- maskselect ---------


interface maskselect_request_form {
  widget: {
    'x': number,
    'y': number,
    'width': number,
    'height': number,
  }
  image_id: string
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

// --------- image ---------
export const get_image_url = (image_id: string) => {
  return import.meta.env.VITE_BASE_URL + '/image/' + image_id
}
