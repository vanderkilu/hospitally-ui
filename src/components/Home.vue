<template>
    <div class="wrapper">
         <div class="home">
            <div class="home__main-text"> Locate Nearest Hospital Now !</div>
            <form class="home__form">
                <input type="text" class="input input--lg" placeholder="which city are you in? ">
            </form>
            <p class="home__text">To The Hospital Near Me </p>
            <div class="loader__small" v-if="isLoading"></div>
            <button class="btn btn-rounded btn-primary" @click="toNearest" v-else>Locate now</button>
        </div>
        <div class="main">
            <h3 class="heading--main">Discover hospitals</h3>
            <div class="main__cities">
                <div v-for="city in uniqueCities" :key="city.id" 
                     class="main__cities__card" @click="routeTo(city)">
                    {{city}}
                </div>
            </div>
        </div>
        <div class="description">
            <h3 class="heading--main"> What is Hospitally.gh </h3>
            <p class="description__text">
               Hospitally is a hospital location and medical practitioners platform uniting patients and dcotors. 
                It has a full catalogue of many hospitals in various cities in the country, 
                Are you new to a city?, You can search for a hospital near you. 
                Is there an emergency, locate a hospital near you and call their hotline center now!
            </p>
        </div>
    </div>
   
</template>

<script>
import { LOCATIONS } from '../graphql.js'
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            locations: [],
            isLoading: false
        }
    },
    computed: {
        uniqueCities() {
            return  [...new Set(this.locations.map(item => item.city))]
        }
    },
    methods: {
        routeTo(city) {
            this.$router.push({name:'hospitals-by-city', params: {city: city}})
        },
        toNearest() {
            this.isLoading = true
            setTimeout(()=> {
                 this.isLoading = false
                 this.$router.push({name: 'hospitals-by-city', params: {city: 'tarkwa'}})
            }, 5000)
        }
    },
    apollo: {
        locations: {
            query: LOCATIONS
        }
    },
}
</script>


<style scoped>
    .wrapper {
        margin-top: -8rem;
    }
    .home{
        background: linear-gradient(rgba(77, 5, 232, 0.39)),url('../assets/doctor.svg');
        height: 120vh;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
    }
    .main {
        padding: 2rem 6rem;
        margin-top: 8rem;
    }
    .home__main-text {
        margin-top: 20rem;
        font-size: 5.5rem;
        line-height: 5.5rem;
        font-weight: bold;
        text-shadow: 0 14px 24px rgba(50,48,58,.25);
    }
    .home__form {
        width: 40%;
        margin: 5rem auto;
        margin-bottom: 3rem;
    }
    .input--lg {
        padding: 2rem 3rem;
        width: 100%;
        border-radius: 6px;
        font: inherit;
        color: #bdbdbd;
        font-size: 1.5rem;
        line-height: 2.5rem;
    }
    .home__text {
        font-size: 1.5rem;
        font-weight: 800;
        margin-bottom: 5rem;
    }
    .btn-primary {
        padding: 1.6rem 3.6rem;
        font-size: 1.5rem;
        background-color: #4a148c;
        color: white;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.02);
        animation: pulse 1.5s infinite;
    }
    .main__cities {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 2rem;
        width: 60%;
        margin: 5rem auto;
    }
    .main__cities__card {
        padding: 2rem;
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.03);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.7rem;
        color: #616161;
        background-color: white;
        min-height: 20rem;
        cursor: pointer;
    }
    .description {
       background-color: white;
       padding: 10rem 35rem;
    }
    .description__text {
        margin-top: 5rem;
        color: #616161;
        font-size: 2rem;
        text-align: center;
    }
    @-webkit-keyframes pulse {
        0% {
            -webkit-box-shadow: 0 0 0 0 rgba(128,0,128,0.4);
        }
        70% {
            -webkit-box-shadow: 0 0 0 1.8rem rgba(128,0,128, 0);
        }
        100% {
            -webkit-box-shadow: 0 0 0 0 rgba(128,0,128, 0);
        }
    }
    @keyframes pulse {
        0% {
            -moz-box-shadow: 0 0 0 0 rgba(128,0,128, 0.4);
            box-shadow: 0 0 0 0 rgba(128,0,128, 0.4);
        }
        70% {
            -moz-box-shadow: 0 0 0 1.8rem rgba(128,0,128, 0);
            box-shadow: 0 0 0 1.8rem rgba(128,0,128, 0);
        }
        100% {
            -moz-box-shadow: 0 0 0 0 rgba(128,0,128, 0);
            box-shadow: 0 0 0 0 rgba(128,0,128, 0);
        }
    }
</style>