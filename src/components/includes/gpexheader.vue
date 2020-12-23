<template>
 <div class="navigationclass header" v-if="currentuser.firstname && cururl!='/onboarding'">
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header col-md-3">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/"><img src="../../assets/icons/gpex-logo.png" alt="" class="logo_header img img-responsive"></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">





<ul class="nav navbar-nav main_navigation col-md-6">

<a href="/">
<!-- <li class="hovering_effect">
<img src="../../assets/icons/window-light_header.svg" class="menu_image">
<img src="../../assets/icons/window-light_hover.svg" class="menu_image_hover">
Community</li> -->
  <li v-if="cururl=='/'">
    <img src="../../assets/icons/window-light_hover.svg" class="menu_image">
    <img src="../../assets/icons/window-light_hover.svg" class="menu_image_hover">Community
  </li>
  <li v-if="cururl!='/'">
    <img src="../../assets/icons/window-light_header.svg" class="menu_image">
    <img src="../../assets/icons/window-light_hover.svg" class="menu_image_hover">Community
  </li>
</a>

<a href="/resources">
  <li v-if="cururl=='/resources' " >
    <img src="../../assets/icons/resources-selected_hover.svg" class="menu_image">
    <img src="../../assets/icons/resources-selected_hover.svg" class="menu_image_hover">Resources
  </li>
  <li v-if="cururl !='/resources' ">
    <img src="../../assets/icons/resources-normal_header.svg" class="menu_image">
    <img src="../../assets/icons/resources-selected_hover.svg" class="menu_image_hover">Resources
  </li>
</a>

<!-- <a href="/studyplan">
  <li v-if="cururl =='/studyplan' ">
    <img src="../../assets/icons/studyplan_hover.svg" class="menu_image">
    <img src="../../assets/icons/studyplan_hover.svg" class="menu_image_hover">Study Plan
  </li>
  <li v-if="cururl !='/studyplan' ">
    <img src="../../assets/icons/studyplan-normal_header.svg" class="menu_image">
    <img src="../../assets/icons/studyplan_hover.svg" class="menu_image_hover">Study Plan
  </li>
</a> -->

<!-- for user dashboard -->
<a href="/userdashboard" v-if="menuLabels.length>0 && menuLabels[3].rolevalue.indexOf(currentuser.role) >= 0">
  <li v-if="cururl =='/userdashboard'">
    <img src="../../assets/icons/report.png" class="menu_image">
    <img src="../../assets/icons/report.png" class="menu_image_hover">User Report
  </li>
  <li v-if="cururl !='/userdashboard'">
    <img src="../../assets/icons/report.png" class="menu_image">
    <img src="../../assets/icons/report.png" class="menu_image_hover">User Report
  </li>
</a>

<a href="/notifications" class="notific_count"> <span class="notific_counter" v-if="notifications.length>0"> {{notifications.length}} </span>
  <li v-if="cururl =='/notifications' ">
    <img src="../../assets/icons/notification_hover.svg" class="menu_image">
    <img src="../../assets/icons/notification_hover.svg" class="menu_image_hover">Notifications
  </li>
   <li v-if="cururl !='/notifications' ">
    <img src="../../assets/icons/notification-normal_header.svg" class="menu_image">
    <img src="../../assets/icons/notification_hover.svg" class="menu_image_hover">Notifications
  </li>
</a>

</ul>
<!-- <span v-if="adminLabel.indexOf(currentuser.role) >= 0"> label</span> -->

<ul class="navbar-right">
   <li class="dropdown report_drop" v-if="menuLabels.length>0 && menuLabels[2].rolevalue.indexOf(currentuser.role) >= 0" ><a href="#">Reports</a>
   <ul class="dropdown-content dropdown-content_logout dropcontent_admin">
      <li><a href="/dashboard" class="dropdown-item">Reports Dashboard</a></li>
      <li><a href="/userdashboard" class="dropdown-item">User Reports Dashboard</a></li>
      <li><a href="/adminsbaanswerreport" class="dropdown-item">User report - SBA</a></li>
      <li><a href="/adminkfpanswerreport" class="dropdown-item">User report - KFP</a></li>
      <li><a href="/admincaseanswerreport" class="dropdown-item">User report - CASE</a></li>
      <li><a href="/userlogreport" class="dropdown-item">User logs</a></li>
      <li><a href="/acceptpolicesreport" class="dropdown-item">Accepted Policy Report</a></li>
      <li><a href="/sendlinkreport" class="dropdown-item">sent link report</a></li>
      <li><a href="/appuserlog" class="dropdown-item">App user report</a></li>



