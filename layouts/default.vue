<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          v-for="(menu, i) in menus"
          :key="i"
          :to="menu.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="menu.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="notification = !notification"
      >
        <v-badge
          v-if="messages.length > 0"
          left
          color="red"
          :content="messages.length"
        >
          <v-icon>mdi-bell</v-icon>
        </v-badge>
        <v-icon v-else>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="notification"
      right
      temporary
      fixed 
    >
      <v-list>
        <v-list-item>
          <v-list-item-title>Alerts</v-list-item-title>
        </v-list-item>
        <template v-for="(msg, i) in messages">
          <v-divider
            v-bind:key="`divider${i}`"
          ></v-divider>
          <v-list-item v-bind:key="`list${i}`">
            <v-list-item-content>
              <v-list-item-title v-text="msg" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      app 
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import socket from '~/plugins/socket.io.js'

export default {
  methods:{
    dataHandler(message) {
      console.log(message)
      this.messages.push(message)
    }
  },
  created () {
    socket.emit('join', 'notification')
    socket.on('data', this.dataHandler)
  },
  beforeDestroy () {
    socket.off('data', this.dataHandler)
  },
  data () {
    return {
      drawer: false,
      menus: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Simulator',
          to: '/simulator'
        }
      ],
      notification: false,
      title: 'Vending Machine Monitoring',
      messages: []
    }
  }
}
</script>
