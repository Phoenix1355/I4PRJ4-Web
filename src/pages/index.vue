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
                    <p class="item-startDestination">
                        {{ item.startDestination }}
                    </p>
                    <p class="item-endDestination">
                        {{ item.slutDestination }}
                    </p>
                    <p class="item-departureTime">
                        {{ item.departureTime.format("D MMM YYYY, HH:mm") }}
                    </p>
                    <p class="item-price">
                        {{ item.price }}
                    </p>
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

            this.$axios.get('/api/Rides/Open')
                .then((res) => {
                    console.log('Received response');

                    if (res.data.length === 0) {
                        this.errorMessage = 'List is empty';
                        return;
                    }

                    this.items = res.data.map(item => ({
                        startDestination: item.startDestination,
                        slutDestination: item.slutDestination,
                        departureTime: new Moment(item.departureTime),
                        price: item.price,
                    }));
                });
        },
    },
};
</script>

<style lang="scss">
@import '../styles/helpers.scss';

.container {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;

    @include bp(xl) {
        max-width: 600px;
    }
}

.item {
    display: flex;
    width: 100%;
    padding: 10px 5px;
    border-bottom: 1px solid #DDD;

    .item-startDestination{
        .item-endDestination{
            .item-departureTime{
                flex: 1;
                width: 100%;

                text-align: left;
            }
        }
    }

    .item-price{
        width: 40px;
    }
}

.error {
    color: red;
}

</style>
