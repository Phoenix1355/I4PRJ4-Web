<template lang="html">
    <header class="site-header">
        <Container>
            <p class="branding">
                SmartCab
            </p>
            <nav
                v-if="loggedIn"
                id="dropdown"
                class="navigation"
            >
                <Dropdown :text="name">
                    <DropdownHead>
                        Logget ind med:
                        <strong>{{ email }}</strong>
                    </DropdownHead>
                    <DropdownDivider />
                    <DropdownItem
                        disabled
                    >
                        Rediger konto
                    </DropdownItem>
                    <DropdownItem @click="logout()">
                        Log ud
                    </DropdownItem>
                </Dropdown>
            </nav>
        </Container>
    </header>
</template>

<script>
import Dropdown, { DropdownHead, DropdownItem, DropdownDivider } from './Dropdown.vue';
import Container from './Container.vue';

/**
 * Page header component. Displays the header with the logo and the user dropdown men
 *
 * @module Components/Header
 *
 * @vue-computed {Bool} loggedIn - Fetches the login state from the store state
 * @vue-computed {String} name - Fetches the user name from the store state
 * @vue-computed {String} email - Fetches the user email from the store state
 *
 * @vue-event {State} logout - Logs the user out by dispatching logout to the store
 */
export default {
    components: {
        Container,
        Dropdown,
        DropdownHead,
        DropdownItem,
        DropdownDivider,
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.token != null;
        },
        name() {
            return this.$store.state.auth.user.name || 'undefined';
        },
        email() {
            return this.$store.state.auth.user.email || 'undefined';
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

<style lang="scss" scoped>
.site-header .container {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "a b c";

    border-bottom: 1px solid #DDD;

    .smartCab {
        grid-area: a;
        font-size: 16px;
        font-weight: bold;
    }

    .navigation {
        grid-area: c;
    }
}
</style>
