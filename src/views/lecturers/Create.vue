<template>
    <b-container fluid ="lg">
        <!-- <div>
            <b-form @submit ="createCourse()">
                <b-form-group
                    label = "Title"
                    label-for = "input-1"
                >

                <b-form-input
                    id="input-1"
                    v-on:keyup.enter="createCourse()"
                    v-model="form.title"
                    placeholder="Enter course title"
                    required
                 ></b-form-input>
                </b-form-group>


                <b-form-group
                    label = "Code"
                    label-for = "input-2"
                >

                <b-form-input
                    id="input-2"
                    v-model="form.code"
                    placeholder="Enter course code"
                    required
                 ></b-form-input>
                </b-form-group>

                <b-form-group
                    label = "Description"
                    label-for = "input-3"
                >

                <b-form-input
                    id="input-3"
                    v-model="form.description"
                    placeholder="Enter description"
                    required
                 ></b-form-input>
                </b-form-group>

                <b-form-group
                    label = "Points"
                    label-for = "input-4"
                >

                <b-form-input
                    id="input-4"
                    v-model="form.points"
                    placeholder="Enter course title"
                    required
                 ></b-form-input>
                </b-form-group>

                 <b-form-group
                    label = "Level"
                    label-for = "input-5"
                >

                <b-form-input
                    id="input-5"
                    v-model="form.level"
                    placeholder="Enter level"
                    required
                 ></b-form-input>
                </b-form-group>

            </b-form>

            <b-button class = "" variant="primary" @click="createCourse">Submit</b-button>
        </div> -->
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
            <!-- <b-button class = "" variant="primary" @click="createCourse">Submit</b-button> -->
        </div>
</form>
    </b-container>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'CoursesCreate',
        components: {

        },
     data(){
         return{
            // courses: [],

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
        //  getCourses(){
        //    let token = localStorage.getItem('token');

        //    axios.get('http://college.api:8000/api/courses',{
        //        headers: {Authorization: "Bearer " + token}
        //    })
        //     .then(response => {
        //         console.log(response.data);
        //         // default is nothing
        //         this.courses = response.data.data
        //     })

        //     .catch(error => {
        //         console.log(error)

        //         console.log(error.response.data)
        //     })  
        //  },

    createLecturer(){
             let token = localStorage.getItem('token');

             //axios.get('http://college.api:8000/api/courses',{
               
          

             alert("adding davinki");

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
                // default is nothing
                this.lecturers = response.data.data
                this.$router.push('/lecturers'); 
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