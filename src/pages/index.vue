<template>
    <Page>
        <Container>
            <h1>Turoversigt</h1>
            <div v-if="loggedIn">
                <p
                    v-if="errorMessage !== ''"
                    class="error"
                >
                    {{ errorMessage }}
                </p>
                <ul
                    v-else-if="items.length > 0"
                    class="rides"
                >
                    <li
                        v-for="item in items"
                        :key="item.id"
                        class="item"
                        @click="setRide(item.id)"
                    >
                        <div class="item-group">
                            <small>Start</small>
                            <p>{{ displayLocation(item.startDestination) }}</p>
                        </div>
                        <div class="item-group">
                            <small>Slut</small>
                            <p>{{ displayLocation(item.endDestination) }}</p>
                        </div>
                        <div class="item-group">
                            <small>Tidspunkt</small>
                            <p>{{ item.departureTime.format("D MMM YYYY, HH:mm") }}</p>
                        </div>
                        <div class="item-group">
                            <small>Pris</small>
                            <p>{{ item.price }} DKK</p>
                        </div>
                    </li>
                </ul>
                <p
                    v-else
                    align="center"
                >
                    <i>Henter de seneste ture...</i>
                </p>
            </div>
        </Container>
    </Page>
</template>

<script>
import Moment from 'moment';

import { fetchOpenRides, acceptRide } from '../api';
import { displayLocation } from '../utils';

import Page from '../components/Page.vue';
import Container from '../components/Container.vue';

/**
 * The main page displaying the rides. The client must be logged in to see this
 * page, because of the 'auth' middleware.
 *
 * @module Pages/Index
 *
 * @vue-data {Array} items - The list of retrieved items
 * @vue-data {String} errorMessage - The latest error message
 * @vue-data {Function} interval - THe interval loop used to call retrieve event
 *
 * @vue-computed {String} name - Returns the name of the current state account
 * @vue-computed {Bool} loggedIn - Return the login status from the current state
 *
 * @vue-event {} logout - The logout method dispatching 'logout' to the store
 * @vue-event {Array} retrieve - retrieves open rides from backend
 */
export default {
    components: {
        Page,
        Container,
    },

    data: () => ({
        items: [],
        errorMessage: '',
        interval: null,
        currentRides: null,
    }),

    head: () => ({
        title: 'Oversigt',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Oversigt over ture',
            },
        ],
    }),

    computed: {
        name() {
            // return this.$store.state.auth.user.name || 'temp';
            return 'temp';
        },
        loggedIn() {
            return this.$store.state.auth.token != null;
        },
    },

    /**
     * Creation lifecycle hook
     *
     * Initializes an interval which calls the retrieve event every 5 seconds.
     *
     * @memberOf Pages/Index
     */
    created() {
        console.log('Retrieving latest open rides');

        // Retrieve first on creation
        this.retrieve()
            .then(() => {
                // Then retrieve every 5 seconds
                this.interval = setInterval(() => this.retrieve(), 5000);
            });
    },

    methods: {
        // Import displayLocation method for view use
        displayLocation,

        retrieve() {
            return fetchOpenRides(this.$store.state.auth.token)
                .then((res) => {
                    if (res.data.orders.length === 0) {
                        this.errorMessage = 'Der er ingen åbne ture';
                        return;
                    }

                    this.items = res.data.orders.map(item => ({
                        id: item.id,
                        startDestination: item.rides[0].startDestination,
                        endDestination: item.rides[item.rides.length - 1].endDestination,
                        departureTime: new Moment(item.rides[0].departureTime),
                        price: item.price,
                    }));
                });
        },

        setRide(id) {
            console.log(id);
        },

        acceptRide(id) {
            acceptRide(this.$store.state.auth.token, id);
        },
    },
};
</script>

<style lang="scss">
@import '../styles/helpers.scss';

.content {
    background-color: #F2F1F1;
}

.rides {
    padding: 0;
    margin: 20px 0;

    list-style: none;
}

.rides .item {
    display: grid;
    grid-template-columns: 1fr 1fr 170px 120px;
    width: 100%;
    padding: 10px 20px;

    border-bottom: 1px solid #DDD;

    cursor: pointer;
    transition: $speed-short $animation;

    @include bp(hg) {
        grid-template-columns: 1fr 1fr 200px 120px;
    }

    &:hover {
        box-shadow: $shadow-medium;
        border-color: transparent;
    }

    .item-group {

        small {
            color: rgba($black, 0.5);
        }

        p {
            margin: 0;
        }
    }
}

.error {
    text-align: center;

    color: red;
}

</style>
