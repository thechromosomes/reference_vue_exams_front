<template>
 <v-container grid-list-xl>
  <v-layout row wrap>
<div class="wrapper">
<div class="first_section">

  <!-- new filter navigations -->
   <div class="searchin-custom">


    <div class="total_selected">
      <template v-if="selectedtags.length >0">
      <v-chip class="selected_chips" v-for="(selectedtag, stindex) in selectedtags" close @input="removeselectedtopic(selectedtag,stindex,1)" v-bind:key="`seltag${stindex}`">{{selectedtag.tagname }} </v-chip>
    </template>
    </div>


    <div class="search_dashboard" v-if="activeTopic==1">
      <button type="submit" class="searchButton"><i classo="fa fa-search searchicon_dash"></i></button>
      <input type="text" class="searchTerm" v-model="topic_search" @click="activatedashboard" @keyup="searchfiltertags" placeholder="Search">
    </div>
    <br>
    <div class="filter-section">
     <div class="search_lists">
        <li v-if="activeTopic==1" class="search_options search_active"  @click="activate_addRestags"> Filter </li>
        <li v-if="activeTopic==0" class="search_options" @click="activate_addRestags"> Filter </li>
    </div>
    <br>
    <div v-if="addFiltertags==true" >
      <ul v-if="activeflag==1">
        <li class="checkbox_li" v-for="(posttag, tindex) in posttagsfilter" v-bind:key="`tag${tindex}`"><label><input class="chechbox_input" @click="activateReftagFilter(posttag,posttag.unique_id,posttag.tagname)" type="checkbox" v-bind:class="{activetag:selectedtags_id.indexOf(posttag.unique_id) >= 0}"><span>{{posttag.tagname}}</span></label></li>
      </ul>
      <div class="tree_class">
        <ul class="filtertree">
          <li v-for="(treeItem,filterindex) in treeItems">
            <label><input class="chechbox_input" type="checkbox"  v-bind:checked="selectedtags.findIndex(x => x.tagname === treeItem.name) >= 0" @click="openTreeDialog(treeItem,filterindex)" style="color:black; cursor: pointer; "> <span >{{ treeItem.actualName }}</span><span>{{'('+treeItem.totalTags[0]+')'}}</span></label>
          <ul class="filtertree_child" v-if="treeItem.flag">
            <li v-for="childitem in treeItem.children">
            <label><input class="chechbox_input" type="checkbox"  v-bind:checked="selectedtags_id.indexOf(childitem.id) >= 0" @click="openTreeDialogchild(childitem)" style="color:black; cursor: pointer; "> <span >{{ childitem.actualName }}</span></label>
            </li>
          </ul>
          </li>
         </ul>
      </div>
    </div>
  </div>
   </div>


<div class="communityheading"><img src="../assets/icons/window-light_hover1.svg" class="fa_svg_icon" />GPEx Community</div>

<!-- side pop up notification -->
  <template v-if="notificationPop" >
   <v-dialog v-model="dialogDummy" overlay-color ="fff" overlay-opacity="0" content-class="notification_pop" persistent>
    <v-card class="mx-auto" outlined color="fff">
        <v-system-bar color="white">
          <v-spacer></v-spacer>
          <a small text @click="removePop"><b>X</b></a>
        </v-system-bar>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="main">
            <v-list-item-title class="headline mb-1"><h5><b>Download the GPEx Exams app</b></h5></v-list-item-title>
            <!-- <v-list-item-subtitle class="popup_content"><p>Download from exams.gpex.com.au or search</p></v-list-item-subtitle> -->

            <VuePhoneNumberInput
              id="phoneNumber2"
              v-model="sendAppNumber"
              required
              clearable
              color="#FF9933"
              :border-radius="8"
              show-code-on-list
              default-country-code="AU"
              @update="updatePhoneNumber"
              :translations="{
                  phoneNumberLabel: 'Mobile number'
                }"
              :only-countries = onlyCountries
              no-country-selector = false
              size = "sm"
            />

             <span style="display: flex; padding:10px 0px 0px;"><p style="padding-top: 16px">send link for Android</p> <button @click="sendAppLink(1)"><img class="downloadapk_img new_class_app" src="../assets/images/androidStore.png"/></button></span>
              <span style="display: flex; padding:10px 0px;"><p style="padding-top: 16px;"> Send a link for iPhone </p> <button @click="sendAppLink(2)"><img class="downloadapk_img" src="../assets/images/applestore.png"/></button></span>
            </div>
          </v-list-item-content>
        </v-list-item>
    </v-card>
  </v-dialog>
  </template>

  <!-- for pop up snackbar message -->
  <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :color="colorPopUp"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === ''"
        :timeout="timeout"
        :top="y === 'bottom'"
        :vertical="mode === 'vertical'"
      >
        {{ appLinkMessage }}
        <v-btn dark text @click="snackbar = false">close</v-btn>
      </v-snackbar>

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
<input type="hidden" v-model="updatecheck" />
<span class="add_topic cursoron" v-if="post_flag" @click="addtags2=true"><img src="../assets/icons/layer-plus.svg" class="fa_svg_icon"/> Add a tag </span>
<input type="text" class="post_input_default" @click="showmainpostool" v-if="postdefault_flag" placeholder="Write a post or" />
<v-chip class="selected_chips" v-if="tid!=null" close @input="removetid()">{{tidname}}</v-chip>
<div class="post_context_wrap">
<div class="post_context" v-if="post_flag">
<textarea class="post_input" v-model="post_content_temp" ref="post_content_tempf" placeholder="Write a post or" @keyup="manu_content" :autofocus="'autofocus'"></textarea>
<ul class="">
    <li v-for="htag in srchHashTags" @click="selhashtag(htag.categoryname,htag)" :key="htag" >{{htag.categoryname}}</li>
</ul>
<div class="clearfix">
<span class="remove_preview cursoron" v-if="post_content" @click="remove_preview">x</span><p v-html="post_content"></p>


<v-chip class="small_chips" v-for="(posttag, tagindex) in tempposttags" v-bind:key="`tag${tagindex}`" @input="removeselectedtag(tagindex,1)" close v-if="posttag.tagname!=null && sel_tags.indexOf(posttag.unique_id) >= 0"> {{posttag.tagname}} </v-chip>


</div>
<div class="clearfix">
<span class="remove_preview cursoron" v-if="post_fileflag" @click="remove_previewfile">x</span><p v-html="post_filecontent"></p>
<span class="remove_preview cursoron" v-if="remove_previewpdf" @click="remove_previewfile">x</span><p v-if="remove_previewpdf" >
<pdf :src="previewattachlink" :key="pdfpreview" ></pdf>

<!--<img v-bind:src="pdfpreviewimage" />-->
</p>

</div>
<ul class="inner_tools">

<li v-if="postedit==null" class=" btn_postshort scheduler cursoron" @click="addscheduler=true"><span class="feedtime_left" v-if="showscheduledatetime > Date.now()">{{showscheduledatetime | timeleft}}</span><img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon" /></li>

<li v-if="postedit!=null && scheduledatetime>Date.now()" class=" btn_postshort scheduler cursoron" @click="addscheduler=true"><span class="feedtime_left" v-if="showscheduledatetime > Date.now()">{{showscheduledatetime | timeleft}}</span><img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon" /></li>

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
<a v-if="postLabels.length>0 && postLabels[0].rolevalue.indexOf(currentuserdata.role) >= 0" href="/poll"><li class="btn btn_posttype cursoron" >
<img src="../assets/icons/poll-h-light.svg" class="fa_svg_icon hover_class" >
<img src="../assets/icons/poll-h-light_hover.svg" class="fa_svg_icon withouthover_class" >
 Poll </li></a>

<!-- <a v-if="postLabels.length>0 && postLabels[2].rolevalue.indexOf(currentuserdata.role) >= 0" href="/events"><li class="btn btn_posttype cursoron" >
<img src="../assets/icons/calendar-star-light.svg" class="fa_svg_icon hover_class" />
<img src="../assets/icons/calendar-star-light_hover.svg" class="fa_svg_icon withouthover_class" />
 Events </li></a> -->

<a v-if="postLabels.length>0 && postLabels[3].rolevalue.indexOf(currentuserdata.role) >= 0" href="/article"><li class="btn btn_posttype cursoron" >
<img src="../assets/icons/files.svg"  class="fa_svg_icon hover_class"/>
<img src="../assets/icons/files_hover.svg" class="fa_svg_icon width_article withouthover_class" />
 Article </li></a>

<a  href="/createquestion"><li class="btn btn_posttype cursoron" >
<img src="../assets/icons/question-circle.svg" class="fa_svg_icon hover_class"/>
<img src="../assets/icons/question-circle-white.svg" class="fa_svg_icon withouthover_class" />
Questions </li></a>

<li v-if="postLabels.length>0 && postLabels[9].rolevalue.indexOf(currentuserdata.role) >= 0" class="btn btn_posttype cursoron" @click="dialog=true">
<img src="../assets/icons/share-alt.svg" class="fa_svg_icon hover_class" >
<img src="../assets/icons/share-alt_hover.svg" class="fa_svg_icon withouthover_class" >
 Share a link </li>

<li v-if="postLabels.length>0 && postLabels[4].rolevalue.indexOf(currentuserdata.role) >= 0" class="btn btn_posttype cursoron fileselector">
<img src="../assets/icons/file-pdf-light.svg" class="fa_svg_icon width_attach hover_class" />
<img src="../assets/icons/file-pdf-light_hover.svg" class="fa_svg_icon width_attach withouthover_class" /> Add a PDF or Image<input type="file" ref="file" @change="attachfiletopost()"/> </li>

</ul>
<ul class="list_right_edit" v-if="post_flag">
  <li v-if="postedit"><button class="btn btn_edit " @click="createeditpost(posteditid)">Edit post</button></li>
  <li v-else><button class="btn btn_edit " @click="createpost">Add post</button></li>
 <!-- <li><button class="btn btn_edit " @click="createpost">Add post</button></li> -->
</ul><br>
</div>
<!-- <br><br>

<span class="cursoron" @click="getHastagPost(Exam_tips)"> {{'Exam_tips'}} </span> -->

<!-- loader component -->
<div v-if="postReady" style= "position: fixed; left: 50%; top: 50%;">
    <v-progress-circular
    :size="100"
    :width="7"
    color="#b0cb36"
    indeterminate
  ></v-progress-circular>
</div>

