<template>
  <v-container>    
    <div class="col-md-6 col-md-offset-3">
    <div class="row">
      <div class="col-md-12">
       <p class="center_heading plls_heading"> <img src="../assets/images/head_img.png" class="add_poll_img"> Add a Poll</p>
      </div> 
      </div>
     <!--  <div class="sliderfileinput" v-if="image!=''">
          <img :src="fileurl+image" class="q_hero_image img-responsive"/>
      </div>  -->

      <div class="aquestion" v-if="image!=''">
        <div class="overlay_hover_image">
          <div class="overlay-image">
            <div class="trashes_icon">
              <span class="trash_icon" @click="removepollimage()"><img src="../assets/icons/trash-img.svg"></span>
            </div>
          </div>
          <img :src="fileurl+image" class="q_hero_image img-responsive"/>
        </div>
      </div>

      <div class="aquestion">
        
          <tinymce v-bind:id="`question_text`" v-model="question_text" v-bind:key="`question_text`" placeholder="Ask a question" :other_options="spelloptions"></tinymce><br>
      </div>
      <div class="aquestion" v-if="instruction_flag==true">
        <label>Instructions </label>
        <tinymce v-bind:id="`instruction_text`" v-model="instruction_text" v-bind:key="`instruction_text`" placeholder="Write instruction here..." :other_options="spelloptions"></tinymce><br>
      </div> 
      <div class="choices_fields col-md-12 poll_choices_section"> 
          <div v-for="(optiondata,dataindex) in options">
            <div class="input_hover">
              <textarea type="text" :placeholder="`Choice ${dataindex+1}`" v-model="optiondata.option_text" class="option_choice" required=""></textarea>
              <span @click="removeoption(dataindex)"><i class="fa fa-times" aria-hidden="true"></i></span>
            </div><br>
          </div>
      </div> 
      
      
      <ul class="choice_ul poll_choice">
        <li @click="addChoice()"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Choice</li>
        <li @click="addInstruction()"><span class="right_icon add_inst_main_right_icon"><img src="../assets/icons/align-left.svg" class="ins_icon add_inst_main" /></span>Add Instructions</li>
        <li ><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Image <input type="file" accept="image/x-png,image/jpg,image/jpeg" ref="file" @change="attachsliderfile()"></li>
      </ul>
        <span v-if="errors.length > 0" class="imgerr"><span style="color:red;" v-if="errors[0].name=='image'"> Error! {{ errors[0].err }}</span></span>
      
      <div class="poll_details">
        <label class="poll_publish_details"> <span class="polll">Poll ends on</span> <input class="published_date" type="date" v-model="pollendDate"> </label>
        
        <label class="poll_publish_details"> <span class="polll">Publish Date</span> <input class="published_date" type="date" v-model="PublishDate"> </label>

        <!-- <label class="poll_publish_details some_margin"> <span class="polll">Publish on  </span> <input class="published_date with_time" type="date-local" id="meeting-time"
         name="meeting-time" v-model="PublishDate"> <div class="icon_part" @click="addscheduler=true"><i class="fa fa-calendar"> </i> <i class="fa fa-clock"> </i> </div> </label> -->
      </div>

      <!-- <div class="poll_details">
        <label class="poll_publish_details"> <span class="polll"> Publish on </span> 
          <kendo-datetimepicker :date-input="true" :format="'yyyy/MMMM/dd hh:mm tt'" v-model="PublishDate" style="width: 250px"></kendo-datetimepicker> </label>

        <label class="poll_publish_details some_margin"> <span class="polll">Poll ends on </span> 
          <kendo-datepicker :format="'yyyy/MMMM/dd'" v-model="pollendDate"></kendo-datepicker> </label>
      </div> -->
      
      <div class="col-md-12">
        <p class="aquestion"></p>      
      </div>   
      <div class="clearfix"></div>
      <hr>
      <div class="col-md-12">
        <!-- <v-chip class="small_chips" v-for="(posttag, tagindex) in posttags" v-bind:key="`tag${tagindex}`" v-if="posttag.tagname!=null && sel_tags.indexOf(posttag.unique_id) >= 0" close @input="removeselectedtag(posttag.unique_id ,tagindex,1)">{{posttag.tagname}}</v-chip> -->
        <div class="col-md-12">
            <!-- <div class="col-md-7 schedule_main"> 
              <span class="add_qschedule_p cursoron" @click="addscheduler=true"><img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon1"/> </span>
            </div> -->
            <button class="save_fields btn new_save_btn" @click="savepoll">Publish</button>
        </div>   
      </div> 
    </div>
    <!-- ******************************************************************************************************************** -->
    <v-dialog v-model="addscheduler" width="600" >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
            Select date and time <span class="crosspopup cp_scheduler" @click="addscheduler=false">x</span>
        </v-card-title>
        <v-card-text>
          <div class="schedulercontainer">
           <v-date-picker v-model="datepicker" @change="updateddatentime" ></v-date-picker>
           <div class="scheduler_com">
             <v-text-field v-model="PublishDate" value="PublishDate"></v-text-field>
           </div>
            <div class="scheduler_com2">
              <v-select :items="hours" v-model="scheduletimehrs" ></v-select>
              <v-select :items="minutes" v-model="scheduletimemins" ></v-select>
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
    <!-- ******************************************************************************************************************** -->
    <!-- <v-dialog v-model="addtags" width="500" >
      <v-card>
        <v-card-title class="headline grey lighten-2 sticky_grey" primary-title >
          <span class="crosspopup" @click="addtags=false">x</span>
        </v-card-title>
        <v-card-text class="sticky_search">
          <i class="fa fa-search"></i><input type="text" v-model="tag_search" @keyup="searchtopic" placeholder="Search"/>
        </v-card-text>
        <v-chip v-for="(posttag, tagindex) in posttags" v-bind:key="`tag${tagindex}`" v-if="posttag.tagname!=null" @click="activatetag(posttag.unique_id)"  v-bind:class="{activetag:sel_tags.indexOf(posttag.unique_id) >= 0}" >{{posttag.tagname}}</v-chip>
        <div class="mainpopup_btn">
          <button class="btn btn_edit" @click="addtags=false">Submit</button>
        </div>
      </v-card>
    </v-dialog> -->
    <!-- ******************************************************************************************************************** -->

  </v-container>
