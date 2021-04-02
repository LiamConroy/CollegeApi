<template>
    <b-container fluid ="lg">
        <b-col class = "center mb-5">
        This is the Lecturers page
        <br>
        <button class = "mr-5" @click="getLecturers()">Get Lecturers</button>
        <button class = "" @click="logout()">Logout</button>
        <button class = "ml-5" @click="toCreate()">Add Lecturer</button>
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
                         <th scope ="col"></th>
                         <th scope ="col"></th>
                      </tr>
                 </thead>
                    
                 <tbody v-for="lecturer in lecturers"
                    v-bind:key="lecturer.id" >
                     <tr>
                         <td @click.prevent="toLecturer(lecturer.id,lecturer.name)">{{lecturer.name}}</td>
                         <td>{{lecturer.email}}</td>
                         <td>{{lecturer.phone}}</td>

                         <td><b-button class = "float-right" variant="primary">Edit</b-button></td>
                         <td><b-button class = "float-right" variant="danger" @click.prevent ="deleteCourse(lecturer.id)">Delete</b-button></td> 
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

         deleteCourse:function(id){
            let token = localStorage.getItem('token');

             //Window.confirm("Are you sure you want to delete this course?");
            //  axios.delete('http://college.api:8000/api/courses/', +id )
            
            axios.delete('http://college.api:8000/api/lecturers/'+id,
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

        toLecturer(id,name){
            this.$router.push('lecturers/'+id)
            alert("You are viewing "+name)
        },

        toCreate(){
             this.$router.push('/lecturers/create');
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