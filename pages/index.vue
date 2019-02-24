<template>
    <section class="container">
        <div>
            <div class="buttons">
                <button v-on:click="retrieve"
                    class="button button--blue">
                    Refresh
                </button>
            </div>
            <ul class="list">
                <li v-for="item in items" class="item">
                    <p class="item-id">
                        {{ item.id }}
                    </p>
                    <p class="item-dt">
                        {{ item.departureTime.format("D MMM YYYY, HH:mm") }}
                    </p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

axios.defaults.baseURL = "https://smartcabpocwebapi.azurewebsites.net";

export default {
    data: () => {
        return {
            items: [],
        }
    },
    methods: {
        retrieve () {
            console.log("Requested rides from api");

            axios.get("/api/rides")
                .then(res => {
                    this.items = res.data.map(item => ({
                        id: item.id,
                        departureTime: new moment(item.departureTime),
                    }))
                });
        }
    }
}
</script>

<style lang="scss">
.container {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    margin: 60px auto;
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

.buttons {
    text-align: center;
}

.list {
    width: 400px;
    padding: 0;
    margin: 40px 0;

    list-style: none;
}

.item {
    display: flex;
    width: 100%;
    padding: 10px 5px;

    border-bottom: 1px solid #DDD;

    .item-id {
        width: 40px;
    }
    .item-dt {
        flex: 1;
        width: 100%;

        text-align: right;
    }
}
</style>
