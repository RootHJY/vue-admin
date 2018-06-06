<template>
  	<div class="login">
    	<div class="title-container">
            <h3 class="title">{{$t('login.title')}}</h3>
        </div>
         <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <el-form-item prop="username">
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" prefix-icon="el-icon-search"/>
            </el-form-item>
            <br/>
            <el-form-item prop="password">
                <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" prefix-icon="el-icon-search"/>
                <span class="show-pwd" @click="showPwd">
                    look
                </span>
            </el-form-item>
            <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.btn')}}</el-button>
        </el-form>
  	</div>
</template>

<script>
    import {_loginInApi, _loginApi } from '@/api/api.js';

    export default { 
      	name: 'login',
     	data () {
            const validateUsername = (rule, value, callback) => {
                if (!value) {
                    callback(new Error(this.$t("error.username")))
                }else{
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (!value) {
                    callback(new Error(this.$t("error.password")))
                }else{
                    callback()
                }
            }
        	return {
                id: 1,
                loading: false,
                loginForm: {
                    username: '',
                    password: '',
                },
                loginRules: {
                    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
                },
                passwordType: 'password',
        	}
      	},
        created() {

        },
        methods: {
            showPwd() {
              if (this.passwordType === 'password') {
                    this.passwordType = 'text'
                } else {
                    this.passwordType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        _loginInApi(this.loginForm).then(data => {
                            if(data.code == '200'){
                                this.$store.dispatch('logIn',data).then(() => {
                                    console.log(data)
                                    this.$router.push('/admin');
                                })
                            }
                        })
                    }else{
                        console.log('error submit!!')
                    }
                })
            }
        }
    }
</script>