</template>
<script>
import moment from 'moment'
import tinymce from 'vue-tinymce-editor'
var datetime = new Date();
var username=localStorage.username;
import axios from 'axios';
import Vue from 'vue'
// import '@progress/kendo-ui';
// import '@progress/kendo-theme-default/dist/all.css';
// import { DateinputsInstaller } from '@progress/kendo-dateinputs-vue-wrapper';
// Vue.use(DateinputsInstaller);
  export default {
    components: {tinymce},
   data() {
    return {
      polls:[],
      image:"",
      currentuser:'',
      publishdate:null,
      question_text:null,
      options:[],
      errors: [],
      sel_tags:[],
      optionchoice:"checkbox",
      addscheduler:false,
      dateInput:false,
      instruction_flag:false,
      addtags:false,
      tag_search:null,
      posttags:null,
      hours:['01','02','03','04','05','06','07','08','09','10','11','12'],
      minutes:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
      ampm:['AM','PM'],
      scheduledate:moment().format('YYYY-MM-DD'),
      scheduletime:null,
      scheduletimehrs:moment().format('hh'),
      scheduletimemins:moment().format('mm'),
      scheduletimeapm:moment().format('A'),
      datepicker:null,
      dataFilterKey:null,
      activeflag:0,
      uploaded_file:null,
      fileurl:window.publicfileurl,
      optioncounts:0,
      optiondatas:[],
      createdoptions:[],
      selected_tags:[],
      attachement:null,
      instruction_text:null,
      PublishDate: new Date(),
      pollendDate: new Date(),
      spelloptions:{browser_spellcheck: true}
    }
  },
  methods: 
  {
    getallpolls()
    {
      axios.post(`/getallpolls`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.polls = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    async attachsliderfile()
    {
      const file = this.$refs.file.files[0];
      // console.log('newfile-',this.$refs.file.files[0].name)
      if(file.name.toLowerCase().indexOf(".png") >= 0 || file.name.toLowerCase().indexOf(".jpg") >= 0 || file.name.toLowerCase().indexOf(".jpeg") >= 0 )
      {
        if(file!=undefined)
        {
          console.log(file);
          const formData = new FormData();
          formData.append("file", file);
          try{
              const res = await axios.post("/upload", formData);
              console.log('res-',res.data);
              this.image = res.data.file
        console.log('imgs-',this.image);
          } 
          catch(err){ console.log(err); }
        }
        else
        {
          this.image = ''
        }
        this.errors=[];
      }
      else
      {
        const e =" :Select image of .jpg, .png, .jpeg format.";
        console.log('error-',e)
        this.errors.push({'name':'image', 'err':e});
        console.log('error[]-',this.errors)
      }
    },
    savepoll()
    {

        // console.log('pollenddate', new Date(this.pollendDate));
        // console.log('pe date',moment(this.pollendDate).format('YYYY-MM-DD'));
        // console.log('date',moment().format('YYYY-MM-DD'));
        var count=0;
        if(moment(this.pollendDate).format('YYYY-MM-DD')==moment().format('YYYY-MM-DD'))
        {
          this.pollendDate = this.pollendDate.setHours(47,59,59,999);
        }
        else
        {
          this.pollendDate = new Date(this.pollendDate);
          this.pollendDate = this.pollendDate.setHours(23,59,59,999);
        }
        this.PublishDate = moment(this.PublishDate).unix()*1000;

        var finaltags = this.sel_tags.join(",")
        console.log('cu-',this.currentuser);
        console.log('ft-',finaltags)
        console.log('opt-',this.options)
        console.log('img-',this.image)
        console.log('instruction-',this.instruction_text)
        console.log('publish-',this.PublishDate);
        console.log('end-',this.pollendDate);
        // console.log('end date-',moment(this.pollendDate).format('YYYY-MM-DD hh:mm:ss A'))
        this.options.forEach(function(poption,index)
        {
          if (!poption.option_text.replace(/\s/g, '').length) 
          {
            console.log('whitespace');
          }
          else
          {
            count=count+1         
          }
        });
        console.log('count-',count)
        if(this.question_text!=null && this.question_text.replace(/\s/g, '').length)
        {
          var finalcontent = this.question_text.replace(/<[^>]*>/g, '');
          if(this.options.length==count && this.errors.length==0)
          {
            console.log("option is equal to count");
            axios.post(`/savepollquestion`,{"content":finalcontent, "publishDate":this.PublishDate, "endDays":this.pollendDate, "instruction_text":this.instruction_text, "poll_image":this.image,'tags':finaltags, "createdby":this.currentuser, "optiondatas":this.options})
            .then(response => 
            {
              console.log(response.data);
              console.log(response.data._id);
              axios.post('/addpostbyweb',{"pollid":response.data._id,attachement:null,tags:finaltags,postcontent:null,createdby:this.currentuser,scheduledatetime:this.PublishDate})
              .then((postresponse)=>
              {
                axios.post('/setpollpublishnotification',{"weburl":'',"appurl":'',"targetid":response.data._id,"q_type":null,"title":finalcontent,"pollid":response.data._id,postid:postresponse.data.unique_id,createdby:this.currentuser})
                .then((notiresponse)=>{
                    location.href = "/"
                    console.log(notiresponse);
                })
                .catch((error)=>{
                    console.log(error);
                })
                console.log(postresponse.data)
              })
              .catch((error)=>{
                console.log(error);
              }) 
            })
            .catch(e => {
              console.log(e);
              this.errors.push(e)
            })
          }
          else
          {
            console.log('enter options')
          }
          
        }
        else{
            console.log('enter question')
          }
        
    },
    addChoice()
    {
      var optionorder=this.options.length+1;
      var tempopt={'option_text':''}
      this.options.push(tempopt);
    },
    removeoption(qindex)
    {
      console.log(qindex)
      this.options.splice(qindex, 1)
      this.optioncounts--;
    },
    set_scheduler()
    {
         this.pollendDays=this.scheduledate+' '+this.scheduletimehrs+':'+this.scheduletimemins+' '+this.scheduletimeapm;
         if(this.pollendDays!==null )
         {
          console.log("if")
          this.pollendDays= moment(this.pollendDays).unix()*1000
         }
         else
         {
          console.log("else")
           this.pollendDays=d1;
         }
         console.log('pd-',this.pollendDays)
         this.addscheduler=false

    },
    updateddatentime(){
        this.scheduledate=this.datepicker;
    },
    searchtopic()
    {
      axios.post(`/gettags`,{'searchedtag':this.tag_search})
      .then(response => {
        console.log(response)
        this.posttags = response.data
      });  
    },
    // activatetag(id)
    // {
    //   if(this.sel_tags.indexOf(id) >= 0)
    //   { this.sel_tags.splice(this.sel_tags.indexOf(id), 1)  }
    //   else{ this.sel_tags.push(id) }
    // },
    // removeselectedtag(id,index,type)
    // {
    //   if(type==1)
    //   {
    //     this.sel_tags.splice(this.sel_tags.indexOf(id),1)
    //   }
    // },
    checkboxOptions()
    {
         var i=0;
        for(i = 1; i <= 2; i++)
        {
          var tempopt={'option_text':''}
          this.options.push(tempopt);
        }
    },
    addInstruction()
    {
      if(this.instruction_flag==true)
        { this.instruction_flag=false}
      else{ this.instruction_flag=true}
    },
    removepollimage(qindex)
    {
      this.image=''
    },
  },
  created() 
  {
      axios.post(`/getcurrentuser`,{'username':username})
      .then(response => {
        this.currentuser = response.data.unique_id
        console.log(this.currentuser)
     
        // axios.post(`/getallpolls`,{'loginid': this.currentuser})
        // .then(response => {
        //   console.log(response.data)
        //   this.polls = response.data
        // })
        // .catch(e => {
        //   this.errors.push(e)
        // })
      }),
      axios.post(`/gettags`,{'searchedtag':this.tag_search})
      .then(response => {
        this.posttags = response.data
      }),
      this.checkboxOptions();
  },
}
</script>


