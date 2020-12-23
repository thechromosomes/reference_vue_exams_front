<template id="example-modal">
  <div class="main_wrapper study_plann container">
    <i class="fa fa-search search_study"></i>
    <input type="text" id="myInput" v-model="search_topic" placeholder="Search" @keyup="searchTopic" class="col-sm-9">
  <!------  
    <div class="col-md-3 right_panel_button">
      <div class="form_add_button">
        <button @click="dialog=true" class="add_button"> Add a Topic </button>
      </div>
    </div>
    ----->

    <div class="col-sm-6 main_cvrstudy">
      <form>

        <div  class="checkbox_line col-sm-12" v-for="(studyplanavailable,catindex) in categories">
         <img src="../assets/icons/starregular.svg" v-if="studyplanavailable.starstatus==0" @click="saveStar(studyplanavailable.unique_id,1)" class="righticon_image redstar_img with_new_position">
          <img src="../assets/icons/starregular_red.svg" v-if="studyplanavailable.starstatus==1 " @click="saveStar(studyplanavailable.unique_id,0)" class="righticon_image redstar_img with_new_position">
          <label class="col-sm-4 label_tblestudy" v-if="studyplanavailable.chkstatus==0"> 
         
         
            <input class="input_hidden" type="checkbox"  @click="saveCheckbox(studyplanavailable.unique_id,1)" :id="studyplanavailable.id" name="studyplanavailable.categoryname" :value="studyplanavailable.unique_id" value="studyplanavailable.categoryname">
            <span class="check_label_heading">  {{studyplanavailable.categoryname}} </span>
            <span class="check_label checklabel_subheading write_note" v-html="studyplanavailable.note_content"></span>
          </label>
          <span></span>
          <label class="col-sm-4 label_tblestudy" v-if="studyplanavailable.chkstatus==1"> 
          <!---
          <img src="../assets/icons/starregular.svg" v-if="studyplanavailable.starstatus==0" @click="saveStar(studyplanavailable.unique_id,1)" class="righticon_image redstar_img with_new_position">
          <img src="../assets/icons/starregular_red.svg" v-if="studyplanavailable.starstatus==1 " @click="saveStar(studyplanavailable.unique_id,0)" class="righticon_image redstar_img with_new_position">
          -->
          
          
            <input class="input_hidden" type="checkbox"  @click="saveCheckbox(studyplanavailable.unique_id,0)" :id="studyplanavailable.id" name="studyplanavailable.categoryname" :value="studyplanavailable.unique_id" value="studyplanavailable.categoryname" checked="">
            <span class="check_label_heading deleted_label">  {{studyplanavailable.categoryname}} </span>
            <span class="check_label checklabel_subheading write_note" v-html="studyplanavailable.note_content"></span>
          </label>
          <div class="col-sm-8 subtopic_open"  @click="subtopicdetail(studyplanavailable.unique_id, catindex)">
          

          <span class="righticon_outer">
            <span class="due_studyplan cursoron" v-if="studyplanavailable.duedate"><span class=""></span><span class="" >{{studyplanavailable.duedate | createDate}}</span></span> 
          <span class="due_studyplan " v-else><span class=""> </span><span class=""></span></span> 
          <!--<img src="../assets/icons/edit.svg" v-if="studyplanavailable.notestatus==true" @click="subtopicdetail(studyplanavailable.unique_id, catindex)"class="righticon_image redstar_img notes"> -->
          <!-- <img src="../assets/icons/edit.svg" v-if="studyplanavailable.notestatus==true " @click="getNotes(studyplanavailable.unique_id)" class="righticon_image redstar_img notes"> -->
         
          <img src="../assets/icons/chevron-circle-right-regular.svg"  class="righticon_image position_changed">
          <!-- <a  :href="'/studyplandetail/' + studyplanavailable.unique_id"><img src="../assets/icons/chevron-circle-right-regular.svg" class="righticon_image"></a>   -->
          </span>  
          </div>   
        </div>
        <div v-if="categories.length==0">No Topic to show...</div>
      </form>
      <div class="clearfix"></div>
        <!-----
         <center> <button @click="dialog = true"  class="btn add_btn" type="button">Add a topic <span class="plus_btnicon"> <img src="../assets/icons/chevron-circle-right-regular.svg" class="plus_img"></span></button></center>
         ------->
      <v-layout justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline head_pop">Add a Topic</span>
            </v-card-title>
            <span  @click="dialog = false" ><span class="cross_popup_icon">x</span></span>
            <v-card-text>
              <v-container >
                <v-layout wrap>
                  <div class="col-md-12 topic_field" >
                    <v-text-field
                    v-model="category"   
                    label="Topic Name"
                    required
                    ></v-text-field>
                  </div>
                  <v-flex>
                  <!--<div class="col-md-12" > 
                  <input type="checkbox"  v-model="checkedacty" class="col-md-1 input_popup">
                  <label for="checkbox" class="col-md-5 label_popin" >Available</label>

                  <input type="checkbox"   v-model="checkedstyplan" class="col-md-1 input_popup">
                  <label for="checkbox" class="col-md-5 label_popin">Study Plan</label> 
                  </div>-->
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <input @click='createStudyPlanTopic' name="Add" type="button" value="Add" class="btn submit_btn" />
              <input @click="dialog = false"  name="Close" type="button" value="Close" class="btn submit_btn" />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      </div>
      <div class="col-sm-6 rightpanel_sticky" v-if="showRightarea==true" v-for="subname in topicname">
      <div class="col-sm-6 subtopic_part">
        <div  v-if="showSubtopics==activeTopic">
        <form class="right_side_form">
            <div>
            <p class="right_side_heading" v-if="subname.starstatus==0"> <span class="plus_btnicon" @click="subtopicdetail(subname.unique_id, catindex)"> <img src="../assets/icons/chevron-circle-left-solid.svg" class="plus_img"> </span>{{subname.categoryname}} <img src="../assets/icons/starregular.svg" @click="st_saveStar(subname.unique_id,1)" class="righticon_image redstar_img"> </p>
            <p class="right_side_heading" v-if="subname.starstatus==1"> <span class="plus_btnicon" @click="subtopicdetail(subname.unique_id, catindex)"> <img src="../assets/icons/chevron-circle-left-solid.svg" class="plus_img"> </span>{{subname.categoryname}} <img src="../assets/icons/starregular_red.svg" @click="st_saveStar(subname.unique_id,0)" class="righticon_image redstar_img"> </p>
            <div class="form_inner_section_one">
              <span v-if="subname.subtopics.length > 0" v-for="subnameavailable in subname.subtopics">
                <label class="right_side_form_text" v-if="subnameavailable.chkbox_status==0 || subnameavailable.chkbox_status==null"> <input type="checkbox"  @click="savesubtopicCheckbox(subname.unique_id,subnameavailable.unique_id,1)" :id="subnameavailable.id" name="subnameavailable.tagname" :value="subnameavailable._id" value="subnameavailable.tagname"> <p> {{subnameavailable.tagname}}</p> </label>
                <label class="right_side_form_text" v-if="subnameavailable.chkbox_status==1"> <input type="checkbox"  @click="savesubtopicCheckbox(subname.unique_id,subnameavailable.unique_id,0)" :id="subnameavailable.id" name="subnameavailable.tagname" :value="subnameavailable._id" value="subnameavailable.tagname" checked=""> <p class="deleted_label"> {{subnameavailable.tagname}}</p> </label>
              </span>
            </div>
              <span v-if="subname.subtopics.length == []">
                <span class="right_side_form_text"><input type="hidden" name="hide"><p>No Sub-Topics added.</p> </span>
              </span>
              <div class="form_subtopic">
            <span class="right_side_form_text" @click="subdialog=true">  <span class="plus_image"> <img src="../assets/icons/pluscirclsolid.png" class="plus_img"> </span> <p> Add a Sub-topic </p> </span>
            </div>
            </div>
             
  

        </form>
      </div>
      </div> 
     

 <!---------------------------------->

