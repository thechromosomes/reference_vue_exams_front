<template>
  <v-container>
<div class="row">
    <div class="col-sm-12">
    <p class="heading_dashboard_page"> User Report </p>
    </div>
    
</div>
 <div class="row">
  <div class="col-md-4">
    <div class="bordered_classs">
    <div class="row title_padding">
    <div class="col-sm-7">
    <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> Active Users</span>
    </div>
    <div class="col-sm-5 text-right">
    <span></span>
    </div>
    </div>
  <div class="row">
    <div class="col-sm-5">
  <li class="dash_title_item">Week <span class="conunteer" v-if="activeusers.length>0"> {{activeusers[0].week}} </span>  </li>
  <li class="dash_title_item">Month <span class="conunteer" v-if="activeusers.length>0"> {{activeusers[0].month}} </span> </li>
  </div>
  <div class="col-md-3">
  <div class="changes">
    <span> Change (weekly)</span>

    <li> {{activeusers[0].week-changeactiveusers[0].week}}({{((activeusers[0].week-changeactiveusers[0].week)*100/activeusers[0].week).toFixed(2)}}%)</li>
    <li> {{activeusers[0].month-changeactiveusers[0].month}}({{((activeusers[0].month-changeactiveusers[0].month)*100/activeusers[0].month).toFixed(2)}}%)</li>
    
    </div>
  </div>

  <div class="col-sm-4">
  <span class="dash_title_total">Total</span> <br>
  <span class ="count_noss" v-if="activeusers.length>0"> {{activeusers[0].total}} </span>
  </div>
  </div>
 </div>
 </div>


  <div class="col-md-3">
    <div class="bordered_classs">
       <div class="row title_padding">
    <div class="col-sm-12">
    <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> Weekly average increase </span>
    <span class="lower_dash_title">  </span>
    </div>
  
    </div>
  <div class="row">
    <div class="col-sm-12 text-center">
    <li class="dash_title_item"><span class="conunteer_big"> {{userweekincrement}} % </span> </li>
  </div>
  

  
  </div>
 </div>
 </div>
<div class="col-md-3">
    <div class="bordered_classs">
       <div class="row title_padding">
    <div class="col-sm-12">
    <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> Weekly average churn rate</span>
    <span class="lower_dash_title">  </span>
    </div>
   
    </div>
  <div class="row">
    <div class="col-sm-12 text-center">
    <li class="dash_title_item"><span class="conunteer_big"> {{userweekchunkrate}} % </span> </li>
  </div>
  

  
  </div>
 </div>
 </div>

  

</div>
<br>
<div class="row">
<div class="col-sm-12">
  <ul>
    <template v-if="ucharttype==0">
    <li class="cursoron progresstab progresstab_active" @click="ucharttype=0">Day</li>
     </template>
     <template v-else>
    <li class="cursoron progresstab" @click="ucharttype=0">Day</li>
    </template>
       <template v-if="ucharttype==1">
    <li class="cursoron progresstab progresstab_active" @click="ucharttype=1">Week</li>
    </template>
     <template v-else>
    <li class="cursoron progresstab" @click="ucharttype=1">Week</li>
    </template>
   <template v-if="ucharttype==2">
    <li class="cursoron progresstab progresstab_active" @click="ucharttype=2">Month</li>
    </template>
     <template v-else>
    <li class="cursoron progresstab" @click="ucharttype=2">Month</li>
    </template>
  </ul>
  </div>
</div>
<div class="row">
<div class="col-sm-12">
<label class="filter_startdate"> <span class="datefilter">Start date</span> <input class="date_filter" type="date" v-model="ustartDate" @input="getuserchangeddate" /> </label>
<label class="filter_duedate"> <span class="datefilter datefilter_last">End date</span> <input class="date_filter" type="date" v-model="uendDate" @input="getuserchangeddate" /> </label>
<template v-if="ustartDate!=null || uendDate!=null"><span class="reset_datefilter" @click="resetdatefilter"> Reset</span></template>
</div>

</div>
<div class="row">
<template v-if="ustartDate!==null && uendDate!==null">
 <activeuserschart :charttype="ucharttype" :startDate="ustartDate" :endDate="uendDate"></activeuserschart>
