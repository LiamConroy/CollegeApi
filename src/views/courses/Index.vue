<template>
    <b-container fluid ="lg">
        <b-col class = "center mb-5">
        This is the courses page
        <br>
        <button class = "mr-5" @click="getCourses()">Get Courses</button>
        <button class = "" @click="logout()">Logout</button>
        <button class = "ml-5" @click="toCreate()">Add Course</button>
        </b-col>

        <b-row>
        <b-col>

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

                  
                 <tbody v-for="course in courses"
                    v-bind:key="course.id" >
                  
                     <tr>
                         <td @click.prevent="toCourse(course.id,course.title)"><a href = "#">{{course.title}}</a></td>
                         <!-- <td to='/courses'>{{course.title}}</td> -->
                         <td>{{course.code}}</td>
                         <td>{{course.description}}</td> 
                         <td><b-button name = "edit" class = "float-right" variant="primary" @click.prevent="editCourse(course.id)">Edit</b-button></td>
                         <td><b-button name ="delete" class = "float-right" variant="danger" @click.prevent ="deleteEnrolments(course, course.id)">Delete</b-button></td>
                     </tr>
             

                </tbody>
             </table>
        </b-col>
        </b-row>
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
            enrolments: []
        }
     },

    mounted(){
        this.getEnrolments();
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

         getEnrolments(){
           let token = localStorage.getItem('token');

           axios.get('http://college.api:8000/api/enrolments',{
               headers: {Authorization: "Bearer " + token}
           })
            .then(response => {
                console.log(response.data);
                // default is nothing
                this.enrolments = response.data.data
            })

            .catch(error => {
                console.log(error)

                console.log(error.response.data)
            })  

         },

deleteEnrolments(course,id) {
      let token = localStorage.getItem("token");
  
        // loop through enrolments and send delete request to delete them
        course.enrolments.forEach((enrolment) => {
        axios
          .delete("http://college.api:8000/api/enrolments/" + enrolment.id, {
            headers: { Authorization: "Bearer " + token }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
     // delete course or lecturer
      axios
        .delete("http://college.api:8000/api/courses/" +id, {
          headers: { Authorization: "Bearer " + token }
        })
        .then(function(response) {
            course = response.data.data
        })
        .catch(function(error) {
          console.log(error);
        });
    },

         toCreate(){
             this.$router.push('/courses/create');
         },

         

         toCourse(id,title){
             this.$router.push('courses/'+id);
             alert('you are viewing '+title);
         },

        editCourse(id,title){
             this.$router.push('courses/edit/'+id);
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

    a:link{
        color:black;
    }
</style>