<template>
    <b-container fluid ="lg">
        <b-col class = "center mb-5">
        This is the view course page
        <br>
        <!-- <button class = "mr-5" @click.prevent="courseGet()">Get Course</button> -->
        <!-- <button class = "" @click="logout()">Logout</button>
        <button class = "ml-5" @click="toCreate()">Add Course</button> -->
        </b-col>

        <b-row>
        <b-col>

            <div>
                <h1>Title: {{courses.title}}</h1>
                <h1>Code: {{courses.code}}</h1>
                <h1>Description: {{courses.description}}</h1>
                <h1>Points: {{courses.points}}</h1>
                <h1>Level: {{courses.level}}</h1>
            </div>

        </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'CourseView',
        components: {

        },
     data(){
         return{
            courses: []

        }
     },

    mounted(){
        this.courseGet();        
    },

     methods :{
         getCourses(){
           let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/courses',{
               headers: {Authorization: "Bearer " + token}
           })
            .then(response => {
                console.log(response.data);
                // default is nothing
                this.courses = response.data.data
            })

            .catch(error => {
                console.log(error)

                console.log(error.response.data)
            })  
         },

         courseGet(){
             let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/courses/'+this.$route.params.id,
           {
               headers: {Authorization: "Bearer " + token}
           })
          
            .then(response => {
                console.log(response.data);
                // default is nothing
                this.courses = response.data.data
            })

            .catch(error => {
                console.log(error)

                console.log(error.response.data)
            }) 
         },

         toCreate(){
             this.$router.push('/courses/create');
         },

         deleteCourse:function(id){
            let token = localStorage.getItem('token');

            confirm('Are you sure you want to delete ${name}');
             //Window.confirm("Are you sure you want to delete this course?");
            //  axios.delete('http://college.api:8000/api/courses/', +id )
            
            axios.delete('http://college.api:8000/api/courses/'+id,
            {headers: {Authorization: "Bearer " + token}},
            {action:'destroy'
            })
            
             .then(response => {
                console.log(response.data);
                // default is nothing
                this.courses = response.data.data
            })

            .catch(error => {
                console.log(error)

                console.log(error.response.data)
            })  

         },

         toCourse(id){
             this.$router.push('http://college.api:8000/api/courses/'+id);
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
        })



        .catch(error => {
            console.log(error)
            console.log(error.response.data)
        })  

        localStorage.removeItem('token');
    }

    },
        
}
</script>

<style>
    .center {
    text-align: center;
    margin: auto;
    }
</style>