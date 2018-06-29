<template>
    <div class="wrap">
      	<div class="login">
        	<div class="title-container">
                <h1 class="title">{{$t('login.title')}}</h1>
                <el-dropdown style="margin-right:20px;">
                    <span class="el-dropdown-link">
                         <i class="fa fa-globe"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item >
                            <p @click="setLang('zh')">中文</p>
                        </el-dropdown-item>
                        <el-dropdown-item >
                            <p @click="setLang('en')">English</p>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
             <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
                <el-form-item prop="username">
                    <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" :placeholder="$t('form.username')" prefix-icon="fa fa-user-o"/>
                </el-form-item>
                <br/>
                <el-form-item prop="password">
                    <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" :placeholder="$t('form.password')" prefix-icon="fa fa-lock"/>
                    <span class="show-pwd fa"  :class="[ passwordType == 'password'? 'fa-eye': 'fa-eye-slash' ]"  @click="showPwd"></span>
                </el-form-item>
                <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.btn')}}</el-button>
            </el-form>
      	</div>
    </div>
</template>

<script>
    import {_loginInApi, _loginApi } from '@/api/api.js';
    import Cookies from 'js-cookie'
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
            setLang(lang){
                Cookies.set('language',lang);
                this.$i18n.locale = lang;
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        _loginInApi(this.loginForm).then(data => {
                            if(data.code == '200'){
                                this.$store.dispatch('logIn', data).then(() => {
                                    let roles = data.data.roles;
                                    if(roles.indexOf("admin") > -1){
                                        this.$router.push('/admin');
                                    }else{
                                        this.$router.push('/admin/demo');
                                    }
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
