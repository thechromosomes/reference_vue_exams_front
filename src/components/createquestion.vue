<template>
  <v-container>
    <div class="createquestion">
      <div class="col-md-7 col-md-offset-3">
        <p class="left_heading col-md-12"><img src="../assets/icons/question-square-solid_green.svg" class="ques_icon" />Add a question : {{version}}</p>
        <div class="col-sm-12">
          <!-- <div v-if="questionmodule[2].rolevalue.indexOf(currentuser.role) >= 0" class="question_fields col-md-12"> -->
          <template v-if="disableflag">
          <select class="col-md-5 qus_one animated infinite bounce delay-2s" v-model="q_typename" @change="updateoptioncount()">
            <option value="">Question Type</option>
            <option v-for="questiontype in questiontypes" :value="questiontype.unique_id">{{questiontype.qtypename}}</option>
          </select>
         </template>
         <template v-else>
          <select class="col-md-5 qus_one animated infinite bounce delay-2s" v-model="q_typename" @change="updateoptioncount()" disabled>
            <option value="">Question Type</option>
            <option v-for="questiontype in questiontypes" :value="questiontype.unique_id">{{questiontype.qtypename}}</option>
          </select>
         </template>
          <template v-if="q_typename!=='5d15fea98edfed6c417592d16'">
          <select class="col-md-6 col-md-offset-1 qus_two" v-model="college" >
            <option v-for="college in colleges" :value="college.unique_id">{{college.collegename}}</option>
          </select>
         </template>
        <!-- </div>-question_fields- -->
        </div><!---question_fields--->
        <!--<div class="checkboxes_createfields col-md-12">
        <div class="col-md-6" v-for="college in colleges">
        <input type="checkbox" v-model="college" :value="college.unique_id" /> <span class="check_create_label">{{college.collegename}}</span>
        </div>
        </div>-->
        <div class="checkboxes_createfields col-md-12">
          <label>Question Title</label>
          <input type="text" v-model="q_title" class="q_title" />
        </div>

        <div class="checkboxes_createfields col-md-12" v-if="q_typename!=='5d15fea98edfed6c417592d16'">
          <label>Subject</label>
          <input type="text" v-model="q_subject" class="q_title" />
        </div>
        <!--question loop-->
        <!---checkboxes_createfields--->
        <div v-for="(question,questionindex) in questions">
        <!-- <div class="parent_remove_question">
      <span title="Remove Question" @click="removeQuestion(questionindex)" class="trashitem_icon remove_question cursoron"><img src="../assets/icons/trash-alt.svg"></span>
      </div> -->
          <div v-for="(stemdata,stemindex) in question.stem">
            <div class="question_fields col-md-12">
              <label v-if="kfpflag==true || caseofweekflag==true">Stem {{questionindex+1}}</label>
              <label v-if="kfpflag==false && caseofweekflag==false">Stem </label>
              <tinymce v-bind:id="`stem_text${questionindex}${stemindex}`" v-model="stemdata.stem_text" v-bind:key="`stem_text${questionindex}${stemindex}`" :other_options="spelloptions"></tinymce>
            </div>
          </div>
          <!-- <div class="question_fields col-md-12" v-if="question.uploadedstem_file!=null && question.uploadedstem_file!=''" >
            <div class="overlay_hover_image">
              <div class="overlay-image">
                <div class="trashes_icon">
                  <span class="trash_icon" @click="removestemimage(questionindex,stemIndex)"><img src="../assets/icons/trash-img.svg"></span>
                </div>
              </div>
              <pdf :src="fileurl+question.uploadedstem_file" v-if="question.uploadedstem_file.toLowerCase().indexOf('.pdf') >= 0"></pdf>
              <img :src="fileurl+question.uploadedstem_file" v-if = "question.uploadedstem_file.toLowerCase().indexOf('.pdf') < 0" class="q_hero_image img-responsive"/>
            </div>
          </div>  -->

          <!-- to show multiple image media -->
          <div v-if="uploadedstem_file.length > 0" class="question_fields col-md-12">
            <div v-for="(element,index) in uploadedstem_file" :key="index" class="overlay_hover_image">
              <div class="overlay-image">
                <div class="trashes_icon">
                  <span class="trash_icon"  @click="removestemimage(questionindex,stemIndex, index)"><img src="../assets/icons/trash-img.svg"></span>
                </div>
              </div>

              <div>
                <div v-if="element.includes('.pdf') == false">
                    <img :src="fileurl+element" class="q_hero_image img-responsive"/>
                </div>
                <div  v-else >
                    <pdf :src="fileurl+element"></pdf>
                </div>
              </div>
            </div>
          </div>

          <div class="question_fields col-md-12">
            <ul class="choice_ul_stem stem_ulist">
              <li  v-if="kfpflag==true || caseofweekflag==true" @click="addStemp(questionindex)"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Aditional STEM</li>

              <!-- <li class="add_image_button">
                <span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>
                <span class="file_text">Add Image </span>
                <input type="file" class="file_input" :ref="`stemfile${questionindex}`" :key="`stemfile${questionindex}`" :id="`stemfile${questionindex}`" @change="attachfilestemfile('stemfile'+questionindex,questionindex)"/>
              </li> -->

              <!-- to upload multiple image at the same time -->
              <li class="add_image_button">
                <span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>
                <span class="file_text">Add Image </span>
                <input type="file" class="file_input" :ref="`sec_file${questionindex}`" :key="`sec_file${questionindex}`" :id="`sec_file${questionindex}`" @change="attacharticlesecfile('sec_file'+questionindex,questionindex)" multiple/>
              </li>

              <li class="remove_image_section" @click="removeQuestion(questionindex)" v-if="q_typename!=='5d15fea98edfed6c417592d16'"> <div class="spa_circle"> <span class="minus_image"> - </span> </div> Remove question </li>
            </ul>
          </div>
          <div class="question_fields col-md-12">
            <div v-if="showerror==true" style="color: red;"><span class="question_error">{{formerror[0].questexterr}}</span></div>
            <label v-if="kfpflag==true || caseofweekflag==true">Question Text {{questionindex+1}}</label>
            <label v-if="kfpflag==false && caseofweekflag==false">Question Text </label>
            <tinymce v-bind:id="`question_text${questionindex}`" v-model="question.question_text" v-bind:key="`question_text${questionindex}`" :other_options="spelloptions"></tinymce>
          </div>
          <div class="question_fields col-md-12" v-if="question.instruction_flag">
            <label v-if="kfpflag==true || caseofweekflag==true">Instructions {{questionindex+1}}</label>
            <label v-if="kfpflag==false && caseofweekflag==false">Instructions </label>
            <tinymce v-bind:id="`instruction_text${questionindex}`" v-model="question.instruction_text" v-bind:key="`instruction_text${questionindex}`" :other_options="spelloptions"></tinymce>
          </div>
          <div class="question_fields col-md-12" v-if="question.multiple_uploaded_file.length  > 0">
            <div v-for="(element,index) in question.multiple_uploaded_file" :key="index" class="overlay_hover_image">

            <div class="overlay_hover_image">
              <div class="overlay-image">
                <div class="trashes_icon">
                  <span class="trash_icon" @click="removequestionimage(questionindex, fileIndex, index)"><img src="../assets/icons/trash-img.svg"></span>
                </div>
              </div>
              <div v-if="element.includes('.pdf') == false">
                <img :src="fileurl+element" class="q_hero_image img-responsive"/>
              </div>
              <div  v-else >
                <pdf :src="fileurl+element"></pdf>
              </div>
            </div>
            </div>
          </div>
          <div class="choices_fields col-md-12" v-if="question.options.length > 0">
            <div v-if="showerror==true" style="color: red;"><span class="question_error">{{formerror[0].optionerror}}</span></div>
            <div class="form-group">
              <div class="col-md-6"><input type="radio" name="mcachoice" v-model="question.choiceoption" value="1" class="Schoice_input" @change="updateoptiontype(questionindex,1)"><span>Single Choice</span></div>
                <div class="col-md-6"><input type="radio" name="mcachoice" v-model="question.choiceoption" value="2" class="Mchoice_input" @change="updateoptiontype(questionindex,2)"><span>Multiple Choice</span></div>
              </div>
          </div>
          <div class="choices_fields col-md-12">
            <div v-for="(optiondata,dataindex) in question.options">
              <div class="input_hover">
              <input :type="question.optionchoice" name="Choice1" value="true" v-model="optiondata.answervalue" class="choice_input" @change="rightAnswer(questionindex,question.optionchoice,dataindex)">
              <textarea type="text" :placeholder="`Choice ${dataindex+1}`" v-model="optiondata.option_text" class="option_choice" ></textarea>
              <span @click="removeoption(questionindex,dataindex)"><i class="fa fa-times" aria-hidden="true"></i></span></div><br>
            </div>
            <ul class="choice_ul">
              <li @click="addChoice(questionindex)"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Choice</li>
              <li @click="instructionhidenshow(questionindex,question.instruction_flag)" ><span class="right_icon add_inst_main_right_icon"><img src="../assets/icons/align-left.svg" class="ins_icon add_inst_main" /></span>Add Instructions</li>

              <li >
                <span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Image
                <input type="file" :ref="`file${questionindex}`" :key="`file${questionindex}`" :id="`file${questionindex}`" @change="attachfiletopost('file'+questionindex,questionindex)" multiple/>
                </li>

              <li class="check_create_main"><input type="checkbox" v-model="question.imagevisibility" value="1"> <span class="check_create_label">Default Image Visible</span></li>
            </ul>
          </div>
          <div class="question_fields col-md-12" v-if="kfpflag==true && caseofweekflag==false">
            <label v-if="kfpflag">Answer key {{questionindex+1}}</label>
            <label v-if="!kfpflag">Answer key </label>
            <tinymce v-bind:id="`answer_key${questionindex}`" v-bind:key="`answer_key${questionindex}`" v-model="question.answer_key" :other_options="spelloptions"></tinymce>
          </div>
          <div class="question_fields qus_btm col-md-12" v-if="caseofweekflag==false && q_typename!=='5d15fea98edfed6c417592d16'">
            <label v-if="kfpflag" >Answer explanation {{questionindex+1}}</label>
            <label v-if="!kfpflag" >Answer explanation </label>
            <tinymce v-bind:id="`answer_explanation${questionindex}`" v-bind:key="`answer_explanation${questionindex}`" v-model="question.answer_explanation" :other_options="spelloptions"></tinymce>
            <v-divider class="questiondivider"></v-divider>
          </div>
        </div>
        <div class="question_fields col-md-12" v-if="kfpflag">
          <ul class="choice_ul_kfp">
            <li @click="addnewquestion"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon"/></span>Add new question set</li>
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
          <div class="form-group" v-if="q_typename!=='5d15fea98edfed6c417592d16'">
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
          <div class="form-group" v-if="q_typename!=='5d15fea98edfed6c417592d16'">
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
          <div class="form-group" v-if="q_typename!=='5d15fea98edfed6c417592d16'">
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
          <div class="form-group" v-if="q_typename!=='5d15fea98edfed6c417592d16'">
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
          <div class="form-group" v-if="q_typename!=='5d15fea98edfed6c417592d16'">
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
          <div class="col-md-7 schedule_main"> <span class="add_qschedule_p cursoron" ><span @click="addscheduler=true"> <img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon1"/> <span class="time_left" v-if="publishdate > Date.now()">{{publishdate | timeleft}}</span></span><span class="remove_scheduler" v-if="publishdate > Date.now()" @click="removeScheduler">x</span> </span>
          <!--<span v-if="q_typename=='5d15fea98edfed6c417592d9'" class="add_qschedule_s cursoron" @click="addscheduler=true"> <img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon1"/> </span>-->
          </div>
          <template v-if="publishdate <= Date.now()">
          <button class="save_fields btn" @click="publishquestion">Publish</button>
          </template>
          <button class="save_fields btn" @click="savequestion">Save</button>
        </div><!----save_fields---->
      </div>
    </div>
    <!-- **************************************************************************************************** -->
    <v-dialog v-model="addscheduler" width="600" >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
          Select date and time <span class="crosspopup cp_scheduler" @click="addscheduler=false">x</span>
        </v-card-title>
        <v-card-text>
          <div class="schedulercontainer">
            <v-date-picker v-model="datepicker" @change="updateddatentime" ></v-date-picker>
            <div class="scheduler_com">
              <v-text-field v-model="scheduledate"  value="scheduledate"></v-text-field>
            </div>
            <div class="scheduler_com2">
              <v-select :items="hours" v-model="scheduletimehrs"></v-select>
              <v-select :items="minutes" v-model="scheduletimemins" ></v-select>
              <v-select :items="ampm"  v-model="scheduletimeapm" ></v-select>
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

    <!-- **************************************************************************************************** -->
   </v-container>
