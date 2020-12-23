<template>
<div class="container">
    <div v-for="(post, index) in postData" :key="index">
        <div class="col-xs-12">
          <div class="col-md-4 col-xs-12 stickysharelinks">
               <div class="sharelinks_main sharelinks_main_2">
            <ul class="sharelinks sharelinks_2 article_social_icons">

              <li class="cursoron" v-if="post.likes.length > 0 && post.likes[0].status == 1"><span  @click="likeanddislike(post.unique_id,0)" ><img src="../assets/icons/thumbs-up-light_active.svg" class="fa_svg_icon" /></span>
                </li>

               <li class="cursoron" v-else><span @click="likeanddislike(post.unique_id,1)"><img src="../assets/icons/thumbs-up-light.svg" class="fa_svg_icon" /> </span>
                </li>

                <li class="comment_li cursoron"><span @click="showComment = !showComment"><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /></span></li>

                <li class="last_li cursoron"><span @click="editdialogbox(post.unique_id)" ><img src="../assets/icons/retweet-light.svg" class="fa_svg_icon extraimgwidth" /></span><span></span></li>

                <li class="last_li cursoron" v-if="post.savedPost.length > 0 && post.savedPost[0].status == 1" @click="savePost(post.unique_id,0)"><span><img src="../assets/icons/bookmark_red.svg" class="fa_svg_icon bookamrktwidth" /></span><span></span></li>

                <li class="last_li cursoron" v-else @click="savePost(post.unique_id,1)"><span><img src="../assets/icons/bookmark.svg" class="fa_svg_icon bookamrktwidth" /></span><span></span></li>

                 <!-- <li class="cursoron" ><span @click="addThumbnail(post.unique_id)">Add Thumbnail </span>
                </li> -->
                <li class="last_li cursoron" v-if="questionLabels==1 || questionLabels==2 || questionLabels==18 || questionLabels==19"><span class="thumbnail_button" @click="addThumbnail(post.unique_id)">Add Thumbnail</span></li>

            </ul>
            </div>
          </div>
          <div class="col-xs-12 col-md-8">
             <div class="border_rounded_box border_rounded_box_2" v-if="post.refPost !== null">
            <img :src="post.refusers[0].profile" class="cursoron user_circle">
            <p class="user_image_name cursoron">{{post.refusers[0].firstname}} {{post.refusers[0].lastname}}</p>
            <span class="clearfix"></span>
            <p class="date_user">{{ post.refPost.posted_at | postsumDate}}</p>
            <p v-if="post.refPost.content!=null" class="content_user" v-html="post.refPost.content"> </p>
            <p v-if="post.refPost.questionid!=null" class="content_user" v-html="post.refPost.questionid"> </p>
            <a  v-if="post.refPost.attached && post.refPost.attached.indexOf('http')>=0" :href="post.refPost.attached" target="_BLANK">
                <pdf :src="post.refPost.attached"></pdf>
            </a>
             <a  v-else-if="post.refPost.attached" :href="fileurl+post.refPost.attached" target="_BLANK">
                <pdf :src="fileurl+post.refPost.attached"></pdf>
            </a>
        </div>

        <div class="border_rounded_box border_rounded_box_2" v-if="post.refPost == null && post !== null">
            <img :src="post.refusers[0].profile" class="cursoron user_circle">
            <p class="user_image_name cursoron">{{post.refusers[0].firstname}} {{post.refusers[0].lastname}}</p>
            <span class="clearfix"></span>
            <p class="date_user">{{ post.posted_at | postsumDate}}</p>
            <p v-if="post.content!=null" class="content_user" v-html="post.content"> </p>
            <p v-if="post.questionid!=null" class="content_user" v-html="post.questionid"> </p>
            <a  v-if="post.attached && post.attached.indexOf('http')>=0" :href="post.attached" target="_BLANK">
                <pdf :src="post.attached"></pdf>
            </a>
             <a  v-else-if="post.attached" :href="fileurl+post.attached" target="_BLANK">
                <pdf :src="fileurl+post.attached"></pdf>
            </a>
        </div>
          </div>
        </div>
    </div>

    <!-- to show comments -->
    <div class="col-xs-12 col-sm-4"></div>
    <div class="col-xs-12 col-sm-12">
    <div class="article_commentsection">

      <!-- to add comments -->
    <div class="commentfield" v-if="showComment">
    <textarea v-model="comment" ref="comment_box" class="add_newcomment" placeholder="Please comment here" ></textarea>
    <span class="comm_current_user commemt_user1"><img :src="userProfile" class="circle_image"></span>
    <span @click="addComment()" class="cursoron "><span class="send_svg_icon add_comment1">Add Comment</span></span>
    </div>

    <div class="more_heading_article" v-if="commentsofpost.length>0"> Comments </div>
    <div  v-for="(commentsofpostdata,commindex) in commentsofpost" :key="commindex">

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

        <li class="comment_li cursoron" @click="showReply(post_id,commentsofpostdata.unique_id)"><img src="../assets/icons/comment-dots-light.svg" class="fa_svg_icon extraimgwidth" /><span v-if="commentsofpostdata.commentofcomment.length>0">{{commentsofpostdata.commentofcomment.length}}</span></li>
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
</div>
</div>


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
                  <li v-for="rehtag in resrchHashTags" @click="reselhashtag(rehtag.categoryname,rehtag)" :key="rehtag">{{rehtag.categoryname}}</li>
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

      <!-- time sceduler -->

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

    <!-- to add video thumnail to the video -->
    <v-dialog v-model="thumbnailDialog" persistent max-width="500">
      <v-card>
          <v-card-title class="headline">Add Thumbnail</v-card-title>
          <v-container>
          <input type='file' id="getFile" @change="attachfiletopost">
          </v-container>
          <v-card-actions>
              <button class="btn btn_edit modal_btn" @click="thumbnailDialog = false">Close</button>
              <button class="btn btn_edit modal_btn" @click="postDataToApi()">Save</button>
          </v-card-actions>
      </v-card>
  </v-dialog>