<input type="hidden" name="hidden_no" :value="hidden_no">
<div v-for="(post, pindex) in posts"  v-bind:key="`tags${pindex}`" class="postbody_log" @mouseover="saveFeedLog(post.unique_id,post.questionid)">

  this is custom {{post}}
<div class="userdiv" v-if='post.pollactive==true' v-bind:class="{active_tag_section:(post.posted_at>=Date.now())}">
  <img :src="post.userdetail.profile" class="cursoron user_circle">
  <p class="user_image_name cursoron">{{post.userdetail.firstname}} {{post.userdetail.lastname}}</p>
  <div class="posttoggle_wrapp">
    <span class="post_toggle" @click="showOptions(post.unique_id)"><img src="../assets/icons/angle-down.svg" class="fa_svg_icon post_toggle_icon" /></span>
    <div class="post_report" v-if="showOption==post.unique_id">
    <ul class="post_report_ul">
      <li class="post_report_item cursoron" v-if="postLabels.length>0 && postLabels[6].rolevalue.indexOf(currentuserdata.role) >= 0 && post.resourceidstatus==false && post.questionid==null && post.posted_at<Date.now()" @click="addtoResources(post.unique_id,1)"><img src="../assets/icons/head-side-brain-light.svg" class="fa_svg_icon post_report_icon" />Move to Resource</li>

      <!-- add to category -->
        <v-dialog v-model="selectCategory" persistent max-width="300px">
          <v-card class="category_popup">
            <v-card-title>Select Category</v-card-title>
              <v-checkbox color="#b2cb36" label="Featured" v-model="resourceCategory.featured06"></v-checkbox>
                <v-checkbox color="#b2cb36" label="Webinar" v-model="resourceCategory.audio04"></v-checkbox>
                <v-checkbox color="#b2cb36" label="Media" v-model="resourceCategory.video05"></v-checkbox>
                <v-checkbox color="#b2cb36" label="Recommended" v-model="resourceCategory.recommended02"></v-checkbox>
                <v-checkbox color="#b2cb36" label="Must read" v-model="resourceCategory.mustRead03"></v-checkbox>
                <v-checkbox color="#b2cb36" label="Latest" v-model="resourceCategory.latest01"></v-checkbox>
                <v-card-actions>
                  <button class="btn btn_edit modal_btn" @click="saveToCategory(0)">Close</button>
                  <button class="btn btn_edit modal_btn " @click="saveToCategory(1)">Save</button>
                </v-card-actions>
          </v-card>
        </v-dialog>

      <li class="post_report_item cursoron" v-if="postLabels.length>0 && postLabels[6].rolevalue.indexOf(currentuserdata.role) >= 0 && post.resourceidstatus==true && post.questionid==null && post.posted_at<Date.now()" @click="addtoResources(post.unique_id,0)"><img src="../assets/icons/resources-selected_hover.svg" class="fa_svg_icon post_report_icon" />Remove from Resource</li>
      <li class="post_report_item cursoron" v-if="currentuser==post.userdetail.unique_id || (postLabels.length>0 && postLabels[5].rolevalue.indexOf(currentuserdata.role) >= 0)" @click="removepost(post.unique_id)"><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon post_report_icon" />Delete</li>
      <p v-if="currentuser==post.userdetail.unique_id || (postLabels.length>0 && postLabels[5].rolevalue.indexOf(currentuserdata.role) >= 0)" class="post_report_desc">If you want to delete post</p>

      <li class="post_report_item cursoron" v-if="(post.questionid==null || post.questionid=='') && (post.articleid==null && post.articleid!='') && currentuser==post.userdetail.unique_id " @click="editpost(post.unique_id)"><img src="../assets/icons/edit.svg" class="fa_svg_icon post_report_icon" />Edit</li>

      <li class="post_report_item cursoron" v-if="(post.questionid==null || post.questionid=='') && (post.articleid!=null && post.articleid!='' && post.parentid!=null) && currentuser==post.userdetail.unique_id " @click="editpost(post.unique_id)"><img src="../assets/icons/edit.svg" class="fa_svg_icon post_report_icon" />Edit</li>

      <a :href="`/editarticle?id=${post.articleid}`"><li class="post_report_item cursoron" v-if="(post.articleid!=null && post.articleid!='' && post.parentid==null) && currentuser==post.userdetail.unique_id "><img src="../assets/icons/edit.svg" class="fa_svg_icon post_report_icon" />Edit</li></a>

      <a :href="`/editquestion?id=${post.questionid}`"><li class="post_report_item cursoron" v-if="post.questionid!=null && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype!='5d15fea98edfed6c417592d9' && post.questiondata.questiontype!='5d15fea98edfed6c417592d15' && post.questiondata.questiontype!='5d15fea98edfed6c417592d16' && currentuser==post.userdetail.unique_id "><img src="../assets/icons/edit.svg" class="fa_svg_icon post_report_icon" />Edit</li></a>

      <a :href="`/caseeditquestion?id=${post.questionid}`"><li class="post_report_item cursoron" v-if="post.questionid!=null && post.questiondata.questiontype=='5d15fea98edfed6c417592d14' && post.questiondata.questiontype!='5d15fea98edfed6c417592d9' && post.questiondata.questiontype!='5d15fea98edfed6c417592d16'&& currentuser==post.userdetail.unique_id "><img src="../assets/icons/edit.svg" class="fa_svg_icon post_report_icon" />Edit</li></a>

      <a :href="`/kfpeditquestion?id=${post.questionid}`"><li class="post_report_item cursoron" v-if="post.questionid!=null && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype=='5d15fea98edfed6c417592d9' && post.questiondata.questiontype!='5d15fea98edfed6c417592d16' && currentuser==post.userdetail.unique_id "><img src="../assets/icons/edit.svg" class="fa_svg_icon post_report_icon" />Edit</li></a>
      <a :href="`/imageeditquestion?id=${post.questionid}`"><li class="post_report_item cursoron" v-if="post.questionid!=null && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype!='5d15fea98edfed6c417592d9' && post.questiondata.questiontype!='5d15fea98edfed6c417592d16' && post.questiondata.questiontype=='5d15fea98edfed6c417592d15' && currentuser==post.userdetail.unique_id "><img src="../assets/icons/edit.svg" class="fa_svg_icon post_report_icon" />Edit</li></a>
      <a :href="`/studenteditquestion?id=${post.questionid}`"><li class="post_report_item cursoron" v-if="post.questionid!=null && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype!='5d15fea98edfed6c417592d9' && post.questiondata.questiontype!='5d15fea98edfed6c417592d15' && post.questiondata.questiontype=='5d15fea98edfed6c417592d16' && currentuser==post.userdetail.unique_id "><img src="../assets/icons/edit.svg" class="fa_svg_icon post_report_icon" />Edit</li></a>

      <p class="post_report_desc"></p>
      <li class="post_report_item cursoron" v-if="post.posted_at<Date.now()" @click="reportPost(post.unique_id)"><img src="../assets/icons/report.svg" class="fa_svg_icon post_report_icon" />Report</li>
    </ul>
    </div>
  </div>
  <br>
  <div class="clearfix"></div>
  <p class="date_user">{{ post.posted_at | postsumDate}}</p>

  <div class="question_preview" v-if="post.questionid!=null && post.questionid!=''" :id="post.questionid">
    <div v-if="SubmitError!='' && SubmitErrorid==post.questionid" style="color: red;"><span class="question_error">{{SubmitError}}</span></div>
      <div class="first_title">
      <img src="../assets/icons/question-square-solid_green.svg" class="ques_icon" />
      <p class="first_roe">{{post.questiondata.version}}</p>
      </div><!--first_title-->
      <div class="second_title">
      <h2><b v-html="post.questiondata.q_title"></b></h2>
      <p class="sub_headingg" v-html="post.questiondata.stem_text"></p>
      <a :href="fileurl+post.questiondata.uploadedstem_file" target="_blank" v-if="post.questiondata.uploadedstem_file!=null && post.questiondata.uploadedstem_file.toLowerCase().indexOf('.pdf') >= 0 "><pdf :src="fileurl+post.questiondata.uploadedstem_file" ></pdf></a>
      <img :src="fileurl+post.questiondata.uploadedstem_file" class="img-responsive title_imageprview" v-if="post.questiondata.uploadedstem_file!=null && post.questiondata.uploadedstem_file.toLowerCase().indexOf('.pdf') < 0 ">

      <span><b v-if="post.questiondata.questiontype=='5d15fea98edfed6c417592d14' || post.questiondata.questiontype=='5d15fea98edfed6c417592d16'">Question {{post.questiondata.q_order}}</b> <b v-html="post.questiondata.question_text"></b></span>
      <p class="sub_headingg" v-html="post.questiondata.instruction_text"></p>
      </div><!--second_title-->

      <!-- <div class="buttons_group" >
        <template v-for="(tag, tindex) in post.alltags">
          <button  v-bind:key="`tags${tindex}`" class="btn btn_one">{{tag.tagname}}</button>
        </template>
      </div> -->

      <a :href="fileurl+post.questiondata.hero_img" target="_blank" v-if="post.questiondata.hero_img!=null && post.questiondata.hero_img.toLowerCase().indexOf('.pdf') >= 0 "><pdf :src="fileurl+post.questiondata.hero_img" ></pdf></a>
      <img :src="fileurl+post.questiondata.hero_img" class="img-responsive title_imageprview" v-if="post.questiondata.hero_img!=null && post.questiondata.hero_img.toLowerCase().indexOf('.pdf') <0 ">
      <img src="../assets/images/slider.png" class="img-responsive title_imageprview" v-if="post.questiondata.hero_img==null && post.questiondata.imagevisibility==1">

      <div class="selection_section" v-if="post.questiondata.option_type!=null && post.questiondata.questiontype!='5d15fea98edfed6c417592d9'">
        <span v-for="(questionoptions, index) in post.questionoptions " :key="`unique ${index}`">
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


    <!--<label class="radio-inline radio_label" >

   <input type="radio" :value="questionoptions._id" class="radiosize" disabled v-if="post.questiondata.option_type==1 && post.questionanswer.length > 0" :checked="questionoptions._id == post.questionanswer[0].answerid">

      <input type="radio" :value="questionoptions._id" v-model="answerids_single" class="radiosize" v-if="post.questiondata.option_type==1 && post.questionanswer.length == 0" >

      <input type="checkbox" :value="questionoptions._id" class="radiosize" disabled v-if="post.questiondata.option_type==2 && post.questionanswer.length > 0" :checked="post.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)>=0">

      <input type="checkbox" :value="questionoptions._id" v-model="answerids_multi"  class="radiosize" v-if="post.questiondata.option_type==2 && post.questionanswer.length == 0">

      {{questionoptions.option_text}}
      <span v-if="questionoptions.answervalue=='true' && post.questionanswer.length > 0 && post.questiondata.option_type==1 && questionoptions._id == post.questionanswer[0].answerid"><img src="../assets/icons/rightanswer.svg" class="fa_svg_answer" /></span>

      <span v-if="questionoptions.answervalue==false && post.questionanswer.length > 0 && post.questiondata.option_type==1 && questionoptions._id == post.questionanswer[0].answerid"><img src="../assets/icons/wronganswer.svg" class="fa_svg_answer" /></span>

      <span v-if="questionoptions.answervalue==true && post.questionanswer.length > 0 && post.questiondata.option_type==2 && post.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)>=0"><img src="../assets/icons/rightanswer.svg" class="fa_svg_answer" /></span>

      <span v-if="questionoptions.answervalue==false && post.questionanswer.length > 0 && post.questiondata.option_type==2 && post.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)>=0"><img src="../assets/icons/wronganswer.svg" class="fa_svg_answer" /></span>
    </label>-->
    <span class="clearfix"></span>
    </span>

