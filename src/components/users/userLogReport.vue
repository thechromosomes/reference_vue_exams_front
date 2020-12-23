<template>
  <v-container>
    <div class="row2"><h3>{{userDetail[0].firstname}} {{userDetail[0].lastname}}</h3></div>
    <div class="table-row">
      <table style="width: 65%;">
        <tr>
          <td>last login</td>
          <td> 
            <span>
            {{userDetail[0].lastlogin | createDatentime}}
           </span>
          </td>
        </tr>
        <tr>
          <td>last logout</td>
          <td> 
            <span>
            {{userDetail[0].lastLogOut | createDatentime}}
           </span>
          </td>
        </tr>
        <tr>
          <td>last addded post</td>
          <td> 
            <span v-if="userDetail[0].lastPost.length > 0">
            {{userDetail[0].lastPost[0].created_at | createDatentime}}
           </span>
            <span v-else>never</span>
          </td>
        </tr>
        <tr>
          <td>last added question</td>
          <td> 
            <span v-if="userDetail[0].lastQuestion.length > 0">{{userDetail[0].lastQuestion[0].created_at | createDatentime}}</span>
            <span v-else>never</span>
          </td>
        </tr>
        <tr>
          <td>last added article</td>
          <td> 
            <span v-if="userDetail[0].lastArticle.length > 0">{{userDetail[0].lastArticle[0].created_at | createDatentime}}</span>
            <span v-else>never</span>
          </td>
        </tr>
        <tr>
          <td>last edited Post</td>
          <td> 
            <span v-if="userDetail[0].lastPostEdited.length > 0">{{userDetail[0].lastPostEdited[0].updated_at | createDatentime}}</span>
            <span v-else>never</span>
          </td>
        </tr>
        <tr>
          <td>last edited question</td>
          <td>
            <span v-if="userDetail[0].lastQuestionEdited.length > 0">{{userDetail[0].lastQuestionEdited[0].updated_at | createDatentime}}</span>
            <span v-else>never</span>
          </td>
        </tr>
        <tr>
          <td>last edited article</td>
          <td>
            <span v-if="userDetail[0].lastArticleEdited.length > 0">{{userDetail[0].lastArticleEdited[0].updated_at | createDatentime}}</span>
            <span v-else>never</span>
          </td>
        </tr>
      </table>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            errors: [],
            userDetail: [],
            fileurl:window.publicfileurl,


        }
    },

    created() {
      let finalId = this.$route.query.id   
      axios.post(`/userlogreport`,{"userId":finalId})
      .then(response => {
        this.userDetail = response.data.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
}
</script>


<style lang="stylus">
  .row2{
    text-align: center;
  }
  .table-row{
    margin-left: 25%;
  }
  table, th, td {
    border: 1px solid grey;
    border-collapse: collapse;
    font-size: 20px;
    min-height: 400px;
  }
  th, td {
    padding: 5px;
    text-align: center;    
  }
</style>