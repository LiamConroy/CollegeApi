<template>
    <b-container fluid ="lg">
        
        <b-row>
        <b-col class = "mt-5">

            <div>
                <div class = "col-lg-6 float-left border">
                <h1>{{enrolments.date}} </h1>
                <h2>{{enrolments.time}}</h2>
                <p>{{enrolments.status}}</p>
            </div>

            <div class = "col-lg-6 float-left border padding">
                <h1>Course ID: {{enrolments.course_id}}</h1>
                <h1>Lecturer ID: {{enrolments.lecturer_id}}</h1>
                
                  
            </div>
            <b-button name ="delete" class = "ml-1 mt-1 float-right" variant="danger" @click.prevent ="deleteEnrolmentSingle(enrolments.id)">Delete</b-button>    
            <b-button name = "edit" class = "float-right mt-1" variant="primary" @click.prevent="editEnrolment(enrolments.id)" >Edit</b-button>   
            </div>

        </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'LecturerView',
        components: {

        },
     data(){
         return{
            lecturers: [],
            enrolments: []

        }
     },

    mounted(){
        this.enrolmentGet();        
    },

     methods :{

         enrolmentGet(){
             let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/enrolments/'+this.$route.params.id,
           {
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


         editEnrolment(id,title){
             this.$router.push('/enrolments/edit/'+this.$route.params.id);
             alert('you are viewing '+title);
         },

         deleteEnrolmentSingle(){
            let token = localStorage.getItem('token');

            confirm('Are you sure you want to delete ${name}');
             //Window.confirm("Are you sure you want to delete this course?");
            //  axios.delete('http://college.api:8000/api/courses/', +id )
            
            axios.delete('http://college.api:8000/api/enrolments/'+this.$route.params.id,
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

            this.$router.push('/lecturers');

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