</div>
</template>

<script>
import axios from 'axios';
import pdf from 'vue-pdf';
import moment from 'moment';
import postcontent from './includes/postcontent'
var username=localStorage.username;


export default {
    components:{pdf, postcontent},
    data() {
        return {
            postData: [],
            errors: [],
            defaultfalse:false,
            defaultnull:null,
            currentuser: null,
            comment:null,
            showComment: false,
            userProfile:null,
            commentsofpost:[],
            fileurl:window.publicfileurl,


            comment:null,
            reply_commentid:null,
            replyoncomment:null,
            commentliker:false,
            commentlikers:[],
            replyflag:null,
            replyflagR:null,
            post_id:null,
            currentuserdata: [],
            editedcomment: null,
            questionLabels:'',


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
            preview_data:{'imageurl':null,'anchorurl':null,'host':null,'title':null,'description':null},
            preview_flag:false,
            thumbnailDialog: false,
            videoThumbnail: null,
            postIdForThumbnail: null
        }
    },

      methods: {
        // to save post
         savePost(postid,status) {
        axios.post(`/savePost`,{'postid':this.post_id, 'created_by':this.currentuser, 'status':status})
          .then(response => {postid
            console.log(response)
              this.getallpostData();
          })
          .catch((error)=>{
            console.log(error);
        })

      },

        // to get all post
         getallpostData(){
         axios.post(`/getposttoview`,{"postId":this.post_id, "userId" : this.currentuser})
            .then(response => {
                this.postData = response.data.data
            }).catch(e => {
                this.errors.push(e)
            })

         },

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

// like and deslike
   likeanddislike(postid,status){
      axios.post(`/likedislikepost`,{'postid':postid,'likeby':this.currentuser,'status':status})
      .then(response => {
        if(status==1){
        axios.post('/setpostlikenotification',{"weburl":'',"appurl":'',"targetid":postid,"q_type":null,"title":null,"questionid":null,postid:postid,createdby:this.currentuser})
        .then((notiresponse)=>{
           // location.reload();
        })
        .catch((error)=>{
            console.log(error);
        })
      }
      // JSON responses are automatically parsed.
      this.getallpostData();
    });
    },

    getAllComments(){
              axios.post(`/getcommentsofpost`,{'postid':this.post_id, loginid:this.currentuser})
              .then(response => {
                console.log(response.data)
               this.commentsofpost=response.data;

              })
              .catch(e => {
                this.errors.push(e)
              })

    },

    // to add comments
       addComment()
      {
        if(this.comment!=null && this.comment.trim())
        {
          axios.post(`/addcomment`,{comment:this.comment,postid:this.post_id,commentid:null,replyid:null,createdby:this.currentuser})
          .then(response => {
            this.comment=null
            this.getAllComments()
          })
        }
      },

      // comment like
       comlikeanddislike(commentid,status){
            console.log(commentid);
            console.log(status);
            axios.post(`/likedislikecomment`,{'commentid':commentid,'likeby':this.currentuser,'status':status})
          .then(response => {
            console.log(response)
            this.getAllComments()
          });
          },

          // delete comment
          removecomment(commentid)
      {

          console.log(commentid)
          axios.post(`/removepostcomment`,{"id":commentid})
          .then(removeresponse => {
          }).catch(e => {
              this.errors.push(e)
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

      // reply comment
        addReply(commentofpostid,replyid)
      {
        console.log(commentofpostid);
        if(this.replyoncomment!=null && this.replyoncomment.trim())
        {
          axios.post(`/addcomment`,{comment:this.replyoncomment,postid:this.post_id,commentid:commentofpostid,replyid:replyid,createdby:this.currentuser})
          .then(response => {
            this.getAllComments()
            this.replyoncomment=null
            this.replyflag=false;
            this.reply_commentid=null;
           this.replyflagR=null;
          })
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
        removeReply(replyid)
      {

          console.log(replyid)
          axios.post(`/removepostcomment`,{"id":replyid})
          .then(removeresponse => {
            console.log(removeresponse)
            this.getAllComments()
          }).catch(e => {
              this.errors.push(e)
            })
      },

      editComment(commentindex)
      {
          console.log('commentindex-',commentindex)
          this.commentsofpost[commentindex].editflag=true;
      },

        editReply(cindex,replyindex)
      {

          console.log('replyindex-',replyindex)
          this.commentsofpost[cindex].commentofcomment[replyindex].reditflag=true;
      },

      // update comment
      updateEditComment(commentindex,commentid)
      {

          this.editedcomment=this.commentsofpost[commentindex].content;
          axios.post(`/updateeditcomment`,{commentid:commentid,content:this.editedcomment, createdby:this.currentuser})
          .then(response => {
            this.getAllComments()
          });
      },

      // to add Thumbnail
        addThumbnail(uniqueId){
          this.postIdForThumbnail = uniqueId
          this.thumbnailDialog = true
        },

        // post thumnail data to upload API
        async attachfiletopost(data){

            const file = data.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            try{
            const res = await axios.post("/upload", formData);
            this.videoThumbnail = res.data.file
            } catch(err){
            console.log(err);
            }
        },

        // post thumbnail data
        postDataToApi(){
          if (this.postIdForThumbnail !== null, this.videoThumbnail !== null){
            axios.post('/addthumnailtovideo', {'postId': this.postIdForThumbnail, 'videoThumbnailPath': this.videoThumbnail})
            .then(response => {
              this.thumbnailDialog = false
            })
            .catch(err => {
              this.errors.push(err)
            })
          }else{
            alert("please upload a file first")
          }
        }

        },

        created() {
        this.post_id = this.$route.query.id

          axios.post(`/getcurrentuser`,{'username':username})
            .then(response => {
              this.currentuser = response.data.unique_id
              this.currentuserdata=response.data
              this.userProfile  = response.data.profile
              this.questionLabels=response.data.role;


              // for comments
             this.getAllComments()

              this.getallpostData()
            }).catch(e => {
                this.errors.push(e)
            })

        }
}
</script>
<style>
.thumbnail_button{
    background: #b0ca36;
    padding: 7px 27px 7px;
    border-radius: 4px;
    color: white;
}

</style>