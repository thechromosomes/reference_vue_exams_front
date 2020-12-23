<template>
 <v-container grid-list-xl>
  <v-layout row wrap>
   <div class="wrapper">
    <div class="first_section">
     <div class="communityheading"><img src="../assets/icons/window-light_hover1.svg" class="fa_svg_icon" />Resources</div>
<!----------------------------------------->
     <!-- <div class="search_lists">
        <p class="search_lists_heading"> Search in: </p>
        <li v-if="activeTopic==1" class="search_options search_active"  @click="activate_addRestags"> Topics </li>
            <li v-if="activeTopic==0" class="search_options" @click="activate_addRestags"> Topics </li>
        <li v-if="activeTitle==0" class="search_options" @click="activate_titles" > Titles</li>
            <li v-if="activeTitle==1" class="search_options search_active" @click="activate_titles" > Titles</li>
        <li v-if="activeShared==0" class="search_options" @click="activate_shared" > Shared by </li>
            <li v-if="activeShared==1" class="search_options search_active" @click="activate_shared" > Shared by </li>
     </div>
      <div v-if="activeTopic==1" class="search_dashboard inline-chips" >
        <div class="total_selected">
          <template v-if="selectedtags.length >0 ">
          <v-chip  class="selected_chips" v-for="(selectedtag, stindex) in selectedtags" close @input="removeselectedtopic(selectedtag,stindex,1)" v-bind:key="`seltag${stindex}`">{{selectedtag.tagname }} </v-chip>
        </template>
        </div>
        <div class="searchin">
          <button type="submit" class="searchButton"><i class="fa fa-search searchicon_dash"></i></button>
          <input type="text" class="searchTerm" v-model="topic_search" @click="activatedashboard" @keyup="searchtags" placeholder="Search Resources">
        </div>
      </div> -->


          <!-- new filter navigations -->
          <div class="searchin-custom">
              <!-- <div class="button_previw saved_list_button" v-if="showSavelist==false"><button class="btn q_prvw_sbmtbtn" type="button" @click="opensaveList(currentuser)"> <i class="fa fa-bookmark"></i> Open My Saved List</button></div> -->
              <div class="button_previw saved_list_button" v-if="showSavelist==true"><button class="btn q_prvw_sbmtbtn" type="button" @click="defaultResources"> <img src="../assets/icons/resources-selected_hover.svg" class="fa_svg_icon post_report_icon" /> Back to Resource </button></div>

            <div class="total_selected">
              <template v-if="selectedtags.length >0">
              <v-chip class="selected_chips" v-for="(selectedtag, stindex) in selectedtags" close @input="removeselectedtopic(selectedtag,stindex,1)" v-bind:key="`seltag${stindex}`">{{selectedtag.tagname }} </v-chip>
            </template>
            </div>

            <div class="total_selected"> <v-chip class="selected_chips" v-if="sel_user!=null && sel_user!='' " close @input="removeuser()">{{sel_user }} </v-chip></div>

          <div class="search_dashboard" v-if="activeTopic==1">
          	<div class="input_button">
            <button type="submit" class="searchButton"><i class="fa fa-search searchicon_dash"></i></button>
            <input type="text" class="searchTerm" v-model="topic_search" @click="activatedashboard" @keyup="searchtags" placeholder="Search">
        </div>
          </div>
         <div v-if="activeShared==1 " class="search_dashboard inline-chips"  >
          <div class="searchin">
            <button type="submit" class="searchButton"><i class="fa fa-search searchicon_dash"></i></button>
            <input type="text" class="searchTerm" v-model="shared_search" @click="activatedashboard"  @keyup="searchtags" placeholder="Search">
          </div>
        </div>
        <div v-if="activeTitle==1" class="search_dashboard" >

            <button type="submit" class="searchButton"><i class="fa fa-search searchicon_dash"></i></button>
            <input type="text" class="searchTerm" v-model="title_search"   @keyup="searchTitle"  placeholder="Search">

        </div>
        <div v-if="addtags==true" >
            <ul v-if="activeflag==1">
              <li class="checkbox_li" v-for="(posttag, tindex) in posttags" v-bind:key="`tag${tindex}`"><label><input class="chechbox_input" @click="activateReftag(posttag,posttag.unique_id,posttag.tagname)" type="checkbox" v-bind:class="{activetag:selectedtags_id.indexOf(posttag.unique_id) >= 0}"><span>{{posttag.tagname}}</span></label></li>
             <!-- <li class="cursoron" v-for="(posttag, tindex) in posttags" v-bind:key="`tag${tindex}`" @click="activateReftag(posttag,posttag.unique_id,posttag.tagname)" v-bind:class="{activetag:selectedtags_id.indexOf(posttag.unique_id) >= 0}">{{posttag.tagname}}</li> -->

            </ul>
        <!-- <div>
        <li class="checkbox_li" v-for="(dptag, dtindex) in defposttags" v-bind:key="`tag${dtindex}`" ><label><input class="chechbox_input" @click="activateReftag(dptag,dptag.unique_id,dptag.tagname)" type="checkbox" v-bind:class="{activetag:selectedtags.indexOf(dptag.unique_id) >= 0}"><span>{{dptag.tagname}}</span></label></li>
       </div> -->

       <br>
       <div class="filter-section">
       <div class="search_lists">
                <li v-if="activeTopic==1" class="search_options search_active"  @click="activate_addRestags"> Filter </li>

                <li v-if="activeTopic==0" class="search_options" @click="activate_addRestags"> Filter </li>
                <!-- <li v-if="activeTitle==0" class="search_options" @click="activate_titles" > Titles</li>
                <li v-if="activeTitle==1" class="search_options search_active" @click="activate_titles" > Titles</li>
                <li v-if="activeShared==0" class="search_options" @click="activate_shared" > Shared by </li>
                <li v-if="activeShared==1" class="search_options search_active" @click="activate_shared" > Shared by </li> -->
            </div>
            <br>
         <div class="tree_class">
      <ul class="filtertree">
          <li v-for="(treeItem,filterindex) in treeItems">
            <label><input class="chechbox_input" type="checkbox"  v-bind:checked="selectedtags_id.indexOf(treeItem.id) >= 0" @click="openTreeDialog(treeItem,filterindex)" style="color:black; cursor: pointer; "> <span >{{ treeItem.actualName }}</span><span>{{'('+treeItem.totalTags[0]+')'}}</span></label>
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
      <div class="tag_container resrc_pop" v-if="addusers==true" >
        <v-card>
            <v-chip  v-if="postuser!=null" v-for="(postuser, uindex) in postusers" v-bind:key="`tag${uindex}`"  @click="activateUser(postuser.unique_id,postuser.firstname,postuser.lastname)">{{postuser.firstname}} {{postuser.lastname}}</v-chip>
        </v-card>
      </div>
      </div>
      <!-- ------------------end----------------------------- -->

      <!-- <div v-if="activeShared==1 " class="search_dashboard inline-chips"  >
        <div class="total_selected"> <v-chip class="selected_chips" v-if="sel_user!=null && sel_user!='' " close @input="removeuser()">{{sel_user }} </v-chip></div>
          <div class="searchin">
            <button type="submit" class="searchButton"><i class="fa fa-search searchicon_dash"></i></button>
            <input type="text" class="searchTerm" v-model="shared_search" @click="activatedashboard"  @keyup="searchtags" placeholder="Search Resources">
          </div>
      </div>
      <div v-if="activeTitle==1" class="search_dashboard" >
          <button type="submit" class="searchButton"><i class="fa fa-search searchicon_dash"></i></button>
          <input type="text" class="searchTerm" v-model="title_search"   @keyup="searchTitle"  placeholder="Search Resources">
      </div>
       <div class="tag_container resrc_pop" v-if="addtags==true" >
        <v-card>
            <ul class="drop_ul" v-if="activeflag==1">
             <li class="cursoron" v-for="(posttag, tindex) in posttags" v-bind:key="`tag${tindex}`" @click="activateReftag(posttag,posttag.unique_id,posttag.tagname)" v-bind:class="{activetag:selectedtags_id.indexOf(posttag.unique_id) >= 0}">{{posttag.tagname}}</li>
            </ul>
        </v-card>
      <div>
        </div>
        <v-card>
            <v-chip v-for="(dptag, dtindex) in defposttags" v-bind:key="`tag${dtindex}`" @click="activateReftag(dptag,dptag.unique_id,dptag.tagname)" v-bind:class="{activetag:selectedtags.indexOf(dptag.unique_id) >= 0}" >
              {{dptag.tagname}}
           </v-chip>
        </v-card>
      </div>
      <div class="tag_container resrc_pop" v-if="addusers==true" >
        <v-card>
            <v-chip  v-if="postuser!=null" v-for="(postuser, uindex) in postusers" v-bind:key="`tag${uindex}`"  @click="activateUser(postuser.unique_id,postuser.firstname,postuser.lastname)">{{postuser.firstname}} {{postuser.lastname}}</v-chip>
        </v-card>
      </div> -->
  <!-- <div class="button_previw saved_list_button" v-if="showSavelist==false"><button class="btn q_prvw_sbmtbtn" type="button" @click="opensaveList(currentuser)"> <i class="fa fa-bookmark"></i> Open My Saved List</button></div>
  <div class="button_previw saved_list_button" v-if="showSavelist==true"><button class="btn q_prvw_sbmtbtn" type="button" @click="defaultResources"> <img src="../assets/icons/resources-selected_hover.svg" class="fa_svg_icon post_report_icon" /> Back to Resource </button></div> -->
    </div>

    <!-- loader component -->
