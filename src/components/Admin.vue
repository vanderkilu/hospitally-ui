<template>
    <div class="admin-wrapper">
        <div class="nav">
            <p class="nav__brand">Hospitally.gh</p>
            <p class="nav__link">Hospitals</p>
            <p class="nav__link">Add Hospital</p>
        </div>
    </div>
</template>


<script>
import { headerMixin } from './mixins/HeaderMixin.js'
export default {
    mixins: [headerMixin],
    data() {
        return {
            hospitals: []
        }
    },

}
</script>