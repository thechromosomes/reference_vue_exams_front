<script>  
export default {
   created(){
    //console.log(decodeURIComponent(this.$route.query.token))
    var hello=decodeURIComponent(this.$route.query.token);
    console.log(hello);
     var vars = hello.split('&');
     var pair=[];
    for (var i = 1; i < 2; i++) {
        var pair = vars[i].split('=');
    }
       console.log(pair);
var decodedData=window.atob(pair[1]);
console.log(decodedData);
this.$store.dispatch('gpexlogin', {'email': decodedData }).then(() => {
       location.href='/onboarding';
      }).catch(console.error)
 
    }
  
}
</script>
