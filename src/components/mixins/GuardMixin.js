import { getToken } from '../../utils.js'
export const routeGuard =  {
    beforeRouteEnter (to, from, next) {
        if (getToken() === null) {
            this.$router.push({name: 'login'})
        }
        next()
    }
}