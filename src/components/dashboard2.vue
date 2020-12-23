<template>
 <v-container grid-list-xl>
  <v-layout row wrap>
<div class="wrapper">
<div class="first_section">
<div class="communityheading"><img src="../assets/icons/window-light_hover1.svg" class="fa_svg_icon" />GPEx Community</div>
<div class="imagesgroup" v-if="items.length>0">
<v-carousel hide-delimiters 
:show-arrows="false"
 class="carousel_dashboard">
  <v-carousel-item
      v-for="(item) in items"
      :key="item._id"
    >
    <a :href="item.linkurl" target="_blank" v-if="item.linkurl!=null"><img :src="fileurl+item.image_link">    </a>
    <img :src="fileurl+item.image_link" v-if="item.linkurl==null">
    </v-carousel-item>

  </v-carousel>
</div>


<span class="add_topic cursoron" v-if="post_flag" @click="addtags2=true"><img src="../assets/icons/layer-plus.svg" class="fa_svg_icon"/> Add a tag </span>
<input type="text" class="post_input_default" @click="showmainpostool" v-if="postdefault_flag" placeholder="Write a post or" />
<v-chip class="selected_chips" v-if="tid!=null" close @input="removetid()">{{tidname}}</v-chip>
<div class="post_context_wrap"> 
<div class="post_context" v-if="post_flag">
<textarea class="post_input" v-model="post_content_temp" ref="post_content_tempf" placeholder="Write a post or" @keyup="manu_content" :autofocus="'autofocus'"></textarea>
  <ul class="">
    <li v-for="htag in srchHashTags" @click="selhashtag(htag.categoryname,htag)">{{htag.categoryname}}</li>
  </ul>
<div class="clearfix">
<span class="remove_preview cursoron" v-if="post_content" @click="remove_preview">x</span><p v-html="post_content"></p>
<v-chip class="small_chips" v-for="(posttag, tagindex) in tempposttags" v-bind:key="`tag${tagindex}`" v-if="sel_tags.indexOf(posttag.unique_id) >= 0" >{{posttag.tagname}}</v-chip>
</div>
<div class="clearfix">
<span class="remove_preview cursoron" v-if="post_fileflag" @click="remove_previewfile">x</span><p v-html="post_filecontent"></p>
<span class="remove_preview cursoron" v-if="remove_previewpdf" @click="remove_previewfile">x</span><p v-if="remove_previewpdf" >
<pdf :src="previewattachlink"></pdf>
<!-- <img v-bind:src="pdfpreviewimage" /> -->
</p>

</div>
<ul class="inner_tools">
<li  v-if="postedit && scheduledatetime>Date.now()" class=" btn_postshort scheduler cursoron" @click="addscheduler=true"><img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon" /></li>
<li  v-if="postedit==null" class=" btn_postshort scheduler cursoron" @click="addscheduler=true"><img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon" /></li>
</ul>
</div>
<div class="tag_container" v-if="addtags" >
 <v-card><v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          <span class="crosspopup" @click="addtags=false">x</span>
        </v-card-title>
        <v-card-text>
        <i class="fa fa-search"></i><input type="text" v-model="tag_search" @keyup="searchtags" placeholder="Search"/>
        </v-card-text>
        <v-chip v-for="(posttag, tagindex) in posttags" v-bind:key="`tag${tagindex}`" v-if="posttag.tagname!=null" @click="activatetag(posttag.unique_id,posttag)"  v-bind:class="{activetag:sel_tags.indexOf(posttag.unique_id) >= 0}" >
          {{posttag.tagname}}
       </v-chip>
       </v-card>
</div>
</div>
<textarea style="display:none;" class="post_input" v-model="post_content" >{{post_content}}</textarea>
</div>
<div class="posttype_container" v-if="post_flag">
<ul class="inner_droptable" >
<a href="/poll"><li class="btn btn_posttype cursoron" >
<img src="../assets/icons/poll-h-light.svg" class="fa_svg_icon hover_class" >
<img src="../assets/icons/poll-h-light_hover.svg" class="fa_svg_icon withouthover_class" >
 Poll </li></a>

<a href="/events"><li class="btn btn_posttype cursoron" v-if="rolespermission.indexOf(currentuserdata.role)>=0">
<img src="../assets/icons/calendar-star-light.svg" class="fa_svg_icon hover_class" />
<img src="../assets/icons/calendar-star-light_hover.svg" class="fa_svg_icon withouthover_class" />
 Events </li></a>

<a href="/article"><li class="btn btn_posttype cursoron" v-if="rolespermission.indexOf(currentuserdata.role)>=0">
<img src="../assets/icons/files.svg"  class="fa_svg_icon hover_class"/>
<img src="../assets/icons/files_hover.svg" class="fa_svg_icon width_article withouthover_class" />
 Article </li></a>

<a href="/createquestion"><li class="btn btn_posttype cursoron" v-if="rolespermission.indexOf(currentuserdata.role)>=0">
<img src="../assets/icons/question-circle.svg" class="fa_svg_icon hover_class"/> 
<img src="../assets/icons/question-circle-white.svg" class="fa_svg_icon withouthover_class" /> 
Questions </li></a>

<li class="btn btn_posttype cursoron fileselector">
<img src="../assets/icons/file-pdf-light.svg" class="fa_svg_icon width_attach hover_class" />
<img src="../assets/icons/file-pdf-light_hover.svg" class="fa_svg_icon width_attach withouthover_class" />
Attach a file <input type="file" ref="file" @change="attachfiletopost()"/> </li>

</ul>
<ul class="list_right_edit" v-if="post_flag">
  <li v-if="postedit"><button class="btn btn_edit " @click="createeditpost(posteditid)">Edit post</button></li>
  <li v-else><button class="btn btn_edit " @click="createpost">Add post</button></li>
<!-- <li><button class="btn btn_edit " @click="createpost">Add post</button></li> -->

</ul>
</div>
<div v-for="(post, pindex) in posts"  v-bind:key="`tags${pindex}`">
<div class="userdiv" v-if='post.pollactive==true' v-bind:class="{active_tag_section:(post.posted_at>Date.now())}" >
<img :src="post.userdetail.profile" class="cursoron user_circle"> 
<p class="user_image_name cursoron">{{post.userdetail.firstname}} {{post.userdetail.lastname}}</p>
<div class="posttoggle_wrapp">
<span class="post_toggle" @click="showOptions(post.unique_id)"><img src="../assets/icons/angle-down.svg" class="fa_svg_icon post_toggle_icon" /></span>
<div class="post_report" v-if="showOption==post.unique_id">
<ul class="post_report_ul">
<li class="post_report_item cursoron" v-if="rolespermission.indexOf(currentuserdata.role)>=0 && post.resourceidstatus==false && post.questionid==null " @click="addtoResources(post.unique_id,1)"><img src="../assets/icons/head-side-brain-light.svg" class="fa_svg_icon post_report_icon" />Move to Resource</li>
<li class="post_report_item cursoron" v-if="rolespermission.indexOf(currentuserdata.role)>=0 && post.resourceidstatus==true && post.questionid==null" @click="addtoResources(post.unique_id,0)"><img src="../assets/icons/resources-selected_hover.svg" class="fa_svg_icon post_report_icon" />Remove from Resource</li>
<li class="post_report_item cursoron" v-if="currentuser==post.userdetail.unique_id || currentuserdata.role==1" @click="removepost(post.unique_id)"><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon post_report_icon" />Delete</li>
<p v-if="currentuser==post.userdetail.unique_id || currentuserdata.role==1" class="post_report_desc">If you want to delete post</p>
<li class="post_report_item cursoron" v-if="(post.questionid==null || post.questionid=='') && currentuser==post.userdetail.unique_id " @click="editpost(post.unique_id)"><img src="../assets/icons/edit.svg" class="fa_svg_icon post_report_icon" />Edit</li>
<p class="post_report_desc"></p>
<li class="post_report_item cursoron" @click="reportPost(post.unique_id)"><img src="../assets/icons/report.svg" class="fa_svg_icon post_report_icon" />Report</li>
</ul>
</div>
</div>
<br>
<div class="clearfix"></div>
<p class="date_user">{{ post.posted_at | postsumDate}}</p>

<div class="question_preview" v-if="post.questionid!=null && post.questionid!=''" :id="post.questionid">

<div class="first_title">
<img src="../assets/icons/question-square-solid_green.svg" class="ques_icon" />
<p class="first_roe">{{post.questiondata.version}}</p>
</div><!--first_title-->
<div class="second_title">
<h2><b v-html="post.questiondata.q_title"></b></h2>
<p class="sub_headingg" v-html="post.questiondata.stem_text"></p>
<img :src="fileurl+post.questiondata.uploadedstem_file" class="img-responsive title_imageprview" v-if="post.questiondata.uploadedstem_file!=null">
<span><b v-html="post.questiondata.question_text"></b></span>
<p class="sub_headingg" v-html="post.questiondata.instruction_text"></p>
</div><!--second_title-->

<div class="buttons_group" v-if="post.questionid==null || post.questionid==''">
              <template v-for="(tag, tindex) in post.alltags">
                <!-- <a :href="'/resources/'+tag.unique_id"> -->
                <a :href="`/resources?id=${tag.unique_id}`" target="_BLANK"><button  v-bind:key="`tags${tindex}`" class="btn btn_one">{{tag.tagname}}</button></a>
              </template>
            </div><!--buttons_group-->
<img :src="fileurl+post.questiondata.hero_img" class="img-responsive title_imageprview" v-if="post.questiondata.hero_img!=null">
<img src="../assets/images/slider.png" class="img-responsive title_imageprview" v-if="post.questiondata.hero_img==null && post.questiondata.imagevisibility==1">

<div class="selection_section" v-if="post.questiondata.option_type!=null && post.questiondata.questiontype!='5d15fea98edfed6c417592d9'">
   <span v-for="questionoptions in post.questionoptions">

<!---------------------------------------------->
<div class="blankline blankline_radio checkbox">
<label>

