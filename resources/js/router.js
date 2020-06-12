import Vue from "vue";
import VueRouter from "vue-router";

import PageHome from "./components/Home";
import PageAbout from "./components/About";
import login from "./components/login";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: PageHome
        },
        {
            path: "/about",
            component: login
        },

    ]
});

export default router;
