<template>
  <v-container>
    <div class="createquestion">
      <div class="col-md-7 col-md-offset-3">
      <p class="left_heading col-md-12"><img src="../assets/icons/question-square-solid_green.svg" class="ques_icon" />Add a question</p>
      <div >
        <div class="question_fields col-md-12">
          <label>Question Text </label>
          <tinymce v-bind:id="`question_text`" v-model="question_text" v-bind:key="`question_text`" :other_options="spelloptions"></tinymce>
        </div>
        <div class="question_fields col-md-12" v-if="uploaded_file">
          <img :src="fileurl+uploaded_file" class="q_hero_image img-responsive"/>
        </div>
        <div class="choices_fields col-md-12"> 
          <div v-for="(optiondata,dataindex) in options">
            <div class="input_hover">
              <input :type="optionchoice" name="Choice1" value="true" class="choice_input">
              <textarea type="text" :placeholder="`Choice ${dataindex+1}`" v-model="optiondata.option_text" class="option_choice" ></textarea>
              <span @click="removeoption(dataindex)"><i class="fa fa-times" aria-hidden="true"></i></span>
            </div><br>
          </div>
          <ul class="choice_ul poll_choice">
            <li @click="addChoice()"><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Choice</li>
            <!-- <li ><span class="right_icon"><img src="../assets/icons/plus-circle_white.svg" class="ins_icon" /></span>Add Image  -->
              <!-- <input type="file" :ref="`file${}`" :key="`file${}`" :id="`file${}`" @change="attachfiletopost('file'+,)"/> -->
            </li>
            <!-- <li class="check_create_main"><input type="checkbox" v-model="imagevisibility" value="1"> <span class="check_create_label">Default Image Visible</span></li> -->
          </ul>
        </div>
        <div class="question_fields qus_btm col-md-12">
          <span><label>Poll End in</label></span> 
            <span class="add_qschedule_p cursoron" @click="addscheduler=true"> <img src="../assets/icons/alarm-clock.svg" class="fa_svg_icon1"/> </span>
          <v-divider class="questiondivider"></v-divider>
        </div>
      </div>
      <div class="col-md-12"></div><!---choices_fields--->
      <div class="col-md-12">
        <!-- <button class="save_fields btn" @click="publishquestion">Publish</button> -->
        <button class="save_fields btn" @click="savequestion">Publish</button>
      </div><!----save_fields---->
      </div>
    </div>
    <v-dialog v-model="addscheduler" width="600" >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
            Select date and time <span class="crosspopup cp_scheduler" @click="addscheduler=false">x</span>
        </v-card-title>
        <v-card-text>
          <div class="schedulercontainer">
           <v-date-picker v-model="datepicker" @change="updateddatentime" ></v-date-picker>
           <div class="scheduler_com">
             <v-text-field v-model="scheduledate" value="scheduledate"></v-text-field>
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
  </v-container>
</template>
<script>
import moment from 'moment'
import tinymce from 'vue-tinymce-editor'
var datetime = new Date();
var username=localStorage.username;
import axios from 'axios';
  export default {
    components: {tinymce},
   data() {
    return {
      questions:'',
      
      q_order:1,
      imagevisibility:false,
      questiontypes:[],
      options:[],
      errors: [],
      instruction_flag:false,
      optionchoice:"checkbox",
      addscheduler:false,
      hours:['01','02','03','04','05','06','07','08','09','10','11','12'],
      minutes:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
      ampm:['AM','PM'],
      scheduledate:moment().format('YYYY-MM-DD'),
      scheduletime:null,
      scheduletimehrs:moment().format('hh'),
      scheduletimemins:moment().format('mm'),
      scheduletimeapm:moment().format('A'),
      datepicker:null,
      question_text:null,
      instruction_text:null,
      dataFilterKey:null,
      activeflag:0,
      uploaded_file:null,
      fileurl:window.publicfileurl,
      optioncounts:0,
      optiondatas:[],
      createdoptions:[],
      attachement:null,
      questionid:null,
      spelloptions:{browser_spellcheck: true}
    }
  },
  methods: 
  {
    set_scheduler(){
         this.pollendDays=this.scheduledate+' '+this.scheduletimehrs+':'+this.scheduletimemins+' '+this.scheduletimeapm;
         if(this.pollendDays!==null)
         {
          this.pollendDays= moment(this.pollendDays).unix()*1000
         }
         else
         {
           this.pollendDays=Date.now();
         }

         this.addscheduler=false

    },
    updateddatentime(){
        this.scheduledate=this.datepicker;
    },
    // rightAnswer(qindex,optiontype,indexid)
    // {
    //   var i;
    //   if(optiontype=='radio'){
    //     for(i=0;i < this.optiondatas.length; i++){
    //       if(i!=indexid){
    //         this.optiondatas[i].answervalue=0
    //       }
    //     }
    //   }
    //   console.log(optiontype+' hhh '+indexid)
    // },
    changeactiveflag(id){
      this.activeflag=id;
    },
    updateoptioncount()
    {
      var i=0;
      this.options=[]
    },
    addChoice(qindex)
    {
      var optionorder=this.options.length+1;
      var tempopt={'option_text':''}
      this.options.push(tempopt);
    },
    removeoption(qindex,id){
      this.options.splice(id, 1)
      this.optioncounts--;
    },
    publishquestion()
    {
      console.log(this.question_text);
      console.log(this.currentuser);
      console.log(this.days);
      console.log(this.options);
    },

    savequestion()
    {
        // console.log(this.question_text);
        // console.log(this.currentuser);
        // console.log(this.pollendDays);
        // console.log(this.options);
        axios.post(`/savepollquestion`,{"content":this.question_text,"endDays":this.pollendDays,"createdby":this.currentuser,"optiondatas":this.options})
        .then(response => 
        {
          console.log(response.data);
          console.log(response.data._id);
          axios.post('/addpostbyweb',{"pollid":response.data._id,attachement:null,tags:null,postcontent:null,createdby:this.currentuser,scheduledatetime:Date.now()})
          .then((response)=>
          {
            console.log(response.data)
            location.reload();
          })
          .catch((error)=>{
            console.log(error);
          }) 
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e)
        })
    },

    checkboxOptions()
    {
         var i=0;
        for(i = 1; i <= 2; i++)
        {
          var tempopt={'option_text':''}
          this.options.push(tempopt);
        }
    }

  },
  created() 
  {
      axios.post(`/getcurrentuser`,{'username':username})
      .then(response => {
        // JSON responses are automatically parsed.
        this.currentuser = response.data.unique_id
      })
      .catch(e => {
        this.errors.push(e)
      }),
      this.checkboxOptions();
  },
  computed: 
  {
      dataFilter() {
        return this[this.dataFilterKey]
      },

  }
}
</script>