<div v-if="postReady" style= "position: fixed; left: 50%; top: 50%;">
    <v-progress-circular
    :size="100"
    :width="7"
    color="#b0cb36"
    indeterminate
  ></v-progress-circular>
</div>

    <!--end first-section -->
<!----------------------------------------->
    <div v-for="(post, pindex) in posts" v-bind:key="`tags${pindex}`">
     <div class="userdiv">
      <img :src="post.userdetail.profile" class="cursoron user_circle">
       <p class="user_image_name cursoron">{{post.userdetail.firstname}} {{post.userdetail.lastname}}</p>
        <div class="posttoggle_wrapp" >
         <span class="post_toggle" @click="showOptions(post.unique_id)"><img src="../assets/icons/angle-down.svg" class="fa_svg_icon post_toggle_icon" /></span>
          <div class="post_report" v-if="showOption==post.unique_id">
           <ul class="post_report_ul">
            <li class="post_report_item cursoron" v-if="postLabels[6].rolevalue.indexOf(currentuserdata.role) >= 0 && post.resourceidstatus==false " @click="addtoResources(post.unique_id,1)"><img src="../assets/icons/head-side-brain-light.svg" class="fa_svg_icon post_report_icon" />Move to Resource</li>
            <li class="post_report_item cursoron" v-if="postLabels[6].rolevalue.indexOf(currentuserdata.role) >= 0 && post.resourceidstatus==true  " @click="addtoResources(post.unique_id,0)"><img src="../assets/icons/resources-selected_hover.svg" class="fa_svg_icon post_report_icon" />Remove from Resource</li>
            <li class="post_report_item cursoron" v-if="currentuser==post.userdetail.unique_id || postLabels[5].rolevalue.indexOf(currentuserdata.role) >= 0" @click="removepost(post.unique_id)"><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon post_report_icon" />Delete</li>
            <p class="post_report_desc" v-if="currentuser==post.userdetail.unique_id || postLabels[5].rolevalue.indexOf(currentuserdata.role) >= 0">If you want to delete post</p>
            <li class="post_report_item cursoron" v-if="(post.questionid==null || post.questionid=='') && (post.articleid==null && post.articleid!='') && currentuser==post.userdetail.unique_id " @click="editpost(post.unique_id)"><img src="../assets/icons/edit.svg" class="fa_svg_icon post_report_icon" />Edit</li>

            <li class="post_report_item cursoron" v-if="(post.questionid==null || post.questionid=='') && (post.articleid!=null && post.articleid!='' && post.parentid!=null) && currentuser==post.userdetail.unique_id " @click="editpost(post.unique_id)"><img src="../assets/icons/edit.svg" class="fa_svg_icon post_report_icon" />Edit</li>

            <a :href="`/editarticle?id=${post.articleid}`"><li class="post_report_item cursoron" v-if="(post.articleid!=null && post.articleid!='' && post.parentid==null) && currentuser==post.userdetail.unique_id "><img src="../assets/icons/edit.svg" class="fa_svg_icon post_report_icon" />Edit</li></a>


            <p class="post_report_desc"></p>
            <li class="post_report_item cursoron" @click="reportPost(post.unique_id)"><img src="../assets/icons/report.svg" class="fa_svg_icon post_report_icon" />Report</li>
           </ul>
          </div>
        </div><br>
        <div class="clearfix"></div>
        <p class="date_user">{{ post.posted_at | postsumDate}}</p>
        <div class="question_preview" v-if="post.questionid!=null && post.questionid!=''">
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
         <div class="buttons_group" >
          <template v-for="(tag, tindex) in post.alltags">
           <a :href="`/resources?id=${tag.unique_id}`" target="_BLANK" ><button  v-bind:key="`tags${tindex}`" class="btn btn_one" >{{tag.tagname}}</button></a>
          </template>
         </div><!--buttons_group-->
         <img :src="fileurl+post.questiondata.hero_img" class="img-responsive title_imageprview" v-if="post.questiondata.hero_img!=null">
         <img src="../assets/images/slider.png" class="img-responsive title_imageprview" v-if="post.questiondata.hero_img==null && post.questiondata.imagevisibility==1">
         <div class="selection_section" v-if="post.questiondata.option_type!=null && post.questiondata.questiontype!='5d15fea98edfed6c417592d9'">
          <span v-for="questionoptions in post.questionoptions">
          <div class="blankline blankline_radio checkbox">
           <label>
            <span  class="blankline_span blankline_span_empty" v-if="post.questiondata.option_type==1 && post.questionanswer.length == 0" role="radio"> <input type="radio" :value="questionoptions._id" v-model="answerids_single" class="radiosize" ><p class="radio_title empty_title">{{questionoptions.option_text}}</p></span>
            <span class="blankline_span  blankline_span_empty" v-if="post.questiondata.option_type==2 && post.questionanswer.length == 0"><input type="checkbox" :value="questionoptions._id" v-model="answerids_multi"  class="radiosize" ><p class="empty_title">{{questionoptions.option_text}}</p></span>
            <span class="blankline_span  blankline_span_empty" v-if="post.questiondata.option_type==2 && post.questionanswer.length > 0 && post.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)<0"><img src="../assets/icons/checkbox_empty.svg" class="fa_svg_answer" /><p class="empty_title">{{questionoptions.option_text}}</p></span>
            <span class="blankline_span blankline_span_correct" v-if="questionoptions.answervalue==true && post.questionanswer.length > 0 && post.questiondata.option_type==2 && post.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)>=0">
             <img src="../assets/icons/rightanswer.svg" class="fa_svg_answer" />
             <p class="empty_title">{{questionoptions.option_text}}</p>
             <span class="correct_button"><button class="button correct_btn">Correct </button></span></span>
            <span class="blankline_span blankline_span_correct" v-if="questionoptions.answervalue==true && post.questionanswer.length > 0 && post.questiondata.option_type==2 && post.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)<0">
             <img src="../assets/icons/checkbox_empty.svg" class="fa_svg_answer" />
             <p class="empty_title">{{questionoptions.option_text}}</p>
             <span class="correct_button"><button class="button correct_btn">Correct </button></span></span>
            <span class="blankline_span blankline_span_wrong" v-if="questionoptions.answervalue==false && post.questionanswer.length > 0 && post.questiondata.option_type==2 && post.questionanswer[0].answerid.split(',').indexOf(questionoptions._id)>=0"><img src="../assets/icons/wronganswer.svg" class="fa_svg_answer" /><p class="empty_title">{{questionoptions.option_text}}</p>
             <span class="wrong_button"><button class="button wrong_btn">Incorrect</button></span></span>
            <span class="blankline_span blankline_span_wrong" v-if="questionoptions.answervalue==false && post.questionanswer.length > 0 && post.questiondata.option_type==1 && questionoptions._id == post.questionanswer[0].answerid"><img src="../assets/icons/dot-circle_incorrect.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{questionoptions.option_text}}</p>
             <span class="wrong_button"><button class="button wrong_btn">Incorrect</button></span></span>
            <span class="blankline_span blankline_span_correct" v-if="questionoptions.answervalue=='true' && post.questionanswer.length > 0 && post.questiondata.option_type==1 && questionoptions._id == post.questionanswer[0].answerid"><img src="../assets/icons/dot-circle_correct.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{questionoptions.option_text}}</p>
             <span class="correct_button"><button class="button correct_btn">Correct </button></span></span>
            <span  class="blankline_span blankline_span_empty" v-if="questionoptions.answervalue==false && post.questiondata.option_type==1 && post.questionanswer.length > 0 && questionoptions._id != post.questionanswer[0].answerid"><img src="../assets/icons/radio-on-button.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{questionoptions.option_text}}</p></span>
            <span class="blankline_span blankline_span_correct" v-if="questionoptions.answervalue=='true' && post.questionanswer.length > 0 && post.questiondata.option_type==1 && questionoptions._id != post.questionanswer[0].answerid"><img src="../assets/icons/radio-on-button.svg" class="fa_svg_answer" /><p class="radio_title empty_title">{{questionoptions.option_text}}</p>
             <span class="correct_button"><button class="button correct_btn">Correct </button></span></span>
           </label>
          </div><!--blankline_radio-->
          <span class="clearfix"></span>
          </span>
         </div><!--selection_section-->
         <!-- <div class="answer_explantion" v-if="post.questionanswer.length > 0">
          <p class="a_explntn">Answer Explanation</p>
          <p class="sub_explanation" v-html="post.questiondata.answer_explanation"></p>
         </div> --><!--answer_explantion-->
        </div><!---question_preview--->

        <div class="article_preview" v-if="post.articleid!=null && post.articleid!='' && post.refPost.length==0 ">
         <a :href="`/articleview?id=${post.articledata[0].articleid}`" target="_BLANK">
          <div class="article_title">
           <!-- <img :src="fileurl+post.articledata[0].uploaded_file[0]" class="img-responsive title_imageprview" v-if="post.articledata[0].uploaded_file!=null|| post.articledata[0].uploaded_file.length>0"> -->
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
        </div><!---article_preview--->
        <!-- ************************************** -->
        <div class="question_preview" v-if="post.pollid!=null && post.pollid!=''">
          <div class="first_title">
            <span><b v-html="post.polldata.question_text"></b></span>
          </div><!--first_title-->
          <div class="buttons_group" >
            <template v-for="(tag, tindex) in post.alltags">
              <!-- <a :href="'/resources/'+tag.unique_id"> -->
             <a :href="`/resources?id=${tag.unique_id}`" target="_BLANK"><button  v-bind:key="`tags${tindex}`" class="btn btn_one"  >{{tag.tagname}}</button></a>
            </template>
          </div><!--buttons_group-->
          <div class="selection_section" v-if="post.polloptions!=null">
            <span v-for="polloption in post.polloptions">
            <div class="blankline blankline_radio checkbox">
              <label>
                <span  class="blankline_span blankline_span_empty" v-if="post.polloptions!=null && post.polloptions!=''" role="radio"> <input type="radio" :value="polloption._id" class="radiosize" ><p class="radio_title empty_title">{{polloption.option_text}}</p></span>
              </label>
              </div><!--blankline_radio-->
              <span class="clearfix"></span>
            </span>
          </div><!--selection_section-->
        </div><!---poll_preview--->
        <!---------------------------------------------->
        <p v-if="post.content!=null" class="content_user" v-html="post.content"> </p>
        <!-- <a  v-if="post.attached && post.attached.indexOf('http')>=0" :href="post.attached" target="_BLANK"><pdf :src="post.attached"></pdf></a>
        <a  v-else-if="post.attached" :href="fileurl+post.attached" target="_BLANK"><pdf :src="fileurl+post.attached"></pdf></a> -->
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
                <!-- <img :src="fileurl+post.articledata[0].uploaded_file[0]" class="img-responsive title_imageprview" v-if="post.articledata[0].uploaded_file!=null && post.articledata[0].uploaded_file.length>0"> -->
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
              <a @click="visitTag(tag.unique_id,tag.tagname)" :href="`/resources?id=${tag.unique_id}`" target="_BLANK"><button  v-bind:key="`tags${tindex}`" class="btn btn_one">{{tag.tagname}}</button></a>
            </template>
        </div>
        <div class="sharelinks_main">
         <ul class="sharelinks">
          <li class="cursoron" v-if="post.likestatus == 0"><span @click="likeanddislike(post.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /> </span>
          <span v-if="post.likes>0" class="cursoron count_like" @click="showlikers(post.unique_id)">{{post.likes}}</span>
          </li>
          <li class="cursoron" v-if="post.likestatus == 1"><span  @click="likeanddislike(post.unique_id,0)" ><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="post.likes>0" class="cursoron count_like" @click="showlikers(post.unique_id)"> {{post.likes}}</span></li>
          <li class="comment_li cursoron" @click="showComments(post.unique_id)"><span><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /></span><span v-if="post.allcomments.length>0" class="count_like"> {{post.allcomments.length}}</span></li>
          <li class="last_li cursoron" v-if="(post.questionid==null || post.questionid=='') && post.pollid==null" @click="resharedialogbox(post.unique_id)"><span><img src="../assets/icons/retweet-light.svg" class="fa_svg_icon extraimgwidth" /></span><span></span></li>
          <li class="last_li cursoron" v-if="post.allsaveposts==0 && post.questionid==null || post.questionid=='' " @click="savePost(post.unique_id,0)"><span><img src="../assets/icons/bookmark.svg" class="fa_svg_icon bookamrktwidth" /></span><span></span></li>
          <li class="last_li cursoron" v-if="post.allsaveposts==1 && post.questionid==null || post.questionid=='' " @click="savePost(post.unique_id,1)"><span><img src="../assets/icons/bookmark_red.svg" class="fa_svg_icon bookamrktwidth" /></span><span></span></li>
          <li class="last_li cursoron" v-if="post.questionanswer.length > 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d9'"><a :href="`/questionanswer?id=${post.questiondata._id}`" target="_BLANK"><span><img src="../assets/icons/answer_selected.svg" class="fa_svg_answericon" /></span><span></span></a></li>
          <li class="last_li cursoron" v-if="post.questionanswer.length == 0 && post.questiondata.questiontype=='5d15fea98edfed6c417592d9'"><a :href="`/questionanswer?id=${post.questiondata._id}`" target="_BLANK"><span><img src="../assets/icons/answer.svg" class="fa_svg_answericon" /></span><span></span></a></li>
          <li class="last_li cursoron" v-if="post.questionid!=null && post.questionanswer.length == 0 && post.questiondata.questiontype!='5d15fea98edfed6c417592d9'"><button  class="btn q_prvw_sbmtbtn" type="button" @click="submitAnswer(post.questiondata._id,post.questiondata.option_type)">Submit</button></li>
          <li class="last_li cursoron read_dashboard_btn" v-if="post.articleid!=null && post.articleid!='' "><a :href="`/articleview?id=${post.articledata[0].articleid}`"><button target="_BLANK" class="btn q_prvw_sbmtbtn" type="button">Read</button></a></li>
          <!-- <div class="last_li cursoron read_dashboard_btn" v-if="post.articleid!=null && post.articleid!=''">
            <a :href="`/articleview?id=${post.articledata[0].articleid}`"><button target="_BLANK" class="btn q_prvw_sbmtbtn" type="button">Read</button></a>
        </div> -->
         </ul>
        </div>
        <div v-if="showComment==post.unique_id">
         <div  v-for="(commentsofpostdata,commindex) in commentsofpost" :key="commindex">
          <div class="chats">
           <img :src="commentsofpostdata.commentby.profile" class=" user_circle"> <p class="usernmechats">{{commentsofpostdata.commentby.firstname}} {{commentsofpostdata.commentby.lastname}}</p>
           <div class="chatter dashboard_chat">
            <div class="read_more"></div>