</template>
<template v-else>
   <activeuserschart :charttype="ucharttype" :startDate="nullval" :endDate="nullval"></activeuserschart>
</template>
</div>


<div class="row">
    <div class="col-sm-12">
    <p class="heading_dashboard_page"> Question Report</p>
    </div>
</div>
   <div class="row">
  <div class="col-md-12">
    <div class="bordered_classs">
 
   <div class="row title_padding">
    <div class="col-sm-7">
    <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> Question </span>
    </div>
     <div class="col-sm-5 text-right">
    <span></span>
    </div>
    </div>
     <div class="row">
    <div class="col-sm-3">
  <li class="dash_title_item">SBA/MCQ <span class="conunteer" v-if="sbadata.length>0"> {{sbadata[0].count}} </span> </li>
  <li class="dash_title_item">KFP <span class="conunteer" v-if="kfpdata.length>0"> {{kfpdata[0].count}} </span>  </li>
  <li class="dash_title_item">Case <span class="conunteer" v-if="caseQuestionReport != null"> {{caseQuestionReport}} </span> </li>
  <li class="dash_title_item">Image of the week <span class="conunteer" v-if="imageQuestionReport != null"> {{imageQuestionReport}} </span> </li>
  <li class="dash_title_item">User question <span class="conunteer" v-if="userQuestionReport != null"> {{userQuestionReport}} </span> </li>
  </div>
  <div class="col-md-2">
  <div class="changes">
      <span> Change (weekly) </span>
      <li>{{weeklyChangequestionSba}} %</li>
      <li>{{weeklyChangequestionKfp}} %</li>
      <li>{{weeklyChangequestionCase}} %</li>
      <li>{{weeklyChangequestionImage}} %</li>
      <li>{{weeklyChangequestionUserQuest}} %</li>
    </div>
  </div>
  <div class="col-md-2">
  <div class="changes">
    <span> Change (monthly) </span>
      <li>{{monthlyChangequestionSba}} %</li>
      <li>{{monthlyChangequestionKfp}} %</li>
      <li>{{monthlyChangequestionCase}} %</li>
      <li>{{monthlyChangequestionImage}} %</li>
      <li>{{monthlyChangequestionUserQuest}} %</li>
    </div>
  </div>
  <div class="col-sm-4">
  <span class="dash_title_total"> Total</span> <br>
  <span class ="count_noss" v-if="sbadata.length>0 && kfpdata.length>0 && casedata.length>0"> {{sbadata[0].count+kfpdata[0].count+caseQuestionReport+imageQuestionReport+userQuestionReport}} </span>
  </div>
  </div>
 </div>
 </div>

  
</div>
<!-- <activeuserschart /> -->
<br>
<div class="row">
<div class="col-sm-12">
  <ul>
    <template v-if="qcharttype==0">
    <li class="cursoron progresstab progresstab_active" @click="qcharttype=0">Day</li>
     </template>
     <template v-else>
    <li class="cursoron progresstab" @click="qcharttype=0">Day</li>
    </template>
       <template v-if="qcharttype==1">
    <li class="cursoron progresstab progresstab_active" @click="qcharttype=1">Week</li>
    </template>
     <template v-else>
    <li class="cursoron progresstab" @click="qcharttype=1">Week</li>
    </template>
   <template v-if="qcharttype==2">
    <li class="cursoron progresstab progresstab_active" @click="qcharttype=2">Month</li>
    </template>
     <template v-else>
    <li class="cursoron progresstab" @click="qcharttype=2">Month</li>
    </template>
  </ul>
  </div>
</div>
<div class="row">
<div class="col-sm-12">
<label class="filter_startdate"> <span class="datefilter">Start date</span> <input class="date_filter" type="date" v-model="qstartDate" @input="getquestionchangeddate" /> </label>
<label class="filter_duedate"> <span class="datefilter datefilter_last">End date</span> <input class="date_filter" type="date" v-model="qendDate" @input="getquestionchangeddate" /> </label>
<template v-if="qstartDate!=null || qendDate!=null"><span class="reset_datefilter" @click="resetdatefilter"> Reset</span></template>
</div>
</div>
<div class="row">
  <template v-if="qstartDate!==null && qendDate!==null">
  <questionchart :charttype="qcharttype"  :startDate="qstartDate" :endDate="qendDate"></questionchart>
  </template>
  <template v-else>
  <questionchart :charttype="qcharttype" :startDate="nullval" :endDate="nullval"></questionchart>
  </template>
