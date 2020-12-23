<template>
<v-container qustionans>
<div class="col-sm-12">
    <div class="col-sm-3 sticky-position">
      <div class="sticky_left_submitter" id="stick" >
       
        <!--<p v-if="submitter.firstname">Answered by {{submitter.firstname+' '+submitter.lastname}}</p> -->
        </div>
    <div class= "left_article" >
    <span v-for="(qdata, qindex) in questiondata">
        <a  class="container_link" :href="`#${qdata._id}`" v-if="qdata.question_text!=null && qdata.question_text!=''">Question {{qindex+1}}</a> 
   </span>
            <ul class="article_social_icons">
                <li class="cursoron"> <img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" v-if="postdata.likestatus==0"  @click="likeanddislike(postdata.unique_id,1)"><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" v-if="postdata.likestatus!=0"  @click="likeanddislike(postdata.unique_id,0)"> <span v-if="postdata.likes>0" @click="showlikers(postdata.unique_id)"> {{postdata.likes}} </span></li>
                <li class="cursoron" @click="setFocus('comment_box')"> <img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth"> <span v-if="postdata.allcomments.length>0"> {{postdata.allcomments.length}} </span></li>
                <li class="cursoron"> <img src="../assets/icons/retweet-light.svg" class="fa_svg_icon extraimgwidth"> <span>  </span></li>
                <li class="cursoron"> <img src="../assets/icons/bookmark-light.svg" class="fa_svg_icon bookamrktwidth" v-if="postdata.allsaveposts==0" @click="savePost(postdata.unique_id,0)"> <img src="../assets/icons/bookmark_red.svg" class="fa_svg_icon bookamrktwidth" v-if="postdata.allsaveposts==1" @click="savePost(postdata.unique_id,1)"><span></span></li>
            </ul>
    </div>
    </div>
<div class="col-sm-7  question_preview qstans">

<div class="first_title">
<img src="../assets/icons/question-square-solid_green.svg" class="ques_icon" />
<p class="first_roe">{{version}}</p>
</div><!--first_title-->

<div class="buttons_group" >
  <template v-for="(tag, tindex) in tagdata">
    <button  v-if="tag.questionvisible==true" v-bind:key="`tags${tindex}`" class="btn btn_one">{{tag.tagname}}</button>
  </template>
</div>
<div v-for="(question,questionindex) in questiondata" class="main_coverdiv" v-bind:id="`${question._id}`"> 

<div class="second_title">
<p class="stem_headingg" v-html="question.stem_text"></p>
<template v-if="question.uploadedstem_file">
<a :href="fileurl+question.uploadedstem_file" target="_blank" v-if="question.uploadedstem_file!=null && question.uploadedstem_file.toLowerCase().indexOf('.pdf') >= 0 "><pdf :src="fileurl+question.uploadedstem_file"  ></pdf></a>
<img :src="fileurl+question.uploadedstem_file" class="img-responsive title_imageprview" v-if="question.uploadedstem_file!=null && question.uploadedstem_file.toLowerCase().indexOf('.pdf') < 0 ">
</template>
<div class="qusans_series"><b class="qusans_no">Question {{questionindex+1}}. </b><b v-html="question.question_text" class="qusans_qus"></b></div>
<div v-if="question.instruction_text">
<p class="qusans_inst">Instructions</p>
<p class="sub_headingg" v-html="question.instruction_text"></p>
</div>

</div><!--second_title-->
<template v-if="question.hero_img">

<a :href="fileurl+question.hero_img" target="_blank" v-if="question.hero_img!=null && question.hero_img.toLowerCase().indexOf('.pdf') >= 0 "><pdf :src="fileurl+question.hero_img" ></pdf></a>
<img :src="fileurl+question.hero_img" class="img-responsive title_imageprview" v-if="question.hero_img!=null && question.hero_img.toLowerCase().indexOf('.pdf') < 0 ">

</template>
<img src="../assets/images/slider.png" class="img-responsive title_imageprview" v-if="question.hero_img==null && question.imagevisibility==true" /> 
<div class="qus_textarea gapbottom_qus">
<div v-if="question.option_type==1 && answerflag==false">
    <label class="radio-inline kfpradio_label padding_radio" v-for="(question_option,qo_index) in question.question_options">
      <input type="radio" class="radiosize" v-model="question.answerid" v-bind:key="`optradio${questionindex}${qo_index}`" :value="question_option._id">{{question_option.option_text}}
    </label>
