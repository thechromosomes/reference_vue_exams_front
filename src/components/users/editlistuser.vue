<template>
  <v-container subtopic_section>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">Edit User</h2></v-flex>
    </v-layout>
    <form>
      <v-layout>
        <v-text-field v-model="firstname" label="First Name"  required></v-text-field>
      </v-layout>
      <v-layout>
        <v-text-field v-model="lastname" label="Last Name"  required></v-text-field>
      </v-layout>
      <v-layout>
        <v-text-field v-model="email" label="Email"  required></v-text-field>
      </v-layout>
      <v-layout>
        <v-text-field v-model="username" label="User Name"  required></v-text-field>
      </v-layout>
      <v-layout>
        <v-select :items="allRoles" label="Select Role" v-model="rolename" item-text="roletitle" item-value="roleid"></v-select>
      </v-layout>
      <v-layout>
        <v-select :items="status" label="Select Status" v-model="ustatus" item-text="roletitle" item-value="roleid"></v-select>
      </v-layout>
       <v-layout>
        <v-text-field v-model="gpexId" label="GPEx Id"  required></v-text-field>
      </v-layout>
      <v-layout>
        <input @click='updateUser' name="Add" type="button" value="Update" class="btn submit_btn" />
        <input name="Cancel" type="button" class="btn cancel_btn" value="Cancel" @click='cancel' />
      </v-layout>
    </form>
   
  </v-container>
</template>
<script>
  var username=localStorage.username;
  import axios from 'axios';
  export default {
    data() {
      return {
        errors: [],
        allRoles: [],
        userEdit: [],
        rolename:'',
        firstname:'',
        lastname:'',
        email:'',
        username:'',
        roletitle:'',
        status: ['Active', 'Deleted'],
        ustatus: '',
        finalStatus: false,
        gpexId:''
      }
    },
    methods: 
    {
      updateUser()
      {
      //   console.log(this.firstname);
      //   console.log(this.lastname);
      //   console.log(this.email);
      //   console.log(this.username);
      //   console.log(this.rolename);
      //   console.log(this.ustatus);
        if(this.ustatus=='Deleted')
        {
          this.finalStatus=true
        }
        else if(this.ustatus=='Active')
        {
          this.finalStatus=false
        }
        console.log(this.finalStatus);
        axios.post('/updateEdituserlist',{userid:this.$route.query.id,firstname:this.firstname,lastname:this.lastname,email:this.email,username:this.username,rolename:this.rolename,ustatus:this.finalStatus, gpexId:this.gpexId})
        .then(response => {
          console.log(response.data)
          if(response.data)
          {location.href = "/userlist"}
          else
          {}
        }).catch(e => {
          this.errors.push(e)
        })
      },
      cancel()
      {
        location.href = "/userlist"
      }
    },//end of method
    created() 
    {
      console.log('id',this.$route.query.id)
      axios.post(`/getcurrentuser`,{'username':username})
      .then(response => {
        // JSON responses are automatically parsed.
        this.currentuser = response.data._id
      })
      .catch(e => {
        this.errors.push(e)
      }),
      axios.post(`/getallroles`)
      .then(response => {
        this.allRoles = response.data
      })
      .catch(e => {
        this.errors.push(e)
      }), 
      axios.post('/getEditUserData',{'userid':this.$route.query.id})
      .then(response => {
        // this.userEdit=response.data
        console.log(response.data)
        this.firstname = response.data[0].firstname
        this.lastname = response.data[0].lastname
        this.email = response.data[0].email
        this.username = response.data[0].username
        this.rolename = response.data[0].role
        this.gpexId = response.data[0].gpexid
        
        if(response.data[0].deleted==true){
         this.ustatus = 'Deleted';
        }else{
          this.ustatus = 'Active';
        }

      })
      .catch(e => {
        this.errors.push(e)
      })
    }// end of created
}
</script>