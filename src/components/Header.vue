<template>
    <div class="nav" :class="{'colored': colored}" v-if="show">
        <router-link :to="{name: 'home'}" class="nav__brand" >Hospitally.gh</router-link>
        <router-link :to="{name: 'practitioner'}" class="btn btn-rounded">staff corner</router-link>
        <a href="https://www.webmd.com/first-aid/first-aid-a-to-z" class="first-aid btn btn-rounded">learn about first aid </a>
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
        background-color: #4a148c;
        color: white; 
    }
    .first-aid {
        color: white;
        font-size: 1.8rem;
    }
</style>