</div><!--selection_section-->

 <div class="answer_explantion" v-if="post.questionanswer.length > 0 && post.questiondata.answer_explanation!='' && post.questiondata.answer_explanation!=null">
<p class="a_explntn">Answer Explanation</p>
<p class="sub_explanation" v-html="post.questiondata.answer_explanation"></p>
</div>
<!-- answer_explantion -->
<!-- <div class="button_previw"><button v-if="post.questionanswer.length == 0 && post.questiondata.questiontype!='5d15fea98edfed6c417592d9'" class="btn q_prvw_sbmtbtn" type="button" @click="submitAnswer(post.questiondata._id,post.questiondata.option_type)">Submit</button></div> --><!--button_previw-->

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
<!-- <p v-html="post.articledata[0].article_content"></p> -->
</div>
</a>
</div>
<!-- ************************************** -->
<div class="question_preview" v-if="(post.pollid!=null || post.pollid!='') && post.mypollans=='' " >
  <img :src="fileurl+post.polldata.poll_image" class="img-responsive title_imageprview" v-if="post.polldata.poll_image && post.polldata.poll_image!='' ">
  <div class="first_title">
    <span><b v-html="post.polldata.question_text"></b></span>
  </div><!--first_title-->
  <div class="second_title" v-if="post.polldata.instruction_text">
    <p class="sub_headingg" v-html="post.polldata.instruction_text"></p>
  </div><!--second_title-->
  <div class="pollselection_section" v-if="post.polloptions!=null">
    <span v-for="(polloption, po_index) in post.polloptions" :key="`tags${po_index}`">
    <div class="blankline blankline_radio checkbox">
      <label>
        <span  class="blankline_span blankline_span_empty" v-if="post.polloptions!=null && post.polloptions!=''" role="radio" > <input type="radio" :value="polloption._id"  class="radiosize" @click="chooseoption(post.unique_id,post.pollid,polloption._id)"><p class="radio_title empty_title">{{polloption.option_text}}</p></span>
      </label>
      </div><!--blankline_radio-->
      <span class="clearfix"></span>
    </span>
  </div><!--selection_section-->
</div><!---poll_preview--->
<!---------------------------------------------->
<div class="poll_questions" v-if="post.mypollans!='' " >
  <img :src="fileurl+post.polldata.poll_image" class="img-responsive title_imageprview" v-if="post.polldata.poll_image && post.polldata.poll_image!='' ">
<p class="poll_question_heading" v-html="post.polldata.question_text"></p>
<div class="second_title" v-if="post.polldata.instruction_text">
    <p class="sub_headingg" v-html="post.polldata.instruction_text"></p>
  </div><!--second_title-->
  <div class="poll_single_section" v-for="(polloption, po_index) in post.polloptions" :key="`tags${po_index}`">


     <div class="poll_progress">
       <span class="percent" :style="`width:${polloption.count}%`" v-bind:class="{theme_main_bg:polloption._id == post.mypollans}"> <span>{{polloption.count}} %  </span> </span>
       <span class="poll_options"> {{polloption.option_text}} </span>
     </div>
    </div>
  </div>
<!-- </div> -->


<!-- <p v-if="post.content!=null" class="content_user" v-html="post.content"> </p> -->
<template v-if="post.preview_flag">
  <postcontent :postdata="post.content" :preview_flag="post.preview_flag" :preview_data="post.preview_data"></postcontent>
</template>
<template v-else>
  <postcontent :postdata="post.content" :preview_flag="defaultfalse" :preview_data="defaultnull"></postcontent>
</template>



<a  v-if="post.attached && post.attached.indexOf('http')>=0" :href="post.attached" target="_BLANK" class="reload_pdfpreview">
<template v-if="post.attached!==null">
  <pdfloader :pdflink="post.attached" :pdfkey="updatecheck"></pdfloader>
</template>
  </a>
<a  v-else-if="post.attached" :href="fileurl+post.attached" target="_BLANK" class="reload_pdfpreview">
  <template v-if="post.attached!==null">
  <pdfloader :pdflink="fileurl+post.attached" :pdfkey="updatecheck"></pdfloader>
  </template>
  </a>
<!-- <div v-if="post.refPost">
  <p v-if="post.refPost.content!=null" class="content_user" v-html="post.refPost.content"> </p>
  <p v-if="post.refPost.questionid!=null" class="content_user" v-html="post.refPost.questionid"> </p>
  <a  v-if="post.refPost.attached && post.refPost.attached.indexOf('http')>=0" :href="post.refPost.attached" target="_BLANK"><pdf :src="post.refPost.attached"></pdf></a>
  <a  v-else-if="post.refPost.attached" :href="fileurl+post.refPost.attached" target="_BLANK"><pdf :src="fileurl+post.refPost.attached"></pdf></a>
</div> -->


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
<div class="buttons_group" v-if="post.questionid!=null && post.questionid!=''">
  <template v-for="(tag, tindex) in post.alltags">
      <!-- <a :href="'/resources/'+tag.unique_id"> -->
      <template v-if="post.questionid!=null && post.questionid!=''">
        <a v-if="tag.questionvisible==true"  @click="tagsPost(tag.unique_id,tag.tagname)" target="_BLANK"><button  v-bind:key="`tags${tindex}`" class="btn btn_one">{{tag.tagname}}</button></a>
      </template>
      <template v-else>
        <a  @click="tagsPost(tag.unique_id,tag.tagname)" target="_BLANK"><button  v-bind:key="`tags${tindex}`" class="btn btn_one">{{tag.tagname}}</button></a>
      </template>
  </template>
</div><!--buttons_group-->

<!--<p class="likes"> {{post.likes}} Likes <span class="likecommentsep"> &bull;</span> {{post.allcomments.length}} Comments</p>-->


<template v-if="post.posted_at < Date.now()">
<div class="sharelinks_main">

<ul class="sharelinks">
<template v-if="postLabels.length>0 && postLabels[7].rolevalue.indexOf(currentuserdata.role) >= 0">
   <li class="report_btn" v-if="post.questionid!=null && post.answercount>0 && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype!='5d15fea98edfed6c417592d9' && post.questiondata.questiontype!='5d15fea98edfed6c417592d15' && post.questiondata.questiontype!='5d15fea98edfed6c417592d16'"> <a :href="`/questionanswerreport?id=${post.questionid}`" target="_blank">Report</a></li>

   <li class="report_btn"  v-if="post.questionid!=null && post.answercount>0 && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype=='5d15fea98edfed6c417592d9'"> <a :href="`/kfpquestionanswerreport?id=${post.questionid}`" target="_blank">Report</a></li>

   <li class="report_btn"  v-if="post.questionid!=null && post.answercount>0 && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype!='5d15fea98edfed6c417592d19' && post.questiondata.questiontype!='5d15fea98edfed6c417592d16' && post.questiondata.questiontype=='5d15fea98edfed6c417592d15'"> <a :href="`/imagequestionanswerreport?id=${post.questionid}`" target="_blank">Report</a></li>
