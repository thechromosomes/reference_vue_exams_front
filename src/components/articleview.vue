<template>
<v-container>
    <div class="col-xs-12">
    <div class="col-xs-3  col-md-3  sticky-position">
    <div class="sticky_left_article" id="stick" >
        <div class="article_heading4" href="#top">{{a_title}} </div>
<template v-if="authordata!=null">
        <p v-if="authordata.author!=null">{{authordata.author.firstname+' '+authordata.author.lastname}}</p>
</template>
        </div>
    <div class= "left_article" >
    <span v-for="(articlesec, articlesecindex) in articles">
        <a  class="container_link" :id="`sec${articlesec._id}`" :href="`#${articlesec._id}`" v-if="articlesec.article_section!=null && articlesec.article_section!=''">{{articlesec.article_section}}</a>
   </span>
   <template v-if="postdata!=''">
            <ul class="article_social_icons">
                <li class="cursoron"> <img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" v-if="postdata.likestatus==0"  @click="likeanddislike(postdata.unique_id,1)"><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" v-if="postdata.likestatus!=0"  @click="likeanddislike(postdata.unique_id,0)"> <span v-if="postdata.likes>0" @click="showlikers(postdata.unique_id)"> {{postdata.likes}} </span></li>
                <li class="cursoron" @click="setFocus('comment_box')"> <img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth"> <span v-if="postdata.allcomments.length>0"> {{postdata.allcomments.length}} </span></li>
                <li class="cursoron"> <img src="../assets/icons/retweet-light.svg" @click="editdialogbox(postdata.unique_id)" class="fa_svg_icon extraimgwidth"> <span>  </span></li>
                <li class="cursoron"> <img src="../assets/icons/bookmark-light.svg" class="fa_svg_icon bookamrktwidth" v-if="postdata.allsaveposts==0" @click="savePost(postdata.unique_id,0)"> <img src="../assets/icons/bookmark_red.svg" class="fa_svg_icon bookamrktwidth" v-if="postdata.allsaveposts==1" @click="savePost(postdata.unique_id,1)"><span></span></li>
            </ul>
  </template>
    </div>

    </div>
    <div class="col-xs-12 col-sm-9 col-md-7 col-md-offset-1">
       <div class="scrolling_right_article">
           <div class="later_sticky">
            <div class="article_heading1" id="top">{{a_title}} </div>
            <div class="doctor_description">
              <template v-if="authordata!=null">
            <div class="image-icon" v-if="authordata.author!=null"> <img :src="authordata.author.profile" class="cursoron user_circle" v-if="authordata.author"></div>
            <p v-if="authordata.author!=null"> {{authordata.author.firstname+' '+authordata.author.lastname}}</p>
           </template>
            </div>
            </div>
          <div class="buttons_group" >
  <template v-for="(tag, tindex) in tagdata">
    <button  v-bind:key="`tags${tindex}`" class="btn btn_one">{{tag.tagname}}</button>
  </template>
</div>
            <div class="article_page_section first-section" v-for="(article, articleindex) in articles"  v-bind:id="`${article._id}`">
            <div class="article_heading3" v-if="article.article_section!=null && article.article_section!=''">{{article.article_section}}</div>
            <span v-if="article.section_uploaded_file.length>0" v-for="(secarticleimg, secarticleimgindex) in  article.section_uploaded_file">
<template v-if="secarticleimg">
             <a :href="fileurl+secarticleimg" target="_blank" v-if="secarticleimg.toLowerCase().indexOf('.pdf') >= 0"><pdf :src="fileurl+secarticleimg" ></pdf></a>
            <img :src="fileurl+secarticleimg" class="article_page_image" v-if="secarticleimg.toLowerCase().indexOf('.pdf') < 0">
</template>
            </span>
            <p class="article_page_description" v-if="article.article_content!=null"  v-html="article.article_content">
            </p>
            <span v-if="article.uploaded_file.length>0" v-for="(articleimg, articleimgindex) in  article.uploaded_file">
<template v-if="articleimg">
            <a :href="fileurl+articleimg" target="_blank" v-if="articleimg.toLowerCase().indexOf('.pdf') >= 0"><pdf :src="fileurl+articleimg" ></pdf></a>
            <img :src="fileurl+articleimg" class="article_page_image" v-if="articleimg.toLowerCase().indexOf('.pdf') < 0"/>
