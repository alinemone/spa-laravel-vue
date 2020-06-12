<template>
    <div>
        <nav class="navbar navbar-expand-lg  navbar-dark bg-primary bg-abi">
            <a class="navbar-brand" href="/"> ❤️ = Laravel + Vue </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">

                        <router-link class="nav-item" active-class="active" to="/" tag="li" exact><a class="nav-link">Home</a></router-link>

                    <router-link class="nav-item" active-class="active" to="/about" tag="li" exact><a class="nav-link">About</a></router-link>

                </ul>
            </div>
        </nav>

        <main>
            <router-view/>
        </main>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped>
    .bg-abi{background-color: #23d3d3 !important;}
</style>
