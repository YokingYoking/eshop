<template>
    <el-container class="container">
        <h3 style="align-self: center">Welcome to E-Shop!</h3>
        <el-form :model="form" ref="form" label-width="150px" class="el-form">
            <el-form-item label="Username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onLogin">Login</el-button>
                <el-button @click="toRegister">Register</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
    import {login} from "~/api/users";
    export default {
        name: "login",
        data() {
            return{
                form: {
                  username: '',
                  password: ''
                },
            }
        },
        methods: {
            onLogin() {
                let that = this
                if(this.checkInput(this.form)) {
                    login(this.form).then((res) => {
                        if(res.status === 200) {
                            if (res.data.success) {
                                sessionStorage.setItem('username', that.form.username)
                                that.$router.push({path:'homepage'})
                            } else if(!res.data.username) {
                                that.$message.error('Username or Password error')
                            }
                        } else {
                            that.$message.error('Network Error')
                        }
                    }).catch((err) => {
						console.log(err)
					})
                }
            },
            toRegister() {
                this.$router.push({path: 'register'})
            },
            checkInput(formData) {
                if(formData.username && formData.password) {
                    return true
                } else if(!formData.username) {
                    this.$message.error('Username can\'t be empty')
                } else if(!formData.password) {
                    this.$message.error('Password can\'t be empty')
                }
                return false
            },
        },
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