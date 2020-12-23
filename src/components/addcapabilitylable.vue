<template>
  <v-container moduledetails_section>
    <v-layout row wrap>
      <v-flex xs12><h2>Add Capability Level</h2></v-flex>
    </v-layout>
    <form>
  <div class="form-group">
        <v-select @change="changedValue" :items="modules" label="Select Module" v-model="module" item-text="modulename" item-value="unique_id" required></v-select>
  </div>

  <div class="form-group">
      <v-layout>
        <v-text-field v-model="addlable" label="Level Name" required ></v-text-field>
      </v-layout>
  </div>

  <div class="form-group">
        <input @click='createCapability' name="Add" type="button" value="Add" class="btn submit_btn" />
        <input name="Cancel" type="reset" class="btn cancel_btn" /> 
  </div>
  </form>
  <template>
    <v-card>
      <v-card-title>
          Capability Level List
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details ></v-text-field>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="capabilitydata"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination">
        <template  slot="items" slot-scope="props">
          <td>{{ props.item.lable_text }}</td>
          <td v-if="props.item.capabilitylables.length>0">{{ props.item.capabilitylables[0].modulename }}</td>
          <td v-else></td>
          <td class="text-xs-left">{{ props.item.created_at | createDate  }}</td>
          <!--<td><a  :href="'/capabilitydata/edit/' + props.item.unique_id"><img src="../assets/icons/edit.svg" class="fa_svg_icon"/></a>    
             <img src="../assets/icons/trash-alt.svg" class="fa_svg_icon"  @click="deleteTag(props.item.unique_id)" /></td> -->
        </template>
          <template slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
      </v-data-table>
    </v-card>
  </template>
   
  </v-container>
</template>
<script>
var dateFormat = require('dateformat');
var username=localStorage.username;
import axios from 'axios';
  export default {
    data() {
      return {
      moduledataedit:"",
      currentuser:null,
      roles:null,
      indval:[],
      errors: [],
      modules:[],
      addlable:[],
      capabilitydata:[],
      search: '',
      pagination: {
      rowsPerPage: 100
      },
      headers: [
      { text: 'Capability Name', align: 'left', sortable: true, value: 'lable_text'},
      { text: 'Capability Level Name', align: 'left', sortable: true, value: 'capabilitylables[0].modulename' },
      { text: 'Created at', align: 'left', sortable: true, value: 'created_at' },
      { value:'createdfilter' }
      ],
      module:[]
      }
    },
  methods: {

createCapability(){

axios.post('/createcapability',{module:this.module,createdby:this.currentuser,addlable:this.addlable})
        .then(response => {
         location.reload();
         console.log(response);
        })
        .catch(e => {
          this.errors.push(e)
        })
 
      },

 changedValue: function(value) {
  axios.post(`/getmodule`,{'modname':value})
    .then(response => {
      this.moduledataedit = response.data
  axios.post('/getmoduleroles',{'id':this.moduledataedit[0].cap_add})
    .then(response => {
      this.capadd_role=response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
axios.post('/getmoduleroles',{'id':this.moduledataedit[0].cap_edit})
    .then(response => {
      this.capedit_role=response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
axios.post('/getmoduleroles',{'id':this.moduledataedit[0].cap_delete})
    .then(response => {
      this.capdelete_role=response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
axios.post('/getmoduleroles',{'id':this.moduledataedit[0].cap_view})
    .then(response => {
      this.capview_role=response.data
    })
    .catch(e => {
      this.errors.push(e)
    })

    })
    .catch(e => {
      this.errors.push(e)
    })

  },
searchroles(){
  axios.post(`/getroles`,{'searchedrole':this.m_roles})
    .then(response => {
       console.log(response)
       // JSON responses are automatically parsed.
       this.searched_roles = response.data
       this.searched_edited = response.data
       this.searched_deleted = response.data
       this.searched_viewed = response.data
    });  
    },

savemodule(){

var arradd="" ;var arredit="";var arrdelete="";

 axios.post(`/savemodulecapacity`,{"cap_add":arradd,"cap_edit":arredit,"cap_delete":arrdelete,"cap_view":arrview,"createdby":this.currentuser,"unique_id":this.module})
    .then(response => {
     if(response){
     location.reload();}
    })
    .catch(e => {
       console.log(e);
      this.errors.push(e)
    })
  }
},
created(){
  axios.post(`/getcurrentuser`,{'username':username})
      .then(response => {
        // JSON responses are automatically parsed.
        this.currentuser = response.data._id
      })
      .catch(e => {
        this.errors.push(e)
      }),
  axios.get(`/getallmodules`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.modules = response.data
      })
      .catch(e => {
        this.errors.push(e)
      }),

  axios.get(`/getcapabilitylablelist`)
    .then(response => {
      // this.capabilitydata = response.data

      var i=0;
      for(i=0; i<=response.data.length; i++){
        response.data[i].createdfilter=dateFormat(response.data[i].created_at,"dd/mm/yyyy");
        this.capabilitydata.push(response.data[i]);
      }



      console.log(this.capabilitydata);
    })
    .catch(e => {
      this.errors.push(e)
    })


    
}
}


</script>