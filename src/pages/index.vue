<template>
    <Page>
        <Container>
            <h1>Turoversigt</h1>
            <div>
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
            <Modal ref="modal">
                <div slot="content">
                    <p v-if="currentRide.details == null">Loading...</p>
                    <div v-else>
                        <h4>Turoversigt</h4>
                        <ul>
                            <li
                                v-for="item in currentRide.details.rides"
                                :key="item.key"
                            >
                                <p>{{ displayLocation(item.dest) }}</p>
                            </li>
                        </ul>
                        <h4>Kunder</h4>
                        <ul>
                            <li
                                v-for="item in currentRide.details.customers"
                                :key="item.customerId"
                            >
                                <p class="customer">
                                    <span>{{ item.customer.name }}</span>
                                    <span>{{ item.customer.phoneNumber }}</span>
                                    <span>{{ item.customer.email }}</span>
                                </p>
                            </li>
                        </ul>
                        <h4>Detaljer</h4>
                        <p>Pris: {{ currentRide.details.price }} DKK</p>
                        <p>Antal passagerer: {{ currentRide.details.passengerCount }}</p>
                        <p>
                            Tidspunkt:
                            {{ currentRide.details.departureTime.format("D MMM YYYY, HH:mm") }}
                        </p>
                        <p>
                            Senest bekræftes:
                            {{ currentRide.details.confirmationTime.format("D MMM YYYY, HH:mm") }}
                        </p>
                    </div>
                </div>
                <template slot="footer">
                    <Button
                        @click="acceptCurrentRide()"
                    >
                        Accepter
                    </Button>
                    <Button
                        type="secondary"
                        @click="closeModal()"
                    >
                        Annuler
                    </Button>
                </template>
            </Modal>
        </Container>
    </Page>
</template>

<script>
import Moment from 'moment';

import { openRidesAll, openRidesDetails, openRidesAccept } from '../api';
import { displayLocation } from '../utils';

import Button from '../components/Button.vue';
import Page from '../components/Page.vue';
import Container from '../components/Container.vue';
import Modal from '../components/Modal.vue';

// List of status errors and the message to display.
const errors = {
    401: 'Din session token er ikke valid.', // Unauthorized
};

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
        Modal,
        Button,
    },

    data: () => ({
        items: [],
        errorMessage: '',
        interval: null,
        currentRide: {
            id: null,
            details: null,
        },
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

        closeModal() {
            this.$refs.modal.close();
        },

        retrieve() {
            if (this.errorMessage !== '') {
                console.log('Clearing interval because of error');
                return clearInterval(this.interval);
            }

            return openRidesAll(this.$store.state.auth.token)
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
                })
                .catch((err) => {
                    this.errorMessage = errors[err.response.status];
                });
        },

        setRide(id) {
            this.currentRide.id = id;
            this.currentRide.details = null;

            // Open the modal
            this.$refs.modal.open();

            // Fetch the details for the given ride
            openRidesDetails(this.$store.state.auth.token, id)
                .then((res) => {
                    const {
                        data: order,
                    } = res;

                    console.log(res);

                    const startDests = [];
                    const endDests = [];
                    let i = 0;

                    const customers = [];

                    let passengerCount = 0;

                    const sortedRides = order.rides.sort(
                        (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
                    );

                    let shortestConf = null;

                    sortedRides.forEach((item) => {
                        startDests.push({
                            dest: item.startDestination,
                            key: i++, // eslint-disable-line
                        });
                        endDests.push({
                            dest: item.endDestination,
                            key: i++, // eslint-disable-line
                        });
                        customers.push({
                            customer: item.customer,
                            key: item.customerId,
                        });
                        passengerCount += item.passengerCount;

                        if (shortestConf == null
                        || new Date(item.confirmationDeadline) < new Date(shortestConf)) {
                            console.log('new conf deadline', item.confirmationDeadline);
                            shortestConf = item.confirmationDeadline;
                        }
                    });

                    this.currentRide.details = {
                        rides: startDests.concat(endDests),
                        customers,
                        price: order.price,
                        passengerCount,
                        departureTime: new Moment(sortedRides[0].departureTime),
                        confirmationTime: new Moment(shortestConf),

                    };
                })
                .catch((err) => {
                    console.log(err);
                    this.errorMessage = errors[err.response.status];
                });
        },

        acceptCurrentRide() {
            // DEBUG: For testing purposes
            console.log(`Accepting ride: ${this.currentRide.id} `);

            // If the ride hasen't been set, we shouldn't try to accept
            if (this.currentRide.id == null) return;

            openRidesAccept(this.$store.state.auth.token, this.currentRide.id)
                .then((res) => {
                    console.log(res);

                    // Close the modal
                    this.$refs.modal.close();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss">
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
