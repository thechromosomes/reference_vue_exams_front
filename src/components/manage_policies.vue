<template>
  <v-container>
    <div class="row">
    <div class="createquestion">
      <div class="col-md-7 col-md-offset-3">
      <p class="left_heading col-md-12"><img src="../assets/icons/question-square-solid_green.svg" class="ques_icon" />Add a policy </p>
      <div >
        <div class="question_fields col-md-12">
          <label>Policy Type</label>
          <select class="col-md-12 qus_one animated infinite bounce delay-2s" v-model="policytypes">
            <option value="">Select Policy Type </option>  
            <option v-for="policytypename in policytypenames" :value="policytypename.id">{{policytypename.name}}</option>
          </select>
        </div><!---policy type--->

        <div class="question_fields col-md-12">
          <label>Policy Title</label>
          <input type="text" v-model="ptitle_text" class="q_title" /> 
        </div><!---policy title--->

        <div class="question_fields col-md-12">
          <label>Policy content</label>
          <tinymce v-bind:id="`policy_content`" v-model="policy_content" v-bind:key="`policy_content`" :other_options="spelloptions"></tinymce>
        </div><!---content text--->

      </div>
      <div class="col-md-12">
        <button class="save_fields btn" @click="savepolicy">Save</button>
      </div><!----save_fields---->
      </div>
    </div>
  </div>
  <hr>
    <div class="row">
    <template>
      <v-card>
        <v-card-title>
          Policies List
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="allpolicies"
          :search="search"
        >
          <template  slot="items" slot-scope="props">
            <td>{{ props.item.type_name }}</td>
            <td >{{ props.item.policy_title }}</td>
            <td >v.{{ props.item.pversion  }}</td>
            <td >
              <button v-if='props.item.active==1' class="btn" @click="changeStatus(props.item.unique_id,'0')">Active</button>
              <button v-else class="btn" @click="changeStatus(props.item.unique_id,'1')">Inactive</button>
            </td>
            <td>{{props.item.updated_at | createDate}}</td>
            <td>
              <a  :href="'/editPolicy/' + props.item.unique_id"><img src="../assets/icons/edit.svg" class="fa_svg_icon"/></a> 
              <img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" @click="deletePolicy(props.item.unique_id)" /> 
            </td>
          </template>
          <template slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </template>
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
      policytypenames:[{"id":1,"name":"Cookie Message"}, {"id":2,"name":"Privacy Policy"},{"id":3,"name":"Terms of use"}],
      currentuser:'',
      allpolicies:[],
      policytypes:'',
      ptitle_text:'',
      policy_content:'',
      // contitle_text:'',
      ptypename:'',
      pversion:1,
      errors:[],
      search: '',
      spelloptions:{browser_spellcheck: true},
      headers: [
          {text: 'Policy Type', align: 'left', sortable: true, value: 'type_name', },
          {text: 'Policy Title', align: 'left', sortable: true, value: 'policy_title', },
          { text: 'Version', align: 'left', sortable: true, value: 'pversion' },
          { text: 'Status', align: 'left', sortable: true, value: '' },
          { text: 'Modified Date', align: 'left', sortable: true, value: 'updated_at' },
          { text: 'Action', align: 'left', sortable: false, value: '' },
      ],
      desserts: [],
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
    savepolicy()
    {
        console.log(this.policytypes);
        var found = this.policytypenames.find( role => role.id == this.policytypes );
        console.log(found.name);
        console.log(this.ptitle_text);
        // console.log(this.contitle_text);
        console.log(this.policy_content);

        axios.post(`/savepolicycontent`,{"pversion":this.pversion, "type":this.policytypes, "typename":found.name, "policy_title":this.ptitle_text, "content":this.policy_content, "loginid":this.currentuser})
        .then(response => 
        {
          console.log(response.data);
          this.getallpolicies();
          this.policytypes='';
          this.ptitle_text='';
          this.policy_content='';
          // this.contitle_text='';
          this.ptypename='';
        }).catch(e => {
            this.errors.push(e)
          })
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
      axios.post(`/getcurrentuser`,{'username':username})
      .then(response => {
        this.currentuser = response.data.unique_id
      })
      .catch(e => {
        this.errors.push(e)
      }),
      axios.post(`/getallpolicies`)
      .then(response => {
        this.allpolicies = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>