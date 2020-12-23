<template>
    <div>
        <form-builder type="template"></form-builder>
        <form-builder type="gui" :form="yourConfigFormObject"></form-builder>
    </div>
</template>
<script>
  export default {
    name:yourConfigFormObject
      components: {getusername},
      data(){
      return {
      yourConfigFormObject: []
      }
      }
  }
  </script>