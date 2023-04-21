## 开发

```bash
# 克隆项目
git clone https://gitee.com/y_project/RuoYi-Vue

# 进入项目目录
cd ruoyi-ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 http://localhost:80

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```
#### 请求示例

```js
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      token: false, // 是否需要token(默认需要)
      cleanEmpty: false, // 是否需要清除空字符串字段(默认需要)
      repeatSubmit: false, // 是否需要防止重复请求(默认需要)
      alertErrorMsg: false, // 是否需要默认弹出错误消息提示框(默认需要)
    },
    method: 'get',
    timeout: 20000
  })
}
```

```js
使用的字典
性别：sys_user_sex
有无：other_diseases
档案状态、个案状态、在册状态、在册情况：wv_archives_status
```

