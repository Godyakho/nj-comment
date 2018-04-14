/******************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Wed Apr 11 2018
 *  File : request.js
 *******************************************/
import fetch from '@/api/fetch'

//  评论
export function GetComment (params) {
  return fetch({
    url: '/comment/get',
    method: 'post',
    data: params
  })
}

export function CreateComment (params) {
  return fetch({
    url: '/comment/create',
    method: 'post',
    data: params
  })
}

// 添加活动
export function CreateCase (params) {
  return fetch({
    url: '/case/create',
    method: 'post',
    data: params
  })
}

export function GetCase (params) {
  return fetch({
    url: '/case/get',
    method: 'post',
    data: params
  })
}

// 添加用户
export function CreateUser (params) {
  return fetch({
    url: '/user/create',
    method: 'post',
    data: params
  })
}
