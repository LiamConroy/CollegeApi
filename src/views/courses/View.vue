<template>
    <b-container fluid ="lg">

        <div class = "col-lg-12">
            
            <div class = "col-md-6 mt-3 pb-1 pt-1 titleStyle ">
                <h3>{{courses.title}}</h3>
            </div>

            <div class = "col-md-6 center pl-0 pr-0 ">
                <div class = "card cards card1">
                    <div class = "card-body">
                        <div class = "col-sm-4 float-left pl-0">
                        <h4 class = "float-left">Code:</h4>
                        <p class = "float-left pl-1 pt-1">{{courses.code}}</p>

                        <h4 class = "float-left">Level:</h4>
                        <p class = "float-left pl-1 pt-1">{{courses.level}}</p>
                        </div>

                        <div class = "col-sm-6 float-right pr-0">
                        <p class = "float-right pl-1 pt-1">{{courses.points}}</p>
                        <h4 class = "float-right">Points:</h4>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class = "col-md-6 pb-1 pt-1 titleStyle">
                <h4>Description</h4>
            </div>
            <div class = "col-md-6 center pl-0 pr-0">
                
                <div class = "card cards card2">
                    <div class = "card-body">
                        <p class = "paraStyle">{{courses.description}}</p>
                    </div>
                </div>
            
            </div>

            <div class = "col-lg-6 center">
             <b-button name ="delete" class = "ml-1 mt-1 float-right" variant="danger" @click.prevent ="deleteCourseSingle(courses.id)">Delete</b-button>    
            <b-button name = "edit" class = "float-right mt-1 ml-5" variant="primary" @click.prevent ="editCourse(courses.id)">Edit</b-button>   
            </div>
        </div>
    </b-container>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'CourseView',
        components: {

        },
     data(){
         return{
            courses: []

        }
     },

    mounted(){
        this.courseGet();        
    },

     methods :{
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

         courseGet(){
             let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/courses/'+this.$route.params.id,
           {
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

         toCreate(){
             this.$router.push('/courses/create');
         },

         deleteCourseSingle(){
            let token = localStorage.getItem('token');

            confirm('Are you sure you want to delete ${name}');
             //Window.confirm("Are you sure you want to delete this course?");
            //  axios.delete('http://college.api:8000/api/courses/', +id )
            
            axios.delete('http://college.api:8000/api/courses/'+this.$route.params.id,
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

            this.$router.push('/courses');
         },

         toCourse(id){
             this.$router.push('http://college.api:8000/api/courses/'+id);
         },

         editCourse(id,title){
             this.$router.push('/courses/edit/'+id);
             alert('you are viewing '+title);
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

    .titleStyle{
        margin-left: 270px;
        background-color: teal;
        color: white;
    }

    .border{
        border:1px solid black;  
    }

    .padding{
        padding-bottom: 77.5px;
    }

    .card1{
        border-bottom:0px;
        border-top:0px;
    }
    
    .card2{
        border-top:0px;
    }
    .cards{
        border-radius: 0px;
        border-width: 2px;
    }

    .paraStyle{
        text-align:left;
    }

</style>