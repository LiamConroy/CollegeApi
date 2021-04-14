<template>
    <b-container fluid ="lg">
        <b-col class = "center mb-5">
        This is the Enrolemts Page

       davinki: {{courses.title}}
        <br>
        <button class = "mr-5" @click="getEnrolments()">Get Enrolemts</button>
        <button class = "" @click="toCreate()">Add Enrolments</button>
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
                         <th scope ="col">Date</th>
                         <th scope ="col">Time</th>
                         <th scope ="col">Status</th>
                         <th scope ="col">Course</th>
                         <th scope ="col">Lecturer</th>
                         <th scope ="col"></th>
                         <th scope ="col"></th>
                      </tr>
                 </thead>
                    
                 <tbody v-for="enrolment in enrolments"
                    v-bind:key="enrolment.id" >
                     <tr>
                         <td @click.prevent="toEnrolment(enrolment.id)"><a href = "#">{{enrolment.date}}</a></td>
                         <td>{{enrolment.time}}</td>
                         <td>{{enrolment.status}}</td>
                         <td>{{enrolment.course.title}}</td> 
                         <td>{{enrolment.lecturer.name}}</td>
                         <td><b-button name = "edit" class = "float-right" variant="primary" @click.prevent ="editEnrolment(enrolment.id)">Edit</b-button></td>
                         <td><b-button name ="delete" class = "float-right" variant="danger" @click.prevent ="deleteEnrolment(enrolment.id)">Delete</b-button></td>
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
        name: 'EnrolmentsIndex',
        components: {

        },
     data(){
         return{
            enrolments: [],
            courses: []
        }
     },

    mounted(){

    },

     methods :{
         getEnrolments(){
           let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/enrolments',{
               headers: {Authorization: "Bearer " + token}
           })
            .then(response => {
                console.log(response.data);
                // default is nothing
                this.enrolments = response.data.data
            })

            .catch(error => {
                console.log(error)

                console.log(error.response.data)
            })  

         },

         deleteEnrolment:function(id){
            let token = localStorage.getItem('token');

            confirm('Are you sure you want to delete ${name}');
             //Window.confirm("Are you sure you want to delete this course?");
            //  axios.delete('http://college.api:8000/api/courses/', +id )
            
            axios.delete('http://college.api:8000/api/enrolments/'+id,
            {headers: {Authorization: "Bearer " + token}},
            {action:'destroy'
            })
            
             .then(response => {
                console.log(response.data);
                // default is nothing
                this.enrolments = response.data.data
            })

            .catch(error => {
                console.log(error)

                console.log(error.response.data)
            })  

         },

         toCreate(){
             this.$router.push('/enrolments/create');
         },

         toEnrolment(id){
            this.$router.push('enrolments/'+id)
        },

         editEnrolment(id,title){
             this.$router.push('enrolments/edit/'+id);
             alert('you are viewing '+title);
         },

         logout() {
        let token = localStorage.getItem('token');
         axios.get('http://college.api:8000/api/logout',{
               headers: {Authorization: "Bearer " + token}
        })
         .then(response => {
            console.log(response.data);
            console.log("Logged out");
            this.enrolments = response.data.data;
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