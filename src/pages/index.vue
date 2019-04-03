<template>
    <Container>
        <h1>Turoversigt</h1>
        <div v-if="loggedIn">
            <p>Velkommen, {{ name }}</p>
            <ul class="list">
                <li v-for="item in items" class="ride">
                    <p class="ride-startDestination">
                        {{ ride.startDestination}}
                    </p>
                    <p class="ride-endDestination">
                        {{ ride.slutDestination}}
                    </p>
                    <p class="ride-departureTime">
                        {{ ride.departureTime.format("D MMM YYYY, HH:mm") }}
                    </p>
                    <p class="ride-price">
                        {{ ride.price }}
                    </p>
                </li>
            </ul>
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
import Container from '../components/Container.vue';
import Button from '../components/Button.vue';

axios.default.baseURL = "https://smartcabbackend.azurewebsites.net";

/**
 * The main page displaying the rides. The client must be logged in to see this
 * page, because of the 'auth' middleware.
 *
 * @namespace Pages / Index
 *
 * @vue-computed {String} name - Returns the name of the current state account
 * @vue-event {} logout - The logout method dispatching 'logout' to the store
 */
export default {
    middleware: 'auth',
    components: {
        Button,
        Container,
    },
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

.ride {
    display: flex;
    width: 100%;
    padding: 10px 5px;
    border-bottom: 1px solid #DDD;

    .ride-startDestination{
        .ride-endDestination{
            .ride-departureTime{
                flex: 1;
                width: 100%;

                text-align: left;
            }
        }
    }

    .ride-price{
        width: 40px;
    }
}

</style>