</div>
<div v-if="question.option_type==2 && answerflag==false">
    <label class="radio-inline kfpradio_label" v-for="(question_option,qo_index) in question.question_options">
      <input type="checkbox" class="radiosize" v-model="question.answerid"  :value="question_option._id" :id="question_option._id">{{question_option.option_text}}
    </label>
</div>
<div v-if="question.option_type==1 && answerflag==true">
    <label class="radio-inline kfpradio_label" v-for="(question_option,qo_index) in question.question_options">
    <span  class="kfpblankline_span kfpblankline_span_empty" v-if="question_option.answervalue==0  && question_option._id != question.answerid""><img src="../assets/icons/radio-on-button.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{question_option.option_text}}</p></span>
       <span class="kfpblankline_span kfpblankline_span_wrong" v-if="question_option.answervalue==0 && question_option._id == question.answerid"><img src="../assets/icons/dot-circle_incorrect.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{question_option.option_text}}</p>
<span class="wrong_button">
<button class="button wrong_btn">Incorrect</button>
</span>
<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_wrong">Your Answer</button>
</span></span>
<span class="kfpblankline_span kfpblankline_span_correct" v-if="question_option.answervalue=='true' && question_option._id == question.answerid"><img src="../assets/icons/dot-circle_correct.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{question_option.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span>
<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_right">Your Answer</button>
</span></span>
<span class="kfpblankline_span kfpblankline_span_correct" v-if="question_option.answervalue=='true'  && question_option._id != question.answerid"><img src="../assets/icons/radio-on-button.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{question_option.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span></span>
    </label>
</div>
<div v-if="question.option_type==2 && answerflag==true">
    <label class="radio-inline kfpradio_label" v-for="(question_option,qo_index) in question.question_options">
