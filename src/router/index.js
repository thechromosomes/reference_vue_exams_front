import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import dashboard from '@/components/dashboard'
import progressdashboard from '@/components/progressdashboard'
import userprogressdashboard from '@/components/userprogressdashboard'
import dashboard2 from '@/components/dashboard2'
import resources from '@/components/resources'
import resourcesnew from '@/components/resourcesnew'
import resourceschip from '@/components/resourceschip'
import Logout from '@/components/Logout'
import gpexlogin from '@/components/gpexlogin'
import gpexloginfromlearn from '@/components/gpexloginfromlearn'
import addcategory from '@/components/addcategory'
import addtag from '@/components/addtag'
import editslidersetting from '@/components/editslidersetting'
import defaultImage from '@/components/defaultImage'
import slidersetting from '@/components/slidersetting'
import createquestion from '@/components/createquestion'
import editquestion from '@/components/editquestion'
import kfpeditquestion from '@/components/kfpeditquestion'
import imageeditquestion from '@/components/imageeditquestion'
import caseeditquestion from '@/components/caseeditquestion'
import studenteditquestion from '@/components/studenteditquestion'
import addnewcasequestion from '@/components/addnewcasequestion'
import addnewstudentquestion from '@/components/addnewstudentquestion'
import questionanswer from '@/components/questionanswer'
import imageofweekanswer from '@/components/imageofweekanswer'
import SBAquestionanswer from '@/components/SBAquestionanswer'
import studentquestionanswer from '@/components/studentquestionanswer'
import userquestionanswer from '@/components/userquestionanswer'
import usercasequestionanswer from '@/components/usercasequestionanswer'
import userimagequestionanswer from '@/components/userimagequestionanswer'
import userstudentquestionanswer from '@/components/userstudentquestionanswer'
import studyplan from '@/components/studyplanmain'
import studyplandetail from '@/components/studyplandetail'
import imagelibrary from '@/components/imagelibrary'
import article from '@/components/article'
import notifications from '@/components/notifications'
import editarticle from '@/components/editarticle'
import articleview from '@/components/articleview'
import articlereport from '@/components/reports/articlereport'
import createpoll from '@/components/createpoll'
import newPoll from '@/components/newPoll'
import demotable from '@/components/demotable'
import addmodules from '@/components/addmodules'
import moduledetails from '@/components/moduledetails'
import editcategory from '@/components/editcategory'
import edittag from '@/components/edittag'
import editmodule from '@/components/editmodule'
import checkmail from '@/components/checkmail'
import onboarding from '@/components/onboarding'
import onboardsetting from '@/components/onboardsetting'
import addsummary from '@/components/addsummary'
import store from '../store/index'

// create user
import createUser from '../components/users/createUser'
// notification Template
import notificationTemplate from '../components/settings/sentMailNotification'
// Related Resources module
import resourceModule from '../components/resourceModule'
// user log report
import userLogReportDetail from '@/components/users/userLogReport'

import chats from '@/components/chat/chat'

import demohandson from '@/components/reports/demohandson'
import questionreport from '@/components/reports/questionreport'
import sbaanswerreport from '@/components/reports/sbaanswerreport'
import kfpanswerreport from '@/components/reports/kfpanswerreport'
import adminsbaanswerreport from '@/components/reports/adminsbaanswerreport' 
import adminkfpanswerreport from '@/components/reports/adminkfpanswerreport'
import admincaseanswerreport from '@/components/reports/admincaseanswerreport'
import questionanswerreport from '@/components/reports/questionanswerreport'
import kfpquestionanswerreport from '@/components/reports/kfpquestionanswerreport'
import casequestionanswerreport from '@/components/reports/casequestionanswerreport'
import studentquestionreport from '@/components/reports/studentquestionreport'
import myuserquestionreport from '@/components/reports/myuserquestionreport'
import articlevisitreport from '@/components/reports/articlevisitreport'
import kfpquestionvisitreport from '@/components/reports/kfpquestionvisitreport'
import casequestionvisitreport from '@/components/reports/casequestionvisitreport'
import sbaquestionvisitreport from '@/components/reports/sbaquestionvisitreport'
import kfpquestionreport from '@/components/reports/kfpquestionreport'
import casebasequestionreport from '@/components/reports/casebasequestionreport'
import userlogreport from '@/components/reports/userlogreport'
import imageoftheweekreport from '@/components/reports/imageoftheweekreport'
import imagequestionanswerreport from '@/components/reports/imagequestionanswerreport'
import imageoftheweekanswerreport from '@/components/reports/imageoftheweekanswerreport'
import imageoftheweekvisitreport from '@/components/reports/imageoftheweekvisitreport'
import studentquestionanswerreport from '@/components/reports/studentquestionanswerreport'
import studentquestionvisitreport from '@/components/reports/studentquestionvisitreport'