</template>
  <li v-if="post.questionid!=null && post.answercount>0 && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype!='5d15fea98edfed6c417592d16'"> {{post.answercount}} Answered</li>

  <li class="cursoron" v-if="post.likestatus == 0"><span @click="likeanddislike(post.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /> </span>
  <span v-if="post.likes>0" class="cursoron count_like" @click="showlikers(post.unique_id)">{{post.likes}}</span>
  </li>

  <li class="cursoron" v-if="post.likestatus == 1"><span  @click="likeanddislike(post.unique_id,0)" ><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="post.likes>0" class="cursoron count_like" @click="showlikers(post.unique_id)"> {{post.likes}}</span></li>

  <li class="comment_li cursoron" v-if="(post.questionid==null || post.questionid=='') " @click="showComments(post.unique_id)"><span><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /></span><span v-if="post.allcomments.length>0" class="count_like"> {{post.allcomments.length}}</span></li>

   <li class="comment_li cursoron" v-if="(post.questionid!=null && post.questionid!='' && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype!='5d15fea98edfed6c417592d16' && post.questiondata.questiontype!='5d15fea98edfed6c417592d9' && post.questiondata.questiontype!='5d15fea98edfed6c417592d15') " @click="showComments(post.unique_id)"><span><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /></span><span v-if="post.allcomments.length>0" class="count_like"> {{post.allcomments.length}}</span></li>

  <li class="comment_li cursoron" v-if="(post.questionid!=null && post.questionid!='' && post.questiondata.questiontype=='5d15fea98edfed6c417592d14')"><a :href="`/caseofweekanswer?id=${post.questionid}&subid=${post.childquestionid}`"><span><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /></span><span v-if="post.allcomments.length>0" class="count_like"> {{post.allcomments.length}}</span></a></li>
  <li class="comment_li cursoron" v-if="(post.questionid!=null && post.questionid!='' && post.questiondata.questiontype=='5d15fea98edfed6c417592d15')"><a :href="`/imageofweekanswer?id=${post.questionid}&subid=${post.childquestionid}`"><span><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /></span><span v-if="post.allcomments.length>0" class="count_like"> {{post.allcomments.length}}</span></a></li>
  <li class="comment_li cursoron" v-if="(post.questionid!=null && post.questionid!='' && post.questiondata.questiontype=='5d15fea98edfed6c417592d16')"><a :href="`/studentquestionanswer?id=${post.questionid}&subid=${post.childquestionid}`"><span><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /></span><span v-if="post.allcomments.length>0" class="count_like"> {{post.allcomments.length}}</span></a></li>

  <li class="comment_li cursoron" v-if="(post.questionid!=null && post.questionid!='' && post.questiondata.questiontype=='5d15fea98edfed6c417592d9')"><a :href="`/questionanswer?id=${post.questionid}`"><span><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /></span><span v-if="post.allcomments.length>0" class="count_like"> {{post.allcomments.length}}</span></a></li>

  <li class="last_li cursoron" v-if="(post.questionid==null || post.questionid=='') && post.pollid==null " @click="editdialogbox(post.unique_id)"><span><img src="../assets/icons/retweet-light.svg" class="fa_svg_icon extraimgwidth" /></span><span></span></li>

  <li class="last_li cursoron" v-if="post.allsaveposts==0 && post.questionid==null || post.questionid=='' " @click="savePost(post.unique_id,0)"><span><img src="../assets/icons/bookmark.svg" class="fa_svg_icon bookamrktwidth" /></span><span></span></li>

  <li class="last_li cursoron" v-if="post.allsaveposts==1 && post.questionid==null || post.questionid=='' " @click="savePost(post.unique_id,1)"><span><img src="../assets/icons/bookmark_red.svg" class="fa_svg_icon bookamrktwidth" /></span><span></span></li>

  <li class="last_li cursoron" v-if="post.questionanswer.length > 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d9'"><a :href="`/questionanswer?id=${post.questiondata._id}`" target="_BLANK"><span><img src="../assets/icons/answer_selected.svg" class="fa_svg_answericon" /></span><span></span></a></li>

  <li class="last_li cursoron" v-if="post.questionanswer.length == 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d9'"><a :href="`/questionanswer?id=${post.questiondata._id}`" target="_BLANK"><span><img src="../assets/icons/answer.svg" class="fa_svg_answericon" /></span><span></span></a></li>

  <li class="last_li cursoron" v-if="post.questionanswer.length > 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d15'"><a :href="`/imageofweekanswer?id=${post.questiondata._id}`" target="_BLANK"><span><img src="../assets/icons/answer_selected.svg" class="fa_svg_answericon" /></span><span></span></a></li>

  <li class="last_li cursoron" v-if="post.questionanswer.length == 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d15'"><a :href="`/imageofweekanswer?id=${post.questiondata._id}`" target="_BLANK"><span><img src="../assets/icons/answer.svg" class="fa_svg_answericon" /></span><span></span></a></li>

  <li class="last_li cursoron" v-if="post.questionanswer.length > 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d14'"><a :href="`/caseofweekanswer?id=${post.questionid}&subid=${post.childquestionid}`" target="_BLANK"><span><img src="../assets/icons/answer_selected.svg" class="fa_svg_answericon" /></span><span></span></a></li>

  <li class="last_li cursoron" v-if="post.questionanswer.length == 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d14'"><a :href="`/caseofweekanswer?id=${post.questionid}&subid=${post.childquestionid}`" target="_BLANK"><span><img src="../assets/icons/answer.svg" class="fa_svg_answericon" /></span><span></span></a></li>

  <li class="last_li cursoron" v-if="post.questionanswer.length > 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d16'"><a :href="`/studentquestionanswer?id=${post.questionid}&subid=${post.childquestionid}`" target="_BLANK"><span><img src="../assets/icons/answer_selected.svg" class="fa_svg_answericon" /></span><span></span></a></li>

  <li class="last_li cursoron" v-if="post.questionanswer.length == 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d16'"><a :href="`/studentquestionanswer?id=${post.questionid}&subid=${post.childquestionid}`" target="_BLANK"><span><img src="../assets/icons/answer.svg" class="fa_svg_answericon" /></span><span></span></a></li>

  <li class="last_li cursoron" v-if="post.questionid!=null && post.questionanswer.length == 0 && post.questiondata.questiontype!='5d15fea98edfed6c417592d9' && post.questiondata.questiontype!='5d15fea98edfed6c417592d14' && post.questiondata.questiontype!='5d15fea98edfed6c417592d15' && post.questiondata.questiontype!='5d15fea98edfed6c417592d16'"><button  class="btn q_prvw_sbmtbtn" type="button" @click="submitAnswer(post.questiondata._id,post.questiondata.option_type,pindex)">Submit</button></li>

  <!-- <li class="last_li cursoron" v-if="post.pollid!=null && post.mypollans==''"><button  class="btn q_prvw_sbmtbtn" type="button" @click="chooseoption(post.unique_id,post.pollid,pollsel)">Submit</button></li> -->

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
    <span class="send_svg_icon add_comment1">Updates</span>
    </span>
    <div class="read_more" v-if="commentsofpostdata.questionid!=null && commentsofpostdata.editflag==false" >
    <a :href="`/userquestionanswer?qid=${post.questionid}&uid=${commentsofpostdata.commentby.unique_id}`" target="_BLANK">Read The Answer</a></div>

    <div @keyup="upcomment(commindex)" v-html="commentsofpostdata.content" contenteditable class="add_newcomment"></div>

     <!-- <textarea v-model="commentsofpostdata.content" class="add_newcomment" >{{commentsofpostdata.content}}</textarea> -->
    </span>
<!-- <div @keyup="searchTitle" ref="commentsa" contenteditable class="add_newcomment serchtagss"></div> -->
<!--  ********************************************************************************************  -->
  <div class="last_li date_right">{{ commentsofpostdata.created_at | postsumDate}}</div>
      <ul class="sharelinks_chaatter">
        <li class="cursoron" v-if="commentsofpostdata.likestatus == 0"><span @click="comlikeanddislike(commentsofpostdata.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" class="cursoron" @click="showcommentlikers(commentsofpostdata.unique_id)">{{commentsofpostdata.likes}}</span></li>

        <li class="cursoron" v-if="commentsofpostdata.likestatus == 1"><span @click="comlikeanddislike(commentsofpostdata.unique_id,0)"><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" class="cursoron" @click="showcommentlikers(commentsofpostdata.unique_id)">{{commentsofpostdata.likes}}</span></li>

        <li class="comment_li cursoron" @click=showReply(post.unique_id,commentsofpostdata.unique_id)><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /><span v-if="commentsofpostdata.commentofcomment.length>0">{{commentsofpostdata.commentofcomment.length}}</span></li>
<!--  ********************************************************************************************  -->
        <template v-if="commentsofpostdata.commentby.unique_id==currentuser || (postLabels.length>0 && postLabels[8].rolevalue.indexOf(currentuserdata.role) >= 0)">
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
      <span @click="addReply(commentsofpostdata.unique_id, commentsofpostdata.unique_id)" class="cursoron"><span class="send_svg_icon reply_link1">Replys</span></span>

       <div v-html="replyoncomment" @keyup="comment_content" ref="atcomment" contenteditable class="replyoncomment"></div>

      <ul>
       <li v-for="htag in attherate" @click="selcommhashtag(htag.firstname+' '+htag.lastname,htag)">{{htag.firstname+' '+htag.lastname}}</li>
      </ul>

      <ul class="usercommentss">
          <li v-for="htag in srchHashTags" @click="selcommhashtag(htag.categoryname,htag)">{{htag.categoryname}}</li>
      </ul>
    </div>
</div>
  <div class="chats second_chats dashboard_chat" v-for="(commentsofpost_reply, crindex) in commentsofpostdata.commentofcomment">
    <img :src="commentsofpost_reply.commentby_n.profile" class=" user_circle"> <p class="usernmechats">{{commentsofpost_reply.commentby_n.firstname}} {{commentsofpost_reply.commentby_n.lastname}}</p>
    <div class="chatter">
      <!--  ********************************************************************************************  -->
    <div v-if="commentsofpost_reply.parentcontent.length >0" class="bg_part">
      <img src="../assets/images/left-quote.svg" class="big_svg" />
      <span class="reply_on_comnt "  v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.parentcontent[0].content"></span>
      <span class="date_time_of_cmt"> {{commentsofpost_reply.parentcontent[0].replyby.firstname}} {{commentsofpost_reply.parentcontent[0].replyby.lastname}}, {{commentsofpost_reply.parentcontent[0].created_at | postsumDate }} </span>
      <span class="reply_on_comnt_reply" v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.content"></span>
      <span v-else>
      <span  @click="updateEditReply(post.unique_id,commindex,crindex,commentsofpost_reply._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
      <textarea v-model="commentsofpost_reply.content" class="add_newcomment" >{{commentsofpost_reply.content}}</textarea>
      </span>
    </div>
    <div v-else>
         <!-- <span class="reply_on_comnt_reply" v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.content"></span>
        <span v-else>
        <span  @click="updateEditReply(post.unique_id,commindex,crindex,commentsofpost_reply._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
        <textarea v-model="commentsofpost_reply.content" class="add_newcomment" >{{commentsofpost_reply.content}}</textarea></span> -->
        <span v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.content"></span>
        <span v-else>
        <span  @click="updateEditReply(post.unique_id,commindex,crindex,commentsofpost_reply._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
        <textarea v-model="commentsofpost_reply.content" class="add_newcomment" >{{commentsofpost_reply.content}}</textarea></span>
      </div>
<!--  ********************************************************************************************  -->
      <div class="last_li date_right">{{ commentsofpost_reply.created_at | postsumDate}}</div>
      <ul class="sharelinks_chaatter">
        <li class="cursoron" v-if="commentsofpost_reply.likestatus == 0"><span @click="comlikeanddislike(commentsofpost_reply.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /></span><span v-if="commentsofpost_reply.likes>0" class="cursoron" @click="showcommentlikers(commentsofpost_reply.unique_id)">{{commentsofpost_reply.likes}}</span></li>

        <li class="cursoron" v-if="commentsofpost_reply.likestatus == 1"><span @click="comlikeanddislike(commentsofpost_reply.unique_id,0)">
          <img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="commentsofpost_reply.likes>0" class="cursoron" @click="showcommentlikers(commentsofpost_reply.unique_id)">{{commentsofpost_reply.likes}}</span></li>
        <li class="comment_li cursoron" @click=showCommReply(commentsofpostdata.unique_id,commentsofpost_reply.unique_id)><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth"/></li>
  <!--  ********************************************************************************************  -->
        <template v-if="commentsofpost_reply.commentby_n.unique_id==currentuser || (postLabels.length>0 && postLabels[8].rolevalue.indexOf(currentuserdata.role) >= 0)">
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
      <!-- <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" ></textarea> -->
      <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" @keyup="comment_content" ></textarea>
      <ul class="usercommentss">
          <li v-for="htag in srchHashTags" @click="selcommhashtag(htag.categoryname,htag)">{{htag.categoryname}}</li>
      </ul>
  </div>
  </div>
