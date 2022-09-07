import HomeComponent from '../components/HomeComponent'
import LoginComponent from '../components/LoginComponent'
import SignUpComponent from '../components/SignUpComponent'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        component: HomeComponent
    },
    {
        path: '/login/',
        component: LoginComponent
    },
    {
        path: '/sign_up/',
        component: SignUpComponent
    }
]
export default createRouter({
    history: createWebHistory(),
    routes, 
  })
