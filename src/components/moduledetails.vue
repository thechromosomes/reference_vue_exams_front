<template>
  <v-container moduledetails_section>
    <v-layout row wrap>
      <v-flex xs12><h2>Capability Management</h2></v-flex>
    </v-layout>
    <form>
<div class="form-group">
        <v-select @change="changedValue" :items="modules" label="Select Module" v-model="module" item-text="modulename" item-value="unique_id" required></v-select>
</div>
<div claan v-for="(capabilityvalue,capabilityindex) in capability" :key="capabilityindex"> 
<label class="tags_block"><span class="tag_icon"><img src="../assets/icons/tags-regular.svg" class="tag_width" /> </span>
{{capabilityvalue.lable_text}}
</label>

<i class="fas fa-sort-down dropdown_arrow"></i>
 <v-chip v-for="(selected_role,tagindex) in capabilityvalue.selected_roles" v-bind:key="`tag${capabilityindex}${tagindex}`"  close @input="removeselectedrole(capabilityindex,tagindex,1)" >{{selected_role.roletitle}}</v-chip>


<input type="text" class="domain_input col-md-12 bounce" v-model="capabilityvalue.roles" @keyup="searchroles(capabilityindex)" @keydown="activeflag=1" />

<ul class="drop_ul" v-if="capabilityvalue.visitflag==true">
<li v-for="(searched_role, index) in searched_roles" :key="index" @click="selectedroles(capabilityindex,searched_role)">{{searched_role.roletitle}}</li>
</ul>
</div>


 <div class="form-group">
        <input @click='savemodule' name="Add" type="button" value="Add" class="btn submit_btn" />
</div>
  </form>
   
  </v-container>
</template>
<script>
var username=localStorage.username;
import axios from 'axios';
  export default {
    data() {
  return {
    moduledataedit:"",
    currentuser:null,
    errors: [],
    modules:[],
    capability:[],
    unique_id:[],
    module:null,
    roles:[],
    allroles:[],
    indval:[],
    rolevalue:[],
    searched_roles:[],
    activeflag:0,
    selected_roles_id:[],
    capadd_role:[],
    selected_roles:null
      }
    },
  methods: {
 changedValue: function(value) {

 axios.post(`/getallcapabilitylable`,{'moduleid':value, 'userid':this.currentuser})
    .then(response => {
    this.capability = [];
    var i=0;
    for(i;i<response.data.length;i++){
     response.data[i].selected_roles= [ ];
     response.data[i].selected_roles_id=[];
     const this_role = response.data[i].rolevalue.split(",");
     
     console.log("this_role- ", this_role)
     this_role.forEach(element => {
       var found = this.allroles.find( role => role.roleid == element );
        if(found){
       console.log("found- ", found)
          response.data[i].selected_roles.push(found)
          response.data[i].selected_roles_id.push(found.roleid)
        }
     });
     response.data[i].visitflag=false;
    this.capability.push(response.data[i]);
    }
      console.log(response.data);
    })
    .catch(e => {
      this.errors.push(e)
    })







axios.post(`/getmodule`,{'modname':value,})
    .then(response => {  
    this.moduledataedit = response.data

axios.post('/getmoduleroles',{'id':this.moduledataedit[0].unique_id})
    .then(response => {
    console.log(capadd_role);
    this.capadd_role=response.data
    console.log(response.data);
    })
    .catch(e => {
    this.errors.push(e)
    })

    })
    .catch(e => {
    this.errors.push(e)
    })
  },
searchroles(indexid){
this.capability[indexid].visitflag=true;
axios.post(`/getroles`,{'searchedrole':this.roles})
    .then(response => {
    console.log(response);
    this.searched_roles = response.data
    });  
    },
selectedroles(index,data){
	this.capability[index].selected_roles.push(data);
	this.capability[index].visitflag=false;
	this.capability[index].selected_roles_id.push(data.roleid);
	// this.capability[index].selected_roles_ids.push(data._id);
	this.roles=null;
	this.selected_role=data.roleid;
	this.activeflag=0;
	console.log(data.unique_id);
    },
   
removeselectedrole(capabilityindex,indexid,type){
  if(type==1){
  this.capability[capabilityindex].selected_roles.splice(indexid, 1)
  this.capability[capabilityindex].selected_roles_id.splice(indexid, 1)
  this.capability[capabilityindex].selected_roles_ids.splice(indexid, 1)
  }
  },

savemodule(){
axios.post(`/savemodulecapacity`,{"createdby":this.currentuser,"unique_id":this.module,"roleid":this.selected_role,"cap_label":this.capability})
  .then(response => {
  var i=0;
  for(i;i<response.data.length;i++){
  response.data[i].selected_roles=[];
  response.data[i].selected_roles_id=[];
  response.data[i].selected_roles_ids=[];
  this.capability.push(response.data[i]);
  console.log(response.data);
  }
  location.reload();
  console.log(response.data);
  })
  .catch(e => {
      console.log(e);
  this.errors.push(e)
  })
  }
},
created() {
axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
    this.currentuser = response.data._id
    })
    .catch(e => {
      this.errors.push(e)
    }),

axios.get(`/getallmodules`)
    .then(response => {
      this.modules = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.post(`/getroles`,{'searchedrole':""})
    .then(response => {
    console.log(response);
    this.allroles = response.data
    });
  
}
}
</script>