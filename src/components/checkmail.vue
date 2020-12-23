<template>
  <div id="app">
  <v-app id="inspire">
    <v-container fluid>
      <v-select
        v-model="model"
        class="autocomplete"
        :filter="filter"
        :hide-no-data="!search"
        :items="items"
        :search-input.sync="search"
        label="Search for an option"
        multiple
        small-chips
        solo
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-chip
              label
              small
            >
              {{ search }}
            </v-chip>
          </v-list-item>
        </template> 
        <template slot="selection" slot-scope="{ attrs, item, parent, selected }">
          <v-chip
            v-if="item === Object(item)"
            v-bind="attrs"
            :input-value="selected"
            label
            small
          >
            <span class="pr-2">
              {{ item.text }}
            </span>
            <v-icon
              small
              @click="parent.selectItem(item)"
            >close</v-icon>
          </v-chip>
        </template>
        <template slot="items" slot-scope="{item,index}" >
          <v-text-field
            v-if="editing === item"
            v-model="editing.text"
            autofocus
            flat
            background-color="transparent"
            hide-details
            solo
            @keyup.enter="edit(index, item)"
          ></v-text-field>
          <v-chip
            v-else
            dark
            label
            small
          >
            {{ item.text }}
          </v-chip>
        </template>
      </v-select>
    </v-container>
  </v-app>
</div>
</template>
<script>
  import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);
  export default {
    data: () => ({
      activator: null,
      attach: null,
      editing: null,
      index: -1,
      items: [
        { header: 'Select an option or create one' },
        {text: 'Foo'},
        {text: 'Bar'},],
      menu: false,
      model: [],
      x: 0,
      search: null,
      y: 0,
    }),

    watch: {
      model (val, prev) {
        if (val.length === prev.length) return
        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1],
            }

            this.items.push(v)

            this.nonce++
          }
        return v
      })
    },
  },

    methods: {
      edit (index, item) 
      {
        if (!this.editing) {
          this.editing = item
          this.index = index
        } else {
          this.editing = null
          this.index = -1
        }
      },
      filter (item, queryText, itemText) 
      {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
    },
  }
</script>