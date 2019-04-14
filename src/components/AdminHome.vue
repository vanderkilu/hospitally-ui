<template>
    <div class="admin">
        <div class="admin__hospitals">
            <div class="admin-hospital__card" v-for="hospital in hospitals" :key="hospital.id">
                <p class="hospital__name">{{hospital.name}}</p>
                <p class="hospital__location">{{hospital.location.city}}</p>
                <img src="../assets/edit.svg" class="hospital__icon">
                <img src="../assets/delete.svg" class="hospital__icon" @click="removeHospital(hospital.id)">
            </div>
        </div>
        <app-loader v-if="$apollo.loading"></app-loader>
    </div>
</template>

<script>
import { HOSPITALS, DELETEHOSPITAL } from '../graphql.js'
import Loader from './Loader.vue'
export default {
    data() {
        return {
            hospitals: [],
        }
    },
    components: {
        appLoader: Loader
    },
    apollo: {
        hospitals: {
            query: HOSPITALS,
            update: (data) => data.hospitals
        }
    },
    methods: {
        removeHospital(id) {
            this.$apollo.mutate({
                mutation: DELETEHOSPITAL,
                variables: {
                    id: id
                }
            }).then((data)=> {
                console.log(data)
                let hospitalToRemove = this.hospitals.find((hospital)=> hospital.id === id)
                this.hospitals.splice(this.hospitals.indexOf(hospitalToRemove), 1)
            })
        }
    }

}
</script>

<style scoped>
    .admin__hospitals {
        width: 60%;
        margin: 2rem auto;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.03);
        background-color: #f5f5f5;
        min-height: 80vh;
    }
    .admin-hospital__card {
        display: flex;
        justify-content: space-between;
        padding: 2rem;
        align-items: center;
        background-color: white;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.03);
        margin-bottom: 0.6rem;
    }
    .hospital__name {
        flex-basis: 40%
    }
    .hospital__location {
         flex-basis: 30%;
    }
    .hospital__name, .hospital__location  {
        font-size: 1.4rem;
        color:#757575;
    }
    .hospital__icon {
        width: 2rem;
        height: 2rem;
        flex-basis: 15%;
        cursor: pointer;
    }
</style>