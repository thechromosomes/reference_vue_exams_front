<template>
<v-container>

<div class="createquestion">

<div class="col-md-7 col-md-offset-3">
<p class="left_heading col-md-12"><img src="../assets/icons/question-square-solid_green.svg" class="ques_icon" /> Edit Article</p>
<div class="question_fields col-md-12">
 <select class="col-md-12 qus_one animated infinite bounce delay-2s" v-model="article_version">
     <option :value="newa_version">New Version</option>
    <option :value="a_version">v.{{a_version}}</option>
  </select>
  </div>
<div class="question_fields col-md-12">
  <select class="col-md-12 qus_one animated infinite bounce delay-2s" v-model="author_name">
    <option value="">Author</option>
    <option v-for="author in authors" :value="author.unique_id">{{author.firstname+' '+author.lastname}}</option>
  </select>
</div>
<!--question loop-->
<!---checkboxes_createfields--->
<div class="checkboxes_createfields col-md-12">
<label> Title</label>
<input type="text" v-model="a_title" class="q_title" /> 
</div>
<div v-for="(article,articleindex) in articles" class="article_main">
<div class="checkboxes_createfields col-md-12">
<span title="Remove Section" @click="removeSection(articleindex)" class="trashitem_icon remove_section"><img src="../assets/icons/trash-alt.svg"></span>
<label> Section</label>
<input type="text" v-bind:id="`article_section${articleindex}`" v-model="article.article_section" v-bind:key="`article_section${articleindex}`" class="q_title" /> 
</div>
<div class="question_fields col-md-12" v-if="article.section_uploaded_file.length>0" v-for="(sec_articleimg,sec_articleimgindex) in article.section_uploaded_file">
   <div class="overlay_hover_image">
        <div class="overlay-image">
            <div class="trashes_icon">
                <span @click="removesectionimage(articleindex,articleimgindex)" class="trash_icon"><img src="../assets/icons/trash-img.svg"></span>
            </div>
        </div>
 <pdf :src="fileurl+sec_articleimg" v-if="sec_articleimg.toLowerCase().indexOf('.pdf') >= 0"></pdf>    
<img :src="fileurl+sec_articleimg" class="q_hero_image img-responsive" v-if="sec_articleimg.toLowerCase().indexOf('.pdf') < 0"/>
</div>
</div>
<div class="choices_fields col-md-12">
<ul class="choice_ul article_choice">
<li class="addimage_manage"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Image <input type="file" :ref="`sec_file${articleindex}`" :key="`sec_file${articleindex}`" :id="`sec_file${articleindex}`" @change="attacharticlesecfile('sec_file'+articleindex,articleindex)" multiple/></li>
</ul>
</div>
<div class="question_fields col-md-12">
<tinymce v-bind:id="`article_content${articleindex}`" v-model="article.article_content" v-bind:key="`article_content${articleindex}`" :ref="`article_content${articleindex}`" @editorInit="editorInitwithtext(article.article_content, 'article_content'+articleindex)" :other_options="spelloptions"></tinymce>
</div>

<div class="question_fields col-md-12" v-if="article.uploaded_file.length>0"  v-for="(articleimg,articleimgindex) in article.uploaded_file">
   <div class="overlay_hover_image">
        <div class="overlay-image">
            <div class="trashes_icon">
                <span @click="removeimage(articleindex,articleimgindex)" class="trash_icon"><img src="../assets/icons/trash-img.svg"></span>
            </div>
        </div>
<pdf :src="fileurl+articleimg" v-if="articleimg.toLowerCase().indexOf('.pdf') >= 0"></pdf> 
<img :src="fileurl+articleimg" class="q_hero_image img-responsive" v-if="articleimg.toLowerCase().indexOf('.pdf') < 0"/>
</div>
</div>
<div class="question_fields col-md-12" v-if="(article.article_text!=null && article.article_text!='') || article.article_text_flag==true">
<span title="Remove Article Text" @click="removeArticletext(articleindex)" class="trashitem_icon remove_section"><img src="../assets/icons/trash-alt.svg"></span>
<label>Article Text</label>
<tinymce v-bind:id="`article_text${articleindex}`" v-model="article.article_text" v-bind:key="`article_text${articleindex}`" :ref="`article_text${articleindex}`" @editorInit="editorInitwithtext(article.article_text, 'article_text'+articleindex)"  :other_options="spelloptions"></tinymce>
</div>
 <div class="choices_fields col-md-12">