</ul>
   </li>
        <li class="dropdown admin_drop" v-if="menuLabels.length>0 && menuLabels[0].rolevalue.indexOf(currentuser.role) >= 0" ><a href="#">Administration</a>
        <ul class="dropdown-content dropdown-content_logout dropcontent_admin">
        <li><a href="/addsubtopic" class="dropdown-item">Add Sub-Topic</a></li>
        <li><a href="/addtopic" class="dropdown-item">Add Topic</a></li>

<li class="dropdown1"><a href="#" class="dropdown-item dropbtn1">Capability</a>
  <ul class="dropdown-content1">
    <li><a href="/addmodules" class="dropdown-item">Add Capability</a></li>
    <li><a href="/addcapabilitylable" class="dropdown-item">Add Capability level</a></li>
    <li><a href="/moduledetails" class="dropdown-item">Capability Management</a></li>
  </ul>
</li>



 <li class="dropdown1"><a href="#" class="dropdown-item dropbtn1">User</a>
<ul class="dropdown-content1">
  <li><a href="/createuser" class="dropdown-item">Create User</a></li>
<li><a href="/userlist" class="dropdown-item">User List</a></li>
</ul>

 </li>
  <li class="dropdown1"><a href="#" class="dropdown-item dropbtn1">Article</a>
<ul class="dropdown-content1">
<li><a href="/article" class="dropdown-item">Create Article</a></li>
<li><a href="/articlereport" class="dropdown-item">Article Report</a></li>
</ul>

 </li>
 <li class="dropdown1"><a href="#" class="dropdown-item dropbtn1">Question Bank</a>
<ul class="dropdown-content1">
<li><a href="/createquestion" class="dropdown-item">Create Question</a></li>
<li><a href="/questionreport" class="dropdown-item">SBA/MCQ Question Bank</a></li>
 <li><a href="/kfpquestionreport" class="dropdown-item">KFP Question Bank</a></li>
 <li><a href="/casebasequestionreport" class="dropdown-item">CASE Question Bank</a></li>
 <li><a href="/imageoftheweekreport" class="dropdown-item">Image Question Bank</a></li>
 <li><a href="/studentquestionreport" class="dropdown-item">User Question Bank</a></li>
</ul>

 </li>

  <li class="dropdown1"><a href="#" class="dropdown-item dropbtn1">Settings</a>
<ul class="dropdown-content1">
<li><a href="/addnotificationtemplate" class="dropdown-item">Notification Template</a></li>
<li><a href="/onboardsetting" class="dropdown-item">OnBoard Setting</a></li>
<li><a href="/notificationsetting" class="dropdown-item">Clear Notification</a></li>

<li><a href="/defaultimage" class="dropdown-item">Default Image</a></li>
<li><a href="/imagelibrary" class="dropdown-item">Image Library</a></li>
<li><a href="/slidersetting" class="dropdown-item">Slider Setting</a></li>
<li><a href="/manage_policies" class="dropdown-item">Manage Policies</a></li>
<li><a href="/mcqcomp_chart" class="dropdown-item">MCQ Comparison Chart</a></li>
<li><a href="/notificationtemplate" class="dropdown-item">Notifaication template</a></li>

</ul>

 </li>
<li><a href="/allpostsreport" class="dropdown-item">All resource setting</a></li>




        </ul>
        </li>
        <li class="john_name dropdown" v-if="currentuser.firstname"><a href="#" id="UniqueuserName">{{currentuser.firstname}} {{currentuser.lastname}}</a><img :src="currentuser.profile" class="circle_image">

        <ul class="dropdown-content dropdown-content_logout">
          <li class="qrcodes"><a href="https://one.gpex.com.au/getqrcode">QR Code Login</a></li>
          <li class="qrcodes"><a href="/myuserquestionreport">My Questions</a></li>
          <li><a href="logout" class="">Logout</a></li>
          </ul>
        </li>
      </ul>

    </div>
<!-- ***************************************************************************************************************************** -->
  <div v-if="acceptpolicy==true" >
    <v-dialog v-model="acceptpolicy" persistent width="700">
      <v-card class="policy_class">
        <div class="">
          <v-card-text v-html="policycontent.policy_title"></v-card-text>
          <v-card-text v-html="policycontent.content_title"></v-card-text>
          <v-card-text v-html="policycontent.content"></v-card-text>
        </div>
        <v-card-actions >
          <v-spacer></v-spacer>
          <v-btn color="btn q_prvw_sbmtbtn" @click="newAcceptPolicy(policycontent.unique_id, policycontent.type)">Agree</v-btn>
          <a href="mailto:support@gpex.com.au?subject=GPEx Exams Cookie Policy"><v-btn color="btn q_prvw_sbmtbtn">Contact Support</v-btn></a>
          <!-- <v-btn color="btn q_prvw_sbmtbtn" @click="SaveContactsupport(policycontent.unique_id)">Contact Support</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

