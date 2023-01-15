import { createRouter, createWebHistory } from "vue-router";
import AppPage from "./pages/AppPage.vue"

const routes = [
    {
        path : "/",
        name : "RegisterPage",
        component : () => import("./pages/RegisterPage.vue")
    },
    {
        path : "/app",
        name : "AppPage",
        component : AppPage
    }
] 

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router