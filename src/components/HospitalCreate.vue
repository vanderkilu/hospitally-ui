<template>
    <div class="new-hospital">
        <div class="new-hospital__location" v-if="!isLocationDone">
            <p class="new-hospital__text">Hospital location details </p>
            <form @submit.prevent="createLocation"  class="form">
                <input type="text" class="input" placeholder="enter city" v-model="city">
                <input type="text" class="input" placeholder="enter address" v-model="address">
                <input type="text" class="input" placeholder="enter longitude" v-model="longitude">
                <input type="text" class="input" placeholder="enter latitude" v-model="latitude">
                <select v-model="region" class="input">
                    <option disabled value="">Please select region</option>
                    <option>Western</option>
                    <option>Central</option>
                    <option>Eastern</option>
                </select>
                <button class="btn btn-rounded">next</button>
            </form>
        </div>
        <div class="new-hospital__details" v-show="isLocationDone">
            <p class="new-hospital__text">Hospital details </p>
            <form @submit.prevent="createHospital" class="form">
                <input type="text" class="input" placeholder="hospital name" v-model="name">
                <input type="text" class="input" placeholder="contact" v-model="contact">
                <input type="text" class="input" placeholder="website" v-model="website">
                <input type="text" class="input" placeholder="email" v-model="email">
                <input type="text" class="input" placeholder="photo url" v-model="photoUrl">
                 <select v-model="status">
                    <option disabled value="">select status</option>
                    <option>private</option>
                    <option>public</option>
                </select>
                <button class="btn btn-rounded">submit</button>
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
            isDisabled: false
        }
    },
    methods: {
        createLocation() {
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
            })
        },
        createHospital() {
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
</style>