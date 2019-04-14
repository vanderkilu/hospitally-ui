<template>
    <div class="chatroom">
        <div class="chatroom__left">
            
        </div>
        <div class="chatroom__right">
            <div class="chatroom__main"></div>
            <form @submit.prevent="createChat" class="form">
                <input type="text" class="input" placeholder="enter message" v-model="message">
            </form>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../main.js'
import { NEWCHAT, CREATECHAT } from '../graphql.js'
export default {
    data() {
        return {
            message: '',
            messages: []
        }
    },
    mounted() {
        EventBus.$emit('OTHER-PAGE', true)
    },
    beforeDestroy() {
        EventBus.$emit('OTHER-PAGE', false)
    },
    methods: {
        createChat() {
            this.$apollo.mutate({
                mutation: CREATECHAT,
                variables: {
                    message: this.message
                }
            })
            .then((data) => {  
                console.log(this.messages)
                })
        }
    },
    apollo: {
        $subscribe: {
            newChat: {
                query: NEWCHAT,
                result(data) {
                    this.messages.push(data)
                    console.log(data)
                }
            }
        }
    }
}
</script>

<style scoped>
   .chatroom {
       display: grid;
       grid-template-columns: 30rem 1fr;
       grid-template-rows: 90vh;
   }
   .chatroom__left, .chatroom__right {
       grid-row: 1 / -1;
   }
   .chatroom__left {
       background-color: #bdbdbd;
   }
   .chatroom__right {
       background-color: #e0e0e0;
       position: relative;
   }
   .chatroom__main {
      min-height: 80%;
   }
   .form {
       position: absolute;
       bottom: 0;
       width: 100%;
       padding: 2rem;
       display: flex;
       justify-content: center;
   }
   .input {
       width: 60%;
       border-radius: 6rem;
       padding: 1.4rem 2rem;
   }
   .chatroom__text {
       justify-content: center;
       font-size: 2rem;
       margin-top: 1rem;
   }
</style>