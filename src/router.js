import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import CoursesIndex from './views/courses/Index'
import CoursesCreate from './views/courses/Create'
import CourseView from './views/courses/View'
import EnrolmentsIndex from './views/enrolments/Index'
import LecturersIndex from './views/lecturers/Index'
import LecturersCreate from './views/lecturers/Create'
import LecturerView from './views/lecturers/View'


Vue.use(Router)
// Vue.forceUpdate();

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
        path:'/courses/create',
        name: 'courses_create',
        component: CoursesCreate
        },

        {
        path:'/courses/:id',
        name: 'course_view',
        component: CourseView
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

        {
        path:'/lecturers/create',
        name: 'lecturers_create',
        component: LecturersCreate
        },

        {
        path:'/lecturers/:id',
        name: 'lecturer_view',
        component: LecturerView
        },
        

    ]
});