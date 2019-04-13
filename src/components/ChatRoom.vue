<template>
    <div class="chatroom">
        <div class="chatroom__left">
            
        </div>
        <div class="chatroom__right">
            <div class="chatroom__main"></div>
            <form  class="form">
                <input type="text" class="input" placeholder="enter message">
            </form>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../main.js'
import { NEWCHAT } from '../graphql.js'
export default {
    data() {
        return {

        }
    },
    mounted() {
        EventBus.$emit('OTHER-PAGE', true)
    },
    beforeDestroy() {
        EventBus.$emit('OTHER-PAGE', false)
    },
    apollo: {
        $subscribe: {
            newChat: {
                query: NEWCHAT,
                result(data) {
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
   }
   .chatroom__main {
      min-height: 80%;
   }
   .form {
       width: 100%;
       padding: 2rem;
       display: flex;
       justify-content: center;
   }
   .input {
       width: 60%;
   }
</style>