<template>



<div>
  <label class="typo__label">Groups</label>
  <multiselect v-model="value" :options="options" :multiple="true" group-values="libs"  :group-select="true" placeholder="Type to search" track-by="name" label="name"></multiselect>
  <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
</div>

</template>
 <script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data () {
    return {


      options: [
        {
          libs: [
            { name: 'A', category: 'A' },
            { name: 'B', category: 'B' },
            { name: 'C', category: 'C' },
            { name: 'D', category: 'D' },
            { name: 'E', category: 'E' }
          ]
        }
      ],
      value: []



      
    }
  }
}
</script>