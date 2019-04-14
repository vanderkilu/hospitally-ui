import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as VueGoogleMaps from "vue2-google-maps";
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import { getToken } from './utils'

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

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/',
  options: {
    reconnect: true,
  },
})


const authLink = setContext(()=> ({
  headers: {
    authorization: `Bearer ${getToken()}`
  }
}))

const socketLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' &&
      operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: socketLink,
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
