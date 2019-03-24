<template>
    <section>
        <h1>Login</h1>
        <div>
            <form>
                <p>
                    <label for="email"></label>
                    <input type="email" name="email" placeholder="Email" id="email">
                </p>
                <p>
                    <label for="password"></label>
                    <input type="password" name="password" placeholder="Password" id="password">
                </p>
                <button type="button" @click="submit">Signup</button>
            </form>
        </div>
    </section>
</template>

<script type="text/javascript">
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    // middleware: 'auth',
    methods: {
        submit() {
            setTimeout(() => {
                const auth = {
                    accessToken: 'someStringWeGotFromTheApiService',
                };

                this.$store.commit('setAuth', auth);

                Cookie.set('auth', auth);

                this.$router.push('/')
            }, 1000);
        },
    },
};
</script>

<style media="screen" lang="scss">

</style>
