<template>
<v-container qustionans>
<div class="col-sm-12">
    <div class="col-sm-3 sticky-position">
    <div class= "left_article">
    <span v-for="(qdata, qindex) in questiondata">
        <a  class="container_link" :id="`sec${qdata._id}`" :href="`#${qdata._id}`" v-if="qdata.question_text!=null && qdata.question_text!=''">Question {{qindex+1}}</a>
   </span>
    <span v-if="summarycheck">
        <a  class="container_link" id="secsummary" href="#summary" >Summary</a>
   </span>
    <span v-if="resourcecheck">
        <a  class="container_link" id="secresource" href="#resource" >Resources</a>
   </span>

    <ul class="article_social_icons">
        <li class="cursoron"> <img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" v-if="postdata.likestatus==0"  @click="likeanddislike(postdata.unique_id,1)"><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" v-if="postdata.likestatus!=0"  @click="likeanddislike(postdata.unique_id,0)"> <span v-if="postdata.likes>0" @click="showlikers(postdata.unique_id)"> {{postdata.likes}} </span></li>
        <li class="cursoron" @click="setFocus('comment_box')"> <img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth"> <span v-if="postdata.allcomments.length>0"> {{postdata.allcomments.length}} </span></li>
        <li class="cursoron"> <img src="../assets/icons/retweet-light.svg" class="fa_svg_icon extraimgwidth"> <span>  </span></li>
        <li class="cursoron" v-if="questionLabels[4].rolevalue.indexOf(currentuserdata.role)>=0"><span class="new-question_button"><a :href="`/addnewcasequestion?id=${masterquestion}&flag=new&subid=${questiondata.length}`">Add new question</a></span></li>

        <template v-if="summarycheck">
        <li class="cursoron addsummary" v-if="questionLabels[4].rolevalue.indexOf(currentuserdata.role)>=0"><span class="new-question_button"><a :href="`/addsummary?id=${masterquestion}`">Edit Summary</a></span></li>
        </template>
        <template v-else>
        <li class="cursoron addsummary" v-if="questionLabels[4].rolevalue.indexOf(currentuserdata.role)>=0"><span class="new-question_button"><a :href="`/addsummary?id=${masterquestion}`">Add Summary</a></span></li>
        </template>
        <li class="cursoron addsummary"><span class="new-question_button"><a :href="`/resourcemodule?id=${masterquestion}&question=${version}`">Add Resource</a></span></li>

    </ul>
    </div>
    </div>
<div class="col-sm-7  question_preview qstans">
<div class="first_title">
<img src="../assets/icons/question-square-solid_green.svg" class="ques_icon" />
<p class="first_roe">{{version}}</p>
</div>

<!--first_title-->
<div class="buttons_group" >
  <template v-for="(tag, tindex) in tagdata">
    <button v-if="tag.questionvisible==true" v-bind:key="`tags${tindex}`" class="btn btn_one">{{tag.tagname}}</button>
  </template>
</div>
<div v-for="(question,questionindex) in questiondata" class="main_coverdiv" v-bind:id="`${question._id}`" :key="`key${question._id}`">

<div class="second_title">
<p class="stem_headingg" v-html="question.stem_text"></p>

<!-- to show the array of image -->

<template v-if="question.multiple_uploadedstem_file">
  <div v-for="(element, index) in question.multiple_uploadedstem_file" :key="index">
      <div v-if="element.includes('.pdf') == false">
        <img :src="fileurl+element" class="img-responsive title_imageprview"/>
      </div>
      <div  v-else >
        <a :href="fileurl+element" target="_blank" ><pdf :src="fileurl+element" ></pdf></a>
      </div>
</div>
</template>

<template v-else-if="question.uploadedstem_file !== null">
  <a :href="fileurl+question.uploadedstem_file" target="_blank" v-if="question.uploadedstem_file.toLowerCase().indexOf('.pdf') >= 0 && question.uploadedstem_file!=null"><pdf :src="fileurl+question.uploadedstem_file" ></pdf></a>
  <img :src="fileurl+question.uploadedstem_file" class="img-responsive title_imageprview" v-if="question.uploadedstem_file!=null && question.uploadedstem_file.toLowerCase().indexOf('.pdf') < 0" />
</template>



<div class="qusans_series"><b class="qusans_no">Question {{questionindex+1}}. </b><b v-html="question.question_text" class="qusans_qus"></b></div>
<div v-if="question.question_options.length>0 && showerror==true" style="color: red;"><span class="question_error">{{question.error}}</span></div>
<template v-if="question.instruction_text">
<div>
<p class="qusans_inst">Instructions</p>
<p class="sub_headingg" v-html="question.instruction_text"></p>
</div> -->
</template>
</div>
 <!--second_title-->