<!--  ************************************************************************************************************************************************************************  -->
            <span v-if="commentsofpostdata.editflag==false" v-html="commentsofpostdata.content"></span>
            <span v-else>
            <span  @click="updateEditComment(post.unique_id,commindex,commentsofpostdata._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
            <textarea v-model="commentsofpostdata.content" class="add_newcomment" >{{commentsofpostdata.content}}</textarea></span>
<!--  ************************************************************************************************************************************************************************  -->
            <div class="last_li date_right">{{ commentsofpostdata.created_at | postsumDate}}</div>
            <ul class="sharelinks_chaatter">
             <li class="cursoron" v-if="commentsofpostdata.likestatus == 0"><span @click="comlikeanddislike(commentsofpostdata.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" class="cursoron" @click="showcommentlikers(commentsofpostdata.unique_id)">{{commentsofpostdata.likes}}</span></li>
             <li class="cursoron" v-if="commentsofpostdata.likestatus == 1"><span @click="comlikeanddislike(commentsofpostdata.unique_id,0)"><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span><span v-if="commentsofpostdata.likes>0" class="cursoron" @click="showcommentlikers(commentsofpostdata.unique_id)">{{commentsofpostdata.likes}}</span></li>
             <li class="comment_li cursoron" @click=showReply(post.unique_id,commentsofpostdata.unique_id)><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /><span v-if="commentsofpostdata.commentofcomment.length>0">{{commentsofpostdata.commentofcomment.length}}</span></li>