<div class="col-sm-6 section_two ">
          
            <div class="form-inner-section_two">
              <div class="form_add_button">
        <button @click="dialog=true" class="add_button"> <img src="../assets/icons/pluscirclsolid.png" class="plus_img"> Add a Topic </button>
      </div>
              <span class="right_side_form_text" @click="noteAction(subname.unique_id)">  <span class="plus_btnicon"> <img src="../assets/icons/edit.svg" class="plus_img"> </span> <p> Add a note </p>
                  <!-- <span class="write_note"> <span>{{indexdata.note_content}}</span></span> -->
              </span>
              <span class="right_side_form_text" @click="dueDateAction(subname.unique_id)">  <span class="plus_btnicon"> <img src="../assets/icons/calendar-star-light.svg" class="plus_img"> </span> <p> Add a Due Date  </p> 
                  <span class="due_date_right"> <span>{{indexdata.duedate | createDate}}</span></span>
              </span>
              <span class="right_side_form_text" @click="remindmeAction(subname.unique_id)">  <span class="plus_btnicon"> <img src="../assets/icons/bell-light.svg" class="plus_img"> </span> <p> Add a Remind me </p> 
              <span class="remind_date_right"v-if="indexdata.remindmesdate!=''"> <span>{{indexdata.remindmesdate | createDate}} {{remindmeTime}} </span></span>
              </span>
            </div>
             </div>
             </div>
             
                <!---------------------------------->

      <v-layout justify-center>
        <v-dialog v-model="subdialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Add a Subtopic</span>
            </v-card-title>
            <span  @click="subdialog = false" class="cross_popup_icon"> x</span>
            <v-card-text>
              <v-container >
                <v-layout wrap>
                  <v-flex >
                    <v-text-field
                    v-model="tag" 
                    label="Subtopic Name"
                    required
                  ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <input @click='createSubStudyPlanTopic' name="Add" type="button" value="Add" class="btn submit_btn" />
              <input @click="subdialog = false"  name="Close" type="button" value="Close" class="btn submit_btn" />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
 <!--*************************************************************************************************************************** -->
      <v-dialog v-model="addDuedate" width="600" >
        <v-card>
          <v-card-title class="headline grey lighten-2"  primary-title >
            Select date and time <span class="crosspopup cp_scheduler" @click="addDuedate=false">x</span>
          </v-card-title>
          <v-card-text>
            <div class="schedulercontainer">
              <v-date-picker v-model="datepicker" @change="updateddatentime"></v-date-picker>
                <div class="scheduler_com">
                  <v-text-field  v-model="scheduledate"></v-text-field>
                </div>
                <div class="scheduler_com2">
                  <v-select :items="hours" v-model="scheduletimehrs"></v-select>
                  <v-select :items="minutes" v-model="scheduletimemins"></v-select>
                  <v-select :items="ampm" v-model="scheduletimeapm" ></v-select>
                </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <input @click='set_scheduler' name="Set" type="submit" class="submit_btn set_scheduler" />
          </v-card-actions>
        </v-card>
      </v-dialog>
    <!--*************************************************************************************************************************** -->
      <v-dialog v-model="addRemindme" width="600" >
        <v-card>
          <v-card-title class="headline grey lighten-2"  primary-title >
            Add Reminder <span class="crosspopup cp_scheduler" @click="addRemindme=false">x</span>
          </v-card-title>
          <v-card-text>
            <!-- <v-text-field v-model="r_title" label="Title" required ></v-text-field> -->
            <!-- <v-text-field v-model="r_note" label="Note" required ></v-text-field> -->
            <div class="schedulercontainer">
              <v-date-picker v-model="r_datepicker" @change="updatedReminddatentime" ></v-date-picker>
              <div class="scheduler_com">
                <v-text-field  v-model="r_scheduledate"></v-text-field>
              </div>
              <div class="scheduler_com2">
                <v-select :items="hours" v-model="r_scheduletimehrs"></v-select>
                <v-select :items="minutes" v-model="r_scheduletimemins"></v-select>
                <v-select :items="ampm" v-model="r_scheduletimeapm" ></v-select>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <input @click='setRemind_scheduler(indexdata.remindmeid,catindex)' name="Set" type="submit" class="submit_btn set_scheduler" />
          </v-card-actions>
      </v-card>
    </v-dialog>
  <!--*************************************************************************************************************************** -->
    <v-layout justify-center>
        <v-dialog v-model="noteDialog" width="700">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Add a Note <span class="crosspopup cp_scheduler" @click = "noteDialog = false" >x</span>
            </v-card-title>
            <v-card-text>
              <div class="post_context">
                <input type="hidden" name="noteid" :value="catindex">
                <textarea class="post_input" v-model="note" placeholder="Write a note here" :autofocus="'autofocus'"></textarea>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <input @click='createNote(indexdata.note_id,catindex)' name="Add" type="button" value="Add" class="btn submit_btn" />
                <input @click="noteDialog = false"  name="Close" type="button" value="Close" class="btn submit_btn" />
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-dialog>
    </v-layout>
  <!--*************************************************************************************************************************** -->
    <div class="right_side">
      <form>
        <div class="clearfix"></div>
        <p class="title_heading">
        <!-- <span class="left_icon" v-for="name in topicname"><a href="/studyplan"><img src="../assets/icons/chevron-circle-left-solid.svg" class="lefticon_image"></a>{{name.categoryname}}</span> -->
        <span click class="star_outer"><img src="../assets/icons/starregular.svg" class="star_image"></span></p>
        <div  class="checkbox_line col-md-12" v-for="studyplanavailable in categories">
          <label class=""><input type="checkbox" :id="studyplanavailable.id" name="studyplanavailable.tagname" :value="studyplanavailable._id" value="studyplanavailable.tagname"><span class="check_label">  {{studyplanavailable.tagname}} </span></label>
        </div>
      </form>
    </div>
