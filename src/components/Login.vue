<template>
    <div class="auth">
        <div class="auth__left_content">
            <p class="auth__text--main text-white">Welcome Back</p>
            <p class="auth__text--small text-white"> Don't have an account </p>
            <router-link :to="{name: 'signup'}" class="auth__text--small text-white"> signup </router-link>
        </div>
        <div class="auth__right_content">
            <p class="auth__text--main">Login</p>
            <p class="auth__text--small">please enter crendentials to get started</p>
            <form @submit.prevent="login" class="form">
                <input type="email" class="input" placeholder="email" v-model="email">
                <input type="password" class="input" placeholder="password" v-model="password">
                <button class="btn btn-fill">Login in </button>
            </form>
        </div>
    </div>
</template>


<script>
import { headerMixin } from './mixins/HeaderMixin.js'
import { LOGIN } from '../graphql.js'
import { storeToken } from '../utils.js'
export default {
    mixins: [headerMixin],
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$apollo.mutate({
                mutation: LOGIN,
                variables: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(data => {
                storeToken(data.data.login.token)
                this.$router.push({name: 'home'})
            })
        }
    }
}
</script>

<style scoped>
    @import '../assets/auth.css';
</style>