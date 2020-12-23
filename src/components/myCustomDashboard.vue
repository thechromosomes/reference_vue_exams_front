<template>
  <!-- <div class="container">
    <div v-if="errormessage!==null">{{errormessage}}</div>
    <template v-if="charttype==0">
    <line-chart
      v-if="loaded"
      :chartdata="chartdataforday"
      :options="options"/>
      </template>
            <template v-else>
        <line-chart
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"/>
      </template>
  <div>
    <br />
     <template v-if="charttype==0">
      <v-card class="clearqstnrprts last_hide" >
        <v-card-title>
          My custom User Report List
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
          :headers="headersforday"
          :items="lebellistdatas"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
          class="kfptable"
        >
          <template  slot="items" slot-scope="props">
            <td>{{props.item}}</td>
            <td>{{listdatas[props.index]}}</td>
            
          </template>
          <template slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
        
      </v-card>
    </template>
    <template v-else>
      <v-card class="clearqstnrprts last_hide" >
        <v-card-title>
          My custom User Report List
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
          :items="lebellistdatas"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
          class="kfptable"
        >
          <template  slot="items" slot-scope="props">
            <td>{{props.item}}</td>
            <td>{{listdatas[props.index]}}</td>
             <td>0</td>
            
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
    </div> -->
</template>

<script>
// import LineChart from './LineChart'

// export default {
//   name: 'LineChartContainer',
//   components: { LineChart},
//   props: ['charttype','startDate','endDate'],
//   data: () => ({
//     loaded: false,
//     chartdata:{   
//                     labels: [],
//                     datasets: [{
//                                   label: 'Active users',
//                                   backgroundColor: '#2ECC71',
//                                   borderColor:'#2ECC71',
//                                   pointBackgroundColor: 'white',
//                                   borderWidth: 1,
//                                   fill: false,
//                                   lineTension: 0,
//                                   pointBorderColor: '#2ECC71',
//                                   data: []
//                               },
//                               {
//                                   label: 'User churn rate',
//                                   backgroundColor: '#CC0000',
//                                   borderColor:'#CC0000',
//                                   pointBackgroundColor: 'white',
//                                   borderWidth: 1,
//                                   fill: false,
//                                   lineTension: 0,
//                                   pointBorderColor: '#CC0000',
//                                   data: []
//                               }
//                               ],
                        

//         },
//          chartdataforday:{   
//                     labels: [],
//                     datasets: [{
//                                   label: 'Active users',
//                                   backgroundColor: '#2ECC71',
//                                   borderColor:'#2ECC71',
//                                   pointBackgroundColor: 'white',
//                                   borderWidth: 1,
//                                   fill: false,
//                                   lineTension: 0,
//                                   pointBorderColor: '#2ECC71',
//                                   data: []
//                               }
//                               ],
                               

//         },
//     options:{
//                 scales: { yAxes: [{ ticks: { beginAtZero: true }, gridLines: { display: true } }],
//                           xAxes: [{ ticks: { beginAtZero: true }, gridLines: { display: false} }]
//                 },
//                 legend: { display: true },
//                 //tooltips: { enabled: true,  mode: 'single', callbacks: { label: function(tooltipItems, data) { return tooltipItems.yLabel + ''; } }},
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 height: 200
                
//         },
//          search: '',
//         pagination: {
//         rowsPerPage: 100,
//         descending: true,
//         sortBy: 'created_at'
//       },
//         headers: [
//           {text: 'Label', align: 'left', sortable: true, value: '' },
//           {text: 'Nubmer of active users ', align: 'left', sortable: true, value: '' },
//           { text: 'User churn rate(%)', align: 'left', sortable: true, value: '' },
          
//         ],
//          headersforday: [
//           {text: 'Label', align: 'left', sortable: true, value: '' },
//           {text: 'Nubmer of active users ', align: 'left', sortable: true, value: '' },
          
//         ],
//         listdatas: [],
//         lebellistdatas:[],
//         errormessage:null
//   }),
//   methods:{
//     async loaddata(){
//           this.loaded = false
//     try {
//       console.log('hello hi ',this.charttype+'start '+this.startDate+' end '+this.endDate);
// if(this.charttype==0){
//      await axios.post(`/getchangeactiveuserdaysdata`,{'userid':this.currentuser,'startDate':this.startDate,'endDate':this.endDate})
//     .then(daychartresponse => {
//       // JSON responses are automatically parsed.
//       console.log(daychartresponse.data)
//           this.lebellistdatas=daychartresponse.data.labels;
//           this.listdatas=daychartresponse.data.countdata;
//           this.chartdataforday.labels = daychartresponse.data.labels;
//           this.chartdata.datasets[0].data = daychartresponse.data.countdata;
//            this.chartdataforday.datasets[0].data = daychartresponse.data.countdata;
//           //this.chartdata.datasets[1].data = daychartresponse.data.countdata;
//     }).catch(e => {
//       this.errors.push(e)
//     }),
//      await axios.post(`/getchangeactiveuserdayschurndata`,{'userid':this.currentuser,'startDate':this.startDate,'endDate':this.endDate})
//     .then(daychartresponse => {
//       // JSON responses are automatically parsed.
//       console.log(daychartresponse.data)
//           //this.lebellistdatas=daychartresponse.data.labels;
//           //this.listdatas=daychartresponse.data.countdata;
//           //this.chartdata.labels = daychartresponse.data.labels;
//           this.chartdata.datasets[1].data = daychartresponse.data.countdata;
//           //this.chartdataforday.datasets[1].data = daychartresponse.data.countdata;
//           //this.chartdata.datasets[1].data = daychartresponse.data.countdata;
//     }).catch(e => {
//       this.errors.push(e)
//     })
// }else if(this.charttype==1){
//   if(typeof this.startDate !== 'undefined' && typeof this.endDate !== 'undefined'){
//   let firstDate = new Date(this.startDate),
//     secondDate = new Date(this.endDate),
//     timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
//     let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
// console.log(differentDays);
//   console.log('date diff',this.endDate+' '+this.startDate);
//   }else{

