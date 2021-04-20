<template>
    <b-container fluid ="lg">
<div class  = "col-lg-12 mt-4">
    <div class = "col-md-6">
        <h3 class = "float-left">Lecturers</h3>
        </div>

        <div class = "mt-2 mb-3" style="gray;height:30px;">
        <div style="float:left;line-height:30px;"></div>

        <b-button variant = "primary" style="float: right;" @click.prevent="toCreate()">Create Lecturers</b-button>
    </div>
</div>
<div class = "col-lg-12">
             <table class ="table center">
                 
                 <thead>
                     <tr>
                         <th scope ="col">Name</th>
                         <th scope ="col">Email Address</th>
                         <th scope ="col">Phone Number</th>
                         <th scope ="col"></th>
                         <th scope ="col"></th>
                      </tr>
                 </thead>
                    
                 <tbody v-for="lecturer in lecturers"
                    v-bind:key="lecturer.id" >
                     <tr>
                         <td @click.prevent="toLecturer(lecturer.id,lecturer.name)"><a href = "#">{{lecturer.name}}</a></td>
                         <td>{{lecturer.email}}</td>
                         <td>{{lecturer.phone}}</td>

                         <td><b-button class = "float-right" variant="primary" @click.prevent="editLecturer(lecturer.id)">Edit</b-button></td>
                         <td><b-button class = "float-right" variant="danger" @click.prevent ="deleteEnrolments(lecturer)">Delete</b-button></td> 
                     </tr>
                </tbody>
             </table>
</div>
        <!-- </b-col>
        </b-row> -->
    </b-container>
</template>

<script>
import axios from 'axios'


    export default {
        name: 'LecturerIndex',
        components: {

        },
     data(){
         return{
            lecturers: []
        }
     },

    mounted(){
        this.getLecturers();        
    },

     methods :{
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

deleteEnrolments(lecturer) {

    //loops through enrolments, creates new array for deletions, enrolments then deleted at the same time as courses
    let token = localStorage.getItem("token");
      let listOfDeleteRequests = lecturer.enrolments.map((current) => axios.delete("http://college.api:8000/api/enrolments/" +
      current.id, {headers: { Authorization: "Bearer " + token }}
    ));
        // log the contents of listOfDeleteRequests
      axios.all(listOfDeleteRequests)
      .then(function(response) {
        console.log(response);
        axios.delete("http://college.api:8000/api/lecturers/" + lecturer.id, 
        {headers: { Authorization: "Bearer " + token }
        })
        .then(function(response) {
         console.log(response.data);
         lecturer = response.data.data;
         window.location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
      });

    },
        //redirects to view page
        toLecturer(id,name){
            this.$router.push('lecturers/'+id)
            alert("You are viewing "+name)
        },

        //redirects to edit page
        editLecturer(id,title){
             this.$router.push('lecturers/edit/'+id);
             alert('you are viewing '+title);
         },

        //redirects to create page
        toCreate(){
             this.$router.push('/lecturers/create');
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