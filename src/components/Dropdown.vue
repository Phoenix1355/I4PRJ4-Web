<template lang="html">
    <div class="dropdown">
        <button class="dropbtn">
            {{ name }}
        </button>
        <div class="dropdown-content">
            <a href="#">Rediger konto</a>
            <a
                href="#"
                @click="logout()"
            >
                Log ud
            </a>
        </div>
        <small> {{ email }} </small>
    </div>
</template>

<script>
export default {
    computed: {
        name() {
            // TODO: Retrieve TaxiCompany name from store
            // return this.$store.state.auth.user.name || 'temp';
            return 'Firstname';
        },
        email() {
            // TODO: Retrieve email from the store
            return 'wrong@email.dk';
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

.dropbtn {
    background-color: White;
    color: Black;
    padding: 16px;
    font-size: 16px;
    font-weight: bold;
    border: none;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border: 1px solid #DDD;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {background-color: #ddd;}
</style>
