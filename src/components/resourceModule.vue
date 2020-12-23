<template>
<div>
<section class="pt-4">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-6 border-right">
                <div class="row">
                    <div class="col-md-6">
                        <div class="search list pb-5">
                            <ul class="unique_button">
                                <li class="addfile cursoron" @click="openAddPopUp(2)"> <i class="fa fa-file-pdf-o icon_margin" aria-hidden="true"></i> Add Pdf</li>
                                <li class="addfile cursoron" @click="openAddPopUp(1)"><i class="fa fa-link icon_margin" aria-hidden="true" style="font-weight:300; color: #000"></i> Add Link</li>
                                <li class="addfile cursoron" @click="openAddPopUp"><i class="fa fa-file-image-o icon_margin" aria-hidden="true" id="img" name="img" accept="image/*" ></i> Add Image</li>
                            </ul>
                        </div>

                         <!-- pop to paste url link -->
                         <!-- <div v-if="dialog" class="paste_url">
                            <v-text-field v-model="siteUrl" outlined label="Site URL"></v-text-field>
                        </div> -->

                        <!-- to edit resource module -->
                        <v-dialog v-model="createrDialog" persistent max-width="500">
                            <v-card>
                                <v-card-title class="headline cursoron">Add resources</v-card-title>
                                <v-container>
                                <v-text-field
                                    v-model="note"
                                    label="Note"
                                    outlined
                                ></v-text-field>
                                <v-text-field
                                    @keyup="getprieviewlink(1)"
                                    v-if="createrSiteUrl" 
                                    v-model="siteUrl"
                                    label="Site url"
                                    outlined
                                ></v-text-field>
                                <span v-if="createrSiteUrl == false" class="styleClass" onclick="document.getElementById('getFile').click()">{{post_file || "upload file"}}</span>
                                <input type='file' id="getFile" style="display:none" @change="attachfiletopost">
                                </v-container>
                                <v-card-actions>
                                    <button class="btn btn_edit modal_btn" @click="closebutton()">Close</button>
                                    <button class="btn btn_edit modal_btn" @click="postDataToApi()">Save</button>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>


                    </div>
                </div>
                <div class="row">
                    <div class="heading">
                        <p><b>{{questionName}} - Related Resources</b></p>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table custom-table">
                        <tr v-for="(element, index) in allResourceQuestionData" :key="index">
                            <td><v-checkbox :key="index" v-model="element.display" @click="changeChoicetext(index)" ></v-checkbox></td>
                            <td>&nbsp</td>
                            <td  v-if="element.resources.originalName !== null" colspan="5" >
                                <i v-if="element.resources.media_type == 'application/pdf'" class="fa fa-file-pdf-o" aria-hidden="true"></i>  
                                <i v-else-if="element.resources.media_type.includes('image')" class="fa fa-file-image-o" aria-hidden="true"></i> 
                                <i v-else class="fa fa-exclamation-circle" aria-hidden="true"></i>  &nbsp
                                <a class="cursoron resource-item" :href="fileurl+element.resources.content_path" target="_blank"> {{element.resources.originalName}} </a>
                            </td>
                            <td v-else-if="element.resources.originalName == null && element.resources.siteUrl !== null" colspan="5" >
                                <i class="fa fa-link" aria-hidden="true"></i>  &nbsp
                               <a class="cursoron resource-item" :href="element.resources.siteUrl" target="_blank">{{element.resources.siteUrl}}</a> 
                            </td>
                            <td v-else-if="element.resources.originalName == null && element.resources.siteUrl == null">
                                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>  &nbsp
                                    nothing to show 
                            </td>
                            <!-- <td><button> Add to question</button></td> -->
                            <!-- <td><button @click="OpenPopEditor(element.resources)"> Edit</button></td> -->
                            <td v-if="element.resources.note !== null" class="dooted_line">{{element.resources.note}}</td>
                            <td v-else-if="element.resources.note == null" class="dooted_line"> --- </td>
                            <td><button @click="updatedDisplayStatus(element.resources.unique_id)"> <i class="fa fa-minus-square" aria-hidden="true"></i></button></td>
                        </tr>
                    </table>
                </div>
                <div class="row">
                    <div class="addtoquestion">
                        <button class="btn btn_edit modal_btn" @click="goBack">Back to Question</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-md-5">
                        <div class="heading">
                            <p><b>Resource added to other posts</b></p>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="input_search">
                            <input type="search" v-model="searchContent" @input="searchAndFilterData" placeholder="Search">
                        </div>
                    </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row table-responsive">
                            <table class="table custom-table">
                                <tr v-for="(element, index) in allResourceData" :key="index">
                                    <td  v-if="element.originalName !== null" colspan="5" >
                                        <i v-if="element.media_type == 'application/pdf'" class="fa fa-file-pdf-o" aria-hidden="true"></i>  
                                        <i v-else-if="element.media_type.includes('image')" class="fa fa-file-image-o" aria-hidden="true"></i> 
                                        <i v-else class="fa fa-exclamation-circle" aria-hidden="true"></i>  &nbsp
                                        <a class="cursoron resource-item" :href="fileurl+element.content_path" target="_blank">{{element.originalName}} </a>
                                    </td>
                                    <td v-else-if="element.originalName == null && element.siteUrl !== null" colspan="5" >
                                        <i class="fa fa-link" aria-hidden="true"></i> &nbsp
                                       <a class="cursoron resource-item" :href="element.siteUrl" target="_blank"> {{element.siteUrl}} </a>
                                    </td>
                                    <td v-else-if="element.originalName == null && element.siteUrl == null">
                                        <i class="fa fa-exclamation-circle" aria-hidden="true"></i> &nbsp
                                         Nothing to show 
                                    </td>
                                    <td v-if="element.note !== null" class="dooted_line">{{element.note}}</td>
                                    <td v-else-if="element.note == null" class="dooted_line"> --- </td>
                                    <td><button @click="addtoquestion(element)" style="margin-right:6px;"> <i class="fa fa-arrow-circle-left" aria-hidden="true"></i></button></td>
                                    <td><button @click="OpenPopEditor(element)" style="margin-right:6px;"> <i class="fa fa-pencil" aria-hidden="true"></i></button></td>
                                    <td><button @click="deleteConfirmation(element.unique_id)"> <i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                </tr>
                            </table>
                            <paginate
                                :page-count="pagecount"
                                :clickHandler="searchAndFilterData"
                                :page-range="3"
                                :margin-pages="2"
                                :prev-text="'Prev'"
                                :next-text="'Next'"
                                :container-class="'pagination'"
                                :page-class="'page-item'">
                            </paginate>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- for pop up snackbar message -->
