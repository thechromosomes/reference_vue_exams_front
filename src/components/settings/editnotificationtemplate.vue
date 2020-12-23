<template>
<v-container>

<div class="createquestion">

<div class="col-md-7 col-md-offset-3">
<p class="left_heading col-md-12">Edit Template</p>

<div class="question_fields col-md-12">
  <select class="col-md-12 qus_one animated infinite bounce delay-2s" v-model="template_type">
    <option value="">Template Type</option>
    <option v-for="templatetype in template_types" :value="templatetype.shortname">{{templatetype.templatename}}</option>
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
<button class="save_fields btn" @click="updateTemplate">Update</button>
</div><!----save_fields---->
</div>
</div>


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
    errors:[],
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
axios.post(`/savetemplate`,{'type_code':this.template_type,'roles':this.roles,'content':this.template_content,'createdby':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
location.reload();
    })
    .catch(e => {
      this.errors.push(e)
    })
      },

    //Update data Api ...........
     updateTemplate(){
         axios.post('/updatetemplate',{"id":this.$route.query.id,type_code:this.template_type,roles:this.roles,content:this.template_content,subject:this.subject})
        .then(response => {
          location.href = "/addnotificationtemplate"
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
    }),


    // fetch data api...
    axios.post(`/gettemplatebyid`,{'id':this.$route.query.id})
    .then(response => {
    //console.log(response.data);
      this.template_content = response.data.content,
      this.template_type = response.data.type_code,
      this.roles = response.data.roles,
      this.subject = response.data.subject
    })
    .catch(e => {
      this.errors.push(e)
    })



    
}

}
</script>