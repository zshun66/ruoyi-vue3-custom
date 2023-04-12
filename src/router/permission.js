/*
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-11 16:33:20
 * @FilePath: \ruoyi-ui\src\router\permission.js
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import router from '@/router/index'
import store from '@/store/index'
import { getToken } from '@/utils/auth'
import { isRelogin } from '@/utils/request'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
	NProgress.start()
	if (getToken()) {
		to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
		/* has token*/
		if (to.path === '/login') {
			next({ path: '/' })
			NProgress.done()
		} else {
			if (store.getters.roles.length === 0) {
				isRelogin.show = true
				// 判断当前用户是否已拉取完user_info信息
				store.dispatch('GetInfo').then(() => {
					isRelogin.show = false
					store.dispatch('GenerateRoutes').then(accessRoutes => {
						// 根据roles权限生成可访问的路由表
						router.addRoutes(accessRoutes) // 动态添加可访问路由表
						next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
					})
				}).catch(err => {
					store.dispatch('LogOut').then(() => {
						Message.error(err)
						next({ path: '/' })
					})
				})
			} else {
				next()
			}
		}
	} else {
		// 没有token
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免登录白名单，直接进入
			next()
		} else {
			next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done()
})