</div>
<!---- ************************************************************************************************************************************************* -->

<div class="row">
    <div class="col-sm-12">
    <p class="heading_dashboard_page"> Answer Report</p>
    </div>
</div>
   <div class="row">


  <div class="col-md-12">
    <div class="bordered_classs">
     <div class="row title_padding">
    <div class="col-sm-7">
    <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> Answers</span>
    </div>
     <div class="col-sm-5 text-right">
    <span></span>
    </div>
    </div>
  <div class="row">
    <div class="col-sm-3">
    <li class="dash_title_item">SBA/MCQ <span class="conunteer" v-if="sbadata.length>0"> {{sbadata[0].answercount}} </span> </li>
  <li class="dash_title_item">KFP <span class="conunteer" v-if="kfpdata.length>0"> {{kfpdata[0].answercount}} </span>  </li>
  <li class="dash_title_item">Case <span class="conunteer" v-if="casedata.length>0"> {{casedata[0].answercount}} </span> </li>
   <li class="dash_title_item">Image of the week <span class="conunteer" v-if="QuestionsAnswerImage !== null"> {{QuestionsAnswerImage}} </span> </li>
    <li class="dash_title_item">User Question <span class="conunteer" v-if="QuestionsAnswerUserquest !== null"> {{QuestionsAnswerUserquest}} </span> </li>
  </div>
  <div class="col-md-2">
  <div class="changes">
    <span> Change (weekly)</span>
    <li>{{weeklyChangeSba}} %</li>
    <li> {{weeklyChangekfp}} %</li>
    <li> {{weeklyChangeCase}} %</li>
    <li> {{weeklyChangeImageWeek}} %</li>
     <li> {{weeklyChangeUserQuest}} %</li>
    
    </div>
  </div>
 <div class="col-md-2">
  <div class="changes">
    <span> Change (monthly)</span>
    <li>{{monthlyChangeSba}} %</li>
    <li>{{monthlyChangekfp}} %</li>
    <li>{{monthlyChangeCase}} %</li>
    <li>{{monthlyChangeImageWeek}} %</li>
    <li>{{monthlyChangeUserQuest}} %</li>
    </div>
  </div>
  <div class="col-sm-4">
  <span class="dash_title_total">Total</span> <br>
  <span class ="count_noss" v-if="sbadata.length>0 && kfpdata.length>0 && casedata.length>0"> {{sbadata[0].answercount+kfpdata[0].answercount+casedata[0].answercount + QuestionsAnswerImage+QuestionsAnswerUserquest}} </span>
  </div>
  </div>
  </div>
 </div>
</div>
<!-- <activeuserschart /> -->
<br>
<div class="row">
<div class="col-sm-12">
  <ul>
    <template v-if="qcharttype==0">
    <li class="cursoron progresstab progresstab_active" @click="qcharttype=0">Day</li>
     </template>
     <template v-else>
    <li class="cursoron progresstab" @click="qcharttype=0">Day</li>
    </template>
       <template v-if="qcharttype==1">
    <li class="cursoron progresstab progresstab_active" @click="qcharttype=1">Week</li>
    </template>
     <template v-else>
    <li class="cursoron progresstab" @click="qcharttype=1">Week</li>
    </template>
   <template v-if="qcharttype==2">
    <li class="cursoron progresstab progresstab_active" @click="qcharttype=2">Month</li>
    </template>
     <template v-else>
    <li class="cursoron progresstab" @click="qcharttype=2">Month</li>
    </template>
  </ul>
  </div>
