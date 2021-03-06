import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

import CoursesIndex from './views/courses/Index'
import CoursesCreate from './views/courses/Create'
import CourseView from './views/courses/View'
import CourseEdit from './views/courses/Edit'

import EnrolmentsIndex from './views/enrolments/Index'
import EnrolmentsCreate from './views/enrolments/Create'
import EnrolmentEdit from './views/enrolments/Edit'
import EnrolmentView from './views/enrolments/View'

import LecturersIndex from './views/lecturers/Index'
import LecturersCreate from './views/lecturers/Create'
import LecturerView from './views/lecturers/View'
import LecturerEdit from './views/lecturers/Edit'


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
        path:'/courses/edit/:id',
        name: 'course_edit',
        component: CourseEdit
        },

        {
        path:'/enrolments',
        name: 'enrolments_index',
        component: EnrolmentsIndex
        },

        {
        path:'/enrolments/create',
        name: 'enrolments_create',
        component: EnrolmentsCreate
        },

        {
        path:'/enrolments/edit/:id',
        name: 'enrolments_edit',
        component: EnrolmentEdit
        },

        {
        path:'/enrolments/:id',
        name: 'enrolments_view',
        component: EnrolmentView
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

        {
        path:'/lecturers/edit/:id',
        name: 'lecturer_edit',
        component: LecturerEdit
        },
        

    ]
});