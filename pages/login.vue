<template>
    <section class="container">
        <h1>Login</h1>
        <p>Velkommen tilbage, venligst log ind på din konto.</p>
        <p v-if="errorMessage !== ''" class="error">{{ errorMessage }}</p>
        <div class="login-form">
            <form @submit.prevent="login">
                <div class="input-group">
                    <label for="email">
                        <small>Email adresse</small>
                        <input
                            required
                            v-model="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            id="email"
                        >
                    </label>
                </div>
                <div class="input-group">
                    <label for="password">
                        <small>Kodeord</small>
                        <input
                            required
                            v-model="password"
                            type="password"
                            name="password"
                            placeholder="Kodeord"
                            id="password"
                        >
                    </label>
                </div>
                <Button type="submit">Log ind</Button>
            </form>
        </div>
    </section>
</template>

<script type="text/javascript">
import Button from '../components/Button.vue';
import Cookie from 'js-cookie';

// List of status errors and the message to display.
const errors = {
    400: 'En bruger med denne email eksisterer ikke.',
};

/**
 * The page displaying the login form
 *
 * @namespace Pages / Login
 *
 * @vue-data {String} [email=''] - The input email
 * @vue-data {String} [password=''] - The input password
 * @vue-computed {String} errorMessage - Returns the error message attached to
 * the error status code
 * @vue-event {String} login - The login method used for logging in
 */
export default {
    // middleware: 'auth',
    data: () => ({
        email: '',
        password: '',
    }),
    computed: {
        errorMessage() {
            const {
                errorStatus,
            } = this.$store.state;

            return errors[errorStatus];
        },
    },
    methods: {
        login() {
            const {
                email,
                password,
            } = this;

            this.$store.dispatch('login', { email, password });
        }
    },
    components: {
        Button,
    },
};
</script>

<style media="screen" lang="scss">
@import '../styles/helpers.scss';
@import '../styles/typography.scss';

.container {
    padding: 40px;
}

.input-group {
    width: 400px;
    margin-bottom: 20px;

    background-color: #F2F2F2;

    small {
        display: block;
        padding: 20px 20px 0 20px;

        color: rgba($black, 0.5);
    }

    input {
        @extend .oat;

        width: 100%;
        padding: 0 20px 20px;
        margin: 0;

        background: none;
        outline: 0;
        border: 0;
    }

    &:focus {
        border-left: 2px solid blue;
    }
}

.login-form {
    margin: 20px 0;
}

.error {
    color: red;
}

</style>
