<template>
  <v-container>
    <div class="createquestion">
      <div class="row">
        <div class="col-sm-12">
    <div class="col-sm-3 sticky-position">
    <div class= "left_article" >
    <span v-for="(qdata, qindex) in questions">
        <a  class="container_link" :href="`#${qdata.id}`" :id="`sec${qdata.id}`" v-if="qdata.question_text!=null && qdata.question_text!=''">Question {{qindex+1}}</a> 
   </span>

    </div>
    </div>
<div class="col-md-7 col-md-offset-3">
<p class="left_heading col-md-12"><img src="../assets/icons/question-square-solid_green.svg" class="ques_icon" />Add a question : {{version}}</p>
<div class="question_fields col-md-12">
 <select class="col-md-12 qus_one animated infinite bounce delay-2s" v-model="question_version">
     <option :value="newq_version">New Version</option>
    <option :value="q_version">v.{{q_version}}</option>
  </select>
  </div>
<div class="question_fields col-md-12">
  <select class="col-md-5 qus_one animated infinite bounce delay-2s" v-model="q_typename" @change="updateoptioncount()" disabled>
    <option value="">Question Type</option>
    <option v-for="questiontype in questiontypes" :value="questiontype.unique_id">{{questiontype.qtypename}}</option>
  </select>

  <select class="col-md-5 col-md-offset-2 qus_two" v-model="college" disabled>
    <option v-for="college in colleges" :value="college.unique_id">{{college.collegename}}</option>
  </select>
  
</div><!---question_fields--->


<!--question loop-->
<div class="checkboxes_createfields col-md-12">
<label>Question Title</label>
<input type="text" v-model="q_title" class="q_title" /> 
</div>
<div class="checkboxes_createfields col-md-12">
<label>Subject</label>
<input type="text" v-model="q_subject" class="q_title" /> 
<input type="hidden" v-model="updatecheck" /> 

</div>
<!---checkboxes_createfields--->
<div v-for="(question,questionindex) in questions" class="question_section" v-bind:id="`${question.id}`">
<div class="row">
<div v-for="(stemdata,stemindex) in question.stem">
<div class="question_fields col-md-12">
<label v-if="kfpflag">Stem {{questionindex+1}}</label>
<label v-if="!kfpflag">Stem </label>
<tinymce v-bind:id="`stem_text${questionindex}${stemindex}`" v-model="stemdata.stem_text" v-bind:key="`stem_text${questionindex}${stemindex}`" :ref="`stem_text${questionindex}${stemindex}`" @editorInit="editorInitwithtext(stemdata.stem_text, 'stem_text'+questionindex+stemindex)" :other_options="spelloptions"></tinymce>
</div>
</div>

<!-- to add multiple file upload functionalty -->
<template>
 <div class="question_fields col-md-12" v-if="question.multiple_uploadedstem_file && question.multiple_uploadedstem_file.length > 0">
  <div v-for="(element, index) in question.multiple_uploadedstem_file" :key="index"> 
   <div class="overlay_hover_image">
        <div class="overlay-image">
            <div class="trashes_icon">
                <span @click="removestemimage(questionindex,stemindex, index)" class="trash_icon"><img src="../assets/icons/trash-img.svg"></span>
            </div>
        </div>
        <div v-if="element.includes('.pdf') == false">
          <img :src="fileurl+element" class="img-responsive title_imageprview"/>
        </div>
        <div  v-else >
          <a :href="fileurl+element" target="_blank"><pdf :src="fileurl+element" ></pdf></a>
        </div>
    </div>
  </div>
</div>

<div class="question_fields col-md-12" v-else-if="question.uploadedstem_file!==null">
   <div class="overlay_hover_image">
        <div class="overlay-image">
            <div class="trashes_icon">
                <span @click="removestemimage(questionindex,stemindex)" class="trash_icon"><img src="../assets/icons/trash-img.svg"></span>
            </div>
        </div>
 <pdf :src="fileurl+question.uploadedstem_file" v-if="question.uploadedstem_file.toLowerCase().indexOf('.pdf') >= 0"></pdf>
 <img :src="fileurl+question.uploadedstem_file" v-if="question.uploadedstem_file.toLowerCase().indexOf('.pdf') < 0" class="q_hero_image img-responsive"/>
</div>
</div>
</template>


<div class="question_fields col-md-12" v-if="kfpflag">
<ul class="choice_ul_stem stem_ulist">
<li @click="addStemp(questionindex)"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Aditional STEM</li>
<li class="add_image_button">
<span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>
<span class="file_text">Add Image </span>
<input type="file" class="file_input" :ref="`stemfile${questionindex}`" :key="`stemfile${questionindex}`" :id="`stemfile${questionindex}`" @change="attachfilestemfile('stemfile'+questionindex,questionindex)" multiple/></li>
</ul>
</div>
<div class="question_fields col-md-12">
  <div v-if="showerror==true" style="color: red;"><span class="question_error">{{formerror[0].questexterr}}</span></div>
<label v-if="kfpflag">Question Text {{questionindex+1}}</label>
<label v-if="!kfpflag">Question Text </label>
  <input v-model="hiddenm" type="text" v-bind:ref="`focus${questionindex}`" class="focusitem">
<tinymce v-bind:id="`question_text${questionindex}`" v-model="question.question_text" :ref="`question_text${questionindex}`" @editorInit="editorInitwithtext(question.question_text, 'question_text'+questionindex)" v-bind:key="`question_text${questionindex}`" :other_options="spelloptions"></tinymce>
</div>
<div class="question_fields col-md-12" v-if="question.instruction_flag">
<label v-if="kfpflag">Instructions {{questionindex+1}}</label>
<label v-if="!kfpflag">Instructions </label>
<tinymce v-bind:id="`instruction_text${questionindex}`" v-model="question.instruction_text" v-bind:key="`instruction_text${questionindex}`" :ref="`instruction_text${questionindex}`" @editorInit="editorInitwithtext(question.instruction_text, 'instruction_text'+questionindex)" :other_options="spelloptions"></tinymce>
</div>