</div>
<div class="row">
<div class="col-sm-12">
<label class="filter_startdate"> <span class="datefilter">Start date</span> <input class="date_filter" type="date" v-model="qstartDate" @input="getquestionchangeddate" /> </label>
<label class="filter_duedate"> <span class="datefilter datefilter_last">End date</span> <input class="date_filter" type="date" v-model="qendDate" @input="getquestionchangeddate" /> </label>
<template v-if="qstartDate!=null || qendDate!=null"><span class="reset_datefilter" @click="resetdatefilter"> Reset</span></template>
</div>
</div>
<div class="row">
  <template v-if="qstartDate!==null && qendDate!==null">
  <answerchart :charttype="qcharttype"  :startDate="qstartDate" :endDate="qendDate"></answerchart>
  </template>
  <template v-else>
  <answerchart :charttype="qcharttype" :startDate="nullval" :endDate="nullval"></answerchart>
  </template>
</div>
<!---- ************************************************************************************************************************************************* -->

<div class="row">
    <div class="col-sm-12">
    <p class="heading_dashboard_page"> Views Report</p>
    </div>
</div>
   <div class="row">

  <div class="col-md-12">
    <div class="bordered_classs">
     <div class="row title_padding">
    <div class="col-sm-7">
    <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> Views</span>
    </div>
     <div class="col-sm-5 text-right">
    <span></span>
    </div>
    </div>
  <div class="row">
    <div class="col-sm-3">
  <li class="dash_title_item">SBA/MCQ <span class="conunteer" v-if="sbadata.length>0"> {{sbadata[0].visitcount}} </span> </li>
  <li class="dash_title_item">KFP <span class="conunteer" v-if="kfpdata.length>0"> {{kfpdata[0].visitcount}} </span>  </li>
  <li class="dash_title_item">Case <span class="conunteer" v-if="casedata.length>0"> {{casedata[0].visitcount}} </span> </li>
  <li class="dash_title_item">Image of the week <span class="conunteer" v-if="QuestionsViewsImage !== null"> {{QuestionsViewsImage}} </span> </li>
  <li class="dash_title_item">User Question <span class="conunteer" v-if="QuestionsViewsUserQuest !== null"> {{QuestionsViewsUserQuest}} </span> </li>
  <li class="dash_title_item">Articles <span class="conunteer"> {{articlecount}} </span> </li>
  </div>
  <div class="col-md-2">
  <div class="changes">
    <span> Change (weekly)</span>
    <li> {{weeklyChangeViewsSba}} %</li>
    <li> {{weeklyChangeViewsKfp}} %</li>
    <li>{{weeklyChangeViewsCase}} %</li>
    <li> {{weeklyChangeViewsImage}} %</li>
    <li>{{weeklyChangeViewsUserQuest}} %</li>
    <li> {{weeklyChangeViewsArticles}} %</li>
    </div>
  </div>
<div class="col-md-2">
  <div class="changes">
    <span> Change (monthly)</span>
    <li> {{monthhlyChangeViewsSba}} %</li>
    <li>{{monthhlyChangeViewsKfp}} %</li>
    <li>{{monthhlyChangeViewsCase}} %</li>
    <li>{{monthhlyChangeViewsImage}} %</li>
    <li>{{monthhlyChangeViewsUserQuest}} %</li>
    <li>{{monthhlyChangeViewsArticles}} %</li>
    </div>
  </div>
  <div class="col-sm-4">
  <span class="dash_title_total">Total</span> <br>
  <span class ="count_noss" v-if="sbadata.length>0 && kfpdata.length>0 && casedata.length>0"> {{sbadata[0].visitcount+kfpdata[0].visitcount+casedata[0].visitcount+articlecount}} </span>
  </div>
  </div>
  </div>
 </div>
</div>
<!-- <activeuserschart /> -->
<br>
<div class="row">
<div class="col-sm-12">
  <ul>
    <template v-if="vcharttype==0">
    <li class="cursoron progresstab progresstab_active" @click="vcharttype=0">Day</li>
     </template>
     <template v-else>
    <li class="cursoron progresstab" @click="vcharttype=0">Day</li>
    </template>
       <template v-if="vcharttype==1">
    <li class="cursoron progresstab progresstab_active" @click="vcharttype=1">Week</li>
    </template>
     <template v-else>
    <li class="cursoron progresstab" @click="vcharttype=1">Week</li>
    </template>
   <template v-if="vcharttype==2">
    <li class="cursoron progresstab progresstab_active" @click="vcharttype=2">Month</li>
    </template>
     <template v-else>
    <li class="cursoron progresstab" @click="vcharttype=2">Month</li>
    </template>
  </ul>
  </div>
