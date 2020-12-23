<template>
  <v-container>
    <div class="row">
    <div class="createquestion">
      <div class="col-md-7 col-md-offset-3">
      <p class="left_heading col-md-12"><img src="../assets/icons/question-square-solid_green.svg" class="ques_icon" />Edit a policy 123 </p>
      <div >
        <div class="question_fields col-md-12">
          <label>Policy version</label>
          <select class="col-md-12 qus_one animated infinite bounce delay-2s" v-model="policyversion">
            <option :value="newversion">New Version</option>
            <option :value="pversion">v.{{pversion}}</option>
          </select>
        </div><!---policy type--->

        <div class="question_fields col-md-12">
          <label>Policy Type</label>
          <input type="hidden" v-model="policytypesid" class="q_title" value="policytypesid" readonly="">
          <input type="text" v-model="policytypes" class="q_title" value="policytypes" readonly="">
        </div><!---policy type--->

        <div class="question_fields col-md-12">
          <label>Policy Title</label>
          <input type="text" v-model="ptitle_text" class="q_title" value="ptitle_text" /> 
        </div><!---policy title--->

        <div class="question_fields col-md-12">
          <label>Policy Content Title</label>
          <input type="text" v-model="contitle_text" class="q_title" value="contitle_text" /> 
        </div><!---policy content title--->

        <div class="question_fields col-md-12">
          <label>Policy content</label>
          <tinymce v-bind:id="`policy_content`" v-model="policy_content" v-bind:key="`policy_content`" :other_options="spelloptions"></tinymce>
        </div><!---content text--->

      </div>
      <div class="col-md-12">
        <button v-if="policyversion==pversion" class="save_fields btn" @click="editPolicydata">Edit</button>
        <button v-else class="save_fields btn" @click="editPolicydata">Save</button>
      </div><!----save_fields---->
      </div>
    </div>
  </div>
    
  </v-container>
</template>
<script>
import moment from 'moment'
import tinymce from 'vue-tinymce-editor'
var datetime = new Date();
var username=localStorage.username;
import axios from 'axios';
export default 
{
  components: {tinymce},
  data() {
    return {
      policytypenames:[{"id":1,"name":"Privacy Policy"}, {"id":2,"name":"Terms of use"}],
      currentuser:'',
      idPolicy:[],
      policytypesid:null,
      policytypes:'',
      ptitle_text:'',
      policy_content:'',
      contitle_text:'',
      ptypename:'',
      pversion:1,
      policyversion:null,
      newversion:null,
      oldversion:null,
      errors:[],
      spelloptions:{browser_spellcheck: true}
    }
  },
  methods: 
  {
    getallpolicies()
    {
      axios.post(`/getallpolicies`)
      .then(response => {
        this.allpolicies = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    editPolicydata()
    {
        if(this.policyversion==this.oldversion)
        {
          console.log("********EDIT**********")
          axios.post(`/editpolicycontent`,{"pid":this.$route.params.id, "pversion":this.newversion, "policy_title":this.ptitle_text, "content_title":this.contitle_text, "content":this.policy_content})
          .then(response1 => 
          {
            console.log(response1.data);
            location.href='/manage_policies';
          }).catch(e => {
              this.errors.push(e)
            })
        }
        else
        {
          console.log("********SAVE**********")
          axios.post(`/savepolicycontent`,{"pversion":this.newversion, "type":this.policytypesid, "typename":this.policytypes, "policy_title":this.ptitle_text, "content_title":this.contitle_text, "content":this.policy_content, "loginid":this.currentuser})
          .then(response2 => 
          {
            console.log(response2.data);
            location.href='/manage_policies';
          }).catch(e => {
              this.errors.push(e)
            })
        }
        
    },
    changeStatus(id, active)
    {
      console.log(id)
      console.log(active)
      axios.post(`/changepolicystatus`,{"id":id, "active":active})
      .then(response => 
      {
          this.getallpolicies();
      }).catch(e => {
          this.errors.push(e)
        })
    },
    deletePolicy(uid)
    {
      if(confirm("Do you really want to delete this policy?"))
      {
        console.log(uid);
        axios.post(`/deletePolicy`,{'uid':uid})
        .then(response => {
          this.getallpolicies();
              // location.reload();
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    }
  },
  created() 
  {
      console.log('id=  ',this.$route.params.id)
      axios.post(`/getcurrentuser`,{'username':username})
      .then(response => {
        this.currentuser = response.data.unique_id
      })
      .catch(e => {
        this.errors.push(e)
      }),
      axios.post(`/getpolicybyid`,{"pid":this.$route.params.id})
      .then(response => 
      {
        this.idPolicy = response.data
        this.pversion = this.idPolicy.pversion
        this.newversion = this.idPolicy.pversion
        this.newversion++
        this.policytypesid = this.idPolicy.type
        this.policytypes = this.idPolicy.type_name
        this.ptitle_text = this.idPolicy.policy_title
        this.contitle_text = this.idPolicy.content_title
        this.policyversion = this.idPolicy.pversion
        this.oldversion = this.idPolicy.pversion
        this.policy_content = this.idPolicy.content
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>