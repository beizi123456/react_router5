import axios from "axios";
import {store} from '../redux/store'

axios.defaults.baseURL = 'http://localhost:9000'


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    store.dispatch({
        type: 'change_isLoading',
        payload:true
    })
    return config;

  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //隐藏loading
    store.dispatch({
        type: 'change_isLoading',
        payload:false
    })
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //隐藏loading
    store.dispatch({
        type: 'change_isLoading',
        payload:false
    })
    return Promise.reject(error);
  });
