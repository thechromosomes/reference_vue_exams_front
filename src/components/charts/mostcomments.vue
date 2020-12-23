<template>
      <v-card class="clearqstnrprts last_hide" >
        <v-card-title>
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
          :items="mostcomments"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
          class="mostcomments"
        >
          <template  slot="items" slot-scope="props">
            <td v-if="props.item.quesdetail">{{ props.item.quesdetail.q_title }}</td>
            <td v-else>{{ props.item.postdetail.searchcontent }}</td>
            <td>{{ props.item.usersdetail.firstname+' '+props.item.usersdetail.lastname}}</td>
            <td>{{ props.item.postdetail.posted_at | createDate}}</td>
            <td v-if="props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d9'"><a :href="`/questionanswer?id=${props.item.postdetail.questionid}`" class="answer_link" target="_blank" title="View">{{props.item.count}} </a></td>           
            <td v-if="props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d10'"><a :href="`/SBAquestionanswer?id=${props.item.postdetail.questionid}`" class="answer_link" target="_blank" title="View">{{props.item.count}} </a></td>           
            <td v-if="props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d14'"><a :href="`/caseofweekanswer?id=${props.item.postdetail.questionid}`" class="answer_link" target="_blank" title="View">{{props.item.count}} </a></td>           
            <td v-if="props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d15'"><a :href="`/imageofweekanswer?id=${props.item.postdetail.questionid}`" class="answer_link" target="_blank" title="View">{{props.item.count}} </a></td>           
            <td v-if="props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d11' || props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d12' ||props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d13'"><a :href="`/`" class="answer_link" target="_blank" title="View">{{props.item.count}} </a></td>
             <td v-if="props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d9'"><a :href="`/questionanswer?id=${props.item.postdetail.questionid}`" class="answer_link" target="_blank" title="View"> <img src="../../assets/icons/eye.svg" class="fa_svg_icon"  /> </a></td>           
            <td v-if="props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d10'"><a :href="`/SBAquestionanswer?id=${props.item.postdetail.questionid}`" class="answer_link" target="_blank" title="View"> <img src="../../assets/icons/eye.svg" class="fa_svg_icon"  /> </a></td>           
            <td v-if="props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d14'"><a :href="`/caseofweekanswer?id=${props.item.postdetail.questionid}`" class="answer_link" target="_blank" title="View"> <img src="../../assets/icons/eye.svg" class="fa_svg_icon"  /> </a></td>           
            <td v-if="props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d15'"><a :href="`/imageofweekanswer?id=${props.item.postdetail.questionid}`" class="answer_link" target="_blank" title="View"> <img src="../../assets/icons/eye.svg" class="fa_svg_icon"  /> </a></td>           
            <td v-if="props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d11' || props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d12' ||props.item.quesdetail.questiontype=='5d15fea98edfed6c417592d13'"><a :href="`/`" class="answer_link" target="_blank" title="View"> <img src="../../assets/icons/eye.svg" class="fa_svg_icon"  /> </a></td>            
          </template>
          <template slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>       
      </v-card>
</template>

<script>


export default {
  props: ['charttype'],
  data: () => ({
    loaded: false,
         search: '',
        pagination: {
        rowsPerPage: 10,
        descending: true,
        sortBy: 'count'
      },
        headers: [
          {text: 'Post title', align: 'left', sortable: true, value: '' },
          {text: 'Posted By', align: 'left', sortable: true, value: 'usersdetail.firstname' },
          {text: 'Posted At', align: 'left', sortable: false, value: '' },
          {text: 'Comments Count', align: 'left', sortable: true, value: 'count' },
          {text: 'View', align: 'left', sortable: false, value: '' }
          
        ],
        mostcomments: []
  }),
  methods:{
    async loaddata(){
          this.loaded = false
    try {
if(this.charttype==0){
     await axios.post(`/getmostcomments`,{'userid':this.currentuser})
    .then(mostcomments => {
      // JSON responses are automatically parsed.
      console.log("most comments-",mostcomments.data)
  this.mostcomments=mostcomments.data;
    }).catch(e => {
      this.errors.push(e)
    })
}
      this.loaded = true

    } catch (e) {
      console.error(e)
    }
    }
  },
  mounted (){
    this.loaddata();
  },
watch: {
    // whenever question changes, this function will run
    charttype: function (newQuestion, oldQuestion) {
      //this.answer = 'Waiting for you to stop typing...'
      //this.debouncedGetAnswer()
      this.loaddata();
    }
  }
}
</script>