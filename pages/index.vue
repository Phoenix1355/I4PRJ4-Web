<template>
    <section class="container">
        <div>
              <button v-on:click="retrieve">
                Refresh
              </button>
              <ul>
                <li v-for="item in items">
                  {{ item.id }}
                  {{ item.departureTime }}
                </li>
              </ul>
        </div>
    </section>
</template>

<script>
import Logo from '~/components/Logo.vue';

import axios from 'axios';

axios.defaults.baseURL = "https://smartcabpocwebapi.azurewebsites.net";

export default {
    components: {
        Logo
    },
    data: () => {
      return {
        items: []
      }
    },
    methods: {
      retrieve () {
        console.log("hej")
        axios.get("/api/rides")
          .then(res => {
            this.items = res.data;
          })
      }
    }
}
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}

.rideContainer{
  padding: 20px 20px;
  font-weight: 300;
  color: #526488;
  text-align: left;
}
</style>
