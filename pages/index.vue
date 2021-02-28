<template>
  <v-row justify='center'>
    <v-col cols='12' sm='8' md='6'>
      <leaflet-map
        :machines="machineComputed"
      />
    </v-col>
    <v-col cols='12' md='6'>
      <machines-table
        :machines="machineComputed"
      />
    </v-col>
  </v-row>
</template>

<script>
import LeafletMap from '~/components/LeafletMap.vue'

export default {
  name: "Home",
  head: {
    title: "Home"
  },
  components: {
    LeafletMap
  },
  async asyncData({ $axios }) {
    try {
      const response = await Promise.all([
        $axios.$get(`${process.env.API_URL}/api/machines`),
        $axios.$get(`${process.env.API_URL}/api/products`)
      ])
      if (response && response.length >= 2) {
        const machines = response[0] || []
        const products = response[1] || []
        return { products, machines }
      }
    } catch (e) {
      console.log(e)
      return {}
    }
  },
  computed: {
    machineComputed: function () {
      return (this.machines || []).map((mach) => {
        const machineProducts = this.products.filter(pd => pd.machineId == mach.id)
        return Object.assign({}, mach, { products: machineProducts})
      })
    }
  }
}
</script>