<!-- ***************************************************************************************************************************** -->

  <!-- <div v-if="CS_dialog==true" >
    <v-dialog  v-model="CS_dialog" persistent width="700">
      <v-card class="policy_class">
      	<v-card-title class="headline grey lighten-2" primary-title>
          Contact support <span class="crosspopup cp_scheduler" @click="CS_dialog=false">x</span>
        </v-card-title>
        <div class="post_context">
        <v-card-text>
          <textarea class="post_input" v-model="mailContent" placeholder="write a request here..." :autofocus="'autofocus'"></textarea>
        </v-card-text>
        </div>
        <v-card-actions >
          <v-spacer></v-spacer>
          <v-btn color="btn q_prvw_sbmtbtn" @click="SaveContactsupport">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div> -->

<!-- ***************************************************************************************************************************** -->
  </div>
</nav>

<!-- for back button -->
  <div v-if="cururl!=='/'">
     <button type="button" @click="goBack" class="back_button submit_btn btn" >Back</button>
  </div>

</div>
</template>
<script>
var username=localStorage.username;
import axios from 'axios';
export default {
     ready() {
        window.setInterval(() => {
            this.countDown();
        },1000);
    },
    data() {
      return {
        currentuser: [],
        menuLabels: '',
        errors: [],
        notifications:[],
        pathname:'',
        cururl:'',
        acceptpolicy:false,
        CS_dialog :false,
        policycontent : [],
        privacypolicyid : null,
        mailContent : "",
        userAcceptPolicy:0,
        currdate : null,
        lastlogin : null
      }
    },
    methods:{
      getNotifications()
      {
        axios.post(`/getunseennotification`,{"userid":this.currentuser.unique_id})
        .then(response =>
        {
          this.notifications=response.data;
        // console.log('length:',this.notifications)
        }).catch(e => {
          this.errors.push(e)
          })
      },
      newAcceptPolicy(uid,ptype)
      {
          console.log('accept')
          axios.post(`/saveuseraccept`,{"policy_id":uid, "accepted":1, "userid":this.currentuser.unique_id, "type":ptype})
          .then(getuserresponse =>
          {
            if(getuserresponse.data.accepted==1)
            {
              // this.acceptpolicy=false;
              // this.userAcceptPolicy=1;
              location.href='/';
            }
          }).catch(e => {
              this.errors.push(e)
            })
      },
      // contactSupport(id)
      // {
      //     this.CS_dialog=true;
      //     this.privacypolicyid=id;
      // },
      SaveContactsupport(policyid)
      {
      	console.log(this.currentuser.unique_id)
        console.log(policyid)
        axios.post(`/saveusercontactsupport`,{"policy_id":policyid, "userid":this.currentuser.unique_id})
        .then(response =>
        {
          if(response)
          {
            axios.post(`/sendContactsupportmail`,{"userid":this.currentuser.unique_id})
            .then(responsemail =>
            {
                 console.log("mail functionality is successful")
            });
          }
        });
      },

      goBack(){
        window.history.go(-1);
      }

    },
    mounted()
    {
      console.log("current date-", Date.now());
      this.currdate = Date.now();
      this.cururl=window.location.pathname;

      axios.post(`/getcurrentuser`,{'username':username})
      .then(response =>
      {
        this.currentuser = response.data
        localStorage.UserFullName = response.data.firstname + " " + response.data.lastname
        axios.post(`/getpolicycontent`,{"loginid":this.currentuser.unique_id})  //api to get policy data
        .then(policyresponse =>
        {
          if(policyresponse.data.length > 0)
          {
            console.log("policy data is here");
              this.policycontent=policyresponse.data[0]
              this.acceptpolicy=true;
                  // console.log("logindate : ", getloginresponse.data)
                      // console.log(" else if 1")
                      // this.userAcceptPolicy=0;
          }
          else
          {
            console.log("no policy data");
            this.acceptpolicy=false;
            axios.post(`/getunseennotification`,{"userid":this.currentuser.unique_id})
            .then(responsenoti =>
            {
              this.notifications=responsenoti.data;
            }).catch(e => {
                this.errors.push(e)
              })
          }
        })

      }).catch(e => {
          this.errors.push(e)
        }),
      axios.post(`/getmodulelabels`,{"moduleid":"5da8145235165c15353ba26c"})
      .then(response => {
        this.menuLabels=response.data;
        // this.adminLabel=this.menuLabels[0].rolevalue;
        // console.log('ad-',this.adminLabel);
      })
      .catch(e => {
        this.errors.push(e)
      })

    },
    // mounted: function () {
    //   window.setInterval(() => {
    //     this.getNotifications();
    //   }, 1000)
    // }
}
</script>
<style rel="stylesheet/stylus">
.back_button {
    position: absolute;
    display: block;
}
</style>