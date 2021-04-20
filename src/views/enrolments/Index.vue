<template>
<b-container fluid ="lg">
    <div class  = "col-lg-12 mt-4">
    <div class = "col-md-6">
        <h3 class = "float-left">Enrolments</h3>
        </div>

        <div class = "mt-2 mb-3" style="gray;height:30px;">
        <div style="float:left;line-height:30px;"></div>

        <b-button variant = "primary" style="float: right;" @click.prevent="toCreate()">Create Enroments</b-button>

    </div>
</div>
<div class = "col-lg-12">
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

            <!--Loops through enrolments and displays each one in table  -->   
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
</div>
        <!-- </b-col>
        </b-row> -->
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
        this.getEnrolments();
    },

     methods :{
        //sends get request to database, returns every enrolment in the table
         getEnrolments(){
           let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/enrolments',{
               headers: {Authorization: "Bearer " + token}
           })
            .then(response => {
                console.log(response.data);
                this.enrolments = response.data.data
            })

            .catch(error => {
                console.log(error)
                console.log(error.response.data)
            })  

         },

        //sends delete request to database, then deletes from database and returns response
         deleteEnrolment:function(id){
            let token = localStorage.getItem('token');

            confirm('Are you sure you want to delete');

            axios.delete('http://college.api:8000/api/enrolments/'+id,
            {headers: {Authorization: "Bearer " + token}},
            {action:'destroy'
            })
            
             .then(response => {
                console.log(response.data);
                this.enrolments = response.data.data
                window.location.reload()
            })

            .catch(error => {
                console.log(error)
                console.log(error.response.data)
            })  

         },

    //redirects to create page
         toCreate(){
             this.$router.push('/enrolments/create');
         },

         //redirects to view page
         toEnrolment(id){
            this.$router.push('enrolments/'+id)
        },

        //redirects to edit page
         editEnrolment(id,title){
             this.$router.push('enrolments/edit/'+id);
             alert('you are viewing '+title);
         },

    },


        
}
</script>

<style>
    .center {
    text-align: center;
    margin: auto;
    }
</style>