<template>
  <v-container fluid subtopic_section qus_rprt>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">SBA/MCQ Question Bank Report</h2></v-flex>
    </v-layout>
   <div class="question_fields">

  <span class="advnce_chkbx1">
   <label>Question Type</label></br>
  <select class="col-md-12 qus_one animated infinite bounce delay-2s" v-model="q_typename" @change="updateoptioncount()">
    <option value="null">Question Type</option>
    <option v-for="(questiontype, index) in questiontypes" :key="index" :value="questiontype.unique_id" v-if="questiontype!=='5d15fea98edfed6c417592d9' && questiontype!=='5d15fea98edfed6c417592d14' && questiontype!=='5d15fea98edfed6c417592d15'">{{questiontype.qtypename}}</option>
  </select>
  </span>


<span class="advnce_chkbx">
<input type="checkbox" v-model="advance_filter"><span class="advnce_label"> Advance Filter</span>
</span>

<div class="filter_blocks" v-if="advance_filter">
<div class="form-group qusrprt_hideshow col-md-6">
<label class="tags_block">
<span class="tag_icon">
<img src="../../assets/icons/tags-regular.svg" class="tag_width">
</span> ICPC2 Category</label>
<i class="fas fa-sort-down dropdown_arrow"></i>
<v-chip v-for="(selected_icpc2,icpcindex) in categoryICPC2" v-bind:key="`icpc${icpcindex}`" close @input="removeselectedtag(icpcindex, 0)">{{selected_icpc2.tagname}}</v-chip>
<input type="text" class="domain_input col-md-12" @keyup="activeflagicpc = !activeflagicpc" @click="activeflagicpc = !activeflagicpc">
<ul class="drop_ul" v-if="activeflagicpc">
  <template v-for="(icpc2, ici) in icpc2s" >
    <li :key="`aaaa${ici}`" @click="addToCategory(icpc2, 0)">{{icpc2.tagname}}</li>
  </template>
</ul>
</div>

<div class="form-group qusrprt_hideshow col-md-6">
<label class="tags_block">
<span class="tag_icon">
<img src="../../assets/icons/tags-regular.svg" class="tag_width">
</span> Tags </label>
<i class="fas fa-sort-down dropdown_arrow"></i>
<v-chip v-for="(selected_icpc2,icpcindex) in tags" v-bind:key="`icpc${icpcindex}`" close @input="removeselectedtag(icpcindex, 1)">{{selected_icpc2.tagname}}</v-chip>
<input type="text" class="domain_input col-md-12" v-model="m_tags" @keyup="searchtags" @keydown="activeflagtags = !activeflagtags" @click="activeflagtags = !activeflagtags">
<ul class="drop_ul" v-if="activeflagtags">
  <li v-for="(searched_tag, index) in searched_tags" :key="index" @click="addToCategory(searched_tag,1)">{{searched_tag.tagname}}</li>
</ul>
</div>
</div>

<!---filter_blocks--->