<v-snackbar
    v-model="snackbar"
    :top=true
    :left=true
    >
    {{ appLinkMessage }}
    <v-btn dark text @click="snackbar = false">close</v-btn>
</v-snackbar>

<!-- to edit resource module -->
<v-dialog v-model="editorDialog" persistent max-width="500">
    <v-card>
        <v-card-title class="headline">Edit resources</v-card-title>
        <v-container>
        <v-text-field
            v-model="note"
            label="Note"
            outlined
        ></v-text-field>
        <v-text-field
            v-if="siteUrl !== null" 
            v-model="siteUrl"
            label="Site url"
            outlined
        ></v-text-field>

        <button v-if="post_file !== null" class="styleClass" onclick="document.getElementById('getFile').click()">{{post_file || "upload file"}}</button>
        <input type='file' id="getFile" style="display:none" @change="attachfiletopost">
        </v-container>
        <v-card-actions>
            <button class="btn btn_edit modal_btn" @click="editorDialog = false">Close</button>
            <button class="btn btn_edit modal_btn" @click="deleteAndUpdateResources(2)">Save</button>
        </v-card-actions>
    </v-card>
</v-dialog>

<!-- to checK image validation -->
<v-dialog v-model="imagevalidationpopup" persistent width="600" >
      <v-card class="validimage_card">
        <v-card-title class="headline grey lighten-2" primary-title >
          Image Validation <span class="crosspopup cp_scheduler" @click="resetquestionimage">x</span>
        </v-card-title>
        <v-card-text>
          <div class="single_ques_sec">
         <label>Q1: I have obtained permission from patient or patient guardian to use this image?</label>
            <v-btn-toggle
          v-model="imageValidation.image_permission"
          class="image_validation"
          mandatory
        >
          <v-btn>
            Yes
          </v-btn>
          <v-btn>
            No
          </v-btn>
          <v-btn>
            Not patient related
          </v-btn>
        </v-btn-toggle>
          </div>
          <div class="single_ques_sec">
           <label>Q2 : Source of the image?</label>
         <input class="ques_textarea" v-model="imageValidation.image_source" type="text" />
          </div>
          <div class="error_warning" v-if="imageValidation.image_permission==1">Please do not upload patient images which you have not received permission to share.</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <input @click="resetquestionimage" name="done" value="Reset" type="button" class="submit_btn set_scheduler" />
          <template v-if="imageValidation.image_permission !==1">
          <input @click="updateimagesourceandpermission" name="done" value="Add" type="button" class="submit_btn set_scheduler"/>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- to confirm deltion -->
    <v-dialog v-model="deleteData" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">please confirm delete</v-card-title>
          <v-card-actions>
            <button class="btn btn_edit modal_btn" text @click="deleteData = false">Disagree</button>
            <button class="btn btn_edit modal_btn" text @click="deleteAndUpdateResources(1)">Agree</button>
          </v-card-actions>
        </v-card>
      </v-dialog>

