<template>
  <div class="container">
    <line-chart
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"/>
      <div>
    <br />
     <template>
      <v-card class="clearqstnrprts last_hide" >
        <v-card-title>
          Answers List
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
             <td>{{anslistdatas[props.index]}}</td>
             <td>{{sbaanslistdatas[props.index]}}</td>
             <td>{{kfpanslistdatas[props.index]}}</td>
             <td>{{caseanslistdatas[props.index]}}</td>
             <td>{{imageOfTheWeek[props.index]}}</td>
             <td>{{userQuestion[props.index]}}</td>
            
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
  </div>
</template>

<script>
import LineChart from './LineChart'
import moment from 'moment'


export default {
  name: 'LineChartContainer',
  components: { LineChart},
  props: ['charttype', 'startDate','endDate'],
  data: () => ({
    loaded: false,
    errors:[],
    chartdata:{   
                    labels: [],
                    datasets: [
                              {
                                  label: 'All Answers',
                                  backgroundColor: '#5DADE2',
                                   borderColor:'#5DADE2',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#5DADE2',
                                  data: []
                              },
                              {
                                  label: 'SBA Answers',
                                  backgroundColor: '#DA5C48',
                                   borderColor:'#DA5C48',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#DA5C48',
                                  data: []
                              },
                              {
                                  label: 'KFP Answers',
                                  backgroundColor: '#302B84',
                                   borderColor:'#302B84',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#302B84',
                                  data: []
                              },
                              {
                                  label: 'CASE Answers',
                                  backgroundColor: '#842B7F',
                                   borderColor:'#842B7F',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#842B7F',
                                  data: []
                              },
                              {
                                  label: 'Image Of the Week',
                                  backgroundColor: '#d425ca',
                                   borderColor:'#d425ca',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#d425ca',
                                  data: []
                              },
                              {
                                  label: 'User Question',
                                  backgroundColor: '#79842b',
                                   borderColor:'#79842b',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#79842b',
                                  data: []
                              }
                              ],

        },
        options: {
                scales: { yAxes: [{ ticks: { beginAtZero: true }, gridLines: { display: true } }],
                          xAxes: [{ ticks: { beginAtZero: true }, gridLines: { display: false} }]
                },
                legend: { display: true },
               // tooltips: { enabled: true,  mode: 'single', callbacks: { label: function(tooltipItems, data) {return tooltipItems.yLabel + ''; } }},
                responsive: true,
                maintainAspectRatio: false,
                height: 200
        },
         search: '',
        pagination: {
        rowsPerPage: 100,
        descending: true,
        sortBy: 'created_at'
      },
        headers: [
          {text: 'Label', align: 'left', sortable: true, value: '' },
          { text: 'Answers', align: 'left', sortable: true, value: '' },  
          { text: 'SBA Answers', align: 'left', sortable: true, value: '' },
          { text: 'KFP Answers', align: 'left', sortable: true, value: '' },
          { text: 'CASE Answers', align: 'left', sortable: true, value: '' },
          { text: 'Image of the week answers', align: 'left', sortable: true, value: '' },
          { text: 'User question answers', align: 'left', sortable: true, value: '' }
          
        ],
        qlistdatas: [],
        anslistdatas: [],
        sbaqlistdatas: [],
        sbaanslistdatas: [],
        kfpqlistdatas: [],
        kfpanslistdatas: [],
        caseqlistdatas: [],
        caseanslistdatas: [],
        lebellistdatas:[],
        imageOfTheWeek:[],
        userQuestion:[],
  }),
  methods:{
    async loaddata(){
          this.loaded = false
    try {
      console.log('hello hi ',this.charttype);
if(this.charttype==0){

  
  //  await axios.post(`/getchangequestiondaysdata`,{'userid':this.currentuser,'startDate':this.startDate,'endDate':this.endDate})
  //   .then(qdaychartresponse => {
  //     // JSON responses are automatically parsed.
  //     console.log(qdaychartresponse.data)
  //         this.lebellistdatas = qdaychartresponse.data.labels;
  //         this.qlistdatas = qdaychartresponse.data.countdata;
  //         this.chartdata.labels = qdaychartresponse.data.labels;
  //         this.chartdata.datasets[0].data = qdaychartresponse.data.countdata;

    // })
    // .catch(e => {
    //   this.errors.push(e)
    // }),
     await axios.post(`/getchangequestionanswersdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log(qadaychartresponse.data)
          this.lebellistdatas = qadaychartresponse.data.labels;
          this.anslistdatas = qadaychartresponse.data.countdata;
          this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[0].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    //  await axios.post(`/getsbaquestionsdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    // .then(qadaychartresponse => {
    //   // JSON responses are automatically parsed.
    //   console.log(qadaychartresponse.data)
    //       //this.lebellistdatas = qadaychartresponse.data.labels;
    //       this.sbaqlistdatas = qadaychartresponse.data.countdata;
    //       this.chartdata.labels = qadaychartresponse.data.labels;
    //       this.chartdata.datasets[2].data = qadaychartresponse.data.countdata;

    // })
    // .catch(e => {
    //   this.errors.push(e)
    // }),
     await axios.post(`/getsbaquestionanswersdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log(qadaychartresponse.data)
         // this.lebellistdatas = qadaychartresponse.data.labels;
          this.sbaanslistdatas = qadaychartresponse.data.countdata;
          this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[1].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    //  await axios.post(`/getkfpquestionsdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    // .then(qadaychartresponse => {
    //   // JSON responses are automatically parsed.
    //   console.log(qadaychartresponse.data)
    //       //this.lebellistdatas = qadaychartresponse.data.labels;
    //       this.kfpqlistdatas = qadaychartresponse.data.countdata;
    //       this.chartdata.labels = qadaychartresponse.data.labels;
    //       this.chartdata.datasets[4].data = qadaychartresponse.data.countdata;

    // })
    // .catch(e => {
    //   this.errors.push(e)
    // }),
      await axios.post(`/getkfpquestionanswersdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log(qadaychartresponse.data)
         // this.lebellistdatas = qadaychartresponse.data.labels;
          this.kfpanslistdatas = qadaychartresponse.data.countdata;
          this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[2].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    // await axios.post(`/getcasequestionsdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    // .then(qadaychartresponse => {
    //   // JSON responses are automatically parsed.
    //   console.log(qadaychartresponse.data)
    //       //this.lebellistdatas = qadaychartresponse.data.labels;
    //       this.caseqlistdatas = qadaychartresponse.data.countdata;
    //       this.chartdata.labels = qadaychartresponse.data.labels;
    //       this.chartdata.datasets[6].data = qadaychartresponse.data.countdata;

    // })
    // .catch(e => {
    //   this.errors.push(e)
    // }),
      await axios.post(`/getcasequestionanswersdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log(qadaychartresponse.data)
         // this.lebellistdatas = qadaychartresponse.data.labels;
          this.caseanslistdatas = qadaychartresponse.data.countdata;
          this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[3].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

    // image of the week daysData
      await axios.post(`/getimageoftheweekdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log(qadaychartresponse.data)
         // this.lebellistdatas = qadaychartresponse.data.labels;
          this.imageOfTheWeek = qadaychartresponse.data.countdata;
          this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[4].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })
    // user question daysData
      await axios.post(`/getuserquestiondaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log(qadaychartresponse.data)
         // this.lebellistdatas = qadaychartresponse.data.labels;
          this.userQuestion = qadaychartresponse.data.countdata;
          // this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[5].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

}else if(this.charttype==1){

//  await axios.post(`/getchangequestionweekdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
//     .then(qweekchartresponse => {
//       // JSON responses are automatically parsed.
//       console.log(qweekchartresponse.data)
//           this.lebellistdatas = qweekchartresponse.data.labels;
//           this.qlistdatas = qweekchartresponse.data.countdata;
//           this.chartdata.labels = qweekchartresponse.data.labels;
//           this.chartdata.datasets[0].data = qweekchartresponse.data.countdata;

//     })
//     .catch(e => {
//       this.errors.push(e)
//     }),
     await axios.post(`/getchangequestionanswersweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qweekchartresponse => {
      // JSON responses are automatically parsed.
      console.log('h1',qweekchartresponse.data)
          this.lebellistdatas = qweekchartresponse.data.labels;
          this.anslistdatas = qweekchartresponse.data.countdata;
          this.chartdata.labels = qweekchartresponse.data.labels;
          this.chartdata.datasets[0].data = qweekchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    // await axios.post(`/getsbaquestionsweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    // .then(qadaychartresponse => {
    //   // JSON responses are automatically parsed.
    //   console.log(qadaychartresponse.data)
    //       //this.lebellistdatas = qadaychartresponse.data.labels;
    //       this.sbaqlistdatas = qadaychartresponse.data.countdata;
    //      // this.chartdata.labels = qadaychartresponse.data.labels;
    //       this.chartdata.datasets[2].data = qadaychartresponse.data.countdata;

    // })
    // .catch(e => {
    //   this.errors.push(e)
    // }),
     await axios.post(`/getsbaquestionanswersweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log('h2',qadaychartresponse.data)
        //  this.lebellistdatas = qadaychartresponse.data.labels;
          this.sbaanslistdatas = qadaychartresponse.data.countdata;
         this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[1].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    //  await axios.post(`/getkfpquestionsweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    // .then(qadaychartresponse => {
    //   // JSON responses are automatically parsed.
    //   console.log(qadaychartresponse.data)
    //       //this.lebellistdatas = qadaychartresponse.data.labels;
    //       this.kfpqlistdatas = qadaychartresponse.data.countdata;
    //      // this.chartdata.labels = qadaychartresponse.data.labels;
    //       this.chartdata.datasets[4].data = qadaychartresponse.data.countdata;

    // })
    // .catch(e => {
    //   this.errors.push(e)
    // }),
      await axios.post(`/getkfpquestionanswersweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log('h3',qadaychartresponse.data)
        //  this.lebellistdatas = qadaychartresponse.data.labels;
          this.kfpanslistdatas = qadaychartresponse.data.countdata;
         this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[2].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    // await axios.post(`/getcasequestionsweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    // .then(qadaychartresponse => {
    //   // JSON responses are automatically parsed.
    //   console.log(qadaychartresponse.data)
    //       //this.lebellistdatas = qadaychartresponse.data.labels;
    //       this.caseqlistdatas = qadaychartresponse.data.countdata;
    //      // this.chartdata.labels = qadaychartresponse.data.labels;
    //       this.chartdata.datasets[6].data = qadaychartresponse.data.countdata;

    // })
    // .catch(e => {
    //   this.errors.push(e)
    // }),
      await axios.post(`/getcasequestionanswersweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log('h4',qadaychartresponse.data)
         // this.lebellistdatas = qadaychartresponse.data.labels;
          this.caseanslistdatas = qadaychartresponse.data.countdata;
         this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[3].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

    // image of the week weekData
      await axios.post(`/getimageoftheweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log('h5',qadaychartresponse.data)
        //  this.lebellistdatas = qadaychartresponse.data.labels;
          this.imageOfTheWeek = qadaychartresponse.data.countdata;
         this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[4].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

// user question weekData
      await axios.post(`/getuserquestionweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log('h6',qadaychartresponse.data)
         this.lebellistdatas = qadaychartresponse.data.labels;
          this.userQuestion = qadaychartresponse.data.countdata;
        //  this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[5].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })


}else if(this.charttype==2){

//  await axios.post(`/getchangequestionmonthdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate, 'startDate':this.startDate,'endDate':this.endDate})
//     .then(qmonthchartresponse => {
//       // JSON responses are automatically parsed.
//       console.log(qmonthchartresponse.data)
//          this.lebellistdatas = qmonthchartresponse.data.labels;
//           this.qlistdatas = qmonthchartresponse.data.countdata;
//           this.chartdata.labels = qmonthchartresponse.data.labels;
//           this.chartdata.datasets[0].data = qmonthchartresponse.data.countdata;

//     })
//     .catch(e => {
//       this.errors.push(e)
//     }),
    await axios.post(`/getchangequestionanswersmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qmonthchartresponse => {
      // JSON responses are automatically parsed.
      console.log("custom 1",qmonthchartresponse.data)
          this.lebellistdatas = qmonthchartresponse.data.labels;
          this.anslistdatas = qmonthchartresponse.data.countdata;
          this.chartdata.labels = qmonthchartresponse.data.labels;
          this.chartdata.datasets[0].data = qmonthchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    // await axios.post(`/getsbaquestionsmonthdata`,{{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    // .then(qadaychartresponse => {
    //   // JSON responses are automatically parsed.
    //   console.log(qadaychartresponse.data)
    //       //this.lebellistdatas = qadaychartresponse.data.labels;
    //       this.sbaqlistdatas = qadaychartresponse.data.countdata;
    //       //this.chartdata.labels = qadaychartresponse.data.labels;
    //       this.chartdata.datasets[2].data = qadaychartresponse.data.countdata;

    // })
    // .catch(e => {
    //   this.errors.push(e)
    // }),
     await axios.post(`/getsbaquestionanswersmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log("custom 2",qadaychartresponse.data)
        //  this.lebellistdatas = qadaychartresponse.data.labels;
          this.sbaanslistdatas = qadaychartresponse.data.countdata;
         this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[1].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    //  await axios.post(`/getkfpquestionsmonthdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    // .then(qadaychartresponse => {
    //   // JSON responses are automatically parsed.
    //   console.log(qadaychartresponse.data)
    //       //this.lebellistdatas = qadaychartresponse.data.labels;
    //       this.kfpqlistdatas = qadaychartresponse.data.countdata;
    //       //this.chartdata.labels = qadaychartresponse.data.labels;
    //       this.chartdata.datasets[4].data = qadaychartresponse.data.countdata;

    // })
    // .catch(e => {
    //   this.errors.push(e)
    // }),
      await axios.post(`/getkfpquestionanswersmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log("custom 3",qadaychartresponse.data)
        //  this.lebellistdatas = qadaychartresponse.data.labels;
         this.kfpanslistdatas = qadaychartresponse.data.countdata;
          this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[2].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    // await axios.post(`/getcasequestionsmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    // .then(qadaychartresponse => {
    //   // JSON responses are automatically parsed.
    //   console.log(qadaychartresponse.data)
    //       //this.lebellistdatas = qadaychartresponse.data.labels;
    //       this.caseqlistdatas = qadaychartresponse.data.countdata;
    //       //this.chartdata.labels = qadaychartresponse.data.labels;
    //       this.chartdata.datasets[6].data = qadaychartresponse.data.countdata;

    // })
    // .catch(e => {
    //   this.errors.push(e)
    // }),
      await axios.post(`/getcasequestionanswersmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log("custom 4",qadaychartresponse.data)
        //  this.lebellistdatas = qadaychartresponse.data.labels;
          this.caseanslistdatas = qadaychartresponse.data.countdata;
         this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[3].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

    // image of the week monthData
     await axios.post(`/getimageoftheweekmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log("custom 5",qadaychartresponse.data)
        //  this.lebellistdatas = qadaychartresponse.data.labels;
          this.imageOfTheWeek = qadaychartresponse.data.countdata;
         this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[4].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })
    // user question monthData
      // image of the week monthData
     await axios.post(`/getuserquestionmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log("custom 6",qadaychartresponse.data)
        //  this.lebellistdatas = qadaychartresponse.data.labels;
          this.userQuestion = qadaychartresponse.data.countdata;
        //  this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[5].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
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
    }, startDate: function (newQuestion, oldQuestion) {
      //this.answer = 'Waiting for you to stop typing...'
      //this.debouncedGetAnswer()
      this.loaddata();
    },
     endDate: function (newQuestion, oldQuestion) {
      //this.answer = 'Waiting for you to stop typing...'
      //this.debouncedGetAnswer()
      this.loaddata();
    }
  }
}
</script>