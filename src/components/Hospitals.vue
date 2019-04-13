<template>
    <div class="hospitals">
        <div class="hospitals__content">
            <div class="card" v-for="hospital in hospitals" :key="hospital.id"  @click="routeTo(hospital.id)">
                <img :src="hospital.photoUrl" class="card__image">
                <div class="card__content">
                     <p class="card__text card__text--bold">{{hospital.name}}</p>
                     <p class="card__text">{{hospital.contact}}</p>
                     <p class="card__text status">{{hospital.status}}</p>
                </div>
            </div>
        </div>
        <div class="hospitals__map">
            <app-google-map :locations="locations"></app-google-map>
        </div>
    </div>
</template>


<script>
import { HOSPITALSBYCITY } from '../graphql.js'
import { EventBus } from '../main.js'
import GoogleMap from './GoogleMap.vue'
export default {
    data() {
        return {
            hospitals: [],
            city: this.$route.params.city,
        }
    },
    computed: {
        locations() {
            return this.hospitals.map((hospital)=> hospital.location)
        }
    },
    methods: {
        routeTo(id) {
            this.$router.push({name: 'hospital', params: {id: id}});
        }
    },
    apollo: {
        hospitals: {
            query: HOSPITALSBYCITY,
            variables() {
                return {
                    city: this.city
                }
            },
            update: (data) => data.hospitalsByCity
        }
    },
    mounted() {
        EventBus.$emit('OTHER-PAGE', true)
    },
    beforeDestroy() {
        EventBus.$emit('OTHER-PAGE', false)
    },
    components: {
        appGoogleMap: GoogleMap
    }
}
</script>

<style scoped>
    .hospitals {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 1rem;
        padding-left: 2rem;
        margin-top: 2rem;
    }
    .hospitals__content {
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
        grid-gap: 1rem;
    }
    .card {
        border-radius: 5px;
        color: #616161;
        box-shadow: 0 0.1rem 0.4rem rgba(0,0,0,0.03);
        background-color: white;
        cursor: pointer;
        align-self: flex-start;

    }
    .card__image {
        width: 100%;
    }
    .card__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .card__text {
        font-size: 1.5rem;
    }
    .card__text--bold {
        font-weight: 700;
    }
    .status {
        padding: 0.5rem 1.5rem;
        background-color: #e8f5e9;
        border-radius: 6rem;
        color: #2e7d32;
    }
</style>