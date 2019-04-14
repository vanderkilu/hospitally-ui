<template>
    <div class="chatroom">
        <div class="chatroom__left">
            <p class="chatroom__text">COLLEAGUES</p>
            <div class="users" v-for="user in filteredUsers" :key="user.id">
                <p class="user">{{user}}</p>
            </div>
        </div>
        <div class="chatroom__right">
            <div class="chatroom__main">
                <app-chat v-for="chat in messages" :chat="chat" :key="chat.id"></app-chat>
            </div>
            <form @submit.prevent="createChat" class="form">
                <input type="text" class="input" placeholder="enter message" v-model="message">
            </form>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../main.js'
import { NEWCHAT, CREATECHAT, USERS } from '../graphql.js'
import Chat from './Chat.vue'
import { getToken } from '../utils.js'
export default {
    data() {
        return {
            message: '',
            messages: [],
            users: []
        }
    },
    beforeRouteEnter(to, from, next) {
        if (getToken() === null) {
            this.$router.push({name: 'login'})
        }
        else {
            next()
        }
    },
    computed: {
        filteredUsers() {
            return [...new Set(this.users.map(item => item.name))]
        }
    },
    mounted() {
        EventBus.$emit('OTHER-PAGE', true)
    },
    beforeDestroy() {
        EventBus.$emit('OTHER-PAGE', false)
    },
    components: {
        appChat: Chat
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
                this.message = "" 
            })
        }
    },
    apollo: {
        $subscribe: {
            newChat: {
                query: NEWCHAT,
                result(data) {
                    this.messages.push(data.data.newChat)
                },
            }
        },
        users: {
            query: USERS,
            update: (data) => data.users
        }

    },
}
</script>

<style scoped>
   .chatroom {
       display: grid;
       grid-template-columns: 20rem 1fr;
       grid-template-rows: 90vh;
   }
   .chatroom__left, .chatroom__right {
       grid-row: 1 / -1;
   }
   .chatroom__left {
       background-color: #bdbdbd;
       display: flex;
       align-items: center;
       flex-direction: column;
   }
   .chatroom__right {
       background-color: #e0e0e0;
       position: relative;
   }
   .chatroom__main {
      min-height: 80%;
      padding: 5rem;
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
       margin-top: 5rem;
       justify-content: center;
       color: #4a148c;
       font-size: 2.2rem;
       margin-top: 1rem;
       font-weight: bolder;
   }
   .user {
      color: #616161;
      font-size:  1.8rem;
   }
</style>