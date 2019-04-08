<template>
    <Container>
        <h1>Turoversigt</h1>
        <div v-if="loggedIn">
            <p>Velkommen, {{ name }}</p>
            <p
                v-if="errorMessage !== ''"
                class="error"
            >
                {{ errorMessage }}
            </p>
            <ul class="list">
                <li
                    v-for="item in items"
                    :key="item.id"
                    class="item"
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
            <p>
                <Button
                    :on-click="retrieve"
                >
                    Refresh
                </Button>
            </p>
            <p>
                <Button
                    :on-click="logout"
                >
                    Logout
                </Button>
            </p>
        </div>
    </Container>
</template>

<script>
import Moment from 'moment';
import Container from '../components/Container.vue';
import Button from '../components/Button.vue';


/**
 * The main page displaying the rides. The client must be logged in to see this
 * page, because of the 'auth' middleware.
 *
 * @namespace Pages / Index
 *
 * @vue-computed {String} name - Returns the name of the current state account
 * @vue-event {} logout - The logout method dispatching 'logout' to the store
 * @vue-event {Array} retrieve - retrieves open rides from backend
 */
export default {
    middleware: 'auth',
    components: {
        Button,
        Container,
    },
    data: () => (
        {
            items: [],
            errorMessage: '',
        }
    ),
    computed: {
        name() {
            console.log(this.$store);
            return this.$store.state.auth.user.name;
        },
        loggedIn() {
            return this.$store.state.auth.token != null;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
                .then(() => this.$router.push('/login'));
        },

        retrieve() {
            console.log('Requested rides from api');

            this.$axios.get('/api/Order/Open', {
                headers: {
                    Authorization: `Bearer ${this.$store.state.auth.token}`,
                },
            }).then((res) => {
                console.log(res);

                if (res.data.length === 0) {
                    this.errorMessage = 'List is empty';
                    return;
                }

                this.items = res.data.orders.map(item => ({
                    startDestination: item.rides[0].startDestination,
                    endDestination: item.rides[item.rides.length - 1].endDestination,
                    departureTime: new Moment(item.departureTime),
                    price: item.price,
                }));
            });
        },

        displayLocation(loc) {
            const {
                streetName,
                streetNumber,
                postalCode,
                cityName,
            } = loc;

            return `${streetName} ${streetNumber}, ${postalCode} ${cityName}`;
        },
    },
};
</script>

<style lang="scss">
@import '../styles/helpers.scss';

.item {
    display: grid;
    grid-template-columns: 1fr 1fr 150px 100px;
    width: 100%;
    padding: 10px 5px;
    border-bottom: 1px solid #DDD;

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
    color: red;
}

</style>
