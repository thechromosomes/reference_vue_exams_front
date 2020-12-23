<template>
  <v-container moduledetails_section>
    <v-layout row wrap>
      <v-flex xs12><h2>MCQ Comparison Chart</h2></v-flex>
    </v-layout>
    <form>
  <div class="question_fields col-md-12">
    <select class="col-md-12 qus_one animated infinite bounce delay-2s" v-model="module" @change="changedValue">
        <!-- <option value="">Users</option> -->
        <option  v-for="(user,index) in users" :key="index" :value="user.gpexid">{{user.firstname+' '+user.lastname}}</option>
    </select>
</div>
      <div v-if="noData == true">
        <h4> no data found by this user</h4>
      </div>
     <BarChart v-if="showchart == true" :width="1100" :chartdata="chartdata" :options="options"></BarChart>
  </form>
  </v-container>
</template>
<script>
var username = localStorage.username;
import axios from 'axios';
import horizontalchart from "../horizontalchart"; 
import BarChart from '../charts/BarChart';

  export default {
   components: {horizontalchart, BarChart},
    data() {
      return {
      moduledataedit:"",
      currentuser:null,
      errors: [],
      categories:[],
      totalgrades:[],
      mypercent:[],
      allgradepercent:[],
      modules:[],
      users:[],
      mcqchart:[],
      mcqchartdata:[],
      module:null,
      showchart : false,
      noData: false,
      chartdata:{labels: [],

        datasets: [{
          label: '',
          backgroundColor: '#e34856',
          data: []
        },{
          label: '',
          backgroundColor: '#64d0da',
          data: []
        },{
          label: '',
          backgroundColor: '#ffca5a',
          data: []
        }]
      },
      options:{
					responsive: true,
					title: {
						display: true,
					},
					tooltips: {
						mode: 'index',
						intersect: true
					},
					scales: {
						yAxes: [{
              type: 'linear', 
							display: true,
							position: 'left',
							id: 'y-axis-1',
						}],
					}
				},
           
     
      }
    },
  methods: {
 
  changedValue(){
    this.categories=[];
    this.showchart = false
    this.noData = false
    axios.post(`/getmcquser`,{"reg_id":this.module})
      .then(response => {
        if (response.data.length == 0){
          this.noData = true
        }
        this.mcqchartdata = response.data
        var i=0;
        var categories=[];
        var totalgrades=[];
        var mypercent=[];
        var allgradepercent=[];
        response.data.forEach(element => {
         categories.push(element.name);
         totalgrades.push(element.total_grades);
         mypercent.push(element.mypercent);
         allgradepercent.push(element.all_grade_percent);
        });

        var found = this.users.find( role => role.gpexid == this.module );

        this.chartdata.datasets[0].label = "My Peers";
        this.chartdata.datasets[0].data = totalgrades;

        this.chartdata.datasets[1].label = found.firstname+' '+found.lastname;
        this.chartdata.datasets[1].data = mypercent;

        this.chartdata.datasets[2].label = "All Registrars";
        this.chartdata.datasets[2].data = allgradepercent;

        this.chartdata.labels = categories;
        setTimeout(() => {
          this.showchart = true
        }, 1000);
      })
      .catch(e => {
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

      
    axios.post(`/getallusers`,{"loggedinuser":this.currentuser})
      .then(response => {
        this.users = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    
    axios.post(`/getallmcqcompchart`)
      .then(response => {
        this.mcqchart = response.data
      })
      .catch(e => {
        this.errors.push(e) 
      })
   
}
}
</script>