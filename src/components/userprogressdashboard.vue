<template>
<div>
  <pulse-loader :loading="pageLoader" color="#000000" size="30px"></pulse-loader>
  <v-container v-if ="pageLoader === false">
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-8">
      <div class="col-md-8">
          <div class="row d-flex">
            <input type="date" name=""  class="form-control" placeholder="start date" v-model="startDate">
            <input type="date" name="" class="form-control" placeholder="end date" v-model="endDate" @change="toUpdateDate()">
          </div>
      </div>

    </div>
  </div>

<!--  New element   -->
 <div class="row mt-5">
    <div class="col-md-12">
      <div class="bordered_classs">
       <div class="row title_padding">
         <div class="col-sm-12">
           <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> Questions answered/commented</span>
         </div>
        </div>
       <div class="row">
      <div class="col-sm-5">
        <span class="you_css"> You </span>
        <li class="dash_title_item">SBA/MCQ <span class="conunteer" v-if="Allcountdata.sbaMcq<Allcountdata.totalsbaMcq"> {{ Allcountdata.sbaMcq }} ({{ (Allcountdata.sbaMcq/Allcountdata.totalsbaMcq)*100 | fixedTwo}} %)</span><span class="conunteer" v-else> {{ Allcountdata.sbaMcq }} (100 %)</span> </li>
        <li class="dash_title_item">KFP <span class="conunteer" > {{ Allcountdata.kfp }} ({{ (Allcountdata.kfp*100)/Allcountdata.totalkfp | fixedTwo}} %)</span>  </li>
        <li class="dash_title_item">Case <span class="conunteer" > {{ Allcountdata.case }} ({{ (Allcountdata.case*100)/Allcountdata.totalcase | fixedTwo}} %)</span> </li>
        <li class="dash_title_item">Image of the week <span class="conunteer" > {{ Allcountdata.imageOfTheWek }} ({{ (Allcountdata.imageOfTheWek*100)/Allcountdata.totalimageOfTheWek | fixedTwo}} %)</span> </li>
        <li class="dash_title_item">User questions  <span class="conunteer" > {{ Allcountdata.userQuestion }} ({{ (Allcountdata.userQuestion*100)/Allcountdata.totaluserQuestion | fixedTwo}} %)</span> </li>
      </div>
    <div class="col-md-3">
    <div class="changes">
      <span> Community (Average)</span>

      <li> {{ Allcountdata.sbaMcqcommunity }} ({{ (Allcountdata.sbaMcqcommunity*100)/Allcountdata.totalsbaMcq | fixedTwo}} %)</li>
      <li> {{ Allcountdata.kfpcommunity }} ({{ (Allcountdata.kfpcommunity*100)/Allcountdata.totalkfp | fixedTwo}} %)</li>
      <li> {{ Allcountdata.casecommunity }} ({{ (Allcountdata.casecommunity*100)/Allcountdata.totalcase | fixedTwo}} %)</li>
      <li> {{ Allcountdata.imageOfTheWekcommunity }} ({{ (Allcountdata.imageOfTheWekcommunity*100)/Allcountdata.totalimageOfTheWek | fixedTwo}} %)</li>
      <li> {{ Allcountdata.userQuestioncommunity }} ({{ (Allcountdata.userQuestioncommunity*100)/Allcountdata.totaluserQuestion | fixedTwo}} %)</li>

      </div>
    </div>
    <div class="col-sm-4">
      <span> Total </span>
      <li class="dash_title_item">You <span class="conunteer" > <strong>{{(Allcountdata.sbaMcq+Allcountdata.kfp+Allcountdata.case+Allcountdata.imageOfTheWek+Allcountdata.userQuestion | fixedTwo)}} ({{ (Allcountdata.sbaMcq+Allcountdata.kfp+Allcountdata.case+Allcountdata.imageOfTheWek+Allcountdata.userQuestion)/(Allcountdata.totalsbaMcq+Allcountdata.totalkfp+Allcountdata.totalcase+Allcountdata.totalimageOfTheWek+Allcountdata.totaluserQuestion) * 100 | fixedTwo }})%</strong> </span> </li>
      <li class="dash_title_item">Community (Average)<span class="conunteer" > <strong> {{(Allcountdata.sbaMcqcommunity+Allcountdata.kfpcommunity+Allcountdata.casecommunity+Allcountdata.imageOfTheWekcommunity+Allcountdata.userQuestioncommunity | fixedTwo)}} ({{ (Allcountdata.sbaMcqcommunity+Allcountdata.kfpcommunity+Allcountdata.casecommunity+Allcountdata.imageOfTheWekcommunity+Allcountdata.userQuestioncommunity)/(Allcountdata.totalsbaMcq+Allcountdata.totalkfp+Allcountdata.totalcase+Allcountdata.totalimageOfTheWek+Allcountdata.totaluserQuestion)  * 100 | fixedTwo }})%</strong> </span> </li>
    </div>
    </div>
   </div>
   </div>
   </div>
   <div class="row mt-5">
    <div class="col-md-4">
      <div class="bordered_classs">
           <div class="row title_padding">
              <div class="col-sm-12">
                  <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> Articles - Read (Average) </span>
              </div>

          </div>
          <div class="row">
            <div class="col-sm-12">
              <li class="dash_title_item"> You <span class="conunteer" > <strong> {{articlePercentageOneUser | fixedTwo}} ({{articlePercentageOneUserAvg | fixedTwo}}%)</strong>  </span> </li>
              <li class="dash_title_item">Community (Average) <span class="conunteer" > <strong> {{articlePercentageAllUser | fixedTwo}} ({{articlePercentageAllUserAvg | fixedTwo}}%)</strong> </span>  </li>
            </div>
          </div>
      </div>
   </div>
    <div class="col-md-8">
      <div class="bordered_classs">
           <div class="row title_padding">
              <div class="col-sm-12">
                  <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> Study plan </span>
              </div>
             <!--   <div class="col-sm-5 text-right">
                  <span>Compare</span>
              </div> -->
          </div>
          <div class="row">
            <div class="col-sm-5">
              <span class="you_css"> Added </span>
              <li class="dash_title_item">Topics <span class="conunteer" > {{totalTopicByOneUser}} </span> </li>
              <li class="dash_title_item">Sub-topics <span class="conunteer" > {{subTopicsBYOneUser}} </span>  </li>
              <li class="dash_title_item">Reminders <span class="conunteer" > {{reminderByOneUser}} </span> </li>
              <li class="dash_title_item">Due dates <span class="conunteer" > {{dueDatesByOneUser}} </span> </li>
            </div>
            <div class="col-md-3">
              <div class="changes">
                <span> Completed </span></br>
                <!-- <span> You </span> -->
                <li> <strong> {{completedTopicsByOneUser | fixedTwo}} % </strong> </li>

                <!-- <span> Community </span> -->
                <li> <strong> {{completedSubTopicsByOneUser | fixedTwo}} % </strong> </li>
              </div>
            </div>
            <div class="col-sm-4">
              <span class="dash_title_total">Total Completed</span> <br>
                <li class="dash_title_item">You <span class="conunteer" > <strong> {{averageCompletedByOneUser | fixedTwo}} % </strong> </span> </li>
              <li class="dash_title_item"> Community (Average) <span class="conunteer" > <strong> {{averageCompltedByAllUser | fixedTwo}} % </strong> </span> </li>
            </div>
          </div>
      </div>
   </div>