</div>
    <template>
      <v-card class="clearqstnrprts last_hide" >
        <v-card-title>
          SBA/MCQ Question Bank Report
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <template>
            <pulse-loader :loading="pageLoader" color="#000000" size="30px"></pulse-loader>
          </template >
        <v-data-table
          v-if ="pageLoader === false"
          disable-initial-sort
          :headers="headers"
          :items="questions"
          :pagination.sync="pagination"
          class="kfptable"
        >
          <template  slot="items" slot-scope="props">
            <td>{{ props.item.version }}</td>
             <td v-html="props.item.q_title"></td>
             <td v-html="props.item.q_subject"></td>
             <td >{{props.item.q_status}}</td>
            <td> v.{{props.item.q_version}}</td>

            <td><span v-if="props.item.publish==1" @click=unpublish(props.item._id) class="unpublish_btn" title="Click here to Unpublish">Unpublish</span>
            <span v-if="props.item.publish==0" @click=publish(props.item._id) class="unpublish_btn" title="Click here to Publish">Publish</span></td>

            <td class="text-xs-left scheduled_back" v-if="props.item.q_status=='Scheduled'">{{ props.item.publish_date | createDatentime  }}</td>
            <td class="text-xs-left" v-else>{{ props.item.publish_date | createDatentime  }}</td>
            <td> <a  :href="`/questionanswerreport?id=${props.item._id}`" class="answer_link">{{props.item.answercount.length}}</a></td>
            <td> <a  :href="`/sbaquestionvisitreport?id=${props.item._id}`" class="answer_link">{{props.item.visitcount.length}}</a></td>
            <td>
            <span class="action_group">
            <a  :href="`/editquestion?id=${props.item._id}`"><img src="../../assets/icons/edit.svg" class="fa_svg_icon"  />    </a>
            <span class="cursoron" @click="deleteQuestion(props.item._id)"><img src="../../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span>
            </span>
            </td>
            <td class="text-xs-left">{{ props.item.created_at | createDatentime  }}</td>
            <td class="text-xs-left" v-if="props.item.createdbyuser.length>0">{{ props.item.createdbyuser[0].firstname+' '+props.item.createdbyuser[0].lastname}}</td>
            <td class="text-xs-left" v-else></td>
            <td class="text-xs-left"> {{ props.item.updated_at | createDatentime  }}</td>
             <td class="text-xs-left" v-if="props.item.updatedbyuser.length>0">{{ props.item.updatedbyuser[0].firstname+' '+props.item.updatedbyuser[0].lastname}}</td>
            <td class="text-xs-left" v-else></td>
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
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

  export default {
    components: {PulseLoader},
    data() {
      return {
        currentuser:null,
        errors: [],
        questiontypes:[],
        q_typename:null,
        advance_filter:false,
        search: '',
        pagination: {
        rowsPerPage: 10,
        descending: true,
        sortBy: 'publish_date'
      },
        headers: [
          {text: 'Question ID', align: 'left', sortable: true, value: 'version' },
          { text: 'Question Title', align: 'left', sortable: true, value: 'q_title' },
          { text: 'Subject', align: 'left', sortable: true, value: 'q_subject' },
          { text: 'Status', sortable: true, value:'q_status' },
          { text: 'Current Version', sortable: true, value:'q_version' },
           { text: 'Unpublish', sortable: true, value:'publish' },
          { text: 'Published', sortable: true, value:'publish_date' },
          { text: 'Answers', sortable: true, value:'answercount.length' },
          { text: 'Views', sortable: false, value:'' },
          { text: 'Actions', sortable: false, value:'filterdata' },
          { text: 'Created at', sortable: true, value:'created_at' },
          { text: 'Created by', sortable: true, value:'' },
          { text: 'Modified at', sortable: false, value:'updated_at' },
          { text: 'Modified by', sortable: false, value:'' },
                    { value:'publishfilter' },
        ],
        questions: [],
        icpc2s: [],
        activeflagicpc: false,
        activeflagtags: false,
        searched_tags: [],
        m_tags: null,
        category: [],
        categoryId: [],
        tableData: true,
        tags: [],
        categoryICPC2: [],
        pageLoader: true,
        skip: 0
      }
    },
    methods: {
updateoptioncount(){
  this.tableData =  true
  this.pageLoader = true
  axios.post(`/getallquestions`,{"loggedinuser":this.currentuser,"q_type":this.q_typename, "category": this.categoryId})
    .then(response => {
      // JSON responses are automatically parsed.
      this.questions = response.data
      this.tableData = false
      this.pageLoader = false
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
} ,unpublish(questionid){
  axios.post(`/unpublishquestion`,{"questionid":questionid})
    .then(response => {
      // JSON responses are automatically parsed.
    this.updateoptioncount();
    })
    .catch(e => {
      this.errors.push(e)
    })
},publish(questionid){
  axios.post(`/publishquestionreport`,{"questionid":questionid,"userid":this.currentuser})
    .then(response => {
      console.log(response);
      // JSON responses are automatically parsed.
    this.updateoptioncount();
    })
    .catch(e => {
      this.errors.push(e)
    })
},
//   to search tags
    searchtags() {
      axios.post(`/gettags`,{'searchedtag':this.m_tags})
      .then(response => {
        this.searched_tags = response.data
      });
    },

    // to add tag
    addToCategory(data, tags){
      this.category.push(data)
      this.categoryId.push(data.unique_id)
      if (tags == 1){
        this.tags.push(data)
      }else if (tags == 0){
        this.categoryICPC2.push(data)
      }

    },
    //to remove selected tags
      removeselectedtag(indexid, tags){
        this.category.splice(indexid, 1)
        this.categoryId.splice(indexid, 1)
        if (tags == 1){
        this.tags.splice(indexid, 1)
      }else if (tags == 0){
        this.categoryICPC2.splice(indexid, 1)
      }

      },

      toCallApi(){
        this.pageLoader = true
        axios.post(`/getallquestions`,{"loggedinuser":this.currentuser,"q_type":this.q_typename, "category": this.categoryId, "skip": this.skip})
        .then(response => {
          // JSON responses are automatically parsed.
          // this.questions = response.data
          var i=0;
          for(i=0; i<=response.data.length; i++){
            response.data[i].filterdata=dateFormat(response.data[i].created_at,"dd/mm/yyyy");
            response.data[i].publishfilter=dateFormat(response.data[i].publish_date,"dd/mm/yyyy");
            this.questions.push(response.data[i]);
            this.pageLoader = false

          }
        })
        .catch(e => {
          this.errors.push(e)
        })
      },

      toCallApiForSearch(){
        this.pageLoader = true
        axios.post(`/getallquestions`,{"loggedinuser":this.currentuser,"q_type":this.q_typename, "category": this.categoryId, "skip": this.skip, "search": this.search})
        .then(response => {
          this.questions = response.data;
          this.pageLoader = false
        })
        .catch(e => {
          this.errors.push(e)
        })
      }

},

    watch: {
      category (data) {
        this.updateoptioncount()
      },

      pagination (data){
      console.log(data)
      this.skip = data.page * 10
      this.toCallApi()
      }
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
    this.toCallApi()
     axios.get(`/getfilterquestiontypes`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.questiontypes = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })

       // for icpc2s
    axios.get(`/getallicpc2`)
    .then(response => {
      this.icpc2s = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })

    // for tags
    axios.post(`/gettags`,{'searchedtag':null})
    .then(response => {
      console.log(response)
      this.searched_tags = response.data
    })
}

}
</script>
<style>
.last_hide thead tr th:last-child {display:none;}
</style>