<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-sm-3 left_fixed">
      <div class="search_div">
        <p class="searchs"> Search: </p>
         <ul class="nav nav-tabs search_tab">
            <li ><a data-toggle="tab" @click="getTopics(1)" href="#topics">Topics</a></li>
            <li><a data-toggle="tab" @click="getTopics(2)" href="#titles">Article title</a></li>
            <li><a data-toggle="tab" @click="getTopics(3)" href="#sharedby">Shared by</a></li>
        </ul>
        </div>
        <!-- div topic -->
        <div class="tab-content search_content">
          <div v-if="topicDiv && defposttags.length > 0" id="topics" class="tab-pane fade in active">
            <div class="res_search_bar">
            <input v-model ="search" @keyup="searchByTagName()" type="text" class="res_search_input" placeholder="Find Resources by topics"> <i class="fa fa-search custom_search_icon"> </i>
          </div>
          <ul v-if="defposttags2.length == 0" class="search_lists">
              <li style="cursor: pointer;" v-for="(item2, index2) in defposttags" :key="index2" @click="searchAllPostByTagName(item2)">{{item2.tagname}}</li>
          </ul>
          <ul v-else class="search_lists">
              <li style="cursor: pointer;" v-for="(item2, index2) in defposttags2" :key="index2" @click="searchAllPostByTagName(item2)">{{item2.tagname}}</li>
          </ul>
        </div>
        <!-- div title -->
        <div v-if="titleDiv" id="titles" class="tab-pane fade in active">
          <div class="res_search_bar">
            <input v-model ="search" @keyup="getDataBySearchQuery" type="text" class="res_search_input" placeholder="Find Resources by title"> <i class="fa fa-search custom_search_icon"> </i>
          </div>
        </div>
        <!-- div shared by -->
        <div v-if="sharedDiv" id="sharedby" class="tab-pane fade in active">
            <input v-model="latesTemp" type="hidden" value="3487">
          <div class="res_search_bar">
            <input v-model ="search" @keyup="toSearchByUserDetail" type="text" class="res_search_input" placeholder="Find Resources shared by"> <i class="fa fa-search custom_search_icon"> </i>
          </div>
            <ul class="search_lists">
              <input v-model="latesTemp" type="hidden" value="3487">
              <li style="cursor: pointer;" v-for="(item2, index2) in userDetail" :key="index2" @click="getPostByUserName(item2)">{{item2.firstname}} {{item2.lastname}}</li>
            </ul>
        </div>
      </div>
    </div>


    <!-- main featured post -->
    <div class="col-sm-offset-3 col-sm-9 rightt_scroll">
    <div class="row">
    <div class="col-sm-8">
    <template v-if="search == null || search == '' ">
      <div v-if="featuredPost.length > 0 && featuredPost[0].articledata.length > 0">
          <h3 class="resources_page_heading"> <span v-html="featuredPost[0].articledata[0].articaldata.a_title"></span></h3>
          <div v-if="featuredPost[0].articledata[0].section_uploaded_file.length > 0">
            <a class="href_color" :href="`/articleview?id=${featuredPost[0].articledata[0].articleid}`" target="_blank">
            <img :src="fileurl+featuredPost[0].articledata[0].section_uploaded_file" class="resources_page_img">
            </a>
          </div>

          <div v-else-if="featuredPost[0].articledata.length > 0 && featuredPost[0].articledata[0].uploaded_file.length > 0">
              <a class="href_color" :href="`/articleview?id=${featuredPost[0].articledata[0].articleid}`" target="_blank">
              <img :src="fileurl+featuredPost[0].articledata[0].uploaded_file[0]" class="resources_page_img">
              </a>
            </div>
            <div v-else-if="featuredPost[0].articledata.length > 0 && featuredPost[0].articledata[0].section_uploaded_file.length > 0">
              <a class="href_color" :href="`/articleview?id=${featuredPost[0].articledata[0].articleid}`" target="_blank">
              <img :src="fileurl+featuredPost[0].articledata[0].section_uploaded_file" class="resources_page_img">
              </a>
            </div>
        </div>

        <div class="remove_cont_img" v-if="featuredPost.length > 0 && JSON.stringify(featuredPost[0].articledata) === '{}'">
          <h3 v-if="featuredPost[0].content.length > 0" class="resources_page_heading remove_featured_img"> <span v-html="featuredPost[0].content"></span></h3>
          <h3 v-else-if="JSON.stringify(featuredPost[0].content) === '{}' && JSON.stringify(featuredPost[0].refPost.content) !== '{}'" class="resources_page_heading remove_featured_img"> <span v-html="featuredPost[0].refPost.content"></span></h3>
          <div class="resources_front_img" v-if="featuredPost[0].imageUrl.length > 0">
            <template v-if="featuredPost[0].imageUrl[0].includes('noimage') && featuredPost[0].videoUrl.length > 0">
              <template v-if="featuredPost[0].videoThumbnail">
                <a class="href_color" :href="`/postview?id=${featuredPost[0].uniqueId[0]}`" target="_blank">
                  <img :src="fileurl+featuredPost[0].videoThumbnail" >
                </a>
                </template>
                <template v-else-if="featuredPost[0].refPost.videoThumbnail">
                <a class="href_color" :href="`/postview?id=${featuredPost[0].uniqueId[0]}`" target="_blank">
                  <img :src="fileurl+featuredPost[0].refPost.videoThumbnail" >
                </a>
                </template>
                <template v-else>
                 <a class="href_color" :href="`/postview?id=${featuredPost[0].uniqueId[0]}`" target="_blank">
                <img v-if="featuredPost[0].videoUrl[0].includes('youtube')" src="../assets/images/youtubeThumbnail.jpg" >
                <img v-if="featuredPost[0].videoUrl[0].includes('vimeo')" src="../assets/images/vimeoThumnail.jpg" >
              </a>
                </template>
              </template>
              <template v-else>
              <a class="href_color" :href="`/postview?id=${featuredPost[0].uniqueId[0]}`" target="_blank">
                <span class="resources_page_img" v-html="featuredPost[0].imageUrl[0]"></span>
              </a>
              </template>

          </div>
        </div>
        </template>

        <div class="blogs_section">
          <ul class="nav nav-tabs blog_tab">
              <li class="active"><a data-toggle="tab" href="#latest">Latest</a></li>
              <li><a data-toggle="tab" href="#recommended">Recommended</a></li>
              <li><a data-toggle="tab" href="#must_read">Must Read</a></li>
              <li><a data-toggle="tab" href="#videos">Media</a></li>
              <li><a data-toggle="tab" href="#audio">Webinar </a></li>
              <li class="saved" @click="opensaveList" ><a data-toggle="tab" href="#saved"><i class="fa fa-bookmark"> </i> My Saved list  </a></li>
          </ul>
        </div>

        <div class="tab-content blog_content">

        <!-- for latest -->
          <div id="latest" class="tab-pane fade in active">
            <div v-if="latest.length > 0">
            <input v-model="latesTemp" type="hidden" value="3487">
           <div v-for="(item, index) in latest" :key="index">
              <div class="row">
                <div class="col-sm-8">
                  <template v-if="item.articledata.length > 0" >
                    <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                    <div class="cutstom_rowss blog_description" >
                      <h4 class="b_heading"> {{item.articledata[0].articaldata.a_title}} </h4>
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <span class="b_time"> {{item.articledata[0].articaldata.created_at |createDatentime }}</span>
                    </div>
                    </a>
                    <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                  <template v-else-if="JSON.stringify(item.articledata) === '{}' &&  item.content !== null" >
                    <a class="href_color" :href="`/postview?id=${item.unique_id}`" target="_blank">
                    <div class="render_one_data">
                     <div class="render_data remove_cont_img">
                      <span v-html="item.content"> </span>
                    </div>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <div><span class="b_time"> {{item.posted_at |createDatentime }}</span></div>
                     </a>
                    </div>
                    </a>
                     <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                  <template v-else-if="JSON.stringify(item.articledata) === '{}' &&  item.content == null && item.refPost.content !== null" >
                    <a class="href_color" :href="`/postview?id=${item.refPost.unique_id}`" target="_blank">
                    <div class="render_one_data">
                     <div v-if="item.content == null && item.refPost.content" class="render_data remove_cont_img"> <a class="href_color" :href="`/postview?id=${item.refPost.unique_id}`" target="_blank"><span v-html="item.refPost.content"></span></a> </div><br>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <div><span class="b_time"> {{item.posted_at |createDatentime }}</span></div>
                     </a>
                    </div>
                    </a>
                    <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                </div>
                <div class="col-sm-4">
                    <div class="res_blog_img" v-if="item.articledata.length > 0">
                      <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                      <span v-if="item.articledata[0].uploaded_file.length > 0"><img :src="fileurl+item.articledata[0].uploaded_file[0]" class="resources_page_img"> </span>
                      </a>
                    </div>
                    <div class="res_blog_img" v-else-if="item.articledata.length > 0">
                      <span v-if="item.articledata[0].uploaded_file.length == 0 && item.articledata[0].section_uploaded_file !== ''"><img :src="fileurl+item.articledata[0].section_uploaded_file" class="resources_page_img"> </span>
                    </div>
                    <div class="res_blog_img" v-else-if="JSON.stringify(item.articledata) === '{}' && item.imageUrl.length > 0" >
                      <template v-if="item.imageUrl[0].includes('noimage') && item.videoUrl.length > 0">
                        <template v-if="item.videoThumbnail">
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img :src="fileurl+item.videoThumbnail" >
                        </a>
                        </template>
                        <template v-else-if="item.refPost.videoThumbnail">
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img :src="fileurl+item.refPost.videoThumbnail" >
                        </a>
                        </template>
                        <template v-else>
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img v-if="item.videoUrl[0].includes('youtube')" src="../assets/images/youtubeThumbnail.jpg" >
                          <img v-if="item.videoUrl[0].includes('vimeo')" src="../assets/images/vimeoThumnail.jpg" >
                        </a>
                        </template>
                      </template>

                      <template v-else>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                        <span class="resources_page_img" v-html="item.imageUrl[0]"></span>
                      </a>
                      </template>
                    </div>
                     <div class="res_blog_img" v-else>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                       <img src="../assets/images/noImage.png" class="resources_page_img">
                      </a>
                    </div>
                </div>
                </div>
              </div>
            </div>
            </div>

            <!-- for recommended -->
            <div id="recommended" class="tab-pane fade in active">
            <div v-if="recommended.length > 0">
            <input v-model="latesTemp" type="hidden" value="3487">
           <div v-for="(item, index) in recommended" :key="index">
              <div class="row">
                <div class="col-sm-8">
                    <template v-if="item.articledata.length > 0" >
                    <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                    <div class="cutstom_rowss blog_description" >
                      <h4 class="b_heading"> {{item.articledata[0].articaldata.a_title}} </h4>
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <span class="b_time"> {{item.articledata[0].articaldata.created_at |createDatentime }}</span>
                    </div>
                    </a>
                    <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                  <template v-else-if="JSON.stringify(item.articledata) === '{}' &&  item.content !== null" >
                    <a class="href_color" :href="`/postview?id=${item.unique_id}`" target="_blank">
                    <div class="render_one_data">
                     <div class="render_data remove_cont_img">
                      <span v-html="item.content"> </span>
                    </div>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <div><span class="b_time"> {{item.posted_at |createDatentime }}</span></div>
                     </a>
                    </div>
                    </a>
                     <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                  <template v-else-if="JSON.stringify(item.articledata) === '{}' &&  item.content == null && item.refPost.content !== null" >
                    <a class="href_color" :href="`/postview?id=${item.unique_id}`" target="_blank">
                    <div class="render_one_data">
                     <div v-if="item.content == null && item.refPost.content" class="render_data remove_cont_img"> <a class="href_color" :href="`/postview?id=${item.refpost.unique_id}`" target="_blank"><span v-html="item.refPost.content"></span></a> </div><br>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <div><span class="b_time"> {{item.posted_at |createDatentime }}</span></div>
                     </a>
                    </div>
                    </a>
                    <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                </div>
                <div class="col-sm-4">
                    <div class="res_blog_img" v-if="item.articledata.length > 0 && item.articledata[0].uploaded_file.length > 0">
                      <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                      <img :src="fileurl+item.articledata[0].uploaded_file[0]" class="resources_page_img">
                      </a>
                    </div>
                    <div class="res_blog_img" v-else-if="item.articledata.length > 0 && item.articledata[0].section_uploaded_file.length > 0">
                      <img :src="fileurl+item.articledata[0].section_uploaded_file" class="resources_page_img">
                    </div>
                    <div class="res_blog_img" v-else-if="JSON.stringify(item.articledata) === '{}' && item.imageUrl.length > 0">
                      <template v-if="item.imageUrl[0].includes('noimage') && item.videoUrl.length > 0">
                      <template v-if="item.videoThumbnail">
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img :src="fileurl+item.videoThumbnail" >
                        </a>
                        </template>
                        <template v-else-if="item.refPost.videoThumbnail">
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img :src="fileurl+item.refPost.videoThumbnail" >
                        </a>
                        </template>
                        <template v-else>
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img v-if="item.videoUrl[0].includes('youtube')" src="../assets/images/youtubeThumbnail.jpg" >
                          <img v-if="item.videoUrl[0].includes('vimeo')" src="../assets/images/vimeoThumnail.jpg" >
                        </a>
                        </template>
                      </template>
                      <template v-else>
                        <span class="resources_page_img" v-html="item.imageUrl[0]"></span>
                      </template>
                    </div>
                    <div class="res_blog_img" v-else>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                       <img src="../assets/images/noImage.png" class="resources_page_img">
                      </a>
                       <!-- <img v-if="JSON.stringify(item.articledata) === '{}' && item.imageUrl.length === 0" src="../assets/images/noImage.png" class="resources_page_img">
                       <img v-else-if="item.articledata.length > 0 && item.articledata[0].section_uploaded_file.length == '' && item.articledata[0].uploaded_file.length === 0" src="../assets/images/noImage.png" class="resources_page_img">  -->
                    </div>
                </div>
                </div>
              </div>
            </div>
            </div>

            <!-- for must read -->
            <div id="must_read" class="tab-pane fade">
            <div v-if="mustRead.length > 0">
            <input v-model="latesTemp" type="hidden" value="3487">
            <div v-for="(item, index) in mustRead" :key="index">
              <div class="row">
                <div class="col-sm-8">
                  <template v-if="item.articledata.length > 0" >
                    <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                    <div class="cutstom_rowss blog_description" >
                      <h4 class="b_heading"> {{item.articledata[0].articaldata.a_title}} </h4>
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <span class="b_time"> {{item.articledata[0].articaldata.created_at |createDatentime }}</span>
                    </div>
                    </a>
                    <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                  <template v-else-if="JSON.stringify(item.articledata) === '{}' &&  item.content !== null" >
                    <a class="href_color" :href="`/postview?id=${item.unique_id}`" target="_blank">
                    <div class="render_one_data">
                     <div class="render_data remove_cont_img">
                      <span v-html="item.content"> </span>
                    </div>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <div><span class="b_time"> {{item.posted_at |createDatentime }}</span></div>
                     </a>
                    </div>
                    </a>
                     <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                  <template v-else-if="JSON.stringify(item.articledata) === '{}' &&  item.content == null && item.refPost.content !== null" >
                    <a class="href_color" :href="`/postview?id=${item.unique_id}`" target="_blank">
                    <div class="render_one_data">
                     <div v-if="item.content == null && item.refPost.content" class="render_data remove_cont_img"> <a class="href_color" :href="`/postview?id=${item.refpost.unique_id}`" target="_blank"><span v-html="item.refPost.content"></span></a> </div><br>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <div><span class="b_time"> {{item.posted_at |createDatentime }}</span></div>
                     </a>
                    </div>
                    </a>
                    <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                </div>
                <div class="col-sm-4">
                    <div class="res_blog_img" v-if="item.articledata.length > 0 && item.articledata[0].uploaded_file.length > 0">
                      <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                      <img :src="fileurl+item.articledata[0].uploaded_file[0]" class="resources_page_img">
                      </a>
                    </div>
                    <div class="res_blog_img" v-else-if="item.articledata.length > 0 && item.articledata[0].section_uploaded_file.length > 0">
                      <img :src="fileurl+item.articledata[0].section_uploaded_file" class="resources_page_img">
                    </div>
                    <div class="res_blog_img" v-else-if="JSON.stringify(item.articledata) === '{}' && item.imageUrl.length > 0">
                      <template v-if="item.imageUrl[0].includes('noimage') && item.videoUrl.length > 0">
                      <template v-if="item.videoThumbnail">
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img :src="fileurl+item.videoThumbnail" >
                        </a>
                        </template>
                        <template v-else-if="item.refPost.videoThumbnail">
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img :src="fileurl+item.refPost.videoThumbnail" >
                        </a>
                        </template>
                        <template v-else>
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img v-if="item.videoUrl[0].includes('youtube')" src="../assets/images/youtubeThumbnail.jpg" >
                          <img v-if="item.videoUrl[0].includes('vimeo')" src="../assets/images/vimeoThumnail.jpg" >
                        </a>
                        </template>
                      </template>
                      <template v-else>
                        <span class="resources_page_img" v-html="item.imageUrl[0]"></span>
                      </template>
                    </div>
                      <div class="res_blog_img" v-else>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                       <img src="../assets/images/noImage.png" class="resources_page_img">
                      </a>
                       <!-- <img v-if="JSON.stringify(item.articledata) === '{}' && item.imageUrl.length === 0" src="../assets/images/noImage.png" class="resources_page_img">
                       <img v-else-if="item.articledata.length > 0 && item.articledata[0].section_uploaded_file.length == '' && item.articledata[0].uploaded_file.length === 0" src="../assets/images/noImage.png" class="resources_page_img">  -->
                    </div>
                </div>
                </div>
              </div>
            </div>
            </div>

            <!-- for videos -->
            <div id="videos" class="tab-pane fade">
            <div v-if="video.length > 0">
            <input v-model="latesTemp" type="hidden" value="3487">
            <div v-for="(item, index) in video" :key="index">
              <div class="row">
                <div class="col-sm-8">
                  <template v-if="item.articledata.length > 0">
                    <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                    <div class="cutstom_rowss blog_description" >
                      <h4 class="b_heading"> {{item.articledata[0].articaldata.a_title}} </h4>
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}}</p>
                      <span class="b_time"> {{item.articledata[0].articaldata.created_at |createDatentime }}</span>
                    </div>
                    </a>
                    <div class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                    <template v-else-if="JSON.stringify(item.articledata) === '{}' && item.content !== null">
                      <a class="href_color" :href="`/postview?id=${item.unique_id}`" target="_blank">
                     <div  class="render_one_data">
                     <div class="render_data remove_cont_img"><span v-html="item.content"> </span> </div>
                     <!-- <div v-if="item.content == null && item.refPost.content !== null" class="render_data remove_cont_img"> <a class="href_color" :href="`/postview?id=${item.refPost.unique_id}`" target="_blank"><span v-html="item.refPost.content"></span></a> </div> -->
                    <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                     <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                     <div><span class="b_time"> {{item.posted_at |createDatentime }}</span></div>
                     </a>
                    </div>
                    </a>
                    <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                        <ul>
                          <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2"  @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                        </ul>
                      </div>
                    </template>
                     <template v-else-if="JSON.stringify(item.articledata) === '{}' && item.content == null && item.refPost.content !== null">
                      <a class="href_color" :href="`/postview?id=${item.refPost.unique_id}`" target="_blank">
                     <div  class="render_one_data">
                     <div class="render_data remove_cont_img"> <span v-html="item.refPost.content"></span> </div>
                    <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                     <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                     <div><span class="b_time"> {{item.posted_at |createDatentime }}</span></div>
                     </a>
                    </div>
                    </a>
                    <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                        <ul>
                          <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2"  @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                        </ul>
                      </div>
                    </template>
                </div>
                <div class="col-sm-4">
                    <div class="res_blog_img" v-if="item.articledata.length > 0 && item.articledata[0].section_uploaded_file.length > 0">
                      <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                      <img :src="fileurl+item.articledata[0].section_uploaded_file" class="resources_page_img">
                      </a>
                    </div>
                     <div class="res_blog_img" v-if="JSON.stringify(item.articledata) === '{}' && item.videoUrl.length > 0" >
                       <template v-if="item.videoThumbnail">
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img :src="fileurl+item.videoThumbnail" >
                        </a>
                        </template>
                        <template v-else-if="item.refPost.videoThumbnail">
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img :src="fileurl+item.refPost.videoThumbnail" >
                        </a>
                        </template>
                        <template v-else>
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img v-if="item.videoUrl[0].includes('youtube')" src="../assets/images/youtubeThumbnail.jpg" >
                          <img v-if="item.videoUrl[0].includes('vimeo')" src="../assets/images/vimeoThumnail.jpg" >
                        </a>
                        </template>
                    </div>
                    <div class="res_blog_img" v-if="JSON.stringify(item.articledata) === '{}' && item.videoUrl.length == 0" >
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                      <img src="../assets/images/noImage.png" class="resources_page_img">
                      </a>
                    </div>
                </div>
                </div>
              </div>
            </div>
            </div>

             <!-- Modal -->
              <!-- <div :class="`modal fade ${showVideo?' in show':''}`" v-if="showVideo">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" @click="showVideo=false"> close </button>
                    </div>
                    <div class="modal-body" v-html="videoSource[0]">
                    </div>
                  </div>
                </div>
              </div> -->


          <!-- for audios -->
            <div id="audio" class="tab-pane fade">
            <div v-if="audio.length > 0">
            <input v-model="latesTemp" type="hidden" value="3487">
            <div v-for="(item, index) in audio" :key="index">
              <div class="row">
                <div class="col-sm-8">
                   <template v-if="item.articledata.length > 0" >
                    <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                    <div class="cutstom_rowss blog_description" >
                      <h4 class="b_heading"> {{item.articledata[0].articaldata.a_title}} </h4>
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <span class="b_time"> {{item.articledata[0].articaldata.created_at |createDatentime }}</span>
                    </div>
                    </a>
                    <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                  <template v-else-if="JSON.stringify(item.articledata) === '{}' &&  item.content !== null" >
                    <a class="href_color" :href="`/postview?id=${item.unique_id}`" target="_blank">
                    <div class="render_one_data">
                     <div class="render_data remove_cont_img">
                      <span v-html="item.content"> </span>
                    </div>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <div><span class="b_time"> {{item.posted_at |createDatentime }}</span></div>
                     </a>
                    </div>
                    </a>
                     <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                  <template v-else-if="JSON.stringify(item.articledata) === '{}' &&  item.content == null && item.refPost.content !== null" >
                    <a class="href_color" :href="`/postview?id=${item.unique_id}`" target="_blank">
                    <div class="render_one_data">
                     <div v-if="item.content == null && item.refPost.content" class="render_data remove_cont_img"> <a class="href_color" :href="`/postview?id=${item.refPost.unique_id}`" target="_blank"><span v-html="item.refPost.content"></span></a> </div><br>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                      <p class="b_name" v-if="item.userdetail">{{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <div><span class="b_time"> {{item.posted_at |createDatentime }}</span></div>
                     </a>
                    </div>
                    </a>
                    <div v-if="item.alltags.length > 0" class="blog_bottom_links">
                      <ul>
                        <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                      </ul>
                    </div>
                  </template>
                </div>
                <div class="col-sm-4">
                    <div class="res_blog_img" v-if="item.articledata.length > 0 && item.articledata[0].uploaded_file.length > 0">
                      <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                      <img :src="fileurl+item.articledata[0].uploaded_file[0]" class="resources_page_img">
                      </a>
                    </div>
                    <div class="res_blog_img" v-else-if="item.articledata.length > 0 && item.articledata[0].section_uploaded_file.length > 0">
                      <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                      <img :src="fileurl+item.articledata[0].section_uploaded_file" class="resources_page_img">
                      </a>
                    </div>
                    <div class="res_blog_img" v-else-if="JSON.stringify(item.articledata) === '{}' && item.imageUrl.length > 0">
                      <template v-if="item.imageUrl[0].includes('noimage') && item.videoUrl.length > 0">
                      <template v-if="item.videoThumbnail">
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img :src="fileurl+item.videoThumbnail" >
                        </a>
                        </template>
                        <template v-else-if="item.refPost.videoThumbnail">
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img :src="fileurl+item.refPost.videoThumbnail" >
                        </a>
                        </template>
                        <template v-else>
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img v-if="item.videoUrl[0].includes('youtube')" src="../assets/images/youtubeThumbnail.jpg" >
                          <img v-if="item.videoUrl[0].includes('vimeo')" src="../assets/images/vimeoThumnail.jpg" >
                        </a>
                        </template>
                      </template>
                      <template v-else>
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                        <span class="resources_page_img" v-html="item.imageUrl[0]"></span>
                        </a>
                      </template>
                    </div>
                    <div class="res_blog_img" v-else>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                       <img src="../assets/images/noImage.png" class="resources_page_img">
                      </a>
                       <!-- <img v-if="JSON.stringify(item.articledata) === '{}' && item.imageUrl.length === 0" src="../assets/images/noImage.png" class="resources_page_img">
                       <img v-else-if="item.articledata.length > 0 && item.articledata[0].section_uploaded_file.length == '' && item.articledata[0].uploaded_file.length === 0" src="../assets/images/noImage.png" class="resources_page_img">  -->
                    </div>
                </div>
                </div>
              </div>
            </div>
            </div>

          <!-- for saved contents -->
          <div id="saved" class="tab-pane fade">
            <div v-if="savedPost.length > 0">
            <div class="cutstom_rowss">
              <div v-for="(item, index) in savedPost" :key="index" class="row">
                <div class="col-sm-8">

                    <div class="blog_description"  v-if="item.articledata.length > 0">
                      <h4 v-if="item.articledata[0].articaldata" class="b_heading"> {{item.articledata[0].articaldata.a_title}} </h4>
                      <p v-if="item.userdetail" class="b_name"> {{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <span class="b_time"> {{item.posted_at |createDatentime }} </span>
                      <div class="blog_bottom_links">
                          <ul>
                              <li v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                          </ul>
                      </div>
                    </div>

                    <div class="blog_description"  v-else-if="JSON.stringify(item.articledata) === '{}'">
                      <h5 v-if="JSON.stringify(item.content) !== '{}'" class="b_heading remove_featured_img" v-html="item.content"></h5>
                      <h5 v-else-if="JSON.stringify(item.content) === '{}' && JSON.stringify(item.refPost.content) !== '{}'" class="b_heading remove_featured_img" v-html="item.refPost.content"></h5>

                      <p v-if="item.userdetail" class="b_name"> {{item.userdetail.firstname}} {{item.userdetail.lastname}} </p>
                      <span class="b_time"> {{item.posted_at |createDatentime }} </span>
                      <div class="blog_bottom_links">
                          <ul>
                              <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                          </ul>
                      </div>
                    </div>

                </div>
                <div class="col-sm-4">

                    <div class="res_blog_img" v-if="item.articledata.length > 0 && item.articledata[0].uploaded_file.length > 0">
                      <img :src="fileurl+item.articledata[0].uploaded_file[0]" class="resources_page_img">
                    </div>
                    <div class="res_blog_img" v-else-if="item.articledata.length > 0 && item.articledata[0].section_uploaded_file.length > 0 && item.articledata[0].uploaded_file.length == 0">
                      <object><img :src="fileurl+item.articledata[0].section_uploaded_file" class="resources_page_img"> </object>
                    </div>
                    <div v-else-if="JSON.stringify(item.articledata) === '{}' && item.imageUrl.length > 0" class="res_blog_img" >
                     <object> <span  class="resources_page_img" v-html="item.imageUrl[0]"></span></object>
                    </div>
                    <div class="res_blog_img" v-else>
                        <img src="../assets/images/noImage.png" class="resources_page_img">
                    </div>
                </div>
            </div>
          </div>
          </div>
        </div>
    </div>
    </div>

<!-- for right side pane -->
  <div class="col-sm-4" v-if="featuredPost.length > 0">
  <input v-model="latesTemp" type="hidden" value="3487">
    <div class="feautured_section">
        <h4 class="featured_heading"> Featured </h4>
          <div  v-for="(item, index) in featuredPost.slice(0, 6)" :key="index">
          <div class="row">
            <template v-if="item.articledata.length > 0">
            <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
            <div class="col-xs-8 cutstom_rowss" >
              <div class="featured_description">
                  <h4 class="f_heading">{{item.articledata[0].articaldata.a_title}}</h4>
                </div>
            </div>
             </a>
             <div class="fe_bottom_links">
                <ul>
                  <li v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                </ul>
              </div>
            </template>

            <template v-if="JSON.stringify(item.articledata) === '{}' && JSON.stringify(item.content) !== '{}'">
            <a class="href_color" :href="`/postview?id=${item.unique_id}`" target="_blank">
            <div class="col-xs-8 cutstom_rowss" >
                <div class="featured_description">
                  <h4 class="f_heading remove_featured_img remove_featured_video"><span v-html="item.content"></span></h4>
                </div>
              <div class="fe_bottom_links">
                <ul>
                  <a href="#">
                  <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                  </a>
                </ul>
              </div>
            </div>
            </a>
            </template>
            <template v-if="JSON.stringify(item.articledata) === '{}' && JSON.stringify(item.content) == '{}' && !item.content && item.refPost.content">
            <a class="href_color" :href="`/postview?id=${item.refPost.unique_id}`" target="_blank">
            <div class="col-xs-8 cutstom_rowss" >
                <div class="featured_description">
                  <h4 class="f_heading remove_featured_img remove_featured_video"><span v-html="item.refPost.content"></span></h4>
                </div>
              <div class="fe_bottom_links">
                <ul>
                  <a href="#">
                  <li style="cursor: pointer;" v-for="(item2, index2) in item.alltags" :key="index2" @click="searchAllPostByTagName(item2)"> {{item2.tagname}}</li>
                  </a>
                </ul>
              </div>
            </div>
            </a>
            </template>

            <div class="col-xs-4">
                <div class="res_blog_img" v-if="item.articledata.length > 0">
                  <div class="res_blog_img" v-if="item.articledata.length > 0 && item.articledata[0].uploaded_file.length > 0">
                      <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                      <img :src="fileurl+item.articledata[0].uploaded_file[0]" class="resources_page_img">
                      </a>
                    </div>
                    <div class="res_blog_img" v-else-if="item.articledata.length > 0 && item.articledata[0].section_uploaded_file.length > 0">
                      <a class="href_color" :href="`/articleview?id=${item.articledata[0].articleid}`" target="_blank">
                      <img :src="fileurl+item.articledata[0].section_uploaded_file" class="resources_page_img">
                      </a>
                    </div>
                </div>
                <div class="res_blog_img" v-if="JSON.stringify(item.articledata) === '{}' && JSON.stringify(item.content) !== '{}'">
                  <div v-if="item.imageUrl.length > 0" class="inside_div">
                    <template v-if="item.imageUrl[0].includes('noimage') && item.videoUrl.length > 0">
                     <template v-if="item.videoThumbnail">
                        <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                          <img :src="fileurl+item.videoThumbnail" >
                        </a>
                        </template>
                        <template v-else>
                          <template v-if="item.videoThumbnail">
                          <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                            <img :src="fileurl+item.videoThumbnail" >
                          </a>
                          </template>
                            <template v-else-if="item.refPost.videoThumbnail">
                              <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                                <img :src="fileurl+item.refPost.videoThumbnail" >
                              </a>
                              </template>

                          <template v-else>
                          <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                            <img v-if="item.videoUrl[0].includes('youtube')" src="../assets/images/youtubeThumbnail.jpg" >
                            <img v-if="item.videoUrl[0].includes('vimeo')" src="../assets/images/vimeoThumnail.jpg" >
                          </a>
                          </template>
                        </template>
                      </template>
                      <template v-else>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                        <span class="resources_page_img" v-html="item.imageUrl[0]"></span>
                      </a>
                      </template>
                  </div>
                    <div class="res_blog_img" v-else>
                      <a class="href_color" :href="`/postview?id=${item.uniqueId[0]}`" target="_blank">
                       <img src="../assets/images/noImage.png" class="resources_page_img">
                      </a>
                       <!-- <img v-if="JSON.stringify(item.articledata) === '{}' && item.imageUrl.length === 0" src="../assets/images/noImage.png" class="resources_page_img">
                       <img v-else-if="item.articledata.length > 0 && item.articledata[0].section_uploaded_file.length == '' && item.articledata[0].uploaded_file.length === 0" src="../assets/images/noImage.png" class="resources_page_img">  -->
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</div>
</div>
</template>

<script>

var username=localStorage.username;
var datetime = new Date();

export default {
  data (){
    return{
      featuredPost: [],
      errors:[],
      currentuser: null,
      latest:[],
      video:[],
      audio:[],
      recommended:[],
      mustRead:[],
      fileurl:window.publicfileurl,
      topics:[],
      topicDiv:true,
      titleDiv:false,
      sharedDiv:false,
      search:null,
      posttags:null,
      id:null,
      currentuserdata:null,
      defposttags:[],
      savedPost:[],
      latesTemp:null,
      userDetail:[],
      defposttags2:[],
      showVideo: false,
      videoSource: null

    }
  },
  methods:{
    // to calll all  API(s) in one methode
    toCallAllApi(){
        axios.post(`/getsaveresources`,{"user":this.currentuser,"resourceType":"featured"})
        .then(postresponse => {
          this.featuredPost = postresponse.data
          console.log('featured ',this.featuredPost);
        }).catch(e => {
          this.errors.push(e)
        })

        axios.post(`/getsaveresources`,{"user":this.currentuser,"resourceType":"latest"})
        .then(postresponse => {
          this.latest = postresponse.data
        }).catch(e => {
          this.errors.push(e)
        })

        axios.post(`/getsaveresources`,{"user":this.currentuser,"resourceType":"video"})
        .then(postresponse => {
          this.video = postresponse.data
        }).catch(e => {
          this.errors.push(e)
        })

        axios.post(`/getsaveresources`,{"user":this.currentuser,"resourceType":"audio"})
        .then(postresponse => {
          this.audio = postresponse.data
        }).catch(e => {
          this.errors.push(e)
        })

        axios.post(`/getsaveresources`,{"user":this.currentuser,"resourceType":"recommended"})
        .then(postresponse => {
          this.recommended = postresponse.data
        }).catch(e => {
          this.errors.push(e)
        })
        axios.post(`/getsaveresources`,{"user":this.currentuser,"resourceType":"mustRead"})
        .then(postresponse => {
          this.mustRead = postresponse.data
        }).catch(e => {
          this.errors.push(e)
        })
    },

    // to show video
    showVideoFoo(item){
      this.videoSource = item.videoUrl
      this.showVideo  = true
    },

    // to swith between tabs
    getTopics(div){
      this.search = null
        if(div==1){
          this.titleDiv= false
          this.sharedDiv = false
          this.topicDiv = true
        } else if(div==2){
          this.sharedDiv = false
          this.topicDiv = false
            this.titleDiv= true
        } else if(div==3){
          this.topicDiv = false
          this.titleDiv= false
          this.sharedDiv = true
        }
      this.toCallAllApi()

    },
    // to open saved list
     opensaveList()
      {
        axios.post(`/getsavedrespost`,{loginid:this.currentuser})
        .then(response => {
          this.savedPost = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      },

      // to get data by title searched
    getDataBySearchQuery(){

      if(this.search !=null && this.search.trim()!=''){
          // to get post by search query
            axios.post(`/getsaveresourcesbytitle`,{searchedtitle:this.search,user:this.currentuser})
          .then(postresponse => {
            if (postresponse.data.latest.length > 0){
              this.latest = postresponse.data.latest[0]
           }else{
             this.latest = []
           }
           if (postresponse.data.video.length > 0){
              this.video = postresponse.data.video[0]
           }else{
              this.video = []
           }
           if (postresponse.data.audio.length > 0){
              this.audio = postresponse.data.audio[0]
           }else{
             this.audio = []
           }
           if(postresponse.data.recommended.length > 0){
              this.recommended = postresponse.data.recommended[0]
           }else{
             this.recommended = []
           }
           if(postresponse.data.mustRead.length > 0){
              this.mustRead = postresponse.data.mustRead[0]
           }else{
             this.mustRead = []
           }
          })
          .catch(e => {
              this.errors.push(e)
          })
      } else {
        // this.toCallAllApi()
      }
  },
    // search by user detail(s)
    toSearchByUserDetail(){
       if(this.search !=null && this.search.trim()!=''){
         this.userDetail = []
        axios.post(`/getpostbyuserdetail`,{searcheduser:this.search, "user":this.currentuser,})
          .then(postresponse => {
            this.latesTemp = Math.random()
            this.userDetail = postresponse.data
          })
          .catch(e => {
            this.errors.push(e)
        })
     } else{
       this.toCallAllApi()
       this.userDetail = []
    }
  },

  // to get all post by user name
  getPostByUserName(data){
    this.search = `${data.firstname} ${data.lastname}`
      axios.post(`/getallpostbyusername`,{userid:data.unique_id, loginid:this.currentuser,})
         .then(postresponse => {
           this.latesTemp = Math.random()
           if (postresponse.data.latest.length > 0){
              this.latest = postresponse.data.latest[0]
           }else{
             this.latest = []
           }
           if (postresponse.data.video.length > 0){
              this.video = postresponse.data.video[0]
           }else{
              this.video = []
           }
           if (postresponse.data.audio.length > 0){
              this.audio = postresponse.data.audio[0]
           }else{
             this.audio = []
           }
           if(postresponse.data.recommended.length > 0){
              this.recommended = postresponse.data.recommended[0]
           }else{
             this.recommended = []
           }
           if(postresponse.data.mustRead.length > 0){
              this.mustRead = postresponse.data.mustRead[0]
           }else{
             this.mustRead = []
           }
         })
         .catch(e => {
           this.errors.push(e)
       })

  },

  // to search by tag name
  searchByTagName(){
    if(this.search !=null && this.search.trim()!=''){
      axios.post(`/get_addRestags`, {"searchedtag":this.search})
        .then(response => {
          this.defposttags2 = response.data
        })
        .catch(e => {
          this.errors.push(e)
      })
    } else{
      this.toCallAllApi()
      this.defposttags2 = []
    }
  },

  // to search by tag name
  searchAllPostByTagName(tags){
    this.search = tags.tagname
    if(this.search !=null && this.search.trim()!=''){
          // to get post by search query
            axios.post(`/getpostsbytagname`,{seltags:tags.unique_id,loginid:this.currentuser})
          .then(postresponse => {
              this.latesTemp = Math.random()
              this.latest = postresponse.data.latest[0] || []
              this.video = postresponse.data.video[0] || []
              this.audio = postresponse.data.audio[0] || []
              this.recommended = postresponse.data.recommended[0] || []
              this.mustRead = postresponse.data.mustRead[0] || []
          })
          .catch(e => {
              this.errors.push(e)
          })
      } else {
        this.toCallAllApi()
      }
  }
},
  mounted(){
  this.id = this.$route.query.id;

  axios.post(`/getcurrentuser`,{'username':username})
    .then(response =>
    {
        this.currentuser = response.data.unique_id
        this.currentuserdata = response.data

        // to add categorised post
        axios.post(`/getsaveresources`,{"user":this.currentuser,"resourceType":"featured"})
        .then(postresponse => {
          // this.featuredPost = postresponse.data.reverse();
            this.featuredPost = postresponse.data

        }).catch(e => {
          this.errors.push(e)
        })

        this.toCallAllApi()

        // for search post
        axios.post(`/getallresourceposts`,{seltags:'',loginid:this.currentuser})
        .then(response => {
              this.topics = response.data
        })
        .catch(e => {
            this.errors.push(e)
        })

        if(this.id==undefined)
        {
            this.id="";
            axios.post(`/get_addRestags`)
            .then(response => {
              this.defposttags = response.data
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
        else
        {
           console.log("resourcenew line 751")
        }
          }).catch(e => {
          this.errors.push(e)
        })
  }
}
</script>

<style>
.left_fixed {
  position: fixed;
  top: 75px;
}
ul.search_lists{
  height: 85vh;
  overflow-y: auto;
}

/* remove content images */
.remove_featured_img img{
  display: none;
}

/* remove content video from save content */
.remove_featured_img .videoframe{
  display: none;
}

.render_data.remove_cont_img img {
  display: none;
}

.rightt_scroll::-webkit-scrollbar, .search_lists::-webkit-scrollbar{
display:none;
}
.inside_div{
  height:100%;
}
.resources_front_img {
  width: 100%;
  height: 400px;
}

.resources_front_img img {
  width:100%;
  height:100%;
  object-fit:cover;
}
.blue_box {
  background: #326295;
  width: 100%;
  height: 100%;
  position: relative;
}

.light_blue {
  position: absolute;
  width: 0px;
  height: 0px;
  border-left: 50px solid #59b6e6;
  border-right: 30px solid transparent;
  border-top: 30px solid transparent;
  border-bottom: 30px solid transparent;
  top:50%;
  left:40%;
  transform:translate(-50%, -50%);

}
.modal-body iframe{
  width:100%;
}
.render_one_data .videoframe{
  display:none;
}
.modal-body .videoframe{
  display:block;
}
.render_one_data .p-fileprev{
  max-width: 310px;
  width: 48%;
  height: 150px;
  float: left;
  transform: translate(109%, -75%);
  min-height:unset;
}
.render_one_data {
  border-bottom: 2px solid #cccccc;
  min-height: 150px;
}

.render_data.remove_cont_img ~ .blog_bottom_links {
  position:unset;
}

p {
  width: 100%;
}

img.resources_page_img {
  width: 100%;
}

/* to remove text color from articles */
.href_color{
  text-decoration: none !important;
  color: black !important;
}

.resources_front_img img,.res_blog_img img {
    width: 100%;
}

/* remove content video */
.remove_featured_video span iframe.videoframe {
  display: none;
}

.res_blog_img img {
padding: 20px 0px 0px;
}

/* to  remove extra space from image */
.res_blog_img:nth-child(2) {
    display: contents;
}

/* for error image solution */
img:before {
  /* content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-size: cover;
  background-color: white;
  background-position: center;
  background-image: url('https://cdn.pixabay.com/photo/2017/03/08/21/20/pdf-2127829_960_720.png'); */

}

h5.b_heading.remove_featured_img p {
text-overflow: ellipsis;
height: 18px;
overflow: hidden;
white-space: nowrap;
}

.res_blog_img .res_blog_img img::before {
height:100%;
left:0;
top:0;
}

.cutstom_rowss .row {
border-bottom: 1px solid #ccc;
}
#saved .cutstom_rowss {
border-bottom: none;
}

.fe_bottom_links {
bottom: -11px;
position: absolute;
display: inline-block;
text-align: left;
left: 0;
margin: 13px 12px;
}

.featured_description {
margin-bottom: 40px;
}

span.b_time {
display: inline-block;
padding: 8px 0px 27px;
}
p.b_name {
display: inline-block;
width: 100%;

}

</style>