<!--  ************************************************************************************************************************************************************************  -->
        <template v-if="commentsofpostdata.commentby.unique_id==currentuser || postLabels[8].rolevalue.indexOf(currentuserdata.role) >= 0">
          <template v-if="commentsofpostdata.settingflag==false">
            <li class="cursoron"><span  @click="commentsofpostdata.settingflag=true"><img src="../assets/icons/ellipsis-h.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
          </template>
          <template v-else>
            <li class="cursoron"><span @click="editComment(pindex,commindex)" ><img src="../assets/icons/edit.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
            <li class="cursoron"><span @click="removecomment(post.unique_id, commentsofpostdata.unique_id)" ><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></span><span  class="cursoron" ></span></li>
          </template>
        </template>
<!--  ************************************************************************************************************************************************************************  -->
            </ul>
           </div>
           <div class="replyfield" v-if="replyflag==commentsofpostdata.unique_id">
            <span class="comm_current_user reply_field"><img :src="currentuserdata.profile" class="circle_image"></span>
            <span @click="addReply(commentsofpostdata.unique_id, commentsofpostdata.unique_id)" class="cursoron"><span class="send_svg_icon reply_link1">Reply</span></span>
            <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" ></textarea>
           </div>
          </div>
          <div class="chats second_chats dashboard_chat" v-for="(commentsofpost_reply,crindex) in commentsofpostdata.commentofcomment">
           <img :src="commentsofpost_reply.commentby_n.profile" class=" user_circle"> <p class="usernmechats">{{commentsofpost_reply.commentby_n.firstname}} {{commentsofpost_reply.commentby_n.lastname}}</p>
           <div class="chatter">
<!--  ********************************************************************************************  -->
            <div v-if="commentsofpost_reply.parentcontent.length >0" class="bg_part">
              <img src="../assets/images/left-quote.svg" class="big_svg" />
              <span class="reply_on_comnt "  v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.parentcontent[0].content"></span>
              <span class="date_time_of_cmt"> {{commentsofpost_reply.parentcontent[0].replyby.firstname}} {{commentsofpost_reply.parentcontent[0].replyby.lastname}}, {{commentsofpost_reply.parentcontent[0].created_at | postsumDate }} </span>
              <span class="reply_on_comnt_reply" v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.content"> </span>
              <span v-else>
              <span  @click="updateEditReply(post.unique_id,commindex,crindex,commentsofpost_reply._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
              <textarea v-model="commentsofpost_reply.content" class="add_newcomment" >{{commentsofpost_reply.content}}</textarea></span>
            </div>
            <div v-else>
            <!-- <span class="reply_on_comnt_reply" v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.content"></span>
            <span v-else>
            <span  @click="updateEditReply(post.unique_id,commindex,crindex,commentsofpost_reply._id)" class="cursoron"><span class="send_svg_icon add_comment1">Update</span></span>
            <textarea v-model="commentsofpost_reply.content" class="add_newcomment" >{{commentsofpost_reply.content}}</textarea></span> -->
            <span class="reply_on_comnt_reply" v-if="commentsofpost_reply.reditflag==false" v-html="commentsofpost_reply.content"> </span>
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
             <!-- <li class="last_li">{{ commentsofpost_reply.created_at | postsumDate}}</li> -->
<!--  ********************************************************************************************  -->
            <template v-if="commentsofpost_reply.commentby_n.unique_id==currentuser || postLabels[8].rolevalue.indexOf(currentuserdata.role) >= 0">
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
            <span @click="addReply(commentsofpostdata.unique_id,commentsofpost_reply.unique_id)" class="cursoron"><span class="send_svg_icon reply_link2">Reply</span></span>
            <textarea v-model="replyoncomment" class="replyoncomment" placeholder="Please reply here" ></textarea>
           </div>
          </div>
         </div>
         <div class="commentfield" >
          <!-- <div class="commentfield" v-if="replyflag != post.unique_id"> -->
          <span class="comm_current_user commemt_user1"><img :src="currentuserdata.profile" class="circle_image"></span>
          <div v-if="freeze" class="independant_buton resource_btn"><span @click="addComment()" class="cursoron"><span class="send_svg_icon add_comment1">Add Comment</span></span></div>
          <textarea v-model="comment" class="add_newcomment" placeholder="Please comment here" ></textarea>
          <!-- <v-text-field :label="solo" ref="commentbox" placeholder="Please comment here" class="add_newcomment" v-model="comment" autofocus></v-text-field> -->
         </div>
        </div>
       </div>
      </div> <!-- v-for -->

    <div v-if="posts.length==0"><span>No posts to show...</span></div>
    </div><!-- wrapper -->
  <!--  ********************************************************************************************  -->
    <v-dialog  v-model="postliker"width="500">
      <v-card>
        <v-card-title  class="headline grey lighten-2" primary-title >
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
  <!--  ********************************************************************************************  -->
    <v-dialog  v-model="commentliker"  width="500">
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
  <!--  ********************************************************************************************  -->
  <v-dialog v-model="dialog" width="500" >
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
          <v-btn> Add </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
   <!-- ********************************************************************************************  -->
   <!-- <v-dialog v-model="addtags2" width="500" >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
            <span class="crosspopup" @click="addtags2=false">x</span>
        </v-card-title>
        <v-card-text>
          <i class="fa fa-search"></i><input type="text" v-model="tag_search" @keyup="searchtags" placeholder="Search"/>
        </v-card-text>
        <v-chip v-for="(posttag, tagindex) in posttags" v-bind:key="`tag${tagindex}`" @click="activatetag(posttag.unique_id)"  v-bind:class="{activetag:sel_tags.indexOf(posttag.unique_id) >= 0}" >
            {{posttag.tagname}}
        </v-chip>
      </v-card>
    </v-dialog> -->
  <!--  ********************************************************************************************  -->

    <v-dialog v-model="addscheduler" width="600" >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
          Select date and time <span class="crosspopup cp_scheduler" @click="addscheduler=false">x</span>
        </v-card-title>
        <v-card-text>
          <div class="schedulercontainer">
            <v-date-picker v-model="datepicker" @change="updateddatentime" ></v-date-picker>
            <div class="scheduler_com">
              <v-text-field  v-model="scheduledate" value="scheduledate"></v-text-field>
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
    <v-dialog v-model="edaddtags" width="500" >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
            <span class="crosspopup" @click="edaddtags=false">x</span>
        </v-card-title>
        <v-card-text>
            <i class="fa fa-search"></i><input type="text" v-model="edtag_search" @keyup="searchReftags" placeholder="Search"/>
        </v-card-text>
        <v-chip v-for="(edposttag, edtagindex) in edposttags" v-bind:key="`etag${edtagindex}`" v-if="edposttag.tagname!=null" @click="activateSharetag(edposttag.unique_id, edposttag)"  v-bind:class="{activetag:edsel_tags.indexOf(edposttag.unique_id) >= 0}">{{edposttag.tagname}}</v-chip>
        <div class="mainpopup_btn">
            <button class="btn btn_edit" @click="edaddtags=false">Submit</button>
        </div>
      </v-card>
    </v-dialog>
  <!-- *************************************************************************************************************************************** -->
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
                <textarea class="post_input" v-model="edpost_content_temp" ref="post_content_tempf" placeholder="Write a post or" :autofocus="'autofocus'"></textarea>
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
          <div class="button_previw"><button class="btn q_prvw_sbmtbtn" type="button" @click="referencePost(edPost.unique_id,1 )">Repost</button></div>
          <!-- <div class="button_previw">
            <ul class="list_right_edit">
              <li><button class="btn btn_edit " @click="referencePost(edPost.unique_id)">Add post</button></li>
            </ul>
          </div> -->
        </div>
        </v-card-text>
      </v-card>
