<template>
<div>
<v-container>
 <v-layout row wrap>
 <v-flex xs6><h2>User saved post</h2></v-flex>
 <v-flex xs6>
 </v-flex>
 </v-layout>
   <v-layout>
          <v-container>
            <v-card> 
              <v-card-title>Saved post list...<v-spacer></v-spacer><v-text-field v-model="search" class="datatable_search" append-icon="search" label="Search"  ></v-text-field></v-card-title>
              <v-data-table :headers="headers" :items="userSavedPost" :search="search" :rows-per-page-items="[50, 100, 150]" :pagination.sync="pagination" >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{props.item.posterdetail[0].firstname}} {{props.item.posterdetail[0].lastname}}</td>
                   <td class="text-xs-left">{{props.item.saverdetail.firstname}} {{props.item.saverdetail.lastname}}</td>
                    <td class="text-xs-left">{{ props.item.created_at | createDate  }}</td>
                </template>
              </v-data-table>
            </v-card>
          </v-container>
    </v-layout>
   </v-container>
</div>
</template>
<script>
var dateFormat = require('dateformat');
import axios from 'axios';
  export default {
   data() {
    return {
    pagination: {
      rowsPerPage: 100
      },
     userSavedPost:[],
     search:"",
     headers: [
        {
          text: 'Posted by',
          align: 'left',
          value: 'posterdetail[0].firstname',
          sortable: true
        },
        { text: 'Saved By', value: 'saverdetail.firstname', sortable: false},
        { text: 'Saved Date', value: 'created_at', sortable: false}
      ],
    }
  },
    methods: {
    },

    created() {
        axios.post(`/getusersavedpost`).then(response => {
          console.log('custom response', response.data)
            this.userSavedPost = response.data
            if(response){
            console.log("have access");
            } else {
            console.log("don't have access");
            this.$router.push('/')
            }
        })
    },
}
</script>