</div>
<div class="commentfield">
<!-- <div class="commentfield" v-if="replyflag != post.unique_id"> -->
<span class="comm_current_user commemt_user1"><img :src="currentuserdata.profile" class="circle_image"></span>

<!-- <div @keyup="searchTitle" ref="commentsa" contenteditable class="add_newcomment serchtagss editable" id="uniqueCommentEdit" ></div> -->
<div @click="searchTitle()">
<MediumEditor class="add_newcomment serchtagss editable" ref="commentsa" :options='optionsME' :text="text" v-on:edit='searchTitle' custom-tag='div' ></MediumEditor>
</div>
<ul class="usercommentss" v-if="searchusers!=null">
  <li v-for="user in searchusers" @click="onChange(user.firstname+' '+user.lastname)">
    {{user.firstname+' '+user.lastname}}
  </li>
</ul>
<ul class="usercommentss" v-if="srchHashTags!=''">
    <li v-for="htag in srchHashTags" @click="selcommhashtag(htag.categoryname,htag)">{{htag.categoryname}}</li>
</ul>
</div>
<div  v-if="freeze" class="independant_buton">
  <span @click="addComment()" class="cursoron "><span class="send_svg_icon add_comment1">Add Comment</span></span>
</div>
</div>
</div>
</div>
</div>
<!-- <div>
  <span v-if="loading2==true"><img src="../assets/images/reloader2.gif" width='15%' height='1%' align="centre" ></span>
</div> -->

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

<!-- ********************************************************************************************************************** -->
    <v-dialog v-model="dialog" width="500" >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
            Add a Link <span class="crosspopup" @click="dialog=false">x</span>
        </v-card-title>
        <v-card-text>
          <input type="text" v-model="post_link"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn btn_edit" @click="manu_content"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!-- ********************************************************************************************************************** -->
    <v-dialog v-model="addtags2" width="500" >
      <v-card>
        <v-card-title class="headline grey lighten-2 sticky_grey" primary-title >
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

<!-- ********************************************************************************************************************** -->
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

<!-- ********************************************************************************************************************** -->
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
            <v-chip class="small_chips" v-for="(refposttag, reftagindex) in reftemptags" v-bind:key="`rtag${reftagindex}`" v-if="refposttag.tagname!=null && edsel_tags.indexOf(refposttag.unique_id) >= 0" >{{refposttag.tagname}}</v-chip>
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
<!-- *************************************************************************************************************************  -->
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
// const jsdom = require("jsdom");
import tinymce from 'vue-tinymce-editor'
import moment from 'moment'
import getusername from './users/username'
import pdf from 'vue-pdf'
import pdfloader from './charts/pdfloader'
import postcontent from './includes/postcontent'
// for pop up phone number
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
// for edit comments
import MediumEditor from 'vue2-medium-editor'

