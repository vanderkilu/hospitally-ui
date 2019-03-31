<template>
    <div class="main">
        <app-header></app-header>
        <transition name="up">
             <router-view></router-view>
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
        color: #1e88e5;
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
        color: #1e88e5;
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
</style>