<!-- for multiple images  -->
<template v-if="question.multiple_uploaded_file">
<div v-for="(element, index) in question.multiple_uploaded_file" :key="index">
      <div v-if="element.includes('.pdf') == false">
        <img :src="fileurl+element" class="img-responsive title_imageprview"/>
      </div>
      <div  v-else >
        <a :href="fileurl+element" target="_blank" ><pdf :src="fileurl+element" ></pdf></a>
      </div>
</div>
</template>

<template v-else-if="question.hero_img !== null">
<a :href="fileurl+question.hero_img" target="_blank" v-if="question.hero_img.toLowerCase().indexOf('.pdf') >= 0 && question.hero_img!=null"><pdf :src="fileurl+question.hero_img" ></pdf></a>
<img :src="fileurl+question.hero_img" class="img-responsive title_imageprview" v-if="question.hero_img!=null && question.hero_img.toLowerCase().indexOf('.pdf') < 0">
</template>

<img src="../assets/images/slider.png" class="img-responsive title_imageprview" v-if= "question.hero_img==null && question.imagevisibility==true">

<div class="qus_textarea gapbottom_qus">
<div v-if="question.option_type==1 && answerflag==false">
    <label class="radio-inline caseradio_label padding_radio" v-for="(question_option,qo_index) in question.question_options">
      <input type="radio" class="radiosize" v-model="question.answerid" v-bind:key="`optradio${questionindex}${qo_index}`" :value="question_option._id">{{question_option.option_text}}
    </label>
</div>
<div v-if="question.option_type==2 && answerflag==false">
    <label class="radio-inline caseradio_label" v-for="(question_option,qo_index) in question.question_options">
      <input type="checkbox" class="radiosize" v-model="question.answerid"  :value="question_option._id" :id="question_option._id">{{question_option.option_text}}
    </label>
</div>
<div v-if="question.option_type==1 && answerflag==true">
    <label class="radio-inline caseradio_label" v-for="(question_option,qo_index) in question.question_options">
    <span  class="caseblankline_span caseblankline_span_empty" v-if="question_option.answervalue==false  && question_option._id != question.answerid"><img src="../assets/icons/radio-on-button.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{question_option.option_text}}</p></span>
       <span class="caseblankline_span caseblankline_span_wrong" v-if="question_option.answervalue==false && question_option._id == question.answerid"><img src="../assets/icons/dot-circle_incorrect.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{question_option.option_text}}</p>
<span class="wrong_button">
<button class="button wrong_btn">Incorrect</button>
</span>
<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_wrong">Your Answer</button>
</span></span>
<span class="caseblankline_span caseblankline_span_correct" v-if="question_option.answervalue=='true' && question_option._id == question.answerid"><img src="../assets/icons/dot-circle_correct.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{question_option.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span>
<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_right">Your Answer</button>
</span></span>
<span class="caseblankline_span caseblankline_span_correct" v-if="question_option.answervalue=='true'  && question_option._id != question.answerid"><img src="../assets/icons/radio-on-button.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{question_option.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span></span>
    </label>
</div>
<div v-if="question.option_type==2 && answerflag==true">
    <label class="radio-inline caseradio_label" v-for="(question_option,qo_index) in question.question_options">