// var differentDays=0;
//   }

// if(differentDays > 6 || differentDays==0){

// console.log('condition true for week',differentDays);
//   await axios.post(`/getchangeactiveuserweekdata`,{'userid':this.currentuser,'startDate':this.startDate,'endDate':this.endDate})
//     .then(weekchartresponse => {
//       // JSON responses are automatically parsed.
//       console.log(weekchartresponse.data)
//       this.lebellistdatas=weekchartresponse.data.labels;
//           this.listdatas=weekchartresponse.data.countdata;
//           this.chartdata.labels = weekchartresponse.data.labels;
//           this.chartdata.datasets[0].data = weekchartresponse.data.countdata;
//           //this.chartdata.datasets[1].data = daychartresponse.data.countdata;

//     })
//     .catch(e => {
//       this.errors.push(e)
//     }),
//     await axios.post(`/getchangeactiveuserweekchurndata`,{'userid':this.currentuser,'startDate':this.startDate,'endDate':this.endDate})
//     .then(weekchartresponse => {
//       // JSON responses are automatically parsed.
//       console.log(weekchartresponse.data)
//       //this.lebellistdatas=weekchartresponse.data.labels;
//          // this.listdatas=weekchartresponse.data.countdata;
//           //this.chartdata.labels = weekchartresponse.data.labels;
//           this.chartdata.datasets[1].data = weekchartresponse.data.countdata;
//           //this.chartdata.datasets[1].data = daychartresponse.data.countdata;

//     })
//     .catch(e => {
//       this.errors.push(e)
//     })
//  this.errormessage=null   
// }else{
//   console.log('condition false for week',differentDays);
// this.errormessage="Selected date range is less then one week"
// }
// }else if(this.charttype==2){
//   await axios.post(`/getchangeactiveusermonthdata`,{'userid':this.currentuser,'startDate':this.startDate,'endDate':this.endDate})
//     .then(monthchartresponse => {
//       // JSON responses are automatically parsed.
//       console.log(monthchartresponse.data)
//           this.lebellistdatas=monthchartresponse.data.labels;
//           this.listdatas=monthchartresponse.data.countdata;
//           this.chartdata.labels = monthchartresponse.data.labels;
//           this.chartdata.datasets[0].data = monthchartresponse.data.countdata;
//           //this.chartdata.datasets[1].data = daychartresponse.data.countdata;

//     })
//     .catch(e => {
//       this.errors.push(e)
//     }),
//      await axios.post(`/getchangeactiveusermonthchurndata`,{'userid':this.currentuser,'startDate':this.startDate,'endDate':this.endDate})
//     .then(monthchartresponse => {
//       // JSON responses are automatically parsed.
//       console.log(monthchartresponse.data)
//           //this.lebellistdatas=monthchartresponse.data.labels;
//           //this.listdatas=monthchartresponse.data.countdata;
//           //this.chartdata.labels = monthchartresponse.data.labels;
//           this.chartdata.datasets[1].data = monthchartresponse.data.countdata;
//           //this.chartdata.datasets[1].data = daychartresponse.data.countdata;

//     })
//     .catch(e => {
//       this.errors.push(e)
//     })
// }
//       this.loaded = true

//     } catch (e) {
//       console.error(e)
//     }
//     }
//   },
//   mounted (){
//     this.loaddata();
//   },
// watch: {
//     // whenever question changes, this function will run
//     charttype: function (newQuestion, oldQuestion) {
//       //this.answer = 'Waiting for you to stop typing...'
//       //this.debouncedGetAnswer()
//       this.loaddata();
//     }, startDate: function (newQuestion, oldQuestion) {
//       //this.answer = 'Waiting for you to stop typing...'
//       //this.debouncedGetAnswer()
//       this.loaddata();
//     },
//      endDate: function (newQuestion, oldQuestion) {
//       //this.answer = 'Waiting for you to stop typing...'
//       //this.debouncedGetAnswer()
//       this.loaddata();
//     }
//   }
// }
// </script>