<!-- to add multiple file upload functionalty -->
<template>
 <div class="question_fields col-md-12" v-if="question.multiple_uploaded_file && question.multiple_uploaded_file.length > 0">
  <div v-for="(element, index) in question.multiple_uploaded_file" :key="index"> 
   <div class="overlay_hover_image">
        <div class="overlay-image">
            <div class="trashes_icon">
                <span @click="removequestionimage(questionindex,stemindex, index)" class="trash_icon"><img src="../assets/icons/trash-img.svg"></span>
            </div>
        </div>
        <div v-if="element.includes('.pdf') == false">
          <img :src="fileurl+element" class="img-responsive title_imageprview"/>
        </div>
        <div  v-else >
          <a :href="fileurl+element" target="_blank"><pdf :src="fileurl+element" ></pdf></a>
        </div>
    </div>
  </div>
</div>

<div class="question_fields col-md-12" v-else-if="question.uploaded_file !== null">
   <div class="overlay_hover_image">
        <div class="overlay-image">
            <div class="trashes_icon">
                <span class="trash_icon" @click="removequestionimage(questionindex)"><img src="../assets/icons/trash-img.svg"></span>
            </div>
        </div>        
<pdf :src="fileurl+question.uploaded_file" v-if="question.uploaded_file.toLowerCase().indexOf('.pdf') >= 0"></pdf>
<img :src="fileurl+question.uploaded_file" v-if="question.uploaded_file.toLowerCase().indexOf('.pdf') < 0" class="q_hero_image img-responsive"/>
</div>
</div>
</template>

<div class="choices_fields col-md-12" v-if="question.options.length > 0">
  <div v-if="showerror==true" style="color: red;"><span class="question_error">{{formerror[0].optionerror}}</span></div>
<div class="form-group">
<div class="col-md-6"><input type="radio" name="mcachoice" v-model="question.choiceoption" value="1" class="Schoice_input" @change="updateoptiontype(questionindex,1)"><span>Single Choice</span></div>
<div class="col-md-6"><input type="radio" name="mcachoice" v-model="question.choiceoption" value="2" class="Mchoice_input" @change="updateoptiontype(questionindex,2)"><span>Multiple Choice</span></div>
</div>
</div>
 <div class="choices_fields col-md-12 new_choice"> 
<div v-for="(optiondata,dataindex) in question.options">
<div class="input_hover">
<input :type="question.optionchoice" name="Choice1" value="true" v-model="optiondata.answervalue" class="choice_input" @change="rightAnswer(questionindex,question.optionchoice,dataindex)">
<textarea type="text" :placeholder="`Choice ${dataindex+1}`" v-model="optiondata.option_text" class="option_choice" @input="updatedata"></textarea>
<span @click="removeoption(questionindex,dataindex)"><i class="fa fa-times" aria-hidden="true"></i></span></div><br>
</div>

<ul class="choice_ul">
<li @click="addChoice(questionindex)"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Choice</li>
<li @click="instructionhidenshow(questionindex,question.instruction_flag)" ><span class="right_icon add_inst_main_right_icon"><img src="../assets/icons/align-left.svg" class="ins_icon add_inst_main" /></span>Add Instructions</li>
<li ><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Image <input type="file" :ref="`file${questionindex}`" :key="`file${questionindex}`" :id="`file${questionindex}`" @change="attachfiletopost('file'+questionindex,questionindex)" multiple/></li>
<li class="check_create_main"><input type="checkbox" v-model="question.imagevisibility" value="1"> <span class="check_create_label">Default Image Visible</span></li>
</ul>
</div>
</div>

</div>

<div class="question_fields col-md-12" v-if="kfpflag">
<ul class="choice_ul_kfp">
<li @click="addnewstudentquestion"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add new question set</li>
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
<div class="form-group">
<label class="tags_block"><span class="tag_icon"><img src="../assets/icons/tags-regular.svg" class="tag_width" /> </span> Domain</label>
<i class="fas fa-sort-down dropdown_arrow"></i>
 <v-chip v-for="(selected_domain,domainindex) in selected_domains" v-bind:key="`domain${domainindex}`" close @input="removeselectedtag(domainindex,2)" >{{selected_domain.tagname}}</v-chip>
<input type="text" class="domain_input col-md-12" v-model="m_domains" @keyup="activeflag=2" @click="activeflag=2" @blur="deactiveflag"/>
<ul class="drop_ul" v-if="activeflag==2">
<template v-for="(domain, di) in domains" >
<li :key="`aaaa${di}`" v-if="domain.tagname.toLowerCase().indexOf(m_domains) >=0" @click="selecteddomains(domain)">{{domain.tagname}}</li>
</template>
</ul>
</div>
<div class="form-group">
<label class="tags_block"><span class="tag_icon"><img src="../assets/icons/tags-regular.svg" class="tag_width" /> </span> ICPC2 Category</label>
<i class="fas fa-sort-down dropdown_arrow"></i>
 <v-chip v-for="(selected_icpc2,icpcindex) in selected_icpc2s" v-bind:key="`icpc${icpcindex}`" close @input="removeselectedtag(icpcindex,3)">{{selected_icpc2.tagname}}</v-chip>