<div class="question_section" v-for="(question,questionindex) in article.questions">

<div class="question_fields col-md-12">
<span title="Remove Question" @click="removeQuestion(articleindex,questionindex)" class="trashitem_icon remove_section"><img src="../assets/icons/trash-alt.svg"></span>
<label>Question</label>
<tinymce v-bind:id="`question_content${articleindex}${questionindex}`" v-model="question.question_text" v-bind:key="`question_content${articleindex}${questionindex}`" :ref="`question_content${articleindex}${questionindex}`" @editorInit="editorInitwithtext(question.question_text, 'question_content'+articleindex+questionindex)" :other_options="spelloptions"></tinymce>
</div>
<div class="question_fields col-md-12" v-if="question.uploaded_file.length>0" v-for="(qimage,qimageindex) in question.uploaded_file">
   <div class="overlay_hover_image">
        <div class="overlay-image">
            <div class="trashes_icon">
                <span @click="removequestionimage(articleindex,questionindex,qimageindex)" class="trash_icon"><img src="../assets/icons/trash-img.svg"></span>
            </div>
        </div>
<pdf :src="fileurl+qimage" v-if="qimage.toLowerCase().indexOf('.pdf') >= 0"></pdf> 
<img :src="fileurl+qimage" class="q_hero_image img-responsive" v-if="qimage.toLowerCase().indexOf('.pdf') < 0"/>
</div>
</div>
<div class="choices_fields col-md-12">
<div class="form-group">
<div class="col-md-6"><label><input type="radio" name="mcachoice" v-model="question.choiceoption" value="1" class="Schoice_input"  @change="changeOption(articleindex,questionindex)"><span>Single Choice</span></label></div>
<div class="col-md-6"><label><input type="radio" name="mcachoice" v-model="question.choiceoption" value="2" class="Mchoice_input"  @change="changeOption(articleindex,questionindex)"><span>Multiple Choice</span></label></div>
</div>
</div>

 <div class="choices_fields col-md-12"> 
<div v-for="(qoptiondata,qdataindex) in question.options">
<div class="input_hover">
<input :type="question.optionchoice" name="Choice1" value="true" v-model="qoptiondata.answervalue" class="choice_input" @change="rightAnswer(articleindex,questionindex,question.optionchoice,qdataindex)">
<textarea type="text" :placeholder="`Choice ${qdataindex+1}`" v-model="qoptiondata.option_text" class="option_choice" ></textarea>
<span @click="removeoption(articleindex,questionindex,qdataindex)"><i class="fa fa-times" aria-hidden="true"></i></span></div><br>
</div>
</div>

<div class="choices_fields col-md-12">
<ul class="choice_ul article_choice">
<li @click="addChoice(articleindex,questionindex)"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Choice</li>
<li ><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Question Image <input type="file" :ref="`questionfile${articleindex}${questionindex}`" :key="`questionfile${articleindex}{questionindex}`" :id="`questionfile${articleindex}{questionindex}`" @change="attachfilequestion('questionfile'+articleindex+questionindex,articleindex,questionindex)" multiple/></li>
</ul>
</div>
<div class=" qus_btm col-md-12">
<label >Answer explanation </label>
<tinymce v-bind:id="`answer_explanation${articleindex}${questionindex}`" v-bind:key="`answer_explanation${articleindex}${questionindex}`" v-model="question.answer_explanation" :ref="`answer_explanation${articleindex}${questionindex}`" @editorInit="editorInitwithtext(question.answer_explanation, 'answer_explanation'+articleindex+questionindex)" :other_options="spelloptions"></tinymce>
</div>
</div>
</div>


<div class="choices_fields  col-md-12">
<ul class="choice_ul article_choice border_article">
<li @click="addArticleText(articleindex)"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Text</li>
<li ><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Image <input type="file" :ref="`file${articleindex}`" :key="`file${articleindex}`" :id="`file${articleindex}`" @change="attachfiletopost('file'+articleindex,articleindex)" multiple/></li>
<li @click="addnewquestion(articleindex)"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Question</li>
</ul>
</div>

</div>

<div class="question_fields col-md-12">
<ul class="choice_ul_kfp">
<li @click="addnewarticle"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add New Section</li>
</ul>
</div>