</v-dialog>
  <!-- *************************************************************************************************************************************** -->

  <v-dialog v-model="postEditDialog" width="1000">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <span class="crosspopup cp_scheduler" @click="closepostEditDialog">x</span>
        </v-card-title>
        <v-card-text>
          <div v-for="(editcontent, pindex) in editcontentpost"  v-bind:key="`tags${pindex}`">
            <div>
            <div class="post_context_wrap">
              <div class="post_context">
              <span class="add_topic cursoron" @click="edaddtags=true"><img src="../assets/icons/layer-plus.svg" class="fa_svg_icon"/> Add a tag </span>
                <textarea class="post_input" v-model="post_content_temp" ref="post_content_tempf" placeholder="Write a post or" @keyup="manu_content" :autofocus="'autofocus'"></textarea>
                <div class="clearfix">
                <span class="remove_preview cursoron" v-if="post_content" @click="remove_preview">x</span><p v-html="post_content"></p>
                </div>
                <div class="clearfix">
                <span class="remove_preview cursoron" v-if="post_fileflag" @click="remove_previewfile">x</span><p v-html="post_filecontent"></p>
                <span class="remove_preview cursoron" v-if="remove_previewpdf" @click="remove_previewfile">x</span><p v-if="remove_previewpdf" ><pdf :src="previewattachlink"></pdf></p>
                </div>
                <!-- <ul class="inner_tools">
                <li  class=" btn_postshort scheduler cursoron" @click="addscheduler=true"><img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon" /></li>
                </ul> -->
              </div>
            </div>
            <v-chip class="small_chips" v-for="(tempposttag, temptagindex) in tempposttags" v-bind:key="`rtag${temptagindex}`" v-if="tempposttag.tagname!=null && postsel_tags.indexOf(tempposttag.unique_id) >= 0" >{{tempposttag.tagname}}</v-chip>
          </div>
          <div class="clearfix">
            <!-- <span class="remove_preview cursoron" v-if="post_fileflag" @click="remove_previewfile">x</span><p v-html="post_filecontent"></p>
            <span class="remove_preview cursoron" v-if="remove_previewpdf" @click="remove_previewfile">x</span><p v-if="remove_previewpdf" >
            <pdf :src="previewattachlink"></pdf></p> -->
            <!-- <img v-bind:src="pdfpreviewimage" /> -->
          </div>
          <!-- **********************************************************post content***************************************************************  -->
          <!-- <div class="userdiv">
            <p v-if="edPost.content!=null" class="content_user" v-html="edPost.content"> </p>
            <a  v-if="edPost.attached && edPost.attached.indexOf('http')>=0" :href="edPost.attached" target="_BLANK"><pdf :src="edPost.attached"></pdf></a>
            <a  v-else-if="edPost.attached" :href="fileurl+edPost.attached" target="_BLANK"><pdf :src="fileurl+edPost.attached"></pdf></a>
          </div> -->

          <div class="button_previw">
            <ul class="inner_droptable" >
              <li class="btn btn_posttype cursoron fileselector">
              <img src="../assets/icons/file-pdf-light.svg" class="fa_svg_icon width_attach hover_class" />
              <img src="../assets/icons/file-pdf-light_hover.svg" class="fa_svg_icon width_attach withouthover_class" />Attach a file <input type="file" ref="file" @change="attachfiletopost()"/> </li>
            </ul>
            <button class="btn q_prvw_sbmtbtn" type="button" @click="createeditpost(posteditid)" >Edit Post</button>
          </div>
          <!-- <div class="button_previw">
            <ul class="list_right_edit">
              <li><button class="btn btn_edit " @click="referencePost(edPost.unique_id)">Add post</button></li>
            </ul>
          </div> -->
        </div>
        </v-card-text>
      </v-card>
</v-dialog>

  <!-- *************************************************************************************************************************************** -->
      </v-layout>
  </v-container>

