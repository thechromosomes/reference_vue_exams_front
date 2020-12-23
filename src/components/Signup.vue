<template>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="#8B784A">
                <v-toolbar-title>Signup</v-toolbar-title>
                <v-spacer></v-spacer>
               
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="fa fa-user" v-model="fname" label="First Name" type="text"></v-text-field>
                  <v-text-field prepend-icon="fa fa-user" v-model="lname" label="Last Name" type="text"></v-text-field>
                  <v-text-field prepend-icon="fa fa-user" v-model="username" label="Username" type="text"></v-text-field>
                  <v-text-field prepend-icon="fa fa-at" v-model="email" label="Email" type="email"></v-text-field>
               
                  <v-text-field id="password" prepend-icon="fa fa-lock" v-model="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="#8B784A" type='submit' @click='registerUser'>Signup</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
</template>

<script>  
export default {
    data(){
      return {
        fname:null,
        lname:null,
        email:null,
        username:null,
        password:null,
      errors: []
      }
    },

    methods: {

      registerUser(){
        axios.post('/Signup',{fname:this.fname,lname:this.lname,username:this.username,email:this.email,password:this.password})
        .then((response)=>{
            Bus.$emit('loggedIn',response);
            this.$router.push('/')
        })
        .catch((error)=>{
            console.log(error);
        })
        
      }
    }

}
</script>