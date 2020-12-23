<template>
  <v-container fluid subtopic_section qus_rprt>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">Case Answer Report</h2></v-flex>
    </v-layout>
   <div class="question_fields">

  <span class="advnce_chkbx1">
   <label>User Name</label></br>
  <select class="col-md-12 qus_one animated infinite bounce delay-2s" v-model="submitter" @change="updateoptioncount()">
    <option value="null">Select User</option>
    <option v-for="submitterdata in submitters" :value="submitterdata.unique_id">{{submitterdata.firstname+' '+submitterdata.lastname}}</option>
  </select>
  </span>
<div class="filter_blocks" v-if="advance_filter">

<div class="form-group qusrprt_hideshow col-md-6">
<label class="tags_block">
<span class="tag_icon">
<img src="../../assets/icons/tags-regular.svg" class="tag_width"> 
</span> Age Range</label>
<i class="fas fa-sort-down dropdown_arrow"></i>
<input type="text" class="domain_input col-md-12">
</div>


<div class="form-group qusrprt_hideshow col-md-6">
<label class="tags_block">
<span class="tag_icon">
<img src="../../assets/icons/tags-regular.svg" class="tag_width" /> 
</span> Domain</label>
<i class="fas fa-sort-down dropdown_arrow"></i>
<input type="text" class="domain_input col-md-12">
</div>

<div class="form-group qusrprt_hideshow col-md-6">
<label class="tags_block">
<span class="tag_icon">
<img src="../../assets/icons/tags-regular.svg" class="tag_width"> 
</span> ICPC2 Category</label>
<i class="fas fa-sort-down dropdown_arrow"></i>
<input type="text" class="domain_input col-md-12">
</div>

<div class="form-group qusrprt_hideshow col-md-6">
<label class="tags_block">
<span class="tag_icon">
<img src="../../assets/icons/tags-regular.svg" class="tag_width"> 
</span> Age Range</label>
<i class="fas fa-sort-down dropdown_arrow"></i>
<input type="text" class="domain_input col-md-12">
</div>


<div class="form-group qusrprt_hideshow col-md-6">
<label class="tags_block">
<span class="tag_icon">
<img src="../../assets/icons/tags-regular.svg" class="tag_width"> 
</span> Gender</label>
<i class="fas fa-sort-down dropdown_arrow"></i>
<input type="text" class="domain_input col-md-12">
</div>

<div class="form-group qusrprt_hideshow col-md-6">
<label class="tags_block">
<span class="tag_icon">
<img src="../../assets/icons/tags-regular.svg" class="tag_width"> 
</span>  Aboriginal or Torres Strait ISlander</label>
<i class="fas fa-sort-down dropdown_arrow"></i>
<input type="text" class="domain_input col-md-12">
</div>

</div><!---filter_blocks--->

</div>
    <template>
      <v-card class="clearqstnrprts last_hide" >
        <v-card-title>
          Case Answer Report
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
          class="casetable"
        >
          <template  slot="items" slot-scope="props">
            <td>{{ props.item.questiondata.version }}</td>
             <td v-html="props.item.questiondata.q_title"></td>
             <td v-html="props.item.questiondata.q_subject"></td>
            <td> v.{{props.item.questiondata.q_version}}</td>
            <td>{{Math.round((((props.item.endtime - props.item.starttime) % 86400000) % 3600000) / 60000)}} Mins</td>
             <td v-html="props.item.commentcount"></td>
             <td v-html="props.item.replycount"></td>
            <td class="text-xs-left">{{ props.item.questiondata.created_at | createDate  }}</td>
            <td class="text-xs-left">{{ props.item.created_at | createDate  }}</td>
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
        submitters:[],
        submitter:null, 
        advance_filter:false,
        search: '',
        pagination: {
        rowsPerPage: 100
      },
        headers: [
          {text: 'Question ID', align: 'left', sortable: true, value: 'questiondata.version' },
          { text: 'Question Title', align: 'left', sortable: true, value: 'questiondata.q_title' },
          { text: 'Subject', align: 'left', sortable: true, value: 'questiondata.q_subject' },
          { text: 'Current Version', sortable: true, value:'questiondata.q_version' },
          { text: 'Answer Duration', sortable: true, value:'endtime' },
          { text: 'Comments', sortable: true, value:'questiondata.comment' },
          { text: 'Replies', sortable: true, value:'questiondata.reply' },
          { text: 'Created', sortable: true, value:'questiondata.created_at' },
          { text: 'Answer Date', sortable: true, value:'created_at' },
          { value:'createdfilter' }
        ],
        questions: []
      }
    },
    methods: {
updateoptioncount(){
  axios.post(`/getcaseuserwiseanswers`,{"userid":this.submitter})
    .then(response => {
      // JSON responses are automatically parsed.
      this.questions = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
},
deleteQuestion(questionid){
    if(confirm("Do you really want to delete?")){

  
  axios.post(`/deletequestion`,{"questionid":questionid})
    .then(response => {
      // JSON responses are automatically parsed.
    this.updateoptioncount();
    })
    .catch(e => {
      this.errors.push(e)
    }) 
     }
} 
    },
 created() {
    axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuser = response.data.unique_id
      axios.post(`/getcaseuserwiseanswers`,{"userid":this.currentuser})
    .then(uresponse => {
      // JSON responses are automatically parsed. 
      // this.questions = uresponse.data
        var i=0;
        for(i=0; i<=uresponse.data.length; i++){
          uresponse.data[i].createdfilter=dateFormat(uresponse.data[i].created_at,"dd/mm/yyyy");
          this.questions.push(uresponse.data[i]);
        }

    })
    .catch(e => {
      this.errors.push(e)
    })
    })
    .catch(e => {
      this.errors.push(e)
    }),
     axios.post(`/authorlist`,{'userid':null})
    .then(response => {
      this.submitters = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
}

}
</script>
<style>
.last_hide thead tr th:last-child {display:none;}
</style>