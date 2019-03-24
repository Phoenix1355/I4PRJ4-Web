<template>
    <section>
        <h1>Login</h1>
        <div>
            <form class="login" @submit.prevent="login">
                <p>
                    <label for="email">Email</label>
                    <input
                        required
                        v-model="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        id="email"
                    >
                </p>
                <p>
                    <label for="password">Kodeord</label>
                    <input
                        required
                        v-model="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        id="password"
                    >
                </p>
                <button type="submit">Log ind</button>
            </form>
        </div>
    </section>
</template>

<script type="text/javascript">
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    // middleware: 'auth',
    data: () => ({
        email: 'test@test.dk',
        password: 'hejhej123',
    }),
    methods: {
        login() {
            const {
                email = '',
                password = '',
            } = this;

            this.$store.dispatch('login', { email, password })
                .then(() => this.$router.push('/'))
                .catch(err => console.log(err));
        }
    },
};
</script>

<style media="screen" lang="scss">

</style>
