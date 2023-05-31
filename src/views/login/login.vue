<template>
  <div class="login-page">
    <el-form
			class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="loginFormRules"
    >
      <h3 class="title">萍乡市预防接种门诊系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
					<template #prefix>
						<svg-icon class="input-prefix-icon" icon-class="people2" />
					</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          :type="passwordInputType"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
					<template #prefix>
						<svg-icon class="input-prefix-icon" icon-class="password" />
					</template>
					<template #suffix>
						<svg-icon class="eye-suffix-icon" :icon-class="passwordSuffixIcon" @click="handlePasswordSuffixIcon" />
					</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
					class="captcha-input"
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          @keyup.enter="handleLogin"
        >
					<template #prefix>
						<svg-icon class="input-prefix-icon" icon-class="validCode" />
					</template>
        </el-input>
        <div class="captcha-box">
          <img :src="captchaUrl" @click="getCaptcha" />
        </div>
      </el-form-item>
			<div class="forget-register-box">
				<el-checkbox class="forget-checkbox" v-model="loginForm.rememberMe">记住密码</el-checkbox>
				<router-link class="register-btn" :to="'/register'" v-if="registerEnabled">立即注册</router-link>
			</div>
			<el-button
				class="login-btn"
				:loading="loading"
				type="primary"
				@click.prevent="handleLogin"
			>
				<span>{{ loading ? '登 录 中...' : '登 录' }}</span>
			</el-button>
    </el-form>
  </div>
</template>

<script>
import useUserStore from '@/store/modules/user'
import { getCodeImg } from '@/api/login'
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: 'Login',
  data() {
    return {
			// 登录表单
      loginForm: {
        username: 'admin',
        password: 'admin123',
        rememberMe: false,
        code: '',
        uuid: '',
      },
			// 登录表单验证规则
      loginFormRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入您的账号' },
        ],
        password: [
          { required: true, trigger: "blur", message: '请输入您的密码' },
        ],
        code: [
					{ required: true, trigger: "change", message: '请输入验证码' }
				],
      },
			// 是否显示密码
			showPassword: false,
      // 验证码开关
      captchaEnabled: false,
      // 注册开关
      registerEnabled: false,
			// 图形验证码地址
      captchaUrl: '',
			// 登录按钮是否加载中状态
      loading: false,

			// 重定向地址
      redirect: undefined,
    }
  },
  created() {
    this.getCaptcha()
    this.getCookieInfo()
  },
  methods: {
		// 获取图形验证码
    async getCaptcha() {
			let res = await getCodeImg()
			if (!res) return
			this.captchaEnabled = res.captchaOnOff === undefined ? true : res.captchaOnOff
			if (this.captchaEnabled) {
				this.captchaUrl = 'data:image/gif;base64,' + res.img
				this.loginForm.uuid = res.uuid
			}
    },
		// 获取保存Cookie的用户账号密码等信息
    getCookieInfo() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
			this.loginForm.username = username === undefined ? this.loginForm.username : username
			this.loginForm.password = password === undefined ? this.loginForm.password : decrypt(password)
			this.loginForm.rememberMe = rememberMe === undefined ? false : Boolean(rememberMe)
    },
		// 点击密码输入框的后缀图标
		handlePasswordSuffixIcon() {
			this.showPassword = !this.showPassword
		},
		// 点击登录
    async handleLogin() {
			let valid = await this.$refs.loginForm.validate()
			if (!valid) return
			this.loading = true
			if (this.loginForm.rememberMe) {
				Cookies.set('username', this.loginForm.username, { expires: 30 })
				Cookies.set('password', encrypt(this.loginForm.password), { expires: 30 })
				Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 })
			} else {
				Cookies.remove('username')
				Cookies.remove('password')
				Cookies.remove('rememberMe')
			}
			const userStore = useUserStore()

			userStore.Login(this.loginForm).then(() => {
				this.$router.push({ path: this.redirect || '/' })
			}).catch(() => {
				this.loading = false
				if (this.captchaEnabled) this.getCaptcha()
			})
    },
  },
	computed: {
		// 密码输入框类型
		passwordInputType() {
			return this.showPassword ? 'text' : 'password'
		},
		// 密码输入框后缀图标
		passwordSuffixIcon() {
			return this.showPassword ? 'eye-close' : 'eye-open'
		}
	},
	watch: {
    $route: {
      handler: function (from, to) {
        this.redirect = from.query?.redirect
      },
      immediate: true,
    },
  },
}
</script>

<style scoped lang="scss">
.login-page {
	width: 100%;
  height: 100%;
  background-image: url('../../assets/images/login-background.png');
  background-size: cover;
	.login-form {
		width: 560px;
		position: absolute;
    top: 50%;
    right: 20%;
		transform: translateY(-50%);
    padding: 60px 80px 60px 80px;
		border-radius: 50px;
		background: #ffffff;
		.title {
			font-size: 34px;
			margin: 0px auto 50px auto;
			text-align: center;
			color: #5f6c80;
		}
		.input-prefix-icon {
			font-size: 30px;
			color: #00C7BA;
			margin-right: 20px;
		}
		.eye-suffix-icon {
			font-size: 24px;
			cursor: pointer;
		}
		.captcha-input {
			width: 63%;
		}
		.captcha-box {
			display: inline-block;
			width: 35%;
			height: 38px;
			margin-left: 2%;
		}
		.captcha-box img {
			width: 100%;
			height: 100%;
			cursor: pointer;
			vertical-align: middle;
		}
		.forget-register-box {
			margin-top: 30px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.forget-checkbox {
				:deep(.el-checkbox__inner:hover) {
					border-color: #00C7BA;
				}
				:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
					background-color: #00C7BA;
					border-color: #00C7BA;
				}
				:deep(.el-checkbox__input.is-focus .el-checkbox__inner) {
					border-color: #00C7BA;
				}
				:deep(.el-checkbox__label) {
					color: #00C7BA;
				}
			}
			.register-btn {
				color: #00C7BA;
			}
		}
		.login-btn {
			margin-top: 30px;
			width: 100%;
			height: 50px;
			background-color: #00c7ba;
			color: white;
			font-size: 20px;
			border: none;
		}

		:deep(.el-form-item) {
			margin-top: 40px;
			margin-bottom: 0px;
		}
		:deep(.el-input .el-input__wrapper) {
			border-radius: 0px;
			box-shadow: none;
			border-bottom: 2px solid #00c7ba;
			padding: 0px 0px;
		}
		:deep(.el-input input) {
			border-radius: 0;
			font-size: 20px;
			height: 36px;
    	line-height: 36px;
		}
	}
}
</style>
