<template>
  <v-container fluid subtopic_section qus_rprt>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">My Question Report</h2></v-flex>
    </v-layout>
   <div class="question_fields">
<span class="advnce_chkbx">
<input type="checkbox" v-model="advance_filter"><span class="advnce_label"> Advance</span>
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
      <v-card class="clearqstnrprts last_two_hide" >
        <v-card-title>
        My Question Report
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
            <td>{{ props.item.version }}</td>
             <td v-html="props.item.q_title"></td>
             <td >{{props.item.q_status}}</td>
            <td> v.{{props.item.q_version}}</td>
            <td><span v-if="props.item.publish==1" @click=unpublish(props.item._id) class="unpublish_btn" title="Click here to Unpublish">Unpublish</span>
            <span v-if="props.item.publish==0" @click=publish(props.item._id) class="unpublish_btn" title="Click here to Publish">Publish</span></td>
           <td class="text-xs-left scheduled_back" v-if="props.item.q_status=='Scheduled'">{{ props.item.publish_date | createDatentime  }}</td>
            <td class="text-xs-left" v-else>{{ props.item.publish_date | createDatentime  }}</td>
            <td> <a  :href="`/studentquestionanswerreport?id=${props.item._id}`" class="answer_link">{{props.item.answercount.length}}</a></td>
            <td> <a  :href="`/studentquestionvisitreport?id=${props.item._id}`" class="answer_link">{{props.item.visitcount.length}}</a></td>
            <td>
              <span class="action_group">
              <a  :href="`/studentquestionanswer?id=${props.item._id}`" target="_blank" title="View"><img src="../../assets/icons/eye.svg" class="fa_svg_icon"  />    </a> 
            <a  :href="`/studenteditquestion?id=${props.item._id}`"><img src="../../assets/icons/edit.svg" class="fa_svg_icon"  />    </a>  
            <span class="cursoron" @click="deleteQuestion(props.item._id)"><img src="../../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span>
            </span>
            </td>
            <td class="text-xs-left">{{ props.item.created_at | createDate  }}</td>
            <td class="text-xs-left"> {{ props.item.updated_at | createDate  }}</td>
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
        q_typename:'5d15fea98edfed6c417592d16',
        advance_filter:false,
        search: '',
        pagination: {
        rowsPerPage: 100,
        descending: true,
        sortBy: 'publish_date'
      },
        headers: [
          {text: 'Question ID', align: 'left', sortable: true, value: 'version' },
          { text: 'Question Title', align: 'left', sortable: true, value: 'q_title' },
          { text: 'Status', sortable: true, value:'q_status' },
          { text: 'Current Version', sortable: true, value:'q_version' },          
          { text: 'Unpublish', sortable: true, value:'publish' },
          { text: 'Published', sortable: true, value:'publish_date' },
          { text: 'Answers', sortable: true, value:'answercount.length' },
          { text: 'Views', sortable: true, value:'visitcount.length' },
          { text: 'Actions', sortable: false, value:'filterdata' },
          { text: 'Created at', sortable: true, value:'created_at' },
          { text: 'Modified at', sortable: false, value:'updated_at' },
          { value:'updatedfilter' },
          { value:'publishfilter' }
        ],
        questions: []
      }
    },
    methods: {
      updateoptioncount()
      {
        axios.post(`/getmyuserquestions`,{"loggedinuser":this.currentuser,"q_type":this.q_typename})
        .then(response => {
          this.questions = response.data
        }).catch(e => {
            this.errors.push(e)
          })  
      },
      deleteQuestion(questionid)
      {
        console.log('qid-',questionid)
        if(confirm("Do you really want to delete?"))
        {
          axios.post(`/deletestudentquestion`,{"questionid":questionid})
          .then(response => {
            this.updateoptioncount();
          }).catch(e => {
              this.errors.push(e)
            }) 
        }
      },
      unpublish(questionid)
      {
          axios.post(`/unpublishquestion`,{"questionid":questionid})
          .then(response => {
            this.updateoptioncount();
          }).catch(e => {
              this.errors.push(e)
            }) 
      },
      publish(questionid)
      { 
        axios.post(`/getsinglestudentquestion`,{"questionid":questionid}).then(qresponse => 
        { 
          axios.post(`/publishquestionreport`,{"questionid":questionid,"childquestionid":qresponse.data,"userid":this.currentuser})
          .then(response => 
          {
            console.log(response);      
            this.updateoptioncount();
          }).catch(e => {
              this.errors.push(e)
            }) 
        }).catch(e => { 
            this.errors.push(e) 
          }) 
      }  
    },
    created() {
      axios.post(`/getcurrentuser`,{'username':username})
      .then(response => {
        this.currentuser = response.data.unique_id
        axios.post(`/getmyuserquestions`,{"loggedinuser":this.currentuser,"q_type":this.q_typename})
        .then(response => {
          console.log(response.data);
          // this.questions = response.data
          var i=0;
          for(i=0; i<=response.data.length; i++){
            response.data[i].filterdata=dateFormat(response.data[i].created_at,"dd/mm/yyyy");
            response.data[i].updatedfilter=dateFormat(response.data[i].updated_at,"dd/mm/yyyy");
            response.data[i].publishfilter=dateFormat(response.data[i].publish_date,"dd/mm/yyyy");
            this.questions.push(response.data[i]);
          }
        }).catch(e => {
            this.errors.push(e)
          })
      }).catch(e => {
          this.errors.push(e)
        }),
        axios.get(`/getallquestiontypes`)
        .then(response => {
          this.questiontypes = response.data
        }).catch(e => { 
            this.errors.push(e)
          })
    }
}
</script>
<style>
.last_two_hide thead tr th:last-child {display:none;}
.last_two_hide thead tr th:nth-last-child(2){display:none;}
</style>