import userlist from '@/components/users/userlist'
import caseofweekanswer from '@/components/caseofweekanswer'
import editlistuser from '@/components/users/editlistuser'

import addnotificationtemplate from '@/components/settings/addnotificationtemplate'
import editnotificationtemplate from '@/components/settings/editnotificationtemplate'
import privacypolicy from '@/components/privacypolicy'
import addcapabilitylable from '@/components/addcapabilitylable'
import notificationsetting from '@/components/notificationsetting'
import manage_policies from '@/components/manage_policies'
import editPolicy from '@/components/editPolicy'

import mcqcomp_chart from '@/components/mcqchart/mcqcomp_chart'
import demochart from '@/components/charts/activeuserschart'
import getUserSavedPost from '@/components/reports/getusersavedpost'
import acceptpolicesreport from '@/components/reports/acceptpolicesreport'

// my custom dashboard
import myCustomDashboard from '@/components/myCustomDashboard'

// import all post report
import allPostsReport from '@/components/reports/allPostsReport'
// send mail report 
import sendLinkReport from '@/components/reports/sendLinkReport'
// app user log report
import appUserLog from '@/components/reports/appUserLog'

// view post data in seprate page
import postView from '../components/postView'


Vue.use(Router)
const router=new Router({
  mode: 'history',
 // export default new Router({
  routes: [
    // my custom dashboard
    {
      path: '/mycustomdashboard',
      name: 'myCustomDashboard',
      component: myCustomDashboard
    },
    {
      path: '/',
      name: 'Feed',
      component: dashboard
    },
    {
      path: '/demochart',
      name: 'demochart',
      component: demochart
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: progressdashboard
    },
    {
      path: '/userdashboard',
      name: 'User Dashboard',
      component: userprogressdashboard
    },
    {
      path: '/dashboard2',
      name: 'Dashboard2',
      component: dashboard2
    },
    {
      path: '/onboarding',
      name: 'Onboarding',
      component: onboarding
    },
    {
      path: '/onboardsetting',
      name: 'onboardsetting',
      component: onboardsetting
    },
    
    {
      path: '/resourcesnew',
      name: 'Recources',
      component: resourcesnew

    },
    {
      path: '/resources',
      name: 'Recources New',
      component: resources

    },
    
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
     {
      path: '/gpexlogin',
      name: 'gpexlogin',
      component: gpexlogin
    },
    {
      path: '/gpexloginfromlearn',
      name: 'gpexloginfromlearn',
      component: gpexloginfromlearn
    },
    {
      path: '/addsubtopic',
      name: 'Add Tag',
      component: addtag
    },
    {
      path: '/addtopic',
      name: 'Add Category',
      component: addcategory
    },
    {
      path: '/defaultImage',
      name: 'Default Image',
      component: defaultImage
    },
    {
      path: '/slidersetting',
      name: 'Slider Setting',
      component: slidersetting
    },
    {
      path: '/createquestion',
      name: 'Create Question',
      component: createquestion
    },

    {
      path: '/questionanswer',
      name: 'Question Answer ',
      component: questionanswer
    },
    {
      path: '/imageofweekanswer',
      name: 'Image of Week Question Answer ',
      component: imageofweekanswer
    },
    {
      path: '/sbaquestionanswer',
      name: 'SBA Question Answer ',
      component: SBAquestionanswer
    },
    {
      path: '/userquestionanswer',
      name: 'User Question Answer ',
      component: userquestionanswer
    },
    {
      path: '/usercasequestionanswer',
      name: 'User Case Question Answer',
      component: usercasequestionanswer
    },
    {
      path: '/userimagequestionanswer',
      name: 'User Image Question Answer',
      component: userimagequestionanswer
    },
    {
      path: '/userstudentquestionanswer',
      name: 'User Student Question Answer',
      component: userstudentquestionanswer
    },
    
    {
      path: '/studyplan',
      name: 'Study plan',
      component: studyplan
    },
    {
      path: '/checkmail',
      name: 'Check Mail',
      component: checkmail
    },
    {
      path: '/studyplandetail/:id',
      name: 'Study plan Detail',
      component: studyplandetail
    },
    {
      path: '/imagelibrary',
      name: 'Image Library',
      component: imagelibrary
    },
    {
      path: '/article',
      name: 'Article',
      component: article
    },
    {
      path: '/articleview',
      name: 'Article AnswerSheet',
      component: articleview
    },
    {
      path: '/articlereport',
      name: 'Article Report',
      component: articlereport
    },
    {
      path: '/editarticle',
      name: 'Edit Article',
      component: editarticle
    },
    {
      path: '/demotable',
      name: 'Demo Table',
      component: demotable
    },
    {path: '/poll',
    name: 'Create Poll',
    component: createpoll
  },
  {path: '/newPoll',
    name: 'New Poll',
    component: newPoll
  },
{path: '/addmodules',
    name: 'Add modules',
    component: addmodules
  },
  {path: '/questionreport',
    name: 'Question Report',
    component: questionreport
  },
  {path: '/sbaanswerreport',
  name: 'SBA Answer Report',
  component: sbaanswerreport
},
{path: '/kfpanswerreport',
name: 'KFP Answer Report',
component: kfpanswerreport
},
{path: '/adminsbaanswerreport',
name: 'Admin SBA Answer Report',
component: adminsbaanswerreport
},
{
  path: '/adminkfpanswerreport',
  name: 'Admin KFP Answer Report',
  component: adminkfpanswerreport
},
{
  path: '/admincaseanswerreport',
  name: 'Admin CASE Answer Report',
  component: admincaseanswerreport
},
  {path: '/questionanswerreport',
    name: 'Question Answer Report',
    component: questionanswerreport
  },
  {
    path: '/kfpquestionanswerreport',
    name: 'Answer Report',
    component: kfpquestionanswerreport
  },
  {
    path: '/casequestionanswerreport',
    name: 'Case Answer Report',
    component: casequestionanswerreport
  },
  {
    path: '/studentquestionreport',
    name: 'Student Answer Report',
    component: studentquestionreport
  },
  {
    path: '/myuserquestionreport',
    name: 'My Question Report',
    component: myuserquestionreport
  },

  {path: '/articlevisitreport',
    name: 'Article Views Report',
    component: articlevisitreport
  },
  {path: '/userlogreport',
    name: 'User Log Report',
    component: userlogreport
  },
  {path: '/imageoftheweekreport',
    name: 'Image of week Report',
    component: imageoftheweekreport
  },
  {path: '/imagequestionanswerreport',
    name: 'Image of week question answer Report',
    component: imagequestionanswerreport
  },
  {path: '/imageoftheweekvisitreport',
    name: 'Image of week visit Report',
    component: imageoftheweekvisitreport
  },
  {path: '/imageoftheweekanswerreport',
    name: 'Image of week answer Report',
    component: imageoftheweekanswerreport
  },
  {path: '/studentquestionvisitreport',
    name: 'Student Questin Visit Report',
    component: studentquestionvisitreport
  },
  {path: '/studentquestionanswerreport',
    name: 'Student Questin Answer Report',
    component: studentquestionanswerreport
  },
  {path: '/kfpquestionvisitreport',
    name: 'Question Views Report',
    component: kfpquestionvisitreport
  },
  {path: '/casequestionvisitreport',
    name: 'Case Question Views Report',
    component: casequestionvisitreport
  },
  {path: '/sbaquestionvisitreport',
  name: 'SBA Question Views Report',
  component: sbaquestionvisitreport
},
  {path: '/kfpquestionreport',
  name: 'KFP Question Report',
  component: kfpquestionreport
},  {path: '/casebasequestionreport',
name: 'Case Base Question Report',
component: casebasequestionreport
},
  {path: '/editquestion',
    name: 'Edit Question',
    component: editquestion
  },
  {path: '/kfpeditquestion',
    name: 'KFP Edit Question',
    component: kfpeditquestion
  },
  {path: '/imageeditquestion',
    name: 'Image of week Edit Question',
    component: imageeditquestion
  },
  {path: '/caseeditquestion',
    name: 'Case Edit Question',
    component: caseeditquestion
  },
  {path: '/studenteditquestion',
    name: 'Student Edit Question',
    component: studenteditquestion
  },
  {path: '/addnewcasequestion',
    name: 'Add new Case Question',
    component: addnewcasequestion
  },
  {path: '/addnewstudentquestion',
    name: 'Add new Student Question',
    component: addnewstudentquestion
  },
  {path: '/moduledetails',
    name: 'Module details',
    component: moduledetails
  },
   {
      path: '/category/edit/:id',
      name: 'Edit Category',
      component: editcategory
    },
    {
      path: '/tags/edit/:id',
      name: 'Edit Tags',
      component: edittag
    },
     {
      path: '/module/edit/:id',
      name: 'Edit Capability',
      component: editmodule
    },
    {
     path: '/chats',
     name: 'Chat',
     component: chats
   },
   {
    path: '/userlist',
    name: 'User List',
    component: userlist
   },
   {
    path: '/editlistuser',
    name: 'Edit User',
    component: editlistuser
   },
   {
    path: '/notifications',
    name: 'Notifications',
    component: notifications
   },
   {
    path: '/caseofweekanswer',
    name: 'Case of Week',
    component: caseofweekanswer
   },
   {
    path: '/studentquestionanswer',
    name: 'Student Question',
    component: studentquestionanswer
   },
   {
    path: '/addnotificationtemplate',
    name: 'Add Template',
    component: addnotificationtemplate
   },
   {
    path: '/editnotificationtemplate',
    name: 'Edit Template',
    component: editnotificationtemplate
   },
   {
    path: '/privacypolicy',
    name: 'Privacy Policy',
    component: privacypolicy
   },
   {
    path: '/addcapabilitylable',
    name: 'Add Capability Lable',
    component: addcapabilitylable
   },
   {
    path: '/notificationsetting',
    name: 'Notification Setting',
    component: notificationsetting
   },
   {
    path: '/manage_policies',
    name: 'Manage policies',
    component: manage_policies
   },
   {
    path: '/editPolicy/:id',
    name: 'Edit Policy',
    component: editPolicy
   },
   {
      path: '/editslidersetting',
      name: 'Edit Slider Setting',
      component: editslidersetting
   },
   {
      path: '/mcqcomp_chart',
      name: 'MCQ Comp Chart',
      component: mcqcomp_chart
   },
   {
      path: '/resourceschip',
      name: 'Resources Chip',
      component: resourceschip
   },
  {
    path: '/getusersavedpost',
    name: 'user saved post',
    component: getUserSavedPost
  },
   {path: '/acceptpolicesreport',
    name: 'Accept Policy Report',
    component: acceptpolicesreport
  },
  {path: '/demohandson',
    name: 'Demo Hands One',
    component: demohandson
  },
  // create user
  {
    path: '/createuser',
    name: 'createUser' ,
    component: createUser
  },
  // notification template
  {
    path: '/notificationtemplate',
    name: 'notificationTemplate' ,
    component: notificationTemplate
  },
  {
    path: '/allpostsreport',
    name: 'allPostsReport' ,
    component: allPostsReport
  },
  {
    path: '/sendlinkreport',
    name: 'sendLinkReport' ,
    component: sendLinkReport
  },
  {
    path: '/addsummary',
    name: 'addsummary' ,
    component: addsummary
    },
    {
      path: '/appuserlog',
      name: 'appUserLog' ,
      component: appUserLog
    },
    {
      path: '/resourcemodule',
      name: 'resourceModule' ,
      component: resourceModule
    },

    {
      path: '/userlogreportdetail',
      name: 'userLogReportDetail' ,
      component: userLogReportDetail
      },

      {
        path: '/postview',
        name: 'postView' ,
        component: postView
        },
  
  ]
});

const openRoutes=['Login','Signup','gpexlogin','gpexloginfromlearn','Privacy Policy'];

router.beforeEach((to, from, next) => {
    
    if(openRoutes.includes(to.name)  ){
      next()
    } else if (store.getters.isAuthenticated){
      next()
    }else{
      next('/login')
    }

})
export default router
