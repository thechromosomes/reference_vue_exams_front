<template>
<div>
    <h4>All posts</h4>
    <span class='search_input'>
        <v-text-field
            v-model="search"
            label="Search"
            >
        </v-text-field>
    </span>

    <!-- add to category -->
        <v-dialog v-model="selectCategory" persistent max-width="300px">
          <v-card class="category_popup">
            <v-card-title>Select Category</v-card-title>
                <v-checkbox color="#b2cb36" label="Featured" v-model="resourceCategory.featured06"></v-checkbox>
                <v-checkbox color="#b2cb36" label="Webinar" v-model="resourceCategory.audio04"></v-checkbox>
                <v-checkbox color="#b2cb36" label="Media" v-model="resourceCategory.video05"></v-checkbox>
                <v-checkbox color="#b2cb36" label="Recommended" v-model="resourceCategory.recommended02"></v-checkbox>
                <v-checkbox color="#b2cb36" label="Must read" v-model="resourceCategory.mustRead03"></v-checkbox>
                <v-checkbox color="#b2cb36" label="Latest" v-model="resourceCategory.latest01"></v-checkbox>
                <v-card-actions>
                  <button class="btn btn_edit modal_btn" @click="saveToCategory(0)">Close</button>
                  <button class="btn btn_edit modal_btn " @click="saveToCategory(1)">Save</button>
                </v-card-actions>
          </v-card>
        </v-dialog>

    <v-data-table
        :headers="headers"
        :items="allPosts"
        :rows-per-page-items="[50, 100, 150]"
        :pagination.sync="pagination"
        :search="search"
        >
        <template  slot="items" slot-scope="props">
            <td>{{props.item.userdetail.firstname}} {{props.item.userdetail.lastname}}</td>
            <td>{{props.item.posted_at | createDatentime}}</td>
            <template v-if="props.item.resources.length > 0">
                <td><span v-for="resources of props.item.resources" :key="resources">{{resources.resource_category.slice(0, -2)}}<br> </span></td>
            </template>
            <template v-else>
                <td>---</td>
            </template>
            <template>
                <td v-if="props.item.articles.length > 0"> {{props.item.articles[0].a_title}}</td>
                <td v-else-if="props.item.content !== null && props.item.articles.length <= 0"><span v-html="props.item.content" class="hide-image"></span></td>
                <td v-else-if="props.item.content == null && props.item.articles.length <= 0">---</td>
            </template>
            <td> <button class="btn btn_edit all_post_btn" @click="moveToresource(props.item)">move</button> </td>
        </template>
    </v-data-table>
</div>
</template>
<script>

var username=localStorage.username;

export default {
    data(){
        return{
            headers: [
                { text: 'Created by', align: 'left', value: 'created_by', sortable: true },
                { text: 'Posted at', align: 'left', value: 'posted_at', sortable: true },
                { text: 'Category', align: 'left', value: 'resources[0].resource_category', sortable: false },
                { text: 'Content', align: 'left', value: 'searchcontent', sortable: true},
                { text: 'Move to resource', align: 'left',  sortable: true },

            ],
            posts: null,
            allPosts: [],
            errors:[],
            search: null,
            pagination: {
                rowsPerPage: 100,
                descending: true,
                sortBy: 'created_at'
            },
            selectCategory: false,
            postIdForCategory: null,
            resourceCategory: {
                featured06: false,
                audio04:false,
                video05: false,
                recommended02: false,
                mustRead03: false,
                latest01:true

            }
        }
    },
    methods:{
        saveToCategory(status){
            if(status === 0){
                this.selectCategory = false
                this.resourceCategory = {
                    featured06: false,
                    audio04:false,
                    video05: false,
                    recommended02: false,
                    mustRead03: false,
                    latest01:true
                }
            }else{
                axios.post(`/saveresources`,{resourceType:this.resourceCategory, user:this.currentuser, postId: this.postIdForCategory})
                .then(response => {
                this.selectCategory = false
                this.toCallAllPost()
                this.resourceCategory = {
                    featured06: false,
                    audio04:false,
                    video05: false,
                    recommended02: false,
                    mustRead03: false,
                    latest01:true
                }
                })
                .catch(e => {
                    this.errors.push(e)
                })
            }
        },
        moveToresource(data){
            let finalData = data.resources
            finalData.forEach((value, index) => {
                let temp = value.resource_category
                this.resourceCategory[temp] = true
            });
                let postIdTemp = data.unique_id
                this.postIdForCategory = postIdTemp
                this.selectCategory = true
        },

        // get all posts
        toCallAllPost(){
            axios.post(`/getallpostsforeport`)
            .then(response => {
            this.allPosts = response.data.data

            })
            .catch(e => {
            this.errors.push(e)
            })
        }
    },

    created(){
        this.toCallAllPost()

         axios.post(`/getcurrentuser`,{'username':username})
        .then(response => {
            this.currentuser = response.data.unique_id
        })
        .catch(e => {
        this.errors.push(e)
        })

        }

}
</script>
<style>
button.all_post_btn {
    top: 0px;
    height: 35px;
}
.hide-image .videoframe{
  display:none;
}
.hide-image img{
  display: none;
}
span.search_input {
    float: right;
    margin-bottom: -42px;
    margin-top: -23px;
}
</style>