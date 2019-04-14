<template>
    <div class="admin-wrapper">
        <div class="nav colored">
            <router-link class="nav__brand" :to="{name: 'home'}">Hospitally.gh</router-link>
            <router-link class="nav__link" :to="{}">Hospitals</router-link>
            <router-link class="nav__link" :to="{name: 'new-hospital'}">Add Hospital</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>


<script>
import { headerMixin } from './mixins/HeaderMixin.js'
import { getToken } from '../utils'
export default {
    mixins: [headerMixin],
    data() {
        return {

        }
    },
    beforeRouteEnter(to, from, next) {
        if (getToken() === null) {
             next({name: 'login', query: {name: 'admin'}})
        }
        else {
            next()
        }
    }
}
</script>

<style scoped>
    .nav {
        padding: 2rem;
    }
</style>