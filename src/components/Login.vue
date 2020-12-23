<template>


<div class="col-md-12 full_section">

<div class="col-md-6 col-sm-6 left_section"><img src="../assets/images/cape-spencer-lighthouse-small2.jpeg"class="img-responsive left_section_image"></div>
<!---left_section----->

<div class="col-md-6 col-sm-6 right_section">

<div class="col-md-12">
<div class="right_center">
<img src="../assets/images/logo.png" class="logo">
<p class="tag_line">Please login using your GPEx user details</p>
<input type="text" placeholder="Username or Email" class="user_in" v-model="email" />
<input type="password" placeholder="Password" v-model="password" class=" pswd_in" />
<button type="submit" class="btn btn_login" @click='logIn'>Login</button>
<ul class="rightsurvey_ul">
<li>Scan QR Code to login</li>
<li>Forgot password?</li>
</ul>
<p class="tag_line">Contact support at <a href="#" class="anc_color">support@gpex.com.au</a></p>
</div>
</div>

</div><!----right_section------>

<div class="clearfix"></div>

<div class="footer_sy">
<div class="col-md-4"></div>
<div class="col-md-4 copyright">Copyright GPExSA 2019</div>
<div class="col-md-4">
<ul class="footersurvey_ul">
<li>Terms of services</li>
<li>Privacy policy</li>
</ul>
</div>
</div>


</div><!----full_section------>




     
</template>

<style>
.container.fluid{padding:0 !important;}
body {overflow: hidden!important;}
@media only screen and (min-width:767x) and (max-width:991px){
body {overflow: hidden!important;}
}

</style>
<script>  
export default {
  data(){
    return {
      email:null,
      password:null
    }
  },
  methods: {
    logIn(){
      this.$store.dispatch('login', { email: this.email, password: this.password }).then(() => {
        location.href='/onboarding';
      }).catch(console.error)
    }
  },
  created() {
      location.href='https://one.gpex.com.au';

  }
}

</script>