</div>

<!-- for line chart -->
<!-- <LineChart v-if="loaded == true" :chartdata="questionChart" :options="options"/> -->

<div style="margin-top:10px;">
  <li class="cursoron progresstab progresstab_active" @click="toUpdateDate(1)" >Month</li>
  <li class="cursoron progresstab progresstab_active" @click="toUpdateDate(2)">Week</li>
</div>
<h4>Questions answered/commented (Average)</h4>
<!-- for bar chart -->
<bar-chart v-if="loaded == true" :chartdata="questionChart" :options="options"/>


<!-- New Element  -->
<!-- Four column area  -->
<div class="row mt-5">
    <div class="col-md-6">
      <div class="bordered_classs">
           <div class="row title_padding">
              <div class="col-sm-12">
                  <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> SBA/MCQ-correct answers </span>
              </div>

          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="row">
                <div class="col-md-6"> You <br> <span  > <strong>{{sbacorrectanswercount.correctanswers | fixedTwo}} ({{(sbacorrectanswercount.correctanswers/sbacorrectanswercount.totalquestions)*100 | fixedTwo}}%)</strong>  </span> </div>
              <div class="col-md-6">Community (Average) <br> <span > <strong> {{sbacorrectanswercount.correctanswerscommunity | fixedTwo}} ({{(sbacorrectanswercount.correctanswerscommunity/sbacorrectanswercount.totalquestions)*100 | fixedTwo}}%)</strong> </span>  </div>
              </div>
            </div>
          </div>
      </div>
   </div>
   <div class="col-md-6">
      <div class="bordered_classs">
           <div class="row title_padding">
              <div class="col-sm-12">
                  <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img">  Average time spent- KFP </span>
              </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="row">
                <div class="col-md-6"> You <br> <span > <strong>{{totalTimeByOneUserDataKFP | fixedTwo}} mins</strong>  </span> </div>
              <div class="col-md-6">Community (Average) <br> <span  > <strong> {{totalTimeByAllUserDataKFP |fixedTwo}} mins </strong> </span>  </div>
              </div>
            </div>
          </div>
      </div>
   </div>
   </div>
   <div class="row mt-5">
   <div class="col-md-6">
      <div class="bordered_classs">
           <div class="row title_padding">
              <div class="col-sm-12">
                  <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> Average time  spent - Case </span>
              </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
             <div class="row">
                <div class="col-md-6"> You <br> <span > <strong>{{totalTimeByOneUserCaseData | fixedTwo}} mins</strong>  </span> </div>
              <div class="col-md-6">Community (Average) <br> <span  > <strong> {{totalTimeByAllUserCaseData | fixedTwo}} mins </strong> </span>  </div>
             </div>
            </div>
          </div>
      </div>
   </div>
  <div class="col-md-6">
      <div class="bordered_classs">
           <div class="row title_padding">
              <div class="col-sm-12">
                  <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> Average time  spent - Articles </span>
              </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
             <div class="row">
                <div class="col-md-6"> You <br> <span > <strong>{{totalTimeByOneUserArticleData | fixedTwo}} mins</strong>  </span> </div>
              <div class="col-md-6">Community (Average) <br> <span  > <strong> {{totalTimeByAllUserArticleData | fixedTwo}} mins </strong> </span>  </div>
             </div>
            </div>
          </div>
      </div>
   </div>
