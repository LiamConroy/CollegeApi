<template>
    <b-container fluid ="lg">
        <b-col class = "center mb-5">
        This is the Lecturers page
        <br>
        <button class = "mr-5" @click="getLecturers()">Get Lecturers</button>
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
                         <th scope ="col">Name</th>
                         <th scope ="col">Email Address</th>
                         <th scope ="col">Phone Number</th>
                      </tr>
                 </thead>
                    
                 <tbody v-for="lecturer in lecturers"
                    v-bind:key="lecturer.id" >
                     <tr>
                         <td>{{lecturer.name}}</td>
                         <td>{{lecturer.email}}</td>
                         <td>{{lecturer.phone}}</td> 
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
        name: 'LecturerIndex',
        components: {

        },
     data(){
         return{
            lecturers: []
        }
     },

    mounted(){
        
    },

     methods :{
         getLecturers(){
           let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/lecturers',{
               headers: {Authorization: "Bearer " + token}
           })
            .then(response => {
                console.log(response.data);
                // default is nothing
                this.lecturers = response.data.data
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