<!----------------------------------->
  </div>
</template>

<script>
var username=localStorage.username;
import axios from 'axios';
import moment from 'moment';
  export default {
   data() {
    return {
      currentuser: [],
      errors: [],
      categories:[],
      activeTopic:null,
      yourValue:null,
      scheduledatetime:null,
      r_scheduledatetime:null,
      showRightarea: false,
      dialog: false,
      detailDilog:false,
      subdialog: false,
      category:"",
      checkedstyplan:true,
      newaddedtopic:[],
      tag:"",
      note:"",
      search_topic:null,
      r_note:null,
      r_title:null,
      indexdata:null,
      catindex:null,
      topicname:[],
      allNotes:[],
      showNotes:null,
      showSubtopics:null,
      noteDialog: false,
      addRemindme: false,
      addDuedate:false,
      scheduledate:moment().format('YYYY-MM-DD'),
      scheduletimehrs:moment().format('hh'),
      scheduletimemins:moment().format('mm'),
      scheduletimeapm:moment().format('A'),
      datepicker:null,
      remindmeTime:moment().format('YYYY-MM-DD hh:mm A'),
      r_scheduledate:moment().format('YYYY-MM-DD'),
      r_scheduletimehrs:moment().format('hh'),
      r_scheduletimemins:moment().format('mm'),
      r_scheduletimeapm:moment().format('A'),
      r_datepicker:null,
      hours:['01','02','03','04','05','06','07','08','09','10','11','12'],
      minutes:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
      ampm:['AM','PM'],
    }
  },
// computed: {
//    sortedItems: function() {
//      var arr1 = this.categories;
// var arr2 = this.newaddedtopic;
// var primes = arr1.concat(arr2);

// var finallist=primes.sort(function(a, b){
//     var nameA=a.categoryname.toLowerCase(), nameB=b.categoryname.toLowerCase()
//     if (nameA < nameB) //sort string ascending
//         return -1 
//     if (nameA > nameB)
//         return 1
//     return 0 //default return value (no sorting)
// })
     
//     return finallist;
      
        
      
//    }
// },
  methods: 
  {
    subtopicdetail(topic_id,index)
    {
      console.log('ci-',index)
      this.catindex=index;
      if(this.showSubtopics!= topic_id)
      {
        this.showRightarea=true
        this.activeTopic=topic_id;
      
        this.getTagstudyplan(topic_id);
        this.indexdata=this.categories[index]
        console.log(this.indexdata)
        this.remindmeTime=moment(this.indexdata.remindmesdate).format('hh:mm A')
        this.showSubtopics=topic_id;
      }
      else
      {
        this.showRightarea=false
        this.showSubtopics=null;
        this.topicname=null;
      }
    },
    noteAction(topic_id)
    {
      console.log(topic_id)
      console.log(this.indexdata.note_content)
      this.note=this.indexdata.note_content;
      this.noteDialog=true;
    },
    dueDateAction(topic_id)
    {
      console.log(topic_id)
      this.addDuedate=true;
      // if(this.indexdata.duedate!='')
      // {
      //   this.scheduledate=moment(this.indexdata.duedate).format("YYYY-MM-DD");
      //   this.scheduletimehrs=moment(this.indexdata.duedate).format('hh')
      //   this.scheduletimemins=moment(this.indexdata.duedate).format('mm')
      //   this.scheduletimeapm=moment(this.indexdata.duedate).format('A')
      //   this.datepicker=moment(this.indexdata.duedate).format("YYYY-MM-DD")
      // }
      // else
      // {
      //   this.scheduledate=moment().format("YYYY-MM-DD");
      //   this.scheduletimehrs=moment().format('hh')
      //   this.scheduletimemins=moment().format('mm')
      //   this.scheduletimeapm=moment().format('A')
      //   this.datepicker=null
      // }
    },
    remindmeAction(topic_id)
    {
      this.addRemindme=true;
      this.r_note=this.indexdata.remindmeNote;
      this.r_title=this.indexdata.remindmeTitle;
      if(this.indexdata.remindmeid!='')
      {
        this.r_scheduledate=moment(this.indexdata.remindmesdate).format("YYYY-MM-DD");
        this.r_scheduletimehrs=moment(this.indexdata.remindmesdate).format('hh')
        this.r_scheduletimemins=moment(this.indexdata.remindmesdate).format('mm')
        this.r_scheduletimeapm=moment(this.indexdata.remindmesdate).format('A')
        this.r_datepicker=moment(this.indexdata.remindmesdate).format("YYYY-MM-DD")
        this.remindmeTime=moment(this.indexdata.remindmesdate).format('hh:mm A')
      }
      else
      {
        this.r_scheduledate=moment().format("YYYY-MM-DD");
        this.r_scheduletimehrs=moment().format('hh')
        this.r_scheduletimemins=moment().format('mm')
        this.r_scheduletimeapm=moment().format('A')
        this.r_datepicker=null
      }
    },
    getAllTopics()
    {
      axios.post(`/getallcategorystudyplan`,{'createdby':this.currentuser.unique_id})
      .then(response => {
        this.categories = response.data
        console.log("done category");
        this.indexdata=this.categories[this.catindex];
        this.remindmeTime=moment(this.indexdata.remindmesdate).format('hh:mm A')
        this.indexdata['remindmeTime']=push(this.remindmeTime)
      })
      .catch(e => {
        this.errors.push(e)
      })
      
    },
    getTagstudyplan(topic_id)
    {
        axios.post(`/getalltopicnamestudyplan`,{'id':topic_id, "createdby":this.currentuser.unique_id})
        .then(response => {
          this.topicname = response.data
          console.log(this.topicname);
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    createStudyPlanTopic()
    {
        axios.post('/createstudyplantopic',{category:this.category,createdby:this.currentuser.unique_id,studypln:this.checkedstyplan})
        .then(response => 
        {
          if(response){
            this.dialog=false;
            this.getAllTopics()
          }
        })
        .catch(e => {this.errors.push(e)})
    },
    st_saveStar(topic_id,status)
    {
      if(this.showSubtopics==topic_id)
      {
          console.log(this.currentuser.unique_id)
          console.log(topic_id)
          console.log(status)
          axios.post(`/saveTopic_star`,{'topic_id':topic_id,'s_status':status,'createdby':this.currentuser.unique_id})
          .then(response => {
            console.log(response.data);
            this.activeTopic=topic_id;
            this.getTagstudyplan(topic_id);
            this.getAllTopics();
          })
          .catch(e => {
            this.errors.push(e)
          })
          this.showSubtopics=topic_id
      }
    },
    saveStar(topic_id,status)
    {
          axios.post(`/saveTopic_star`,{'topic_id':topic_id,'s_status':status,'createdby':this.currentuser.unique_id})
          .then(response => 
          {
            if(this.showSubtopics!==topic_id)
            { this.getAllTopics(); }
            else
            {
              this.getAllTopics()
              this.getTagstudyplan(topic_id);
            }
          })
          .catch(e => { this.errors.push(e) })
      },
      saveCheckbox(topic_id,status)
      {
        axios.post(`/saveTopic_chkbox`,{'topic_id':topic_id,'ck_status':status,'createdby':this.currentuser.unique_id})
        .then(response => {
          console.log(response.data);
          if(this.showSubtopics!==topic_id)
          { this.getAllTopics(); }
          else
          {
            this.getAllTopics()
            this.getTagstudyplan(topic_id);
          }
        })
        .catch(e => { this.errors.push(e) })
      },
      searchTopic()
      {
        this.showRightarea=false;
        console.log(this.currentuser.unique_id)
        console.log('st-',this.search_topic)
        if(this.search_topic.trim()!='')
        {
          axios.post(`/getSearchedtopic`,{'searchedtopic':this.search_topic,'createdby':this.currentuser.unique_id})
          .then(response => {
            console.log('sr-',response.data);
            
             this.categories = response.data 
            
          })
          .catch(e => {
            this.errors.push(e)
          })
        }
        else
        {
          this.getAllTopics()
        }
      },
      createSubStudyPlanTopic()
      {
        console.log('tag-',this.tag);
        console.log('activeTopic-',this.activeTopic);
        console.log('unique_id-',this.currentuser.unique_id);
        console.log('checkedstyplan-',this.checkedstyplan);
          axios.post('/createstudyplansubtopic',{tag:this.tag,cat_id:this.activeTopic,createdby:this.currentuser.unique_id,studypln:this.checkedstyplan})
          .then(response => {
            if(response)
            {
              this.subdialog=false;
              this.getAllTopics()
              this.getTagstudyplan(this.activeTopic)
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
          this.tag='';
      },
      createNote(noteid,index)
      {
        console.log(noteid);
        console.log(index);
        this.note = this.note.replace(/(?:\r\n|\r|\n)/g, '<br>');
        console.log('note-',this.note);

        if(noteid==undefined || noteid=='')
        {
            console.log('if')
            axios.post('/createStudyplanNote',{topic_id:this.activeTopic, content:this.note, createdby:this.currentuser.unique_id})
            .then(response => {
              if(response)
              {
                console.log(response.data);
                this.noteDialog=false;
              }
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
        else{
            console.log('else')
            axios.post('/updateNote',{note_id:noteid, content:this.note})
            .then(response => {
              if(response)
              {
                console.log(response.data);
                this.noteDialog=false;
              }
            })
            .catch(e => {
              this.errors.push(e)
            }) 
          }
        this.getAllTopics()
        this.getTagstudyplan(this.activeTopic)
      },
    set_scheduler()
    {
      
        this.scheduledatetime=this.scheduledate+' '+this.scheduletimehrs+':'+this.scheduletimemins+' '+this.scheduletimeapm;
        if(this.scheduledatetime!==null){
          this.scheduledatetime= moment(this.scheduledatetime).unix()*1000
        }else{
           this.scheduledatetime=Date.now();
        }
        console.log(this.activeTopic);
        console.log(this.scheduledatetime);
        console.log(this.currentuser.unique_id);
        axios.post('/createStudyplanDuedate',{topic_id:this.activeTopic, due_date:this.scheduledatetime, createdby:this.currentuser.unique_id})
        .then(response => {
          if(response)
          {
            console.log(response.data);
            this.addDuedate=false;
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
        this.getAllTopics();
        this.getTagstudyplan(this.activeTopic);
    },
    updateddatentime()
    {
        this.scheduledate=this.datepicker;
    },
    setRemind_scheduler(remindmeid, index)
    {
        this.r_scheduledatetime=this.r_scheduledate+' '+this.r_scheduletimehrs+':'+this.r_scheduletimemins+' '+this.r_scheduletimeapm;
        if(this.r_scheduledatetime!==null){
          this.r_scheduledatetime= moment(this.r_scheduledatetime).unix()*1000
        }else{
           this.r_scheduledatetime=Date.now();
        }
        console.log(this.activeTopic);
        console.log(this.r_title);
        console.log(this.r_note);
        console.log(this.r_scheduledatetime);
        console.log(this.currentuser.unique_id);
        // console.log(remindmeid);
        if(remindmeid==undefined || remindmeid=='')
        {
          axios.post('/createRemindme', { topic_id:this.activeTopic, title:this.r_title, notes:this.r_note, remindme_sdate:this.r_scheduledatetime, remindme_edate:this.r_scheduledatetime, createdby:this.currentuser.unique_id})
          .then(response => {
            if(response)
            {
              console.log('added');
              this.addRemindme=false;
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
        }
        else
        {
          axios.post('/updateRemindme',{remindme_id:remindmeid, title:this.r_title, notes:this.r_note, remindme_sdate:this.r_scheduledatetime, remindme_edate:this.r_scheduledatetime})
          .then(response => {
            if(response)
            {
              console.log('updated');
              this.addRemindme=false;
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
        }
        this.getAllTopics();
        this.getTagstudyplan(this.activeTopic);
    },
    updatedReminddatentime()
    {
        this.r_scheduledate=this.r_datepicker;
    },
    savesubtopicCheckbox(topic_id,subtopic_id,status)
    {
      console.log(this.currentuser.unique_id)
      console.log(topic_id)
      console.log(subtopic_id)
      console.log(status)
      axios.post(`/savesubTopic_chkbox`,{'topic_id':topic_id, 'subtopic_id':subtopic_id, 'stChk_status':status, 'createdby':this.currentuser.unique_id})
      .then(response => {
        console.log(response.data);
        this.activeTopic=topic_id;
        this.getTagstudyplan(topic_id)
      })
      .catch(e => {
        this.errors.push(e)
      })
      this.showSubtopics=topic_id
    }
},

  created() 
  {
      axios.post(`/getcurrentuser`,{'username':username})
      .then(response => {
        // JSON responses are automatically parsed.
        this.currentuser = response.data
        console.log(this.currentuser.unique_id);
      axios.post(`/getmergestudyplantopic`,{'createdby':this.currentuser.unique_id})
      .then(response => {
        // JSON responses are automatically parsed.
        this.newaddedtopic = response.data
        console.log(newaddedtopic);
      })
      .catch(e => {
        this.errors.push(e)
      }) ,
      axios.post(`/getallcategorystudyplan`,{'createdby':this.currentuser.unique_id})
      .then(response => {
        // JSON responses are automatically parsed.
        this.categories = response.data
        console.log(response.data);
      })
      .catch(e => {
        this.errors.push(e)
      }), 
      axios.post(`/setstudyplanview`,{'userid':this.currentuser.unique_id})
      .then(studyplanresponse => {
        console.log(studyplanresponse);
      })
      .catch(e => {
        this.errors.push(e)
      })
       })
      .catch(e => {
        this.errors.push(e)
      })



  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
.card__text {padding: 0 14px 0 16px !important;}
.dialog--persistent .card__title{background: #e0e0e0 !important;padding: 0!important;}
.dialog--persistent .head_pop {font-size: 14px!important;}
.input-group--required label{padding-left: 10px;font-size: 13px;}
.dialog.dialog--active .card__actions {padding-top: 0px; border-top: 1px solid transparent;padding-bottom: 0px; }
.card__actions .submit_btn {height: 27px;padding: 0;}
.cross_popup_icon { font-size: 16px;font-weight: 900; margin-top: -30px;cursor: pointer;}
.theme--light .input-group:not(.input-group--error) .input-group__details:before {background-color: transparent;}
.dialog--active .card {padding: 0 0 20px 0 !important;}
</style>