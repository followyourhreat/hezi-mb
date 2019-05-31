/*
*自定义网络请求
*/
import Vue from "vue"
// 基础URL
const baseUrl = process.env.NODE_ENV=="production"?"/index.php/":"http://120.24.55.58:8139/index.php/";

const formatParams = params => {
  Object.keys(params).forEach(key => {
    (params[key] === '' || params[key] === undefined) && delete params[key]
  })
  return params
}

const upload = (url, params) => {
  params = formatParams(params)
  let formData = new FormData();
  for (let [key, value] of Object.entries(params)) {
    formData.append(key, value)
  }
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', baseUrl + url, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let obj = xhr.response;
          try{
            obj = JSON.parse(obj);
          } catch(err) {
            obj = '';
          }
          resolve(obj);
        } else {
          reject(xhr)
        }
      }
    }
    xhr.send(formData)
  })
}

Vue.prototype.$upload = upload