<template>
  <v-container fluid subtopic_section qus_rprt>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">Article Report</h2></v-flex>
    </v-layout>
   <div class="question_fields">
</div>
    <template>
      <v-card class="clearqstnrprts" >
        <v-card-title>
          Article Report
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
          :items="articles"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
          class="kfptable"
        >
          <template  slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.created_at | createDate  }}</td>
            <td v-html="props.item.a_title"></td>
            <td> v.{{props.item.a_version}}</td>
             <td v-if="props.item.authordetail.length>0">{{props.item.authordetail[0].firstname+' '+props.item.authordetail[0].lastname}}</td>
              <td v-else></td>
            <td >{{props.item.q_status}}</td>
            <td class="text-xs-left">{{ props.item.updated_at | createDate  }}</td>
            <td><span v-if="props.item.publish==1" @click=unpublish(props.item._id) class="unpublish_btn" title="Click here to Unpublish">Unpublish</span>
            <span v-if="props.item.publish==0" @click=publish(props.item._id) class="unpublish_btn" title="Click here to Publish">Publish</span></td>
            <td class="text-xs-left scheduled_back" v-if="props.item.q_status=='Scheduled'">{{ props.item.scheduledatetime | createDatentime  }}</td>
            <td class="text-xs-left" v-else>{{ props.item.scheduledatetime | createDatentime  }}</td>
            <td> <a  :href="`/articleview?id=${props.item._id}`" class="answer_link">{{props.item.likes}}</a></td>
            <td> <a  :href="`/articleview?id=${props.item._id}`" class="answer_link">{{props.item.commentscount}}</a></td>
            <td> <a  :href="`/articlevisitreport?id=${props.item._id}`" class="answer_link">{{props.item.articleviews.length}}</a></td>
            <td>
            <span class="action_group">
            <a  :href="`/articleview?id=${props.item._id}`" target="_blank" title="View"><img src="../../assets/icons/eye.svg" class="fa_svg_icon"  />    </a> 
            <a  :href="`/editarticle?id=${props.item._id}`" title="Edit"><img src="../../assets/icons/edit.svg" class="fa_svg_icon"  />    </a> 
            <span class="cursoron" @click="deleteArticle(props.item._id)" title="Delete"><img src="../../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span> 
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
        rowsPerPage: 100,
        descending: true,
        sortBy: 'created_at'
      },
        headers: [
          { text: 'Created', sortable: true, value:'created_at' },
          { text: 'Article Title', align: 'left',sortable: true, value: 'a_title' },
          { text: 'Current Version', sortable: true, value:'a_version' },
          { text: 'Author', sortable: true, value:'authordetail[0]' },
          { text: 'Status', sortable: true, value:'q_status' },
          { text: 'Modified', sortable: true, value:'updated_at' },
          { text: 'Unpublish', sortable: true, value:'publish' },
           { text: 'Published', sortable: true, value:'scheduledatetime' },
          { text: 'Likes', sortable: true, value:'likes' },
          { text: 'Comments', sortable: true, value:'commentscount' },
          { text: 'Views', sortable: true, value:'articleviews.length' },
          { text: 'Actions', sortable: false, value:'' }
        ],
        articles: []
      }
    },
    methods: {
updateoptioncount(){
  axios.post(`/getallarticles`,{"loggedinuser":this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.articles = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
},
deleteArticle(articleid){
    if(confirm("Do you really want to delete?")){

  
  axios.post(`/deletearticle`,{"articleid":articleid})
    .then(response => {
      // JSON responses are automatically parsed.
    this.updateoptioncount();
    })
    .catch(e => {
      this.errors.push(e)
    }) 
     }
},unpublish(articleid){
  axios.post(`/unpublisharticle`,{"articleid":articleid})
    .then(response => {
      // JSON responses are automatically parsed.
    this.updateoptioncount();
    })
    .catch(e => {
      this.errors.push(e)
    }) 
},publish(articleid){
  axios.post(`/publisharticle`,{"articleid":articleid,"userid":this.currentuser})
    .then(response => {
      console.log(response);
      // JSON responses are automatically parsed.
    this.updateoptioncount();
    })
    .catch(e => {
      this.errors.push(e)
    }) 
}
    },
 created() {
  console.log('currdate- ', Date.now())
    axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuser = response.data.unique_id
    })
    .catch(e => {
      this.errors.push(e)
    }),
          axios.post(`/getallarticles`,{"loggedinuser":this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.articles = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
}

}
</script>