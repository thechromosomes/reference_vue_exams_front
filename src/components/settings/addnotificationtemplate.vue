<template>
<v-container>

<div class="createquestion">

<div class="col-md-7 col-md-offset-3">
<p class="left_heading col-md-12">Create Template</p>

<div class="question_fields col-md-12">
  <select class="col-md-12 qus_one animated infinite bounce delay-2s" v-model="template_type">
    <option value="">Template Type</option>
    <option v-for="templatetype in template_types" :value="templatetype.shortname" :key="templatetype">{{templatetype.templatename}}</option>
  </select>
</div>
<!--question loop-->
<!---checkboxes_createfields--->
<div class="checkboxes_createfields col-md-12">
<label> Subject</label>
<input type="text" v-model="subject" class="q_title" /> 
</div>
<div class="article_main">

<div class="question_fields col-md-12">
<tinymce id="template_content" v-model="template_content" key="template_content"></tinymce>
</div>


</div><!---choices_fields--->
<div class="col-md-12">
<button class="save_fields btn" @click="save_template">Save</button>
</div><!----save_fields---->
</div>
</div>
<template>
      <v-card class="clearqstnrprts" >
        <v-card-title>
          Template List
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
          :items="templates"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
          class="kfptable"
        >
          <template  slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.created_at | createDate  }}</td>
            <td v-html="props.item.content"></td>
            <td>{{props.item.templatetype.templatename}}</td>
            <td>
            <td>
            <span class="action_group">
            <a :href="`/editnotificationtemplate?id=${props.item._id}`"><img src="../../assets/icons/edit.svg" class="fa_svg_icon"/></a> 
            </span>
            </td>
            <td>
            <span class="action_group">
            <span class="cursoron" @click="deleteTemplate(props.item._id)" title="Delete"><img src="../../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span> 
            </span>
            </td>
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
import moment from 'moment'
import tinymce from 'vue-tinymce-editor'
var datetime = new Date();
var username=localStorage.username;
import axios from 'axios';
  export default {
    components: {tinymce},
   data() {
    return {
    template_content:null,
    subject:null,
    template_types:[],
    template_type:'',
    currentuser:null,
    roles:'',
     search: '',
        pagination: {
        rowsPerPage: 100
        },
       headers: [
          { text: 'Created', sortable: true, value:'' },
          { text: 'Content', align: 'left',sortable: true, value: 'a_title' },
          { text: 'Template Type', sortable: true, value:'' },
          { text: 'Actions', sortable: false, value:'' }
        ],
        templates: []
    }
  },
methods: {
 save_template(){
axios.post(`/savetemplate`,{'type_code':this.template_type,'roles':this.roles,'subject':this.subject,'content':this.template_content,'createdby':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
location.reload();
    })
    .catch(e => {
      this.errors.push(e)
    })
      },

    deleteTemplate(id){
       axios.post(`/removetemplate`,{'id':id})
      .then(response => {
        // JSON responses are automatically parsed.
      this.loadtemplate();
      })
      .catch(e => {
        this.errors.push(e)
      })     
    },

      loadtemplate(){
        axios.post(`/getalltemplates`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.templates = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })   
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
     axios.post(`/getalltemplatetype`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.template_types = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
     axios.post(`/getalltemplates`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.templates = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    
}

}
</script>