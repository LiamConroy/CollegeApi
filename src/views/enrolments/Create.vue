<template>
    <b-container fluid ="lg">
        
<form action="" method="POST" @submit.prevent="createEnrolment()">
        <div class = "form-group mt-5">
            <h3>Date</h3>
            <input type = "date" name = "date" v-model="form.date" placeholder="Date" class = "form-control">
        </div>

        <div class = "form-group mt-5">
            <h3>Time</h3>
            <input type = "time" name = "time" v-model="form.time" placeholder="Course Title" class = "form-control"> 
        </div>
        <div>
            <!--Loops through courses and displays all of them to a dropdown form --> 
            <label for = "course">Courses</label>
            <select name = "course" id = "course" v-model="form.course_id">
            <option v-for="course in courses"
                    v-bind:key="course.id" v-bind:value = "course.id">
            {{course.title}} ({{course.id}})
            </option>
            </select>    
        </div>

        <div>
            <label for = "lecturer">Lecturer</label>
            <select name = "lecturer" id = "lecturer" v-model="form.lecturer_id">
              <!--Loops through lecturers and displays all of them to a dropdown form -->  
            <option v-for="lecturer in lecturers"
                    v-bind:key="lecturer.id" v-bind:value = "lecturer.id">
            {{lecturer.name}} ({{lecturer.id}})
            </option>
            </select>    
        </div>
   

        <label for = "status">Status</label>
            <select name = "status" id = "status" v-model="form.status">
            <option value = "career_break">
            Career Break
            </option>
             <option value = "assigned">
            assigned
            </option>
            <option value = "associate">
            associate
            </option>
            <option value = "interested"> 
            interested
            </option>
            </select> 
        

    <div class = "form-group mt-3">
            <input type="submit" value="Create Enrolment" class="btn btn-info">
        </div>
</form>

        
    </b-container>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'EnrolmentsCreate',
        components: {

        },
     data(){
         return{
            courses: [],
            lecturers: [],

            form:{
               date: '',
               time: '',
               status: '',
               course_id: '', 
               lecturer_id: '',
            }
        }
     },

    mounted(){
        this.getCourses();
        this.getLecturers();
    },

     methods :{

         //sends get request to database, returns every course in the array
         getCourses(){
           let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/courses',{
               headers: {Authorization: "Bearer " + token}
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

        //sends get request to database, returns every lecturer in the array
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

    //inserts data from the html form into the database, using axios
    createEnrolment(){
             let token = localStorage.getItem('token');

             axios.post('http://college.api:8000/api/enrolments',{
                 date: this.form.date,
                 time: this.form.time,
                 status: this.form.status,
                 course_id: this.form.course_id,
                 lecturer_id: this.form.lecturer_id      
            },

            {
                headers: {Authorization: "Bearer " + token}
            })


             .then(response => {
                console.log(response.data);
                // default is nothing
                this.enrolments = response.data.data
                this.$router.push('/enrolments');
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