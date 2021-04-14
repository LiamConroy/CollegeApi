<template>
    <b-container fluid ="lg">
        
        <b-row>
        <b-col class = "mt-5">

            <div>
                <div class = "col-lg-6 float-left border">
                <h1>{{lecturers.name}} </h1>
                <h2>{{lecturers.address}}</h2>
                <p>Description: {{lecturers.email}}</p>
            </div>

            <div class = "col-lg-6 float-left border padding">
                <h1>Points: {{lecturers.phone}}</h1>
                
                  
            </div>
            <b-button name ="delete" class = "ml-1 mt-1 float-right" variant="danger" @click.prevent ="deleteLecturerSingle(lecturers.id)">Delete</b-button>    
            <b-button name = "edit" class = "float-right mt-1" variant="primary" @click.prevent="editLecturer(lecturers.id)" >Edit</b-button>   
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
            lecturers: []

        }
     },

    mounted(){
        this.lecturerGet();        
    },

     methods :{

         lecturerGet(){
             let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/lecturers/'+this.$route.params.id,
           {
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

         toCreate(){
             this.$router.push('/courses/create');
         },

         editLecturer(id,title){
             this.$router.push('/lecturers/edit/'+id);
             alert('you are viewing '+title);
         },

         deleteLecturerSingle(){
            let token = localStorage.getItem('token');

            confirm('Are you sure you want to delete ${name}');
             //Window.confirm("Are you sure you want to delete this course?");
            //  axios.delete('http://college.api:8000/api/courses/', +id )
            
            axios.delete('http://college.api:8000/api/lecturers/'+this.$route.params.id,
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