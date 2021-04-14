<template>
    <div>
        <!-- <b-container> -->
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand >CollegePortal</b-navbar-brand>
            <b-nav-item to="/courses">Courses</b-nav-item>
            <b-nav-item to="/enrolments">Enrolments</b-nav-item>
            <b-nav-item to="/lecturers">Lecturers</b-nav-item>
        </b-navbar>
        <!-- </b-container> -->
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'Navbar',
        components: {

        },
     data(){
         return{
        
        }
     },

     methods :{

         getUser(){
            let token = localStorage.getItem('token');

           axios.put('http://college.api:8000/api/user',{
               headers: {Authorization: "Bearer " + token}
           })
            .then(response => {
                console.log(response.data);
            })

            .catch(error => {
                console.log(error)

                console.log(error.response.data)
            })  
         }
     },
}
</script>

<style>
    .navbar {
        background-color: #9d2020;
    }

    .user {
        /* text-align: float-right; */
        display:inline-block;
        margin-left: 1650px; 
        text-decoration: none;
        font-size: 20px;;

    }

    a:link {
        color: white;
        text-decoration: none;
        list-style-type:none;
    }

    a:hover {
        color: black;
        text-decoration: none;
        list-style-type:none;
    }

    ul {
       list-style-type:none; 
    }   

    li {
       list-style-type:none; 
    }  
    
</style>