<template>
  <v-container fluid subtopic_section qus_rprt>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">Question Visit Report</h2></v-flex>
    </v-layout>
    <template>
      <v-card class="clearqstnrprts" >
        <v-card-title>
          Question Visit Report
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
          :items="questions"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
          class="kfptable"
        >
          <template  slot="items" slot-scope="props">
            <td>{{ props.item.userdetail.firstname }}</td>
             <td>{{ props.item.userdetail.lastname }}</td>
             <td>{{ props.item.created_at | createDatentime  }}</td>
             <td></td>
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
          {text: 'First Name', align: 'left', sortable: true, value: 'userdetail.firstname' },
          { text: 'Last Name', align: 'left', sortable: true, value: 'userdetail.lastname' },
          { text: 'Visit Date', sortable: true, value:'created_at' },
          { text: 'Action', sortable: false, value:'' }
        
        ],
        questions: []
      }
    },
    methods: {
    },
 created() {
    axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuser = response.data.unique_id
    })
    .catch(e => {
      this.errors.push(e)
    }),
          axios.post(`/getquestionview`,{"questionid":this.$route.query.id})
    .then(response => {
      // JSON responses are automatically parsed.
      this.questions = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
}

}
</script>