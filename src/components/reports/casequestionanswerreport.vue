<template>
  <v-container fluid subtopic_section qus_rprt>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">Case Answer Report</h2></v-flex>
    </v-layout>
    <template>
      <v-card class="clearqstnrprts" >
        <v-card-title>
          Case Answer Report
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="questions"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
          class="casetable"
        >

          <template  slot="items" slot-scope="props"> 
             <td>{{ props.item.submitbyuser.firstname }}</td>
             <td>{{ props.item.submitbyuser.lastname }}</td>
             <td>{{ props.item.created_at | createDate  }}</td>
             <td>{{ commentcount }}</td>
             <td> <a  :href="`/usercasequestionanswer?qid=${masterquestion}&uid=${props.item.submitbyuser.unique_id}`" class="answer_link">View</a></td>
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
        commentcount:0,
        q_typename:null,
        advance_filter:false,
        search: '',
        pagination: {
        rowsPerPage: 100
      },
        headers: [
          { text: 'First Name', align: 'left', sortable: true, value: 'submitbyuser.firstname' },
          { text: 'Last Name', align: 'left', sortable: true, value: 'submitbyuser.lastname' },
          { text: 'Submitted Date', sortable: true, value:'created_at' },
          { text: 'Comments', align: 'left', sortable: true, value: 'submitbyuser.commentcount' },
          { text: 'Action', sortable: false, value:'' }
        
        ],
        questions: [],
        masterquestion:null,
      }
    },
    methods: {
    },
 created() {
   this.masterquestion=this.$route.query.id;
    axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      this.currentuser = response.data.unique_id
    })
    .catch(e => {
      this.errors.push(e)
    }),


    axios.post(`/getcaseanswersofquestion`,{"questionid":this.$route.query.id})
    .then(response => {
      this.questions = response.data[0].questiondata
      this.commentcount = response.data[0].commentcount
      console.log(this.questions);
      
    })
    .catch(e => {
      this.errors.push(e)
    })

}

}
</script>