</template>
<script>
import moment from 'moment'
import tinymce from 'vue-tinymce-editor'
import pdf from 'vue-pdf'
import axios from 'axios';
var datetime = new Date();
var username=localStorage.username;

  export default {
    components: {tinymce,pdf},
   data() {
    return {
      questions:[{'stem':[{'stem_text':''}],'options':[],'question_text':'','optionchoice':'radio','choiceoption':'1','imagevisibility':false,'instruction_flag':false,'instruction_text':'','answer_key':'','answer_explanation':'','uploaded_file':null, 'multiple_uploaded_file': [], 'uploadedstem_file':null,'stemimagevalidation':{'image_permission':null,'image_source':null},'questionimagevalidation':{'image_permission':null,'image_source':null},'q_order':1, 'multiple_uploadedstem_file': []}],
      questioncount:1,
      stemcount:1,
      currentuser:null,
      imagevisibility:0,
      questiontypes:[],
      image_permission:"0",
      image_source:null,
      kfpflag:false,
      imgofweekflag:false,
      caseofweekflag:false,
      answer_key:null,
      colleges:[],
      addscheduler:false,
      domains:[],
      genders:[],
      icpc2s:[],
      ageranges:[],
      q_title:null,
      q_subject:null,
      atsis:[{'key':'1','valuedata':'Yes'},{'key':'2','valuedata':'No'}],
      questiontype:null,
      formerror:[{'optionerror':'','questexterr':''}],
      showerror:false,
      errors: [],
      questiontype:null,
      college:'5d2091b9f93d5341b4c682e0',
      q_typename:"",
      instruction_flag:false,
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
      question_text:null,
      answer_explanation:null,
      m_tags:null,
      m_domains:'',
      m_icpcs:'',
      mcqchoice:1,
      m_ages:'',
      m_genders:'',
      m_atsis:'',
      instruction_text:null,
      stem_text:null,
      dataFilterKey:null,
      searched_tags:null,
      questype_tag:null,
      questagname :null,
      questags:[],
      questionmodule:null,
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
      // uploadedstem_file:null,
      uploadedstem_file:[],
      fileurl:window.publicfileurl,
      optioncounts:0,
      optiondatas:[],
      stemimagevalidation:{'image_permission':null,'image_source':null},
      questionimagevalidation:{'image_permission':null,'image_source':null},
      createdoptions:[],
      version:null,
      q_version:'1',
      publishdate:null,
      attachement:null,
      questionid:null,
      q_typenoty:null,
      weburl:'',
      validations:[],
      spelloptions:{browser_spellcheck: true},
      disableflag:true,
      questionpermission:[],
      currentuserdata:null,
      imagevalidationpopup:false,
      questionindexid:0,
      stem_image_flag:false,
      q_image_flag:false

    }
  },
  methods:
  {
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
        // JSON responses are automatically parsed.
        this.searched_tags = response.data
      });
    },
    selectedtags(data)
    {
      // if(this.selected_tags_id.indexOf(this.questype_tag)==-1 && this.questype_tag!=null)
      // {
      //   this.selected_tags.push({'tagname':this.questagname, 'unique_id':this.questype_tag});
      //   this.selected_tags_id.push(this.questype_tag);
      // }
      this.selected_tags.push(data);
      this.selected_tags_id.push(data.unique_id);
      this.m_tags=null;
      this.activeflag=0;
      // console.log('selected-',this.selected_tags)
    },
    removestemimage(aindex,imgindex, index)
    {
    // console.log(aindex)
    if (this.uploadedstem_file.length == 1){
      this.questions[aindex].uploadedstem_file=null
    }
      this.uploadedstem_file.splice(index, 1)
      this.questions[aindex].multiple_uploadedstem_file.splice(index, 1)
    },
    removequestionimage(aindex,imgindex, index)
    {

      if (this.questions[aindex].multiple_uploaded_file.length == 1){
        this.questions[aindex].uploaded_file = null
      }
      this.questions[aindex].multiple_uploaded_file.splice(index, 1)
    },
    removeQuestion(qindex)
    {
      this.questions.splice(qindex, 1)
    },
    instructionhidenshow(qindex,status)
    {
      if(status){
        this.questions[qindex].instruction_flag=false
      }
      else{
        this.questions[qindex].instruction_flag=true
      }
    },
    rightAnswer(qindex,optiontype,indexid)
    {
      // console.log("right answer")
      // console.log("qindex",qindex)
      console.log("optiontype",optiontype)
      // console.log("indexid",indexid)
      var i;
      if(optiontype=='radio')
      {
        console.log("radio radio- ",this.questions[qindex].options.length)
        for(i=0;i < this.questions[qindex].options.length; i++)
        {
          // console.log('answervalue-',this.optiondatas[i].answervalue)
          if(i!=indexid )
          {
            this.questions[qindex].options[i].answervalue=false
          }
        }
      }
      console.log(optiontype+' hhh '+indexid)
    },
    deactiveflag()
    {
      setTimeout(function () {
        this.activeflag=0;
      }.bind(this), 500)
    },
    selecteddomains(data)
    {
      this.selected_domains.push(data);
      this.selected_domains_id.push(data.unique_id);
      this.m_domains='';
      this.activeflag=0;
    },
    selectedicpc2s(data)
    {
      this.selected_icpc2s.push(data);
      this.selected_icpc2s_id.push(data.unique_id);
      this.m_icpcs='';
      this.activeflag=0;
    },
    selectedages(data)
    {
      this.selected_ages.push(data);
      this.selected_ages_id.push(data.unique_id);
      this.m_ages='';
      this.activeflag=0;
    },
    selectedgenders(data)
    {
      this.selected_genders.push(data);
      this.selected_genders_id.push(data.unique_id);
      this.m_genders='';
      this.activeflag=0;
    },
    selecteditsis(data)
    {
      this.selected_itsis.push(data);
      this.selected_itsis_id.push(data.key);
      this.m_atsis='';
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
      }else if(type==4){
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
//************************************************
    updateoptioncount()
    {

      var i=0;
      var sbaTag='', mcqTag='', kfpTag='', cbdTag=''

      if(this.questags.length>0)
      {
        sbaTag = this.questags.find(qt => qt.tagname == "SBA");
        if(sbaTag==undefined){ sbaTag=''}
        mcqTag = this.questags.find(qt => qt.tagname == "MCQ");
        if(mcqTag==undefined){ mcqTag=''}
        kfpTag = this.questags.find(qt => qt.tagname == "KFP");
        if(kfpTag==undefined){ kfpTag=''}
        cbdTag = this.questags.find(qt => qt.tagname == "CaseOfTheWeek");
        if(cbdTag==undefined){ cbdTag=''}
      }


      this.questions[0].options=[]
      if(this.q_typename=='5d15fea98edfed6c417592d10') //SBA
      {
        this.kfpflag=false
        this.imgofweekflag=false
        this.questioncount=1
        this.stemcount=1
        for(i = 1; i <= 5; i++){
          var tempopt={'answervalue':false,'option_text':'','option_order':i}
          this.questions[0].options.push(tempopt);
        }
        this.version=' SBA-'+moment().format('YYYY-MM-DD')+'-1';
        this.q_typenoty='SBA';
        this.weburl='sbaquestionanswer';
        this.questagname="SBA"
        this.questype_tag=sbaTag.unique_id
        console.log('sba-',this.questype_tag)
        if(this.selected_tags_id.indexOf(mcqTag.unique_id)>=0 ||this.selected_tags_id.indexOf(cbdTag.unique_id)>=0 ||this.selected_tags_id.indexOf(kfpTag.unique_id)>=0 )
        {
          this.selected_tags.splice(this.selected_tags.indexOf(mcqTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(mcqTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(cbdTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(cbdTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(kfpTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(kfpTag.unique_id), 1)
        }

      }
      if(this.q_typename=='5d15fea98edfed6c417592d13') //SBA/MCQ
      {
        this.kfpflag=false
        this.imgofweekflag=false
        this.questioncount=1
        this.stemcount=1
        for(i = 1; i <= 5; i++){
          var tempopt={'answervalue':false,'option_text':'','option_order':i}
          this.questions[0].options.push(tempopt);
        }
        this.version=' SBA/MCQ-'+moment().format('YYYY-MM-DD')+'-1';
        this.q_typenoty='SBA/MCQ';
        this.weburl='sbaquestionanswer';
        this.college='5d2091b9f93d5341b4c682e2'
        this.questagname='';
        this.questype_tag=null
        console.log('sba/mcq-',this.questype_tag)
        if(this.selected_tags_id.indexOf(sbaTag.unique_id)>=0 ||this.selected_tags_id.indexOf(kfpTag.unique_id)>=0 ||this.selected_tags_id.indexOf(cbdTag.unique_id)>=0 ||this.selected_tags_id.indexOf(mcqTag.unique_id)>=0 )
        {
          this.selected_tags.splice(this.selected_tags.indexOf(sbaTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(sbaTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(kfpTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(kfpTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(mcqTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(mcqTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(cbdTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(cbdTag.unique_id), 1)
        }
      }
      else if(this.q_typename=='5d15fea98edfed6c417592d11') //MEMQ
      {
        this.kfpflag=false
        this.imgofweekflag=false
        this.questioncount=1
        this.stemcount=1
        for(i = 1; i <= 15; i++){
          var tempopt={'answervalue':false,'option_text':'','option_order':i}
          this.questions[0].options.push(tempopt);
        }
        this.version=' MEMQ-'+moment().format('YYYY-MM-DD')+'-1';
        this.q_typenoty='MEMQ';
        this.weburl='sbaquestionanswer';
        this.questagname='';
        this.questype_tag=null
        if(this.selected_tags_id.indexOf(sbaTag.unique_id)>=0 ||this.selected_tags_id.indexOf(kfpTag.unique_id)>=0 ||this.selected_tags_id.indexOf(cbdTag.unique_id)>=0 ||this.selected_tags_id.indexOf(mcqTag.unique_id)>=0 )
        {
          this.selected_tags.splice(this.selected_tags.indexOf(sbaTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(sbaTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(kfpTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(kfpTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(mcqTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(mcqTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(cbdTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(cbdTag.unique_id), 1)
        }
      }
      else if(this.q_typename=='5d15fea98edfed6c417592d12')  //MCQ
      {
        this.kfpflag=false
        this.imgofweekflag=false
        this.questioncount=1
        this.stemcount=1
        for(i = 1; i <= 5; i++){
          var tempopt={'answervalue':false,'option_text':'','option_order':i}
          this.questions[0].options.push(tempopt);
        }
        this.version=' MCQ-'+moment().format('YYYY-MM-DD')+'-1';
        this.q_typenoty='MCQ';
        this.weburl='sbaquestionanswer';
        this.questagname='MCQ';
        this.questype_tag=mcqTag.unique_id
        console.log('mcq-',this.questype_tag)
        if(this.selected_tags_id.indexOf(sbaTag.unique_id)>=0 ||this.selected_tags_id.indexOf(cbdTag.unique_id)>=0 ||this.selected_tags_id.indexOf(kfpTag.unique_id)>=0 )
        {
          this.selected_tags.splice(this.selected_tags.indexOf(sbaTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(sbaTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(cbdTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(cbdTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(kfpTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(kfpTag.unique_id), 1)
        }

      }
      else if(this.q_typename=='5d15fea98edfed6c417592d9')  //KFP
      {
        this.version=' KFP-'+moment().format('YYYY-MM-DD')+'-1';
        this.q_typenoty='KFP';
        this.weburl='questionanswer';
        this.imgofweekflag=false
        this.kfpflag=true
        this.questioncount=1
        this.stemcount=1
        this.questagname='KFP';
        this.questype_tag=kfpTag.unique_id
        console.log('kfp-',this.questype_tag)
        if(this.selected_tags_id.indexOf(sbaTag.unique_id)>=0 ||this.selected_tags_id.indexOf(cbdTag.unique_id)>=0 ||this.selected_tags_id.indexOf(mcqTag.unique_id)>=0 )
        {
          this.selected_tags.splice(this.selected_tags.indexOf(sbaTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(sbaTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(cbdTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(cbdTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(mcqTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(mcqTag.unique_id), 1)
        }
      }
      else if(this.q_typename=='5d15fea98edfed6c417592d15')  //Img of the week
      {
        this.version=' Image of the week-'+moment().format('YYYY-MM-DD')+'-1';
        this.q_typenoty='Image of the week';
        this.weburl='imageofweekanswer';
        this.kfpflag=true
        // this.imgofweekflag=true
        this.questioncount=1
        this.stemcount=1
        this.questagname='Image of the week';
        this.questype_tag=null
        console.log('imgweek-',this.questype_tag)
        if(this.selected_tags_id.indexOf(sbaTag.unique_id)>=0 ||this.selected_tags_id.indexOf(kfpTag.unique_id)>=0 ||this.selected_tags_id.indexOf(cbdTag.unique_id)>=0 ||this.selected_tags_id.indexOf(mcqTag.unique_id)>=0 )
        {
          this.selected_tags.splice(this.selected_tags.indexOf(sbaTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(sbaTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(kfpTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(kfpTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(mcqTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(mcqTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(cbdTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(cbdTag.unique_id), 1)
        }
      }
      else if(this.q_typename=='5d15fea98edfed6c417592d14')  //CBD
      {
        this.version=' CASE-'+moment().format('YYYY-MM-DD')+'-1';
        this.q_typenoty='CASE';
        this.weburl='caseofweekanswer';
        this.caseofweekflag=true
        this.kfpflag=false
        this.imgofweekflag=false
        this.questioncount=1
        this.stemcount=1
        this.questagname='CaseOfTheWeek'
        this.questype_tag=cbdTag.unique_id
        console.log('cbd-',this.questype_tag)
         if(this.selected_tags_id.indexOf(sbaTag.unique_id)>=0 ||this.selected_tags_id.indexOf(kfpTag.unique_id)>=0 ||this.selected_tags_id.indexOf(mcqTag.unique_id)>=0 )
        {
          this.selected_tags.splice(this.selected_tags.indexOf(sbaTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(sbaTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(kfpTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(kfpTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(mcqTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(mcqTag.unique_id), 1)
        }
      }
      else if(this.q_typename=='5d15fea98edfed6c417592d16')  //student
      {
        this.version=' User Question-'+moment().format('YYYY-MM-DD')+'-1';
        this.q_typenoty='User Question';
        this.weburl='studentquestionanswer';
        this.caseofweekflag=false
        this.kfpflag=false
        this.imgofweekflag=false
        this.questioncount=1
        this.stemcount=1
        this.questagname='User Question'
        this.questype_tag=null
        console.log('student-',this.questype_tag)
        if(this.selected_tags_id.indexOf(sbaTag.unique_id)>=0 ||this.selected_tags_id.indexOf(kfpTag.unique_id)>=0 ||this.selected_tags_id.indexOf(cbdTag.unique_id)>=0 ||this.selected_tags_id.indexOf(mcqTag.unique_id)>=0 )
        {
          this.selected_tags.splice(this.selected_tags.indexOf(sbaTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(sbaTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(kfpTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(kfpTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(mcqTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(mcqTag.unique_id), 1)
          this.selected_tags.splice(this.selected_tags.indexOf(cbdTag.unique_id), 1)
          this.selected_tags_id.splice(this.selected_tags_id.indexOf(cbdTag.unique_id), 1)
        }
      }
      if(this.selected_tags_id.indexOf(this.questype_tag)==-1 && this.questype_tag!=null)
      {
        this.selected_tags.push({'tagname':this.questagname, 'unique_id':this.questype_tag});
        this.selected_tags_id.push(this.questype_tag);
      }
    },
      updateoptiontype(qindex,qchoice){
if(qchoice==2){
this.questions[qindex].optionchoice="checkbox";
}else{
this.questions[qindex].optionchoice="radio";
}
      },
      addChoice(qindex){
       var optionorder=this.questions[qindex].options.length+1;
var tempopt={'answervalue':false,'option_text':'','option_order':optionorder}
            this.questions[qindex].options.push(tempopt);
            this.validations.push(qindex);
      },
      // async attachfiletopost(qref,qindex){
      //   const file = this.$refs[qref][0].files[0];
      //   console.log(file);
      //   const formData = new FormData();
      //   formData.append("file", file);
      //   try{
      //     const res = await axios.post("/upload", formData);
      //     console.log(res.data);
      //     this.questions[qindex].uploaded_file = res.data.file
      //   } catch(err){
      //     console.log(err);

      //   }
      // },

        async attachfiletopost(qref,qindex)
        {
          const files = this.$refs[qref][0].files;
          var qi=0;
          for(qi=0;qi<files.length;qi++){
            const file=files[qi];
            const formData = new FormData();
            formData.append("file", file);
          try{
            const res = await axios.post("/upload", formData);
              console.log(res.data.file);
              this.questions[qindex].uploaded_file = res.data.file
              this.questions[qindex].multiple_uploaded_file.push(res.data.file)
              this.questions[qindex].questionimagevalidation.image_permission = this.image_permission
              this.imagevalidationpopup=true
              this.questionindexid=qindex
              this.q_image_flag=true
            } catch(err){
                console.log(err);
              }
          }
        },

      // async attachfilestemfile(qref,qindex){
      //   const file = this.$refs[qref][0].files[0];
      //   console.log(file);
      //   const formData = new FormData();
      //   formData.append("file", file);
      //   try{
      //     const res = await axios.post("/upload", formData);
      //     console.log(res.data);
      //     this.questions[qindex].uploadedstem_file = res.data.file
      //     this.questions[qindex].stemimagevalidation.image_permission = this.image_permission
      //     this.imagevalidationpopup=true
      //     this.questionindexid=qindex
      //      this.stem_image_flag=true
      //   } catch(err){
      //     console.log(err);

      //   }
      // },


      // this is new function to upload multiple image at the same time
      async attacharticlesecfile(qref,qindex){

        const files = this.$refs[qref][0].files;
        var qi=0;

        for(qi=0;qi<files.length;qi++){
          const file=files[qi];
          const formData = new FormData();
          formData.append("file", file);
        try{
          const res = await axios.post("/upload", formData);
          this.uploadedstem_file.push(res.data.file)
          this.questions[qindex].uploadedstem_file = res.data.file
          // alert(this.questions[qindex].uploadedstem_file)
          this.questions[qindex].multiple_uploadedstem_file.push(res.data.file)
          this.questions[qindex].stemimagevalidation.image_permission = this.image_permission
          this.imagevalidationpopup=true
          this.questionindexid=qindex
          this.stem_image_flag=true
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
      },
      removeoption(qindex,id){
this.questions[qindex].options.splice(id, 1)
this.optioncounts--;
      },
  publishquestion()
  {
      this.formerror = [{'optionerror':'','questexterr':''}];
      var tags=this.selected_tags_id.join(",");
      var domain=this.selected_domains_id.join(",");
      var category=this.selected_icpc2s_id.join(",");
      var age_range=this.selected_ages_id.join(",");
      var gender=this.selected_genders_id.join(",");
      var atsi=this.selected_itsis_id.join(",");
      if(this.scheduledatetime!==null){
        this.scheduledatetime= moment(this.scheduledatetime).unix()*1000;
      }
      else{
           this.scheduledatetime=Date.now();
      }
      if(this.questions)
      {
          console.log('question - ', this.questions)
          console.log('if', this.questions[0].options.length)
          var quesopt =this.questions[0].options;
          var count=0;
          quesopt.forEach(function(poption,index)
          {
            if (!poption.answervalue==true)
            {
              console.log('whitespace');
              console.log('if');
               count++
            }
            else
            {
              console.log('else');
              count--;
            }
            console.log('count if', count);
          });

          if((this.q_typename=='5d15fea98edfed6c417592d9' || this.q_typename=='5d15fea98edfed6c417592d14' || this.q_typename=='5d15fea98edfed6c417592d15'|| this.q_typename=='5d15fea98edfed6c417592d16') &&  quesopt.length ==0)
          {
            console.log('kfp or case or imgofweek')
            var count=0;
          }

          console.log('count-',count)
          console.log('quesopt.length-',quesopt.length)
          if(count==quesopt.length)
          {
            this.showerror=true;
            this.formerror[0].optionerror ="Please save correct answer for this question to publish"
          }
          if(count==0 || count<quesopt.length)
          {
              this.showerror=false;

            // axios.post(`/publishquestion`,{"q_order":this.questions[0].q_order,"q_subject":this.q_subject,"q_title":this.q_title,"answer_key":this.questions[0].answer_key,"imagevisibility":this.questions[0].imagevisibility,"q_version":this.q_version,"uploadedstem_file":this.questions[0].uploadedstem_file,"uploaded_file":this.questions[0].uploaded_file,"stem_text":this.questions[0].stem[0].stem_text,"instruction_text":this.questions[0].instruction_text,"version":this.version,"questiontype":this.q_typename,"college":this.college,"question_text":this.questions[0].question_text,"option_type":this.questions[0].choiceoption,"answer_explanation":this.questions[0].answer_explanation,"questionimagevalidation":this.questions[0].questionimagevalidation,"stemimagevalidation":this.questions[0].stemimagevalidation,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser})


            // this is new implementation for multiple image submission
            axios.post(`/publishquestion`,{"q_order":this.questions[0].q_order,"q_subject":this.q_subject,"q_title":this.q_title,"answer_key":this.questions[0].answer_key,"imagevisibility":this.questions[0].imagevisibility,"q_version":this.q_version,"uploadedstem_file":this.questions[0].uploadedstem_file,"uploaded_file":this.questions[0].uploaded_file,"stem_text":this.questions[0].stem[0].stem_text,"instruction_text":this.questions[0].instruction_text,"version":this.version,"questiontype":this.q_typename,"college":this.college,"question_text":this.questions[0].question_text,"option_type":this.questions[0].choiceoption,"answer_explanation":this.questions[0].answer_explanation,"questionimagevalidation":this.questions[0].questionimagevalidation,"stemimagevalidation":this.questions[0].stemimagevalidation,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser, "multiple_uploadedstem_file": this.questions[0].multiple_uploadedstem_file, "multiple_uploaded_file": this.questions[0].multiple_uploaded_file})

            .then(response =>
            {
              if(response.data.error){
                this.showerror=true;
            this.formerror[0].questexterr =response.data.error;
              console.log(response.data.error);
              return false;
              }
              this.questionid=response.data._id;
              axios.post(`/savequestionoption`,{"questionid":response.data._id,"createdby":this.currentuser,"optiondatas":this.questions[0].options}).then(optresponse =>
              {
                axios.post('/addpostbyweb',{"questionid":this.questionid,attachement:null,tags:tags,postcontent:null,"questiontype":this.q_typename,createdby:this.currentuser,scheduledatetime:this.scheduledatetime})
                .then((postresponse)=>
                {
                  axios.post('/setquestionpublishnotification',{"weburl":this.weburl,"appurl":'',"targetid":this.questionid,"q_type":this.q_typenoty,"title":this.q_title,"questionid":this.questionid,postid:postresponse.data.unique_id,createdby:this.currentuser,scheduled:this.scheduledatetime}).then((notiresponse)=>
                  {
                    console.log(notiresponse);
                  })
                  .catch((error)=>{
                    console.log(error);
                  });
                  if(this.q_typename=='5d15fea98edfed6c417592d9')
                  {
                    axios.post(`/savekfpquestion`,{"q_subject":this.q_subject,"q_title":this.q_title,"q_version":this.q_version,"questiontype":this.q_typename,"college":this.college,"data":this.questions,"version":this.version,'parentqid':this.questionid,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser}).then(kfpresponse =>
                    {
                      location.href='/kfpquestionreport';
                    }).catch((error)=>{
                        console.log(error);
                      });
                  }
                  else if(this.q_typename=='5d15fea98edfed6c417592d15')
                  {
                    axios.post(`/saveimgweekquestion`,{"q_subject":this.q_subject,"q_title":this.q_title,"q_version":this.q_version,"questiontype":this.q_typename,"college":this.college,"data":this.questions,"version":this.version,'parentqid':this.questionid,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser}).then(imgweekresponse =>
                    {
                      location.href='/imageoftheweekreport';
                    }).catch((error)=>{
                        console.log(error);
                      });
                  }
                  else if(this.q_typename=='5d15fea98edfed6c417592d14')
                  {
                    axios.post(`/savecasebasequestion`,{"q_subject":this.q_subject,"q_title":this.q_title,"q_version":this.q_version,"questiontype":this.q_typename,"college":this.college,"data":this.questions,"version":this.version,'parentqid':this.questionid,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser}).then(casebaseresponse =>
                    {
                        location.href='/casebasequestionreport';
                    }).catch((error)=>{
                        console.log(error);
                      });
                  }
                  else if(this.q_typename=='5d15fea98edfed6c417592d16')
                  {
                    axios.post(`/savestudentquestion`,{"q_subject":this.q_subject,"q_title":this.q_title,"q_version":this.q_version,"questiontype":this.q_typename,"college":this.college,"data":this.questions,"version":this.version,'parentqid':this.questionid,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser})
                    .then(studentresponse => {
                      location.href='/studentquestionreport';
                    }).catch((error)=>{
                        console.log(error);
                      })
                  }
                  else
                  {
                    location.href='/questionreport';
                  }
                })
                .catch((error)=>{
                  console.log(error);
                });
                console.log(optresponse.data);
              })
              .catch(e => {
                console.log(e);
                this.errors.push(e)
              });
            })
            .catch(e => {
              console.log(errors);
              this.errors.push(e)
            });
          }
      }
   //location.reload();
  },
  savequestion()
  {
    this.formerror=[{'optionerror':'','questexterr':''}]
    if(this.publishdate <= Date.now())
    {
      console.log("if")
      console.log(this.questions);
     // return false;
      // console.log('finaltags-',this.selected_tags_id)
      var tags=this.selected_tags_id.join(",");
      // console.log('tags-',tags);
      var domain=this.selected_domains_id.join(",");
      var category=this.selected_icpc2s_id.join(",");
      var age_range=this.selected_ages_id.join(",");
      var gender=this.selected_genders_id.join(",");
      var atsi=this.selected_itsis_id.join(",");
      if(this.scheduledatetime!==null){
        this.scheduledatetime= moment(this.scheduledatetime).unix()*1000
      }
      else{
        this.scheduledatetime=Date.now();
      }
      console.log('********-',this.questions)
      if(this.questions)
      {
          console.log('if 1')
          var quesopt = [];
          var count=0;
          if(this.questions[0].options.length>0)
          {
            if(this.questions[0].options[0]==undefined)
            {
              console.log("null in options" )
              this.questions[0].options=null;
            }
            else
            {
              quesopt =this.questions[0].options;
              quesopt.forEach(function(poption,index)
              {
                if (!poption.answervalue==true)
                {
                  // console.log('whitespace')
                  count++
                }
                else
                {
                  // console.log('else');
                  count--;
                }
              });
            }
          }
          // console.log('count-',count)
          if(count==quesopt.length)
          {
            // console.log('if count')
            this.showerror=true;
            this.formerror[0].optionerror ="Please save correct answer for this question"
          }
          if((this.q_typename=='5d15fea98edfed6c417592d9' || this.q_typename=='5d15fea98edfed6c417592d14' || this.q_typename=='5d15fea98edfed6c417592d15' || this.q_typename=='5d15fea98edfed6c417592d16') &&  quesopt.length ==0)
          {
            console.log('kfp or case or imgweek')
            quesopt.length=1;
          }

          if(count==0 || count<quesopt.length)
          {
          console.log('if count-',count)
          console.log('quesopt.length-',quesopt.length)
            this.showerror=false;
            // this.optionerror='';
             // alert('hello25');
             // return false;
            axios.post(`/savequestion`,{"q_order":this.questions[0].q_order,"q_subject":this.q_subject,"q_title":this.q_title,"answer_key":this.questions[0].answer_key,"imagevisibility":this.questions[0].imagevisibility,"q_version":this.q_version,"uploadedstem_file":this.questions[0].uploadedstem_file,"uploaded_file":this.questions[0].uploaded_file,"questionimagevalidation":this.questions[0].questionimagevalidation,"stemimagevalidation":this.questions[0].stemimagevalidation,"stem_text":this.questions[0].stem[0].stem_text,"instruction_text":this.questions[0].instruction_text,"version":this.version,"questiontype":this.q_typename,"college":this.college,"question_text":this.questions[0].question_text,"option_type":this.questions[0].choiceoption,"answer_explanation":this.questions[0].answer_explanation,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser, "multiple_uploadedstem_file":this.questions[0].multiple_uploadedstem_file,"multiple_uploaded_file":this.questions[0].multiple_uploaded_filey})
            .then(response =>
            {
              console.log('hello here');
              if(response.data.error){
                this.showerror=true;
                this.formerror[0].questexterr=response.data.error;
              console.log(response.data.error);
              console.log('er-',this.formerror[0].questexterr);
              return false;
              }
              this.questionid=response.data._id;
              if(this.scheduledatetime >Date.now())
              {
                axios.post('/addpostbyweb',{"questionid":this.questionid,attachement:null,tags:tags,postcontent:null,"questiontype":this.q_typename,createdby:this.currentuser,scheduledatetime:this.scheduledatetime})
                  .then((postresponse)=>
                  {
                    axios.post('/setquestionpublishnotification',{"weburl":this.weburl,"appurl":'',"targetid":this.questionid,"q_type":this.q_typenoty,"title":this.q_title,"questionid":this.questionid,postid:postresponse.data.unique_id,createdby:this.currentuser,scheduled:this.scheduledatetime})
                    .then((notiresponse)=>
                    { }).catch((error)=>{
                        console.log(error);
                        });
                  })
              }
              console.log('kkkk',this.questions[0].options);

              axios.post(`/savequestionoption`,{"questionid":response.data._id,"createdby":this.currentuser,"optiondatas":this.questions[0].options})
              .then(optresponse => {
                if(this.q_typename=='5d15fea98edfed6c417592d9')
                {
                  axios.post(`/savekfpquestion`,{"q_subject":this.q_subject,"q_title":this.q_title,"q_version":this.q_version,"questiontype":this.q_typename,"college":this.college,"data":this.questions,"version":this.version,'parentqid':this.questionid,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser})
                  .then(kfpresponse => {
                      location.href='/kfpquestionreport';
                  }).catch((error)=>{
                      console.log(error);
                    })
                }
                else if(this.q_typename=='5d15fea98edfed6c417592d15')
                {
                  console.log("q_typename imgweek 1")
                  axios.post(`/saveimgweekquestion`,{"q_subject":this.q_subject,"q_title":this.q_title,"q_version":this.q_version,"questiontype":this.q_typename,"college":this.college,"data":this.questions,"version":this.version,'parentqid':this.questionid,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser})
                  .then(kfpresponse => {
                    console.log("q_typename imgweek response")
                      location.href='/imageoftheweekreport';
                  }).catch((error)=>{
                      console.log(error);
                    })
                }
                else if(this.q_typename=='5d15fea98edfed6c417592d14')
                {
                  axios.post(`/savecasebasequestion`,{"q_subject":this.q_subject,"q_title":this.q_title,"q_version":this.q_version,"questiontype":this.q_typename,"college":this.college,"data":this.questions,"version":this.version,'parentqid':this.questionid,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser})
                  .then(casebaseresponse => {
                    location.href='/casebasequestionreport';
                  }).catch((error)=>{
                      console.log(error);
                    })
                }
                else if(this.q_typename=='5d15fea98edfed6c417592d16')
                {
                  axios.post(`/savestudentquestion`,{"q_subject":this.q_subject,"q_title":this.q_title,"q_version":this.q_version,"questiontype":this.q_typename,"college":this.college,"data":this.questions,"version":this.version,'parentqid':this.questionid,"tags":tags,"domain":domain,"category":category,"age_range":age_range,"gender":gender,"atsi":atsi,"deleted":"0","publish_date":this.scheduledatetime,"answerpublish_date":this.scheduledatetime,"createdby":this.currentuser})
                  .then(studentresponse => {
                    location.href='/studentquestionreport';
                  }).catch((error)=>{
                      console.log(error);
                    })
                }
                else
                {

                   location.href='/questionreport';
                }
              })
              .catch(e => {
               console.log(e);
                this.errors.push(e)
              })
            }).catch(e => {
                console.log(e);
                this.errors.push(e)
              })
          }
        }
       }
      else
      {
        this.publishquestion();
      }
  },
  addStemp(qindex)
  {
    this.questions[qindex].stem.push({'stem_text':''})
  },
  addnewquestion()
  {
    var qorder=this.questions.length+1;
    this.questions.push({'stem':[],'options':[],'question_text':'','optionchoice':'radio','choiceoption':'1','defaultimg':'0','instruction_flag':false,'instruction_text':'','answer_key':'','answer_explanation':'','uploaded_file':null,'uploadedstem_file':null,'stemimagevalidation':{'image_permission':null,'image_source':null},'questionimagevalidation':{'image_permission':null,'image_source':null},'q_order':qorder,'imagevisibility':false, multiple_uploaded_file: [], multiple_uploadedstem_file: []})
  }
  },
 created() {
     axios.post(`/gettags`,{'searchedtag':null})
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      this.searched_tags = response.data
    }),
    axios.post(`/getquestiontagsdatas`)
    .then(response => {
      this.questags = response.data
      console.log(this.questags)
    }),
    axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuserdata=response.data
      this.currentuser = response.data.unique_id
      ,
     axios.post(`/getpermitedallquestiontypes`,{"roleid":this.currentuserdata.role})
    .then(response => {
      // JSON responses are automatically parsed.
      this.questiontypes = response.data
       if(response.data.length==1){
           this.disableflag=false
         this.q_typename="5d15fea98edfed6c417592d16"
         this.version=' User Question-'+moment().format('YYYY-MM-DD')+'-1';
       }
    })
    .catch(e => {
      this.errors.push(e)
    })
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
    })

},
  computed: {
     filteredDomains: function() {
            return this.domains.filter( function(domain) {
                //return domain.tagname.match(this.m_domains)
            })
        }
  }

}
</script>