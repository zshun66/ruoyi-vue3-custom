/*
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-12 09:41:10
 * @FilePath: \ruoyi-ui\src\utils\auth.js
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token-Vaccinate'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