</div>
  <div class="row">
<div class="col-sm-12">
<label class="filter_startdate"> <span class="datefilter">Start date</span> <input class="date_filter" type="date" v-model="vstartDate" @input="getviewchangeddate" /> </label>
<label class="filter_duedate"> <span class="datefilter datefilter_last">End date</span> <input class="date_filter" type="date" v-model="vendDate" @input="getviewchangeddate" /> </label>
<template v-if="vstartDate!=null || vendDate!=null"><span class="reset_datefilter" @click="resetdatefilter"> Reset</span></template>
</div>

</div>
<div class="row">  
  <template v-if="vstartDate!==null && vendDate!==null">
  <viewschart :charttype="vcharttype" :startDate="vstartDate" :endDate="vendDate" ></viewschart>
  </template>
  <template v-else>
     <viewschart :charttype="vcharttype" :startDate="nullval" :endDate="nullval"></viewschart>
</template>

</div>
<div class="row">
  <div class="row">
    <div class="col-sm-12">
    <p class="heading_dashboard_page"> Study Plan</p>
    </div>
</div>
  <div class="col-md-12">
    <div class="bordered_classs">
     <div class="row title_padding">
    <div class="col-sm-7">
    <span class="dash_title"> <img src="../assets/images/questc.png" class="add_poll_img"> Study Plan</span>
    </div>
     <div class="col-sm-5 text-right">
    <span></span>
    </div>
    </div>
  <div class="row">
    <div class="col-sm-3">
  <li class="dash_title_item">Users <span class="conunteer" v-if="studyplandata.length>0"> {{studyplandata[0].usercount}} </span> </li>
  <li class="dash_title_item">Completed <span class="conunteer" v-if="studyplandata.length>0"> {{studyplandata[0].completecount}} </span>  </li>
  <li class="dash_title_item">Notes Added <span class="conunteer" v-if="studyplandata.length>0"> {{studyplandata[0].notecount}}</span> </li>
   <li class="dash_title_item">Reminders <span class="conunteer" v-if="studyplandata.length>0"> {{studyplandata[0].remindercount}} </span> </li>
  </div>
  <div class="col-md-2">
  <div class="changes">
    <span> Change (weekly)</span>
    <li> 20(0%)</li>
    <li> 30(3%)</li>
    <li> 25(25%)</li>
    
    </div>
  </div>
   <div class="col-md-2">
  <div class="changes">
    <span> Change (monthly)</span>
    <li> 20(0%)</li>
    <li> 30(3%)</li>
    <li> 25(25%)</li>
    
    </div>
  </div>
<div class="row">
  <div class="col-sm-4">
  <span class="dash_title_total">Total</span> <br>
  <span class ="count_noss" v-if="studyplandata.length>0"> {{studyplandata[0].usercount+studyplandata[0].completecount+studyplandata[0].notecount+studyplandata[0].remindercount}}</span>
  </div>
  </div>
 </div>
</div>
</div>
</div>
<div class="row">
<div class="col-sm-6">
  <div class="active_single_section">
  <p class="heading_dashboard_page"> Most active users</p>
  <mostactiveusers :charttype="0"></mostactiveusers>
</div>
    </div>  
    <div class="col-sm-6">
  <div class="active_single_section">
  <p class="heading_dashboard_page"> User who stopped being active</p>
  <stoppedactiveusers :charttype="0"></stoppedactiveusers>
</div>
    </div>  
</div>
<div class="row">
<div class="col-sm-6">
  <div class="active_single_section">
  <p class="heading_dashboard_page"> Most Comments</p>
  <mostcomments :charttype="0"></mostcomments>
</div>
    </div>  
    <div class="col-sm-6">
  <div class="active_single_section">
  <p class="heading_dashboard_page"> Most Viewed</p>
  <mostviewed :charttype="0"></mostviewed>
</div>
    </div>  
</div>
<div class="row">
<div class="col-sm-6">
  <div class="active_single_section">
  <p class="heading_dashboard_page"> Most Answered</p>
  <mostanswered :charttype="0"></mostanswered>
