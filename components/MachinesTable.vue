<template>
  <v-container fluid>
    <v-data-iterator
      :items="machineData"
      :search="search"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:default="props"> 
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            md="6"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.name }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item key="column-header">
                  <v-list-item-content class="blue--text">
                    Product
                  </v-list-item-content>
                  <v-list-item-content class="align-end blue--text">
                    Quantity
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="(key, index) in Object.keys(item).filter(key => key !== 'name')"
                  :key="index"
                >
                  <v-list-item-content>
                    {{ key }}
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'red--text': item[key] < 10 }"
                  >
                    {{ item[key] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
  export default {
    name: "MachinesTable",
    props: ["machines"],
    data () {
      return {
        search: '',
        filter: {}
      }
    },
    computed: {
      machineData: function () {
        return (this.machines || []).map((mach) => {
          return {
            name: mach.name,
            ...mach.products.reduce((accum, prod) => Object.assign(accum, { [prod.name]: prod.amount }), {})
          }
        })
      }
    }
  }
</script>