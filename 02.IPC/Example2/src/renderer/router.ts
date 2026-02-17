import {
    createRouter,
    createWebHashHistory
} from "vue-router";

import Home from "./components/Home.vue";
import Form from "./components/Form.vue";


const routes = [
    { path: '/', component: Home },
    { path: '/form', component: Form }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;