</div>
    </div>  
  <div class="col-sm-6">
    <div class="active_single_section">
      <p class="heading_dashboard_page"> Saved Posts</p>
      <reportDashboard></reportDashboard>
    </div>
  </div>
  
</div>

  </v-container>
</template>
<script>
import tinymce from 'vue-tinymce-editor' 
import moment from 'moment'
import activeuserschart from './charts/activeuserschart'
import questionchart from './charts/questionchart'
import answerchart from './charts/answerchart'
import viewschart from './charts/viewschart'
import mostactiveusers from './charts/mostactiveusers'
import stoppedactiveusers from './charts/stoppedactiveusers'
import mostcomments from './charts/mostcomments'
import mostviewed from './charts/mostviewed'
import mostanswered from './charts/mostanswered'
import reportDashboard from './charts/reportDashboard'
var username=localStorage.username;
  export default {
      components: {tinymce,activeuserschart,questionchart,answerchart,viewschart,mostactiveusers,stoppedactiveusers,mostcomments,mostviewed,mostanswered,reportDashboard},
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
        nullval:null,

        weeklyChangekfp:null,
        weeklyChangeUserQuest:null,
        weeklyChangeImageWeek:null,
        weeklyChangeCase:null,
        weeklyChangeSba:null,

        monthlyChangekfp:null,
        monthlyChangeUserQuest:null,
        monthlyChangeImageWeek:null,
        monthlyChangeCase:null,
        monthlyChangeSba:null,

        weeklyChangeViewsSba:null,
        weeklyChangeViewsKfp:null,
        weeklyChangeViewsCase:null,
        weeklyChangeViewsImage:null,
        weeklyChangeViewsUserQuest:null,
        weeklyChangeViewsArticles:0,

        monthhlyChangeViewsSba:null,
        monthhlyChangeViewsKfp:null,
        monthhlyChangeViewsCase:null,
        monthhlyChangeViewsImage:null,
        monthhlyChangeViewsUserQuest:null,
        monthhlyChangeViewsArticles:0,

        weeklyChangequestionSba:null,
        weeklyChangequestionKfp:null,
        weeklyChangequestionCase:null,
        weeklyChangequestionImage:null,
        weeklyChangequestionUserQuest:null,

        monthlyChangequestionSba:null,
        monthlyChangequestionKfp:null,
        monthlyChangequestionCase:null,
        monthlyChangequestionImage:null,
        monthlyChangequestionUserQuest:null,


        allQuestiontype:{
          "KFP": '5d15fea98edfed6c417592d9',
          "SBA": '5d15fea98edfed6c417592d10',
          "MEMQ": '5d15fea98edfed6c417592d11',
          "MCQ": '5d15fea98edfed6c417592d12',
          "SBA/MCQ":"5d15fea98edfed6c417592d13",
          "ImageWeek":'5d15fea98edfed6c417592d15',
          "CASE":'5d15fea98edfed6c417592d14',
          "userquest": '5d15fea98edfed6c417592d16'
        },

        imageQuestionReport:null,
        caseQuestionReport:null,
        userQuestionReport:null,

        QuestionsAnswerUserquest: null,
        QuestionsAnswerCase: null,
        QuestionsAnswerImage: null,

        QuestionsViewsCase: null,
        QuestionsViewsUserQuest: null,
        QuestionsViewsImage: null
    }},
    methods:{
        getchangeddate()
        {
          console.log(this.startDate,this.endDate);
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
        resetdatefilter(){
         this.ustartDate= null
        this.uendDate= null
        this.qstartDate= null
        this.qendDate= null
        this.vstartDate= null
        this.vendDate= null
        }

    },
     created(){
      var newdate=moment(1576145933473).format('YYYY-MM- ')
      var newdate2=moment(1576108799000).format('YYYY-MM-DD')
      var newdate3=moment(1575542177211).format('YYYY-MM-DD')
      console.log('fourweek-',newdate)
      console.log('enddate-',newdate2)
      console.log('weekdate-',newdate3)
       this.scurrenttime=Date.now();
this.masterquestion=this.$route.query.id
    // this.chartdata.labels = this.categories;
axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuser = response.data.unique_id
      this.currentuserdata = response.data
      axios.post(`/getactiveuserweekincrement`,{'userid':this.currentuser})
    .then(userweekresponse => {
      console.log(userweekresponse);
      // JSON responses are automatically parsed.
      this.userweekincrement = userweekresponse.data.result

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getmostactiveusers`,{'userid':this.currentuser})
    .then(mostactiveusers => {
      console.log(mostactiveusers);
      // JSON responses are automatically parsed.
      this.mostactiveusers = mostactiveusers.data

    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getactiveuserweekchurnrate`,{'userid':this.currentuser})
    .then(userweekresponsechunk => {
      console.log(userweekresponsechunk);
      // JSON responses are automatically parsed.
      this.userweekchunkrate = userweekresponsechunk.data.result

    })
    .catch(e => {
      this.errors.push(e)
    }),
axios.post(`/getsbaquestiondashdata`,{'userid':this.currentuser})
    .then(response => {
      // JSON responses are automatically parsed.
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
    // axios.post(`/getarticledashdata`,{'userid':this.currentuser})
    // .then(response => {
    //   // JSON responses are automatically parsed.
    //   this.articlecount = response.data.count

    // })
    // .catch(e => {
    //   this.errors.push(e)
    // }),
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
      this.weeklyChangeViewsArticles = response.data.incOrDec
      this.monthhlyChangeViewsArticles = response.data.MonthDataViews

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
    })
    .catch(e => {
      this.errors.push(e)
    })

     axios.post(`/allquestionweekdatadifference`,{'questionType':this.allQuestiontype.KFP})
    .then(response => {
      this.weeklyChangekfp = response.data.incOrDec

    })
    .catch(e => {
      this.errors.push(e)
    })

    axios.post(`/allquestionweekdatadifference`,{'questionType':this.allQuestiontype.ImageWeek})
    .then(response => {
      this.weeklyChangeImageWeek = response.data.incOrDec

    })
    .catch(e => {
      this.errors.push(e)
    })

     axios.post(`/allquestionweekdatadifference`,{'questionType':this.allQuestiontype.SBA})
    .then(response => {
      this.weeklyChangeSba = response.data.incOrDec

    })
    .catch(e => {
      this.errors.push(e)
    })

    axios.post(`/datadifferencecaseanduser`,{'questionType':this.allQuestiontype.CASE})
    .then(response => {
      this.weeklyChangeCase = response.data.incOrDec

    })
    .catch(e => {
      this.errors.push(e)
    })

    axios.post(`/datadifferencecaseanduser`,{'questionType':this.allQuestiontype.userquest})
    .then(response => {
      this.weeklyChangeUserQuest = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })

    axios.post(`/getviewsweeklychanges`,{'questionType':this.allQuestiontype.SBA})
    .then(response => {
      this.weeklyChangeViewsSba = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.post(`/getviewsweeklychanges`,{'questionType':this.allQuestiontype.CASE})
    .then(response => {
      this.weeklyChangeViewsCase = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.post(`/getviewsweeklychanges`,{'questionType':this.allQuestiontype.ImageWeek})
    .then(response => {
      this.weeklyChangeViewsImage = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.post(`/getviewsweeklychanges`,{'questionType':this.allQuestiontype.userquest})
    .then(response => {
      this.weeklyChangeViewsUserQuest = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
     axios.post(`/getviewsweeklychanges`,{'questionType':this.allQuestiontype.KFP})
    .then(response => {
      this.weeklyChangeViewsKfp = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })

    // monthly data change % for views
     axios.post(`/monthdatadifferenceviews`,{'questionType':this.allQuestiontype.SBA})
    .then(response => {
      this.monthhlyChangeViewsSba = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.post(`/monthdatadifferenceviews`,{'questionType':this.allQuestiontype.KFP})
    .then(response => {
      this.monthhlyChangeViewsKfp = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.post(`/monthdatadifferenceviews`,{'questionType':this.allQuestiontype.CASE})
    .then(response => {
      this.monthhlyChangeViewsCase = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.post(`/monthdatadifferenceviews`,{'questionType':this.allQuestiontype.ImageWeek})
    .then(response => {
      this.monthhlyChangeViewsImage = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
     axios.post(`/monthdatadifferenceviews`,{'questionType':this.allQuestiontype.userquest})
    .then(response => {
      this.monthhlyChangeViewsUserQuest = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })

  // monthly data change % for answers
     axios.post(`/monthdatadifference`,{'questionType':this.allQuestiontype.KFP})
    .then(response => {
      this.monthlyChangekfp = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
     axios.post(`/monthdatadifferencecaseanduser`,{'questionType':this.allQuestiontype.userquest})
    .then(response => {
      this.monthlyChangeUserQuest = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })

     axios.post(`/monthdatadifference`,{'questionType':this.allQuestiontype.ImageWeek})
    .then(response => {
      this.monthlyChangeImageWeek = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })

    axios.post(`/monthdatadifferencecaseanduser`,{'questionType':this.allQuestiontype.CASE})
    .then(response => {
      this.monthlyChangeCase = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
      axios.post(`/monthdatadifference`,{'questionType':this.allQuestiontype.SBA})
    .then(response => {
      this.monthlyChangeSba = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })

  // weekly data percentage for question(s)
      axios.post(`/weeklyquestionpercentage`,{'questionType':this.allQuestiontype.SBA})
    .then(response => {
      this.weeklyChangequestionSba = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    }) 
     axios.post(`/weeklyquestionpercentage`,{'questionType':this.allQuestiontype.KFP})
    .then(response => {
      this.weeklyChangequestionKfp = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
     axios.post(`/weeklyquestionpercentage`,{'questionType':this.allQuestiontype.CASE})
    .then(response => {
      this.weeklyChangequestionCase = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.post(`/weeklyquestionpercentage`,{'questionType':this.allQuestiontype.ImageWeek})
    .then(response => {
      this.weeklyChangequestionImage = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.post(`/weeklyquestionpercentage`,{'questionType':this.allQuestiontype.userquest})
    .then(response => {
      this.weeklyChangequestionUserQuest = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })

    // monthly Question Percentage
    axios.post(`/monthlyquestionpercentage`,{'questionType':this.allQuestiontype.SBA})
    .then(response => {
      this.monthlyChangequestionSba = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })

    axios.post(`/monthlyquestionpercentage`,{'questionType':this.allQuestiontype.KFP})
    .then(response => {
      this.monthlyChangequestionKfp = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.post(`/monthlyquestionpercentage`,{'questionType':this.allQuestiontype.CASE})
    .then(response => {
      this.monthlyChangequestionCase = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.post(`/monthlyquestionpercentage`,{'questionType':this.allQuestiontype.ImageWeek})
    .then(response => {
      this.monthlyChangequestionImage = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })

     axios.post(`/monthlyquestionpercentage`,{'questionType':this.allQuestiontype.userquest})
    .then(response => {
      this.monthlyChangequestionUserQuest = response.data.incOrDec
    })
    .catch(e => {
      this.errors.push(e)
    })

    //  questionreport image of the week
    axios.post(`/questionreport`,{'questionType':this.allQuestiontype.ImageWeek})
    .then(response => {
      this.imageQuestionReport = response.data.data
      this.QuestionsAnswerImage = response.data.QuestionsAnswerData
      this.QuestionsViewsImage = response.data.QuestionsViewsData
    })
    .catch(e => {
      this.errors.push(e)
    })

  //  questionreport user questions
    axios.post(`/questionreport`,{'questionType':this.allQuestiontype.userquest})
    .then(response => {
      this.userQuestionReport = response.data.data
      this.QuestionsAnswerUserquest = response.data.QuestionsAnswerData
      this.QuestionsViewsUserQuest = response.data.QuestionsViewsData

    })
    .catch(e => {
      this.errors.push(e)
    })

  //  questionreport Case questions
    axios.post(`/questionreport`,{'questionType':this.allQuestiontype.CASE})
    .then(response => {
      this.caseQuestionReport = response.data.data
      this.QuestionsAnswerCase = response.data.QuestionsAnswerData
      this.QuestionsViewsCase = response.data.QuestionsViewsData

    })
    .catch(e => {
      this.errors.push(e)
    })

    }
  }
</script>