</template>
            </span>
            <p class="article_page_description" v-if="article.article_text!=null" v-html="article.article_text">
            </p>
            <!-- question section -->
            <div v-for="(question,questionindex) in article.articlequestiondata" class="article_main_coverdiv" v-if="article.articlequestiondata.length>0">
                  <div class="article_page_multiple_choices">
                  <div v-html="question.question_text" class="articleq_text"></div>
          <span v-if="question.uploaded_file.length>0" v-for="(questionimg, questionimgindex) in question.uploaded_file">
            <template v-if="questionimg">
            <a :href="fileurl+questionimg" target="_blank" v-if="questionimg.toLowerCase().indexOf('.pdf') >= 0"><pdf :src="fileurl+questionimg" ></pdf></a>
            <img :src="fileurl+questionimg" class="article_page_image" v-if="questionimg.toLowerCase().indexOf('.pdf') < 0" />
 </template>
            </span>
     <!--start option section-->
     <div v-if="question.choiceoption==1 && question.answerflag==false">
    <label class="radio-inline kfpradio_label padding_radio" v-for="(question_option,qo_index) in question.optiondata">
      <input type="radio" class="radiosize" v-model="question.answerid" v-bind:key="`optradio${questionindex}${qo_index}`" :value="question_option._id">{{question_option.option_text}}
    </label>
</div>
<div v-if="question.choiceoption==2 && question.answerflag==false">
    <label class="radio-inline kfpradio_label" v-for="(question_option,qo_index) in question.optiondata">
      <input type="checkbox" class="radiosize" v-model="question.answerid"  :value="question_option._id" :id="question_option._id">{{question_option.option_text}}
    </label>
</div>
                  <div v-if="question.choiceoption==1 && question.answerflag==true">
    <label class="radio-inline kfpradio_label" v-for="(question_option,qo_index) in question.optiondata">
    <span  class="kfpblankline_span kfpblankline_span_empty" v-if="question_option.answervalue==0  && question_option._id != question.answerid""><img src="../assets/icons/radio-on-button.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{question_option.option_text}}</p></span>
       <span class="kfpblankline_span kfpblankline_span_wrong" v-if="question_option.answervalue==0 && question_option._id == question.answerid"><img src="../assets/icons/dot-circle_incorrect.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{question_option.option_text}}</p>

<span class="wrong_button">
<button class="button wrong_btn">Incorrect</button>
</span>

<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_wrong">Your Answer</button>
</span>

</span>
<span class="kfpblankline_span kfpblankline_span_correct" v-if="question_option.answervalue=='true' && question_option._id == question.answerid"><img src="../assets/icons/dot-circle_correct.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{question_option.option_text}}</p>

<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span>
<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_right">Your Answer</button>
</span>

</span>
<span class="kfpblankline_span kfpblankline_span_correct" v-if="question_option.answervalue=='true'  && question_option._id != question.answerid"><img src="../assets/icons/radio-on-button.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{question_option.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span></span>
    </label>
</div>
<div v-if="question.choiceoption==2 & question.answerflag==true">
    <label class="radio-inline kfpradio_label" v-for="(question_option,qo_index) in question.optiondata">
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

<!--end option section-->

<tinymce v-if="question.optiondata.length==0 && question.answerflag==false" v-model="question.answer_text" v-bind:id="`answer_text${articleindex}${questionindex}`" v-bind:key="`answer_text${articleindex}${questionindex}`" :other_options="spelloptions"></tinymce>
                  <div class="a_answer_value" v-if="question.optiondata.length==0 && question.answerflag==true">
                  <label>Answer</label>
                  <span v-html="question.answer_text"></span>
                  </div>
<!--answer_explantion-->
<div class="answer_explantion" v-if="question.answerflag==true && question.answer_explanation!=null && question.answer_explanation!=''">
<p class="a_explntn">Answer Explanation</p>
<p class="sub_explanation" v-html="question.answer_explanation"></p>
</div><!--answer_explantion-->

                  <button type="button" class="btn q_prvw_sbmtbtn" @click="submitAnswer(articleindex,questionindex)" v-if="!question.answerflag">Submit</button>
        </div>
