<template>
  <v-container fluid subtopic_section qus_rprt>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">Accept Policy List</h2></v-flex>
    </v-layout>
   <div class="question_fields">
</div>
    <template>
      <v-card class="clearqstnrprts last_hide" >
        <v-card-title>
          Policy Accepted List
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
          :headers="headers"
          :items="users"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
          class="usertable">
          <template  slot="items" slot-scope="props">
            <td> {{props.item.user.firstname}} {{props.item.user.lastname}}</td>
            <td>{{props.item.accepted.type_name}}</td>
            <td class="text-xs-left"> {{ props.item.created_at | createDatentime  }}</td>
            <td>
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
var dateFormat = require('dateformat');
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
        rowsPerPage: 100,
        descending: true,
        sortBy: 'created_at'
      },
        headers: [
          { text: 'Username', sortable: true, value:'user.firstname' },
          { text: 'Policyname', align: 'left',sortable: true, value: 'accepted.type_name' },
          { text: 'Accepted', sortable: true, value:'created_at' },
          { text: 'Actions', sortable: false, value:'filterdate' }
        ],
        users: []
      }
    },
    methods: 
    {
      allUsers()
      {
        axios.post(`/getpolicyaccepted`,{"loggedinuser":this.currentuser})
        .then(response => {
          this.users = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      updateoptioncount(){
        axios.post(`/getalluserlogs`,{"loggedinuser":this.currentuser})
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
         axios.post(`/getpolicyaccepted`,{"loggedinuser":this.currentuser})
        .then(response => {
          console.log("this is policy response", response)
          this.users = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }//end of created
}
</script>
<style>
.last_hide thead tr th:last-child {display:none;}
</style>