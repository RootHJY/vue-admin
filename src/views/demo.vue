<template>
  	<div class="hello">
    	<h1>{{$t("pageTitle")}}</h1>
        <br/>
        <br/>
        <el-row>
            <el-button type="danger" @click="setLang('zh')">中文</el-button> 
            <el-button type="success"  @click="setLang('en')">英文</el-button>
        </el-row>
        <br/>
        <br/>
    	<h2> 
            多语言显示案例: {{$t("navbar.dashboard")}}
        </h2>
        <br/>
        <br/>
        <h3>数据绑定案例:</h3>
        <ul>
            <li>ID:{{ info.id }}</li>
            <li>用户名:{{ info.username }}</li>
            <li>密码:{{ info.password }}</li>
            <li>会员:{{ info.isMember }}</li>
            <li>会员:{{ info.time | formatDateMore }}</li>
        </ul>
        <br/>
        <br/>

        <p v-show="error">多语言错误案例: {{$t("error.password")}}  </p>

        <br/>
        <br/>

       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="活动时间" required>
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="即时配送" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>

            <el-form-item label="活动性质" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="特殊资源" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
  	</div>
</template>

<script>
    import Cookies from 'js-cookie'
    import { _loginApi, _formApi} from '@/api/api.js';
    export default { 
      	name: 'login',
     	data () {
        	return {
                info: '',
                id: "1",
                error: false,
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: this.$t("error.title"), trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: this.$t("error.time"), trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: this.$t("error.time"), trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
        	}
      	},
        created() {
            this.getDate();
        },
        methods: {
            submitForm(formName) {
                let params = this.ruleForm;
                _formApi(params).then(data => {
                    if(data.code == '200'){
                        console.log(data)
                    }
                })

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getDate() {
                let params = { id: this.id };
                _loginApi(params).then(data => {
                    this.error = true;
                    if(data.code == '200'){
                        this.info = data.data;
                    }
                })
            },
            setLang(lang) {
                Cookies.set('language',lang);
                this.$i18n.locale = lang
            }
        }
    }
</script>
