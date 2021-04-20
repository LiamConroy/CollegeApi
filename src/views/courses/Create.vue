<template>
    <b-container fluid ="lg">
     
<form action="" method="POST" @submit.prevent="createCourse()">
        <div class = "form-group mt-5">
            <h3>Title</h3>
            <input type = "text" name = "title" v-model="form.title" placeholder="Course Title" class = "form-control">
        </div>

        <div class = "form-group mt-5">
            <h3>Code</h3>
            <input type = "text" name = "title" v-model="form.code" placeholder="Course Title" class = "form-control"> 
        </div>

        <div class = "form-group mt-5">
            <h3>Description</h3>
            <input type = "text" name = "title" v-model="form.description" placeholder="Course Title" class = "form-control">           
        </div>

        <div class = "form-group mt-5">
            <h3>Points</h3>
            <input type = "text" name = "title" v-model="form.points" placeholder="Course Title" class = "form-control">           
        </div>

        <div class = "form-group mt-5">
            <h3>Level</h3>
            <input type = "text" name = "title" v-model="form.level" placeholder="Course Title" class = "form-control">
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
        name: 'CoursesCreate',
        components: {

        },
     data(){
         return{

        //data from form passed to here
            form:{
               title: '',
               code: '',
               description: '',
               points: '', 
               level: '',
            }
        }
     },

    mounted(){

    },

     methods :{
        

    createCourse(){

        //inserts data from the form into the database, using axios
             let token = localStorage.getItem('token');

             axios.post('http://college.api:8000/api/courses',{
                 title:this.form.title,
                 code:this.form.code,
                 description:this.form.description,
                 points:this.form.points,
                 level:this.form.level      
            },

            {
                headers: {Authorization: "Bearer " + token}
            })


             .then(response => {
                console.log(response.data);
                this.courses = response.data.data
            })

            .catch(error => {
                console.log(error)
                console.log(error.response.data)
            }) 
            
            this.$router.push('/courses'); 
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