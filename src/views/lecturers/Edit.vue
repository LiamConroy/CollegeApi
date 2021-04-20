<template>
    <b-container fluid ="lg">
    
        <b-row>
        <b-col>
            <form action="" method="POST" @submit.prevent="editLecturer()">
        <div class = "form-group mt-5">
            <h3>Name</h3>
            <input type = "text" name = "title" v-model="form.name" placeholder= "" class = "form-control">
        </div>

        <div class = "form-group mt-5">
            <h3>Home Address</h3>
            <input type = "text" name = "title" v-model="form.address" placeholder= "" class = "form-control"> 
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
            <input type="submit" value="Submit Edit" class="btn btn-info">
            <!-- <b-button class = "" variant="primary" @click="createCourse">Submit</b-button> -->
        </div>
</form>
        </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'EditLecturer',
        components: {

        },
     data(){
         return{
            courses: [],

            form:{
               name: '',
               address: '',
               email: '',
               phone: ''
            }
        }
     },

    mounted(){
        this.lecturerGet();
    },

     methods :{

        //sends get request to database, then displays the response based on id
        lecturerGet(){
             let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/lecturers/'+this.$route.params.id,
           {
               headers: {Authorization: "Bearer " + token}
           })
          
            .then(response => {
                console.log(response.data);
                this.form.name = response.data.data.name
                this.form.address = response.data.data.address
                this.form.email = response.data.data.email
                this.form.phone = response.data.data.phone
                
            })

            .catch(error => {
                console.log(error)
                console.log(error.response.data)
            }) 
         },

        //sends put request to database, replaces any change information, based on id
         editLecturer(){
             let token = localStorage.getItem('token');
            
             axios.put('http://college.api:8000/api/lecturers/'+this.$route.params.id,{
                 name:this.form.name,
                 address:this.form.address,
                 email:this.form.email,
                 phone:this.form.phone,    
            },

            {
                headers: {Authorization: "Bearer " + token}
            })


             .then(response => {
                console.log(response.data);
                this.courses = response.data.data
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

    a:link{
        color:black;
    }
</style>