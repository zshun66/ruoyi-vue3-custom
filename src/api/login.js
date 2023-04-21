/*
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-21 09:54:05
 * @FilePath: \ruoyi-ui\src\api\login.js
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import request from '@/utils/request'

// 获取图形验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      token: false,
    },
    method: 'get',
    timeout: 20000
  })
}

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      token: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      token: false
    },
    method: 'post',
    data: data
  })
}

// 获取登录用户的详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 获取登录用户的路由信息
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
