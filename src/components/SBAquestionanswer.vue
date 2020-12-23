<template>
  <v-container qustionans>
    <div class="col-sm-12">
     <div class="col-sm-3 sticky-position">
        <div class= "left_article">
          <span >
            <a  class="container_link" :id="`sec${questiondata._id}`" :href="`#${questiondata._id}`" v-if="questiondata.question_text!=null && questiondata.question_text!=''">Question </a>
          </span>
          <ul class="article_social_icons">
            <li class="cursoron"> <img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" v-if="postdata.likestatus==0" @click="likeanddislike(postdata.unique_id,1)" ><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" v-if="postdata.likestatus!=0" @click="likeanddislike(postdata.unique_id,0)"> <span v-if="postdata.likes>0" @click="showlikers(postdata.unique_id)"> {{postdata.likes}} </span></li>
            <li class="cursoron" @click="setFocus('comment_box')"> <img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth"> <span v-if="postdata.allcomments.length>0"> {{postdata.allcomments.length}} </span></li>
            <li class="cursoron"> <img src="../assets/icons/retweet-light.svg" class="fa_svg_icon extraimgwidth"> <span>  </span></li>
          </ul>
        </div>
      </div>
      <div class="col-sm-7  question_preview qstans">
        <div class="first_title">
          <img src="../assets/icons/question-square-solid_green.svg" class="ques_icon" /><p class="first_roe">{{version}}</p>
        </div><!--first_title-->
        <!-- <div class="buttons_group" > -->
          <!-- {{tagdata}} -->
          <!-- <template v-for="(tag, tindex) in tagdata">
            <button  v-if="tag.questionvisible==true" v-bind:key="`tags${tindex}`" class="btn btn_one">{{tag.tagname}}</button>
          </template>
        </div> -->
        <div class="main_coverdiv" v-bind:id="`${questiondata._id}`">
          <div class="second_title">
            <h2><b v-html="questiondata.q_title"></b></h2>
            <p class="stem_headingg" v-html="questiondata.stem_text"></p>
            <template v-if="questiondata.uploadedstem_file">
              <a :href="fileurl+questiondata.uploadedstem_file" target="_blank" v-if="questiondata.uploadedstem_file!=null && questiondata.uploadedstem_file.toLowerCase().indexOf('.pdf') >= 0 "><pdf :src="fileurl+questiondata.uploadedstem_file"  ></pdf></a>
              <img :src="fileurl+questiondata.uploadedstem_file" class="img-responsive title_imageprview" v-if="questiondata.uploadedstem_file!=null && questiondata.uploadedstem_file.toLowerCase().indexOf('.pdf') < 0 ">
            </template>
            <div class="qusans_series"><!-- <b class="qusans_no">Question.</b> --><b v-html="questiondata.question_text" class="qusans_qus"></b>
              <div v-if="showerror==true" style="color: red;"><span class="question_error">{{questiondata.error}}</span></div>
            </div>
            <div v-if="questiondata.instruction_text">
              <p class="qusans_inst">Instructions</p>
              <p class="sub_headingg" v-html="questiondata.instruction_text"></p>
            </div>

          </div><!--second_title-->
          <template v-if="questiondata.hero_img">
            <a :href="fileurl+questiondata.hero_img" target="_blank" v-if="questiondata.hero_img!=null && questiondata.hero_img.toLowerCase().indexOf('.pdf') >= 0 "><pdf :src="fileurl+questiondata.hero_img" ></pdf></a>
            <img :src="fileurl+questiondata.hero_img" class="img-responsive title_imageprview" v-if="questiondata.hero_img!=null && questiondata.hero_img.toLowerCase().indexOf('.pdf')< 0" />
          </template>
          <img src="../assets/images/slider.png" class="img-responsive title_imageprview" v-if="questiondata.hero_img==null && questiondata.imagevisibility==true" />
          <div class="qus_textarea gapbottom_qus">
            <div>
              <!---------------------------------------------->
              <span v-for="questionoptions in questiondata.questionoptions">
                <div class="blankline blankline_radio checkbox">
                  <label>
                    <span  class="blankline_span blankline_span_empty" v-if="questiondata.option_type==1 && questiondata.questionanswer.length == 0" role="radio"> <input type="radio" :value="questionoptions._id" v-model="answerids_single" class="radiosize" ><p class="radio_title empty_title">{{questionoptions.option_text}}</p></span>
                    <span class="blankline_span  blankline_span_empty" v-if="questiondata.option_type==2 && questiondata.questionanswer.length == 0"><input type="checkbox" :value="questionoptions._id" v-model="answerids_multi"  class="radiosize" ><p class="empty_title">{{questionoptions.option_text}}</p></span>
                    <span class="blankline_span  blankline_span_empty" v-if="questionoptions.answervalue!=true && questiondata.option_type==2 && questiondata.questionanswer.length > 0 && questiondata.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)<0"><img src="../assets/icons/checkbox_empty.svg" class="fa_svg_answer" /><p class="empty_title">{{questionoptions.option_text}}</p></span>
                    <span class="blankline_span blankline_span_correct" v-if="questionoptions.answervalue==true && questiondata.questionanswer.length > 0 && questiondata.option_type==2 && questiondata.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)>=0"><img src="../assets/icons/rightanswer.svg" class="fa_svg_answer" />
                      <p class="empty_title">{{questionoptions.option_text}}</p>
                      <span class="correct_button"><button class="button correct_btn">Correct </button></span>
                      <span class="youranswer_button"><button class="button youranswer_btn youranswer_button_right">Your Answer</button></span>
                    </span>
                    <span class="blankline_span blankline_span_correct" v-if="questionoptions.answervalue==true && questiondata.questionanswer.length > 0 && questiondata.option_type==2 && questiondata.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)<0"><img src="../assets/icons/checkbox_empty.svg" class="fa_svg_answer" />
                      <p class="empty_title">{{questionoptions.option_text}}</p>
                      <span class="correct_button"><button class="button correct_btn">Correct </button> </span>
                    </span>
                    <span class="blankline_span blankline_span_wrong" v-if="questionoptions.answervalue==false && questiondata.questionanswer.length > 0 && questiondata.option_type==2 && questiondata.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)>=0"><img src="../assets/icons/wronganswer.svg" class="fa_svg_answer" /><p class="empty_title">{{questionoptions.option_text}}</p>
                      <span class="wrong_button"><button class="button wrong_btn">Incorrect</button></span>
                      <span class="youranswer_button"><button class="button youranswer_btn youranswer_button_right">Your Answer</button></span>
                    </span>
                    <span class="blankline_span blankline_span_wrong" v-if="questionoptions.answervalue==false && questiondata.questionanswer.length > 0 && questiondata.option_type==1 && questionoptions._id == questiondata.questionanswer[0].answerid"><img src="../assets/icons/dot-circle_incorrect.svg" class="fa_svg_answer" />
                      <p class="radio_title empty_title">{{questionoptions.option_text}}</p>
                      <span class="wrong_button"><button class="button wrong_btn">Incorrect</button></span>
                      <span class="youranswer_button"><button class="button youranswer_btn youranswer_button_wrong">Your Answer</button></span>
                    </span>
                    <span class="blankline_span blankline_span_correct" v-if="questionoptions.answervalue=='true' && questiondata.questionanswer.length > 0 && questiondata.option_type==1 && questionoptions._id == questiondata.questionanswer[0].answerid"><img src="../assets/icons/dot-circle_correct.svg" class="fa_svg_answer" />
                      <p class="radio_title empty_title">{{questionoptions.option_text}}</p>
                      <span class="correct_button"><button class="button correct_btn">Correct </button></span>
                      <span class="youranswer_button"><button class="button youranswer_btn youranswer_button_right">Your Answer</button></span>
                    </span>
                    <span  class="blankline_span blankline_span_empty" v-if="questionoptions.answervalue==false && questiondata.option_type==1 && questiondata.questionanswer.length > 0 && questionoptions._id != questiondata.questionanswer[0].answerid"><img src="../assets/icons/radio-on-button.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{questionoptions.option_text}}</p></span>
                    <span class="blankline_span blankline_span_correct" v-if="questionoptions.answervalue=='true' && questiondata.questionanswer.length > 0 && questiondata.option_type==1 && questionoptions._id != questiondata.questionanswer[0].answerid"><img src="../assets/icons/radio-on-button.svg" class="fa_svg_answer" />
                      <p class="radio_title empty_title">{{questionoptions.option_text}}</p>
                      <span class="correct_button"><button class="button correct_btn">Correct </button></span>
                    </span>
                  </label>
                </div><!--blankline_radio-->
                <span class="clearfix"></span>
              </span>
            </div>
            <!--answer_explantion-->
            <div class="answer_explantion" v-if=" questiondata.answer_explanation!='' && questiondata.answer_explanation!=null">
              <p class="a_explntn">Answer Explanation</p>
              <p class="sub_explanation" v-html="questiondata.answer_explanation"></p>
            </div>
          </div>
        </div><!---question_preview--->
        <div v-if="errors.length > 0" style="color: red;"><span class="question_error">{{errors[0].ans_err}}</span></div>
        <div class="button_previw" >
         <ul class="sharelinks">
          <li class="last_li cursoron" v-if="questiondata!=null && questiondata.questionanswer.length == 0 "><button  class="btn q_prvw_sbmtbtn" type="button" @click="submitAnswer(questiondata._id,questiondata.option_type)">Submit</button></li>
         </ul>
      </div>
    <template>
      <div class="col-xs-12 col-sm-12" >
        <div class="article_commentsection">
          <div class="more_heading_article"> All Comments </div>
          <div  v-for="(commentsofpostdata,commindex) in commentsofpost">
            <div class="chats">
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
                  <span class="yourcase_button" v-if="commentsofpostdata.commentby.unique_id==currentuser && commentsofpostdata.editflag==false">
                    <button class="button youranswer_btn youranswer_button_wrong">Your Answer</button>
                  </span>
                </p>
              </span>
              <span v-else>
                <img :src="commentsofpostdata.commentby.profile" class="user_circle"> <p class="usernmechats">{{commentsofpostdata.commentby.firstname}} {{commentsofpostdata.commentby.lastname}}</p>
              </span>
              <div class="chatter">
                <span v-if="commentsofpostdata.editflag==false" v-html="commentsofpostdata.content"></span>
                <span v-else>
                <span  @click="updateEditComment(commindex,commentsofpostdata._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
                <textarea v-model="commentsofpostdata.content" class="add_newcomment" >{{commentsofpostdata.content}}</textarea></span>
                <div class="read_more" v-if="commentsofpostdata.questionid!=null && commentsofpostdata.editflag==false" > <a :href="`/userquestionanswer?qid=${masterquestion}&uid=${commentsofpostdata.commentby.unique_id}`" target="_BLANK">Read The Answer</a></div>
                <div class="last_li date_right">{{ commentsofpostdata.created_at | postsumDate}}</div>
                <ul class="sharelinks_chaatter">
                  <li class="cursoron" v-if="commentsofpostdata.likestatus == 0"><span @click="comlikeanddislike(commentsofpostdata.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" class="cursoron" @click="showcommentlikers(commentsofpostdata.unique_id)">{{commentsofpostdata.likes}}</span></li>
                  <li class="cursoron" v-if="commentsofpostdata.likestatus == 1"><span @click="comlikeanddislike(commentsofpostdata.unique_id,0)"><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" class="cursoron" @click="showcommentlikers(commentsofpostdata.unique_id)">{{commentsofpostdata.likes}}</span></li>
                  <li class="comment_li cursoron" @click="showReply(post_id,commentsofpostdata.unique_id)"><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /><span v-if="commentsofpostdata.commentofcomment.length>0">{{commentsofpostdata.commentofcomment.length}}</span></li>
                  <!-- // 30/09/2019 -->
                  <template v-if="(commentsofpostdata.commentby.unique_id==currentuser || commpermission.indexOf(currentuserdata.role)>=0) && commentsofpostdata.questionid==null">
                    <template v-if="commentsofpostdata.settingflag==false">
                      <li class="cursoron"><span  @click="commentsofpostdata.settingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
                    </template>
                    <template v-else>
                      <li class="cursoron"><span @click="editComment(commindex)"><img src="../assets/icons/edit.svg" class="fa_svg_icon"/></span><span class="cursoron"></span></li>
                      <li class="cursoron"><span @click="removecomment(commentsofpostdata.unique_id)" ><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
                    </template>
                  </template>
                  <template v-if="currentuserdata.role==1 && commentsofpostdata.questionid!=null">
                    <template v-if="commentsofpostdata.settingflag==false">
                      <li class="cursoron"><span @click="commentsofpostdata.settingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
                    </template>
                    <template v-else>
                      <li class="cursoron"><span @click="editComment(commindex)"><img src="../assets/icons/edit.svg" class="fa_svg_icon"/></span><span class="cursoron"></span></li>
                      <li class="cursoron"><span @click="removecomment(commentsofpostdata.unique_id)" ><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
                    </template>
                  </template>
                </ul>
              </div>
              <div class="replyfield" v-if="replyflag==commentsofpostdata.unique_id">
                <span class="comm_current_user reply_field"><img :src="currentuserdata.profile" class="circle_image"></span>
                <span @click="addReply(commentsofpostdata.unique_id,commentsofpostdata.unique_id)" class="cursoron"><span class="send_svg_icon reply_link1">Reply</span></span>
                <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" ></textarea>
              </div>
            </div>

            <div class="chats second_chats" v-for="(commentsofpost_reply,crindex) in commentsofpostdata.commentofcomment">
              <img :src="commentsofpost_reply.commentby_n.profile" class=" user_circle"><p class="usernmechats">{{commentsofpost_reply.commentby_n.firstname}} {{commentsofpost_reply.commentby_n.lastname}}</p>
              <div class="chatter">
                <div v-if="commentsofpost_reply.parentcontent.length >0" class="bg_part">
                  <img src="../assets/images/left-quote.svg" class="big_svg" />
                  <span class="reply_on_comnt " v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.parentcontent[0].content"></span>
                  <span  class="date_time_of_cmt"> {{commentsofpost_reply.parentcontent[0].replyby.firstname}} {{commentsofpost_reply.parentcontent[0].replyby.lastname}}, {{commentsofpost_reply.parentcontent[0].created_at | postsumDate }} </span>
                  <span class="reply_on_comnt_reply" v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.content"></span>
                  <span v-else>
                    <span  @click="updateEditReply(commindex,crindex,commentsofpost_reply._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
                    <textarea v-model="commentsofpost_reply.content" class="add_newcomment" >{{commentsofpost_reply.content}}</textarea></span>
                </div>
                <div v-else>
                  <span v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.content"></span>
                  <span v-else>
                    <span  @click="updateEditReply(commindex,crindex,commentsofpost_reply._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
                    <textarea v-model="commentsofpost_reply.content" class="add_newcomment" >{{commentsofpost_reply.content}}</textarea></span>
                </div>
                <div class="last_li date_right">{{ commentsofpost_reply.created_at | postsumDate}}</div>
                <ul class="sharelinks_chaatter">
                  <li class="cursoron" v-if="commentsofpost_reply.likestatus == 0"><span @click="comlikeanddislike(commentsofpost_reply.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /></span><span v-if="commentsofpost_reply.likes>0" class="cursoron" @click="showcommentlikers(commentsofpost_reply.unique_id)">{{commentsofpost_reply.likes}}</span></li>
                  <li class="cursoron" v-if="commentsofpost_reply.likestatus == 1"><span @click="comlikeanddislike(commentsofpost_reply.unique_id,0)">
                    <img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="commentsofpost_reply.likes>0" class="cursoron" @click="showcommentlikers(commentsofpost_reply.unique_id)">{{commentsofpost_reply.likes}}</span></li>
                  <li class="comment_li cursoron" @click=showCommReply(commentsofpostdata.unique_id,commentsofpost_reply.unique_id)><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth"/></li>
                  <template v-if="commentsofpost_reply.commentby_n.unique_id==currentuser || currentuserdata.role ==1">
                      <template v-if="commentsofpost_reply.rsettingflag==false">
                        <li class="cursoron"><span  @click="commentsofpost_reply.rsettingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
                      </template>
                      <template v-else>
                        <li class="cursoron"><span  @click="editReply(commindex,crindex)"><img src="../assets/icons/edit.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
                        <li class="cursoron"><span @click="removeReply(commentsofpost_reply._id)"><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
                      </template>
                  </template>
                </ul>
              </div>
              <div class="replyfield" v-if="replyflagR==commentsofpost_reply.unique_id">
                <span class="comm_current_user reply_field"><img :src="currentuserdata.profile" class="circle_image circle_image2"></span>
                <span @click="addReply(commentsofpostdata.unique_id, commentsofpost_reply.unique_id)" class="cursoron"><span class="send_svg_icon reply_link2">Reply</span></span>
                <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" ></textarea>
              </div>
            </div>
          </div>
          <div class="commentfield" >
            <span class="comm_current_user commemt_user1"><img :src="currentuserdata.profile" class="circle_image"></span>
            <textarea v-model="comment" ref="comment_box" class="add_newcomment" placeholder="Please comment here" ></textarea>
          <div class="independant_buton">
            <span @click="addComment(null)" class="cursoron"><span class="send_svg_icon add_comment1">Add Comment</span></span>
          </div>
            <div class="async_previw">
              <!-- <input v-if="commentanonymouscheck" type="text" v-model="commentdummyname" class="dummy_name" placeholder="Anonymous name (optional)"/>
              <label class="Anonymous_label">
                <input type="checkbox" v-model="commentanonymouscheck" />
                <span>Anonymous Mode</span>
              </label> -->
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- ******************************************************************************************************************** -->
    <v-dialog v-model="postliker" width="500" >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
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
    <!-- ******************************************************************************************************************** -->

    <v-dialog v-model="commentliker" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
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

    <!-- ******************************************************************************************************************** -->
    </div>
  </div>
  </v-container>