<div class="col-md-12">
<div class="form-group">
<label class="tags_block"><span class="tag_icon"><img src="../assets/icons/tags-regular.svg" class="tag_width" /> </span> Tags</label>
<i class="fas fa-sort-down dropdown_arrow dropdown_arrow_tags"></i>
 <v-chip v-for="(selected_tag,tagindex) in selected_tags" v-bind:key="`tag${tagindex}`" close @input="removeselectedtag(tagindex,1)" >{{selected_tag.tagname}}</v-chip>
<input type="text" class="domain_input col-md-12 bounce" v-model="m_tags" @keyup="searchtags" @keydown="activeflag=1" @click="activeflag=1" @blur="deactiveflag"/>
<ul class="drop_ul" v-if="activeflag==1">
<li v-for="searched_tag in searched_tags"  @click="selectedtags(searched_tag)">{{searched_tag.tagname}}</li>
</ul>
</div>

</div><!---choices_fields--->
<div class="col-md-12">
<div class="col-md-5 schedule_main"> 
 <span class="add_qschedule_p cursoron" ><span @click="addscheduler=true"> <img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon1"/> <span class="time_left" v-if="publishdate > Date.now()">{{publishdate | timeleft}}</span></span><span class="remove_scheduler" v-if="publishdate > Date.now()" @click="removeScheduler">x</span> </span>
