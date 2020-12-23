<template>
  <v-container>
  <div class="col-md-8 col-md-offset-2">
  <div class="search_section_container" >
<input type="text" class="search_section" placeholder="Search" v-model="searchcontent" @keyup="searchnotification"></input>
<span class="search_bar"> <i class="fa fa-search searchic" aria-hidden="true"></i> </span>
</div>
	<div class="notifications_sections">
	<template v-for="notification in notifications">

		<div class="single_notifications " v-bind:class="{single_notification_read:notification.visited==false}" @click="visitnotification(notification._id)">
			<div class="single_notification_image">
       <template v-if="notification.notification_type!='studyplan_due' && notification.notification_type!='studyplan_reminder'"> 
       <template v-if="notification.asynccheck==true">
<img :src="fileurl+notification.dummyprofile">
       </template>
       <template v-else>
		<img :src="notification.userdetail.profile">
       </template>
       </template>
       <template v-else>
       <img src="../assets/icons/Studyplan-icon-notification.svg">  
       </template>
			

			</div>
      <template v-if="notification.weburl=='caseofweekanswer'">
      <a :href="`/${notification.weburl}?id=${notification.targetid}&subid=${notification.childtargetid}`" target="_blank">
      <div class="single-notification-text">
  <template v-if="notification.notification_type!='studyplan_due' && notification.notification_type!='studyplan_reminder'">
       <template v-if="notification.asynccheck==true">
			<div class="name_heading" v-if="notification.dummyname!==null && notification.dummyname!=''">{{notification.dummyname}}</div>
      <div class="name_heading" v-else>Anonymous</div>
      <div class="notification_dot_read" v-if="notification.visited==false"> </div>
       </template>
       <template v-else>
			<div class="name_heading">{{notification.userdetail.firstname+' '+notification.userdetail.lastname}}</div>
      <div class="notification_dot_read" v-if="notification.visited==false"> </div>
       </template>
</template>
<template v-else>
  	<div class="name_heading">Study Plan</div>
    <div class="notification_dot_read" v-if="notification.visited==false"> </div>
</template>

			<p v-html="notification.content">  </p>
			</div>
			<div class="notification_date_section">
			<p>{{ notification.publish_at | NotifyDatentime  }}</p> 
			</div>
</a>
      </template>
       <template v-else-if="notification.weburl!=''">
      <a :href="`/${notification.weburl}?id=${notification.targetid}`" target="_blank">
      <div class="single-notification-text">
    <template v-if="notification.notification_type!='studyplan_due' && notification.notification_type!='studyplan_reminder'">    
  <template v-if="notification.asynccheck==true">
			<div class="name_heading" v-if="notification.dummyname!==null && notification.dummyname!=''">{{notification.dummyname}}</div>
      <div class="name_heading" v-else>Anonymous</div>
      <div class="notification_dot_read" v-if="notification.visited==false"> </div>
       </template>
       <template v-else>
			<div class="name_heading">{{notification.userdetail.firstname+' '+notification.userdetail.lastname}}</div>
      <div class="notification_dot_read" v-if="notification.visited==false"> </div>
       </template>
       </template>
<template v-else>
  	<div class="name_heading">Study Plan</div>
    <div class="notification_dot_read" v-if="notification.visited==false"> </div>
</template>
       <p v-html="notification.content">  </p>
			</div>
			<div class="notification_date_section">
			<p>{{ notification.publish_at | NotifyDatentime  }}</p> 
			</div>
</a>
      </template>
      <template v-else>
      <a :href="`/#${notification.targetid}`" target="_blank">
      <div class="single-notification-text">
			<div class="name_heading">{{notification.userdetail.firstname+' '+notification.userdetail.lastname}}</div>
     <div class="notification_dot_read" v-if="notification.visited==false"> </div>
			<p v-html="notification.content">  </p>
      
			</div>
			<div class="notification_date_section">
			<p>{{ notification.publish_at | NotifyDatentime  }}</p> 
			</div>
</a>    </template>
<div class="cross_iocn_section cursoron">
			 <span @click="removenotification(notification._id)" title="Remove Notification"> X </span>
			</div>
		</div>

</template>

		<div class="clear_notification_section">
					<button class="clear_btn" @click="clearnotification"> Clear Notifications </button>

				</div>
	</div>
		
  </div>
  </v-container>
</template>
<script>
import tinymce from 'vue-tinymce-editor'
var username=localStorage.username;
  export default {
      components: {tinymce},
    data(){
       return {
        notifications:[],
        fileurl:window.publicfileurl,
        currentuser:null,
        currentuserdata:null,
        searchcontent:''
       
    }},
    methods:{
clearnotification(){
axios.post(`/clearnotifications`,{"userid":this.currentuser})
    .then(response => {
    this.updatenotification();
    })
    .catch(e => {
      this.errors.push(e)
    })
},
removenotification(id){
axios.post(`/removenotifications`,{'id':id})
    .then(response => {
this.updatenotification();
    })
    .catch(e => {
      this.errors.push(e)
    })
},
searchnotification(){
 axios.post(`/searchnotification`,{"userid":this.currentuser,"searched":this.searchcontent})
    .then(response => {
 this.notifications=response.data;
    })
    .catch(e => {
      this.errors.push(e)
    })
},
updatenotification(){
 axios.post(`/getnotifications`,{"userid":this.currentuser})
    .then(response => {
 this.notifications=response.data;
    })
    .catch(e => {
      this.errors.push(e)
    })
},
visitnotification(id)
{
  console.log('n-id',id)
  axios.post(`/notificationseen`,{"id":id})
    .then(response => {
    this.updatenotification()
    console.log(response.data)
    })
    .catch(e => {
      this.errors.push(e)
    })
}
    },
     created(){
       this.scurrenttime=Date.now();
this.masterquestion=this.$route.query.id
axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuser = response.data.unique_id
      this.currentuserdata = response.data
      axios.post(`/getnotifications`,{"userid":this.currentuser})
    .then(response => {
 this.notifications=response.data;
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

	