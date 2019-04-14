<template>
    <div class="new-hospital">
        <p class="new-hospital__text"> Edit Hospital </p>
            <form @submit.prevent="updateHospital" class="form">
                <input type="text" class="input" placeholder="hospital name" v-model="hospital.name" required>
                <input type="text" class="input" placeholder="contact" v-model="hospital.contact" required>
                <input type="text" class="input" placeholder="website" v-model="hospital.website">
                <input type="text" class="input" placeholder="email" v-model="hospital.email">
                <input type="text" class="input" placeholder="photo url" v-model="hospital.photoUrl" required>
                 <select v-model="hospital.status" class="input" required>
                    <option disabled value="">select status</option>
                    <option>private</option>
                    <option>public</option>
                </select>
               <div class="loader__small" v-if="isLoading"></div>
               <button class="btn btn-rounded" v-else>next</button>
            </form>
            <app-loader v-if="$apollo.loading"></app-loader>
    </div>
</template>


<script>
import { UPDATEHOSPITAL, HOSPITAL } from '../graphql.js'
import Loader from './Loader.vue'
export default {
    data() {
        return {
            isLoading: false,
            hospital: {
                name: '',
                contact: '',
                website: '',
                email: '',
                photoUrl: '',
                status: '',
            },
            id: this.$route.params.id
        }
    },
    components: {
        appLoader: Loader
    },
    apollo: {
        hospital: {
            query: HOSPITAL,
            variables() {
                return {id: this.id}
            },
            update: (data) => data.hospital
        }
    },
    methods: {
         updateHospital() {
            this.isLoading = true
            this.$apollo.mutate({
                mutation:UPDATEHOSPITAL,
                variables: {
                    id: this.id,
                    name: this.hospital.name,
                    contact: this.hospital.contact,
                    email: this.hospital.email,
                    photoUrl: this.hospital.photoUrl,
                    status: this.hospital.status,
                    website: this.hospital.website,
                }
            }).then(data => {
                console.log(data)
                this.isLoading = false
                this.$router.push({name: 'home'})
            })
        }
    },
    mounted() {
        console.log(this.id)
    }
}
</script>

<style scoped>
     .new-hospital {
        width: 60%;
        margin: 5rem auto;
        background-color: white;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.03); 
        padding: 2rem;
    }   
    .new-hospital__text {
        font-size: 2rem;
        color: #616161;
        text-align: center;
    } 
    .form {
        width: 50%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .input {
        margin-bottom: 2rem;
        box-shadow: none;
        border: none;
        border: 1px solid #e0e0e0;
        width: 100%;
        border-radius: 2px;
        padding: 1.5rem 2rem;
    }
    select.input {
        background-color: white;
        font-family: inherit;
    }
    .btn {
        background-color:transparent;
        color:#4a148c;
        border: none;
        border: 1px solid #4a148c;
        padding: 1.5rem 8rem;
    }
</style>
