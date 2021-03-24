<template>
    <b-container fluid ="lg">
        <b-col class = "center mb-5">
        This is the Enrolemts Page
        <br>
        <button class = "mr-5" @click="getCourses()">Get Courses</button>
        <button class = "ml-5" @click="logout()">Logout</button>
        </b-col>

        <b-row>
        <b-col>
            <!-- <b-card-group columns>
            <b-card v-for="course in courses"
                    v-bind:key="course.id" 
            >

            <tr>
                <td>{{course.title}}</td>
                
                <td>{{course.code}}</td>
                
                <td>{{course.description}}</td>
            </tr> 

            
            
            </b-card>
            </b-card-group>    -->

             <table class ="table center">
                 
                 <thead>
                     <tr>
                         <th scope ="col">Title</th>
                         <th scope ="col">Code</th>
                         <th scope ="col">Description</th>
                      </tr>
                 </thead>
                    
                 <tbody v-for="course in courses"
                    v-bind:key="course.id" >
                     <tr>
                         <td>{{course.title}}</td>
                         <td>{{course.code}}</td>
                         <td>{{course.description}}</td> 
                     </tr>
                </tbody>
             </table>
        </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'CourseIndex',
        components: {

        },
     data(){
         return{
            courses: []
        }
     },

    mounted(){

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