<template>
  <v-app>
    <navbar-app/>
    <sidebar-app/>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    sidebarApp: Sidebar,
    navbarApp: Navbar
  }
}
</script>