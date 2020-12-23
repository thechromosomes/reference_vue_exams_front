<template>
  <div class="text_contact">
    <h4> Slider </h4>
    <v-form class="text_contacttext" ref="form" v-model="data" lazy-validation >
      <v-text-field v-for="(item,i) in items"
      :key="i"
      :value="item.src" label="URL 1..." required ></v-text-field>
      <v-btn > Add more </v-btn>
    </v-form>
    <v-divider v-if="buildetype === 'divider'"></v-divider>
<v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
    </div>
</template>
<style scoped>
.text_contact{
  padding-bottom: 30px;
}
</style>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          }
        ]
      }
    }
  }
</script>