<template>
    <div>
        <!-- <b-container> -->
        <b-navbar toggleable="lg" type="dark" class = "">

            <b-navbar-brand >CollegePortal</b-navbar-brand>
            
            <b-nav-item @click="toCourses()"><p class = "navText mb-0">Courses</p></b-nav-item>
            <b-nav-item @click="toEnrolments()"><p class = "navText mb-0">Enrolments</p></b-nav-item>
            <b-nav-item @click="toLecturers()"><p class = "navText mb-0">Lecturers</p></b-nav-item>
           

    <!-- <b-nav-item-dropdown class = "navRight" id="dropdown-right" text="User" toggle-class="nav-link-custom" right>
      <b-dropdown-item>Logout</b-dropdown-item>
    
    </b-nav-item-dropdown> -->

    <b-navbar-nav class = "ml-auto dropDown mr-2">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em class = "dropDown">User</em>
          </template>
          <b-dropdown-item @click="logout()" href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>

        </b-navbar-nav>
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
             users: []
             
        }
     },

     mounted(){
        this.getUser();
    },

     methods :{

         getUser(){
            // let token = localStorage.getItem('token');
           axios.get('http://college.api:8000/api/user',{
            //    headers: {Authorization: "Bearer " + token}
           })
            .then(response => {
                console.log(response.data);
                this.users.data.name
            })

            .catch(error => {
                console.log(error)

                console.log(error.response.data)
            })  
    },

    logout() {
        let token = localStorage.getItem('token');
         axios.get('http://college.api:8000/api/logout',{
               headers: {Authorization: "Bearer " + token}
        })
         .then(response => {
            console.log(response.data);
            console.log("Logged out");
            this.courses = response.data.data;
             this.$router.push('/');
        })



        .catch(error => {
            console.log(error)
            console.log(error.response.data)
        })  

        localStorage.removeItem('token');
    },

    toCourses(){
    let token = localStorage.getItem('token');

    if(token != null){
        this.$router.push('/courses');   
    }

    else{
        alert("Please login to access")
    }
        
    },

    toLecturers(){
    let token = localStorage.getItem('token');

    if(token != null){
        this.$router.push('/lecturers');   
    }

    else{
        alert("Please login to access")
    }
    },

    toEnrolments(){
    let token = localStorage.getItem('token');

    if(token != null){
        this.$router.push('/enrolments');   
    }

    else{
        alert("Please login to access")
    }
    },
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

    .navText {
        color: white;
    }

    .dropDown{
        font-style: bold;
        color:white;
        font-size: 20px;
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