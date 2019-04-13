<template>
    <div class="nav" :class="{'colored': colored}" v-if="show">
        <router-link :to="{name: 'home'}" class="nav__brand" >Hospitally.gh</router-link>
        <router-link :to="{name: 'practitioner'}" class="btn btn-rounded">Medical practioner</router-link>
    </div>
</template>

<script>
import { EventBus } from '../main.js'
export default {
    data() {
        return {
            colored: false,
            show: true
        }
    },
    mounted() {
        EventBus.$on("OTHER-PAGE", (bool)=>  this.colored = bool)
        EventBus.$on("HEADER-SHOW", (bool)=> this.show = bool)
    }
}
</script>

<style>
    .nav {
        display: flex;
        justify-content: space-around;
        background-color: transparent;
        padding: 2rem 0;
    }
    .nav__brand {
        font-size: 2rem;
        margin-right: 1rem;
        flex-basis: 50%;
        color: white;
        font-weight: 800;
    }
    .nav__link {
        font-size: 1.7rem;
        color: white;
        font-weight: 600;
    }
    .colored {
        background-color: #1e88e5;
        color: white; 
    }
</style>
