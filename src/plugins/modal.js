/*
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-04 10:49:32
 * @FilePath: \ruoyi-ui\src\plugins\modal.js
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Message, MessageBox, Notification, Loading } from 'element-ui'

let loadingInstance

export default {
  // 消息提示
  msg(content) {
    Message.info(content)
  },
  // 错误消息
  msgError(content) {
    Message.error(content)
  },
  // 成功消息
  msgSuccess(content) {
    Message.success(content)
  },
  // 警告消息
  msgWarning(content) {
    Message.warning(content)
  },

  // 通知提示
  notify(content) {
    Notification.info(content)
  },
  // 错误通知
  notifyError(content) {
    Notification.error(content)
  },
  // 成功通知
  notifySuccess(content) {
    Notification.success(content)
  },
  // 警告通知
  notifyWarning(content) {
    Notification.warning(content)
  },

	// 弹出提示
  alert(content) {
    MessageBox.alert(content, '系统提示')
  },
  // 错误提示
  alertError(content) {
    MessageBox.alert(content, '系统提示', { type: 'error' })
  },
  // 成功提示
  alertSuccess(content) {
    MessageBox.alert(content, '系统提示', { type: 'success' })
  },
  // 警告提示
  alertWarning(content) {
    MessageBox.alert(content, '系统提示', { type: 'warning' })
  },
  // 确认窗体
  confirm(content) {
    return MessageBox.confirm(content, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
  },
  // 提交内容
  prompt(content) {
    return MessageBox.prompt(content, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
  },

  // 打开遮罩层
  loading(content) {
    loadingInstance = Loading.service({
      lock: true,
      text: content,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
  },
  // 关闭遮罩层
  closeLoading() {
    loadingInstance.close()
  }
}
