<template lang="html">
    <div class="googlemap">
        <googlemaps-map
            ref="map"
            class="map"
            :center.sync="center"
            :zoom.sync="zoom"
        >
            <googlemaps-marker
                v-for="marker in markers"
                :key="marker._id"
                :draggable="false"
                :position="{ lat: marker.lat, lng: marker.lng }"
            />
        </googlemaps-map>
    </div>
</template>

<script>

/**
 * Google maps wrapper for displaying trip
 * @type {String}
 */
export default {
    props: {
        markers: {
            type: Array,
            required: true,
        },
    },

    data: () => ({
        center: {
            lat: 56.1529214,
            lng: 10.2107996,
        },
        /*
        markers: [
            {
                id: 1,
                lat: 56.1529214,
                lng: 10.2107996,
            },
            {
                id: 2,
                lat: 56.1719587,
                lng: 10.1916533,
            },
        ],
        */
        options: {
        },
        userPosition: null,
        zoom: 1,
    }),

    created() {
        const centroid = {
            lat: 0,
            lng: 0,
        };

        console.log(this);

        this.markers.forEach((marker) => {
            centroid.lat += marker.lat;
            centroid.lng += marker.lng;
        });

        this.center = {
            lat: centroid.lat / (this.markers.length),
            lng: centroid.lng / (this.markers.length),
        };

        const WORLD_DIM = 256;
        const ZOOM_MAX = 21;

        const latDif = Math.abs(this.center.lat - this.markers[0].lat);
        const lngDif = Math.abs(this.center.lng - this.markers[0].lng);

        const rad = Math.max(latDif, lngDif);

        const zoom = (pos, fraction) => Math.abs(Math.floor(Math.log(pos / fraction) * 1.2));

        this.zoom = zoom(rad, WORLD_DIM, ZOOM_MAX);
    },

    methods: {
        setUserPosition(position) {
            this.userPosition = position;
        },
    },
};
</script>

<style lang="scss" scoped>
.googlemap {
    height: 100%;

    .map {
        height: 100%;
    }
}
</style>
