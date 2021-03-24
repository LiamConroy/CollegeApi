import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import CoursesIndex from './views/courses/Index'
import EnrolmentsIndex from './views/enrolments/Index'
import LecturersIndex from './views/lecturers/Index'
Vue.use(Router)

export default new Router ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path:'/',
        name: 'home',
        component: Home
        },

        {
        path:'/courses',
        name: 'courses_index',
        component: CoursesIndex
        },

        {
        path:'/enrolments',
        name: 'enrolments_index',
        component: EnrolmentsIndex
        },

        {
        path:'/lecturers',
        name: 'lecturers_index',
        component: LecturersIndex
        },
    ]
});