</template>
<style scoped>
.search_dashboard.inline-chips{
  border: 1px solid #ccc;
  display:block;
  border-radius: 5px;
}
.search_dashboard.inline-chips .total_selected{
  display:block;

}
.search_dashboard.inline-chips .searchin{
  display:flex;
}
.search_dashboard.inline-chips .searchTerm, .search_dashboard.inline-chips .searchButton{
  border:unset !important;
}
</style>
<script>
 $(document).ready(function() {
  // get current URL path and assign 'active' class
  var pathname = window.location.pathname;
});
import moment from 'moment'
import getusername from './users/username'
import pdf from 'vue-pdf'
var username=localStorage.username;
var datetime = new Date();
  export default {
      components: {getusername,pdf},
      data(){
      return {
        id:0,
        idname:'',
        post_content:null,
        reply_commentid:null,
        postdata:null,
        comment_postid:null,
        post_content_temp:null,
        currentuser:null,
        tempid:null,
        libimage:null,
      errors: [],
      posts:[],
      hours:['01','02','03','04','05','06','07','08','09','10','11','12'],
      minutes:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
      ampm:['AM','PM'],
     dialog: false,
     postEditDialog: false,
     showSavelist: false,
     searchDashboard: true,
     searchResTopic: false,
     report:false,
     report_content:null,
     postdefault_flag:true,
      post_flag:false,
      remove_previewpdf:false,
      post_fileflag:false,
      addtags:true,
      addusers:false,
      addtags2:false,
      activeflag:0,
      resTags:[],
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
       topic_search:null,
       shared_search:null,
       title_search:null,
       activeOpt: 0,
       activeTopic: 1,
       activeTitle: 0,
       activeShared: 0,
      showOption: null,
      showComment: null,
      posttags:null,
      defposttags:null,
      postusers:null,
      imgflag:true,
      sel_tags:[],
      selectedtags:[],
      selectedtags_id:[],
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
      commentliker:false,
      commentlikers:[],
      postliker:false,
      editcontentpost:null,
      postlikers:[],
      items: [],
      answerids_single:'',
      answerids_multi:[],
      pdfpreviewimage:null,
      sel_tagname:null,
      edscheduledate:moment().format('YYYY-MM-DD'),
      edscheduletimehrs:moment().format('hh'),
      edscheduletimemins:moment().format('mm'),
      edscheduletimeapm:moment().format('A'),
      edposttags:null,
      edpost_content:null,
      editedcomment:null,
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
      edsel_tags:[],
      tagarr:[],
      sel_user:null,
      postLabels:'',
      tempposttags:[],
      postsel_tags:[],
      posteditid:null,
      freeze: true,
      postReady: false,
      reqTag:["5d842f1a66ab01731b382025", "5d15e9f36d8ca60a8be7f709", "5dfac3df35507713a1928670", "5d75d70f5eb94a7dd37a2600"],
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
          "tagname": "Addiction medicine",
          "unique_id": "5d5f5199f76c7718f7a9489f",
          },
          {
          tagname: "Musculoskeletal",
          unique_id: "5d48d20a821f9f179821dd68"
          },
          {
          tagname: "Wellbeing",
          unique_id: "5dfac3df35507713a1928670"
          },
          {
          tagname: "ACRRM",
          unique_id: "5d842f1a66ab01731b382025"
          },
          {
          tagname: "RACGP",
          unique_id:"5d15e9f36d8ca60a8be7f709"
          }
      ],
      tree:  [],
     treeItems: [
      {
        id: '5d842f1a66ab01731b382025',
        name: 'ACRRM',
        actualName : `ACRRM`,
        totalTags:"",
        flag: false,
        children: [
          { id: '5d8815cd418dbf6bbed30b98', name: 'CBD' , actualName: 'Case Based Discussion  (CBD)' },
          { id: '5d845a7166ab01731b38202d', name: 'MCQ' , actualName: 'Multi  choice Quiz (MCQ)' },
          { id: '5d84568a66ab01731b38202b', name: 'StAMPS', actualName:`StAMPS (Structure Assessment using Multi patient Scenario's)`},
          { id: '5d75d7c95eb94a7dd37a2608', name: 'ME tips',actualName: 'ME TIPS' },
          { id: '5d8430fc66ab01731b382027', name: 'Registrar Tips', actualName: 'Registrar Tips' },
        ],
      },
      {
        id: '5d15e9f36d8ca60a8be7f709',
        name: 'RACGP',
        actualName: `RACGP`,
         totalTags:"",
         flag: false,
        children: [
          { id: '5d75d7775eb94a7dd37a2602', name: 'AKT', actualName: 'Applied Knowledge Test  (AKT)'},
          { id: '5d75d7945eb94a7dd37a2604', name: 'KFP', actualName: 'Key  Feature Problems (KFP)' },
          { id: '5d75d7c95eb94a7dd37a2608', name: 'ME tips', actualName: 'ME TIPS'},
          { id: '5d8430fc66ab01731b382027', name: 'Registrar Tips', actualName: 'Registrar Tips'  },
        ],
      },
      {
        id: "5d75d70f5eb94a7dd37a2600",
        name: 'Webinar',
        actualName: `Webinar`,
        totalTags:"",
        flag: false,
        children: [
          { id: '5d5f5199f76c7718f7a9489f', name: 'Addiction medicine', actualName: "Addiction medicine" },
          { id: '5d6886ef5df9280f64ff2f7c', name: 'Eczema/dermatitis', actualName: 'Dermatology' },
          { id: '5d75d70f5eb94a7dd37a2600', name: 'Exam', actualName:'Exam'},
          { id: '5d48d20a821f9f179821dd68', name: 'Musculoskeletal', "actualName": "Musculoskeletal" },
          { id: '5d670c5a284fe10f45d6a86e', name: 'Optic atrophy', actualName:"Opthamologgy" },
          { id: '5d48d1e1821f9f179821dd5a', name: 'Paediatrics', actualName: "Paeds" },
        ],
      },
      {
        id: '5dfac3df35507713a1928670',
        name: "Wellbeing",
        actualName:`Wellbeing`,
        totalTags:"",
        flag: false,
        children: []
      }
    ],

      }
    },

    methods:
    {
       activatedashboard()
      {
        if(this.activeTopic==1) { this.addtags=true; }
        else{this.addusers=true;}
      },
      removeselectedtopic(data,index,type)
      {
        // console.log(data);
        // console.log(index);
        // console.log(type);
        this.id=''
        if(type==1)
        {

            this.selectedtags_id.splice(this.selectedtags.indexOf(data),1)
            this.selectedtags.splice(this.selectedtags.indexOf(data),1)
        }
        console.log('selected tagids'+this.selectedtags,this.selectedtags_id);
            this.getResourceposts(this.selectedtags_id);
         this.defaultResources();

        this.searchtags();

      },
      addtoResources(postid,status)
      {
        console.log(postid)
        console.log(status)
        axios.post(`/addToresources`,{'postid':postid, 'status':status})
          .then(response => {
            console.log(response)
              this.showOption=null
              this.defaultResources()
          })
          .catch((error)=>{
            console.log(error);
        })
      },
      removeuser()
      {
        this.sel_user=null;
        this.shared_search='';
        this.defaultResources()
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
            this.getResourceposts(this.id);
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
            this.getResourceposts(this.id);
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
            this.getResourceposts(this.id);
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
            this.getResourceposts(this.id);
          }).catch(e => {
              this.errors.push(e)
            })
      },
      showlikers(id)
      {
        this.getlikers(id);
        this.postliker=true;
      },
      activate_addRestags()
      {
        console.log('activeTopic')
        this.sel_tagname='';
        this.topic_search='';
        this.defaultResources()
        if(this.activeTopic==0)
        {
          this.activeTitle=0;
          this.activeShared=0;
          this.activeTopic=1;
        }
        this.addtags=true;
        this.addusers=false;
      },
      activate_titles()
      {
        console.log('activeTitle')
        this.defaultResources()
        this.sel_tagname='';
        this.addtags=false;
        this.addusers=false;
        if(this.activeTitle==0)
        {
          this.activeShared=0;
          this.activeTopic=0;
          this.activeTitle=1;
          // this.searchTitles();
        }
      },
      activate_shared()
      {
        console.log('activeShared')
        this.addtags=false;
         // this.tag_search=null;
        this.sel_tagname='';
        this.defaultResources()
        if(this.activeShared==0)
        {
          this.activeTopic=0;
          this.activeTitle=0;
          this.activeShared=1;
        }

      },
      visitTag(tid,tagname)
      {
        axios.post(`/settagsvisit`,{tagid:tid, userid:this.currentuser})
        .then(response => {
          console.log('visit')
        });
      },
      opensaveList(loginid)
      {
        console.log(loginid)
        this.postReady = true
        axios.post(`/getsavedrespost`,{loginid:this.currentuser})
        .then(response => {
          this.posts = response.data
            console.log('res-',this.posts.length)
          this.showSavelist=true;
          this.postReady = false
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      resharedialogbox(postid)
      {
        console.log(postid)
        console.log(this.currentuser)
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
      searchReftags()
      {
        axios.post(`/gettags`,{'searchedtag':this.edtag_search})
        .then(response => {
            console.log(response)
            this.edposttags = response.data
        });
      },
      referencePost(refPostid,status)
      {
        // console.log('edpost-',this.editedPost)
        console.log('refid-',refPostid);
        console.log('cu-',this.currentuser);
        if(this.edpost_content_temp || this.edsel_tags)
        {
          if(this.edscheduledatetime!==null){
            this.edscheduledatetime= moment(this.edscheduledatetime).unix()*1000
          }else{
             this.edscheduledatetime=Date.now();
          }
          var finalsearchcontent = this.edpost_content_temp +' '+this.editedPost[0].searchcontent;
          var finalpostcontent = this.edpost_content_temp;
          var finaltags = this.edsel_tags.join(",")+','+this.editedPost[0].tags;

          var finalarticleid = this.editedPost[0].articleid;
          var finalpollid = this.editedPost[0].pollid;
          var finaleventid = this.editedPost[0].eventid;

          console.log('searchcontent-',finalsearchcontent);
          console.log('content-',finalpostcontent);
          console.log('tags-',finaltags);
          console.log('sch-',this.edscheduledatetime);
          console.log('articleid-',this.editedPost[0].articleid);
          console.log('pollid-',this.editedPost[0].pollid);
          console.log('event-',this.editedPost[0].eventid);

          axios.post('/addpostbyweb',{pdfpreviewimage:null, questionid:null, deleted:false,  articleid:finalarticleid, pollid:finalpollid, eventid:finaleventid, attachement:null, tags:finaltags, searchcontent:finalsearchcontent, postcontent:finalpostcontent, createdby:this.currentuser, scheduledatetime:this.edscheduledatetime, parentid:refPostid})
          .then((response)=>
          {
            console.log('res-',response.data.data.unique_id);
            // axios.post(`/addToresources`,{'postid':response.data.data.unique_id, 'status':true})
            // .then(response => {
              this.getResourceposts(this.id);
              this.edpost_content=null
              this.edpost_content_temp=null
              this.edpost_link=null
              this.edpost_file=""
              this.edpost_filecontent=""
              this.edsel_tags = []
              this.edpost_fileflag=false
              this.edremove_previewpdf=false
              this.editdialog=false
            // })

          })
          .catch((error)=>{
              console.log(error);
          })

         }
        },
      async getlikers(id)
      {
        await axios.post(`/getpostlikers`,{'postid':id})
        .then(response => {
          this.postlikers=response.data;
        })
        .catch(e => {
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
          console.log(this.commentlikers);
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      reportPost(postid)
      {
        console.log(postid);
        console.log(this.currentuser);
        this.postdata=postid
        this.report=true;
        this.showOption=null
      },
      submitReport(postid)
      {
        console.log(postid);
        console.log(this.currentuser);
        console.log(this.report_content);
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
      getallimages(regurl)
      {
         axios.post(`/getallimages`,{'requrl':regurl})
            .then(response => {
        this.allimages=response.data;
            })
      },
      addComment()
      {
        if(this.comment!=null && this.comment.trim())
        {
          this.freeze = false
          axios.post(`/addcomment`,{comment:this.comment, postid:this.comment_postid, commentid:null,replyid:null, createdby:this.currentuser})
          .then(response => {
            // this.updateComments(response.data.unique_id);
            this.getResourceposts(this.id);
            this.updateComments(this.showComment);
            this.comment=null
            this.freeze = true

          })
        }
      },
      savePost(postid,status)
      {

        console.log(postid)
        console.log(status)
        if(this.id!='')
        {
            axios.post(`/savePost`,{'postid':postid, 'created_by':this.currentuser, 'status':status})
             .then(response => {
                if(this.showSavelist==false){this.getResourceposts(this.id);}
                else{this.opensaveList(this.currentuser)}
              })
              .catch((error)=>{
                console.log(error);
            })
        }
        else
        {
            axios.post(`/savePost`,{'postid':postid, 'created_by':this.currentuser, 'status':status})
              .then(response => {
                if(this.showSavelist==false){this.getdefaultResposts();}
                else{this.opensaveList(this.currentuser)}
              })
              .catch((error)=>{
                console.log(error);
            })
        }
      },
      addReply(commentofpostid, replyid)
      {
        console.log(commentofpostid);
        if(this.replyoncomment!=null && this.replyoncomment.trim())
        {
          axios.post(`/addcomment`,{comment:this.replyoncomment,postid:this.comment_postid,commentid:commentofpostid,replyid:replyid,createdby:this.currentuser})
          .then(response => {
            // this.updateComments(response.data.unique_id);
            this.getResourceposts(this.id);
            this.replyoncomment=null
            this.updateComments(this.showComment);
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
      remove_previewfile(){
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
      submitAnswer(questionid,type){
        if(type==1){
      var answerid=this.answerids_single;
        }else if(type==2){
      var answerid=this.answerids_multi.join(",");
        }

        axios.post(`/questionanswer`,{questionid:questionid,answerid:answerid,createdby:this.currentuser})
          .then(response => {
            this.defaultResources()
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
        this.freeze = false
        await axios.post(`/getcommentsofpost`,{'postid':id, loginid:this.currentuser})
        .then(response => {
          // console.log(response.data)
        this.commentsofpost=response.data;
        this.freeze = true


        })
    .catch(e => {
      this.errors.push(e)
    })
      },
      set_scheduler(){
         this.scheduledatetime=this.scheduledate+' '+this.scheduletimehrs+':'+this.scheduletimemins+' '+this.scheduletimeapm
         this.addscheduler=false

      },
      showmainpostool(){
        this.postdefault_flag=false
        this.post_flag=true
      },
      updateddatentime(){
        this.scheduledate=this.datepicker;
      },
      removepost(postid)
      {
        console.log(postid);
        axios.post(`/deleteRespostbyid`,{'postid':postid})
        .then(response => {
            this.defaultResources();
        })
        .catch(e => {
            this.errors.push(e)
        })
      },
      async attachfiletopost()
      {
        this.post_file = "dfghdkhgkjdf";
        const file = this.$refs.file[0].files[0];
        this.uploadedfilename=file.name
        const formData = new FormData();
        formData.append("file", file);
        try{
          const res = await axios.post("/upload", formData);
          console.log(res.data);
          this.post_file = res.data.file
          console.log('post_file-',this.post_file)
          this.UpdatePostfileContent();
        } catch(err){
          console.log(err);
          }
      },
      manu_content()
     {
      console.log('link-',this.post_link);
      console.log('post_content_temp', this.post_content_temp)
      console.log('content-',this.post_content_temp.concat(this.post_link));
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
          console.log('one');
          this.post_content='<span class="preview_loader">Fetching Preview</span>';
          if(this.post_link.indexOf('www.youtube.com')!==-1)
          {
            console.log('if one');
            var arrvals=this.post_link.split("watch?v=")
            this.tempid=arrvals[1]
            this.post_content='<iframe class="videoframe" src="https://www.youtube.com/embed/'+this.tempid+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            this.post_content_temp=this.post_content_temp.replace(this.post_link, '')
          }
          else if(this.post_link.indexOf('youtu.be')!==-1)
          {
            console.log('else if one');
            var arrvals=this.post_link.split("be/")
            this.tempid=arrvals[1]
            this.post_content='<iframe class="videoframe" src="https://www.youtube.com/embed/'+this.tempid+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            this.post_content_temp=this.post_content_temp.replace(this.post_link, '')
          }
          else if(this.post_link.indexOf('vimeo.com')!==-1)
          {
            console.log('else if 2');
            var arrvals=this.post_link.split("com/")
            this.tempid=arrvals[1]
            this.post_content='<iframe class="videoframe" src="https://player.vimeo.com/video/'+this.tempid+'?title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
            this.post_content_temp=this.post_content_temp.replace(this.post_link, '')
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
              preview +='<a href="'+response.data.url+'" class="cursoron" target="_blank"><div class="preview-main">';
              let img = new Image();
              if(response.data.imgs[0])
              {
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
            }).catch(e => {
                this.post_link=null
                this.post_content=null
                this.libimage=null
                this.errors.push(e)
              })
          }
          else{
            this.post_content='<p>'+this.post_link+'</p>'
          }
        }
        console.log('content',this.post_content);
        this.dialog=false
      },
      closepostEditDialog()
      {
        this.pdfpreviewimage=null
        this.attachements=null
        this.post_filecontent=""
        this.post_file=""
        this.postEditDialog=false;
        this.editcontentpost=null;
        this.post_content_temp=null;
        this.post_fileflag=false;
        this.remove_previewpdf=false
      },
      editpost(postid)
      {
        this.post_filecontent='';
        this.posteditid=postid;
        console.log(postid);
        this.showOption=null;
        axios.post(`/getonepost`,{post_id:postid, loginid:this.currentuser})
        .then(response =>
        {
          this.postEditDialog=true;
          this.editcontentpost=response.data;
          this.scheduledatetime = this.editcontentpost[0].posted_at;
          var arr=[];
          var selarr=[];
          this.editcontentpost[0].alltags.forEach(function(entry)
          {
            arr.push({'tagname':entry.tagname, 'unique_id':entry.unique_id})
            selarr.push(entry.unique_id,)
          });
          this.postsel_tags=selarr;
          this.tempposttags=arr;
          console.log('postsel_tags-',this.sel_tags)
          console.log('tempposttags-',this.tempposttags)
          this.post_content_temp=this.editcontentpost[0].tempcontent.replace(/<br ?\/?>/g, "\n")
          this.post_content_temp=this.post_content_temp.replace(/<[\/]{0,1}(p)[^><]*>/ig,"")
          if(this.editcontentpost[0].temppostfile!=null)
          {
            var str = this.editcontentpost[0].temppostfile
            var n = str.search("iframe");
            console.log('str=',str)
            console.log(n)
            if(n==-1)
            {
              this.uploadedfilename=this.editcontentpost[0].temppostfile
              this.post_file=this.editcontentpost[0].temppostfile
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

          if(this.editcontentpost[0].attached!=null)
          {
            this.post_file=this.editcontentpost[0].attached
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

      UpdatePostfileContent()
      {
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
      async createpdfpreviewimage(filename)
      {
        var filenames=filename.split("/");
        await  axios.post(`/convertpdftopreview`,{'pdfname':filenames[2]})
        .then(response =>
        {
          axios.post(`/getFilesizeInBytes`,{'filename':response.data.imgurl})
          .then(response1=> {
            this.pdfpreviewimage=response1.data.imgurl;
          })
          .catch(e => {
            this.errors.push(e)
          })
        }).catch(e => {
              this.errors.push(e)
          })
      },
      createeditpost(postid)
      {
            this.postEditDialog=false;
        console.log('postid-',postid);
        console.log('editpost-',this.editcontentpost);
        console.log("result")
        console.log('cu-',this.currentuser)
        console.log('pdfp-',this.pdfpreviewimage)
        console.log('attch-',this.attachements)
        var finaltags=this.postsel_tags.join(",")
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

        axios.post('/updateEditedpost',{edt_postid:postid,postcontent:finalpostcontent,searchcontent:finalpostcontent,tags:finaltags,scheduledatetime:this.scheduledatetime,attachement:this.attachements,pdfpreviewimage:this.pdfpreviewimage,updatedby: this.currentuser})
          .then((response)=>
          {
            this.postedit=null
            this.post_content=null
            this.post_content_temp=null
            this.post_link=null
            this.post_file=""
            this.attachements=null
            this.pdfpreviewimage=null
            this.post_filecontent=""
            this.postsel_tags = []
            this.remove_previewpdf=false
            this.post_fileflag=false
            this.getResourceposts(this.id);
          })
          .catch((error)=>{
            console.log(error);
          })
      },
      getallpost(){
        this.postReady = true
      axios.post(`/getallposts`,{loginid:this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.posts = response.data
      this.postReady = false
    });
    },
    getResourceposts(tagid)
    {
      // console.log('ddddddddddddddddddddddddddddddddddd',tagid);
      this.postReady = true
      axios.post(`/getallresourceposts`,{seltags:tagid,loginid:this.currentuser})
      .then(response => {
        this.posts = response.data
        this.postReady = false
      })
      .catch(e => {
          this.errors.push(e)
      })
    },
    getdefaultResposts()
    {
      this.postReady = true
      axios.post(`/getallresourceposts`,{seltags:'',loginid:this.currentuser})
        .then(response => {
            this.posts = response.data
            this.showSavelist=false
            this.postReady = false
        })
        .catch(e => {
            this.errors.push(e)
         })
    },
    searchtags()
    {
        if(this.activeTopic==1 && this.activeShared==0)
        {
            // console.log('ts-',this.topic_search);
            if(!this.topic_search.replace(/\s/g, '').length)
            {
                // console.log('if')
                this.posttags=null;
                this.activeflag=0;
            }
            else
            {
                // console.log('else')
                axios.post(`/get_addRestags`,{'searchedtag':this.topic_search})
                .then(response => {
                    this.posttags = response.data;
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
        else{}
    },
    searchTitle()
    {
        console.log(this.title_search);
        if(this.title_search !=null && this.title_search.trim()!='')
        {
            this.postReady = true
            axios.post(`/getTitleresourceposts`,{'searchedtitle':this.title_search, loginid:this.currentuser})
            .then(response => {

                 this.posts = response.data;
                 console.log('title-',this.posts)
                 this.postReady = false
            });
        }
        else
        {
            this.defaultResources();
        }
    },
    activateSharetag(id,data)
    {
      console.log('tagdata: ',data);
      if(this.edsel_tags.indexOf(id) >= 0){
        this.edsel_tags.splice(this.edsel_tags.indexOf(id), 1)
        this.postsel_tags.splice(this.sel_tags.indexOf(id), 1)
        this.reftemptags.splice(this.sel_tags.indexOf(id), 1)
      }else{
        this.edsel_tags.push(id)
        this.postsel_tags.push(id)
        this.tempposttags.push({'tagname': data.tagname, 'unique_id':data.unique_id})
        this.reftemptags.push({'tagname': data.tagname, 'unique_id':data.unique_id})
      }
      console.log('tempposttagsafter: ',this.tempposttags);
    },
    activateUser(userid,f_name,l_name)
    {
        console.log(this.currentuser);
        console.log(userid);
        this.sel_user=f_name + l_name;
        this.postusers=null
        this.postReady = true
        axios.post(`/getSharedresourceposts`,{'userid':userid, 'loginid':this.currentuser})
        .then(response => {
            console.log(response.data)
            this.posts = response.data;
            this.postReady = false
        });
        this.shared_search = null
    },
    activateReftag(data,id,tagname)
    {
      console.log(id,' and ',tagname)
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
      }

       this.activeflag=0;

      this.topic_search=''
      if(this.id==null || this.id==undefined || this.id=='')
      {
        this.sel_tagname=tagname;
        this.sel_tags=id
        this.getResourceposts(this.selectedtags_id);
      }
      else
      {
        // this.sel_tagname=tagname;
        // this.sel_tags=this.selectedtags_id
        this.id=id;
        this.getResourceposts(this.tagarr);
      }
    },
    likeanddislike(postid,status){
      console.log(postid);
  axios.post(`/likedislikepost`,{'postid':postid,'likeby':this.currentuser,'status':status})
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      this.getResourceposts(this.id);
    });
    },
    comlikeanddislike(commentid,status){
      console.log(commentid);
      console.log(status);
  axios.post(`/likedislikecomment`,{'commentid':commentid,'likeby':this.currentuser,'status':status})
    .then(response => {
      console.log(response)
      this.getResourceposts(this.id);
    });
    },
    defaultResources()
    {
      console.log(this.id)
      if(this.id!='' && this.id!=undefined)
      {
        this.postReady = true
        axios.post(`/getallresourceposts`,{seltags:this.tagarr, loginid:this.currentuser})
        .then(response => {
          this.posts = response.data
          this.showSavelist=false
          this.postReady = false
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
      else
      {
        this.postReady = true
        axios.post(`/getallresourceposts`,{seltags:this.selectedtags_id,loginid:this.currentuser})
        .then(response => {
            this.posts = response.data
            this.showSavelist=false
            this.postReady = false
        })
        .catch(e => {
            this.errors.push(e)
         })
      }
    },
      openTreeDialog(items,filterindex){
        console.log("items >>>>>>>>", items)
      let result = this.myTagsArray.filter(function (elem1) {
        if(elem1.tagname == items.name){
         return elem1
        }
      })
      if(result.length > 0){
        this.activateReftag(result[0],result[0].unique_id,result[0].tagname)
      }
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
      this.activateReftag(result[0],result[0].unique_id,result[0].tagname)
    }
    //******************************************************************************
    },

    watch: {
    selectedtags_id:function (val) {
          if(this.selectedtags.length == 0){
            this.getResourceposts(this.selectedtags_id);
          }
      }
    },

    created()
    {
        this.id = this.$route.query.id;
        // var path = window.location.pathname;
        // path = path.replace(/\/$/, "");
        // path = decodeURIComponent(path);
        // console.log('path-',path)


        console.log('id-',this.id)
        axios.post(`/getcurrentuser`,{'username':username})
        .then(response =>
        {
            this.currentuser = response.data.unique_id
            console.log('cu-',this.currentuser)
            this.currentuserdata = response.data
            if(this.id==undefined)
            {
                this.id="";
                this.postReady = true
                axios.post(`/getallresourceposts`,{seltags:'',loginid:this.currentuser})
                .then(response => {
                  this.posts = response.data
                  this.postReady = false
                })
                .catch(e => {
                  this.errors.push(e)
                })
                axios.post(`/get_addRestags`,{'searchedtag':null})
                .then(response => {
                  this.defposttags = response.data
                })
                .catch(e => {
                  this.errors.push(e)
                })
            }
            else
            {
                console.log('else')
                console.log('at-',this.addtags)
                console.log('dt-',this.defposttags)
                this.tagarr.push(this.id)
                console.log('tagarr-',this.tagarr)
                this.postReady = true
                axios.post(`/getallresourceposts`,{seltags:this.tagarr, loginid:this.currentuser})
                .then(response => {
                  this.posts = response.data
                  this.sel_tags=this.id
                  this.postReady = false
                  // console.log(posts)
                })
                .catch(e => {
                  this.errors.push(e)
                })
                axios.post(`/getonetag`,{tag_id:this.id})
                .then(response => {
                  this.idname = response.data
                  this.sel_tagname=this.idname.tagname;
                  // console.log(id)
                })
                .catch(e => {
                  this.errors.push(e)
                })
                axios.post(`/get_addRestags`,{'searchedtag':null})
                .then(response => {
                // console.log(this.idname)
                // this.sel_tagname=this.idname.tagname;
                  this.defposttags = response.data
                  console.log('def-',this.defposttags)
                })
                .catch(e => {
                  this.errors.push(e)
                })
            }

            axios.post(`/setresourcesview`,{"userid":this.currentuser})
            .then(resourceview => {
                console.log(resourceview);
            }).catch(e => {
              this.errors.push(e)
            })
        }).catch(e => {
          this.errors.push(e)
        }),
        axios.post(`/getmodulelabels`,{"moduleid":"5d3adc7e8d12005fca96d400"})
        .then(response => {
          this.postLabels=response.data;
          // console.log(this.postLabels)
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
        axios.get(`/getallsliderimages`)
        .then(response => {
            // JSON responses are automatically parsed.
            this.items = response.data
        })
        .catch(e => {
            this.errors.push(e)
        }),
        axios.post(`/gettags`,{'searchedtag':this.edtag_search})
        .then(response => {
            console.log(response)
            this.edposttags = response.data
        })

        // to fetch count for tags
        axios.post(`/counttags`,{'reqTag':this.reqTag})
        .then(response => {
          let array = response.data.data
          let tree = this.treeItems
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

  }
</script>
