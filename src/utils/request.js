import router from '@/router';
import store from '@/store';
import { getToken, removeToken } from '@/utils/auth';
import axios from 'axios';
import { Message } from 'element-ui';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response

    // // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(res.message || 'error')
    // } else {
    //   return res
    // }
  },
  error => {
    let text = ''

    if (error.response.status === 422) {
      Object.values(error.response.data.errors).forEach(function (values, key) {

        if (!key) {
          text += '<hr style="height:1px;border:none;color:red;background-color:red;" />';
        }

        values.forEach(function (value) {
          text += '<p>' + value + '</p>'
        })

      })
    }

    if (error.response.status === 500) {
      text = "<p>" + error.response.data.message + "</p>";
    }

    if (text) {

      Message({
        message: '<b>Atenção</b>' + text,
        type: 'error',
        duration: 5 * 1000,
        dangerouslyUseHTMLString: true
      })

    }

    if (error.response.status === 403) {

      router.push({
        name: 'dashboard'
      });

    }

    if (error.response.status === 401) {

      removeToken()

      if (location.hash.indexOf('login') === -1) {

        setTimeout(() => {
          location.reload()
        }, 1000);

      }

    }

    return Promise.reject(error)
  }
)

export default service
