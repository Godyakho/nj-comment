/******************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Wed Apr 11 2018
 *  File : fetch.js
 *******************************************/
import axios from 'axios'

const service = axios.create({
  baseURL: 'http://127.0.0.1:7001/',
  timeout: 5000
})

export default service