<input type="text" class="domain_input col-md-12" v-model="m_icpcs" @keyup="activeflag=3" @click="activeflag=3" @blur="deactiveflag"/>
<ul class="drop_ul" v-if="activeflag==3">
<template v-for="(icpc2, ici) in icpc2s" >
<li :key="`aaaa${ici}`" v-if="icpc2.tagname.toLowerCase().indexOf(m_icpcs) >=0" @click="selectedicpc2s(icpc2)">{{icpc2.tagname}}</li>
</template>
</ul>
</div>
<div class="form-group">
<label class="tags_block"><span class="tag_icon"><img src="../assets/icons/tags-regular.svg" class="tag_width" /> </span> Age Range</label>
<i class="fas fa-sort-down dropdown_arrow"></i>
 <v-chip v-for="(selected_age,ageindex) in selected_ages" v-bind:key="`age${ageindex}`"  close @input="removeselectedtag(ageindex,4)">{{selected_age.tagname}}</v-chip>
<input type="text" class="domain_input col-md-12" v-model="m_ages" @keyup="activeflag=4" @click="activeflag=4" @blur="deactiveflag"/>
<ul class="drop_ul" v-if="activeflag==4">
<template v-for="(agerange, agei) in ageranges" >
<li :key="`aaaa${agei}`" v-if="agerange.tagname.toLowerCase().indexOf(m_ages) >=0" @click="selectedages(agerange)">{{agerange.tagname}}</li>
</template>
</ul>
</div>
<div class="form-group">
<label class="tags_block"><span class="tag_icon"><img src="../assets/icons/tags-regular.svg" class="tag_width" /> </span> Gender</label>
<i class="fas fa-sort-down dropdown_arrow"></i>
 <v-chip v-for="(selected_gender,genderindex) in selected_genders" v-bind:key="`gender${genderindex}`"  close @input="removeselectedtag(genderindex,5)">{{selected_gender.tagname}}</v-chip>
<input type="text" class="domain_input col-md-12" v-model="m_genders" @keyup="activeflag=5" @click="activeflag=5" @blur="deactiveflag"/>
<ul class="drop_ul" v-if="activeflag==5">
<template v-for="(gender, gi) in genders" >
<li :key="`aaaa${gi}`" v-if="gender.tagname.toLowerCase().indexOf(m_genders) >=0" @click="selectedgenders(gender)">{{gender.tagname}}</li>
</template>
</ul>
</div>
<div class="form-group">
<label class="tags_block"><span class="tag_icon"><img src="../assets/icons/tags-regular.svg" class="tag_width" /> </span> Aboriginal or Torres Strait ISlander</label>
<i class="fas fa-sort-down dropdown_arrow"></i>
 <v-chip v-for="(selected_itsi,itsiindex) in selected_itsis" v-bind:key="`itsi${itsiindex}`" close @input="removeselectedtag(itsiindex,6)" >{{selected_itsi.valuedata}}</v-chip>
<input type="text" class="domain_input col-md-12" v-model="m_atsis" @keyup="activeflag=6" @click="activeflag=6" @blur="deactiveflag"/>
<ul class="drop_ul" v-if="activeflag==6">
<template v-for="(atsi, ati) in atsis" >
<li :key="`aaaa${ati}`" v-if="atsi.valuedata.toLowerCase().indexOf(m_atsis) >=0" @click="selecteditsis(atsi)">{{atsi.valuedata}}</li>
</template>
</ul>
</div>

</div><!---choices_fields--->


<div class="col-md-12">
<div v-if="publishstatus==0" class="col-sm-6 schedule_main"> <span class="add_qschedule_p cursoron" ><span @click="addscheduler=true"> <img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon1"/> <span class="time_left" v-if="publishdate > Date.now()">{{publishdate | timeleft}}</span></span><span class="remove_scheduler" v-if="publishdate > Date.now()" @click="removeScheduler">x</span> </span>
<!--<span v-if="q_typename=='5d15fea98edfed6c417592d9'" class="add_qschedule_s cursoron" @click="addscheduler=true"> <img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon1"/> </span>-->
<!-- {{'publishdate--'+publishdate +'publishcheck--'+publishstatus}} -->

</div> 
<div v-if="oldq_version==question_version">
<template v-if="publishstatus==0 && publishdate <= Date.now()">
  <button class="save_fields btn" @click="publishquestion" >Publish</button>
  <button class="save_fields btn" @click="savequestion">Save</button>
  </template>
  <template v-else-if="publishstatus==0 && publishdate > Date.now()">
    <button class="save_fields btn" @click="publishquestion">Save</button>
  </template>
  <template v-else>
    <button class="save_fields btn" @click="savequestion">Save</button>
  </template>
</div>
<div v-else>
  <!-- {{'different version'}} -->
  <button class="save_fields btn" @click="publishquestion" >Publish</button>
  <template>
    <button class="save_fields btn" @click="savequestion">Save</button>
  </template>
</div>
</div><!----save_fields---->
</div>
</div>
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
$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop() ;
			$('.question_section').each(function(i) {
        var id='sec'+$(this).prop('id');
				if ($(this).position().top <= scrollDistance) {
						$('.left_article a.active').removeClass('active');
						$('#'+id).addClass('active');
				}
		});
}).scroll();

