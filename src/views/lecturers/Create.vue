<template>
    <b-container fluid ="lg">
<form action="" method="POST" @submit.prevent="createLecturer()">
        <div class = "form-group mt-5">
            <h3>Name</h3>
            <input type = "text" name = "title" v-model="form.name" placeholder="Course Title" class = "form-control">
        </div>

        <div class = "form-group mt-5">
            <h3>Address</h3>
            <input type = "text" name = "title" v-model="form.address" placeholder="Course Title" class = "form-control"> 
        </div>

        <div class = "form-group mt-5">
            <h3>Email Address</h3>
            <input type = "text" name = "title" v-model="form.email" placeholder="Course Title" class = "form-control">           
        </div>

        <div class = "form-group mt-5">
            <h3>Phone Number</h3>
            <input type = "text" name = "title" v-model="form.phone" placeholder="Course Title" class = "form-control">           
        </div>

        <div class = "form-group mt-3">
            <input type="submit" value="Create Course" class="btn btn-info">
        </div>
</form>
    </b-container>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'LecturersCreate',
        components: {

        },
     data(){
         return{
    
        //data from form passed to here
            form:{
               name: '',
               address: '',
               email: '',
               phone: '', 
            }
        }
     },

    mounted(){

    },

     methods :{
     
        //inserts data from the form into the database, using axios
        createLecturer(){
             let token = localStorage.getItem('token');

             axios.post('http://college.api:8000/api/lecturers',{
                 name:this.form.name,
                 address:this.form.address,
                 email:this.form.email,
                 phone:this.form.phone  
            },
            {
                headers: {Authorization: "Bearer " + token}
            })

             .then(response => {
                console.log(response.data);
                this.lecturers = response.data.data
                this.$router.push('/lecturers'); 
            })

            .catch(error => {
                console.log(error)

                console.log(error.response.data)
            }) 
            
            
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