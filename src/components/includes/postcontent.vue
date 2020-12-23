<template>
<div>
<p v-if="filtereddata!=null" class="content_user" v-html="filtereddata"></p>
</div>
</template>

<script>

export default {
  props: ['postdata','preview_flag','preview_data'],
  data: () => ({
    loaded: false,
    filtereddata: null,
    fileurl:window.publicfileurl,
  }),
  methods:{
    async loaddata()
    {
      this.loaded = false  
      var re =  /(?:|[ ])#([a-zA-Z_0-9-!@$%&*]+)/gm;
      if(this.postdata!==null){
    var str = this.postdata.replace(/<\/p>/g, " ");
      }else{
var str='';
      }
  
      var m;
      var array1=[];
      if((m = re.exec(str)) != null)
      {
        var array = str.split("#"); 
        var subarray=[];
        if(array.length){
          subarray.push(array[0]);
        
        for(var i = 1; i < array.length;i++)
        {
          var subarr = array[i].split(" ")
          subarr[0] ='<a href="/?hashvalue='+subarr[0]+'"><span class="hashtag cursoron"> #'+subarr[0]+' </span></a> ';
          subarr=subarr.join(' ');
          subarray.push(subarr);
      }
      }
          subarray=subarray.join(' ');

          this.filtereddata=subarray;
      }
      else
      {
        // console.log(str)
        this.filtereddata=this.postdata;
      }
      if(this.preview_flag){
        var postdatas=JSON.parse(this.preview_data);
        var preview='';
        preview +='<a href="'+postdatas.anchorurl+'" class="cursoron" target="_blank">';
        preview +='<div class="preview-main">';
 if(postdatas.imageurl!==null)
              {
                //alert(postdatas.imageurl);
                 let img = new Image();
                //this.preview_data.imageurl=postdatas.imageurl;
                console.log('if 5');
                img.src = postdatas.imageurl;
                if(img.width>=800){
                  console.log('else if 6');
                  var imgwidth=800;
                  var widper=((img.width-800)*100)/img.width;
                  var heightper=(img.height*widper)/100;
                  var imgheight=img.height-heightper;
                }
                else if(img.width<800 && img.width>400){
                  console.log('else if 7');
                  var imgwidth=400;
                  var widper=((img.width-400)*100)/img.width;
                  var heightper=(img.height*widper)/100;
                  var imgheight=img.height-heightper;
                }
                else{
                  console.log('else 8');
                  var imgwidth=img.width;
                  var imgheight=img.height;
                }
                if(imgwidth<800){ var contwidth=800-imgwidth; }
                else{ var contwidth=800; }
                var contheight=imgheight;
                console.log('width:'+img.width+'height'+img.height);
                preview +='<div class="preview-img" height="'+imgheight+'px" width="'+imgwidth+'px"><img src="'+postdatas.imageurl+'" height="'+imgheight+'px" width="'+imgwidth+'px"/></div>';
              } 

        preview +='<div class="preview-content" height="'+contheight+'px" width="'+contwidth+'px">';
 if(postdatas.host!==null)
              {
        preview +='<span class="p-host">'+postdatas.host+'</span>';
              }
               if(postdatas.title!==null)
              {
        preview +='<span class="p-title">'+postdatas.title+'</span>';
              } if(postdatas.description!==null)
              {
        preview +='<span class="p-desc">'+postdatas.description+'</span>';
              }
        preview +='</div>';

        preview +='</div>';
        preview +='</a>';
        this.filtereddata =this.filtereddata+preview;
      }
      // var m;
      // if((m = re.exec(str)) != null)
      // {
      //   console.log("inside if");
      //   var array = str.split("#"); 
        
      // }
      // else
      // {
      //   this.filtereddata=this.postdata;
      // }
      try {
        // console.log('pdf data',this.$refs);
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
    postdata: function (newQuestion, oldQuestion) {
      //this.answer = 'Waiting for you to stop typing...'
      //this.debouncedGetAnswer()
      this.loaddata();
    },
    preview_flag: function (newQuestion, oldQuestion) {
      //this.answer = 'Waiting for you to stop typing...'
      //this.debouncedGetAnswer()
     // this.loaddata();
    },
    preview_data: function (newQuestion, oldQuestion) {
      //this.answer = 'Waiting for you to stop typing...'
      //this.debouncedGetAnswer()
      this.loaddata();
    }
  }
}
</script>