<template>
    <b-container fluid ="lg">
        

<div class  = "col-lg-12 mt-4">
        <div class = "col-md-6">
        <h3 class = "float-left">Courses</h3>
        </div>

    <div class = "mt-2 mb-3" style="gray;height:30px;">
    <div style="float:left;line-height:30px;"></div>

    <b-button variant = "primary" style="float: right;" @click.prevent="toCreate()">Create Course</b-button>

    </div>
</div>
        
<div class = "col-lg-12">
      
             <table class ="table center">
                 
                 <thead>
                     <tr>
                         <th scope ="col">Title</th>
                         <th scope ="col">Code</th>
                         <th scope ="col">Description</th>
                         <th scope ="col"></th>
                         <th scope ="col"></th>
                      </tr>
                 </thead>

                  <!--Loops through courses and displays each one in table  -->
                 <tbody v-for="course in courses"
                    v-bind:key="course.id" >
                     <tr>
                         <td @click.prevent="toCourse(course.id,course.title)"><a href = "#">{{course.title}}</a></td>
                         <!-- <td to='/courses'>{{course.title}}</td> -->
                         <td>{{course.code}}</td>
                         <td>{{course.description}}</td> 
                         <td><b-button name = "edit" class = "float-right" variant="primary" @click.prevent="editCourse(course.id)">Edit</b-button></td>
                         <td><b-button name ="delete" class = "float-right" variant="danger" @click.prevent ="deleteEnrolments(course)">Delete</b-button></td>
                     </tr>
             

                </tbody>
             </table>

</div>    
    </b-container>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'CourseIndex',
        components: {

        },
     data(){
         return{
            courses: [],
        }
     },

    mounted(){
        this.getCourses();
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
                this.courses = response.data.data
            })

            .catch(error => {
                console.log(error)
                console.log(error.response.data)
            })  
         },

    deleteEnrolments(course) {

    let token = localStorage.getItem("token");

        //loops through enrolments, creates new array for deletions, enrolments then deleted at the same time as courses
        let listOfDeleteRequests = course.enrolments.map((current) => axios.delete("http://college.api:8000/api/enrolments/" +
        current.id, {headers: { Authorization: "Bearer " + token }}
        ));
        
        // log the contents of listOfDeleteRequests
        axios.all(listOfDeleteRequests)
        .then(function(response) {
            console.log(response);
            axios.delete("http://college.api:8000/api/courses/" + course.id, 
            {headers: { Authorization: "Bearer " + token }
            })
            .then(function(response) {
            console.log(response.data);
            course = response.data.data;
            window.location.reload()
            })
            .catch(function(error) {
            console.log(error);
            });
        });

        },

        //redirects to create page
         toCreate(){
             this.$router.push('/courses/create');
         },

         //redirects to view page
         toCourse(id,title){
             this.$router.push('courses/'+id);
             alert('you are viewing '+title);
         },

        //redirects to edit page
        editCourse(id,title){
             this.$router.push('courses/edit/'+id);
             alert('you are viewing '+title);
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

    .buttons{
        float: right;
        overflow: auto;
    } 

    
</style>