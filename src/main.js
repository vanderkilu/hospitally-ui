import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyC03iB5tTN_pzAYQUhrDfID8ckH4T86Y8A",
    libraries: "places"
  }
});

Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export const EventBus  = new Vue()

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
