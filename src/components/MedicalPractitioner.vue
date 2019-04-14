<template>
    <div class="practioner">
        <form  @submit.prevent="grantAccess" class="form">
            <p class="form__text">Enter your medical number to enter chatroom </p>
            <transition mode="out-in" name="fade">
                <p class="form__error" v-show="!isValid">please enter a valid number </p>
            </transition>
            <input type="text" class="input" 
                   :class="{'wrong': !isValid }"
                   placeholder="enter your medical number" 
                   v-model="medicalNumber">
            <button class="btn btn-rounded"> submit </button>
        </form>
    </div>
</template>

<script>
import { EventBus } from '../main.js'
import { setTimeout } from 'timers';
import { getToken } from '../utils.js'
export default {
    data() {
        return {
            medicalNumber: '',
            isValid: true
        }
    },
    computed: {
        validateNumber() {
            if (this.medicalNumber.startsWith('000') && 
                this.medicalNumber.endsWith('gh')) {
                    this.isValid = true
                    return true
            }
            else {
                this.isValid = false
                setTimeout(()=> {
                    this.isValid = true
                    return false
                    }, 2000)
            }
        }
    },
    methods: {
        grantAccess() {
            if (this.validateNumber) {
                if (getToken() !== null)
                    this.$router.push({name: 'chatroom'})
                else {
                    this.$router.push({name: 'login'})
                }
            }
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
    .practioner {
        width: 50%;
        margin: 10rem auto;
        box-shadow: 0 2rem 3rem rgba(0,0,0,0.03);
        border-radius: 3px;
        background-color: white;
        padding: 2rem;
        min-height: 30rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .form  {
        padding: 4rem 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .form__text {
        color: #616161;
        font-size: 1.7rem;
    }
    .input {
        width: 100%;
        margin: 3rem;
    }
    .btn {
        background-color:transparent;
        color:#4a148c;
        border: none;
        border: 1px solid #4a148c;
        padding: 1.2rem 6rem;
    }
    .wrong {
        border: 1px solid #ffcdd2;
    }
    .form__error {
        font-size: 1.4rem;
        background-color: #ffebee;
        color: #e57373;
        padding: 1rem;
    }
    .fade-enter-active, .fade-leave-to {
        transition: all 0.5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .fade-leave-active {
        position: absolute;
    }
</style>