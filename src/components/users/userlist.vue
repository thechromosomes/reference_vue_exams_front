<template>
  <v-container fluid subtopic_section qus_rprt>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">User List</h2></v-flex>
    </v-layout>
   <div class="question_fields">
</div>
    <template>
      <v-card class="clearqstnrprts" >
        <v-card-title>
          User List
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :loading="tableData" 
          no-data-text="Loading... Please wait"
          :headers="headers"
          :items="users"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
          class="usertable"
        >
          <template  slot="items" slot-scope="props">
            <td> {{props.item.firstname}}</td>
            <td>{{props.item.lastname}}</td>
            <td>{{props.item.email}} </td>
            <td>{{props.item.username}} </td>
            <template v-if="props.item.roledetail.length > 0">
              <td>{{props.item.roledetail[0].roletitle}} </td>
            </template>
            <template v-else>
              <td>{{props.item.role}} </td>
            </template>
            <td v-if="props.item.deleted==true">Deleted</td>
            <td v-else>Active</td>
            <td class="text-xs-left">{{ props.item.lastlogin | createDatentime  }}</td>
            <td>
            <span class="action_group">
            <a  :href="`/editlistuser?id=${props.item.unique_id}`"><img src="../../assets/icons/edit.svg" class="fa_svg_icon"  />    </a> 
            <a  :href="`/userlogreportdetail?id=${props.item.unique_id}`"><img src="../../assets/icons/eye.svg" class="fa_svg_icon"  />    </a> 
            <span class="cursoron" @click="deleteUser(props.item.unique_id)"><img src="../../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span> 
            </span>
            </td>
          </template>
          <template slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </v-container>
</template>
<script>
var username=localStorage.username;
import axios from 'axios';
  export default {
    data() {
      return {
        currentuser:null,
        errors: [],
        questiontypes:[],
        q_typename:null,
        advance_filter:false,
        search: '',
        pagination: {
        rowsPerPage: 100
      },
        headers: [
          { text: 'Firstname', sortable: true, value:'firstname' },
          { text: 'Lastname', align: 'left',sortable: true, value: 'lastname' },
          { text: 'email', sortable: true, value:'email' },
          { text: 'Username', sortable: true, value:'username' },
          { text: 'Roles', sortable: true, value:'roledetail[0].roletitle' },
          { text: 'Status', sortable: true, value:'deleted' },
          { text: 'Last Login', sortable: true, value:'lastlogin' },
          { text: 'Actions', sortable: false, value:'' }
        ],
        users: [],
        tableData: true

      }
    },
    methods: 
    {
      allUsers()
      {
        axios.post(`/getallusers`,{"loggedinuser":this.currentuser})
        .then(response => {
          this.users = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      updateoptioncount(){
        axios.post(`/getallusers`,{"loggedinuser":this.currentuser})
        .then(response => {
          // JSON responses are automatically parsed.
          this.users = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      deleteUser(userid){
        console.log(userid);
        if(confirm("Do you really want to delete?"))
        {
          axios.post(`/deleteuserfromlist`,{"del_userid":userid})
          .then(response => {
            console.log(response.data)
          })
          .catch(e => {
            this.errors.push(e)
          }) 
        }
      } 
    }, //end of methods
    created() {
      axios.post(`/getcurrentuser`,{'username':username})
      .then(response => {
     
        this.currentuser = response.data.unique_id
      })
      .catch(e => {
        this.errors.push(e)
      }),
      axios.post(`/getallusers`,{"loggedinuser":this.currentuser})
      .then(response => {
   
        this.users = response.data
        this.tableData = false  

      })
      .catch(e => {
        this.errors.push(e)
      })
    }//end of created

}
</script>