</div>
    </div>


         </div>

    </div>
     </div>
        <div class="bottom_articles">
            <div class="col-sm-12">
                  <div class="more_heading_article"> Recent Articles</div>
            </div>

                  <div class="col-sm-4" v-for="recent_article in recent_articles">
                  <a :href="`/articleview?id=${recent_article._id}`" class="recent_article_a" target="_blank">
                      <div class="single_bottom_article">
                          <div class="img_Section" v-if="recent_article.sectiondata.uploaded_file.length>0">
                              <img :src="fileurl+recent_article.sectiondata.uploaded_file[0]" class="bottom_article_image recent_article_thumb">
                          </div>
                          <div class="single_bottom_text">
                              <div class="bottom_article_heading">{{recent_article.a_title}}</div>
                              <div class="bottom_author_description" v-if="recent_article.authordata!=null">
            <div class="image-icon"> <img :src="recent_article.authordata.profile" class="cursoron user_circle"></div>
            <p>{{recent_article.authordata.firstname+' '+recent_article.authordata.lastname}}</p>
            </div>
                          </div>
                      </div>
                      </a>
                  </div>
  </div>
  <div class="col-xs-12 col-sm-4"></div>
                    <div class="col-xs-12 col-sm-12">
                     <div class="article_commentsection">
                         <div class="more_heading_article"> Comments </div>
 <div  v-for="(commentsofpostdata,commindex) in commentsofpost">

  <div class="chats">
    <img :src="commentsofpostdata.commentby.profile" class=" user_circle"> <p class="usernmechats">{{commentsofpostdata.commentby.firstname}} {{commentsofpostdata.commentby.lastname}}</p>
    <div class="chatter"><span v-if="commentsofpostdata.editflag==false" v-html="commentsofpostdata.content"></span>

<!--  ********************************************************************************************  -->


    <span v-else>
    <span  @click="updateEditComment(commindex,commentsofpostdata._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
    <textarea v-model="commentsofpostdata.content" class="add_newcomment" >{{commentsofpostdata.content}}</textarea></span>
  <div class="last_li date_right">{{ commentsofpostdata.created_at | postsumDate}}</div>

      <ul class="sharelinks_chaatter">
        <li class="cursoron" v-if="commentsofpostdata.likestatus == 0"><span @click="comlikeanddislike(commentsofpostdata.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" class="cursoron" @click="showcommentlikers(commentsofpostdata.unique_id)">{{commentsofpostdata.likes}}</span></li>

        <li class="cursoron" v-if="commentsofpostdata.likestatus == 1"><span @click="comlikeanddislike(commentsofpostdata.unique_id,0)"><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" class="cursoron" @click="showcommentlikers(commentsofpostdata.unique_id)">{{commentsofpostdata.likes}}</span></li>

        <li class="comment_li cursoron" @click=showReply(post_id,commentsofpostdata.unique_id)><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /><span v-if="commentsofpostdata.commentofcomment.length>0">{{commentsofpostdata.commentofcomment.length}}</span></li>
       <template v-if="commentsofpostdata.commentby.unique_id==currentuser || currentuserdata.role ==1">
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
      <span @click="addReply(commentsofpostdata.unique_id,commentsofpostdata.unique_id)" class="cursoron "><span class="send_svg_icon reply_link1">Reply</span></span>
      <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" ></textarea>
    </div>
</div>
  <div class="chats second_chats" v-for="(commentsofpost_reply,crindex) in commentsofpostdata.commentofcomment">
    <img :src="commentsofpost_reply.commentby_n.profile" class=" user_circle"> <p class="usernmechats">{{commentsofpost_reply.commentby_n.firstname}} {{commentsofpost_reply.commentby_n.lastname}}</p>
    <div class="chatter">
      <!--  ********************************************************************************************  -->
      <div v-if="commentsofpost_reply.parentcontent.length >0" class="bg_part">
        <img src="../assets/images/left-quote.svg" class="big_svg" />
        <span class="reply_on_comnt "  v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.parentcontent[0].content"></span>
        <span class="date_time_of_cmt"> {{commentsofpost_reply.parentcontent[0].replyby.firstname}} {{commentsofpost_reply.parentcontent[0].replyby.lastname}}, {{commentsofpost_reply.parentcontent[0].created_at | postsumDate }} </span>
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
<!--  ********************************************************************************************  -->
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
        </template><!-- <li class="last_li">{{ commentsofpost_reply.created_at | postsumDate}}</li> -->
      </ul>
    </div>
  <div class="replyfield" v-if="replyflagR==commentsofpost_reply.unique_id">
      <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" ></textarea>
      <span class="comm_current_user reply_field"><img :src="currentuserdata.profile" class="circle_image circle_image2"></span>
      <span @click="addReply(commentsofpostdata.unique_id,commentsofpost_reply.unique_id)" class="cursoron"><span class="send_svg_icon reply_link2">Reply</span></span>


  </div>
  </div>
