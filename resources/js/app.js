/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import router from "./router";
import App from "./components/App";
import VueSweetalert2 from 'vue-sweetalert2';
window.Swal = VueSweetalert2;
Vue.use(VueSweetalert2);


export const HTTP = axios.create({
    // baseURL: `loc`,
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer {token}'
    }
})
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('app-component', require('./components/App.vue').default);
// Vue.component('pagination', require('./components/pagination.vue').default);
Vue.component('pagination', require('laravel-vue-pagination'));
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,               // <-- register router with Vue
    render: (h) => h(App) // <-- render App component
});
