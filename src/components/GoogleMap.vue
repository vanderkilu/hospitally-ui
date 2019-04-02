<template>
    <div class="map">
        <gmap-map :center="center" :zoom="12" style="width:100%;  height: 600px;">
            <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position"
                        @click="center=m.position"> 
            </gmap-marker>
        </gmap-map>
    </div>
</template>


<script>
export default {
    props: ['locations'],
    data() {
        return {
            center: {lat: 5.603717, lng: -0.186964},
            markers: []
        }
    },
    mounted() {
        this.markers = this.locations.map((location)=> {
            let marker = {lat: location.latitude, lng:location.longitude}
            this.center = marker
            return {position: marker}
        })
        console.log(this.markers)
    }
}
</script>