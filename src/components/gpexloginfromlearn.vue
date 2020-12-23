<script>  
export default {
   created(){
    //console.log(decodeURIComponent(this.$route.query.token))
    var hello=decodeURIComponent(this.$route.query.token);
    console.log('hello',hello);
     var vars = hello.split('&');
     var pair1=[];
     var pair2=[];
        var pair1 = vars[1].split('=');
        var pair2 = vars[3].split('=');
       console.log('pair',pair1);
var decodedData=window.atob(pair1[1]);
var username=window.atob(pair2[1]);
console.log('option one',decodedData);
console.log('option two',username);
this.$store.dispatch('gpexlogin', {'email': decodedData }).then(() => {
       location.href='/userdashboard?id='+pair2[1];
      }).catch(console.error)
 
    }
  
}
</script>