</div>
<div class="commentfield" >
<!-- <div class="commentfield" v-if="replyflag != post_id"> -->
<textarea v-model="comment" ref="comment_box" class="add_newcomment" placeholder="Please comment here" ></textarea>
<span class="comm_current_user commemt_user1"><img :src="currentuserdata.profile" class="circle_image"></span>
<div v-if="freeze" class="independant_buton">
<span @click="addComment()" class="cursoron "><span class="send_svg_icon add_comment1">Add Comment</span></span>
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

      <!-- for repost -->
    <v-dialog v-model="editdialog" width="1000">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <span class="crosspopup cp_scheduler" @click="editdialog=false">x</span>
        </v-card-title>
        <v-card-text>
          <div v-for="(edPost, pindex) in editedPost"  v-bind:key="`tags${pindex}`">
            <div>
            <div class="post_context_wrap">
              <div class="post_context">
              <span class="add_topic cursoron" @click="edaddtags=true"><img src="../assets/icons/layer-plus.svg" class="fa_svg_icon"/> Add a tag </span>
                <textarea class="post_input editable" v-model="edpost_content_temp" ref="post_content_tempf" placeholder="Write a post or" @keyup="remanu_content" :autofocus="'autofocus'"></textarea>
                <ul class="usercommentss">
                  <li v-for="rehtag in resrchHashTags" @click="reselhashtag(rehtag.categoryname,rehtag)">{{rehtag.categoryname}}</li>
                </ul>
                <div class="clearfix">
                <span class="remove_preview cursoron" v-if="edpost_content" @click="remove_preview">x</span><p v-html="edpost_content"></p>
                </div>
                <div class="clearfix">
                <span class="remove_preview cursoron" v-if="edpost_fileflag" @click="remove_previewfile">x</span><p v-html="edpost_filecontent"></p>
                <span class="remove_preview cursoron" v-if="edremove_previewpdf" @click="remove_previewfile">x</span><p v-if="edremove_previewpdf" ><pdf :src="edpreviewattachlink"></pdf></p>
                </div>
                <ul class="inner_tools">
                <li  class=" btn_postshort scheduler cursoron" @click="addscheduler=true"><img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon" /></li>
                </ul>
              </div>

            </div>
            <textarea style="display:none;" class="post_input" v-model="post_content" >{{post_content}}</textarea>
            <v-chip class="small_chips" v-for="(refposttag, reftagindex) in reftemptags" v-bind:key="`rtag${reftagindex}`" v-if="refposttag.tagname!=null && edsel_tags.indexOf(refposttag.unique_id) >= 0" >{{refposttag.tagname}}</v-chip>
          </div>

          <!-- **********************************************************post content***************************************************************  -->
          <div class="userdiv">
            <p v-if="edPost.content!=null" class="content_user" v-html="edPost.content"> </p>
            <a  v-if="edPost.attached && edPost.attached.indexOf('http')>=0" :href="edPost.attached" target="_BLANK"><pdf :src="edPost.attached"></pdf></a>
            <a  v-else-if="edPost.attached" :href="fileurl+edPost.attached" target="_BLANK"><pdf :src="fileurl+edPost.attached"></pdf></a>
          </div>
          <div class="button_previw"><button class="btn q_prvw_sbmtbtn" type="button" @click="referencePost(edPost.unique_id )">Repost</button></div>
        </div>
        </v-card-text>
      </v-card>
  </v-dialog>

  <!-- for tags -->
  <v-dialog v-model="edaddtags" width="500" >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
          <span class="crosspopup" @click="edaddtags=false">x</span>
        </v-card-title>
        <v-card-text>
          <i class="fa fa-search"></i><input type="text" v-model="edtag_search" @keyup="searchReftags" placeholder="Search"/>
        </v-card-text>
        <v-chip v-for="(edposttag, tagindex) in edposttags" v-bind:key="`tags${tagindex}`" @click="activateReftag(edposttag.unique_id,edposttag)"  v-bind:class="{activetag:edsel_tags.indexOf(edposttag.unique_id) >= 0}" > {{edposttag.tagname}} </v-chip>
        <div class="mainpopup_btn">
          <button class="btn btn_edit" @click="edaddtags=false">Submit</button>
        </div>
      </v-card>
    </v-dialog>

    <!-- for pop up snackbar message -->
  <v-snackbar
      v-model="snackbar"
        :top=true
        :left=true
    >
      {{ appLinkMessage }}
      <v-btn dark text @click="snackbar = false">close</v-btn>
    </v-snackbar>


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

   </v-container>