</div>
</template>

<script>
let username = localStorage.username
import Paginate from 'vuejs-paginate'

export default {
    components: {Paginate}, 
    data(){
        return {
            currentUser: null,
            post_file: null,
            note: null,
            media_type: null,
            fileurl:window.publicfileurl,
            // dialog: false,
            snackbar:false,
            timeout: 6000,
            appLinkMessage:null,
            siteUrl:null ,
            searchContent:null,
            allResourceData: [],
            editorDialog: false,
            userTemp: null,
            checkbox: true,
            questionId: null,
            allResourceQuestionData: [],
            originalName: null,
            createrDialog: false,
            createrSiteUrl: false,
            questionName: null,
            imagevalidationpopup:false, 
            imageValidation: {
                image_permission:"0",
                image_source:null, 
            },
            linkpreviewdata:null,     
            dataRange: 0,
            deleteData: false,
            uniqueIdTemp: null,
            pagecount: 0

        }
    },
    methods: {
        goBack(){
            window.history.back();
        },
        async attachfiletopost(data){
            if (data == 1){
                this.media_type = null
                // await axios.post(`/getpostbylink`,{'requrl':this.siteUrl})
                // .then(response => {
                //     this.linkpreviewdata=response.data;
                // }).catch(e => {
                //     this.errors.push(e)
                // }) 
        
                // this.createrSiteUrl = false
            }else {
                const file = data.target.files[0];
                const formData = new FormData();
                formData.append("file", file);
                try{
                const res = await axios.post("/upload", formData);
                this.post_file = res.data.file
                this.originalName = res.data.details.originalname
                this.media_type = res.data.details.mimetype
                this.createrSiteUrl = false
                if (res.data.details.mimetype.includes('image')){
                    this.imagevalidationpopup = true
                }
                } catch(err){
                console.log(err);
                }
            }
         
        },
        openAddPopUp(type){
            if (type == 1){
                this.createrSiteUrl = true
                this.createrDialog = true
            }
            this.createrDialog = true
        },
        closebutton(){
            this.createrDialog = false
            this.createrSiteUrl = false
        },
        async getprieviewlink(){
            await axios.post(`/getpostbylink`,{'requrl':this.siteUrl})
            .then(response => {
                this.linkpreviewdata=response.data;
                this.media_type = null

                // this.attachfiletopost(1)
            }).catch(e => {
                this.errors.push(e)
            })
        },
        postDataToApi(){
            if (this.post_file !== null && this.note !== null || this.siteUrl !== null ){
                if(this.siteUrl !== null){
            
                }
                axios.post(`/saveresourcesmodule`, {"note": this.note, "content_path": this.post_file, "media_type": this.media_type, "originalName": this.originalName, "created_by": this.currentUser, "siteUrl": this.siteUrl,"linkpreviewdata":this.linkpreviewdata, "imageValidation": this.imageValidation})
                .then(response => {
                    axios.post(`/resourcesanswer`, {"questionId": this.questionId, "resourceId": response.data.data[0].unique_id})
                    .then(response2 => {
                        console.log(" resourcesanswer updated ")
                    })
                    .catch(err => {
                    console.log("error", err)
                    })
                    this.appLinkMessage = response.data.message
                    // this.dialog = false
                    this.snackbar = true
                    this.siteUrl = null
                    this.note = null
                    this.post_file = null
                    this.media_type=null
                    this.originalName = null
                    this.createrDialog = false
                    this.createrSiteUrl = false
                    this.searchAndFilterData()
                    this.searchDataForQuestion()
                })
                .catch(err => {
                    console.log("error", err)
                })
            }else{
                this.appLinkMessage = "please add file, link and note"
                this.snackbar = true
            }
        },
        searchAndFilterData(pageNum = 1){
            this.dataRange = (pageNum - 1) *10
            axios.post(`/getresourcesmodule`,{'searchContent':this.searchContent, 'range': this.dataRange, "sort": 10})
            .then(response => {
                this.allResourceData = response.data.data
                this.pagecount = (response.data.count[0].myCount) / 10

            })   
            .catch(err => {
                console.log("error :", err)
            })
        },
        searchDataForQuestion(){
            axios.post(`/answerreltedresources`,{'questionId':this.questionId})
            .then(response => {
                this.allResourceQuestionData = response.data.data
            })   
            .catch(err => {
                console.log("error :", err)
            })
        },

        deleteConfirmation(uniqueId){
            this.deleteData = true
            this.userTemp = uniqueId
        },

        deleteAndUpdateResources(actionType){
            let finalId = this.userTemp
            axios.post(`/deleteandupdateresources`,{"note": this.note, "content_path": this.post_file, "media_type": this.media_type, "siteUrl": this.siteUrl, "originalName": this.originalname, "actionType": actionType, "uniqueId": finalId, "imageValidation": this.imageValidation})
            .then(response => {
                this.appLinkMessage = response.data.message
                this.deleteData = false
                this.snackbar  = true
                this.searchAndFilterData()
                this.searchDataForQuestion()
                this.editorDialog = false
                this.siteUrl = null
                this.note = null
                this.post_file = null
                this.originalName = null
            })   
            .catch(err => {
                console.log("error : ", err)
            })
        },
        OpenPopEditor(element){
            this.note = element.note
            this.post_file = element.content_path
            this.media_type = element.media_type
            this.siteUrl = element.siteUrl
            this.userTemp = element.unique_id
            this.editorDialog = true
        },
        addtoquestion(element){
            axios.post(`/addtoquestion`,{'questionId':this.questionId, "resourceId": element.unique_id, "display": true})
            .then(response => {
                this.appLinkMessage = response.data.message
                this.snackbar  = true
                this.searchDataForQuestion()
            })   
            .catch(err => {
                console.log("error :", err)
            })
        },
        updatedDisplayStatus(id){
            axios.post(`/updateddisplaystatus`,{'resourceId':id, "deleted": true})
            .then(response => {
                this.appLinkMessage = response.data.message
                this.snackbar  = true
                this.searchDataForQuestion()
            })   
            .catch(err => {
                console.log("error :", err)
            })
        },
        changeChoicetext(c_index){
            let questionId = this.allResourceQuestionData[c_index].questionId
            let display = !this.allResourceQuestionData[c_index].display
            let resourceId = this.allResourceQuestionData[c_index].resourceId

            axios.post(`/updateddisplaystatus`,{'questionId':questionId, "resourceId": resourceId, "APIbehave":"chechbox", "display": display})
            .then(response => {
                this.appLinkMessage = response.data.message
                this.snackbar  = true
                this.searchDataForQuestion()
            })   
            .catch(err => {
                console.log("error :", err)
            })
        },
        resetquestionimage(){
            this.post_file = null
            this.imagevalidationpopup = false
            this.imageValidation.image_permission = "0"
            this.imageValidation.image_source = null

        },
        updateimagesourceandpermission(){
            this.imagevalidationpopup = false
        }
    },
    created(){
        this.questionId = this.$route.query.id
        this.questionName = this.$route.query.question
        
        this.searchDataForQuestion()

        axios.post(`/getcurrentuser`,{'username':username})
        .then(response => {
            this.currentUser = response.data.unique_id
        })   
        .catch(err => {
            console.log("error :", err)
        })   
        axios.post(`/getresourcesmodule`,{'searchContent':this.searchContent, 'range': 0, "sort": 10})
        .then(response => {
            this.allResourceData = response.data.data
            this.pagecount = (response.data.count[0].myCount) / 10
        })   
        .catch(err => {
            console.log("error :", err)
        })
    }
}
</script>
<style>
    body{
        font-size: 14px;
    }
    .search.list {
        display: inline-flex;
    }
    .search.list ul {
        padding: 0;
        margin: 0;
    }
    .border-right{
        border-right: 3px solid #ccc!important;
    }
    .search.list ul li {
        display: inline-flex;
        margin-right: 16px;
        align-items: center;
    }
    .resourslist ul li {
        margin-bottom: 18px;
        display:flex;
    }
    .questionlist table tbody tr td {
        padding: 6px;
    }
    .questionlist2  table tbody tr td{
        padding: 3px;
    }
    .resourslist ul {
        padding: 0;
        list-style: none;
    }
    .input_search input[type="search"] {
        border: none;
        border-bottom: 1px solid #ccc;
        width: 92%;
    }
    .addtoquestion button.btn.btn_edit.modal_btn {
        float: right;   
    }
    .row{
        margin-right: 0px;
        margin-left: 0px;
    }
    .resourslist ul li a {
        color: #000;
    }
    .search.list ul li a {
        color: #000;
    }
    .search.list ul li a {
        margin-right: 21px;
    }
    .questionlist.pt-4 {
        padding-top: 4.4em !important;
    }
    a.btn.btn-defaul {
        padding: 6px 4px;
    }
    .custom-table td{
        padding: 0;
    }
    .pt-4{
        padding-top: 2em;
    }
    .addfile{
        position: relative;
    }
    .search.list .unique_button input[type=file] {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: absolute;
        background-color: transparent;
        opacity: 0;
        cursor: pointer;
    }
    table.table.custom-table tbody tr td button {
        border: none;
        background-color: transparent;
    }
    .sarchbar form .input-group {
        padding: 0;
    }
    .sarchbar {
        position: relative;
    }
    .input-group-btn {
        position: absolute!important;
        font-size: 0;
        right: 87px;
        z-index: 99;
        top: -2px;
    }
    .icon_margin {
        margin-right: 6px;
    }   
    .row.table-responsive table.table.custom-table tr td {
        padding: 10px 0px;
    }
</style>