</div>
<!-- {{'publishcheck--'+publishcheck}}
{{'old_version--'+old_version}}
{{'article_version--'+article_version}} -->
<button class="save_fields btn" @click="updateArticle(1)" v-if="publishcheck==0 || old_version!==article_version">Publish</button>
<button class="save_fields btn" @click="updateArticle(0)">Save</button>
<a :href="`/articleview?id=${master_articleid}`" target="_blank"><button class="save_fields btn" >View</button></a>
</div><!----save_fields---->
</div>
</div>

 <v-dialog
      v-model="addscheduler"
      width="600"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Select date and time <span class="crosspopup cp_scheduler" @click="addscheduler=false">x</span>
        </v-card-title>

        <v-card-text>
        <div class="schedulercontainer">
 <v-date-picker v-model="datepicker" @change="updateddatentime" ></v-date-picker>
 <div class="scheduler_com">
 <v-text-field
            v-model="scheduledate"
            value="scheduledate"
          ></v-text-field>
       </div>
        <div class="scheduler_com2">
          <v-select
             :items="hours"
            v-model="scheduletimehrs"
          ></v-select>
          <v-select
          :items="minutes"
            v-model="scheduletimemins"
          ></v-select>
          <v-select
           :items="ampm"
            v-model="scheduletimeapm"
          ></v-select>
          </div>
          </div>
        </v-card-text>
         <v-card-actions>
          <v-spacer></v-spacer>
          <input @click='set_scheduler' name="Set" type="submit" class="submit_btn set_scheduler" />
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      articles:[],
	    author_name:'',
      a_version:1,
      currentuser:null,
       addscheduler:false,
      a_title:null,
      article_version:null,
      errors: [],
      authors:[],
      optionchoice:"radio",
       hours:['01','02','03','04','05','06','07','08','09','10','11','12'],
      minutes:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
      ampm:['AM','PM'],
       scheduledate:moment().format('YYYY-MM-DD'),
       scheduletime:null,
       scheduletimehrs:moment().format('hh'),
       scheduletimemins:moment().format('mm'),
       scheduletimeapm:moment().format('A'),
       datepicker:null,
      m_tags:null,
      publishdate:null,
      dataFilterKey:null,
      searched_tags:null,
      selected_tags:[],
      selected_tags_id:[],
      activeflag:0,
      uploaded_file:null,
      fileurl:window.publicfileurl,
      optioncounts:0,
      newa_version:0,
      old_version:0,
      publishcheck:null,
      master_articleid:null,
      spelloptions:{browser_spellcheck: true},
      imagevalidationpopup:false,
      image_permission:"0",
      image_source:null,
      section_indexid:0,
      question_indexid:0,
      art_image_flag:false,
      ques_image_flag:false,
      sec_image_flag:false,
    }
  },
    methods: {
      editorInitwithtext(data, articleindex){
        const refdata = this.$refs[articleindex]
        refdata[0].editor.setContent(data);
      },
 set_scheduler(){
         this.scheduledatetime=this.scheduledate+' '+this.scheduletimehrs+':'+this.scheduletimemins+' '+this.scheduletimeapm
         this.addscheduler=false
         this.publishdate=moment(this.scheduledatetime).unix()*1000

      },
       deactiveflag(){
      setTimeout(function () {
    this.activeflag=0;
}.bind(this), 500)
    },
      updateddatentime(){
        this.scheduledate=this.datepicker;
      },
           removeScheduler() {
       this.publishdate=Date.now()
       this.scheduledate=moment().format('YYYY-MM-DD')
       this.datepicker=moment().format('YYYY-MM-DD')
        this.scheduletimehrs=moment().format('hh')
        this.scheduletimemins=moment().format('mm')
        this.scheduletimeapm=moment().format('A')
        this.scheduledatetime=this.scheduledate+' '+this.scheduletimehrs+':'+this.scheduletimemins+' '+this.scheduletimeapm
      },
        removeimage(aindex,imgindex){
this.articles[aindex].uploaded_file.splice(imgindex,1)
    },
     removesectionimage(aindex,imgindex){
this.articles[aindex].section_uploaded_file.splice(imgindex,1)
    },
    removequestionimage(aindex,qindex,imgindex){
   this.articles[aindex].questions[qindex].uploaded_file.splice(imgindex,1)
    },
     removeQuestion(aindex,qindex){
this.articles[aindex].questions.splice(qindex,1)
    },
     removeSection(aindex){
       if(confirm("Do you really want to remove?")){
     if(this.articles[aindex]._id){     
  axios.post(`/deletearticlesection`,{"sectionid":this.articles[aindex]._id})
    .then(response => {
      // JSON responses are automatically parsed.
    this.updateoptioncount();
    })
    .catch(e => {
      this.errors.push(e)
    }) 
     }
this.articles.splice(aindex,1)
     }
    },  
     removeArticletext(articleindex){
      this.articles[articleindex].article_text_flag=false
      this.articles[articleindex].article_text=null 
      },
         resetquestionimage(){
     
       if(this.art_image_flag){
       this.articles[this.section_indexid].mainimagevalidation.image_permission = this.image_permission
       this.articles[this.section_indexid].mainimagevalidation.image_source = this.image_source 
       this.art_image_flag=false
       this.imagevalidationpopup=false
this.articles[this.section_indexid].uploaded_file=null
        this.image_permission=0
        this.image_source=null
        }
        if(this.sec_image_flag){
       this.articles[this.section_indexid].sectionimagevalidation.image_permission = this.image_permission
       this.articles[this.section_indexid].sectionimagevalidation.image_source = this.image_source
       this.sec_image_flag=false
          this.imagevalidationpopup=false
this.articles[this.section_indexid].section_uploaded_file=null
        this.image_permission=0
        this.image_source=null
        } 
        if(this.ques_image_flag){
       this.articles[this.section_indexid].questions[this.question_indexid].questionimagevalidation.image_permission = this.image_permission
       this.articles[this.section_indexid].questions[this.question_indexid].questionimagevalidation.image_source = this.image_source
       this.ques_image_flag=false
          this.imagevalidationpopup=false
this.articles[this.section_indexid].questions[this.question_indexid].uploaded_file=null
        this.image_permission=0
        this.image_source=null
        } 
      },
          updateimagesourceandpermission(){
  if(this.art_image_flag){
       this.articles[this.section_indexid].mainimagevalidation.image_permission = this.image_permission
       this.articles[this.section_indexid].mainimagevalidation.image_source = this.image_source 
       this.art_image_flag=false
       this.imagevalidationpopup=false
       this.image_source=null
              if(this.image_permission=='1'){
this.articles[this.section_indexid].uploaded_file=null
       }
       this.image_permission=0

        }
        if(this.sec_image_flag){
       this.articles[this.section_indexid].sectionimagevalidation.image_permission = this.image_permission
       this.articles[this.section_indexid].sectionimagevalidation.image_source = this.image_source
       this.sec_image_flag=false
          this.imagevalidationpopup=false
           this.image_source=null
                   if(this.image_permission=='1'){
this.articles[this.section_indexid].section_uploaded_file=null
       }
       this.image_permission=0
        }
         if(this.ques_image_flag){
       this.articles[this.section_indexid].questions[this.question_indexid].questionimagevalidation.image_permission = this.image_permission
       this.articles[this.section_indexid].questions[this.question_indexid].questionimagevalidation.image_source = this.image_source
       this.ques_image_flag=false
          this.imagevalidationpopup=false
           this.image_source=null
                   if(this.image_permission=='1'){
this.articles[this.section_indexid].questions[this.question_indexid].uploaded_file=null
       }
       this.image_permission=0
  
        }
      },
    changeOption(atrticleindex,questionindex){
if(this.articles[atrticleindex].questions[questionindex].choiceoption==2){
this.articles[atrticleindex].questions[questionindex].optionchoice='checkbox'
}else{
this.articles[atrticleindex].questions[questionindex].optionchoice='radio'
}
    },
     searchtags(){
      axios.post(`/gettags`,{'searchedtag':this.m_tags})
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      this.searched_tags = response.data
    });  
    },
    selectedtags(data){
this.selected_tags.push(data);
this.selected_tags_id.push(data.unique_id);
this.m_tags=null;
this.activeflag=0;

    },
    addArticleText(articlendex,status){
      if(status){
this.articles[articlendex].article_text_flag=false
      }else{
this.articles[articlendex].article_text_flag=true
      }
    },
    rightAnswer(aindex,qindex,optiontype,indexid){
      var i;
      if(optiontype=='radio'){
     for(i=0;i < this.articles[aindex].questions[qindex].options.length; i++){

    if(i!=indexid){
 this.articles[aindex].questions[qindex].options[i].answervalue=false
    }
     }
      }
console.log(optiontype+' hhh '+indexid)
    },

    changeactiveflag(id){
this.activeflag=id;
    },
