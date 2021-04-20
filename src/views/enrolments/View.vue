<template>
    <b-container fluid ="lg">
        
        <div class = "col-lg-12">
            
            <div class = "col-md-6 mt-3 pb-1 pt-1 titleStyle ">
                <h3>Enrolment Information</h3>
            </div>

            <div class = "col-md-6 center pl-0 pr-0 ">
                <div class = "card cards card3">
                    <div class = "card-body">
                        <div class = "col-sm-12 float-left">
                            <h4 class = "float-left">Date:</h4>
                            <p class = "float-left pt-1 pl-1">{{enrolments.date}}</p>
                        </div>

                        <div class = "col-sm-12 float-left">
                            <h4 class = "float-left">Time:</h4>
                            <p class = "float-left pt-1 pl-1">{{enrolments.time}}</p>
                        </div>

                        <div class = "col-sm-12">
                            <h4 class = "float-left">Status:</h4>
                            <p class = "float-left pt-1 pl-1">{{enrolments.status}}</p>
                        </div>

                        <div class = "col-sm-12 float-left">
                            <h4 class = "float-left">Course id:</h4>
                            <p class = "float-left pt-1 pl-1">{{enrolments.course_id}}</p>
                        </div>

                        <div class = "col-sm-12">
                            <h4 class = "float-left">Lecturer id:</h4>
                            <p class = "float-left pt-1 pl-1">{{enrolments.lecturer_id}}</p>
                        </div>

                    </div>
                    
                </div>
            </div>


            <div class = "col-lg-6 center">
             <b-button name ="delete" class = "ml-1 mt-1 float-right" variant="danger" @click.prevent ="deleteEnrolmentSingle(enrolments.id)">Delete</b-button>    
            <b-button name = "edit" class = "float-right mt-1" variant="primary" @click.prevent="editEnrolment(enrolments.id)" >Edit</b-button>      
            </div>
        </div>
    </b-container>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'EnrolmentView',
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

         //sends get request to database, then displays the response based on id
         enrolmentGet(){
             let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/enrolments/'+this.$route.params.id,
           {
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

        //redirects to edit page
         editEnrolment(id,title){
             this.$router.push('/enrolments/edit/'+this.$route.params.id);
             alert('you are viewing '+title);
         },

        //sends delete request to database based on id           
         deleteEnrolmentSingle(){
            let token = localStorage.getItem('token');

            confirm('Are you sure you want to delete');

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

    },
        
}
</script>

<style>
    .center {
    text-align: center;
    margin: auto;
    }
</style>