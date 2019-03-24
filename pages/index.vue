<template>
    <section class="container">
        <h1>Homepage</h1>
        <div v-if="$store.state.auth">
            <p>You're authenticated!</p>
            <p><button @click="logout">Logout</button></p>
        </div>
    </section>
</template>

<script>
import Cookie from 'js-cookie';

export default {
    middleware: 'auth',
    methods: {
        logout() {
            this.$store.dispatch('logout')
                .then(() => this.$router.push('/login'));
        }
    }
}
</script>

<style>
.container {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
}
</style>
