<template>
    <b-container fluid ="lg">
        
        <b-row>
        <b-col>
            <form action="" method="POST" @submit.prevent="editCourse()">
        <div class = "form-group mt-5">
            <h3>Title</h3>
            <input type = "text" name = "title" v-model="form.title" placeholder= "" class = "form-control">
        </div>

        <div class = "form-group mt-5">
            <h3>Code</h3>
            <input type = "text" name = "title" v-model="form.code" placeholder= "" class = "form-control"> 
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
        name: 'CourseEdit',
        components: {

        },
     data(){
         return{
            courses: [],

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
        this.courseGet();
    },

     methods :{        

        //sends get request to database, then displays the response based on id
        courseGet(){
             let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/courses/'+this.$route.params.id,
           {
               headers: {Authorization: "Bearer " + token}
           })
          
            .then(response => {
                console.log(response.data);
                this.form.title = response.data.data.title
                this.form.code = response.data.data.code
                this.form.description = response.data.data.description
                this.form.points = response.data.data.points
                this.form.level = response.data.data.level
            })

            .catch(error => {
                console.log(error)
                console.log(error.response.data)
            }) 
         },

        //sends put request to database, replaces any change information, based on id
         editCourse(){
             let token = localStorage.getItem('token');

             axios.put('http://college.api:8000/api/courses/'+this.$route.params.id,{
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
                this.$router.push('/courses'); 
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