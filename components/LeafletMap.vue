<template>
  <div style="height: 600px; width: 100%">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 600px; z-index: 1"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker v-for="mach in machines" v-bind:key="mach.id" :lat-lng="{ lng: mach.lng, lat: mach.lat }">
        <l-icon
          :icon-size="[32, 32]"
          :icon-anchor="[16, 16]"
        >
          <img
            src="~assets/icons/vending-machine.svg"
            :class="mach.products.filter(pd => pd.amount < 10).length > 0 ? 'icon-marker alert' : 'icon-marker normal'"
          >
        </l-icon>
        <l-tooltip :options="{ opacity: 0.8, permanent: true, interactive: true, offset: [16, 0]}">
          <div>
            {{mach.name}}
          </div>
        </l-tooltip>
        <l-popup>
          <div @click="innerClick">
            <strong>{{mach.name}}</strong>
            <p>
              {{mach.products}}
            </p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
<script>

export default {
  name: "LeafletMap",
  props: ["machines"],
  data() {
    return {
      zoom: 8,
      center: { lng: 100.5018, lat: 13.7563 },
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withTooltip: { lng: 100.5118, lat: 13.7563 },
      currentZoom: 8,
      currentCenter: { lng: 100.5018, lat: 13.7563 },
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert('Click!');
    }
  },
  computed: {
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }
  }
}
</script>

<style>
.icon-marker {
  width:100%;
  height:100%;
  border-radius:8px;
}
.normal {
  background-color: rgb(12, 223, 117);
}
.alert {
  background-color: rgb(241, 104, 69);
}
</style>