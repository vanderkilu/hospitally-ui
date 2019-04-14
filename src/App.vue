<template>
    <div class="main">
        <app-header></app-header>
        <transition name="up">
             <router-view :key="$route.path"></router-view>
        </transition>
    </div>
</template>


<script>
import Header from './components/Header.vue'
export default {
    components: {
        appHeader: Header
    }
}
</script>

<style>
    html {
        font-size: 62.5%;
        box-sizing: border-box;
    }
    body {
        font-family: 'Montserrat', sans-serif;
        padding: 0;
        margin: 0;
        background-color:#eeeeee; 
    }
    a:link, a:active {
        text-decoration: none;
        color: white;
    }
    .btn {
        padding: 0.8rem 1.5rem;
        border: none;
        background-color: white;
        color: #4a148c;
        font-size: 1.2rem;
        cursor: pointer;
    }
    .btn-rounded {
        border-radius: 6rem;
    }
    .btn-large {
        padding: 3rem;
        border-radius: 3px;
        margin-left: 2rem;
        color: #4a148c;
    }
    .btn:active, .btn:focus {
        outline: none;
    }
    .input {
        padding: 1rem 2rem;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.03);
        border: none;
        border-radius: 3px;
    }
    .input:focus {
        outline: none;
    }
    .heading--main {
        font-size: 2.2rem;
        font-weight: 800;
        color: #212121;
        text-align: center;
    }
    .up-enter-active, .up-leave-active {
        transition: all 0.3s;
    }
    .up-enter, .up-leave-to {
        opacity: 0;
        transform: translateY(-6rem);
    }
    .loader__small {
        border: 0.6rem solid #f3f3f3;
        border-top: 0.6rem solid #4a148c;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>