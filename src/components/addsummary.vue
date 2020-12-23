<template>
<v-container>

<div class="createquestion">
<div class="col-md-7 col-md-offset-3">
<p class="left_heading col-md-12"><img src="../assets/icons/question-square-solid_green.svg" class="ques_icon" v-if="version!=null">{{version}}</p>
<!--question loop-->
<div class="choices_fields col-md-12">
<ul class="choice_ul article_choice">

</ul>
</div>
<div class="question_fields col-md-12">
<tinymce id="summary_content" v-model="summary.summary_content" key="summary_content" :other_options="spelloptions"></tinymce>
</div>
<div class="question_fields col-md-12" v-if="summary.uploaded_file.length>0" v-for="(articleimg,articleimgindex) in summary.uploaded_file">
   <div class="overlay_hover_image">
        <div class="overlay-image">
            <div class="trashes_icon">
                <span @click="removeimage(articleimgindex)" class="trash_icon"><img src="../assets/icons/trash-img.svg"></span>
            </div> 
        </div>
<pdf :src="fileurl+articleimg" v-if="articleimg.toLowerCase().indexOf('.pdf') >= 0"></pdf> 
<img :src="fileurl+articleimg" class="q_hero_image img-responsive" v-if="articleimg.toLowerCase().indexOf('.pdf') < 0"/>
</div>
</div>
<div class="question_fields col-md-12" v-if="summary.summary_text_flag">
<span title="Remove Article Text" @click="removeArticletext(articleindex)" class="trashitem_icon remove_section"><img src="../assets/icons/trash-alt.svg"></span>
<label>Summary Text</label>
<tinymce id="article_text" v-model="summary.summary_text" key="article_text" :other_options="spelloptions"></tinymce>
</div>
<div class="choices_fields col-md-12">
<ul class="choice_ul article_choice">
<li @click="addSummaryText(summary.summary_text_flag)"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Text</li>
<li class="addimage_manage"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Image <input type="file" ref="sec_file" key="sec_file" id="sec_file" @change="attachsummaryfile()" multiple/></li>
</ul>
</div>
</div>
<!---choices_fields--->
<div class="col-md-10">
<button class="save_fields btn" @click="saveSummary">Save</button>

</div><!----save_fields---->
</div>
</div>
    <v-dialog v-model="imagevalidationpopup" persistent width="600" >
      <v-card class="validimage_card">
        <v-card-title class="headline grey lighten-2" primary-title >
          Image Validation <span class="crosspopup cp_scheduler" @click="resetquestionimage">x</span>
        </v-card-title>
        <v-card-text>
          <div class="single_ques_sec">
         <label>Q1: I have obtained permission from patient or patient guardian to use this image?</label>
            <v-btn-toggle
          v-model="image_permission"
          class="image_validation"
          mandatory
        >
          <v-btn>
            Yes
          </v-btn>
          <v-btn>
            No
          </v-btn>
          <v-btn>
            Not patient related
          </v-btn>
        </v-btn-toggle>
          </div>
          <div class="single_ques_sec">
           <label>Q2 : Source of the image?</label>
         <input class="ques_textarea" v-model="image_source" type="text" />
          </textarea>
          </div>
          <div class="error_warning" v-if="image_permission==1">Please do not upload patient images which you have not received permission to share.</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <input @click="resetquestionimage" name="done" value="Reset" type="button" class="submit_btn set_scheduler" />
          <template v-if="image_permission!==1">
          <input @click="updateimagesourceandpermission" name="done" value="Add" type="button" class="submit_btn set_scheduler"/>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>
   </v-container>
</template>
<script>
import moment from 'moment'
import tinymce from 'vue-tinymce-editor'
import pdf from 'vue-pdf'
var datetime = new Date();
var username=localStorage.username;
import axios from 'axios';
  export default {
    components: {tinymce,pdf},
   data() {
    return {
      summary:{'questionid':null,'questiontype':null,'summary_content':null,'summary_text':null,'summary_text_flag':false,'uploaded_file':[],'imagevalidation':{'image_permission':null,'image_source':null}},
      currentuser:null,
      errors: [],
      dataFilterKey:null,
      fileurl:window.publicfileurl,
      version:null,
      spelloptions:{browser_spellcheck: true},
      imagevalidationpopup:false,
      image_permission:0,
      image_source:null,
      art_image_flag:false,
      ques_image_flag:false,
      sec_image_flag:false,
    }
  },
    methods: {
       deactiveflag(){
      setTimeout(function () {
    this.activeflag=0;
}.bind(this), 500)
    },
      removeimage(imgindex){
this.removeimage.uploaded_file.splice(imgindex,1)
    },
     removeArticletext(articleindex){
      this.summary.summary_text_flag=false
      this.summary.summary_text=null 
      },
      updateddatentime(){
        this.scheduledate=this.datepicker;
      },
      resetquestionimage(){
       this.art_image_flag=false
       this.imagevalidationpopup=false
       this.image_source=null
      },
    addSummaryText(status){
      if(status){
this.summary.summary_text_flag=false
      }else{
this.summary.summary_text_flag=true
      }
    },
       async attachsummaryfile(){
        const files = this.$refs.sec_file.files;
        console.log(files);
         var qi=0;
        for(qi=0;qi<files.length;qi++){
          const file=files[qi];
        const formData = new FormData();
        formData.append("file", file);
        try{
          const res = await axios.post("/upload", formData);
          console.log(res.data);
          this.summary.uploaded_file.push(res.data.file)
          this.summary.imagevalidation.image_permission = this.image_permission
          this.imagevalidationpopup=true
          this.sec_image_flag=true
        } catch(err){
          console.log(err);
          
        }
        }
      },
      saveSummary(){
        console.log(this.summary);
    axios.post(`/savequestionsummary`,{'data':this.summary,'createdby':this.currentuser})
    .then(response => {
      console.log(response);
      this.$router.go(-1);
      // JSON responses are automatically parsed.
      //this.currentuser = response.data.unique_id
    })
    .catch(e => {
      this.errors.push(e)
    })
      },
         updateimagesourceandpermission(){
        if(this.sec_image_flag){
       this.summary.imagevalidation.image_permission = this.image_permission
       this.summary.imagevalidation.image_source = this.image_source
       this.sec_image_flag=false
          this.imagevalidationpopup=false
           this.image_source=null
                   if(this.image_permission=='1'){
this.summary.uploaded_file=null
       }
       this.image_permission=0
        }
      },
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
    axios.post(`/getquestion`,{'id':this.$route.query.id})
    .then(questionresponse => {
      // JSON responses are automatically parsed.
      console.log(questionresponse.data);
      this.version = questionresponse.data.version
      this.summary.questionid = questionresponse.data._id
       this.summary.questiontype = questionresponse.data.questiontype
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getquestionsummary`,{'questionid':this.$route.query.id})
    .then(summaryresponse => {
      if(summaryresponse.data!==null){
    this.summary.summary_content=summaryresponse.data.summary_content;
    this.summary.summary_text=summaryresponse.data.summary_text;
    this.summary.uploaded_file=summaryresponse.data.uploaded_file;
if(summaryresponse.data.summary_text!=null && summaryresponse.data.summary_text!=''){
this.summary.summary_text_flag=true  
}
      }
    
    })
    .catch(e => {
      this.errors.push(e)
    })
   
    
}

}
</script>