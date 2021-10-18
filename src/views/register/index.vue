<template>
    <el-container class="container">
        <h3 style="align-self: center">Register</h3>
        <el-form :model="form" ref="form" label-width="150px" class="el-form">
            <el-form-item label="Username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="Repeat Password">
                <el-input type="password" v-model="form.repeatPw"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onRegister">Register</el-button>
                <el-button @click="toLogin">Back to Login</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
    import {register} from "~/api/users";
    export default {
        name: "register",
        data() {
            return {
                form: {
                  username: '',
                  password: '',
                  repeatPw: '',
                },
            }
        },
        methods: {
            onRegister() {
                if(this.checkInput(this.form)) {
                    register(this.form).then(res => {
                        if(res.data.success) {
                            this.$message.success('Register Successfully!')
                            this.toLogin()
                        } else if(res.data.message) {
                            this.$message.error(res.data.message)
                        } else {
                            this.$message.error('Network error')
                        }
                    })
                }
            },
            toLogin() {
                this.$router.push({path: '/login'})
            },
            checkInput(formData) {
                if(formData.username && formData.password) {
                    if(formData.password === formData.repeatPw) {
                        return true
                    } else {
                        this.$message.error('Repeat Password error')
                    }
                } else if(!formData.username) {
                    this.$message.error('Username can\'t be empty')
                } else if(!formData.password) {
                    this.$message.error('Password can\'t be empty')
                }
                return false
            },
        }
    }
</script>

<style scoped>
    html, body {
        height: 100%;
        width: 100%;
    }
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
	.el-form {
		width: 50%;
	}
</style>