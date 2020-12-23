<template>
  <div class="main_wrappe study_plann study_dtls">
    <div class=" col-md-12 secondry_headerstudy">
      <div class="sub_topicsection">
          <ul class="sub_topic_icons">
            <li @click="addRemindme=true"><img src="../assets/icons/bell-light.svg">Remind me</li>
            <li @click="addDuedate=true"><img src="../assets/icons/head-side-brain-light.svg">Add due date</li>
            <li><img src="../assets/icons/tasks.svg">Repeat</li>
            <li @click="noteDialog = true"><img src="../assets/icons/bell-light.svg">Add a note</li>
          </ul>
      </div><!----sub_topic_icons---->
      <!--*************************************************************************************************************************** -->
      <v-layout justify-center>
        <v-dialog v-model="noteDialog" width="700">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              ADD A NOTE <span class="crosspopup cp_scheduler" @click = "noteDialog = false" >x</span>
            </v-card-title>
            <v-card-text>
              <div class="post_context">
                <!-- <input type="hidden" name="noted" :value="postdata"> -->
                <textarea class="post_input" v-model="note" placeholder="Write a note here" :autofocus="'autofocus'"></textarea>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <input @click='createNote' name="Add" type="button" value="Add" class="btn submit_btn" />
                <input @click="noteDialog = false"  name="Close" type="button" value="Close" class="btn submit_btn" />
              </v-card-actions>
            </v-card-text>
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
              <v-date-picker v-model="datepicker" @change="updateddatentime" ></v-date-picker>
                <div class="scheduler_com">
                  <v-text-field  v-model="scheduledate" value="scheduledate"></v-text-field>
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
            Select date and time <span class="crosspopup cp_scheduler" @click="addRemindme=false">x</span>
          </v-card-title>
          <v-card-text>
            <div class="schedulercontainer">
              <v-date-picker v-model="reminddatepicker" @change="updatedReminddatentime" ></v-date-picker>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <input @click='setRemind_scheduler' name="Set" type="submit" class="submit_btn set_scheduler" />
          </v-card-actions>
      </v-card>
    </v-dialog>
      <!--*************************************************************************************************************************** -->
    </div><!----secondry_headerstudy---->
    <div class="col-md-6 col-md-offset-3 secnd_section" v-for="name in topicname">
      <form >
        <div class="clearfix"></div>
        <p class="title_heading col-md-12" >
          <span class="left_icon  col-md-6" ><a href="/studyplan"><img src="../assets/icons/chevron-circle-left-solid.svg" class="lefticon_image"></a>
          {{name.categoryname}}</span>
          <span  class="col-md-6 star_outer" ><img src="../assets/icons/starregular.svg" v-if="name.starstatus==0" @click="saveStar(name.unique_id,1)" class="star_image"></span>
          <span  class="col-md-6 star_outer" ><img src="../assets/icons/starregular_red.svg" v-if="name.starstatus==1" @click="saveStar(name.unique_id,0)" class="star_image"></span>
       </p>
        <div  class="checkbox_line col-md-12" v-for="studyplanavailable in name.subtopics">
          <label class="col-md-8"><input type="checkbox" @click="savesubtopicCheckbox(name.unique_id,studyplanavailable.unique_id,1)" :id="studyplanavailable.id" name="studyplanavailable.tagname" :value="studyplanavailable._id" value="studyplanavailable.tagname"><span class="check_label">  {{studyplanavailable.tagname}} </span></label>  
        </div>
      </form>
      <div class="clearfix"></div>
    </div><!--secnd_section-->
    <div class="clearfix"></div>
    <center> <button @click="dialog = true"  class="btn add_btn" type="button">Add a sub-topic <span class="plus_btnicon"> <img src="../assets/icons/chevron-circle-right-regular.svg" class="plus_img"></span></button></center>
    <v-layout justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">ADD A SUBTOPIC</span>
          </v-card-title>
          <span  @click="dialog = false" ><img src="../assets/icons/cross_popup.svg" class="cross_popup_icon"></span>
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
            <input @click="dialog = false"  name="Close" type="button" value="Close" class="btn submit_btn" />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div><!----container--->
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
      tags:[],
      checkedstyplan:true,
      dialog: false,
      noteDialog: false,
      addRemindme: false,
      topicname:[],
      newaddedtopic:[],
      tag:"",
      note:"",
      addDuedate:false,
      scheduledate:moment().format('YYYY-MM-DD'),
      remindscheduledate:moment().format('YYYY-MM-DD'),
      scheduletime:null,
      scheduletimehrs:moment().format('hh'),
      scheduletimemins:moment().format('mm'),
      scheduletimeapm:moment().format('A'),
      datepicker:null,
      reminddatepicker:null,
      hours:['01','02','03','04','05','06','07','08','09','10','11','12'],
      minutes:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
      ampm:['AM','PM'],
    }
  },
  methods: {
    getTagstudyplan()
    {
      axios.post(`/getalltopicnamestudyplan`,{'id':this.$route.params.id, "createdby":this.currentuser.unique_id})
      .then(response => {
        this.topicname = response.data
        console.log(response.data);
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    createSubStudyPlanTopic()
    {
        axios.post('/createstudyplansubtopic',{tag:this.tag,cat_id:this.$route.params.id,createdby:this.currentuser.unique_id,studypln:this.checkedstyplan})
        .then(response => {
          if(response)
          {
            this.dialog=false;
            this.getTagstudyplan()
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    createNote()
    {
        console.log(this.currentuser.unique_id);
        console.log(this.$route.params.id);
        console.log(this.note);
        axios.post('/createStudyplanNote',{topic_id:this.$route.params.id, content:this.note, createdby:this.currentuser.unique_id})
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
    },
    set_scheduler()
    {
        this.scheduledatetime=this.scheduledate+' '+this.scheduletimehrs+':'+this.scheduletimemins+' '+this.scheduletimeapm;
        if(this.scheduledatetime!==null){
          this.scheduledatetime= moment(this.scheduledatetime).unix()*1000
        }else{
           this.scheduledatetime=Date.now();
        }
        console.log(this.$route.params.id);
        console.log(this.scheduledatetime);
        console.log(this.currentuser.unique_id);
        axios.post('/createStudyplanDuedate',{topic_id:this.$route.params.id, due_date:this.scheduledatetime, createdby:this.currentuser.unique_id})
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
         this.addDuedate=false;
    },
    updateddatentime()
    {
        this.scheduledate=this.datepicker;
    },
    setRemind_scheduler()
    {
        this.scheduledatetime=this.remindscheduledate;
        if(this.scheduledatetime!==null){
          this.scheduledatetime= moment(this.scheduledatetime).unix()*1000
        }else{
           this.scheduledatetime=Date.now();
        }
        console.log(this.$route.params.id);
        console.log(this.scheduledatetime);
        console.log(this.currentuser.unique_id);
        axios.post('/createRemindme',{topic_id:this.$route.params.id, remind_date:this.scheduledatetime, createdby:this.currentuser.unique_id})
        .then(response => {
          if(response)
          {
            console.log(response.data);
            this.addRemindme=false;
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
         // this.addRemindme=false;
    },
    updatedReminddatentime()
    {
        this.remindscheduledate=this.reminddatepicker;
    },
    saveStar(topic_id,status)
    {
        console.log(this.currentuser.unique_id)
        console.log(topic_id)
        console.log(status)
        axios.post(`/saveTopic_star`,{'topic_id':topic_id,'s_status':status,'createdby':this.currentuser.unique_id})
        .then(response => {
          console.log(response.data);
          this.getTagstudyplan()
        })
        .catch(e => {
          this.errors.push(e)
        })
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
          this.getTagstudyplan()
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    },
// computed: {
// 		sortedItems: function() {
// 			var arr1 = this.tags;
// var arr2 = this.newaddedtopic;
// var primes = arr1.concat(arr2);
// var finallist=primes.sort(function(a, b){
//     var nameA=a.tagname.toLowerCase(), nameB=b.tagname.toLowerCase()
//     if (nameA < nameB) //sort string ascending
//         return -1 
//     if (nameA > nameB)
//         return 1
//     return 0 //default return value (no sorting)
// })
//     return finallist;
// 		}
// },
 created() {
   axios.post(`/getcurrentuser`,{'username':username})
      .then(response => 
      {
        this.currentuser = response.data
        // axios.post(`/getmergestudyplansubtopic`,{'createdby':this.currentuser.unique_id})
        // .then(response => {
        //   // JSON responses are automatically parsed.
        //   this.newaddedtopic = response.data
        // })
        // .catch(e => {
        //   this.errors.push(e)
        // }),
        axios.post(`/getalltagstudyplan`,{'cat_id':this.$route.params.id,"createdby":this.currentuser.unique_id})
        .then(response => {
          // JSON responses are automatically parsed.
          this.tags = response.data
          console.log(response.data);
        })
        .catch(e => {
          this.errors.push(e)
        }),
        axios.post(`/getalltopicnamestudyplan`,{'id':this.$route.params.id, 'createdby':this.currentuser.unique_id})
        .then(response => {
          // JSON responses are automatically parsed.
          this.topicname = response.data
          console.log(this.topicname);
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
.container.fluid{ padding:0 !important;}
</style>