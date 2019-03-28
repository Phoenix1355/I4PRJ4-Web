<template>
    <Container>
        <h1>Turoversigt</h1>
        <div v-if="$store.state.auth">
            <p>Velkommen, {{ name }}</p>
            <p><Button :onClick="logout">Logout</Button></p>
        </div>
    </Container>
</template>

<script>
import Cookie from 'js-cookie';

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
 */
export default {
    middleware: 'auth',
    computed: {
        name() {
            console.log(this.$store);
            return this.$store.state.account.name;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
                .then(() => this.$router.push('/login'));
        }
    },
    components: {
        Button,
        Container,
    },
}
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
</style>
