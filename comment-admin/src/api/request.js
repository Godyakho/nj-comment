/******************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Wed Apr 11 2018
 *  File : request.js
 *******************************************/
import fetch from '@/api/fetch'

export function getComment (params) {
  return fetch({
    url: '/comment/get',
    method: 'post',
    data: params
  })
}
