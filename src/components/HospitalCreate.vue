<template>
    <div class="new-hospital">
        <div class="new-hospital__location">
            <p class="new-hospital__text">Hospital location details </p>
            <form action="" class="form">
                <input type="text" class="input" placeholder="city" v-model="city">
                <input type="text" class="input" placeholder="address" v-model="address">
                <input type="text" class="input" placeholder="longitude" v-model="longitude">
                <input type="text" class="input" placeholder="latitude" v-model="latitude">
                <select v-model="region">
                    <option disabled value="">Please select region</option>
                    <option>Western</option>
                    <option>Central</option>
                    <option>Eastern</option>
                </select>
                <button class="btn">next</button>
            </form>
        </div>
        <div class="new-hospital__details" v-show="isLocationDone">
            <p class="new-hospital__text">Hospital details </p>
            <form action="" class="form">
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
                <button class="btn">submit</button>
            </form>
        </div>
    </div>
</template>


<script>
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
            isLocationDone: false
        }
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
        width: 80%;
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
    }
</style>