import { EventBus } from '../../main.js'
export const headerMixin =  {
    mounted() {
        EventBus.$emit('HEADER-SHOW', false)
    },
    beforeDestroy() {
        EventBus.$emit('HEADER-SHOW', true)
    },
}