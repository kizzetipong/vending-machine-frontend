import Vue from 'vue'

import { LMap, LMarker, LTileLayer, LPopup, LTooltip, LIcon } from 'vue2-leaflet'

const VueLeaflet = {

  install(Vue, options) {
    Vue.component('l-map', LMap)
    Vue.component('l-marker', LMarker)
    Vue.component('l-tile-layer', LTileLayer)
    Vue.component('l-popup', LPopup)
    Vue.component('l-tooltip', LTooltip)
    Vue.component('l-icon', LIcon)
  }

};

Vue.use(VueLeaflet);

export default VueLeaflet;