var username=localStorage.username;
var datetime = new Date();


  export default {
      components: {getusername,pdf,pdfloader,postcontent, VuePhoneNumberInput, MediumEditor},
      data(){
      return {
        post_content:null,
        defaultfalse:false,
        defaultnull:null,
        hidden_no:1,
        reply_commentid:null,
        comment_postid:null,
        post_content_temp:'',
        currentuser:null,
        currentuserdata:null,
        tempid:null,
        libimage:null,
        errors: [],
        posttag_id: [],
        posts:[],
        hours:['01','02','03','04','05','06','07','08','09','10','11','12'],
        minutes:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
        ampm:['AM','PM'],
        dialog: false,
        loading2: false,
        range:20,
        updatecheck:0,
        postdefault_flag:false,
        post_flag:true,
        remove_previewpdf:false,
        post_fileflag:false,
        addtags:false,
        show_down:false,
        addtags2:false,
        addscheduler:false,
        posttypes:[],
        post_link:null,
        search_users:null,
        searchusers:null,
        newlink:null,
        post_file:"",
        post_filecontent:"",
        rolespermission:['1','2','7','11','12','14','15','18','19'],
        commpermission:['1','2'],
        scheduledate:moment().format('YYYY-MM-DD'),
        scheduletime:null,
        editpostschedule:null,
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
        postdata:null,
        postedit:null,
        posteditid:null,
        report:false,
        showscheduledatetime:null,
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
        tempposttags:[],
        reftemptags:[],
        pollchart:false,
        pollsel:'',
        nextlength:0,
        tid:null,
        tidname:'',
        logprepostid:null,
        postLabels:[],
        SubmitError:'',
        SubmitErrorid:'',
        atusertext:'',
        htagtext:'',
        rehtagtext:'',
        editedPostcontent:'',
        srchHashTags:'',
        attherate:'',
        resrchHashTags:'',
        scheduledatetime:moment().format('YYYY-MM-DD hh:mm:ss A'),
        preview_data:{'imageurl':null,'anchorurl':null,'host':null,'title':null,'description':null},
        preview_flag:false,
        notificationPop:null,
        dialogDummy:null,
        selectCategory: false,
        postIdForCategory: null,
        sendAppNumber: null,

        text: '',
        addComments: null,
        optionsME: {
          toolbar: {
              buttons: ['bold', 'italic', 'underline', 'anchor', 'orderedlist' ,'unorderedlist', 'anchor', 'quote'],
          },
          targetBlank : true,
          autoLink : true
      },
      appLinkMessage: null,
      snackbar:false,
      colorPopUp: '#b2cc35',
      mode: '',
      timeout: 6000,
      x: 'right',
      y: 'top',
      national_number: "AU",
      finalSendAppNumber: "",
      onlyCountries: ['AU'],
      validationNum: false,

       resourceCategory: {
        featured06: false,
        audio04:false,
        video05: false,
        recommended02: false,
        mustRead03: false,
        latest01:true,
      },

      freeze: true,



      activeOpt: 0,
      activeTopic: 1,
      activeTitle: 0,
      activeShared: 0,
      sel_tagname:null,
      addusers:false,
      posttagsfilter: [],
      activeflag:0,
      addFiltertags: true,
      topic_search:null,
      selectedtags:[],
      selectedtags_id:[],
      slectedTagsDummy: [],
      postReady: false,

      myTagsArray: [
          {
          "tagname": "CBD",
          "unique_id": "5d8815cd418dbf6bbed30b98",
          },
          {
          "tagname": "MCQ",
          "unique_id": "5d845a7166ab01731b38202d",
          },
          {
          "tagname": "StAMPS",
          "unique_id": "5d84568a66ab01731b38202b",
          },
          {
          "tagname": "KFP",
          "unique_id": "5d75d7945eb94a7dd37a2604",
          },
          {
          "tagname": "AKT",
          "unique_id": "5d75d7775eb94a7dd37a2602",
          },
          {
          "tagname": "ME tips",
          "unique_id": "5d75d7c95eb94a7dd37a2608",
          },
          {
          "tagname": "Registrar Tips",
          "unique_id": "5d8430fc66ab01731b382027",
          },
          {
          "tagname": "Optic atrophy",
          "unique_id": "5d670c5a284fe10f45d6a86e",
          },
          {
          "tagname": "Eczema/dermatitis",
          "unique_id": "5d6886ef5df9280f64ff2f7c",
          },
          {
          tagname:"Exam",
          unique_id:"5d75d70f5eb94a7dd37a2600"
          },
          {
          "tagname": "Paediatrics",
          "unique_id": "5d48d1e1821f9f179821dd5a",
          },
          {
          "tagname": "Addiction medicine",
          "unique_id": "5d5f5199f76c7718f7a9489f",
          },
          {
          tagname:"Wellbeing",
          unique_id:"5dfac3df35507713a1928670"
          },
          {
          tagname: "Musculoskeletal",
          unique_id: "5d48d20a821f9f179821dd68"
          },
          {
          tagname: "ACRRM",
          unique_id: "5d842f1a66ab01731b382025"
          },
          {
          tagname: "RACGP",
          unique_id:"5d15e9f36d8ca60a8be7f709"
          },
          {
          tagname: 'Image of the week',
          unique_id:"5dc2498553ccd574492e0fb8"
          },
          {
          tagname: 'Case of the week',
          unique_id:"5dc249f753ccd574492e0fba"
          },
          {
          tagname: 'Other',
          unique_id:""
          }
      ],
      tree:  [],
      reqTag:["5dc249f753ccd574492e0fba", "5dc2498553ccd574492e0fb8", "5d75d7945eb94a7dd37a2604", "5d845a7166ab01731b38202d", ""],
     treeItems: [
      {
        totalTags:"",
        id: "5dc249f753ccd574492e0fba",
        name: 'Case of the week',
        actualName : `Case of the week`,
        flag : false,
        children: [],
      },
      {
        totalTags:"",
        id: "5dc2498553ccd574492e0fb8",
        name: 'Image of the week',
        actualName: `Image of the week`,
        flag : false,
        children: [],
      },
      {
        totalTags:"",
        id: '5d75d7945eb94a7dd37a2604',
        name: 'KFP',
        actualName: `Key feature problems`,
        flag : false,
        children: [],
      },
      {
        totalTags:"",
        id: '5d845a7166ab01731b38202d',
        name: "MCQ",
        actualName:`Multiple choice question`,
        flag : false,
        children: []
      },
      {
        totalTags:"",
        id: '9211',
        name: "Other",
        actualName:`Other`,
        flag : false,
        children: []
      }
    ],

    }
  },

    methods: {
      // to send the link via sms
      updatePhoneNumber(data){
        // console.log("data", JSON.stringify(data));
        this.finalSendAppNumber = data.formattedNumber
        this.validationNum = data.isValid
      },

      sendAppLink(platform){
        if(this.sendAppNumber !== null && this.validationNum !== false){
          var finalMnumber = this.finalSendAppNumber.split(/\s/).join('')
        axios.post(`/sendlinkviamessage`,{mobileNumber:finalMnumber ,user:this.currentuser, "platform": platform})
         .then(response => {
           axios.post(`/handlenotification`,{user:this.currentuser, hidePopUp: true})
            .then(response => {
            })
            .catch(e => {
              this.errors.push(e)
           })
            this.notificationPop = false
            this.dialogDummy = false
            this.appLinkMessage = "Download link sms sent successfully."
            this.snackbar = true
         })
         .catch(e => {
             this.errors.push(e)
         })
        }else {
          this.appLinkMessage = "Invalid number - please enter correct number."
          this.snackbar = true
        }
      },

      // to save in the category
      saveToCategory(value){
        if (value === 0){
           this.selectCategory = false
           this.showOption=null;
           this.resourceCategory = {
                    featured06: false,
                    audio04:false,
                    video05: false,
                    recommended02: false,
                    mustRead03: false,
                    latest01:true
                }
        } else{
           axios.post(`/saveresources`,{resourceType:this.resourceCategory ,user:this.currentuser, postId: this.postIdForCategory})
         .then(response => {
           this.selectCategory = false
           this.showOption=null;
          this.resourceCategory = {
                    featured06: false,
                    audio04:false,
                    video05: false,
                    recommended02: false,
                    mustRead03: false,
                    latest01:true
                }
         })
         .catch(e => {
             this.errors.push(e)
         })
      }
    },

      // for notificationPop
      removePop(){
        // to check if pop up shown by user
        axios.post(`/handlenotification`,{user:this.currentuser, hidePopUp: true})
          .then(response => {
            this.notificationPop=false
            this.dialogDummy = false
          })
          .catch(e => {
              this.errors.push(e)
        })

      },

    removeselectedtag(indexid,type)
    {
      if(type==1){
      this.tempposttags.splice(indexid, 1)
      this.posttag_id.splice(indexid, 1)
      this.sel_tags.splice(indexid, 1)
      }
    },

    getHastagPost: function (event)
    {
      // `this` inside methods point to the Vue instance
     // alert('Hello ' + event + '!')
      // `event` is the native DOM event
      alert('hello');

    },
    upcomment(indexid){
      var val = event.target.innerHTML;
      this.commentsofpost[indexid].content=val
      // var res = this.replyoncomment.replace(this.htagtext, "<span class='cursoron'> <b>"+htagname+"</b> &nbsp; </span>");
      // this.replyoncomment = res;
      // this.$refs.atcomment[0].innerHTML=res;
      // let theField = <HTMLInputElement>this.$refs.input;
      // theField.focus();
    },

    searchTitle(e){
      if(e != undefined){
          // var val = e.event.target.innerHTML;
          var userSearch = e.event.target.innerText
          var val = this.$refs.commentsa[0].$el.innerHTML;
          this.comment_content()

        if(userSearch.indexOf('@') >= 0){
          var atindex=userSearch.indexOf('@')-1;
            var prechar=userSearch.charAt(atindex);
          if(prechar=='' || prechar==' '){
            var arr=userSearch.split('@');
            var userfilter=arr[1];
            this.atusertext="@"+userfilter;
          axios.post(`/getcommentuserlist`,{'searcheduser':userfilter})
          .then(response => {
            this.searchusers = response.data;
          });
          }else{
            // console.log('not space');
        }
        }else{
          // console.log('not @');
          }
      }
      this.comment = val
    },

    onChange(newentry) {
      var res = this.comment.replace(this.atusertext, "<span class='cursoron'> <b>"+newentry+"</b> &nbsp;</span>");
      this.$refs.commentsa[0].$el.innerHTML = res;
      this.comment = res;
      this.searchusers = [];
      },

      comment_content(e)
      {
        console.log("comment_content")
        var val = event.target.innerHTML;
        this.comment = val
        this.srchHashTags = [];
        var re = /(?:^|[ ])#([a-zA-Z]+)/gm;
        var atthe = /(?:^|[ ])@([a-zA-Z]+)/gm;
        var str = '';
        if(this.comment !=null)
        {
          str = this.comment

        }
        else if(this.replyoncomment !=null)
        {
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

        var atrate;
        while((atrate = atthe.exec(str)) != null)
        {
          if(str.charAt(atthe.lastIndex)!=" " && str.charAt(atthe.lastIndex)!="." && str.charAt(atthe.lastIndex)!="_")
          {
            this.htagtext="@"+atrate[1]
            axios.post(`/getcommentuserlist`,{'searcheduser':atrate[1]})
            .then(response => {
                this.attherate = response.data;
                // this.attherate = [];
            });
          }

        }

      },
      selcommhashtag(htagname, htagdata)
      {
        if(this.comment !=null)
        {
          htagname=htagname.replace(/ /g,"_");
          var res = this.comment.replace(this.htagtext, "#"+htagname+"");
          var res = this.comment.replace(this.htagtext, "<span class='cursoron'><b>"+htagname+"</b> &nbsp; </span>");
          this.comment = res;
          this.$refs.commentsa[0].$el.innerHTML=res;
          this.srchHashTags = [];
          this.attherate = [];
        }
        else if(this.replyoncomment !=null)
        {
          htagname=htagname.replace(/ /g,"_");
          var res = this.replyoncomment.replace(this.htagtext, "#"+htagname+"");
          var res = this.replyoncomment.replace(this.htagtext, "<span class='cursoron'> <b>"+htagname+"</b> &nbsp; </span>");
          this.replyoncomment = res;
          this.$refs.atcomment[0].innerHTML=res;
          this.srchHashTags = [];
          this.attherate = [];
        }
      },

      bottomVisible() {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + scrollY >= pageHeight
        return bottomOfPage || pageHeight < visible
      },
      UpdatePostfileContent(){
        console.log("filelink", this.post_file);
        var filelink = this.post_file.toLowerCase();
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
      async attachfiletopost(){
        this.post_file = "dfghdkhgkjdf";
        const file = this.$refs.file.files[0];
        this.uploadedfilename=file.name
        console.log(file);
        console.log(this.uploadedfilename);
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
      async createpdfpreviewimage(filename){
        var filenames=filename.split("/");
        await  axios.post(`/convertpdftopreview`,{'pdfname':filenames[2]})
    .then(response => {
      // JSON responses are automatically parsed.

axios.post(`/getFilesizeInBytes`,{'filename':response.data.imgurl})
    .then(response1=> {
      // JSON responses are automatically parsed.
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
      // console.log('tid-',tid)
      // console.log('userid-',this.currentuser)
      axios.post(`/settagsvisit`,{tagid:tid, userid:this.currentuser})
      .then(response => {
        // console.log('visit')
        // console.log(response.data)
      });
      this.tid=tid
      this.tidname=tagname
      this.postReady = true
      axios.post(`/getallposts`,{range:this.range,seltags:tid, loginid:this.currentuser})
        .then(response => {
          console.log(response.data)
          this.posts = response.data
          this.postReady = false

         //alert('hello');

          this.updatecheck=Math.random();
        });
    },
    // visitTag(tid)
    // {
    //     axios.post(`/settagsvisit`,{tagid:tid, userid:this.currentuser})
    //     .then(response => {
    //       console.log('visit')
    //     });
    // },
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
        this.post_content_temp=this.post_content_temp.replace(this.post_link, '')
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
          this.post_content_temp=this.post_content_temp.replace(m[0], ' #'+m[1])
            if(hashtags.indexOf(m[1])==-1)
            {
              hashtags.push(m[1])
            }
        }
        // console.log('hashtags-',hashtags)
        // console.log('this.post_content_temp-',this.post_content_temp)
        axios.post(`/createhashtag`,{'htagname':hashtags, 'loginid':this.currentuser})
        .then(response => {
          console.log(response.data)
        })
        .catch(e => {
          this.errors.push(e)
        })
        if(this.post_content_temp != null && this.post_content != null){
       if(this.preview_flag){
       this.post_content='<p class="post_row_content">'+this.post_content_temp.replace(/\r?\n/g, '<br />')+'</p>';
       }else{
        this.post_content='<p class="post_row_content">'+this.post_content_temp.replace(/\r?\n/g, '<br />')+'</p>'+this.post_content;
       }


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
         if(this.post_content!=null){
           var finalpostcontent = this.post_content+this.post_filecontent;
         }else{
           var finalpostcontent = this.post_filecontent;
         }


         var finaltags = this.sel_tags.join(",");
         var attachement = this.attachements;

        axios.post('/addpostbyweb',{pdfpreviewimage:this.pdfpreviewimage,questionid:null,attachement:attachement,tags:finaltags,searchcontent:finalpostcontent,postcontent:finalpostcontent,createdby:this.currentuser,scheduledatetime:this.scheduledatetime,preview_data:JSON.stringify(this.preview_data),preview_flag:this.preview_flag})
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
            this.scheduletime=null
            this.posttags=null
            this.seltags=null
            this.sel_tags=[]
            this.showscheduledatetime=null
            this.scheduledatetime=null
            this.preview_data={'imageurl':null,'anchorurl':null,'host':null,'title':null,'description':null}
            this.preview_flag=false
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

        // console.log('content-',finalpostcontent);
        // console.log('tags-',finaltags);
        // console.log('sch-',this.edscheduledatetime);
        // console.log('articleid-',this.editedPost[0].articleid);
        // console.log('pollid-',this.editedPost[0].pollid);
        // console.log('event-',this.editedPost[0].eventid);

        axios.post('/addpostbyweb',{pdfpreviewimage:null, questionid:null, articleid:finalarticleid, pollid:finalpollid, eventid:finaleventid, attachement:null, tags:finaltags, searchcontent:finalpostcontent, postcontent:finalpostcontent, createdby:this.currentuser, scheduledatetime:this.edscheduledatetime, parentid:refPostid,preview_data:JSON.stringify(this.preview_data),preview_flag:this.preview_flag})
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
            this.editdialog=false,
            this.preview_data={'imageurl':null,'anchorurl':null,'host':null,'title':null,'description':null}
            this.preview_flag=false
        })
        .catch((error)=>{
            console.log(error);
        })
       }
      },

      createeditpost(ep_id)
      {
        var newdate=moment(this.scheduledatetime).format('YYYY-MM-DD')
        this.scheduledatetime = moment(this.scheduledatetime).unix()*1000;
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

        axios.post('/updateEditedpost',{edt_postid:ep_id,postcontent:finalpostcontent,searchcontent:finalpostcontent,tags:finaltags,scheduledatetime:this.scheduledatetime,attachement:this.attachements,pdfpreviewimage:this.pdfpreviewimage,updatedby: this.currentuser})
          .then((response)=>{
            this.postedit=null
            this.post_content=null
            this.post_content_temp=null
            this.post_link=null
            this.post_file=""
            this.attachements=null
            this.pdfpreviewimage=null
            this.post_filecontent=""
            this.sel_tags = []
            this.remove_previewpdf=false
            this.post_fileflag=false
            this.getallpost();
          })
          .catch((error)=>{
            console.log(error);
          })
      },
      add_link()
      {
        console.log(this.newlink);
        this.dialog=false;
      },
      selhashtag(htagname, htagdata)
      {
        console.log('htagtext-',this.htagtext)
        // htagname=htagname.replace(/ /g,"_");
        // var res = this.post_content_temp.replace(this.htagtext, "#"+htagname+"");
        this.post_content_temp = res;
        this.srchHashTags = [];
      },
     manu_content()
     {
        this.srchHashTags = [];
        // console.log('tempcontent-',this.post_content_temp)
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

      console.log('link-',this.post_link);
      console.log('post_content_temp', this.post_content_temp)
      console.log('content-',this.post_content_temp.concat(this.post_link));
      // if(this.post_link!=null)
      // {
      //   this.post_content_temp = this.post_content_temp.concat(this.post_link);
      //   console.log('final postlinlk-',this.post_content_temp)
      // }
      this.dialog=false;
      if(this.post_content_temp.indexOf('www')!==-1 || this.post_content_temp.indexOf('http')!==-1)
      {
        console.log('one one one');
        var matches = this.post_content_temp.match(/\bhttps?:\/\/\S+/gi);
        console.log(matches[0]);
         this.post_link= matches[0];
        console.log('postlink-',this.post_link);
      }

      if(this.post_link)
      {
        this.preview_data={'imageurl':null,'anchorurl':null,'host':null,'title':null,'description':null}
            this.preview_flag=false
          console.log('one');
          this.post_content='<span class="preview_loader">Fetching Preview</span>';
          if(this.post_link.indexOf('www.youtube.com')!==-1)
          {
            console.log('if one');
            var arrvals=this.post_link.split("watch?v=")
            this.tempid=arrvals[1]
            this.post_content='<iframe class="videoframe" src="https://www.youtube.com/embed/'+this.tempid+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            //this.post_content_temp=this.post_content_temp.replace(this.post_link, '')
          }
          else if(this.post_link.indexOf('youtu.be')!==-1)
          {
            console.log('else if one');
            var arrvals=this.post_link.split("be/")
            this.tempid=arrvals[1]
            this.post_content='<iframe class="videoframe" src="https://www.youtube.com/embed/'+this.tempid+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            //this.post_content_temp=this.post_content_temp.replace(this.post_link, '')
          }
          else if(this.post_link.indexOf('vimeo.com')!==-1)
          {
            console.log('else if 2');
            var arrvals=this.post_link.split("com/")
            this.tempid=arrvals[1]
            this.post_content='<iframe class="videoframe" src="https://player.vimeo.com/video/'+this.tempid+'?title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
            //this.post_content_temp=this.post_content_temp.replace(this.post_link, '')
          }
          else if(this.post_link.indexOf('.pdf')!==-1)
          {
            console.log('else if 3');
            this.post_content=null
            this.attachements=this.post_link;
            this.previewattachlink=this.post_link;
            this.remove_previewpdf=true
          }
          else if(this.post_link.indexOf('http')!==-1)
          {
            console.log('else if 4');
            axios.post(`/getpostbylink`,{'requrl':this.post_link})
            .then(response => {
              console.log(response);
              var preview='';
              this.preview_flag=true;
              this.preview_data.anchorurl=response.data.url;
              preview +='<a href="'+response.data.url+'" class="cursoron" target="_blank"><div class="preview-main">';
              let img = new Image();
              if(response.data.imgs[0])
              {
                //alert(response.data.imgs[0]);
                this.preview_data.imageurl=response.data.imgs[0];
                console.log('if 5');
                img.src = response.data.imgs[0];
                if(img.width>=800){
                  console.log('else if 6');
                  var imgwidth=800;
                  var widper=((img.width-800)*100)/img.width;
                  var heightper=(img.height*widper)/100;
                  var imgheight=img.height-heightper;
                }
                else if(img.width<800 && img.width>400){
                  console.log('else if 7');
                  var imgwidth=400;
                  var widper=((img.width-400)*100)/img.width;
                  var heightper=(img.height*widper)/100;
                  var imgheight=img.height-heightper;
                }
                else{
                  console.log('else 8');
                  var imgwidth=img.width;
                  var imgheight=img.height;
                }
                if(imgwidth<800){ var contwidth=800-imgwidth; }
                else{ var contwidth=800; }
                var contheight=imgheight;
                console.log('width:'+img.width+'height'+img.height);
                preview +='<div class="preview-img" height="'+imgheight+'px" width="'+imgwidth+'px"><img src="'+response.data.imgs[0]+'" height="'+imgheight+'px" width="'+imgwidth+'px"/></div>';
              }
              else
              {
                console.log('else 9');
                axios.post(`/getimagebydomain`,{'searcheddomain':this.post_link})
                .then(domainresponse => {
                  console.log(domainresponse);
                  img.src =this.fileurl+domainresponse.data[0].image_link;
                  console.log(img);
                  console.log(img.width);
                  if(img.width>=800){
                    var imgwidth=800;
                    var widper=((img.width-800)*100)/img.width;
                    var heightper=(img.height*widper)/100;
                    var imgheight=img.height-heightper;
                  }
                  else if(img.width<800 && img.width>400){
                   var imgwidth=400;
                    var widper=((img.width-400)*100)/img.width;
                    var heightper=(img.height*widper)/100;
                    var imgheight=img.height-heightper;
                  }
                  else{
                    var imgwidth=img.width;
                    var imgheight=img.height;
                  }
                  if(imgwidth<800){ var contwidth=800-imgwidth; }
                  else{ var contwidth=800; }
                  var contheight=imgheight;
                  console.log('width:'+img.width+'height'+img.height);
                  console.log('else2');
                  this.libimage='<div class="preview-img" ><img src="'+this.fileurl+domainresponse.data[0].image_link+'" height="'+imgheight+'px" width="'+imgwidth+'px"/></div>';
                  this.post_content=this.libimage+this.post_content
                }).catch(e => {
                    this.errors.push(e)
                  })
              }
               this.preview_data.host=response.data.host;
               this.preview_data.title=response.data.title;
              preview +='<div class="preview-content" height="'+contheight+'px" width="'+contwidth+'px">';
              preview +='<span class="p-host">'+response.data.host+'</span>';
              preview +='<span class="p-title">'+response.data.title+'</span>';
              if(response.data.des){
                preview +='<span class="p-desc">'+response.data.des+'</span>';
                this.preview_data.description=response.data.des;
              }
              preview +='</div>';
              preview +='</div></a>';
              this.post_content=preview
              preview='';
            }).catch(e => {
                this.post_link=null
                this.post_content=null
                this.libimage=null
                this.errors.push(e)
              })
          //  this.post_content_temp=this.post_content_temp.replace(this.post_link, '')
          }
          else{
            this.post_content='<p>'+this.post_link+'</p>'
          }
        }
        console.log('content',this.post_content);
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
          this.freeze = false
          axios.post(`/addcomment`,{comment:this.comment,postid:this.comment_postid,commentid:null,replyid:null,createdby:this.currentuser})
          .then(response => {
            this.freeze = true
            axios.post('/setpostcommentnotification',{"weburl":'',"appurl":'',"targetid":this.comment_postid,"q_type":null,"title":null,"questionid":null,postid:this.comment_postid,createdby:this.currentuser})
        .then((notiresponse)=>{
        // console.log(notiresponse);
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
          this.$refs.commentsa[0].$el.innerHTML=[];
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
        this.postIdForCategory = postid
        console.log("status" , status)
        if (status === 1){
          axios.post(`/fetchdataforcheck`,{'postId':this.postIdForCategory, 'created_by':this.currentuser})
            .then(response => {
              response.data.forEach((value, index) => {
                let temp = value.resource_category
                this.resourceCategory[temp] = true
            });
                this.selectCategory = true
            })
            .catch((error)=>{
              console.log(error);
          })
          axios.post(`/addToresources`,{'postid':postid, 'status':status})
            .then(response => {
              this.getallpost();
            })
            .catch((error)=>{
              console.log(error);
          })
        } else{
          axios.post(`/addToresources`,{'postid':postid, 'status':status})
            .then(response => {
              this.showOption=null;
              this.getallpost();
            })
            .catch((error)=>{
              console.log(error);
          })
        }
      },
      addReply(commentofpostid, replyid)
      {
        console.log(commentofpostid);
        console.log('rid-',replyid);
        var re =  /(?:^|[ ])#([a-zA-Z_0-9-!@$%&*]+)/gm;
        var str=this.comment;
        console.log(str);
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
        this.pdfpreviewimage=null
        this.attachements=null
        this.post_filecontent=""
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
      submitAnswer(questionid,type,pindex)
      {
        console.log("submitAnswer")
        console.log("pindex",pindex)
        console.log("pindexpostid",this.posts[pindex])
        if(type==1){
          var answerid=this.answerids_single;
        }else if(type==2){
          var answerid=this.answerids_multi.join(",");
        }
        if(answerid!='')
        {
          console.log("if ans")
          axios.post(`/questionanswer`,{questionid:questionid,answerid:answerid,createdby:this.currentuser})
          .then(response => {
            console.log("response-", response.data)
            // if(response.data)
            // {
            //   console.log("if response")
            //   axios.post(`/getonequestionpost`,{"postid":this.posts[pindex].unique_id,"loginid":this.currentuser})
            //   .then(responsepost => {
            //     this.hidden_no=this.hidden_no+1;
            //     // this.posts[pindex]=responsepost.data[0];
            //     console.log('responsepost- ',responsepost.data[0])
            //     // console.log('posts- ',this.posts)
            //     this.getallpost();
            //   })
            // }
            this.getallpost();
          })
        }
        else
        {
          const e ="Please select your answer.";
          console.log('error-',e)
          this.SubmitError=e;
          this.SubmitErrorid=questionid;
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
         this.showscheduledatetime= moment(this.scheduledatetime).unix()*1000
         this.addscheduler=false
      },
      edset_scheduler(){
         this.edscheduledatetime=this.edscheduledate+' '+this.edscheduletimehrs+':'+this.edscheduletimemins+' '+this.edscheduletimeapm
         this.showscheduledatetime= moment(this.scheduledatetime).unix()*1000
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
      removepost(postid)
      {

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
          if(response.data.articleid!=null)
          {

          }
          else if(response.data.questionid!=null)
          {

          }
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
            var str = this.postedit[0].temppostfile
            var n = str.search("iframe");
            console.log('str=',str)
            console.log(n)
            if(n==-1)
            {
              console.log('no iframe');
              this.uploadedfilename=this.postedit[0].temppostfile
              this.post_file=this.postedit[0].temppostfile
              console.log('post_file-',this.post_file)
              this.UpdatePostfileContent();
            }
            else
            {
              console.log('iframe');
              this.post_filecontent=str
              this.post_fileflag=true
            }
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
        // this.post_content.focus();
        window.scrollTo(0, 0);
      },
      editComment(pindex,commentindex)
      {
          console.log('pindex-',pindex)
          console.log('commentindex-',commentindex)
          this.commentsofpost[commentindex].editflag=true;
      },
      updateEditComment(postid,commentindex,commentid)
      {
        // var val = event.target.innerHTML;
        // this.comment=val
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
      saveFeedLog(postid,questionid){
        if(postid!=this.logprepostid){
          axios.post(`/setfeepagescrolluserlog`,{postid:postid, userid:this.currentuser, questionid:questionid})
          .then(logresponse =>{
          })
          .catch((error)=>{
          })
          this.logprepostid=postid;
        }
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
          if(response)
          {

            axios.post('/sendpostreport',{content:this.report_content,postid:postid,created_by:this.currentuser})
            .then((notiresponse)=>{
               console.log('report-',notiresponse);
               this.report_content = null;
               // location.reload();
            })
            .catch((error)=>{
                console.log(error);
            })
          }
        })
        .catch((error)=>{
            console.log(error);
        })
      },
      getallpost()
      {
        if(this.hashname==undefined)
        {
          this.postReady = true
          axios.post(`/getallposts`,{range:this.range,loginid:this.currentuser})
          .then(response =>
          {
            this.posts = response.data
            this.postReady = false

          });
        }
        else
        {
          this.postReady = true
          axios.post(`/gethashtagposts`,{range:this.range,loginid:this.currentuser,hashtag:this.hashname})
          .then(response => {
            this.posts = response.data
            this.postReady = false
          })
        }
        this.SubmitError='';
        this.SubmitErrorid='';
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
    activatetag(id,data){
      if(this.sel_tags.indexOf(id) >= 0){
      this.sel_tags.splice(this.sel_tags.indexOf(id), 1)
      }else{
      this.sel_tags.push(id)
      this.tempposttags.push(data)
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

    // for new side search filter
      activate_addRestags()
      {
        this.sel_tagname='';
        this.topic_search='';
        // this.defaultResources()
        if(this.activeTopic==0)
        {
          this.activeTitle=0;
          this.activeShared=0;
          this.activeTopic=1;
        }
        this.addFiltertags=true;
        this.addusers=false;
      },

      activate_titles()
      {
        this.sel_tagname='';
        this.addFiltertags=false;
        this.addusers=false;
        if(this.activeTitle==0)
        {
          this.activeShared=0;
          this.activeTopic=0;
          this.activeTitle=1;
        }
      },

      activate_shared()
      {
        this.addFiltertags=false;
        this.sel_tagname='';
        if(this.activeShared==0)
        {
          this.activeTopic=0;
          this.activeTitle=0;
          this.activeShared=1;
        }

      },

       searchfiltertags()
    {
        if(this.activeTopic==1 && this.activeShared==0)
        {
            if(!this.topic_search.replace(/\s/g, '').length)
            {
                this.posttagsfilter=[];
                this.activeflag=0;
            }
            else
            {
                axios.post(`/get_addRestags`,{'searchedtag':this.topic_search})
                .then(response => {
                    this.posttagsfilter = response.data;
                    this.activeflag=1;
                });
            }
        }
        else if(this.activeTopic==0 && this.activeShared==1)
        {
            console.log(this.shared_search);
            axios.post(`/getusersresourcedetails`,{'searcheduser':this.shared_search})
            .then(response => {
              console.log(response.data);
                this.postusers = response.data;
                console.log(this.postusers)
            });
            this.addusers=true;
        }
    },

     activatedashboard()
      {
        if(this.activeTopic==1) { this.addFiltertags=true; }
        else{this.addusers=true;}
      },

      activateReftagFilter(data,id,tagname)
      {
        if(this.selectedtags.indexOf(data) > -1)
        {
          this.selectedtags.splice(this.selectedtags.indexOf(data), 1)
          this.selectedtags_id.splice(this.selectedtags_id.indexOf(id), 1)
        }
        else
        {
          // this.selectedtags.push(data);
          // this.selectedtags_id.push(id);
          this.selectedtags.splice(0, 1,  data);
          this.selectedtags_id.splice(0, 1,  id);
          if(id == ""){
            this.selectedtags_id.splice(0, 1,  9211);
          }

          this.tocallAPI()
        }

        this.activeflag=0;

        this.topic_search=''
        if(this.id==null || this.id==undefined || this.id=='')
        {
          // this.sel_tagname=tagname;
          // this.sel_tags=id
          // this.getResourceposts(this.selectedtags_id);
        }
        else
        {
          this.id=id;
          // this.getResourceposts(this.tagarr);
        }
      },

  removeselectedtopic(data,index,type)
      {
        this.id=''
        if(type==1)
        {

          this.selectedtags_id.splice(this.selectedtags.indexOf(data),1)
          this.selectedtags.splice(this.selectedtags.indexOf(data),1)
        }
       this.tocallAPI()

      },

    openTreeDialog(items,filterindex){
      console.log("items", items)
      let result = this.myTagsArray.filter(function (elem1) {
        if(elem1.tagname == items.name){
         return elem1
        }
      })
      this.activateReftagFilter(result[0],result[0].unique_id,result[0].tagname)
      if(items.flag){
       this.treeItems[filterindex].flag=false;
      }else{
        this.treeItems[filterindex].flag=true;
      }
    },
      openTreeDialogchild(items){
      let result = this.myTagsArray.filter(function (elem1) {
        if(elem1.tagname == items.name){
         return elem1
        }
      })
      this.activateReftagFilter(result[0],result[0].unique_id,result[0].tagname)
    },
    // to call API
   tocallAPI(){
      this.postReady = true
      axios.post(`/getallposts`,{range:50,loginid:this.currentuser, seltags: this.selectedtags_id})
      .then(response => {
        this.posts = response.data
        this.postReady = false
      })
      .catch(e => {
        this.errors.push(e)
      })
   }


    },
    mounted() {
      this.hashname = this.$route.query.hashvalue;
      console.log('the hashname = ',this.hashname)
      console.log('the range = ',this.range)
      this.scheduledatetime = moment(this.scheduledatetime).unix()*1000
      console.log('the scheduledatetime = ',this.scheduledatetime)

     axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {

      this.currentuser = response.data.unique_id

      // to check if pop up shown by user
        axios.post(`/handlenotification`,{user:this.currentuser})
          .then(response => {
            this.notificationPop = response.data.shown
             this.dialogDummy = response.data.shown
            //  this.notificationPop = false
            //  this.dialogDummy = false
          })
          .catch(e => {
              this.errors.push(e)
        })


      this.currentuserdata = response.data
      console.log(this.currentuserdata)
      this.user_role = response.data.role
      console.log('role-',this.user_role)
      axios.post(`/getmodulelabels`,{"moduleid":"5d3adc7e8d12005fca96d400"})
    .then(response => {
      this.postLabels=response.data;
      // console.log('plabels-',this.postLabels)
    })
    .catch(e => {
      this.errors.push(e)
    })
    if(this.hashname==undefined)
    {
      this.postReady = true
      axios.post(`/getallposts`,{range:this.range,loginid:this.currentuser})
      .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.data
        this.postReady = false
        // console.log(this.posts)
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
    else
    {
      this.postReady = true
      axios.post(`/gethashtagposts`,{range:this.range,loginid:this.currentuser,hashtag:this.hashname})
      .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.data
        this.postReady = false
        // console.log(this.posts)
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
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
      this.edposttags = response.data
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
   })
    if(this.hashname==undefined)
    {

    window.addEventListener('scroll', () =>
    {
      console.log('scroll'+'kk');
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
              // console.log('if range = ',this.range)
              // console.log(this.posts)
              this.range=this.range+20;
              this.loading2 = false;
              this.bottom = false;
             // console.log('after - ', this.range)
            }
            else
            {
              // console.log('else range')
              // this.nextlength = 1;
              this.bottom = false;
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

    }

    // to fetch count for tags
     axios.post(`/counttags`,{'reqTag':this.reqTag})
    .then(response => {
      let array = response.data.data
      let tree = this.treeItems
      tree[4].totalTags = response.data.others
      array.forEach((item) => {
        let singleTag = Object.keys(item)
        let index = tree.findIndex(x => x.id === singleTag[0])
        tree[index].totalTags = Object.values(item)
      })
    })
    .catch(e => {
      this.errors.push(e)
    })
},

watch: {
    comment: function (val) {
      // console.log(val);
      // console.log(this);
    },
     selectedtags_id:function (val) {
          if(this.selectedtags.length == 0){
            this.tocallAPI();
          }
      }
  }

  }
</script>
<style>
body{
  overflow-x:hidden;
  position:relative;
}

/* back button */
.back_button {
    display: none;
}

.downloadapk_img{
    height: 42px;
    margin-left: 12px;
}
body .dialog__content.dialog__content__active {
background: transparent !important;
}

/* .dialog.notification_pop {
width: 300px;
left: -30px;
bottom: -30px;
} */
.overlay:before {
    background-color: transparent !important;
}

.new_class_app{
  height: 35px;
  width: 85%;
  margin-left: 14px;
}

/* for cookies poilicy */
.overlay.overlay--active {
  z-index: 9!important;
}

/* for sticky header */
.navigationclass {
    top: 0 !important;
    position: fixed;
    width: 100% ;
}
</style>
