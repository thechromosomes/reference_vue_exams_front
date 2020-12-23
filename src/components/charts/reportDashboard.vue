<template>
<div>
    <v-container>
        <div class="post_count_section">
          <span>Total saved post count : </span><span class="post_counter">{{totalSavedData2.totalPost}}</span>
        </div>
        <div class="post_count_section">
          <span>Total users whose saved posts : </span><span class="post_counter">{{totalSavedData2.totalUser}}</span>
        </div>
          <v-card>  
            <v-card-title>All saved post data 

                <v-spacer></v-spacer><v-text-field v-model="search" class="datatable_search" append-icon="search" label="Search" single-line hide-details ></v-text-field></v-card-title>
            <v-data-table :headers="headers" :items="totalSavedData" :search="search" :rows-per-page-items="[50, 100, 150]" :pagination.sync="pagination" >
               <template slot="items" slot-scope="props">
                 <td class="text-xs-left post_title_wrap" v-html="props.item.savedpost.searchcontent.replace(/<\/?[^>]+>/ig, '').substring(0,50)+'....'"></td>
                <td class="text-xs-left">{{datetostring(props.item.savedpost.created_at)}} </td>
                <td class="text-xs-left">{{props.item.userdetail.firstname}} {{props.item.userdetail.lastname}}</td> 
               
                <td class="text-xs-left" @click="show_savers(props.item._id.postid)">{{props.item.count}} <img src="../../assets/icons/eye.svg" class="fa_svg_icon"  /></td>
              </template> 
            </v-data-table>
          </v-card>
        </v-container>

        <template>
        <v-dialog v-model="postSaver" width="500" >
           <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >

        <div class="like_pop col-md-12">
</div>
          <span class="crosspopup" @click="postSaver=false">x</span>
        </v-card-title>
          

<div class="clearfix"></div>
<div v-for="item in postsavers" class="main_pop_wrapper">
<div class="pop_wrapper">
<div class="col-md-2 pop_user_outer">
<img :src="item.likebyuser.profile" class="pop_user">
</div>
<div class="col-md-8 pop_name_outer">
<p class="pop_name">{{item.likebyuser.firstname}} {{item.likebyuser.lastname}}</p>
</div>
</div>
<div class="clearfix"></div>
</div>
      </v-card>
        </v-dialog>
    </template>

</div>
</template>
<script>
const dateFormat = require('dateformat');
export default {
     data() {
         return {
        pagination: {
          rowsPerPage: 100
        },
            headers: [
          { text: 'Post title', align: 'left', value: '' },
          { text: 'Posted at', align: 'left', value: 'created_at' },
          { text: 'Posted by', align: 'left', value: 'userdetail.firstname' },
          { text: 'saved by ', align: 'left', value: 'count' },
        ],
        totalSavedData: [],
        totalSavedData2:[],
        postsavers:[],
        search: "",
        postSaver:false,

         }
     },
     methods: {
         datetostring(datetime){
            return dateFormat(datetime,"yyyy/mm/dd hh:MM:ss TT")
        },
        show_savers(postid){
            axios.post(`/getpostsavers`,{"postid":postid}).then(response => {
        if(response.data){
          this.postsavers = response.data
          this.postSaver = true
        }
      }).catch(err => {
         console.log("ERROR >>> ",err)        
      })
        }
     },
    created(){
        axios.post(`/reportdashboard`).then(response => {
        if(response.data){
          this.totalSavedData = response.data.postData;
          this.totalSavedData2 = response.data;

        }
      }).catch(err => {
         console.log("ERROR >>> ",err)        
      })
    }
}
</script>