<span class="kfpblankline_span  kfpblankline_span_empty" v-if="question_option.answervalue==0 && question.answerid.split(',').indexOf(question_option._id)<0"><img src="../assets/icons/checkbox_empty.svg" class="fa_svg_answer" /><p class="empty_title">{{question_option.option_text}}</p></span>
<span class="kfpblankline_span kfpblankline_span_correct" v-if="question_option.answervalue==true && question.answerid.split(',').indexOf(question_option._id)>=0">
<img src="../assets/icons/rightanswer.svg" class="fa_svg_answer" />
<p class="empty_title">{{question_option.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span>
<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_right">Your Answer</button>
</span>
</span>
<span class="kfpblankline_span kfpblankline_span_correct" v-if="question_option.answervalue==true &&  question.answerid.split(',').indexOf(question_option._id)<0">
<img src="../assets/icons/checkbox_empty.svg" class="fa_svg_answer" />
<p class="empty_title">{{question_option.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span>
</span>
<span class="kfpblankline_span kfpblankline_span_wrong" v-if="question_option.answervalue==0 &&  question.answerid.split(',').indexOf(question_option._id)>=0"><img src="../assets/icons/wronganswer.svg" class="fa_svg_answer" /><p class="empty_title">{{question_option.option_text}}</p>
<span class="wrong_button">
<button class="button wrong_btn">Incorrect</button>
</span>
<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_wrong">Your Answer</button>
</span>
</span>
    </label>
</div>
<div class="text_areatitle" v-if="answerflag==true && question.question_options.length<=0">
<p class="text_answerheading">Answer</p>
<p class="text_areaheading green_bg_text" v-html="question.answertext"></p>
</div>
<tinymce v-if="question.question_options.length==0 && answerflag==false" v-bind:id="`answer_text${questionindex}`" v-model="question.answertext" v-bind:key="`answer_text${questionindex}`" :other_options="spelloptions"></tinymce>
<br />
<div class="answer_explantion" v-if="question.answered==true && question.answer_key!=null && question.answer_key!=''">
<p class="a_explntn">Answer Key</p>
<p class="sub_explanation answer_bottom_borders" v-html="question.answer_key"></p>
</div><!--answer_explantion-->
<div class="answer_explantion" v-if="question.answered==true && question.answer_explanation!=null && question.answer_explanation!=''">
<p class="a_explntn">Answer Explanation</p>
<p class="sub_explanation answer_bottom_borders" v-html="question.answer_explanation"></p>
</div><!--answer_explantion-->
</div>

</div><!---question_preview--->



<div class="button_previw" v-if="answerflag==false">
<label class="Anonymous_label">
<input type="checkbox" v-model="anonymouscheck" />
<span>Anonymous Answer</span>
</label><button class="btn q_prvw_sbmtbtn" type="button" @click="submitstudentanswer">Submit</button></div><!--button_previw-->
</div>
</div>
    <!--selection_section-->
 <div class="col-xs-12 col-sm-12">
                     <div class="article_commentsection">
                         <div class="more_heading_article"> Feedback </div>
     

 
    <div  v-for="(commentsofpostdata,commindex) in commentsofpost" v-if="commentsofpostdata.commentby.unique_id==masteruserid && commentsofpostdata.questionid!=null">

  <div class="chats">
  <span v-if="commentsofpostdata.asynccheck==true && commentsofpostdata.commentby.unique_id!=currentuser">
  <template v-if="commentsofpostdata.dummyprofile!=null && commentsofpostdata.dummyprofile!=''">
  <img v-bind:src="fileurl+commentsofpostdata.dummyprofile" ref="random_user" class=" user_circle"> 
  </template>
  <template v-else>
  <img v-bind:src="fileurl+anonymousimags[0]" ref="random_user" class=" user_circle"> 
  </template>
   <p class="usernmechats">
    <span v-if="commentsofpostdata.dummyname!=null && commentsofpostdata.dummyname!=''">{{commentsofpostdata.dummyname}}</span>
    <span v-else>Anonymous</span> <span class="yourcase_button" v-if="commentsofpostdata.commentby.unique_id==currentuser && commentsofpostdata.editflag==false">
<button class="button youranswer_btn youranswer_button_wrong">Your Answer</button>
</span></p>
 </span>
  <span v-else>
    <img :src="commentsofpostdata.commentby.profile" class=" user_circle"> <p class="usernmechats">{{commentsofpostdata.commentby.firstname}} {{commentsofpostdata.commentby.lastname}}</p>
 </span>
 
    <div class="chatter">



    <span v-if="commentsofpostdata.editflag==false" v-html="commentsofpostdata.content"></span>

    <span v-else>
    <span  @click="updateEditComment(commindex,commentsofpostdata._id)" class="cursoron">
    <span class="send_svg_icon add_comment1">Update</span>
    </span>
    <textarea v-model="commentsofpostdata.content" class="add_newcomment" >{{commentsofpostdata.content}}</textarea></span>


     <div class="read_more" v-if="commentsofpostdata.questionid!=null && commentsofpostdata.editflag==false" > <a :href="`/userquestionanswer?qid=${masterquestion}&uid=${commentsofpostdata.commentby.unique_id}`" target="_BLANK">Read The Answer</a></div>
  <div class="last_li date_right">{{ commentsofpostdata.created_at | postsumDate}}</div>

      <ul class="sharelinks_chaatter">
        <li class="cursoron" v-if="commentsofpostdata.likestatus == 0"><span @click="comlikeanddislike(commentsofpostdata.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" class="cursoron" @click="showcommentlikers(commentsofpostdata.unique_id)">{{commentsofpostdata.likes}}</span></li>

        <li class="cursoron" v-if="commentsofpostdata.likestatus == 1"><span @click="comlikeanddislike(commentsofpostdata.unique_id,0)"><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" class="cursoron" @click="showcommentlikers(commentsofpostdata.unique_id)">{{commentsofpostdata.likes}}</span></li>

        <li class="comment_li cursoron" @click=showReply(post_id,commentsofpostdata.unique_id)><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /><span v-if="commentsofpostdata.commentofcomment.length>0">{{commentsofpostdata.commentofcomment.length}}</span></li>







        <template v-if="(commentsofpostdata.commentby.unique_id==currentuser || commpermission.indexOf(currentuserdata.role)>=0) && commentsofpostdata.questionid==null">
          <template v-if="commentsofpostdata.settingflag==false">
            <li class="cursoron"><span  @click="commentsofpostdata.settingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
          </template>
          <template v-else>
            <li class="cursoron"><span @click="editComment(commindex)" ><img src="../assets/icons/edit.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
            <li class="cursoron"><span @click="removecomment(commentsofpostdata.unique_id)" ><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
          </template>
        </template>
        <template v-if="currentuserdata.role==1 && commentsofpostdata.questionid!=null">
          <template v-if="commentsofpostdata.settingflag==false">
            <li class="cursoron"><span  @click="commentsofpostdata.settingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
          </template>
          <template v-else>
            <li class="cursoron"><span @click="editComment(commindex)" ><img src="../assets/icons/edit.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
            <li class="cursoron"><span @click="removecomment(commentsofpostdata.unique_id)" ><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
          </template>
        </template>





      
      </ul>
    </div>
    <div class="replyfield" v-if="replyflag==commentsofpostdata.unique_id">
      <span class="comm_current_user reply_field"><img :src="currentuserdata.profile" class="circle_image"></span>
      <span @click="addReply(commentsofpostdata.unique_id)" class="cursoron"><span class="send_svg_icon reply_link1">Reply</span></span>
      <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" ></textarea>
    </div>
</div>
  <div class="chats second_chats" v-for="(commentsofpost_reply,crindex) in commentsofpostdata.commentofcomment">
    <img :src="commentsofpost_reply.commentby_n.profile" class=" user_circle"> <p class="usernmechats">{{commentsofpost_reply.commentby_n.firstname}} {{commentsofpost_reply.commentby_n.lastname}}</p>
    <div class="chatter">
    <span v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.content"></span>



    <span v-else>
    <span  @click="updateEditReply(commindex,crindex,commentsofpost_reply._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
    <textarea v-model="commentsofpost_reply.content" class="add_newcomment" >{{commentsofpost_reply.content}}</textarea></span>




       <!-- <div class="read_more" v-if="commentsofpostdata.asynccheck==true" > <a href="">More </a></div>-->
      <div class="last_li date_right">{{ commentsofpost_reply.created_at | postsumDate}}</div>
      <ul class="sharelinks_chaatter">
        <li class="cursoron" v-if="commentsofpost_reply.likestatus == 0"><span @click="comlikeanddislike(commentsofpost_reply.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /></span><span v-if="commentsofpost_reply.likes>0" class="cursoron" @click="showcommentlikers(commentsofpost_reply.unique_id)">{{commentsofpost_reply.likes}}</span></li>

        <li class="cursoron" v-if="commentsofpost_reply.likestatus == 1"><span @click="comlikeanddislike(commentsofpost_reply.unique_id,0)">
          <img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="commentsofpost_reply.likes>0" class="cursoron" @click="showcommentlikers(commentsofpost_reply.unique_id)">{{commentsofpost_reply.likes}}</span></li>
        <li class="comment_li cursoron" @click=showCommReply(commentsofpostdata.unique_id,commentsofpost_reply.unique_id)><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth"/></li>





       <template v-if="commentsofpost_reply.commentby_n.unique_id==currentuser || commpermission.indexOf(currentuserdata.role)>=0">
            <template v-if="commentsofpost_reply.rsettingflag==false">
              <li class="cursoron"><span  @click="commentsofpost_reply.rsettingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
            </template>
            <template v-else>
              <li class="cursoron"><span  @click="editReply(commindex,crindex)"><img src="../assets/icons/edit.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
              <li class="cursoron"><span @click="removeReply(commentsofpost_reply._id)"><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
            </template>
        </template>






        <!-- <li class="last_li">{{ commentsofpost_reply.created_at | postsumDate}}</li> -->
      </ul>
    </div>
  <div class="replyfield" v-if="replyflagR==commentsofpost_reply.unique_id">
      <span class="comm_current_user reply_field"><img :src="currentuserdata.profile" class="circle_image circle_image2"></span>
      <span @click="addReply(commentsofpostdata.unique_id)" class="cursoron"><span class="send_svg_icon reply_link2">Reply</span></span>
      <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" ></textarea>

  </div>
  </div>
  <div class="commentfield" >
<!-- <div class="commentfield" v-if="replyflag != post_id"> -->
<span class="comm_current_user commemt_user1"><img :src="currentuserdata.profile" class="circle_image"></span>
<span @click="addComment(commentsofpostdata.unique_id)" class="cursoron"><span class="send_svg_icon add_comment1">Add Comment</span></span>
<textarea v-model="comment" ref="comment_box" class="add_newcomment" placeholder="Please comment here" ></textarea>
</div>
</div>
                    
 

                </div> 
        </div> 

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
<script>
$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop() ;
			$('.main_coverdiv').each(function(i) {
				if ($(this).position().top <= scrollDistance) {
						$('.left_article a.active').removeClass('active');
						$('.left_article a').eq(i).addClass('active');
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
import tinymce from 'vue-tinymce-editor'
import pdf from 'vue-pdf'
var username=localStorage.username;
export default {
  components: {tinymce,pdf},
  data(){
    return {
      questiondata:[],
      version:null,
      fileurl:window.publicfileurl,
      masterquestion:null,
      currentuser:null,
      tagdata:[],
      answerflag:false,
      postdata:'',
      rolespermission:['1','2','7','11','12','14','15','18','19'],
      commpermission:['1','2'],
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
      anonymouscheck:true,
      masteruserid:null,
      submitter:null,
      commentid:null,
      spelloptions:{browser_spellcheck: true},
      errors:[],
      anonymousimags:['/icons/anonymoususer_1.svg'],
    }
  },
  methods:{
    submitstudentanswer()
    {
      console.log('question submit before'+this.anonymouscheck);
      axios.post(`/imgofweekquestionanswer`,{anonymouscheck:this.anonymouscheck,questionid:this.masterquestion,createdby:this.currentuser,answerdata:this.questiondata}).then(response => 
      {
          console.log('question submit after');
          this.getquestiondata();
          this.updateComments();
      })
    },
    getquestiondata()
    {
      axios.post(`/getImgWeekQuestionforanswer`,{"questionid":this.masterquestion,"loggedinuser":this.masteruserid})
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
      }).catch(e => {
          console.log(this.errors)
          this.errors.push(e)
        }) 
    },
    showcommentlikers(id)
    {
      this.getcommlikers(id);
      this.commentliker=true;
    },
    async getcommlikers(id)
    {
      await axios.post(`/getCommentlikers`,{'commentid':id})
      .then(response => {
        this.commentlikers=response.data;
      })
      .catch(e => {
        this.errors.push(e)
      }) 
    },
    addComment(commentid)
    {
        if(this.comment!=null && this.comment.trim())
        {
          axios.post(`/addcomment`,{comment:this.comment,postid:this.post_id,commentid:commentid,createdby:this.currentuser})
          .then(response => {
            this.updateComments();
            this.getquestiondata();
            this.comment=null
          })
        }
    },
    showReply(postid,commentid)
    {
       if(this.replyflag!==commentid){
        this.replyflag=commentid 
        this.reply_commentid=commentid
       }else{
        this.replyflag=null 
       }
    },
    showCommReply(pCommentid,commentid)
    {
       if(this.replyflagR!==commentid){
        this.replyflagR=commentid 
        this.reply_commentid=commentid
       }else{
        this.replyflagR=null 
       }
    },
    editComment(commentindex)
    {
        console.log('commentindex-',commentindex)
        this.commentsofpost[commentindex].editflag=true;        
    },
    updateEditComment(commentindex,commentid)
    {
        
      this.editedcomment=this.commentsofpost[commentindex].content;
      console.log('ec-',this.editedcomment)
      console.log('user-',this.currentuser)
      axios.post(`/updateeditcomment`,{commentid:commentid,content:this.editedcomment, createdby:this.currentuser})
      .then(response => {
        console.log(response.data)
        this.updateComments()
      });
    },
    removecomment( commentid)
    {
      //console.log(postid)
      console.log(commentid)
      axios.post(`/removepostcomment`,{"id":commentid})
      .then(removeresponse => {
        console.log(removeresponse)
        this.updateComments()
      }).catch(e => {
          this.errors.push(e)
        })
    },
    updateEditReply(cindex,replyindex,replyid)
    {
      this.editedreply=this.commentsofpost[cindex].commentofcomment[replyindex].content;
      console.log('rec-',this.editedcomment)
      console.log('ruser-',this.currentuser)
      axios.post(`/updateeditcomment`,{commentid:replyid,content:this.editedreply, createdby:this.currentuser})
      .then(response => {
        console.log(response.data)
        this.updateComments()
      });
    },
    editReply(cindex,replyindex)
    {
      console.log('replyindex-',replyindex)
      this.commentsofpost[cindex].commentofcomment[replyindex].reditflag=true;        
    },
    removeReply(replyid)
    {
      //console.log(rpostid)
      console.log(replyid)
      axios.post(`/removepostcomment`,{"id":replyid})
      .then(removeresponse => {
        console.log(removeresponse)
        this.updateComments()
      }).catch(e => {
          this.errors.push(e)
        })
    },
    addReply(commentofpostid)
    {
        console.log(commentofpostid);
        if(this.replyoncomment!=null && this.replyoncomment.trim())
        {
          axios.post(`/addcomment`,{comment:this.replyoncomment,postid:this.post_id,commentid:commentofpostid,createdby:this.currentuser})
          .then(response => {
            this.updateComments();
            this.getquestiondata();
            this.replyoncomment=null
            this.replyflag=false;
            this.reply_commentid=null;
           this.replyflagR=null;
          })
        }
    },
    comlikeanddislike(commentid,status)
    {
      console.log(commentid);
      console.log(status);
      axios.post(`/likedislikecomment`,{'commentid':commentid,'likeby':this.currentuser,'status':status})
      .then(response => {
        console.log(response)
        this.getquestiondata();
        this.updateComments();
      }); 
    },
    setFocus(reference)
    {
        console.log(this.$refs);
        this.$refs[reference].focus();
    },
    likeanddislike(postid,status)
    {
      console.log(postid);
      axios.post(`/likedislikepost`,{'postid':postid,'likeby':this.currentuser,'status':status})
      .then(response => {
        console.log(response)
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
      }).catch((error)=>{
          console.log(error);
        })
    },
    async updateComments()
    {
      console.log('jhdjhfjdhfjhdjf'+this.post_id);
      await axios.post(`/getcommentsofpost`,{'postid':this.post_id, loginid:this.currentuser})
      .then(response => {
        console.log(response.data)
        this.commentsofpost=response.data;
      }).catch(e => {
          this.errors.push(e)
        }) 
    },
    showlikers(id)
    {
      this.getlikers(id);
      this.postliker=true;
    },
    async getlikers(id)
    {
      await axios.post(`/getpostlikers`,{'postid':id})
      .then(response => {
        this.postlikers=response.data;
      }).catch(e => {
          this.errors.push(e)
        }) 
    },
  },
  created()
  {
      this.masterquestion=this.$route.query.qid
      this.masteruserid=this.$route.query.uid
      console.log(this.masterquestion+' '+this.masteruserid)
      axios.post(`/getcurrentuser`,{'username':username})
      .then(response => 
      {
        // JSON responses are automatically parsed.
        this.currentuser = response.data.unique_id
        this.currentuserdata = response.data
        axios.post(`/getImgWeekQuestionforanswer`,{"questionid":this.masterquestion,"loggedinuser":this.masteruserid})
        .then(response => 
        {
          this.questiondata=response.data;
          this.version=this.questiondata[0].version
          this.tagdata=this.questiondata[0].tagdata
          this.answerflag=this.questiondata[0].answered
          axios.post(`/getquestionpostdata`,{"questionid":this.masterquestion,"loginid":this.currentuser})
          .then(postresponse => {
            this.postdata=postresponse.data[0];
            this.post_id=postresponse.data[0].unique_id
            this.updateComments();
          }).catch(e => {
              this.errors.push(e)
            })
        }).catch(e => {
            this.errors.push(e)
          })
      }).catch(e => {
          this.errors.push(e)
        }),
      axios.post(`/getsingleuser`,{'userid':this.masteruserid})
      .then(uresponse => 
      {
        this.submitter=uresponse.data;
      }).catch(e => {
          this.errors.push(e)
        })
  }
}
</script>