</div>
</v-container>
</div>
</template>
<script>
import moment from 'moment'
import LineChart from '../components/charts/LineChart'
import BarChart from '../components/charts/BarChart'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

// var UserFullName = localStorage.UserFullName
var username = localStorage.username;
  export default {
      components: {LineChart, PulseLoader, BarChart},

    data(){
       return {
        notifications:[],
        fileurl:window.publicfileurl,
        currentuser:null,
        currentuserdata:null,
        searchcontent:'',
        sbadata:[],
        sbachangedata:[],
        casedata:[],
        kfpdata:[],
        schangebadata:[],
        casechangedata:[],
        kfpchangedata:[],
        q_typename:'5d15fea98edfed6c417592d16',
        errors:[],
        ustartDate: null,
        uendDate: null,
        qstartDate: null,
        qendDate: null,
        vstartDate: null,
        vendDate: null,
        ucharttype:1,
        qcharttype:1,
        vcharttype:1,
        studyplandata:[],
        activeusers:[],
        changeactiveusers:[],
        mostactiveusers:[],
        articlecount:0,
        userweekincrement:0,
        userweekchunkrate:0,
        sba_count:0,
        case_count:0,
        kfp_count:0,
        image_of_the_week:0,
        sba_avg:0,
        avg_percentage_case:0,
        avg_percentage_kfp:0,

        user_question_count:0,
        avgImageOfTheWeek:0,
        userqQuestionAvg:0,
        ansByAllusers:0,
        ansBycurrentUser:0,
        articlePercentageAllUser:0,
        articlePercentageOneUser:0,
        totalTimeByOneUserDataKFP:0,
        totalTimeByAllUserDataKFP:0,
        totalTimeByOneUserCaseData:0,
        totalTimeByAllUserCaseData:0,
        totalTimeByOneUserArticleData:0,
        totalTimeByAllUserArticleData:0,
        answerPercentageOneUser:0,
        answerPercentageAllUser:0,
        totalTopicByOneUser:0,
        subTopicsBYOneUser:0,
        reminderByOneUser:0 ,
        dueDatesByOneUser:0,
        completedTopicsByOneUser:0,
        completedSubTopicsByOneUser:0,
        averageCompletedByOneUser:0,
        averageCompltedByAllUser:0,
        startDate:moment().subtract(37, 'days').format('YYYY-MM-DD'),
        endDate:moment().subtract(7, 'days').format('YYYY-MM-DD'),
        Allcountdata:null,
        loaded:false,
        pageLoader: true,

        options: {
          responsive: true,
          maintainAspectRatio: false
        },

        questionChart: {
          labels:  [],
          datasets: [
            {
              label: '',
              backgroundColor: '#f87979',
              data: []
            },
            {
              label: 'Other User',
              backgroundColor: '#03befc',
              data: []
            }
          ],
        },
        displaytype:2,
        userFullName: null,
        sbacorrectanswercount:null,
        answerOneUserAvg: 0,
        answerAllUserAvg: 0,
        articlePercentageAllUserAvg: 0,
        articleDatabyOneUser: 0,
        fixedTwo: ""

    }},
    methods:{
      getchangeddate()
          {
          // console.log(this.startDate,this.endDate);
          axios.post(`/getchangesbaquestiondashdata`,{'userid':this.currentuser})
          .then(response => {
          // JSON responses are automatically parsed.
          this.sbabadata = response.data

        })
        .catch(e => {
          this.errors.push(e)
        }),
        axios.post(`/getchangekfpquestiondashdata`,{'userid':this.currentuser})
        .then(response => {
          // JSON responses are automatically parsed.
          this.kfpdata = response.data

        })
        .catch(e => {
          this.errors.push(e)
        }),
        axios.post(`/getchangecasequestiondashdata`,{'userid':this.currentuser})
        .then(response => {
          // JSON responses are automatically parsed.
          this.casedata = response.data

        })
        .catch(e => {
          this.errors.push(e)
        }),
        axios.post(`/getchangearticledashdata`,{'userid':this.currentuser})
        .then(response => {
          // JSON responses are automatically parsed.
          this.articlecount = response.data.count

        })
        .catch(e => {
          this.errors.push(e)
        }),
        axios.post(`/getchangestudyplandashdata`,{'userid':this.currentuser})
        .then(response => {
          // JSON responses are automatically parsed.
          this.studyplandata = response.data

        })
        .catch(e => {
          this.errors.push(e)
        })
      },
        getquestionchangeddate(){
          //alert('question change');
        },
        getviewchangeddate(){
          //alert('view change');
        },
        getuserchangeddate(){
          //alert('user change');
        },
        getquestionanswerSBA(){
          //alert('user change');
        },

          // to call all api in methode
        userDashboardAllApi(){
          axios.post(`/articlepercentage`,{'userid':this.currentuser, "startDate": moment(this.startDate).unix()*1000, "endDate": moment(this.endDate).unix()*1000 })
          .then(response => {
            if (response.data.articlePercentageOneUser !== null){
              this.articlePercentageOneUser = response.data.articlePercentageOneUser;
            }else {
              this.articlePercentageOneUser = 0
            }
            if (response.data.articlePercentageAllUser !== null){
              this.articlePercentageAllUser = response.data.articlePercentageAllUser;
            }else{
              this.articlePercentageAllUser = 0
            }
              this.articlePercentageAllUserAvg = response.data.articlePercentageAllUserAvg
              this.articlePercentageOneUserAvg = response.data.articlePercentageOneUserAvg


          })
          .catch(e => {
            this.errors.push(e)
          })

          // average time spent
          axios.post(`/averagetimespent`,{'userid':this.currentuser, "startDate": moment(this.startDate).unix()*1000, "endDate": moment(this.endDate).unix()*1000 })
          .then(response => {
            if (response.data.totalTimeByAllUserData !== null){
              this.totalTimeByAllUserDataKFP = response.data.totalTimeByAllUserData;
            }else {
              this.totalTimeByAllUserDataKFP = 0
            }
            if (response.data.totalTimeByOneUserData !== null){
              this.totalTimeByOneUserDataKFP = response.data.totalTimeByOneUserData;
            }else {
              this.totalTimeByOneUserDataKFP = 0
            }
            if (response.data.totalTimeByOneUserCaseData !== null){
              this.totalTimeByOneUserCaseData = response.data.totalTimeByOneUserCaseData;
            }else{
              this.totalTimeByOneUserCaseData = 0
            }
            if (response.data.totalTimeByAllUserCaseData !== null){
              this.totalTimeByAllUserCaseData = response.data.totalTimeByAllUserCaseData;
            }else{
              this.totalTimeByAllUserCaseData = 0
            }
            if (response.data.totalTimeByOneUserArticleData){
              this.totalTimeByOneUserArticleData = response.data.totalTimeByOneUserArticleData;
            }else{
              this.totalTimeByOneUserArticleData = 0
            }
            if (response.data.totalTimeByAllUserArticleData !== null){
              this.totalTimeByAllUserArticleData = response.data.totalTimeByAllUserArticleData;
            }else{
              this.totalTimeByAllUserArticleData = 0
            }

          })
          .catch(e => {
            this.errors.push(e)
          })

          // correct answers percentage
          axios.post(`/getcorrectanswer`,{'userid':this.currentuser, "startDate": moment(this.startDate).unix()*1000, "endDate": moment(this.endDate).unix()*1000 })
          .then(response => {
            this.sbacorrectanswercount=response.data.countdata;
            console.log('sbacorrectanswercount',this.sbacorrectanswercount);
          })
          .catch(e => {
            this.errors.push(e)
          })

          // study plan average
          axios.post(`/studyPlanAverage`,{'userid':this.currentuser, "startDate": moment(this.startDate).unix()*1000, "endDate": moment(this.endDate).unix()*1000 })
          .then(response => {
            if (response.data.totalTopicAddedByUser !== null){
              this.totalTopicByOneUser = response.data.totalTopicAddedByUser;
            }else{
              this.totalTopicByOneUser = 0
            }
            if(response.data.totalSubTopicAddedByUser !== null){
              this.subTopicsBYOneUser = response.data.totalSubTopicAddedByUser;
            }else{
              this.subTopicsBYOneUser = 0
            }
            if(response.data.reminderByOneUser.length > 0){
              this.reminderByOneUser = response.data.reminderByOneUser[0].count
            }else {
              this.reminderByOneUser = 0
            }
            if (response.data.dueDatesByOneUser !== null){
              this.dueDatesByOneUser = response.data.dueDatesByOneUser
            }else {
              this.dueDatesByOneUser = 0
            }
            if (response.data.completedTopicsByOneUser !== null){
              this.completedTopicsByOneUser = response.data.completedTopicsByOneUser
            }else {
              this.completedTopicsByOneUser =0
            }
            if (response.data.completedSubTopicsByOneUser !== null){
              this.completedSubTopicsByOneUser = response.data.completedSubTopicsByOneUser
            }else {
              this.completedSubTopicsByOneUser = 0
            }
            if (response.data.averageCompletedByOneUser !== null){
              this.averageCompletedByOneUser = response.data.averageCompletedByOneUser
            }else {
              this.averageCompletedByOneUser = 0
            }
            if (response.data.averageCompltedByAllUser !== null){
              this.averageCompltedByAllUser = response.data.averageCompltedByAllUser
            }else {
              this.averageCompltedByAllUser = 0
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
console.log(moment('enddate',this.endDate).unix()*1000);
          axios.post(`/userdashboardquestion_imgoftheweek`, {'userid':this.currentuser, 'q_type' : this.q_typename, "startDate": moment(this.startDate).unix()*1000, "endDate": moment(this.endDate).unix()*1000, "displaytype": this.displaytype })
          .then(userdashboardquestion_imgoftheweek => {
              this.Allcountdata=userdashboardquestion_imgoftheweek.data.countdata;
              console.log('Allcountdata',this.Allcountdata);
            // this.questionChart.datasets[0].data = userdashboardquestion_imgoftheweek.data.countdata
            // this.questionChart.labels = userdashboardquestion_imgoftheweek.data.labeldatarng
            // let countdataForAll =  userdashboardquestion_imgoftheweek.data.countdataForAll
            // this.questionChart.datasets[1].data = countdataForAll
  axios.post(`/userdashboardquestion_chart`, {'userid':this.currentuser, 'q_type' : this.q_typename, "startDate": moment(this.startDate).unix()*1000, "endDate": moment(this.endDate).unix()*1000, "displaytype": this.displaytype })
          .then(userdashboardquestion_chart=> {

             this.questionChart.datasets[0].data = userdashboardquestion_chart.data.countdata
             this.questionChart.labels = userdashboardquestion_chart.data.labeldatarng
             this.questionChart.datasets[1].data = userdashboardquestion_chart.data.countdataForAll

          })
          .catch(e => {
            this.errors.push(e)
          })
          .finally(() => {
            this.loaded = true
            this.pageLoader = false
          })
          })
          .catch(e => {
            this.errors.push(e)
          })

        },
        toUpdateDate(type){
            // this.questionChart.labels = [[`SBA/MCQ` , [`${this.startDate} to ${this.endDate}`], "" ], [`KFP` , [`${this.startDate} to ${this.endDate}`] ], [`Case` , [`${this.startDate} to ${this.endDate}`] ], [`Image of the week`, [`${this.startDate} to ${this.endDate}`] ], [`User questions`, [`${this.startDate} to ${this.endDate}`] ] ]
            this.questionChart.datasets[0].data = []
            this.questionChart.datasets[1].data = []
            if (type !== undefined){
              this.displaytype = type
            }
            this.loaded = false
            this.userDashboardAllApi(type)
        }

    },
      watch: {
        startDate: function () {
          this.toUpdateDate()
        }
      },
     created(){
      var newdate=moment(1576145933473).format('YYYY-MM- ')
      var newdate2=moment(1576108799000).format('YYYY-MM-DD')
      var newdate3=moment(1575542177211).format('YYYY-MM-DD')
      this.scurrenttime=Date.now();
      // this.masterquestion=this.$route.query.id

      if (this.$route.query.id){
        var selusername = window.atob(this.$route.query.id)

      }else {
        var selusername = username
      }

    axios.post(`/getcurrentuser`,{'username':selusername})
    .then(response => {
      this.currentuser = response.data.unique_id;
      this.currentuserdata = response.data;
      this.questionChart.datasets[0].label = `${response.data.firstname} ${response.data.lastname}`
      this.userFullName = `${response.data.firstname} ${response.data.lastname}`
      axios.post(`/getactiveuserweekincrement`,{'userid':this.currentuser})
    .then(userweekresponse => {
      console.log(userweekresponse);
      this.userweekincrement = userweekresponse.data.result

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getmostactiveusers`,{'userid':this.currentuser})
    .then(mostactiveusers => {
      console.log(mostactiveusers);
      this.mostactiveusers = mostactiveusers.data

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getactiveuserweekchurnrate`,{'userid':this.currentuser})
    .then(userweekresponsechunk => {
      console.log(userweekresponsechunk);
      this.userweekchunkrate = userweekresponsechunk.data.result

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getsbaquestiondashdata`,{'userid':this.currentuser})
    .then(response => {
      this.sbadata = response.data

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getkfpquestiondashdata`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.kfpdata = response.data

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getcasequestiondashdata`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.casedata = response.data

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getarticledashdata`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.articlecount = response.data.count

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getstudyplandashdata`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.studyplandata = response.data

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getactiveuserdashdata`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.activeusers = response.data

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getchangeactiveuserdashdata`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.changeactiveusers = response.data

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getchangesbaquestiondashdata`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.sbachangedata = response.data

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getchangekfpquestiondashdata`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.kfpdata = response.data

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getchangecasequestiondashdata`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.casedata = response.data

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getchangearticledashdata`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.articlecount = response.data.count

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getchangestudyplandashdata`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
      this.studyplandata = response.data

    })
    .catch(e => {
      this.errors.push(e)
    })

    // to update userDashboard
    this.userDashboardAllApi()

    })
    .catch(e => {
      this.errors.push(e)
    })

    // to add start date


    },

    mounted() {
      setTimeout(() => {
          this.toUpdateDate()
      }, 3000);
    }
  }
</script>