</template>
<script>

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
           postliker:false,
      postlikers:[],
      post_id:null,
      commentsofpost:[],
      comment_flag:false,
      currentuserdata:[],
      comment:null,
      feedback:null,
      reply_commentid:null,
      replyoncomment:null,
      commentliker:false,
      commentlikers:[],
      replyflag:null,
      replyflagR:null,
      anonymouscheck:false,
      showerror:false,
      commentanonymouscheck:false,
      scurrenttime:null,
      dummyname:null,
      commentdummyname:null,
      answevalidation:[],
      rolespermission:['1','2','7','11','12','14','15','18','19'],
      commpermission:['1','2','18','19'],
      anonymousimags:['/icons/anonymoususer_1.svg'],
      spelloptions:{browser_spellcheck: true},
      answerids_single:'',
      answerids_multi:[],
      errors:[]
       }
    },
    methods:
    {
      getsbaquestionanswer()
      {
        axios.post(`/sbaquestionanswer`,{"questionid":this.masterquestion,"loginid":this.currentuser})
        .then(response1 =>
        {
          console.log("response1- ",response1.data)
          this.questiondata=response1.data;
          this.version=this.questiondata.version
          // this.tagdata=this.questiondata[0].tagdata
          // this.answerflag=this.questiondata[0].answered
          axios.post(`/getquestionpostdata`,{"questionid":this.masterquestion,"loginid":this.currentuser})
          .then(postresponse =>
          {
            this.postdata=postresponse.data[0];
            this.post_id=postresponse.data[0].unique_id;
            this.updateComments();
          }).catch(e => {
              this.errors.push(e)
            })
        })
      },
      submitAnswer(q_id, opt_type)
      {
        console.log("q_id - ",q_id)
        console.log("opt_type - ",opt_type)
        if(opt_type==1){
          var answerid=this.answerids_single;
        // console.log("answerid - ",this.answerids_single)
        }else if(opt_type==2){
          var answerid=this.answerids_multi.join(",");
        // console.log("answerid - ",this.answerids_multi)
        }
        if(answerid!='')
        {
          console.log("if ans")
          axios.post(`/questionanswer`,{questionid:q_id,answerid:answerid,createdby:this.currentuser})
          .then(response => {
            console.log("response-", response.data)
            this.errors=[]
            this.getsbaquestionanswer()
          })
        }
        else
        {
          const e ="Please select your answer.";
          this.errors.push({'ans_err':e});
          console.log('error-',this.errors)
        }
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
        .then(response =>
        {
          console.log(response)
          axios.post('/setpostlikenotification',{"weburl":'',"appurl":'',"targetid":postid,"q_type":null,"title":null,"questionid":null,postid:postid,createdby:this.currentuser})
          .then((notiresponse)=>
          {
            console.log(notiresponse);
            // location.reload();
          }).catch((error)=>{
              console.log(error);
            })
          this.getsbaquestionanswer();
        });
      },
      async updateComments()
      {
        console.log('jhdjhfjdhfjhdjf'+this.post_id);
        await axios.post(`/getcommentsofpost`,{'postid':this.post_id, loginid:this.currentuser})
        .then(response =>
        {
          console.log(response.data)
          this.commentsofpost=response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      updateEditComment(commentindex,commentid)
      {
          this.editedcomment=this.commentsofpost[commentindex].content;
          console.log('ec-',this.editedcomment)
          console.log('commentindex-',commentindex)
          console.log('commentid-',commentid)
          axios.post(`/updateeditcomment`,{commentid:commentid,content:this.editedcomment, createdby:this.currentuser})
          .then(response => {
            console.log(response.data)
            this.updateComments()
          });
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
      comlikeanddislike(commentid,status)
      {
        console.log(commentid);
        console.log(status);
        axios.post(`/likedislikecomment`,{'commentid':commentid,'likeby':this.currentuser,'status':status})
        .then(response => {
            console.log(response.data)
            this.getsbaquestionanswer();
            this.updateComments();
        });
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
        }).catch(e => {
            this.errors.push(e)
          })
      },
      showReply(postid,commentid)
      {
        if(this.replyflag!==commentid)
        {
          this.replyflag=commentid
          this.reply_commentid=commentid
        }
        else{
          this.replyflag=null
        }
      },
      addComment(commentid)
      {
        this.comment = this.comment.replace(/(?:\r\n|\r|\n)/g, '<br>');
        console.log("comment-",this.comment)
        console.log("masterquestion-",this.masterquestion)
        console.log("commentdummyname-",this.commentdummyname)
        console.log("qtitle-",this.questiondata.q_title)
        console.log("commentanonymouscheck-",this.commentanonymouscheck)
        console.log("post_id-",this.post_id)
        console.log("commentid-",commentid)
        console.log("replyid-",commentid)
        console.log("created_by-",this.currentuser)

        if(this.comment!=null && this.comment.trim())
        {
          axios.post(`/savesbacomments`,{dummyname:this.commentdummyname,title:this.questiondata.q_title,asynccheck:this.commentanonymouscheck,comment:this.comment,questionid:this.masterquestion,postid:this.post_id,commentid:commentid,replyid:commentid,createdby:this.currentuser})
          .then(response => {
            this.updateComments();
            this.getsbaquestionanswer();
            this.comment=null
          })
        }
      },
      editComment(commentindex)
      {
        console.log('commentindex-',commentindex)
        this.commentsofpost[commentindex].editflag=true;
      },
      removecomment(commentid)
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
      addReply(commentofpostid,replyid)
      {
        console.log(commentofpostid);
        if(this.replyoncomment!=null && this.replyoncomment.trim())
        {
          this.replyoncomment = this.replyoncomment.replace(/(?:\r\n|\r|\n)/g, '<br>');
          axios.post(`/addcomment`,{comment:this.replyoncomment,postid:this.post_id,commentid:commentofpostid,replyid:replyid,createdby:this.currentuser})
          .then(response => {
            this.updateComments();
            this.getsbaquestionanswer();
            this.replyoncomment=null
            this.replyflag=false;
            this.reply_commentid=null;
           this.replyflagR=null;
          })
        }
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
        console.log(replyid)
        axios.post(`/removepostcomment`,{"id":replyid})
        .then(removeresponse => {
          console.log(removeresponse)
          this.updateComments()
        }).catch(e => {
            this.errors.push(e)
          })
      }
    },
    created()
    {
      this.scurrenttime=Date.now();
      this.masterquestion=this.$route.query.id
      axios.post(`/getcurrentuser`,{'username':username})
      .then(response =>
      {
        this.currentuser = response.data.unique_id
        console.log(this.currentuser)
        this.currentuserdata = response.data
        axios.post(`/sbaquestionanswer`,{"questionid":this.masterquestion,"loginid":this.currentuser})
        .then(response1 =>
        {
          console.log("response1- ",response1.data)
          this.questiondata=response1.data;
          this.version=this.questiondata.version
          // this.tagdata=this.questiondata[0].tagdata
          // this.answerflag=this.questiondata[0].answered
          axios.post(`/getquestionpostdata`,{"questionid":this.masterquestion,"loginid":this.currentuser})
          .then(postresponse =>
          {
            this.postdata=postresponse.data[0];
            this.post_id=postresponse.data[0].unique_id;
            this.updateComments();
          }).catch(e => {
              this.errors.push(e)
            })
        })
      }).catch(e => {
          this.errors.push(e)
        })
    }
  }
</script>