<span  class="blankline_span blankline_span_empty" v-if="post.questiondata.option_type==1 && post.questionanswer.length == 0" role="radio"> <input type="radio" :value="questionoptions._id" v-model="answerids_single" class="radiosize" ><p class="radio_title empty_title">{{questionoptions.option_text}}</p></span>

<span class="blankline_span  blankline_span_empty" v-if="post.questiondata.option_type==2 && post.questionanswer.length == 0"><input type="checkbox" :value="questionoptions._id" v-model="answerids_multi"  class="radiosize" ><p class="empty_title">{{questionoptions.option_text}}</p></span>
<span class="blankline_span  blankline_span_empty" v-if="questionoptions.answervalue!=true && post.questiondata.option_type==2 && post.questionanswer.length > 0 && post.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)<0"><img src="../assets/icons/checkbox_empty.svg" class="fa_svg_answer" /><p class="empty_title">{{questionoptions.option_text}}</p></span>

<span class="blankline_span blankline_span_correct" v-if="questionoptions.answervalue==true && post.questionanswer.length > 0 && post.questiondata.option_type==2 && post.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)>=0">
<img src="../assets/icons/rightanswer.svg" class="fa_svg_answer" />
<p class="empty_title">{{questionoptions.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span>
<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_right">Your Answer</button>
</span>
</span>
<span class="blankline_span blankline_span_correct" v-if="questionoptions.answervalue==true && post.questionanswer.length > 0 && post.questiondata.option_type==2 && post.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)<0">
<img src="../assets/icons/checkbox_empty.svg" class="fa_svg_answer" />
<p class="empty_title">{{questionoptions.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span>
</span>
<span class="blankline_span blankline_span_wrong" v-if="questionoptions.answervalue==false && post.questionanswer.length > 0 && post.questiondata.option_type==2 && post.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)>=0"><img src="../assets/icons/wronganswer.svg" class="fa_svg_answer" /><p class="empty_title">{{questionoptions.option_text}}</p>
<span class="wrong_button">
<button class="button wrong_btn">Incorrect</button>
</span>
<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_right">Your Answer</button>
</span>
</span>
<span class="blankline_span blankline_span_wrong" v-if="questionoptions.answervalue==false && post.questionanswer.length > 0 && post.questiondata.option_type==1 && questionoptions._id == post.questionanswer[0].answerid"><img src="../assets/icons/dot-circle_incorrect.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{questionoptions.option_text}}</p>
<span class="wrong_button">
<button class="button wrong_btn">Incorrect</button>
</span><span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_wrong">Your Answer</button>
</span></span>
<span class="blankline_span blankline_span_correct" v-if="questionoptions.answervalue=='true' && post.questionanswer.length > 0 && post.questiondata.option_type==1 && questionoptions._id == post.questionanswer[0].answerid"><img src="../assets/icons/dot-circle_correct.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{questionoptions.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span>
<span class="youranswer_button">
<button class="button youranswer_btn youranswer_button_right">Your Answer</button>
</span>
</span>
<span  class="blankline_span blankline_span_empty" v-if="questionoptions.answervalue==false && post.questiondata.option_type==1 && post.questionanswer.length > 0 && questionoptions._id != post.questionanswer[0].answerid"><img src="../assets/icons/radio-on-button.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{questionoptions.option_text}}</p></span>
<span class="blankline_span blankline_span_correct" v-if="questionoptions.answervalue=='true' && post.questionanswer.length > 0 && post.questiondata.option_type==1 && questionoptions._id != post.questionanswer[0].answerid"><img src="../assets/icons/radio-on-button.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{questionoptions.option_text}}</p>
<span class="correct_button">
<button class="button correct_btn">Correct </button>
</span></span>

</label>
</div><!--blankline_radio-->
    <span class="clearfix"></span>
    </span>
</div><!--selection_section-->
 <div class="answer_explantion" v-if="post.questionanswer.length > 0 && post.questiondata.answer_explanation!='' && post.questiondata.answer_explanation!=null">
<p class="a_explntn">Answer Explanation</p>
<p class="sub_explanation" v-html="post.questiondata.answer_explanation"></p>
</div 
>

</div><!---question_preview--->
<div class="article_preview" v-if="post.articleid!=null && post.articleid!='' && post.refPost.length==0 ">
<a :href="`/articleview?id=${post.articledata[0].articleid}`" target="_BLANK">
<div class="article_title">

<pdf :src="fileurl+post.articledata[0].uploaded_file[0]" v-if="post.articledata[0].uploaded_file!=null && post.articledata[0].uploaded_file.length>0 && post.articledata[0].uploaded_file[0].toLowerCase().indexOf('.pdf') >= 0"></pdf>
<img :src="fileurl+post.articledata[0].uploaded_file[0]" class="img-responsive title_imageprview" v-if="post.articledata[0].uploaded_file!=null && post.articledata[0].uploaded_file.length>0 && post.articledata[0].uploaded_file[0].toLowerCase().indexOf('.pdf') < 0" />
<span class="dash_a_title">{{post.articledata[0].articaldata.a_title}}</span>
<div class="author_description" v-if="post.articledata[0].author!=null">
            <!--<div class="image-icon"> <img :src="post.articledata[0].author.profile" class="cursoron user_circle"></div>-->
            <p > {{post.articledata[0].author.firstname+' '+post.articledata[0].author.lastname}}</p> 
           
            </div>
</div>
</a>
</div>
<!-- ************************************** -->
<div class="question_preview" v-if="(post.pollid!=null || post.pollid!='') && post.mypollans=='' " >
  <div class="first_title">
    <span><b v-html="post.polldata.question_text"></b></span>
  </div><!--first_title-->
  
  <div class="selection_section" v-if="post.polloptions!=null">
    <span v-for="(polloption, po_index) in post.polloptions">
    <div class="blankline blankline_radio checkbox">
      <label>
        <span  class="blankline_span blankline_span_empty" v-if="post.polloptions!=null && post.polloptions!=''" role="radio"> <input type="radio" :value="polloption._id" v-model="pollsel" class="radiosize" ><p class="radio_title empty_title">{{polloption.option_text}}</p></span>
      </label>
      </div><!--blankline_radio-->
      <span class="clearfix"></span>
    </span>
  </div><!--selection_section-->
</div><!---poll_preview--->
<!---------------------------------------------->
<div class="poll_questions" v-if="post.mypollans!='' " >
<p class="poll_question_heading" v-html="post.polldata.question_text"></p>
  <div class="poll_single_section" v-for="(polloption, po_index) in post.polloptions">
  <div class="col-sm-2">
    <span class="poll_options"> {{polloption.option_text}} </span>
    </div>
    <div class="col-sm-10">
    <div class="poll_progress">
      <span class="percent" :style="`width:${polloption.count}%`"> {{polloption.count}} % </span>
    </div>
    </div>
  </div>
</div>

<p v-if="post.content!=null" class="content_user" v-html="post.content"> </p>
<a  v-if="post.attached && post.attached.indexOf('http')>=0" :href="post.attached" target="_BLANK"><pdf :src="post.attached"></pdf></a>
<a  v-else-if="post.attached" :href="fileurl+post.attached" target="_BLANK"><pdf :src="fileurl+post.attached"></pdf></a>

<div class="border_rounded_box" v-if="post.refPost.length!=0">
      <img :src="post.refPost.refusers.profile" class="cursoron user_circle"> 
        <p class="user_image_name cursoron">{{post.refPost.refusers.firstname}} {{post.refPost.refusers.lastname}}</p>
        <span class="clearfix"></span>
      <p class="date_user">{{ post.refPost.posted_at | postsumDate}}</p>
      <p v-if="post.refPost.content!=null" class="content_user" v-html="post.refPost.content"> </p>
      <p v-if="post.refPost.questionid!=null" class="content_user" v-html="post.refPost.questionid"> </p>
      <a  v-if="post.refPost.attached && post.refPost.attached.indexOf('http')>=0" :href="post.refPost.attached" target="_BLANK"><pdf :src="post.refPost.attached"></pdf></a>
      <a  v-else-if="post.refPost.attached" :href="fileurl+post.refPost.attached" target="_BLANK"><pdf :src="fileurl+post.refPost.attached"></pdf></a>
      <div class="article_preview" v-if="post.refPost.articleid!=null && post.refPost.articleid!=''">
         <a :href="`/articleview?id=${post.articledata[0].articleid}`" target="_BLANK">
        <div class="article_title">
            <pdf :src="fileurl+post.articledata[0].uploaded_file[0]" v-if="post.articledata[0].uploaded_file!=null && post.articledata[0].uploaded_file.length>0 && post.articledata[0].uploaded_file[0].toLowerCase().indexOf('.pdf') >= 0"></pdf>
<img :src="fileurl+post.articledata[0].uploaded_file[0]" class="img-responsive title_imageprview" v-if="post.articledata[0].uploaded_file!=null && post.articledata[0].uploaded_file.length>0 && post.articledata[0].uploaded_file[0].toLowerCase().indexOf('.pdf') < 0" />
            <span class="dash_a_title">{{post.articledata[0].articaldata.a_title}}</span>
            <div class="author_description" v-if="post.articledata[0].author!=null">
              <p > {{post.articledata[0].author.firstname+' '+post.articledata[0].author.lastname}}</p>
            </div>
        </div>
         </a>
        </div>
    </div>
<div class="buttons_group" v-if="post.questionid==null || post.questionid==''" >
            <template v-for="(tag, tindex) in post.alltags">
              <!-- <a :href="`/resources?id=${tag.unique_id}`" target="_BLANK"><button  v-bind:key="`tags${tindex}`" class="btn btn_one">{{tag.tagname}}</button></a> -->
              <button  v-bind:key="`tags${tindex}`" class="btn btn_one" @click="tagsPost(tag.unique_id,tag.tagname)">{{tag.tagname}}</button>
            </template>
          </div>
<template v-if="post.posted_at < Date.now()">
<div class="sharelinks_main">
<ul class="sharelinks">
<template v-if="rolespermission.indexOf(currentuserdata.role)>=0">
   <li class="report_btn" v-if="post.questionid!=null && post.answercount>0 && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype!='5d15fea98edfed6c417592d9'"> <a :href="`/questionanswerreport?id=${post.questionid}`" target="_blank">Report</a></li>
   <li class="report_btn"  v-if="post.questionid!=null && post.answercount>0 && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype=='5d15fea98edfed6c417592d9'"> <a :href="`/kfpquestionanswerreport?id=${post.questionid}`" target="_blank">Report</a></li>
</template>
   <li v-if="post.questionid!=null && post.answercount>0 && post.questiondata.questiontype!='5d15fea98edfed6c417592d14'"> {{post.answercount}} Answered</li>
  <li class="cursoron" v-if="post.likestatus == 0"><span @click="likeanddislike(post.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /> </span>
  <span v-if="post.likes>0" class="cursoron count_like" @click="showlikers(post.unique_id)">{{post.likes}}</span>
  </li>
  <li class="cursoron" v-if="post.likestatus == 1"><span  @click="likeanddislike(post.unique_id,0)" ><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="post.likes>0" class="cursoron count_like" @click="showlikers(post.unique_id)"> {{post.likes}}</span></li>
  <li class="comment_li cursoron" v-if="(post.questionid==null || post.questionid=='') " @click="showComments(post.unique_id)"><span><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /></span><span v-if="post.allcomments.length>0" class="count_like"> {{post.allcomments.length}}</span></li>
   <li class="comment_li cursoron" v-if="(post.questionid!=null && post.questionid!='' && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype!='5d15fea98edfed6c417592d9') " @click="showComments(post.unique_id)"><span><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /></span><span v-if="post.allcomments.length>0" class="count_like"> {{post.allcomments.length}}</span></li>
  <li class="comment_li cursoron" v-if="(post.questionid!=null && post.questionid!='' && post.questiondata.questiontype=='5d15fea98edfed6c417592d14')"><a :href="`/caseofweekanswer?id=${post.questionid}&subid=${post.childquestionid}`"><span><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /></span><span v-if="post.allcomments.length>0" class="count_like"> {{post.allcomments.length}}</span></a></li>
  <li class="comment_li cursoron" v-if="(post.questionid!=null && post.questionid!='' && post.questiondata.questiontype=='5d15fea98edfed6c417592d9')"><a :href="`/questionanswer?id=${post.questionid}`"><span><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /></span><span v-if="post.allcomments.length>0" class="count_like"> {{post.allcomments.length}}</span></a></li>
  <li class="last_li cursoron" v-if="(post.questionid==null || post.questionid=='') && post.pollid==null " @click="editdialogbox(post.unique_id)"><span><img src="../assets/icons/retweet-light.svg" class="fa_svg_icon extraimgwidth" /></span><span></span></li>
  <li class="last_li cursoron" v-if="post.allsaveposts==0 && post.questionid==null || post.questionid=='' " @click="savePost(post.unique_id,0)"><span><img src="../assets/icons/bookmark.svg" class="fa_svg_icon bookamrktwidth" /></span><span></span></li>
  <li class="last_li cursoron" v-if="post.allsaveposts==1 && post.questionid==null || post.questionid=='' " @click="savePost(post.unique_id,1)"><span><img src="../assets/icons/bookmark_red.svg" class="fa_svg_icon bookamrktwidth" /></span><span></span></li>
  <li class="last_li cursoron" v-if="post.questionanswer.length > 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d9'"><a :href="`/questionanswer?id=${post.questiondata._id}`" target="_BLANK"><span><img src="../assets/icons/answer_selected.svg" class="fa_svg_answericon" /></span><span></span></a></li>
  <li class="last_li cursoron" v-if="post.questionanswer.length == 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d9'"><a :href="`/questionanswer?id=${post.questiondata._id}`" target="_BLANK"><span><img src="../assets/icons/answer.svg" class="fa_svg_answericon" /></span><span></span></a></li>

  <li class="last_li cursoron" v-if="post.questionanswer.length > 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d14'"><a :href="`/caseofweekanswer?id=${post.questionid}&subid${post.childquestionid}`" target="_BLANK"><span><img src="../assets/icons/answer_selected.svg" class="fa_svg_answericon" /></span><span></span></a></li>
  <li class="last_li cursoron" v-if="post.questionanswer.length == 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d14'"><a :href="`/caseofweekanswer?id=${post.questionid}&subid${post.childquestionid}`" target="_BLANK"><span><img src="../assets/icons/answer.svg" class="fa_svg_answericon" /></span><span></span></a></li>

  <li class="last_li cursoron" v-if="post.questionid!=null && post.questionanswer.length == 0 && post.questiondata.questiontype!='5d15fea98edfed6c417592d9' && post.questiondata.questiontype!='5d15fea98edfed6c417592d14'"><button  class="btn q_prvw_sbmtbtn" type="button" @click="submitAnswer(post.questiondata._id,post.questiondata.option_type)">Submit</button></li>

  <li class="last_li cursoron" v-if="post.pollid!=null && post.mypollans==''"><button  class="btn q_prvw_sbmtbtn" type="button" @click="chooseoption(post.unique_id,post.pollid,pollsel)">Submit</button></li>

  <li class="last_li cursoron read_dashboard_btn" v-if="post.articleid!=null && post.articleid!=''"><a :href="`/articleview?id=${post.articledata[0].articleid}`"><button target="_BLANK" class="btn q_prvw_sbmtbtn" type="button">Read</button></a></li>
</ul>
</div>
</template>
<template v-else>
 <div class="sharelinks_main">Scheduled to be posted on {{post.posted_at | timeleft}}</div> 
</template>

<div v-if="showComment==post.unique_id">
  <div  v-for="(commentsofpostdata,commindex) in commentsofpost">

  <div class="chats dashboard_chat">
  <span v-if="commentsofpostdata.asynccheck==true">
    <img :src="fileurl+anonymousimags[Math.floor(Math.random() * anonymousimags.length)]" class=" user_circle"> <p class="usernmechats">{{commentsofpostdata.dummyname}}</p>
 </span>
  <span v-else>
    <img :src="commentsofpostdata.commentby.profile" class=" user_circle"> <p class="usernmechats">{{commentsofpostdata.commentby.firstname}} {{commentsofpostdata.commentby.lastname}}</p>
 </span>
  
    <div class="chatter">
<!--  ********************************************************************************************  -->
     <span v-if="commentsofpostdata.editflag==false" v-html="commentsofpostdata.content"></span>
    <span v-else>
    <span  @click="updateEditComment(post.unique_id,commindex,commentsofpostdata._id)" class="cursoron">
    <span class="send_svg_icon add_comment1">Update</span>
    </span>
    <div class="read_more" v-if="commentsofpostdata.questionid!=null && commentsofpostdata.editflag==false" > <a :href="`/userquestionanswer?qid=${post.questionid}&uid=${commentsofpostdata.commentby.unique_id}`" target="_BLANK">Read The Answer</a></div>
    <textarea v-model="commentsofpostdata.content" class="add_newcomment" >{{commentsofpostdata.content}}</textarea></span>

<!--  ********************************************************************************************  -->
  <div class="last_li date_right">{{ commentsofpostdata.created_at | postsumDate}}</div>
      <ul class="sharelinks_chaatter">
        <li class="cursoron" v-if="commentsofpostdata.likestatus == 0"><span @click="comlikeanddislike(commentsofpostdata.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" class="cursoron" @click="showcommentlikers(commentsofpostdata.unique_id)">{{commentsofpostdata.likes}}</span></li>

        <li class="cursoron" v-if="commentsofpostdata.likestatus == 1"><span @click="comlikeanddislike(commentsofpostdata.unique_id,0)"><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" class="cursoron" @click="showcommentlikers(commentsofpostdata.unique_id)">{{commentsofpostdata.likes}}</span></li>

        <li class="comment_li cursoron" @click=showReply(post.unique_id,commentsofpostdata.unique_id)><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /><span v-if="commentsofpostdata.commentofcomment.length>0">{{commentsofpostdata.commentofcomment.length}}</span></li>
<!--  ********************************************************************************************  -->
        <template v-if="commentsofpostdata.commentby.unique_id==currentuser || commpermission.indexOf(currentuserdata.role)>=0">
          <template v-if="commentsofpostdata.settingflag==false">
            <li class="cursoron"><span  @click="commentsofpostdata.settingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
          </template>
          <template v-else>
            <li class="cursoron"><span @click="editComment(pindex,commindex)" ><img src="../assets/icons/edit.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
            <li class="cursoron"><span @click="removecomment(post.unique_id, commentsofpostdata.unique_id)" ><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
          </template>
        </template>
<!--  ********************************************************************************************  -->
      </ul>
    </div>
    <div class="replyfield" v-if="replyflag==commentsofpostdata.unique_id">
      <span class="comm_current_user reply_field"><img :src="currentuserdata.profile" class="circle_image"></span>
      <span @click="addReply(commentsofpostdata.unique_id,commentsofpostdata.unique_id)" class="cursoron"><span class="send_svg_icon reply_link1">Reply</span></span>
     <!--  <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" ></textarea> -->
      <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" @keyup="comment_content" ></textarea>
      <ul class="usercommentss">
          <li v-for="htag in srchHashTags" @click="selcommhashtag(htag.categoryname,htag)">{{htag.categoryname}}</li>
      </ul>
    </div>
</div>
  <div class="chats second_chats dashboard_chat" v-for="(commentsofpost_reply, crindex) in commentsofpostdata.commentofcomment">
    <img :src="commentsofpost_reply.commentby_n.profile" class=" user_circle"> <p class="usernmechats">{{commentsofpost_reply.commentby_n.firstname}} {{commentsofpost_reply.commentby_n.lastname}}</p>
    <div class="chatter">
      <!--  ********************************************************************************************  -->
    
    <div class="bg_part">
     <img src="../assets/images/left-quote.svg" class="big_svg" />
      <span class="reply_on_comnt "  v-if="commentsofpost_reply.parentcontent && commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.parentcontent[0].content"></span>
      <span class="date_time_of_cmt"> {{commentsofpost_reply.parentcontent[0].replyby.firstname}} {{commentsofpost_reply.parentcontent[0].replyby.lastname}}, {{commentsofpost_reply.parentcontent[0].created_at | postsumDate }} </span> 
      <span class="reply_on_comnt_reply"v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.content"></span>
      <span v-else>
      <span  @click="updateEditReply(post.unique_id,commindex,crindex,commentsofpost_reply._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
    <textarea v-model="commentsofpost_reply.content" class="add_newcomment" >{{commentsofpost_reply.content}}</textarea></span></div>

<!--  ********************************************************************************************  -->
      <div class="last_li date_right">{{ commentsofpost_reply.created_at | postsumDate}}</div>
      <ul class="sharelinks_chaatter">
        <li class="cursoron" v-if="commentsofpost_reply.likestatus == 0"><span @click="comlikeanddislike(commentsofpost_reply.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /></span><span v-if="commentsofpost_reply.likes>0" class="cursoron" @click="showcommentlikers(commentsofpost_reply.unique_id)">{{commentsofpost_reply.likes}}</span></li>

        <li class="cursoron" v-if="commentsofpost_reply.likestatus == 1"><span @click="comlikeanddislike(commentsofpost_reply.unique_id,0)">
          <img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="commentsofpost_reply.likes>0" class="cursoron" @click="showcommentlikers(commentsofpost_reply.unique_id)">{{commentsofpost_reply.likes}}</span></li>
        <li class="comment_li cursoron" @click=showCommReply(commentsofpostdata.unique_id,commentsofpost_reply.unique_id)><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth"/></li>
  <!--  ********************************************************************************************  -->
        <template v-if="commentsofpost_reply.commentby_n.unique_id==currentuser || commpermission.indexOf(currentuserdata.role)>=0 ">
            <template v-if="commentsofpost_reply.rsettingflag==false">
              <li class="cursoron"><span  @click="commentsofpost_reply.rsettingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
            </template>
            <template v-else>
              <li class="cursoron"><span  @click="editReply(pindex,commindex,crindex)"><img src="../assets/icons/edit.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
              <li class="cursoron"><span @click="removeReply(post.unique_id, commentsofpost_reply._id)"><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
            </template>
        </template>
  <!--  ********************************************************************************************  -->
      </ul>
    </div>
  <div class="replyfield" v-if="replyflagR==commentsofpost_reply.unique_id">
      <span class="comm_current_user reply_field"><img :src="currentuserdata.profile" class="circle_image circle_image2"></span>
      <span @click="addReply(commentsofpostdata.unique_id,commentsofpost_reply.unique_id)" class="cursoron "><span class="send_svg_icon reply_link2">Reply</span></span>
      <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" @keyup="comment_content" ></textarea>
      <ul class="usercommentss">
          <li v-for="htag in srchHashTags" @click="selcommhashtag(htag.categoryname,htag)">{{htag.categoryname}}</li>
      </ul>
  </div>
  </div>
</div>
<div class="commentfield" >
<!-- <div class="commentfield" v-if="replyflag != post.unique_id"> -->
<span class="comm_current_user commemt_user1"><img :src="currentuserdata.profile" class="circle_image"></span>
<span @click="addComment()" class="cursoron "><span class="send_svg_icon add_comment1">Add Comment</span></span>
<textarea v-model="comment" class="add_newcomment" placeholder="Please comment here" @keyup="comment_content"></textarea>
<ul class="usercommentss">
    <li v-for="htag in srchHashTags" @click="selcommhashtag(htag.categoryname,htag)">{{htag.categoryname}}</li>
</ul>
<!-- <v-text-field :label="solo" ref="commentbox" placeholder="Please comment here" class="add_newcomment" v-model="comment" autofocus></v-text-field> -->
</div>

</div>
</div>
</div>
<div >
  <span v-if="loading2==true"><img src="../assets/images/reloader2.gif" width='15%' height='1%' ></span>
</div>
<div>
  <span v-if="topbutton==true"><button  class="btn q_prvw_sbmtbtn" type="button" @click="backToTop()">Top</button></span>
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
 <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Please Add Link <span class="crosspopup" @click="dialog=false">x</span>
        </v-card-title>

        <v-card-text>
        <input type="text" v-model="post_link"/>
        </v-card-text>
         <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="manu_content"
          >
            Add
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <v-dialog
      v-model="addtags2"
      width="500"
    >
      <v-card><v-card-title
          class="headline grey lighten-2 sticky_grey"
          primary-title
        >
          <span class="crosspopup" @click="addtags2=false">x</span>
        </v-card-title>
        <v-card-text class="sticky_search">
        <i class="fa fa-search"></i><input type="text" v-model="tag_search" @keyup="searchtags" placeholder="Search"/>
        </v-card-text>
        <v-chip v-for="(posttag, tagindex) in posttags" v-bind:key="`tag${tagindex}`" v-if="posttag.tagname!=null" @click="activatetag(posttag.unique_id,posttag)"  v-bind:class="{activetag:sel_tags.indexOf(posttag.unique_id) >= 0}" >
          {{posttag.tagname}}
       </v-chip>

<div class="mainpopup_btn">
<button class="btn btn_edit" @click="addtags2=false">Submit</button>
</div>
       </v-card>
    </v-dialog>
<!-- ******************************************************************************************************************************************** -->
    <v-dialog v-model="edaddtags" width="500" >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title  >
          <span class="crosspopup" @click="edaddtags=false">x</span>
        </v-card-title>
        <v-card-text>
          <i class="fa fa-search"></i><input type="text" v-model="edtag_search" @keyup="searchReftags" placeholder="Search"/>
        </v-card-text>
        <v-chip v-for="(edposttag, tagindex) in edposttags" v-bind:key="`tag${tagindex}`" @click="activateReftag(edposttag.unique_id,edposttags)"  v-bind:class="{activetag:edsel_tags.indexOf(edposttag.unique_id) >= 0}" >
          {{edposttag.tagname}}
       </v-chip>
       <div class="mainpopup_btn">
          <button class="btn btn_edit" @click="edaddtags=false">Submit</button>
        </div>
      </v-card>
    </v-dialog>
<!-- ******************************************************************************************************************************************** -->
    <v-dialog v-model="editdialog" width="1000">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <span class="crosspopup cp_scheduler" @click="editdialog=false">x</span>
        </v-card-title>
        <v-card-text>
          <div v-for="(edPost, pindex) in editedPost"  v-bind:key="`tags${pindex}`">
            <div>
              <!-- <input type="text" class="post_input_default" @click="edshowmainpostool" v-if="edpostdefault_flag" placeholder="Write a post or" /> -->
           <!--  <span class="add_topic cursoron" v-if="edpost_flag" @click="edaddtags=true"><img src="../assets/icons/layer-plus.svg" class="fa_svg_icon"/> Add a tag </span>
            <input type="text" class="post_input_default" @click="edshowmainpostool" v-if="edpostdefault_flag" placeholder="Write a post or" /> -->
            <div class="post_context_wrap">
              <div class="post_context">
              <span class="add_topic cursoron" @click="edaddtags=true"><img src="../assets/icons/layer-plus.svg" class="fa_svg_icon"/> Add a tag </span>
                <!-- <textarea class="post_input" v-model="edpost_content_temp" ref="post_content_tempf" placeholder="Write a post or" :autofocus="'autofocus'"></textarea> -->

                <textarea class="post_input" v-model="edpost_content_temp" ref="post_content_tempf" placeholder="Write a post or" @keyup="remanu_content" :autofocus="'autofocus'"></textarea>
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
                <li  class=" btn_postshort scheduler cursoron" @click="edaddscheduler=true"><img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon" /></li>
                </ul>
              </div>
              <!-- <div class="tag_container" v-if="edaddtags" >
                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title >
                    <span class="crosspopup" @click="edaddtags=false">x</span>
                  </v-card-title>
                  <v-card-text>
                    <i class="fa fa-search"></i><input type="text" v-model="edtag_search" @keyup="searchReftags" placeholder="Search"/>
                  </v-card-text>
                  <v-chip v-for="(edposttag, tagindex) in edposttags" v-bind:key="`tag${tagindex}`" @click="activateReftag(edposttag.unique_id)"  v-bind:class="{activetag:edsel_tags.indexOf(edposttag.unique_id) >= 0}" > {{edposttag.tagname}} </v-chip>
                </v-card>
              </div> -->
            </div>
            <textarea style="display:none;" class="post_input" v-model="post_content" >{{post_content}}</textarea>
            <v-chip class="small_chips" v-for="(posttag, tagindex) in retweet_temptags" v-bind:key="`tag${tagindex}`" v-if="retweet_temptags.indexOf(posttag.unique_id) >= 0" >{{posttag.tagname}}</v-chip>
          </div>
          
          <!-- **********************************************************post content***************************************************************  -->
          <div class="userdiv">
            <p v-if="edPost.content!=null" class="content_user" v-html="edPost.content"> </p>
            <a  v-if="edPost.attached && edPost.attached.indexOf('http')>=0" :href="edPost.attached" target="_BLANK"><pdf :src="edPost.attached"></pdf></a>
            <a  v-else-if="edPost.attached" :href="fileurl+edPost.attached" target="_BLANK"><pdf :src="fileurl+edPost.attached"></pdf></a>
          </div>
          <div class="button_previw"><button class="btn q_prvw_sbmtbtn" type="button" @click="referencePost(edPost.unique_id )">Repost</button></div>
          <!-- <div class="button_previw">
            <ul class="list_right_edit">
              <li><button class="btn btn_edit " @click="referencePost(edPost.unique_id)">Add post</button></li>
            </ul>
          </div> -->
        </div>
        </v-card-text>
      </v-card>
    </v-dialog>
<!-- ******************************************************************************************************************************************** -->
<v-dialog v-model="edaddscheduler" width="600">
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title >
          Select date and time <span class="crosspopup cp_scheduler" @click="edaddscheduler=false">x</span>
    </v-card-title>
    <v-card-text>
      <div class="schedulercontainer">
        <v-date-picker v-model="datepicker" @change="edupdateddatentime" ></v-date-picker>
        <div class="scheduler_com">
          <v-text-field  v-model="edscheduledate" value="scheduledate" ></v-text-field>
        </div>
        <div class="scheduler_com2">
          <v-select
                 :items="hours"  v-model="edscheduletimehrs"
          ></v-select>
          <v-select
            :items="minutes"
                v-model="edscheduletimemins"
          ></v-select>
          <v-select
            :items="ampm"
                v-model="edscheduletimeapm"
          ></v-select>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
          <v-spacer></v-spacer>
          <input @click='edset_scheduler' name="Set" type="submit" class="submit_btn set_scheduler" />
    </v-card-actions>
  </v-card>
</v-dialog>
<!-- ************************************************************************************************************ -->
  <v-dialog v-model="addscheduler" width="600" >
    <v-card>
      <v-card-title class="headline grey lighten-2"  primary-title>
          Select date and time <span class="crosspopup cp_scheduler" @click="addscheduler=false">x</span>
      </v-card-title>
      <v-card-text>
        <div class="schedulercontainer">
          <v-date-picker v-model="datepicker" @change="updateddatentime" ></v-date-picker>
          <div class="scheduler_com">
            <v-text-field v-model="scheduledate" value="scheduledate"></v-text-field>
          </div>
          <div class="scheduler_com2">
            <v-select  :items="hours"  v-model="scheduletimehrs" ></v-select>
            <v-select  :items="minutes" v-model="scheduletimemins" ></v-select>
            <v-select  :items="ampm"  v-model="scheduletimeapm"></v-select>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <input @click='set_scheduler' name="Set" type="submit" class="submit_btn set_scheduler" />
      </v-card-actions>
    </v-card>
  </v-dialog>
    <!-- *************************************************************************************************************************************** -->
    <v-dialog v-model="report" width="700">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Report <span class="crosspopup cp_scheduler" @click="report=false">x</span>
        </v-card-title>
        <v-card-text>
          <div class="post_context">
            <input type="hidden" name="postdata" :value="postdata">
            <textarea class="post_input" v-model="report_content" placeholder="Write a report here" :autofocus="'autofocus'"></textarea>
          </div>
          <div class="button_previw"><button class="btn q_prvw_sbmtbtn" type="button" @click="submitReport(postdata)">Report</button></div>  
        </v-card-text>
      </v-card>
    </v-dialog>
  <!-- *************************************************************************************************************************************** -->
      </v-layout>
  </v-container>
  
</template>
<script>
import moment from 'moment'
import getusername from './users/username'
import pdf from 'vue-pdf'
var username=localStorage.username;
var datetime = new Date();

  export default {
      components: {getusername,pdf},
      data(){
      return {
        post_content:null,
        reply_commentid:null,
        comment_postid:null,
        post_content_temp:null,
        currentuser:null,
        tempid:null,
        libimage:null,
        tempposttags:[],
        retweet_temptags:[],
      errors: [],
      posts:[],
      hours:['01','02','03','04','05','06','07','08','09','10','11','12'],
      minutes:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
      ampm:['AM','PM'],
     dialog: false,
     loading2: false,
     topbutton: false,
     range:20,
     postdefault_flag:true,
      post_flag:false,
      remove_previewpdf:false,
      post_fileflag:false,
      addtags:false,
      show_down:false,
      addtags2:false,
      addscheduler:false,
       posttypes:[],
       post_link:null,
       post_file:"",
       post_filecontent:"",
       rolespermission:['1','2','7','11','12','14','15','18','19'],
       commpermission:['1','2'],
       scheduledate:moment().format('YYYY-MM-DD'),
       scheduletime:null,
       scheduletimehrs:moment().format('hh'),
       scheduletimemins:moment().format('mm'),
       scheduletimeapm:moment().format('A'),
       datepicker:null,
       tag_search:null,
       activeOpt: 0,
      showOption: null,
      showComment: null,
      posttags:null,
      imgflag:true,
      sel_tags:[],
      editedtags:[],
      allimages:[],
      fbresponse:null,
      attachements:null,
      fileurl:window.publicfileurl,
      previewattachlink:null,
      comment:null,
      replyflag:null,
      replyflagR:null,
      replyoncomment:null,
      commentsofpost:null,
      editedcomment:null,
      commentliker:false,
      commentlikers:[],
      postliker:false,
      postlikers:[],
      items: [],
      answerids_single:'',
      answerids_multi:[],
      pdfpreviewimage:null,
      editpdfpreviewimage:null,
      postdata:null,
      postedit:null,
      posteditid:null,
      report:false,
      report_content:null,
      edscheduledate:moment().format('YYYY-MM-DD'),
      edscheduletimehrs:moment().format('hh'),
      edscheduletimemins:moment().format('mm'),
      edscheduletimeapm:moment().format('A'),
      edposttags:null,
      edpost_content:null,
      edpost_content_temp:null,
      editedPost:[],
      editdialog: false,
      edpostdefault_flag:true,
      edremove_previewpdf:false,
      edpost_fileflag:false,
      edpreviewattachlink:null,
      edaddtags:false,
      edaddscheduler:false,
      edpost_filecontent:"",
      edtag_search:null,
      uploadedfilename:null,
      bottom:false,
      anonymousimags:['/icons/anonymoususer_1.svg','/icons/anonymoususer_2.svg','/icons/anonymoususer_3.svg','/icons/anonymoususer_4.svg','/icons/anonymoususer_5.svg'],
      edsel_tags:[],
      pollchart:false,
      pollsel:'',
      nextlength:0,
      tid:null,
      tidname:'',
      htagtext:'',
      rehtagtext:'',
      editedPostcontent:'',
      srchHashTags:'',
      resrchHashTags:'',
      scheduledatetime:moment().format('YYYY-MM-DD hh:mm:ss A'),
      hashname:''
      }
    },
    // computed: 
    // {
    //   strippedContent() 
    //   {
    //     let regex = /(<([^>]+)>)/ig;
    //     return this.post_content_temp.replace(regex, "");
    //   }
    // },
    methods: {
      comment_content()
      { 
        this.srchHashTags = [];
        var re = /(?:^|[ ])#([a-zA-Z]+)/gm;
        var str = '';
        if(this.comment !=null)
        {
          console.log('tempcontent-',this.comment)
          str = this.comment

        }
        else if(this.replyoncomment !=null)
        {
          console.log('tempcontent-',this.comment)
          str = this.replyoncomment

        }
        var m;
        while((m = re.exec(str)) != null)
        {
          if(str.charAt(re.lastIndex)!=" " && str.charAt(re.lastIndex)!="." && str.charAt(re.lastIndex)!="_")
          {
            this.htagtext="#"+m[1]
            axios.post(`/gethashtaglists`,{'searchedtopic':m[1]})
            .then(response => {
                this.srchHashTags = response.data;
            });
          }
          
        }
      },
      selcommhashtag(htagname, htagdata)
      {
        if(this.comment !=null)
        {
          console.log('htagtext-',this.htagtext)
          htagname=htagname.replace(/ /g,"_");
          var res = this.comment.replace(this.htagtext, "#"+htagname+"");
          this.comment = res;
          this.srchHashTags = [];
        }
        else if(this.replyoncomment !=null)
        {
          console.log('htagtext-',this.htagtext)
          htagname=htagname.replace(/ /g,"_");
          var res = this.replyoncomment.replace(this.htagtext, "#"+htagname+"");
          this.replyoncomment = res;
          this.srchHashTags = [];
        } 
      },
      bottomVisible() {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + scrollY >= pageHeight
        return bottomOfPage || pageHeight < visible
      },
      backToTop()
      {
        window.scrollTo(0, 0); 
      },
      UpdatePostfileContent(){
        console.log("filelink", this.post_file);
        var filelink = this.post_file.toLowerCase();
        if(this.uploadedfilename.toLowerCase().indexOf("/publicfiles/") >= 0)
        {
          var newfile =  this.uploadedfilename.split('_')
          this.uploadedfilename = newfile[1]
        }
        if(this.post_file == ""){
          return;0
        }
        if(this.post_file.toLowerCase().indexOf(".png") >= 0 || this.post_file.toLowerCase().indexOf(".jpg") >= 0 || this.post_file.toLowerCase().indexOf(".gif") >= 0 || this.post_file.toLowerCase().indexOf(".bmp") >= 0 || this.post_file.toLowerCase().indexOf(".jpeg") >= 0 ){
          this.post_filecontent = '<div class="preview-filecontent"><a href="'+window.publicfileurl+this.post_file+'" target="_BLANK"><img src="'+window.publicfileurl+this.post_file+'" class="p-fileprev"></a></div>';
       this.post_fileflag=true
        }
        else if(this.post_file.toLowerCase().indexOf(".pdf") >= 0){
          var attachlink=this.post_file;
        this.attachements=attachlink;

        this.createpdfpreviewimage(this.post_file);
        this.previewattachlink=window.publicfileurl+this.post_file;
        this.remove_previewpdf=true
        }
        else if(this.post_file.toLowerCase().indexOf(".doc") >= 0 || this.post_file.toLowerCase().indexOf(".docx") >= 0) {
          this.post_filecontent = '<div class="preview-filecontent"><a href="'+window.publicfileurl+this.post_file+'" target="_BLANK"><img src="'+window.publicfileurl+'/pdfthumbnails/file-type-word.png" class="preview-fileicon"><span class="upload_filename">'+this.uploadedfilename+'</span></a></div>';
        this.post_fileflag=true}
         else if(this.post_file.toLowerCase().indexOf(".xls") >= 0 || this.post_file.toLowerCase().indexOf(".xlsx") >= 0) {
          this.post_filecontent = '<div class="preview-filecontent"><a href="'+window.publicfileurl+this.post_file+'" target="_BLANK"><img src="'+window.publicfileurl+'/pdfthumbnails/file-type-excel.png" class="preview-fileicon"><span class="upload_filename">'+this.uploadedfilename+'</span></a></div>';
        this.post_fileflag=true}
         else if(this.post_file.toLowerCase().indexOf(".ppt") >= 0 || this.post_file.toLowerCase().indexOf(".pptx") >= 0) {
          this.post_filecontent = '<div class="preview-filecontent"><a href="'+window.publicfileurl+this.post_file+'" target="_BLANK"><img src="'+window.publicfileurl+'/pdfthumbnails/file-type-powerpoint.png" class="preview-fileicon"><span class="upload_filename">'+this.uploadedfilename+'</span></a></div>';
        this.post_fileflag=true}
         else if(this.post_file.toLowerCase().indexOf(".csv") >= 0 || this.post_file.toLowerCase().indexOf(".csvx") >= 0) {
          this.post_filecontent = '<div class="preview-filecontent"><a href="'+window.publicfileurl+this.post_file+'" target="_BLANK"><img src="'+window.publicfileurl+'/pdfthumbnails/file-type-csv.png" class="preview-fileicon"><span class="upload_filename">'+this.uploadedfilename+'</span></a></div>';
        this.post_fileflag=true}
        else {
          this.post_filecontent = '<div class="preview-filecontent"><a href="'+window.publicfileurl+this.post_file+'" target="_BLANK"><img src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/12.File-512.png" class="preview-fileicon"><span class="upload_filename">'+this.uploadedfilename+'</span></a></div>';
        this.post_fileflag=true}
      
      },
      async attachfiletopost()
      {
        this.post_filecontent=''
        this.post_fileflag=false
        this.post_file = "dfghdkhgkjdf";

        const file = this.$refs.file.files[0];
        this.uploadedfilename=file.name
        const formData = new FormData();
        formData.append("file", file);
        try{
          const res = await axios.post("/upload", formData);
          console.log(res.data);
          this.post_file = res.data.file
          // this.post_file = "/publicfiles/1562488138436_desktop back.aaaaa";
          this.UpdatePostfileContent();
        } catch(err){
          console.log(err);
          
        }
      },
      async createpdfpreviewimage(filename)
      {
        var filenames=filename.split("/");
        await  axios.post(`/convertpdftopreview`,{'pdfname':filenames[2]})
        .then(response => {    
          axios.post(`/getFilesizeInBytes`,{'filename':response.data.imgurl})
          .then(response1=> {
            this.pdfpreviewimage=response1.data.imgurl; 
          })
          .catch(e => {
              this.errors.push(e)
          }) 
        })
        .catch(e => {
          this.errors.push(e)
        })
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
        }); 
        this.editdialog=true;
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
    tagsPost(tid,tagname)
    {
      
      console.log('tid-',tid)
      this.tid=tid
      this.tidname=tagname
      axios.post(`/getallposts`,{range:this.range,seltags:tid, loginid:this.currentuser})
        .then(response => {
          console.log(response.data)
          this.posts = response.data
        });
    },
    removetid()
    {
      this.tid=null
      this.tidname=''
      location.reload()
      // this.getallpost();
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
      createpost()
      {
        var re =  /(?:^|[ ])#([a-zA-Z_0-9-!@$%&*]+)/gm;
        var str=this.post_content_temp;
        var m;
        var hashtags=[];
        while ((m = re.exec(str)) != null) 
        {
          if (m.index === re.lastIndex) 
          {
            re.lastIndex++;
          }
            if(hashtags.indexOf(m[1])==-1)
            {
              hashtags.push(m[1])
            }
        }
        console.log('hashtags-',hashtags)
        axios.post(`/createhashtag`,{'htagname':hashtags, 'loginid':this.currentuser})
        .then(response => {
          console.log(response.data)
        })
        .catch(e => {
          this.errors.push(e)
        })
        if(this.post_content_temp != null && this.post_content != null){
       this.post_content='<p class="post_row_content">'+this.post_content_temp.replace(/\r?\n/g, '<br />')+'</p>'+this.post_content
        }else if(this.post_content_temp != null && this.post_content == null ){
         this.post_content='<p>'+this.post_content_temp.replace(/\r?\n/g, '<br />')+'</p>'
        }else{
          this.post_content=this.post_content
        }
       if(this.post_content || this.post_file){
         if(this.scheduledatetime!==null){
          this.scheduledatetime= moment(this.scheduledatetime).unix()*1000
         }else{
           this.scheduledatetime=Date.now();
         }
         var finalpostcontent = this.post_content+this.post_filecontent;
         var finaltags = this.sel_tags.join(",");
         var attachement = this.attachements;

        axios.post('/addpostbyweb',{pdfpreviewimage:this.pdfpreviewimage,questionid:null,attachement:attachement,tags:finaltags,searchcontent:finalpostcontent,postcontent:finalpostcontent,createdby:this.currentuser,scheduledatetime:this.scheduledatetime})
        .then((response)=>{
           this.getallpost();
            this.post_content=null
            this.post_content_temp=null
            this.post_link=null
            this.post_file=""
            this.post_filecontent=""
            this.sel_tags = []
            this.post_fileflag=false
            this.remove_previewpdf=false
        })
        .catch((error)=>{
            console.log(error);
        })
       }
      },

    reselhashtag(rehtagname, rehtagdata)
    {
      console.log('rehtagtext-',this.rehtagtext)
      rehtagname=rehtagname.replace(/ /g,"_");
      var res = this.edpost_content_temp.replace(this.rehtagtext, "#"+rehtagname+"");
      this.edpost_content_temp = res;
      this.resrchHashTags = [];
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
          if(this.edscheduledatetime!==null){
            this.edscheduledatetime= moment(this.edscheduledatetime).unix()*1000
          }else{
             this.edscheduledatetime=Date.now();
          }
          var finalpostcontent = this.edpost_content_temp;
          var finaltags = this.edsel_tags.join(",")+','+this.editedPost[0].tags;
          var finalarticleid = this.editedPost[0].articleid;
          var finalpollid = this.editedPost[0].pollid;
          var finaleventid = this.editedPost[0].eventid;

        console.log('content-',finalpostcontent);
        console.log('tags-',finaltags);
        console.log('sch-',this.edscheduledatetime);
        console.log('articleid-',this.editedPost[0].articleid);
        console.log('pollid-',this.editedPost[0].pollid);
        console.log('event-',this.editedPost[0].eventid);

        axios.post('/addpostbyweb',{pdfpreviewimage:null, questionid:null, articleid:finalarticleid, pollid:finalpollid, eventid:finaleventid, attachement:null, tags:finaltags, searchcontent:finalpostcontent, postcontent:finalpostcontent, createdby:this.currentuser, scheduledatetime:this.edscheduledatetime, parentid:refPostid})
        .then((response)=>{
           this.getallpost();
            this.edpost_content=null
            this.edpost_content_temp=null
            this.edpost_link=null
            this.edpost_file=""
            this.edpost_filecontent=""
            this.edsel_tags = []
            this.edpost_fileflag=false
            this.edremove_previewpdf=false
            this.editdialog=false
        })
        .catch((error)=>{
            console.log(error);
        })
       }
      },
      createeditpost(ep_id)
      {
        var newdate=moment(this.scheduledatetime).format('YYYY-MM-DD')
        this.scheduledatetime = moment(this.scheduledatetime).unix()*1000
        console.log('newdate-',newdate);
        console.log('editid-',ep_id);
        console.log('editpost-',this.postedit);
        console.log("result")
        console.log('cu-',this.currentuser)
        console.log('pdfp-',this.pdfpreviewimage)
        console.log('attch-',this.attachements)
        var finaltags=this.sel_tags.join(",")
        console.log('tags-',finaltags)
        if(this.post_content_temp != null && this.post_content != null)
        { this.post_content='<p class="post_row_content">'+this.post_content_temp.replace(/\r?\n/g, '<br />')+'</p>'+this.post_content }
        else if(this.post_content_temp != null && this.post_content == null )
        { this.post_content='<p>'+this.post_content_temp.replace(/\r?\n/g, '<br />')+'</p>' }
        else{ this.post_content=this.post_content }

        if(this.post_content || this.post_file)
        {
            var finalpostcontent = this.post_content+this.post_filecontent;
        }
        else
        {
            var finalpostcontent= this.post_content
        }
        console.log('content-',finalpostcontent);
        console.log('scheduledatetime-',newdate);
        console.log('scheduledatetime-',this.scheduledatetime);
        
        // axios.post('/updateEditedpost',{edt_postid:ep_id,postcontent:finalpostcontent,searchcontent:finalpostcontent,scheduledatetime:this.scheduledatetime,tags:finaltags,attachement:this.attachements,pdfpreviewimage:this.pdfpreviewimage,updatedby: this.currentuser})
        //   .then((response)=>{
        //     this.postedit=null
        //     this.post_content=null
        //     this.post_content_temp=null
        //     this.post_link=null
        //     this.post_file=""
        //     this.attachements=null
        //     this.pdfpreviewimage=null
        //     this.post_filecontent=""
        //     this.sel_tags = []
        //     this.remove_previewpdf=false
        //     this.post_fileflag=false
        //     this.getallpost();
        //   })
        //   .catch((error)=>{
        //     console.log(error);
        //   })
      },
      editpost(postid)
      {
        console.log(postid);
        this.postdefault_flag=false 
        this.post_flag=true
        this.showOption=null
        this.posteditid=postid
        axios.post(`/getonepost`,{post_id:postid, loginid:this.currentuser})
        .then(response => 
        {
          this.postedit = response.data
          console.log('postedit-',response.data)  
          this.scheduledatetime = this.postedit[0].posted_at;      
          var arr=[];
          var selarr=[];
          this.postedit[0].alltags.forEach(function(entry) 
          {
            console.log('entry-',entry.unique_id)
            arr.push({'tagname':entry.tagname, 'unique_id':entry.unique_id})
            selarr.push(entry.unique_id,)
          });
          this.sel_tags=selarr;
          this.tempposttags=arr;
          console.log('sel_tags-',this.sel_tags)   
          console.log('tempposttags-',this.tempposttags) 
          this.post_content_temp=this.postedit[0].tempcontent.replace(/<br ?\/?>/g, "\n")
          this.post_content_temp=this.post_content_temp.replace(/<[\/]{0,1}(p)[^><]*>/ig,"")
          if(this.postedit[0].temppostfile!=null)
          {
            this.uploadedfilename=this.postedit[0].temppostfile
            this.post_file=this.postedit[0].temppostfile
            console.log('post_file-',this.post_file)
            this.UpdatePostfileContent();
          }
          
          if(this.postedit[0].attached!=null)
          {
            this.post_file=this.postedit[0].attached
            if(this.post_file!=null && this.post_file.toLowerCase().indexOf(".pdf") >= 0)
            {  
              console.log('if')
              var attachlink=this.post_file;
              this.attachements=attachlink;
              this.createpdfpreviewimage(this.post_file);
              this.previewattachlink=window.publicfileurl+this.post_file;
              this.remove_previewpdf=true
            }
          }        
        }); 
      },
    selhashtag(htagname, htagdata)
    {
      console.log('htagtext-',this.htagtext)
      htagname=htagname.replace(/ /g,"_");
      var res = this.post_content_temp.replace(this.htagtext, "#"+htagname+"");
      this.post_content_temp = res;
      this.srchHashTags = [];
    },
     manu_content()
     {
      this.srchHashTags = [];
      console.log('tempcontent-',this.post_content_temp)
        var count=0;
        var re = /(?:^|[ ])#([a-zA-Z]+)/gm;
        var str = this.post_content_temp
        var m;
        while((m = re.exec(str)) != null)
        {
          if(str.charAt(re.lastIndex)!=" " && str.charAt(re.lastIndex)!="." && str.charAt(re.lastIndex)!="_")
          {
            this.htagtext="#"+m[1]
            axios.post(`/gethashtaglists`,{'searchedtopic':m[1]})
            .then(response => {
                this.srchHashTags = response.data;
            });
          }
          
        }
        // console.log('n-',n)
        if(this.post_content_temp.indexOf('www')!==-1 || this.post_content_temp.indexOf('http')!==-1){
        var matches = this.post_content_temp.match(/\bhttps?:\/\/\S+/gi);
        // console.log(matches[0]);
         this.post_link= matches[0];
        //  this.getallimages(this.post_link);
        }
        if(this.post_link){
             this.post_content='<span class="preview_loader">Fetching Preview</span>';
        if(this.post_link.indexOf('www.youtube.com')!==-1){
          var arrvals=this.post_link.split("watch?v=")
          this.tempid=arrvals[1]
         this.post_content='<iframe class="videoframe" src="https://www.youtube.com/embed/'+this.tempid+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        } 
        else if(this.post_link.indexOf('youtu.be')!==-1){
          var arrvals=this.post_link.split("be/")
          this.tempid=arrvals[1]
this.post_content='<iframe class="videoframe" src="https://www.youtube.com/embed/'+this.tempid+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        } else if(this.post_link.indexOf('vimeo.com')!==-1){
          var arrvals=this.post_link.split("com/")
          this.tempid=arrvals[1]
this.post_content='<iframe class="videoframe" src="https://player.vimeo.com/video/'+this.tempid+'?title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'

        } 
        else if(this.post_link.indexOf('.pdf')!==-1){
          this.post_content=null
        this.attachements=this.post_link;
        this.previewattachlink=this.post_link;
        this.remove_previewpdf=true
        }else if(this.post_link.indexOf('http')!==-1){
    axios.post(`/getpostbylink`,{'requrl':this.post_link})
    .then(response => {
// console.log(response);
var preview='';
  preview +='<a href="'+response.data.url+'" class="cursoron" target="_blank"><div class="preview-main">';
       let img = new Image();
   if(response.data.imgs[0]){
     console.log('if');

    img.src = response.data.imgs[0];
    if(img.width>=800){
    var imgwidth=800;
    var widper=((img.width-800)*100)/img.width;
    var heightper=(img.height*widper)/100;
    var imgheight=img.height-heightper;
    }else if(img.width<800 && img.width>400){
     var imgwidth=400;
    var widper=((img.width-400)*100)/img.width;
    var heightper=(img.height*widper)/100;
    var imgheight=img.height-heightper;
    }else{
      var imgwidth=img.width;
     var imgheight=img.height;
    }
    if(imgwidth<800){
     var contwidth=800-imgwidth;
    }else{
      var contwidth=800; 
    }
     
     var contheight=imgheight;
  console.log('width:'+img.width+'height'+img.height);
  preview +='<div class="preview-img" height="'+imgheight+'px" width="'+imgwidth+'px"><img src="'+response.data.imgs[0]+'" height="'+imgheight+'px" width="'+imgwidth+'px"/></div>';
    }else{
   axios.post(`/getimagebydomain`,{'searcheddomain':this.post_link})
    .then(domainresponse => { 
      // console.log(domainresponse);
   img.src =this.fileurl+domainresponse.data[0].image_link;
   // console.log(img);
    // console.log(img.width);
    if(img.width>=800){
    var imgwidth=800;
    var widper=((img.width-800)*100)/img.width;
    var heightper=(img.height*widper)/100;
    var imgheight=img.height-heightper;
    }else if(img.width<800 && img.width>400){
     var imgwidth=400;
    var widper=((img.width-400)*100)/img.width;
    var heightper=(img.height*widper)/100;
    var imgheight=img.height-heightper;
    }else{
      var imgwidth=img.width;
     var imgheight=img.height;
    }
    if(imgwidth<800){
     var contwidth=800-imgwidth;
    }else{
      var contwidth=800; 
    }
     
     var contheight=imgheight;
  console.log('width:'+img.width+'height'+img.height);
   console.log('else2');
  this.libimage='<div class="preview-img" ><img src="'+this.fileurl+domainresponse.data[0].image_link+'" height="'+imgheight+'px" width="'+imgwidth+'px"/></div>';
  this.post_content=this.libimage+this.post_content


  }).catch(e => {
  
      this.errors.push(e)
    })
    } 
  preview +='<div class="preview-content" height="'+contheight+'px" width="'+contwidth+'px">';
  preview +='<span class="p-host">'+response.data.host+'</span>';
  preview +='<span class="p-title">'+response.data.title+'</span>';
 if(response.data.des){
  preview +='<span class="p-desc">'+response.data.des+'</span>';
 }
  preview +='</div>';
  preview +='</div></a>';
this.post_content=preview
preview='';
    })
    .catch(e => {
      this.post_link=null
      this.post_content=null
      this.libimage=null
      this.errors.push(e)
    })

        }else{
 
this.post_content='<p>'+this.post_link+'</p>'
        } }
        // console.log(this.post_content);
        this.dialog=false
      },

      getallimages(regurl){
 axios.post(`/getallimages`,{'requrl':regurl})
    .then(response => {
this.allimages=response.data;
    })
      },
      addComment()
      {
        var re =  /(?:^|[ ])#([a-zA-Z_0-9-!@$%&*]+)/gm;
        var str=this.comment;
        var m;
        var hashtags=[];
        while ((m = re.exec(str)) != null) 
        {
          if (m.index === re.lastIndex) 
          {
            re.lastIndex++;
          }
            if(hashtags.indexOf(m[1])==-1)
            {
              hashtags.push(m[1])
            }
        }
        console.log('hashtags-',hashtags)
        axios.post(`/createhashtag`,{'htagname':hashtags, 'loginid':this.currentuser})
        .then(response => {
          console.log(response.data)
        })
        .catch(e => {
          this.errors.push(e)
        })
        if(this.comment!=null && this.comment.trim())
        {
          axios.post(`/addcomment`,{comment:this.comment,postid:this.comment_postid,commentid:null,replyid:null,createdby:this.currentuser})
          .then(response => {
                  axios.post('/setpostcommentnotification',{"weburl":'',"appurl":'',"targetid":this.comment_postid,"q_type":null,"title":null,"questionid":null,postid:this.comment_postid,createdby:this.currentuser})
        .then((notiresponse)=>{
console.log(notiresponse);
           // location.reload();

        })
        .catch((error)=>{
            console.log(error);
        })
            this.updateComments(response.data.unique_id);
            this.getallpost();
            this.updateComments(this.showComment);
            this.comment=null
          })
        }
      },
      savePost(postid,status)
      {
        axios.post(`/savePost`,{'postid':postid, 'created_by':this.currentuser, 'status':status})
          .then(response => {
            console.log(response)
              this.getallpost();
          })
          .catch((error)=>{
            console.log(error);
        })

      },
      addtoResources(postid,status)
      {
        console.log(postid)
        console.log(status)
        axios.post(`/addToresources`,{'postid':postid, 'status':status})
          .then(response => {
            console.log(response)
              this.showOption=null;
              this.getallpost();
          })
          .catch((error)=>{
            console.log(error);
        })
      },
      addReply(commentofpostid,replyid)
      {
        console.log('cid-',commentofpostid);
        console.log('rid-',replyid);
        var re =  /(?:^|[ ])#([a-zA-Z_0-9-!@$%&*]+)/gm;
        var str=this.comment;
        var m;
        var hashtags=[];
        while ((m = re.exec(str)) != null) 
        {
          if (m.index === re.lastIndex) 
          {
            re.lastIndex++;
          }
            if(hashtags.indexOf(m[1])==-1)
            {
              hashtags.push(m[1])
            }
        }
        console.log('hashtags-',hashtags)
        axios.post(`/createhashtag`,{'htagname':hashtags, 'loginid':this.currentuser})
        .then(response => {
          console.log(response.data)
        })
        .catch(e => {
          this.errors.push(e)
        })
        if(this.replyoncomment!=null && this.replyoncomment.trim())
        {
          axios.post(`/addcomment`,{comment:this.replyoncomment,postid:this.comment_postid,commentid:commentofpostid,replyid:replyid,createdby:this.currentuser})
          .then(response => {
            axios.post('/setpostcommentnotification',{"weburl":'',"appurl":'',"targetid":this.comment_postid,"q_type":null,"title":null,"questionid":null,postid:this.comment_postid,createdby:this.currentuser})
        .then((notiresponse)=>{
console.log(notiresponse);
           // location.reload();

        })
        .catch((error)=>{
            console.log(error);
        })
            this.updateComments(response.data.unique_id);
            this.getallpost();
            this.updateComments(this.showComment);
            this.replyoncomment=null
            this.replyflag=false;
            this.reply_commentid=null;
           this.replyflagR=null;
          })
        }
      },
      remove_preview(){
        this.post_content=null
        this.post_link=null
      },
      remove_previewfile()
      {
        this.post_filecontent=""
        this.pdfpreviewimage=null
        this.attachements=null
        this.post_file=""
        this.post_fileflag=false
        this.remove_previewpdf=false
      },
      showOptions(id){
       if(this.showOption!==id){
        this.showOption=id 
       }else{
        this.showOption=null 
       }
      },
      submitAnswer(questionid,type){
        if(type==1){
      var answerid=this.answerids_single;
        }else if(type==2){
      var answerid=this.answerids_multi.join(",");
        }
 
        axios.post(`/questionanswer`,{questionid:questionid,answerid:answerid,createdby:this.currentuser})
          .then(response => {
            this.getallpost();
          })

      },
      showReply(postid,commentid){
       if(this.replyflag!==commentid){
        this.replyflag=commentid 
        this.reply_commentid=commentid
       }else{
        this.replyflag=null 
       }
      },
      showCommReply(pCommentid,commentid){
       if(this.replyflagR!==commentid){
        this.replyflagR=commentid 
        this.reply_commentid=commentid
       }else{
        this.replyflagR=null 
       }
      },
       showComments(id){
       if(this.showComment!==id){
        this.updateComments(id); 
        // this.$refs.commentFocus.focus();
        this.showComment=id 
        this.comment_postid=id 
       }else{
        this.showComment=null 
       }
      },
      async updateComments(id){
        await axios.post(`/getcommentsofpost`,{'postid':id, loginid:this.currentuser})
    .then(response => {
      console.log(response.data)
     this.commentsofpost=response.data;
     
    })
    .catch(e => {
      this.errors.push(e)
    }) 
      },
      set_scheduler(){
         this.scheduledatetime=this.scheduledate+' '+this.scheduletimehrs+':'+this.scheduletimemins+' '+this.scheduletimeapm
         this.addscheduler=false
      },
      edset_scheduler(){
         this.edscheduledatetime=this.edscheduledate+' '+this.edscheduletimehrs+':'+this.edscheduletimemins+' '+this.edscheduletimeapm
         this.edaddscheduler=false
      },
      showmainpostool(){
        this.postdefault_flag=false 
        this.post_flag=true
      },
      edshowmainpostool(){
        this.edpostdefault_flag=false 
       
      },
      updateddatentime(){
        this.scheduledate=this.datepicker;
      },
      edupdateddatentime(){
        this.edscheduledate=this.datepicker;
      },
      removepost(postid){
        
        axios.post(`/deletepostbyid`,{'postid':postid})
    .then(response => {
      // JSON responses are automatically parsed.
     this.getallpost();

    })
    .catch(e => {
      this.errors.push(e)
    }),
      console.log(postid);
      },
      
      editComment(pindex,commentindex)
      {
          console.log('pindex-',pindex)
          console.log('commentindex-',commentindex)
          this.commentsofpost[commentindex].editflag=true;        
      },
      updateEditComment(postid,commentindex,commentid)
      {
        
          this.editedcomment=this.commentsofpost[commentindex].content;
          console.log('ec-',this.editedcomment)
          console.log('user-',this.currentuser)
          axios.post(`/updateeditcomment`,{commentid:commentid,content:this.editedcomment, createdby:this.currentuser})
          .then(response => {
            console.log(response.data)
            this.updateComments(postid)
          });
      },
      removecomment(postid, commentid)
      {
          console.log(postid)
          console.log(commentid)
          axios.post(`/removepostcomment`,{"id":commentid})
          .then(removeresponse => {
            console.log(removeresponse)
            this.updateComments(postid)
          }).catch(e => {
              this.errors.push(e)
            })
      },
      editReply(pindex,cindex,replyindex)
      {
          console.log('rpindex-',pindex)
          console.log('cindex-',pindex)
          console.log('replyindex-',replyindex)
          this.commentsofpost[cindex].commentofcomment[replyindex].reditflag=true;        
      },
      updateEditReply(postid,cindex,replyindex,replyid)
      {
          this.editedreply=this.commentsofpost[cindex].commentofcomment[replyindex].content;
          console.log('rec-',this.editedcomment)
          console.log('ruser-',this.currentuser)
          axios.post(`/updateeditcomment`,{commentid:replyid,content:this.editedreply, createdby:this.currentuser})
          .then(response => {
            console.log(response.data)
            this.updateComments(postid)
          });
      },
      removeReply(rpostid, replyid)
      {
          console.log(rpostid)
          console.log(replyid)
          axios.post(`/removepostcomment`,{"id":replyid})
          .then(removeresponse => {
            console.log(removeresponse)
            this.updateComments(rpostid)
          }).catch(e => {
              this.errors.push(e)
            })
      },
      reportPost(postid)
      {
        // console.log(postid);
        // console.log(this.currentuser);
        this.postdata=postid
        this.report=true;
        this.showOption=null
      },
      chooseoption(postid,pollid,option)
      {
        console.log(this.currentuser)
        console.log(postid)
        console.log(pollid)
        console.log(option)
        axios.post(`/submitpoll`,{postid:postid,pollid:pollid,optionid:option,createdby:this.currentuser})
        .then(response =>{
          console.log(response);
          this.getallpost();
        })
        .catch((error)=>{
            console.log(error);
        })
        this.pollchart=false;
      },
      submitReport(postid)
      {
        // console.log(postid);
        // console.log(this.currentuser);
        // console.log(this.report_content);
        axios.post(`/createReport`,{postid:postid, created_by:this.currentuser, content:this.report_content})
        .then(response =>{
          console.log(response);
          this.report=false;
          this.postdata=null;
        })
        .catch((error)=>{
            console.log(error);
        })
      },
      getallpost(){
      axios.post(`/multitopic`,{range:this.range,loginid:this.currentuser,hashtag:this.hashname})
    .then(response => {
      // JSON responses are automatically parsed.
      this.posts = response.data
    });  
    },
    searchtags(){
      axios.post(`/gettags`,{'searchedtag':this.tag_search})
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      this.posttags = response.data
    });  
    },
    searchReftags(){
      axios.post(`/gettags`,{'searchedtag':this.edtag_search})
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      this.edposttags = response.data
    });  
    },
    activatetag(id,data)
    {
      if(this.sel_tags.indexOf(id) >= 0){
      this.sel_tags.splice(this.sel_tags.indexOf(id), 1)
      }else{
      this.sel_tags.push(id)
      this.tempposttags.push(data)
      }

    },
    
    activateReftag(id,data){
      if(this.edsel_tags.indexOf(id) >= 0){
      this.edsel_tags.splice(this.edsel_tags.indexOf(id), 1)
      }else{
      this.edsel_tags.push(id)
      this.retweet_temptags.push(data)
      }
    },
    likeanddislike(postid,status){
      console.log(postid);
  axios.post(`/likedislikepost`,{'postid':postid,'likeby':this.currentuser,'status':status})
    .then(response => {
      if(status==1){
      axios.post('/setpostlikenotification',{"weburl":'',"appurl":'',"targetid":postid,"q_type":null,"title":null,"questionid":null,postid:postid,createdby:this.currentuser})
        .then((notiresponse)=>{
console.log(notiresponse);
           // location.reload();

        })
        .catch((error)=>{
            console.log(error);
        })
      }
      console.log(response)
      // JSON responses are automatically parsed.
      this.getallpost();
    }); 
    },
    comlikeanddislike(commentid,status){
      console.log(commentid);
      console.log(status);
  axios.post(`/likedislikecomment`,{'commentid':commentid,'likeby':this.currentuser,'status':status})
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      this.updateComments(this.showComment);
    }); 
    },

    }, created() {
      console.log('the range = ',this.range)

    axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      
      this.currentuser = response.data.unique_id
      this.currentuserdata = response.data
      console.log(this.currentuserdata)
      this.user_role = response.data.role
      console.log('role-',this.user_role)
      axios.post(`/multitopic`,{range:this.range,loginid:this.currentuser,hashtag:this.hashname})
      .then(response1 => {
        this.posts = response1.data
        console.log('posts-',this.posts)
      })
      .catch(e => {
        this.errors.push(e)
      })
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`/getposttypes`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.posttypes = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
     axios.post(`/gettags`,{'searchedtag':this.tag_search})
    .then(response => {
      // JSON responses are automatically parsed.
      this.posttags = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`/getallsliderimages`)
    .then(response => {
        // JSON responses are automatically parsed.
        this.items = response.data
        console.log(this.items);
    })
    .catch(e => {
        this.errors.push(e)
   }),
    window.addEventListener('scroll', () => 
    {
      this.bottom = this.bottomVisible()
      // console.log('range = ',this.range)
      // console.log('bottom = ',this.bottom)
      if(this.nextlength==0)
      {
        if(this.bottom==true)
        {
          this.loading2 = true;
          axios.post(`/getnextallposts`,{range:this.range, seltags:this.tid,userid:this.currentuser})
          .then(response => {
            if(response.data.length > 0)
            {
              this.nextlength = 0;
              this.posts=this.posts.concat(response.data)
              this.topbutton=false;
              this.range=this.range+20;
              this.loading2 = false;
              this.bottom = false;
             
            }
            else
            {
              this.nextlength = 1;
              this.bottom = false;
              this.topbutton=true;
              this.loading2 = false;
            }
          })
          .catch(e => {
              this.errors.push(e)
          })
        }
      }
      else{this.loading2=false;}
    })
}, 

  }
</script>
