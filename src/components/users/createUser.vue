<template>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
                <h3>Create user</h3>
                <v-spacer></v-spacer>
               
                <v-form>
                  <v-text-field prepend-icon="fa fa-user" v-model="fname" label="First Name" type="text"></v-text-field>
                  <v-text-field prepend-icon="fa fa-user" v-model="lname" label="Last Name" type="text"></v-text-field>
                  <v-text-field prepend-icon="fa fa-user" v-model="username" label="User Name" type="text"></v-text-field>
                  <v-text-field prepend-icon="fa fa-at" v-model="email" label="Email" type="email"></v-text-field>
                  <v-text-field prepend-icon="fa fa-key" v-model="gpexId" label="GPEx Id" type="number"></v-text-field>
                  <v-text-field prepend-icon="fa fa-key" v-model="password" label="Password" type="password"></v-text-field>

                    <v-select
                        v-model="role"
                        :items="allRoles"
                        menu-props="auto"
                        label="Select role"
                        prepend-icon="map"
                        single-line
                        hide-details
                    ></v-select>
                  
                </v-form>
                <v-spacer></v-spacer>
                <v-btn dark color="#8B784A" type='submit' @click='registerUser'>Create</v-btn>
                <br>
                <div v-if="message.length > 0" >{{message}}</div>
          </v-flex>
        </v-layout>
</template>

<script>  
export default {
    data(){
      return {
        message:"",
        password:null,
        gpexId:null,
        fname:null,
        lname:null,
        email:null,
        username:null,
        role:null,
        errors: [],
        allRoles:["Administrator","Support Officer", "Practice Manager", "Supervisor", "Registrar", "MedicalEducator","Primary Supervisor", "Secondary Supervisor", "Primary MedicalEducator", "Secondary MedicalEducator", "External Supervisor", "Primary ME Supervisor", "Secondary ME Supervisor", "Resource User", "Research User", "Program Training Advisor","Education Support Officer", "Senior ME" ]
      }
    },

    methods: {

      registerUser(){
        axios.post('/createuser',{fname:this.fname,lname:this.lname,username:this.username,email:this.email,role:this.role, password:this.password, gpexId: this.gpexId})
        .then((response)=>{
          console.log(response)
           if(response.data.unique_id){
             this.message = "user successfully created."
           }else{
             this.message = "user can not created, please try later"
           }
        })
        .catch((error)=>{
            console.log(error);
        })
        
      }
    }

}
</script>