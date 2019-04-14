<template>
    <div class="wrapper">
        <app-loader v-if="$apollo.loading"></app-loader>
         <div class="background">
            <h3><span class="background__text">{{hospital.name}}</span></h3>
            <div class="background__card">
                <p class="call">Emergency call line</p>
                <p class="hotline">{{hospital.contact}}</p>
                <img src="../assets/phone-call.svg" alt="phone icon" class="icon">
            </div>
        </div>
        <div class="description">
            <h3 class="header">Hospital Details</h3>
            <div class="description__card">
                <p class="description__main">Tarkwa hospital was adjourned in 15 1990 in jose housein faculty of main all</p>
                <p class="description__text">located in <strong>{{hospital.location.city}}</strong></p>
                <p class="description__text"> A <strong>{{hospital.status}}</strong> hospital </p>
                <p class="description__text">Takes <strong>nation health insurance</strong> </p>
            </div>
        </div>
        <div class="map">
            <h3 class="header"> Location </h3>
            <app-google-map :locations="locations"></app-google-map>
        </div>
        <div class="reviews">
             <h3 class="header">Reviews</h3>
             <form class="form">
                 <input type="text" class="input" placeholder="let hear what you have to say about this hospital">
                 <button type="submit" class="btn btn-large">send review </button>
             </form>
             <div class="review__container">
                <div class="review" v-for="review in hospital.reviews" :key="review.id">
                    <p class="review__user-image">k</p>
                    <p class="review__username">{{review.user.name}}</p>
                    <p class="review__text"> {{review.comment}}</p>
                </div>
             </div>
        </div>
    </div>   
</template>

<script>
import GoogleMap from './GoogleMap.vue'
import { HOSPITAL } from '../graphql.js'
import Loader from './Loader'
export default {
    data() {
        return {
            hospital: null,
            id: this.$route.params.id
        }
    },
    computed: {
        locations() {
            return [this.hospital.location]
        }
    },
    components: {
        appGoogleMap:GoogleMap,
        appLoader: Loader
    },
    apollo: {
        hospital: {
            query: HOSPITAL,
            variables() {
                return {id: this.id }
            },
            update: data => data.hospital
        }
    },  
}
</script>

<style scoped>
    .background {
        background-image: linear-gradient(rgba(77, 5, 232, 0.39)),url(../assets/detail.svg);
        height: 85vh;
        background-repeat: no-repeat;
        background-size: cover;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        align-content: center;
        margin-top: -8rem;
        padding: 0 20rem;
    }
    .background__text {
        font-size: 6rem;
        background-color: #4a148c;
        box-shadow: 10px 0 0 #4a148c, -10px 0 0 #4a148c;
        color: white;
        padding: 1rem;
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
    }
    .background__card {
        padding: 2rem;
        height: 20rem;
        width: 50%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: white;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.02);
        font-size: 1.7rem;
        border-radius: 6px;
        transform: translateY(10rem);
    }
    .call {
        color: #4a148c;
        font-weight: 800;
    }
    .hotline {
        color: #424242;
    }
    .icon {
        width: 5rem;
        height: 5rem;
        margin-top: 1rem;
    }
    .description, .reviews{
        width: 60%;
        margin: 10rem auto;
        
    }
    .map {
        width: 78%;
        margin: 5rem auto;
    }
    .description__card {
        background-color: white;
        border-radius: 6px;
        padding: 2rem;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.03);
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .description__main {
        margin-bottom: 5rem;
        color: #616161;
        font-size: 1.7rem;
    }
    .header {
        color: #424242;
        font-size: 3rem;
        font-weight: 400;
        text-align: center;
    }
    .description__text {
        color: #616161;
        font-size: 1.7rem;
        margin: 2rem 0;
    }
    strong {
        color: #4a148c;
    }
    .form  {
        width: 100%;
    }
    .input {
        width: 60%;
        padding: 2rem 4rem;
        line-height: 4rem;
    }
    .review__container {
        margin-top: 5rem;
    }
    .review {
        display: grid;
        grid-template-columns: 5rem 1fr;
        font-size: 1.2rem;
        padding: 1rem;
        background-color: white;
        border-radius: 3px;
        margin-bottom: 1rem;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.03);
        width: 60%;
        color: #616161;
    }
    .review__user-image {
        grid-row: 1 / span 2;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        background-color: #e3f2fd;
        color: #4a148c;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateY(-0.5rem);
    }
    .review__text {
        grid-column: 2 / 3;
        margin-top: 0;
    }
</style>