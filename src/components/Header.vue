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
                <Dropdown />
            </nav>
        </Container>
    </header>
</template>

<script>
import Dropdown from './Dropdown.vue';
import Container from './Container.vue';

export default {
    components: {
        Container,
        Dropdown,
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.token != null;
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