$(window).scroll(function() {
   if ($(this).scrollTop() > 150){
      $('.sticky_left_article').addClass("page_sticky");

   } else {
      $('.sticky_left_article').removeClass("page_sticky");

   }
});
import moment from 'moment'
import tinymce from 'vue-tinymce-editor'
var datetime = new Date();
import pdf from 'vue-pdf'
var username=localStorage.username;
import axios from 'axios';
export default {
  components: {tinymce,pdf},
  data() {
    return {
      questions:[],
      questioncount:1,
      updatecheck:0,
      stemcount:1,
      formerror:[{'optionerror':'','questexterr':''}],
      showerror:false,
      currentuser:null,
      imagevisibility:0,
      questiontypes:[],
      kfpflag:true,
      answer_key:null,
      colleges:[],
      addscheduler:false,
      domains:[],
      genders:[],
      icpc2s:[],
      ageranges:[],
      atsis:[{'key':'1','valuedata':'Yes'},{'key':'2','valuedata':'No'}],
      questiontype:null,
      errors: [],
      college:'5d2091b9f93d5341b4c682e0',
      q_typename:"",
      instruction_flag:false,
      optionchoice:"radio",
      hours:['01','02','03','04','05','06','07','08','09','10','11','12'],
      minutes:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
      ampm:['AM','PM'],
      scheduledate:null,
      scheduletime:null,
      publishdate:null,
      scheduletimehrs:null,
      scheduletimemins:null,
      scheduletimeapm:null,
      datepicker:null,
      question_text:null,
      hiddenm:null,
      answer_explanation:null,
      m_tags:'',
      m_domains:'',
      m_icpcs:'',
      mcqchoice:1,
      q_title:null,
      q_subject:null,
      m_ages:'',
      m_genders:'',
      m_atsis:'',
      instruction_text:null,
      stem_text:null,
      searched_tags:null,
      selected_tags:[],
      selected_domains:[],
      selected_icpc2s:[],
      selected_ages:[],
      selected_genders:[],
      selected_itsis:[],
      selected_tags_id:[],
      selected_domains_id:[],
      selected_icpc2s_id:[],
      selected_ages_id:[],
      selected_genders_id:[],
      selected_itsis_id:[],
      activeflag:0,
      uploaded_file:null,
      fileurl:window.publicfileurl,
      optioncounts:0,
      optiondatas:[],
      createdoptions:[],
      version:null,
      q_version:'1',
      newq_version:null,
      oldq_version:null,
      attachement:null,
      questionid:null,
      publishcheck:0,
      publishstatus:0,
      question_version:null,
      masterquestionuid:null,
      q_typenoty:null,
      spelloptions:{browser_spellcheck: true},
      imagevalidationpopup:false,
      questionindexid:0,
      stem_image_flag:false,
      q_image_flag:false,
      image_permission:"0",
      image_source:null,
    }
  },
  methods: {
    editorInitwithtext(data, questionindex)
    {
      const refdata = this.$refs[questionindex]
      refdata[0].editor.setContent(data);
    },
    updatedata()
    {
      console.log(this.$refs);
    },
    deactiveflag()
    {
      setTimeout(function () {
        this.activeflag=0;
      }.bind(this), 500)
    },
    set_scheduler()
    {
      this.scheduledatetime=this.scheduledate+' '+this.scheduletimehrs+':'+this.scheduletimemins+' '+this.scheduletimeapm
      this.addscheduler=false
      this.publishdate=moment(this.scheduledatetime).unix()*1000
    },
    updateddatentime()
    {
      this.scheduledate=this.datepicker;
    },
    removeScheduler() 
    {
      this.publishdate=Date.now()
      this.scheduledate=moment().format('YYYY-MM-DD')
      this.datepicker=moment().format('YYYY-MM-DD')
      this.scheduletimehrs=moment().format('hh')
      this.scheduletimemins=moment().format('mm')
      this.scheduletimeapm=moment().format('A')
      this.scheduledatetime=this.scheduledate+' '+this.scheduletimehrs+':'+this.scheduletimemins+' '+this.scheduletimeapm
    },
    searchtags()
    {
      axios.post(`/gettags`,{'searchedtag':this.m_tags})
      .then(response => {
        console.log(response)
        this.searched_tags = response.data
      });  
    },
    selectedtags(data)
    {
      this.selected_tags.push(data);
      this.selected_tags_id.push(data.unique_id);
      this.m_tags=null;
      this.activeflag=0;
    },
     removestemimage(qindex,optindex, index){
      this.updatecheck=Math.random();
      if (this.questions[qindex].multiple_uploadedstem_file.length == 1){
        this.questions[qindex].uploadedstem_file = null
      }
      this.questions[qindex].multiple_uploadedstem_file.splice(index, 1)

    },
    removequestionimage(aindex,imgindex, index)
    {

      if (this.questions[aindex].multiple_uploaded_file.length == 1){
        this.questions[aindex].uploaded_file = null
      }
      this.questions[aindex].multiple_uploaded_file.splice(index, 1)
      this.updatecheck=Math.random();
      this.updatecheck=1

    },
    instructionhidenshow(qindex,status)
    {
      if(status){
        this.questions[qindex].instruction_flag=false
      }else{
          this.questions[qindex].instruction_flag=true
        }
    },
    rightAnswer(qindex,optiontype,indexid)
    {
      var i;
      if(optiontype=='radio'){
        for(i=0;i < this.questions[qindex].options.length; i++){
          if(i!=indexid){
            this.questions[qindex].options[i].answervalue=false
          }
        }
        console.log(optiontype+' hhh '+indexid)
      }
    },
    selecteddomains(data)
    {
        this.selected_domains.push(data);
        this.selected_domains_id.push(data.unique_id);
        this.m_domains=null;
        this.activeflag=0;
    },
    selectedicpc2s(data)
    {
        this.selected_icpc2s.push(data);
        this.selected_icpc2s_id.push(data.unique_id);
        this.m_icpcs=null;
        this.activeflag=0;
    },
    selectedages(data)
    {
        this.selected_ages.push(data);
        this.selected_ages_id.push(data.unique_id);
        this.m_ages=null;
        this.activeflag=0;
    },
    selectedgenders(data)
    {
        this.selected_genders.push(data);
        this.selected_genders_id.push(data.unique_id);
        this.m_genders=null;
        this.activeflag=0;
    },
    selecteditsis(data)
    {
        this.selected_itsis.push(data);
        this.selected_itsis_id.push(data.key);
        this.m_atsis=null;
        this.activeflag=0;
    },
    changeactiveflag(id)
    {
        this.activeflag=id;
    },
    removeselectedtag(indexid,type)
    {
        if(type==1){
          this.selected_tags.splice(indexid, 1)
          this.selected_tags_id.splice(indexid, 1)
        }else if(type==2){
          this.selected_domains.splice(indexid, 1) 
          this.selected_domains_id.splice(indexid, 1)   
        }else if(type==3){
          this.selected_icpc2s.splice(indexid, 1)
          this.selected_icpc2s_id.splice(indexid, 1)   
        } else if(type==4){
          this.selected_ages.splice(indexid, 1)  
          this.selected_ages_id.splice(indexid, 1)  
        }else if(type==5){
          this.selected_genders.splice(indexid, 1)
          this.selected_genders_id.splice(indexid, 1)    
        }else if(type==6){
          this.selected_itsis.splice(indexid, 1)  
          this.selected_itsis_id.splice(indexid, 1) 
        }
    },
    updateoptioncount()
    {
        var i=0;  
        this.questions[0].options=[]
        if(this.q_typename=='5d15fea98edfed6c417592d10'){
          this.kfpflag=false
          this.questioncount=1
          this.stemcount=1
          for(i = 1; i <= 5; i++){
            var tempopt={'answervalue':false,'option_text':''}
            this.questions[0].options.push(tempopt);
          }
          this.version=' SBA-'+moment().format('YYYY-MM-DD')+'-1';
        }
        else if(this.q_typename=='5d15fea98edfed6c417592d11'){
          this.kfpflag=false
          this.questioncount=1
          this.stemcount=1
          for(i = 1; i <= 15; i++){
            var tempopt={'answervalue':false,'option_text':''}
            this.questions[0].options.push(tempopt);
          }
          this.version=' MEMQ-'+moment().format('YYYY-MM-DD')+'-1';
        }else if(this.q_typename=='5d15fea98edfed6c417592d12'){
          this.kfpflag=false
          this.questioncount=1
          this.stemcount=1
          for(i = 1; i <= 5; i++){
            var tempopt={'answervalue':false,'option_text':''}
            this.questions[0].options.push(tempopt);
          }   
          this.version=' MCQ-'+moment().format('YYYY-MM-DD')+'-1';
        }else if(this.q_typename=='5d15fea98edfed6c417592d9'){
          this.version=' KFP-'+moment().format('YYYY-MM-DD')+'-1'; 
          this.kfpflag=true
          this.questioncount=1
          this.stemcount=1
        }else if(this.q_typename=='5d15fea98edfed6c417592d15'){
          this.version=' Image of the week-'+moment().format('YYYY-MM-DD')+'-1'; 
          this.kfpflag=true
          this.questioncount=1
          this.stemcount=1
        }else if(this.q_typename=='5d15fea98edfed6c417592d16'){
          this.version=' Student Question-'+moment().format('YYYY-MM-DD')+'-1'; 
          this.caseofweekflag=true
          this.kfpflag=false
          this.questioncount=1
          this.stemcount=1
        }
    },
    updateoptiontype(qindex,qchoice)
    {
        if(qchoice==2){
          this.questions[qindex].optionchoice="checkbox";
        }else{
            this.questions[qindex].optionchoice="radio";
        }
    },
    addChoice(qindex)
    {
        var optionorder=this.questions[qindex].options.length+1; 
        var tempopt={'answervalue':false,'option_text':'','option_order':optionorder}
        this.questions[qindex].options.push(tempopt);
    },
    async attachfilestemfile(qref,qindex)
    {
        const files = this.$refs[qref][0].files;
        var qi = 0;
        for(qi=0;qi<files.length;qi++){
          const file=files[qi];
          const formData = new FormData();
          formData.append("file", file);
          try{
            const res = await axios.post("/upload", formData);
            // alert(this.questions[qindex].multiple_uploadedstem_file)
            this.questions[qindex].multiple_uploadedstem_file.push(res.data.file)
            this.questions[qindex].uploadedstem_file = res.data.file
            this.questions[qindex].stemimagevalidation.image_permission = this.image_permission
            this.imagevalidationpopup=true
            this.questionindexid=qindex
            this.stem_image_flag=true
            this.updatecheck=Math.random();
          } catch(err){
            console.log(err);
            
          }
        }
    },
    async attachfiletopost(qref,qindex)
    {
        const files = this.$refs[qref][0].files;

        var qi = 0;
          for(qi=0;qi<files.length;qi++){
            const file=files[qi];
            const formData = new FormData();
            formData.append("file", file);
            try{
              const res = await axios.post("/upload", formData);
              console.log(res.data);
              this.questions[qindex].uploaded_file = res.data.file
              this.questions[qindex].multiple_uploaded_file.push(res.data.file)
              this.questions[qindex].questionimagevalidation.image_permission = this.image_permission
              this.imagevalidationpopup=true
              this.questionindexid=qindex
              this.q_image_flag=true
              this.updatecheck=Math.random();
          } catch(err){
            console.log(err);
          }
        }
    },
    updateimagesourceandpermission(){
        if(this.q_image_flag){
       this.questions[this.questionindexid].questionimagevalidation.image_permission = this.image_permission
       this.questions[this.questionindexid].questionimagevalidation.image_source = this.image_source 
       this.q_image_flag=false
       this.imagevalidationpopup=false
       this.image_source=null
              if(this.image_permission=='1'){
this.questions[this.questionindexid].uploaded_file=null
       }
       this.image_permission=0

        }
        if(this.stem_image_flag){
       this.questions[this.questionindexid].stemimagevalidation.image_permission = this.image_permission
       this.questions[this.questionindexid].stemimagevalidation.image_source = this.image_source
       this.stem_image_flag=false
          this.imagevalidationpopup=false
           this.image_source=null
                   if(this.image_permission=='1'){
this.questions[this.questionindexid].uploadedstem_file=null
       }
       this.image_permission=0
  
        }
this.updatecheck=Math.random();
      },
      resetquestionimage(){
     
        if(this.q_image_flag){
       this.questions[this.questionindexid].questionimagevalidation.image_permission = this.image_permission
       this.questions[this.questionindexid].questionimagevalidation.image_source = this.image_source 

       this.q_image_flag=false
       this.imagevalidationpopup=false
this.questions[this.questionindexid].uploaded_file=null
        this.image_permission=0
        this.image_source=null
        }
        if(this.stem_image_flag){
       this.questions[this.questionindexid].stemimagevalidation.image_permission = this.image_permission
       this.questions[this.questionindexid].stemimagevalidation.image_source = this.image_source
  
       this.stem_image_flag=false
          this.imagevalidationpopup=false
this.questions[this.questionindexid].uploadedstem_file=null
        this.image_permission=0
        this.image_source=null
        } 
        this.updatecheck=Math.random();
      },
    removeoption(qindex,id)
    {
        this.questions[qindex].options.splice(id, 1)
        this.optioncounts--;
    },
    publishquestion()
    {
        this.showerror=false;
        this.formerror = [{'optionerror':'','questexterr':''}];
        var tags=this.selected_tags_id.join(",");
        var domain=this.selected_domains_id.join(",");
        var category=this.selected_icpc2s_id.join(",");
        var age_range=this.selected_ages_id.join(",");
        var gender=this.selected_genders_id.join(",");
        var atsi=this.selected_itsis_id.join(",");
        if(this.scheduledatetime!==null){
          this.scheduledatetime= moment(this.scheduledatetime).unix()*1000
        }else{
           this.scheduledatetime=Date.now();
        }
        var quesindex=this.questions.length-1
        if(this.questions[quesindex].question_text==''){
          this.questions.splice(quesindex, 1)
        }
        axios.post(`/updatepublishquestion`,{"q_order":this.questions[0].q_order,"oldq_version":this.oldq_version,"question_version":this.question_version,"id":this.masterquestionuid,"q_subject":this.q_subject,"q_title":this.q_title,"answer_key":this.questions[0].answer_key,"imagevisibility":this.questions[0].imagevisibility,"q_version":this.q_version,"uploadedstem_file":this.questions[0].uploadedstem_file,"uploaded_file":this.questions[0].uploaded_file,"questionimagevalidation":this.questions[0].questionimagevalidation,"stemimagevalidation":this.questions[0].stemimagevalidation,"stem_text":this.questions[0].stem[0].stem_text,"instruction_text":this.questions[0].instruction_text,"version":this.version,"questiontype":this.q_typename,"college":this.college,"question_text":this.questions[0].question_text,"option_type":this.questions[0].choiceoption,"answer_explanation":this.questions[0].answer_explanation,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser, "multiple_uploadedstem_file":this.questions[0].multiple_uploadedstem_file,"multiple_uploaded_file":this.questions[0].multiple_uploaded_file,})
        .then(response => 
        {
          if(response.data.error)
          {
            this.showerror=true;
            this.formerror[0].questexterr=response.data.error;
            console.log(response.data.error);
            return false;
          }
          this.questionid=response.data._id;
          axios.post(`/updatesavequestionoption`,{"oldq_version":this.oldq_version,"question_version":this.question_version,"questionid":response.data._id,"createdby":this.currentuser,"optiondatas":this.questions[0].options})
          .then(optresponse => {
            if(this.q_typename=='5d15fea98edfed6c417592d16')
            {
              axios.post(`/updatesavestudentquestion`,{"oldq_version":this.oldq_version,"question_version":this.question_version,"q_subject":this.q_subject,"q_title":this.q_title,"q_version":this.q_version,"questiontype":this.q_typename,"college":this.college,"data":this.questions,"version":this.version,'parentqid':this.questionid,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser})
              .then(kfpresponse => {
                if(this.publishcheck===0 || this.oldq_version!==this.question_version){
                  // location.href='/casebasequestionreport';
                  axios.post('/addpostbyweb',{"questionid":this.questionid,attachement:null,"questiontype":this.q_typename,tags:tags,postcontent:null,createdby:this.currentuser,scheduledatetime:this.scheduledatetime})
                  .then((postresponse)=>{
                    axios.post('/setquestionpublishnotification',{"weburl":'studentquestionanswer',"appurl":'',"targetid":this.questionid,"q_type":this.q_typenoty,"title":this.q_title,"questionid":this.questionid,postid:postresponse.data.unique_id,createdby:this.currentuser})
                    .then((notiresponse)=>{
                      console.log(notiresponse);
                      // location.reload();
                      location.href='/studentquestionreport';
                    }).catch((error)=>{
                          console.log(error);
                      }) 
                  }).catch((error)=>{
                      console.log(error);
                    })
                }else{
                    location.reload(); 
                }
              }).catch((error)=>{
                  console.log(error);
                })
            }
            else{
              location.reload();
            }
            console.log(optresponse.data);
          }).catch(e => {
              console.log(e);
              this.errors.push(e)
            })
        }).catch(e => {
            console.log(errors);
            this.errors.push(e)
          })
        console.log('questionid'+this.questionid);
        //location.reload();
    },
    savequestion()
    {
        this.showerror=false;
        this.formerror = [{'optionerror':'','questexterr':''}];
        var tags=this.selected_tags_id.join(",");
        var domain=this.selected_domains_id.join(",");
        var category=this.selected_icpc2s_id.join(",");
        var age_range=this.selected_ages_id.join(",");
        var gender=this.selected_genders_id.join(",");
        var atsi=this.selected_itsis_id.join(",");
        if(this.scheduledatetime!==null){
          this.scheduledatetime= moment(this.scheduledatetime).unix()*1000
        }else{
           this.scheduledatetime=Date.now();
        }
        var quesindex=this.questions.length-1
        if(this.questions[quesindex].question_text==''){
          this.questions.splice(quesindex, 1)
        }
        axios.post(`/updatesavequestion`,{"q_order":this.questions[0].q_order,"oldq_version":this.oldq_version,"question_version":this.question_version,"id":this.masterquestionuid,"q_subject":this.q_subject,"q_title":this.q_title,"answer_key":this.questions[0].answer_key,"imagevisibility":this.questions[0].imagevisibility,"q_version":this.q_version,"uploadedstem_file":this.questions[0].uploadedstem_file,"uploaded_file":this.questions[0].uploaded_file,"questionimagevalidation":this.questions[0].questionimagevalidation,"stemimagevalidation":this.questions[0].stemimagevalidation,"stem_text":this.questions[0].stem[0].stem_text,"instruction_text":this.questions[0].instruction_text,"version":this.version,"questiontype":this.q_typename,"college":this.college,"question_text":this.questions[0].question_text,"option_type":this.questions[0].choiceoption,"answer_explanation":this.questions[0].answer_explanation,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser})
        .then(response => {
          if(response.data.error)
          {
            this.showerror=true;
            this.formerror[0].questexterr=response.data.error;
            console.log(response.data.error);
            return false;
          }
          this.questionid=response.data._id;
          axios.post(`/updatesavequestionoption`,{"oldq_version":this.oldq_version,"question_version":this.question_version,"questionid":response.data._id,"createdby":this.currentuser,"optiondatas":this.questions[0].options})
          .then(optresponse => {
            if(this.q_typename=='5d15fea98edfed6c417592d16'){
              axios.post(`/updatesavestudentquestion`,{"oldq_version":this.oldq_version,"question_version":this.question_version,"q_subject":this.q_subject,"q_title":this.q_title,"q_version":this.q_version,"questiontype":this.q_typename,"college":this.college,"data":this.questions,"version":this.version,'parentqid':this.questionid,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser})
                .then(kfpresponse => {
                  if(this.scheduledatetime>Date.now() && this.oldq_version!==this.question_version){
                    axios.post('/addpostbyweb',{"questionid":this.questionid,attachement:null,tags:tags,postcontent:null,createdby:this.currentuser,scheduledatetime:this.scheduledatetime})
                    .then((postresponse)=>{
                      location.href='/studentquestionreport';
                    }).catch((error)=>{
                        console.log(error);
                      })
                  }else{
                     // location.reload(); 
                     location.href='/studentquestionreport'
                    }
                  }).catch((error)=>{
                        console.log(error);
                    })
            }else{
                location.reload();
              }
          }).catch(e => {
              console.log(e);
              this.errors.push(e)
            })
        }).catch(e => {
            console.log(e);
            this.errors.push(e)
          })
          //location.reload();
    },
    addStemp(qindex)
    {
      this.questions[qindex].stem.push({'stem_text':''})
    },
    addnewquestion()
    {
      var qorder=this.questions.length+1;
      this.questions.push({'stem':[],'options':[],'question_text':'','optionchoice':'radio','choiceoption':'1','defaultimg':'0','instruction_flag':false,'instruction_text':'','answer_key':'','answer_explanation':'','uploaded_file':null,'uploadedstem_file':null,'stemimagevalidation':{'image_permission':null,'image_source':null},'questionimagevalidation':{'image_permission':null,'image_source':null},'imagevisibility':false,'q_order':qorder})
    },
    addnewstudentquestion()
    {
      location.href="/addnewcasequestion?id="+this.masterquestionuid+"&flag=new&subid="+this.questions.length;
    },
    setFocus(reference)
    {
        console.log(this.$refs);
        this.$refs[reference][0].focus();
    },
  },
  created() {
    axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentdate = moment().unix()*1000
      console.log('currdate-',this.currentdate)
      this.currentuser = response.data.unique_id
    })
    .catch(e => {
      this.errors.push(e)
    }),
     axios.get(`/getallquestiontypes`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.questiontypes = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
     axios.get(`/getallcolleges`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.colleges = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
     axios.get(`/getalldomain`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.domains = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`/getallicpc2`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.icpc2s = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`/getallgender`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.genders = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`/getallagerange`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.ageranges = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`/getallagerange`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.ageranges = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }), 
    axios.post(`/getpostquestionstatus`,{"quesid":this.$route.query.id})
    .then(responsestatus => {
      // JSON responses are automatically parsed.
      this.publishstatus = responsestatus.data
      console.log('publishstatus-',this.publishstatus )
    })
    .catch(e => {
      this.errors.push(e)
    }), 


    axios.post(`/getstudentquestionbyid`,{"questionid":this.$route.query.id})
    .then(response => {
      console.log('#####-',response);
      var i=0;

      console.log(response.data.length);
        this.masterquestionuid=this.$route.query.id
      for(i=0; i < response.data.length; i++)
      {
        this.questions[i]= {'stem':[{'stem_text':''}],'options':[],'question_text':'','optionchoice':'radio','choiceoption':'1','imagevisibility':false,'instruction_flag':false,'instruction_text':'','answer_key':'','answer_explanation':'','uploaded_file':null};
        console.log(i+'counter')
      // JSON responses are automatically parsed.
      this.questions[i].question_text = response.data[i].question_text
       if(response.data[i].instruction_text){
        this.questions[i].instruction_flag=true
      }
      this.questions[i].id = response.data[i]._id
      this.questions[i].instruction_text = response.data[i].instruction_text
      this.questions[i].answer_explanation = response.data[i].answer_explanation
      this.questions[i].answer_key= response.data[i].answer_key
      this.questions[i].stem[0].stem_text = response.data[i].stem_text
      this.questions[i].uploaded_file = response.data[i].hero_img
      this.questions[i].uploadedstem_file = response.data[i].uploadedstem_file
       this.questions[i].questionimagevalidation = response.data[i].questionimagevalidation
        this.questions[i].stemimagevalidation = response.data[i].stemimagevalidation
      this.questions[i].q_order = response.data[i].q_order
      this.q_typename=response.data[i].questiontype
      this.publishdate=response.data[i].publish_date
      this.scheduledatetime=response.data[i].publish_date
       this.scheduledate=moment.unix(this.publishdate/1000).format('YYYY-MM-DD')
       this.datepicker=moment.unix(this.publishdate/1000).format('YYYY-MM-DD')
        this.scheduletimehrs=moment.unix(this.publishdate/1000).format('hh')
        this.scheduletimemins=moment.unix(this.publishdate/1000).format('mm')
        this.scheduletimeapm=moment.unix(this.publishdate/1000).format('A')

         // my new line to add multiple image
         if (response.data[i].multiple_uploadedstem_file && response.data[i].multiple_uploaded_file){
          this.questions[i].multiple_uploadedstem_file = response.data[i].multiple_uploadedstem_file
          this.questions[i].multiple_uploaded_file = response.data[i].multiple_uploaded_file
         }else{
          this.questions[i].multiple_uploadedstem_file = []
          this.questions[i].multiple_uploaded_file = []
         }
    
       if(this.q_typename=='5d15fea98edfed6c417592d9'){
          this.q_typenoty='KFP';
      }else if(this.q_typename=='5d15fea98edfed6c417592d10'){
         this.q_typenoty='SBA';
      }else if(this.q_typename=='5d15fea98edfed6c417592d11'){
        this.q_typenoty='MEMQ';
      }else if(this.q_typename=='5d15fea98edfed6c417592d12'){
        this.q_typenoty='MCQ';
      }else if(this.q_typename=='5d15fea98edfed6c417592d13'){
         this.q_typenoty='SBA/MCQ';
      }else if(this.q_typename=='5d15fea98edfed6c417592d14'){
        this.q_typenoty='CASE';
      }else if(this.q_typename=='5d15fea98edfed6c417592d15'){
        this.q_typenoty='Image of the week';
      }else if(this.q_typename=='5d15fea98edfed6c417592d16'){
        this.q_typenoty='Student Question';
      }
      this.college=response.data[i].college
      this.q_subject=response.data[i].q_subject
      this.q_title=response.data[i].q_title
      this.publishcheck=response.data[i].publish
      console.log('publish-',this.publishcheck)
      this.q_version=response.data[i].q_version
      this.oldq_version=response.data[i].q_version
      this.newq_version=response.data[i].q_version
      this.newq_version++
      this.question_version=response.data[i].q_version
      this.version=response.data[i].version
      this.questions[i].choiceoption=response.data[i].option_type
      if(this.questions[i].choiceoption==2){
      this.questions[i].optionchoice="checkbox";
      }else{
this.questions[i].optionchoice="radio";
}
      var j=0;
      console.log('length'+response.data[i].studentquestion_options.length)
      console.log(response.data[i].studentquestion_options)
      if(response.data[i].studentquestion_options.length > 0){
          this.optioncounts=response.data[i].studentquestion_options.length
      for(j=0; j < response.data[i].studentquestion_options.length; j++){
      var tempopt={'id':response.data[i].studentquestion_options[j]._id,'answervalue':response.data[i].studentquestion_options[j].answervalue,'option_text':response.data[i].studentquestion_options[j].option_text,'option_order':response.data[i].studentquestion_options[j].option_order};
            this.questions[i].options.push(tempopt);
      }
    }
      }
if(this.$route.query.flag=='new'){
          var qorder=this.questions.length+1;
          var focustarget='question_text'+this.questions.length;
          console.log(focustarget);
          console.log(this.$refs);
this.questions.push({'stem':[],'options':[],'question_text':'','optionchoice':'radio','choiceoption':'1','defaultimg':'0','instruction_flag':false,'instruction_text':'','answer_key':'','answer_explanation':'','uploaded_file':null,"uploadedstem_file": null,'imagevisibility':false,'q_order':qorder})
  this.$refs[focustarget].focus();    
}

if(response.data[0].tagdata.length >=0){
   var j=0;
 for(j=0;j<response.data[0].tagdata.length;j++){
      this.selected_tags.push(response.data[0].tagdata[j]);
      this.selected_tags_id.push(response.data[0].tagdata[j].unique_id);
      }
}  
if(response.data[0].domaindata.length >=0){
   var j=0;
      for(j=0;j<response.data[0].domaindata.length;j++){
      this.selected_domains.push(response.data[0].domaindata[j]);
      this.selected_domains_id.push(response.data[0].domaindata[j].unique_id);
 } }
if(response.data[0].categorydata.length >=0){
   var j=0;
      for(j=0;j<response.data[0].categorydata.length;j++){
      this.selected_icpc2s.push(response.data[0].categorydata[j]);
      this.selected_icpc2s_id.push(response.data[0].categorydata[j].unique_id);
      }
}
if(response.data[0].age_rangedata.length >= 0){
   var j=0;
      for(j=0;j<response.data[0].age_rangedata.length;j++){
      this.selected_ages.push(response.data[0].age_rangedata[j]);
      this.selected_ages_id.push(response.data[0].age_rangedata[j].unique_id);
      } 
}
if(response.data[0].genderdata.length >= 0){
   var j=0;
      for(j=0;j<response.data[0].genderdata.length;j++){
      this.selected_genders.push(response.data[0].genderdata[j]);
      this.selected_genders_id.push(response.data[0].genderdata[j].unique_id);
      } 
}
if(response.data[0].atsi){
  const key = this.atsis.find( fruit => fruit.key === response.data[0].atsi );
  console.log(key);
      this.selected_itsis.push(key);
      this.selected_itsis_id.push(response.data[0].atsi);

}
      
    })
    .catch(e => {
      this.errors.push(e)
    })
    
},
updated() {
      console.log('mount');
      console.log(this.$refs);
      this.setFocus('focus'+this.$route.query.subid);
     // this.$refs['5d8c6ced02e7b62d402e041a'].focus();
    },
}
</script>