<span class="caseblankline_span  caseblankline_span_empty" v-if="question_option.answervalue==false && question.answerid.split(',').indexOf(question_option._id)<0"><img src="../assets/icons/checkbox_empty.svg" class="fa_svg_answer" /><p class="empty_title">{{question_option.option_text}}</p></span>
<span class="caseblankline_span caseblankline_span_correct" v-if= "question_option.answervalue==true && question.answerid.split(',').indexOf(question_option._id)>=0">
<img src="../assets/icons/rightanswer.svg" class="fa_svg_answer" />
<p class="empty_title">{{question_option.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span>
<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_right">Your Answer</button>
</span>
</span>
<span class="caseblankline_span caseblankline_span_correct" v-if= "question_option.answervalue==true &&  question.answerid.split(',').indexOf(question_option._id)<0">
<img src="../assets/icons/checkbox_empty.svg" class="fa_svg_answer" />
<p class="empty_title">{{question_option.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span>
</span>
<span class="caseblankline_span caseblankline_span_wrong" v-if= "question_option.answervalue==false &&  question.answerid.split(',').indexOf(question_option._id)>=0"><img src="../assets/icons/wronganswer.svg" class="fa_svg_answer" /><p class="empty_title">{{question_option.option_text}}</p>
<span class="wrong_button">
<button class="button wrong_btn">Incorrect</button>
</span>
<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_wrong">Your Answer</button>
</span>
</span>
    </label>
</div>
<div class="text-right">
<button class="btn q_prvw_sbmtbtn" type="button" v-if="question.question_options.length>0 && question.answered==false" @click="submitcaseanswer()">Submit</button>
</div>

<div class="row">
 <div class="col-xs-12 col-sm-12">
                     <div class="article_commentsection">

<input v-model="hiddenm" type="text" v-bind:ref="`${question._id}`" class="focusitem">
 <div  v-for="(commentsofpostdata,commindex) in question.comments">
  <div class="chats case_of_answer_chat">
  <span v-if="commentsofpostdata.asynccheck==true">
  <template v-if="commentsofpostdata.dummyprofile!=null && commentsofpostdata.dummyprofile!=''">
  <img v-bind:src="fileurl+commentsofpostdata.dummyprofile" ref="random_user" class=" user_circle">
  </template>
  <template v-else>
  <img v-bind:src="fileurl+anonymousimags[0]" ref="random_user" class=" user_circle">
  </template>
  <p class="usernmechats">
    <span v-if="commentsofpostdata.dummyname!=null && commentsofpostdata.dummyname!=''">{{commentsofpostdata.dummyname}}</span>
    <span v-else>Anonymous</span>
    <span class="yourcase_button" v-if="commentsofpostdata.editflag==false && commentsofpostdata.commentby.unique_id==currentuser">
<button class="button youranswer_btn youranswer_button_wrong">Your Answer</button>
</span></p>
 </span>
 <span v-else>
    <img :src="commentsofpostdata.commentby.profile" class="user_circle"> <p class="usernmechats">{{commentsofpostdata.commentby.firstname}} {{commentsofpostdata.commentby.lastname}}</p>
 </span>
    <div class="chatter">

    <span v-html="commentsofpostdata.content" v-if="commentsofpostdata.editflag==false"></span>
    <span  v-else>
    <span  @click="updateComment(questionindex,commindex,commentsofpostdata._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
    <textarea v-model="commentsofpostdata.content" class="add_newcomment" @keydown="focusflag=false">{{commentsofpostdata.content}}</textarea></span>

  <div class="last_li date_right">{{ commentsofpostdata.created_at | postsumDate}}</div>
      <ul class="sharelinks_chaatter">
        <li class="cursoron" v-if="commentsofpostdata.likestatus == 0" ><span @click="comlikeanddislike(commentsofpostdata._id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" @click="showcommentlikers(commentsofpostdata._id)">{{commentsofpostdata.likes}}</span></li>
       <li class="cursoron" v-if="commentsofpostdata.likestatus == 1"><span @click="comlikeanddislike(commentsofpostdata._id,0)"><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span  class="cursoron" v-if="commentsofpostdata.likes>0" @click="showcommentlikers(commentsofpostdata._id)">{{commentsofpostdata.likes}}</span></li>
       <li class="cursoron" ><span @click="showReply(questionindex,commindex,commentsofpostdata._id)"><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>


      <!-- // 30/09/2019 -->

        <!-- <template v-if="(commentsofpostdata.commentby.unique_id==currentuser || commpermission.indexOf(currentuserdata.role)>=0) && commentsofpostdata.questionid==null">
          <template v-if="commentsofpostdata.settingflag==false">
            <li class="cursoron"><span  @click="commentsofpostdata.settingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
          </template>
          <template v-else>
            <li class="cursoron"><span @click="editComment(questionindex,commindex)" ><img src="../assets/icons/edit.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
            <li class="cursoron"><span @click="removecomment(commentsofpostdata._id)" ><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
          </template>
        </template> -->



      <template v-if="(commentsofpostdata.commentby.unique_id==currentuser || commpermission.indexOf(currentuserdata.role)>=0) && commentsofpostdata.questionid==null">
        <!-- <template v-if="commentsofpostdata.commentby.unique_id==currentuser || currentuserdata.role==1"> -->
         <template v-if="commentsofpostdata.settingflag==false">
    <li class="cursoron"><span  @click="commentsofpostdata.settingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
       </template>
       <template v-else>
        <li class="cursoron"><span  @click="editComment(questionindex,commindex)"><img src="../assets/icons/edit.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
        <li class="cursoron"><span  @click="removecomment(commentsofpostdata._id)"><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
       </template>
      </template>
      </ul>
    </div>
 <div class="replyfield" v-if="replyflagR==commentsofpostdata._id">
      <span class="comm_current_user reply_field"><img :src="currentuserdata.profile" class="circle_image circle_image2"></span>
      <span @click="addReply(questionindex,question._id,commentsofpostdata._id,commentsofpostdata._id)" class="cursoron"><span class="send_svg_icon reply_link2">Reply</span></span>
      <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" ></textarea>

  </div>
</div>

  <div class="chats second_chats" v-for="(commentsofpost_reply,crindex) in commentsofpostdata.commentofcomment">
    <img :src="commentsofpost_reply.commentby_n.profile" class=" user_circle"> <p class="usernmechats">{{commentsofpost_reply.commentby_n.firstname}} {{commentsofpost_reply.commentby_n.lastname}}</p>
    <div class="chatter">
      <div v-if="commentsofpost_reply.parentcontent.length >0" class="bg_part">
        <img src="../assets/images/left-quote.svg" class="big_svg" />

        <span class="reply_on_comnt "  v-if=" commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.parentcontent[0].content"></span>
        <template v-if="commentsofpost_reply.parentcontent[0].asynccheck==true">
        <span class="date_time_of_cmt" v-if="commentsofpost_reply.parentcontent[0].dummyname==null"> Anonymous, {{commentsofpost_reply.parentcontent[0].created_at | postsumDate }} </span>
        <span class="date_time_of_cmt" v-else> {{commentsofpost_reply.parentcontent[0].dummyname}}, {{commentsofpost_reply.parentcontent[0].created_at | postsumDate }} </span>
        </template>
        <template v-else>
         <span class="date_time_of_cmt"> {{commentsofpost_reply.parentcontent[0].replyby.firstname}} {{commentsofpost_reply.parentcontent[0].replyby.lastname}}, {{commentsofpost_reply.parentcontent[0].created_at | postsumDate }} </span>
        </template>
        <span class="reply_on_comnt_reply" v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.content"></span>
        <span v-else>
        <span  @click="updateEditReply(questionindex,commindex,crindex,commentsofpost_reply._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
        <textarea v-model="commentsofpost_reply.content" class="add_newcomment" @keydown="focusflag==false">{{commentsofpost_reply.content}}</textarea></span>
      </div>
      <div v-else>
        <!-- <img src="../assets/images/left-quote.svg" class="big_svg" />
        <span class="reply_on_comnt "  v-if="commentsofpost_reply.parentcontent.length && commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.parentcontent[0].content"></span>
        <span class="date_time_of_cmt"> {{commentsofpost_reply.parentcontent[0].replyby.firstname}} {{commentsofpost_reply.parentcontent[0].replyby.lastname}}, {{commentsofpost_reply.parentcontent[0].created_at | postsumDate }} </span> -->

        <span class="" v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.content"></span>
        <span v-else>
        <span  @click="updateEditReply(questionindex,commindex,crindex,commentsofpost_reply._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
        <textarea v-model="commentsofpost_reply.content" class="add_newcomment" @keydown="focusflag==false">{{commentsofpost_reply.content}}</textarea></span>
      </div>

       <!-- <div class="read_more" v-if="commentsofpostdata.asynccheck==true" > <a href=""></a></div>-->
      <div class="last_li date_right">{{ commentsofpost_reply.created_at | postsumDate}}</div>
      <ul class="sharelinks_chaatter">
        <li class="cursoron" v-if="commentsofpost_reply.likestatus == 0"><span @click="comlikeanddislike(commentsofpost_reply._id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /></span><span v-if="commentsofpost_reply.likes>0" class="cursoron" @click="showcommentlikers(commentsofpost_reply._id)">{{commentsofpost_reply.likes}}</span></li>

        <li class="cursoron" v-if="commentsofpost_reply.likestatus == 1"><span @click="comlikeanddislike(commentsofpost_reply._id,0)">
          <img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="commentsofpost_reply.likes>0" class="cursoron" @click="showcommentlikers(commentsofpost_reply._id)">{{commentsofpost_reply.likes}}</span></li>
        <li class="comment_li cursoron" @click=showCommReply(commentsofpostdata._id,commentsofpost_reply._id)><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon"/></li>


       <!-- 30/09/2019 -->


        <!-- <template v-if="(commentsofpostdata.commentby.unique_id==currentuser || commpermission.indexOf(currentuserdata.role)>=0) && commentsofpostdata.questionid==null">
          <template v-if="commentsofpostdata.settingflag==false">
            <li class="cursoron"><span  @click="commentsofpostdata.settingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
          </template>
          <template v-else>
            <li class="cursoron"><span @click="editReply(questionindex,commindex,crindex)" ><img src="../assets/icons/edit.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
            <li class="cursoron"><span @click="removeReply(commentsofpostdata._id)" ><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
          </template>
        </template> -->



      <template v-if="(commentsofpostdata.commentby.unique_id==currentuser || commpermission.indexOf(currentuserdata.role)>=0) && commentsofpostdata.questionid==null">
       <!-- <template v-if="commentsofpost_reply.commentby_n.unique_id==currentuser || currentuserdata.role ==1"> -->
            <template v-if="commentsofpost_reply.rsettingflag==false">
              <li class="cursoron"><span  @click="commentsofpost_reply.rsettingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
            </template>
            <template v-else>
              <li class="cursoron"><span  @click="editReply(questionindex,commindex,crindex)"><img src="../assets/icons/edit.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
              <li class="cursoron"><span @click="removeReply(commentsofpost_reply._id)"><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
            </template>
        </template>
         <!-- <li class="last_li">{{ commentsofpost_reply.created_at | postsumDate}}</li> -->
      </ul>
    </div>
  <div class="replyfield" v-if="replyflagR==commentsofpost_reply._id">
    <span class="comm_current_user reply_field"><img :src="currentuserdata.profile" class="circle_image circle_image2"></span>
    <span @click="addReply(questionindex,question._id,commentsofpostdata._id,commentsofpost_reply._id)" class="cursoron"><span class="send_svg_icon reply_link2">Reply</span></span>
      <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" ></textarea>

  </div>

  </div>
</div>
<div class="commentfield question_commentfiled" >
<!-- <div class="commentfield" v-if="replyflag != post_id"> -->
<span class="comm_current_user commemt_user1"><img :src="currentuserdata.profile" class="circle_image"></span>
<textarea v-model="question.new_comment" ref="comment_box" class="add_newcomment" placeholder="Please comment here" @keydown="focusflag=false" ></textarea>
<div v-if="freeze" class="independant_buton">
<span @click="addComment(questionindex,question._id)" class="cursoron"><span class="send_svg_icon add_comment1">Add</span></span>
</div>
<div class="async_previw">
<input v-if="question.anonymouscheck" type="text" v-model="question.dummyname" class="dummy_name" placeholder="Anonymous name (optional)"/>
<label class="Anonymous_label">
<input type="checkbox" v-model="question.anonymouscheck" />
<span>Anonymous Mode</span>
</label></div><!--button_previw-->
</div>
</div>
</div>
</div>
</div><!---question_preview--->

 </div>
 <input v-model="hiddenm" type="text" ref="last" class="focusitem">
</div>

</div>

    <!--selection_section-->
    <v-dialog
      v-model="postliker"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2 "
          primary-title
        >

        <div class="like_pop col-md-12">

<img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /><span>{{postlikers.length}}</span>
</div>
          <span class="crosspopup" @click="postliker=false">x</span>
        </v-card-title>


<div class="clearfix"></div>
<div v-for="postlikerdata in postlikers" class="main_pop_wrapper">
<div class="pop_wrapper">
<div class="col-md-2 pop_user_outer">
<img :src="postlikerdata.likebyuser.profile" class="pop_user">
</div>
<div class="col-md-8 pop_name_outer">
<p class="pop_name">{{postlikerdata.likebyuser.firstname}} {{postlikerdata.likebyuser.lastname}}</p>
</div>
</div>
<div class="clearfix"></div>
</div>
</v-card>
</v-dialog>

   <!-- for resource module -->
<template v-if="resourceModule.length > 0">
<div class="bottom_articles">
  <div class="col-sm-12">
  <div class="more_heading_article" id="resource"> Resources</div>
  <div v-for="item in resourceModule" :key="item._id">
  <div v-if="item.resources.media_type !== null || item.resources.linkpreviewdata !== null">
    <div class="col-sm-3">
      <div class="img_Section" v-if="item.resources.media_type !== null && item.resources.media_type.includes('image')">
      <img :src="fileurl+item.resources.content_path" class="bottom_article_image recent_article_thumb">
      </div>
      <div class="img_Section" v-else-if="item.resources.media_type !== null && item.resources.media_type.includes('application') && item.resources.siteUrl==null">
        <a class="bottom_article_image recent_article_thumb" :href="fileurl+item.resources.content_path" target="_blank"> <pdf :src="fileurl+item.resources.content_path" ></pdf></a>
      </div>
       <div v-else-if="item.resources.media_type == null && item.resources.linkpreviewdata !== null">
       <div v-if="item.resources.siteUrl !== null">
            <a :href="item.resources.siteUrl" class="cursoron" target="_blank">
              <div class="recreation" >

                <div class="contents" v-if="item.resources.linkpreviewdata.host !== null">
                  <h4>{{item.resources.linkpreviewdata.host}}</h4>
                </div>
                  <div class="image" v-if="item.resources.linkpreviewdata.imgs.length>0">
                    <img :src="item.resources.linkpreviewdata.imgs[0]" />
                  </div>
                <div class="recreation_content" v-if="item.resources.linkpreviewdata.des !== null && item.resources.linkpreviewdata.des !== 'error'">
                  <p>{{item.resources.linkpreviewdata.des}}</p>
                </div>
                <div class="recreation_content" v-else>
                  <p>link might be corrupted </p>
                </div>
              </div>
            </a>
          </div>
        </div>
    </div>
    </div>
  </div>
</div>
</div>
<br>
</template>

<div v-if="summarycheck" id ="summary">
 <div class="more_heading_article">Summary</div>
  <div v-if="summarydata.summary_content!=null" v-html="summarydata.summary_content"></div>
  <span v-if="summarydata.uploaded_file.length>0" v-for="(secarticleimg, secarticleimgindex) in  summarydata.uploaded_file">
<template v-if="secarticleimg">
<a :href="fileurl+secarticleimg" target="_blank" v-if="secarticleimg.toLowerCase().indexOf('.pdf') >= 0"><pdf :src="fileurl+secarticleimg" ></pdf></a>
<img :src="fileurl+secarticleimg" class="article_page_image" v-if="secarticleimg.toLowerCase().indexOf('.pdf') < 0">
</template>
</span>
<div v-if="summarydata.summary_text!=null" v-html="summarydata.summary_text"></div>
</div>

    <v-dialog
      v-model="commentliker"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >

        <div class="like_pop col-md-12">

<img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /><span>{{commentlikers.length}}</span>
</div>
          <span class="crosspopup" @click="commentliker=false">x</span>
        </v-card-title>


<div class="clearfix"></div>
<div v-for="commentlikerdata in commentlikers" class="main_pop_wrapper">
<div class="pop_wrapper">
<div class="col-md-2 pop_user_outer">
<img :src="commentlikerdata.likebyuser.profile" class="pop_user">
</div>
<div class="col-md-8 pop_name_outer">
<p class="pop_name">{{commentlikerdata.likebyuser.firstname}} {{commentlikerdata.likebyuser.lastname}}</p>
</div>
</div>
<div class="clearfix"></div>
</div>
      </v-card>
    </v-dialog>

   </v-container>


</template>
</template>
<script>
$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop() ;
			$('.main_coverdiv').each(function(i) {
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

//  window.addEventListener("load", function(event) {
//    console.log('first');
//     $('#5d8c6ced02e7b62d402e041a').focus();
//   });


import tinymce from 'vue-tinymce-editor'
import pdf from 'vue-pdf'
var username=localStorage.username;
import LinkPrevue from 'link-prevue'

  export default {
      components: {tinymce,pdf, LinkPrevue},
    data(){
       return {
         focusflag:true,
         questiondata:[],
         version:null,
         fileurl:window.publicfileurl,
         masterquestion:null,
         currentuser:null,
         tagdata:[],
         answerflag:false,
         postdata:'',
           postliker:false,
      postlikers:[],
      post_id:null,
      commentsofpost:[],
      comment_flag:false,
      currentuserdata:[],
      comment:null,
      reply_commentid:null,
      replyoncomment:null,
      commentliker:false,
      commentlikers:[],
      replyflag:null,
      replyflagR:null,
      anonymouscheck:false,
      scurrenttime:null,
      dummyname:null,
      showerror:false,
      hiddenm:null,
      questiontype:'5d15fea98edfed6c417592d14',
      rolespermission:['1','2','7','11','12','14','15','18','19'],
      commpermission:['1','2','18','19'],
      anonymousimags:['/icons/anonymoususer_1.svg'],
      questionLabels:'',
      summarycheck:false,
      summarydata:null,
      resourcecheck:false,
      resourceModule: [],
      freeze: true

       }
    },
    methods:{
 //      submitcaseanswer(){
 //        console.log('question submit before'+this.anonymouscheck);
 //   axios.post(`/casequestionanswer`,{dummyname:this.dummyname,scurrenttime:this.scurrenttime,anonymouscheck:this.anonymouscheck,questionid:this.masterquestion,createdby:this.currentuser,answerdata:this.questiondata})
 //          .then(response => {
 // console.log('question submit after');
 //            this.getquestiondata();
 //             this.updateComments();
 //          })
 //      },
      submitcaseanswer()
      {

          var i=0;
           this.answevalidation=[];
           // this.answererror=[];
          for(i=0;i<this.questiondata.length;i++)
          {
            if(this.questiondata[i].answerid.length>0 || (this.questiondata[i].answertext!=null && this.questiondata[i].answertext!='')|| this.questiondata[i].question_options.length==0)
            {
              console.log('if')
              this.questiondata[i].error='';
            }
            else
            {
              console.log('else')
              this.questiondata[i].error="Please add answer for this question";
              this.answevalidation.push(this.questiondata[i]._id);
              // this.answererror.push(this.questiondata[i]._id);
            }
          }
          console.log('question submit before'+this.anonymouscheck);
          console.log('error-'+this.answevalidation);
          if(this.answevalidation.length==0)
          {
            this.showerror=false;
            axios.post(`/casequestionanswer`,{dummyname:this.dummyname,scurrenttime:this.scurrenttime,anonymouscheck:this.anonymouscheck,questionid:this.masterquestion,createdby:this.currentuser,answerdata:this.questiondata})
            .then(response =>
            {
              console.log('question submit after');
              this.getquestiondata();
              this.updateComments();
            })
          }
          else
          {
            this.showerror=true;
          }
      },
      getquestiondata(){
        axios.post(`/getcasequestionforanswer`,{"questionid":this.masterquestion,"loginid":this.currentuser})
    .then(response => {
 this.questiondata=response.data;
 this.version=this.questiondata[0].version
 this.tagdata=this.questiondata[0].tagdata
 this.answerflag=this.questiondata[0].answered
  axios.post(`/getquestionpostdata`,{"questionid":this.masterquestion,"loginid":this.currentuser})
    .then(postresponse => {
 this.postdata=postresponse.data[0];
 this.post_id=postresponse.data[0].unique_id
    }).catch(e => {
      this.errors.push(e)
    })
    })
    .catch(e => {
      this.errors.push(e)
    })
      },
       showcommentlikers(id){
        console.log('cid-',id)
      this.getcommlikers(id);
      this.commentliker=true;
    },
    removecomment(id){
  axios.post(`/removecasecomment`,{"id":id})
    .then(removeresponse => {
this.getquestiondata();
    }).catch(e => {
      this.errors.push(e)
    })
    },
    showCommReply(pCommentid,commentid){
       if(this.replyflagR!==commentid){
        this.replyflagR=commentid
        this.reply_commentid=commentid
       }else{
        this.replyflagR=null
       }
      },
      editReply(questionindex,commentindex,replyindex)
      {

          console.log('replyindex-',replyindex)
          this.questiondata[questionindex].comments[commentindex].commentofcomment[replyindex].reditflag=true;

      },
      updateEditReply(questionindex,commentindex,replyindex,replyid)
      {
          this.editedreply=this.questiondata[questionindex].comments[commentindex].commentofcomment[replyindex].content;
          console.log('rec-',this.editedcomment)
          console.log('ruser-',this.currentuser)
          axios.post(`/updatecasecomment`,{id:replyid,content:this.editedreply, createdby:this.currentuser})
          .then(response => {
            console.log(response.data)
            this.questiondata[questionindex].comments[commentindex].commentofcomment[replyindex].reditflag=false;
            this.updateComments()
          });
      },
      removeReply(id)
      {
         axios.post(`/removecasecomment`,{"id":id})
    .then(removeresponse => {
this.getquestiondata();
    }).catch(e => {
      this.errors.push(e)
    })
      },
     async getcommlikers(id){
      await axios.post(`/getcasecommentlikers`,{'commentid':id})
      .then(response => {
        this.commentlikers=response.data;
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
      addComment(questionindex,questionid)
      {
        this.comment=this.questiondata[questionindex].new_comment;
        this.anonymouscheck=this.questiondata[questionindex].anonymouscheck;
        this.dummyname=this.questiondata[questionindex].dummyname;
        if(this.comment!=null && this.comment.trim())
        {
        this.freeze = false
          axios.post(`/addcasecomment`,{'title':this.questiondata[0].q_title,asynccheck:this.anonymouscheck,dummyname:this.dummyname,postid:this.post_id,content:this.comment,questionid:questionid,parentqid:this.masterquestion,commentid:null,replyid:null,createdby:this.currentuser})
          .then(response => {
            //             axios.post('/setpostcommentnotification',{"weburl":'caseofweekanswer',"appurl":'',"targetid":this.masterquestion,"q_type":this.questiontype,"title":null,"questionid":this.masterquestion,postid:this.post_id,createdby:this.currentuser})
            //         .then((notiresponse)=>{
            // console.log(notiresponse);
            //            // location.reload();

            //         })
            //         .catch((error)=>{
            //             console.log(error);
            //         })
                        this.getquestiondata();
                        this.comment=null
                        this.freeze = true
          })
        }
      },
       showReply(questionindex,questionid,commentid){
       if(this.replyflagR!==commentid){
        this.replyflagR=commentid
        this.reply_commentid=commentid
       }else{
        this.replyflagR=null
       }
      },
      addReply(questionindex,questionid,commentid,replyid)
      {
        if(this.replyoncomment!=null && this.replyoncomment.trim())
        {
         axios.post(`/addcasecomment`,{asynccheck:false,dummyname:null,postid:this.post_id,content:this.replyoncomment,questionid:questionid,parentqid:this.masterquestion,commentid:commentid,replyid:replyid,createdby:this.currentuser})
          .then(response => {
            this.getquestiondata();
            this.replyoncomment=null
            this.replyflag=false;
            this.reply_commentid=null;
           this.replyflagR=null;
          })
        }
      },
       comlikeanddislike(commentid,status){
      console.log(commentid);
      console.log(status);
  axios.post(`/caselikedislikecomment`,{'commentid':commentid,'likeby':this.currentuser,'status':status})
    .then(response => {
      console.log(response)
this.getquestiondata();
this.updateComments();
    });
    },
      setFocus(reference){
        console.log(this.$refs);
        this.$refs[reference][0].focus();
      },
    likeanddislike(postid,status){
      console.log(postid);
  axios.post(`/likedislikepost`,{'postid':postid,'likeby':this.currentuser,'status':status})
    .then(response => {
      console.log(response)
      if(status==1){
      axios.post('/setpostlikenotification',{"weburl":'caseofweekanswer',"appurl":'',"targetid":this.masterquestion,"q_type":this.questiontype,"title":null,"questionid":this.masterquestion,postid:postid,createdby:this.currentuser})
        .then((notiresponse)=>{
console.log(notiresponse);
           // location.reload();

        })
        .catch((error)=>{
            console.log(error);
        })
      }
      // JSON responses are automatically parsed.
      this.getquestiondata();
    });
    },
     savePost(postid,status)
      {
       // alert(postid+' '+status)
        axios.post(`/savePost`,{'postid':postid, 'created_by':this.currentuser, 'status':status})
          .then(response => {
            console.log(response)
              this.getquestiondata();
          })
          .catch((error)=>{
            console.log(error);
        })

      },
     async updateComments(){
      this.freeze = false
     await axios.post(`/getcommentsofpost`,{'postid':this.post_id, loginid:this.currentuser})
    .then(response => {
      console.log(response.data)
     this.commentsofpost=response.data;
    this.freeze = true

    })
    .catch(e => {
      this.errors.push(e)
    })
      },
      showlikers(id){
        this.getlikers(id);
      this.postliker=true;
      },
      editComment(questionindex,commentindex){
        this.questiondata[questionindex].comments[commentindex].editflag=true;
      },
      updateComment(questionindex,commentindex,id){
        console.log('commentid'+id);
         this.comment=this.questiondata[questionindex].comments[commentindex].content;
        if(this.comment!=null && this.comment.trim())
        {
          axios.post(`/updatecasecomment`,{'id':id,content:this.comment,createdby:this.currentuser})
          .then(response => {
            this.getquestiondata();
            this.comment=null
          })
        }


      },
       async getlikers(id){
        await axios.post(`/getpostlikers`,{'postid':id})
    .then(response => {
      // JSON responses are automatically parsed.
     this.postlikers=response.data;

    })
    .catch(e => {
      this.errors.push(e)
    })
      },
    },
     created(){
       this.scurrenttime=Date.now();
this.masterquestion=this.$route.query.id
axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuser = response.data.unique_id
      this.currentuserdata = response.data
      axios.post(`/getcasequestionforanswer`,{"questionid":this.masterquestion,"loginid":this.currentuser})
    .then(response => {
      console.log('question data',response);
 this.questiondata=response.data;
 this.version=this.questiondata[0].version
 this.tagdata=this.questiondata[0].tagdata
 this.answerflag=this.questiondata[0].answered
  axios.post(`/getquestionpostdata`,{"questionid":this.masterquestion,"loginid":this.currentuser})
    .then(postresponse => {
      console.log('post data',postresponse);
 this.postdata=postresponse.data[0];
 this.post_id=postresponse.data[0].unique_id
this.updateComments();
    }).catch(e => {
      this.errors.push(e)
    })
    }),
    axios.post(`/setquestionview`,{"questionid":this.masterquestion,"userid":this.currentuser,"source":0})
    .then(questionview => {
console.log('views ',questionview);
    }).catch(e => {
      this.errors.push(e)
    })
    .catch(e => {
      this.errors.push(e)
    })
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getmodulelabels`,{"moduleid":"5d3adc638d12005fca96d3fe"})
    .then(response => {
      this.questionLabels=response.data;
    console.log('module ',this.postLabels)
    })
    .catch(e => {
      this.errors.push(e)
    })

    axios.post(`/getquestionsummary`,{"questionid":this.masterquestion})
    .then(response => {
      console.log(response.data);
      this.summarydata=response.data;
      if(response.data!==null){
      this.summarycheck=true;
      }
    })

    axios.post(`/answerreltedresourcesdata`,{"questionId":this.masterquestion})
      .then(response => {
        if(response.data.data.length>0){
        this.resourceModule = response.data.data;
        this.resourcecheck=true;
        }
        }).catch(e => {
            this.errors.push(e)
        })
    },

    updated() {
      console.log('mount');
      console.log(this.$refs);
      if(this.focusflag){
        if(this.$route.query.subid){
    this.setFocus(this.$route.query.subid);
    this.focusflag=false;
        }else{
this.$refs['last'].focus();
this.focusflag=false;
        }

      }
     // this.$refs['5d8c6ced02e7b62d402e041a'].focus();
    },
  }
   $(document).on('click', 'span > a.container_link', function(){
      $('span > a.container_link').removeClass('highlight');
      $(this).addClass('highlight');
    })
</script>

<style>

.highlight{
  color: black !important
}

div#summary {
    display: inline-block;
}
</style>
