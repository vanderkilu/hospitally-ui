<template>
    <div class="new-hospital">
        <div class="new-hospital__location" v-if="!isLocationDone">
            <p class="new-hospital__text">Hospital location details </p>
            <form @submit.prevent="createLocation"  class="form">
                <input type="text" class="input" placeholder="enter city" v-model="city" required>
                <input type="text" class="input" placeholder="enter address" v-model="address" required>
                <input type="text" class="input" placeholder="enter longitude" v-model="longitude" required>
                <input type="text" class="input" placeholder="enter latitude" v-model="latitude" required>
                <select v-model="region" class="input" required>
                    <option disabled value="">Please select region</option>
                    <option>Western</option>
                    <option>Central</option>
                    <option>Eastern</option>
                </select>
                <div class="loader__small" v-if="isLoading"></div>
                <button class="btn btn-rounded" v-else>next</button>
            </form>
        </div>
        <div class="new-hospital__details" v-show="isLocationDone">
            <p class="new-hospital__text">Hospital details </p>
            <form @submit.prevent="createHospital" class="form">
                <input type="text" class="input" placeholder="hospital name" v-model="name" required>
                <input type="text" class="input" placeholder="contact" v-model="contact" required>
                <input type="text" class="input" placeholder="website" v-model="website">
                <input type="text" class="input" placeholder="email" v-model="email">
                <input type="text" class="input" placeholder="photo url" v-model="photoUrl" required>
                 <select v-model="status" class="input" required>
                    <option disabled value="">select status</option>
                    <option>private</option>
                    <option>public</option>
                </select>
               <div class="loader__small" v-if="isLoading"></div>
               <button class="btn btn-rounded" v-else>next</button>
            </form>
        </div>
    </div>
</template>


<script>
import { EventBus } from '../main.js'
import { NEWLOCATION, NEWHOSPITAL } from '../graphql.js'
export default {
    data() {
        return {
            city: '',
            address: '',
            longitude: '',
            latitude: '',
            region: '',
            name: '',
            contact: '',
            website: '',
            email: '',
            photoUrl: '',
            status: '',
            isLocationDone: false,
            locationId: '',
            isLoading: false,
        }
    },
    methods: {
        createLocation() {
            this.isLoading = true
            this.$apollo.mutate({
                mutation: NEWLOCATION,
                variables: {
                    city: this.city,
                    address: this.address,
                    region: this.region,
                    longitude: parseFloat(this.longitude),
                    latitude: parseFloat(this.latitude)
                }
            }).then(data => {
                console.log(data)
                this.locationId = data.data.newLocation.id
                this.isLocationDone = true
                this.isLoading = false
            })
        },
        createHospital() {
            this.isLoading = true
            this.$apollo.mutate({
                mutation:NEWHOSPITAL,
                variables: {
                    name: this.name,
                    contact: this.contact,
                    email: this.email,
                    photoUrl: this.photoUrl,
                    status: this.status,
                    website: this.website,
                    locationId: this.locationId
                }
            }).then(data => {
                console.log(data)
                this.isLoading = false
                this.$router.push({name: 'home'})
            })
        }
    },
    mounted() {
        EventBus.$emit('OTHER-PAGE', true)
    },
    beforeDestroy() {
        EventBus.$emit('OTHER-PAGE', false)
    },
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
        color:#1e88e5;
        border: none;
        border: 1px solid #1e88e5;
        padding: 1.5rem 8rem;
    }
    .loader__small {
        border: 0.6rem solid #f3f3f3;
        border-top: 0.6rem solid #1e88e5;
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