removeselectedtag(indexid,type){
      if(type==1){
this.selected_tags.splice(indexid, 1)
this.selected_tags_id.splice(indexid, 1)
      }
    },
      updateoptioncount(){
        var i=0;
this.articles[0].options=[]
      },
      updateoptiontype(qindex,qchoice){
if(qchoice==2){
this.articles[qindex].optionchoice="checkbox";
}else{
this.articles[qindex].optionchoice="radio";
}
      },
      addChoice(aindex,qindex){
       var optionorder=this.articles[aindex].questions[qindex].options.length+1;
var tempopt={'answervalue':false,'option_text':'','option_order':optionorder}
            this.articles[aindex].questions[qindex].options.push(tempopt);
      },
  async attachfiletopost(qref,qindex){
        const files = this.$refs[qref][0].files;
         var qi=0;
        for(qi=0;qi<files.length;qi++){
          const file=files[qi];
        const formData = new FormData();
        formData.append("file", file);
        try{
          const res = await axios.post("/upload", formData);
          console.log(res.data);
          this.articles[qindex].uploaded_file.push(res.data.file)
          this.articles[qindex].mainimagevalidation.image_permission = this.image_permission
          this.imagevalidationpopup=true
          this.section_indexid=qindex
          this.art_image_flag=true
        } catch(err){
          console.log(err);
          
        }
        }
      },
       async attacharticlesecfile(qref,qindex){
        const files = this.$refs[qref][0].files;
         var qi=0;
        for(qi=0;qi<files.length;qi++){
          const file=files[qi];
        const formData = new FormData();
        formData.append("file", file);
        try{
          const res = await axios.post("/upload", formData);
          console.log(res.data);
          this.articles[qindex].section_uploaded_file.push(res.data.file)
          this.articles[qindex].sectionimagevalidation.image_permission = this.image_permission
          this.imagevalidationpopup=true
          this.sec_image_flag=true
           this.section_indexid=qindex
        } catch(err){
          console.log(err);
          
        }
        }
      },
     async attachfilequestion(qref,aindex,qindex){
        const files = this.$refs[qref][0].files;
        var qi=0;
        for(qi=0;qi<files.length;qi++){
          const file=files[qi];
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        try{
          
          const res = await axios.post("/upload", formData);
          console.log(res.data);
          this.articles[aindex].questions[qindex].uploaded_file.push(res.data.file);
          this.articles[aindex].questions[qindex].questionimagevalidation.image_permission = this.image_permission
          this.imagevalidationpopup=true
          this.ques_image_flag=true
           this.section_indexid=aindex
            this.question_indexid=qindex
        } catch(err){
          console.log(err);
          
        }
        }
      },
     removeoption(aindex,qindex,id){
this.articles[aindex].questions[qindex].options.splice(id, 1)
      },
      updateArticle(savestatus)
      {
        var tags=this.selected_tags_id.join(",");
        if(this.scheduledatetime!==null){
          this.scheduledatetime= moment(this.scheduledatetime).unix()*1000
        }else{
           this.scheduledatetime=Date.now();
        }
        axios.post(`/updatearticle`,{"id":this.master_articleid,"savestatus":savestatus,'publishcheck':this.publishcheck,"old_version":this.old_version,"article_version":this.article_version,"a_title":this.a_title,"author_name":this.author_name,"tags":tags,"scheduledatetime":this.scheduledatetime,"createdby":this.currentuser,"data":this.articles})
        .then(response => 
        {
          console.log(response);  
          if((this.article_version!=this.old_version && savestatus==1) || (savestatus==1 && this.publishcheck==0))
          {
            axios.post('/addpostbyweb',{"articleid":response.data._id,attachement:null,tags:tags,postcontent:null,searchcontent:this.a_title,createdby:this.currentuser,scheduledatetime:this.scheduledatetime}).then((postresponse)=>
            {
              axios.post('/setarticlepublishnotification',{"weburl":'articleview',"appurl":'',"targetid":response.data._id,"title":this.a_title,"articleid":response.data._id,"postid":postresponse.data.unique_id,"authorid":this.author_name,"createdby":this.currentuser,scheduled:this.scheduledatetime}).then((notiresponse)=>
              {
                console.log(notiresponse);
                location.href='/articlereport';
              }).catch((error)=>{
                  console.log(error);
                }) 
            }).catch((error)=>{
                console.log(error);
              }) 
          }
          else{
            location.reload();
          }  
        }).catch(e => {
            console.log(errors);
            this.errors.push(e)
        })
      },
      addnewquestion(artcleindex){
        var qorder=this.articles[artcleindex].questions.length+1;
this.articles[artcleindex].questions.push({'question_text':'','optionchoice':'radio','choiceoption':'1','q_order':qorder,options:[],'uploaded_file':[],'answer_explanation':null,'questionimagevalidation':{'image_permission':null,'image_source':null}})
      },
	   addnewarticle(){
        var qorder=this.articles.length+1;
this.articles.push({'article_content':'','article_text':'','article_text_flag':false,'article_section':'','questions':[],'uploaded_file':[],'a_order':qorder,'section_uploaded_file':[],'sectionimagevalidation':{'image_permission':null,'image_source':null},'mainimagevalidation':{'image_permission':null,'image_source':null}})
       }
    },
 created() {
 this.master_articleid=this.$route.query.id;
   axios.post(`/getarticleforedit`,{'articleid':this.master_articleid})
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      this.author_name=response.data[0].maindata.author_name
      this.a_title=response.data[0].maindata.a_title
      this.article_version=response.data[0].maindata.a_version
      this.old_version=response.data[0].maindata.a_version
      this.newa_version=response.data[0].maindata.a_version
      this.a_version=response.data[0].maindata.a_version
      this.publishcheck=response.data[0].maindata.publish
      this.publishdate=response.data[0].publish_date
      this.scheduledatetime=response.data[0].publish_date
       this.scheduledate=moment.unix(this.publishdate/1000).format('YYYY-MM-DD')
       this.datepicker=moment.unix(this.publishdate/1000).format('YYYY-MM-DD')
        this.scheduletimehrs=moment.unix(this.publishdate/1000).format('hh')
        this.scheduletimemins=moment.unix(this.publishdate/1000).format('mm')
        this.scheduletimeapm=moment.unix(this.publishdate/1000).format('A')
      this.newa_version++
      this.articles = response.data
      if(response.data[0].tagdata.length >=0){
   var j=0;
 for(j=0;j<response.data[0].tagdata.length;j++){
      this.selected_tags.push(response.data[0].tagdata[j]);
      this.selected_tags_id.push(response.data[0].tagdata[j].unique_id);
      }
} 
    }).catch(e => {
      this.errors.push(e)
    }),
     axios.post(`/gettags`,{'searchedtag':null})
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      this.searched_tags = response.data
    }).catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuser = response.data.unique_id
    })
    .catch(e => {
      this.errors.push(e)
    }),
     axios.post(`/authorlist`,{'userid':null})
    .then(response => {
      // JSON responses are automatically parsed.
      this.authors = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    
}

}
</script>