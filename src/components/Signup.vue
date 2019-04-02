<template>
    <div class="auth">
        <div class="auth__left_content">
            <p class="auth__text--main text-white">Lets Get Started</p>
            <p class="auth__text--small text-white">Already have an account? </p>
            <router-link :to="{name: 'login'}" class="auth__text--small text-white">login</router-link>
        </div>
        <div class="auth__right_content">
            <p class="auth__text--main">Signup</p>
            <p class="auth__text--small">please enter crendentials to get started</p>
            <form @submit.prevent="signup" class="form">
                <input type="text" class="input" placeholder="name" v-model="name">
                <input type="email" class="input" placeholder="email" v-model="email">
                <input type="password" class="input" placeholder="password" v-model="password">
                <button class="btn btn-fill">sign up</button>
            </form>
        </div>
    </div>
</template>

<script>
import { SIGNUP } from '../graphql.js'
import { storeToken } from '../utils.js'
import { headerMixin } from './mixins/HeaderMixin.js'
export default {
    mixins: [headerMixin],
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signup() {
            this.$apollo.mutate({
                mutation: SIGNUP,
                variables: {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
            })
            .then(data => {
                storeToken(data.data.login.token)
                this.$router.push({name: 'home'})
            })
        }
    },
}
</script>

<style scoped>
    @import '../assets/auth.css';
</style>