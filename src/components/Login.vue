<template>
    <div class="container">
        <div class="login-container">
            <h2 class="text-center">登&nbsp;&nbsp;录</h2>
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="email" class="form-label">账号</label>
                    <input type="text" class="form-control" id="email" v-model="username" placeholder="账号/邮箱">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">密码</label>
                    <div class="input-group">
                        <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" v-model="password" placeholder="密码">
                        <button class="btn btn-outline-secondary" type="button" @click="togglePassword">
                            <i :class="showPassword ? 'bi-eye' : 'bi-eye-slash'"></i>
                        </button>
                    </div>
                </div>
<!--                <div class="mb-3 form-check">-->
<!--                    <input type="checkbox" class="form-check-input" id="remember" v-model="remember">-->
<!--                    <label class="form-check-label" for="remember">记住我</label>-->
<!--                </div>-->
                <br/>
                <button type="submit" class="btn btn-primary w-100 btn-block">登录</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import apiPathConfig from '@/config/apiPathConfig';

    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                showPassword: false,
                remember: false
            };
        },
        methods: {
            togglePassword() {
                this.showPassword = !this.showPassword;
            },
            async login() {
                try {
                    const response = await axios.post(apiPathConfig.loginUrl, {
                        username: this.username,
                        password: this.password
                    });
                    if (response.data.code === 200 && response.data.data && response.data.data.token) {
                        this.saveData(response.data.data);
                        console.log('登录成功！');
                        this.$router.push('/');
                    } else {
                        console.log('登录失败：' + response.data.message);
                    }
                } catch (error) {
                    console.log('请求出错，请稍后重试');
                }
            },
            saveData(data) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('dictList', JSON.stringify(data.dictList));
                localStorage.setItem('menuList', JSON.stringify(data.menuList));
            }
        }
    };
</script>

<style scoped>
    .login-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 40px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        margin-top: 100px;
    }
    .login-container h2 {
        margin-bottom: 30px;
    }
</style>