</template>
<script>


$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop() ;
			$('.article_page_section').each(function(i) {
        var id='sec'+$(this).prop('id');
        //console.log(id);
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
import pdf from 'vue-pdf'
var datetime = new Date();
var username=localStorage.username;
import axios from 'axios';
  export default {
    components: {tinymce,pdf},
   data() {
    return {
      articles:[],
      a_title:null,
      masterarticle:null,
      fileurl:window.publicfileurl,
      currentuser:null,
      errors:[],
      tagdata:[],
      authordata:null,
      answerids_multi:[],
      recent_articles:[],
      postliker:false,
      postlikers:[],
      post_id:null,
      commentsofpost:[],
      postdata:'',
      comment_flag:false,
      currentuserdata:[],
      comment:null,
      reply_commentid:null,
      replyoncomment:null,
      commentliker:false,
      commentlikers:[],
      replyflag:null,
      replyflagR:null,
      spelloptions:{browser_spellcheck: true},

      editdialog: false,
      edsel_tags:[],
      editedPost:[],
      edpost_content_temp:null,
      resrchHashTags:'',
      edpost_content:null,
      edpost_fileflag:false,
      edpost_filecontent:"",
      edremove_previewpdf:false,
      post_content:null,
      edaddtags: false,
      edtag_search:null,
      edposttags:null,
      snackbar:false,
      appLinkMessage: "",
      edaddscheduler:false,
      scheduledate:moment().format('YYYY-MM-DD'),
      scheduletimehrs:moment().format('hh'),
      scheduletimemins:moment().format('mm'),
      scheduletimeapm:moment().format('A'),
      minutes:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
      ampm:['AM','PM'],
      datepicker:null,
      addscheduler:false,
      hours:['01','02','03','04','05','06','07','08','09','10','11','12'],
      showscheduledatetime:null,
      scheduledatetime:moment().format('YYYY-MM-DD hh:mm:ss A'),
      freeze:true
    }
  },
  methods:{

    // to repost functionality
    updateddatentime(){
        this.scheduledate=this.datepicker;
      },

      set_scheduler(){
         this.scheduledatetime=this.scheduledate+' '+this.scheduletimehrs+':'+this.scheduletimemins+' '+this.scheduletimeapm
         this.showscheduledatetime= moment(this.scheduledatetime).unix()*1000
         this.addscheduler=false
      },

    editdialogbox(postid)
      {
        console.log(postid)
        console.log(this.currentuser)

        // editedPost
        axios.post(`/getonepost`,{post_id:postid, loginid:this.currentuser})
        .then(response => {
          console.log(response.data)
          this.editedPost = response.data
          var refarr=[];
          var refselarr=[];
          this.editedPost[0].alltags.forEach(function(refentry)
          {
            console.log('refentry-',refentry.unique_id)
            refarr.push({'tagname':refentry.tagname, 'unique_id':refentry.unique_id})
            refselarr.push(refentry.unique_id,)
          });
          this.edsel_tags=refselarr;
          this.reftemptags=refarr;
        });
        this.editdialog=true;
      },

        remanu_content()
    {
      this.resrchHashTags = [];
      console.log('tempcontent-',this.edpost_content_temp)
        var count=0;
        var re = /(?:^|[ ])#([a-zA-Z]+)/gm;
        var str = this.edpost_content_temp
        var m;
        while((m = re.exec(str)) != null)
        {
          if(str.charAt(re.lastIndex)!=" " && str.charAt(re.lastIndex)!="." && str.charAt(re.lastIndex)!="_")
          {
            this.rehtagtext="#"+m[1]
            axios.post(`/gethashtaglists`,{'searchedtopic':m[1]})
            .then(response => {
                this.resrchHashTags = response.data;
            });
          }

        }
    },

     activateReftag(id,data){
      if(this.edsel_tags.indexOf(id) >= 0 )
      {
        this.edsel_tags.splice(this.edsel_tags.indexOf(id), 1)
      }
      else
      {
        this.edsel_tags.push(id)
        this.reftemptags.push(data)
      }
    },

     searchReftags(){
      axios.post(`/gettags`,{'searchedtag':this.edtag_search})
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      this.edposttags = response.data
    });
    },

      referencePost(refPostid)
    {
      console.log('refid-',refPostid);
        console.log('cu-',this.currentuser);
        var res =  /(?:^|[ ])#([a-zA-Z_0-9-!@$%&*]+)/gm;
        var restr=this.edpost_content_temp;
        var n;
        var rehashtags=[];
        while ((n = res.exec(restr)) != null)
        {
          if (n.index === res.lastIndex)
          {
            res.lastIndex++;
          }
            if(rehashtags.indexOf(n[1])==-1)
            {
              rehashtags.push(n[1])
            }
        }
        console.log('rehashtags-',rehashtags)
        axios.post(`/createhashtag`,{'htagname':rehashtags, 'loginid':this.currentuser})
        .then(response => {
          console.log(response.data)
        })
        .catch(e => {
          this.errors.push(e)
        })

        if(this.edpost_content_temp || this.edsel_tags)
        {
          if(this.scheduledatetime!==null){
            this.scheduledatetime= moment(this.scheduledatetime).unix()*1000
          }else{
             this.scheduledatetime=Date.now();
          }
          var finalpostcontent = this.edpost_content_temp;
          var finaltags = this.edsel_tags.join(",")+','+this.editedPost[0].tags;
          var finalarticleid = this.editedPost[0].articleid;
          var finalpollid = this.editedPost[0].pollid;
          var finaleventid = this.editedPost[0].eventid;

        axios.post('/addpostbyweb',{pdfpreviewimage:null, questionid:null, articleid:finalarticleid, pollid:finalpollid, eventid:finaleventid, attachement:null, tags:finaltags, searchcontent:finalpostcontent, postcontent:finalpostcontent, createdby:this.currentuser, scheduledatetime:this.scheduledatetime, parentid:refPostid,preview_data:JSON.stringify(this.preview_data),preview_flag:this.preview_flag})
        .then((response)=>{
            this.appLinkMessage="article reposted"
            this.snackbar = true
            this.edpost_content=null
            this.edpost_content_temp=null
            this.edpost_link=null
            this.edpost_file=""
            this.edpost_filecontent=""
            this.edsel_tags = []
            this.edpost_fileflag=false
            this.edremove_previewpdf=false
            this.editdialog=false,
            this.preview_data={'imageurl':null,'anchorurl':null,'host':null,'title':null,'description':null}
            this.preview_flag=false
        })
        .catch((error)=>{
            console.log(error);
        })
       }
      },
// ----------------------------------------------------------------

    submitAnswer(articleindex,questionindex){
      var answerdata=this.articles[articleindex].articlequestiondata[questionindex];
        if(answerdata.choiceoption==1){
      var answerid=answerdata.answerid;
        }else if(answerdata.choiceoption==2){
      var answerid=answerdata.answerid.join(",");
        }
        var questionid=answerdata._id;
        var answer_text=answerdata.answer_text;

        axios.post(`/submitquestion`,{questionid:questionid,answerid:answerid,answer_text:answer_text,createdby:this.currentuser})
          .then(response => {
            this.getarticledata();
          })
console.log(answerdata)
    },
    showcommentlikers(id){
      this.getcommlikers(id);
      this.commentliker=true;
    },
     async getcommlikers(id){
      await axios.post(`/getCommentlikers`,{'commentid':id})
      .then(response => {
        this.commentlikers=response.data;
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    getarticledata(){
     axios.post(`/getarticlebyid`,{"articleid":this.masterarticle,"userid":this.currentuser})
    .then(articleresponse => {
 this.articles=articleresponse.data;
 this.a_title=articleresponse.data[0].maindata.a_title
 this.tagdata=articleresponse.data[0].tagdata
 this.authordata=articleresponse.data[0].maindata
 axios.post(`/getarticlepostdata`,{"articleid":this.masterarticle,"loginid":this.currentuser})
    .then(postresponse => {
 this.postdata=postresponse.data[0];
 this.post_id=postresponse.data[0].unique_id
    }).catch(e => {
      this.errors.push(e)
    })
    }).catch(e => {
      this.errors.push(e)
    })
    },
   addComment()
      {
        if(this.comment!=null && this.comment.trim())
        {
          this.freeze = false
          axios.post(`/addcomment`,{comment:this.comment,postid:this.post_id,commentid:null,replyid:null,createdby:this.currentuser})
          .then(response => {
            this.updateComments();
            this.getarticledata();
            this.comment=null
            this.freeze = true
          })
        }
      },
       showReply(postid,commentid){
       if(this.replyflag!==commentid){
        this.replyflag=commentid
        this.reply_commentid=commentid
       }else{
        this.replyflag=null
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
      removecomment(commentid)
      {

          console.log(commentid)
          axios.post(`/removepostcomment`,{"id":commentid})
          .then(removeresponse => {
            console.log(removeresponse)
            this.updateComments()
          }).catch(e => {
              this.errors.push(e)
            })
      },
      editReply(cindex,replyindex)
      {

          console.log('replyindex-',replyindex)
          this.commentsofpost[cindex].commentofcomment[replyindex].reditflag=true;
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
      },
      showCommReply(pCommentid,commentid){
       if(this.replyflagR!==commentid){
        this.replyflagR=commentid
        this.reply_commentid=commentid
       }else{
        this.replyflagR=null
       }
      },
      addReply(commentofpostid,replyid)
      {
        console.log(commentofpostid);
        if(this.replyoncomment!=null && this.replyoncomment.trim())
        {
          axios.post(`/addcomment`,{comment:this.replyoncomment,postid:this.post_id,commentid:commentofpostid,replyid:replyid,createdby:this.currentuser})
          .then(response => {
            this.updateComments();
            this.getarticledata();
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
  axios.post(`/likedislikecomment`,{'commentid':commentid,'likeby':this.currentuser,'status':status})
    .then(response => {
      console.log(response)
this.getarticledata();
this.updateComments();
    });
    },
      setFocus(reference){
        console.log(this.$refs);
        this.$refs[reference].focus();
      },
    likeanddislike(postid,status){
      console.log(postid);
  axios.post(`/likedislikepost`,{'postid':postid,'likeby':this.currentuser,'status':status})
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      this.getarticledata();
    });
    },
     savePost(postid,status)
      {
       // alert(postid+' '+status)
        axios.post(`/savePost`,{'postid':postid, 'created_by':this.currentuser, 'status':status})
          .then(response => {
            console.log(response)
              this.getarticledata();
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
 created() {
     this.masterarticle=this.$route.query.id
    axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuserdata=response.data
      this.currentuser = response.data.unique_id
      axios.post(`/getarticlebyid`,{"articleid":this.masterarticle,"userid":this.currentuser})
    .then(articleresponse => {
 this.articles=articleresponse.data;
 this.a_title=articleresponse.data[0].maindata.a_title
 this.tagdata=articleresponse.data[0].tagdata
 this.authordata=articleresponse.data[0].maindata
  axios.post(`/getarticlepostdata`,{"articleid":this.masterarticle,"loginid":this.currentuser})
    .then(postresponse => {
    console.log('hhhh',postresponse);
 this.postdata=postresponse.data[0];
this.post_id=postresponse.data[0].unique_id
this.updateComments();
    }).catch(e => {
      this.errors.push(e)
    })
    }).catch(e => {
      this.errors.push(e)
    }),
     axios.post(`/setarticleview`,{"articleid":this.masterarticle,"userid":this.currentuser,"source":0})
    .then(articleview => {
console.log(articleview);
    }).catch(e => {
      this.errors.push(e)
    })
    }).catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getrecentthreearticles`,{"articleid":this.masterarticle})
    .then(rarticleresponse => {
 this.recent_articles=rarticleresponse.data;
    }).catch(e => {
      this.errors.push(e)
    })

}

}
</script>
