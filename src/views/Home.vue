<template>
<div class = "col-lg-12 mt-5">
    <div class ="home col-md-4">
        <div class = "card shadow">
            <div class = "nopad pl-2 title">
                <h3>Login</h3>
            </div>
    <div class = "card-body back shadow">

        <div class = "col-lg-12 form"> 
            <!-- <h4>Email:</h4> -->

            <span><input type = "email" placeholder = "Email" v-model="form.email" /></span>
        </div>

        <div class = "col-lg-12 mt-3 form" > 
            <!-- <h4>Password:</h4> -->
            <input type = "password" placeholder = "Password" v-model="form.password" /> 
        </div>

        <div class = "col-lg-12 mt-3 form" > 
            <button class = "btn button" @click = "login()">Submit</button>
        </div>

      </div>

      <!-- <div id="app">
  <button @click='toggle = !toggle'> click here </button>
  <div v-show='toggle'>showing</div>
</div> -->
    </div>
  </div>
</div>
    
<!-- <br>
      <input type = "email" v-model="form.email" />
      <input type = "password" v-model="form.password" /> 
      <button @click = "login()">Submit</button> -->
</template>

<script>
import axios from 'axios'
    export default {
        name: 'Home',
        components: {

        },
     data(){
         return{
            //  toggle:true,

            form:{
                 email: "",
                password: ""
             },

            
        }
     },

     methods :{
         login(){
            axios.post('http://college.api:8000/api/login', {
                email: this.form.email,
                password: this.form.password
            })
            .then(response => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token)
                this.$router.replace({name:'courses_index'});
            })

            .catch(error => {
                console.log(error)
               console.log(error.response.data)
            })
            
         }

 },

}
</script>

<style>
    .home {
    text-align: center;
    margin: auto;
    }

    .nopad{
        padding: 0px;
    }

    .title{
        background-color: #9d2020;
        color:white;
    }

    .button{
        background-color: #9d2020;
        padding-left: 65px;
        padding-right: 65px;
        color:white;
    }

    .shadow{
        box-shadow: 0px 6px 50px 6px rgba(0,0,0,0.25);
    }

    .form{
        text-align:center;
    }
</style>