<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>MY</span>
      <span class="font-weight-light">TODO LIST</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon to="/todolist">
      <v-badge color="red" overlap>
        <template v-slot:badge>
          <span>{{ undone }}</span>
        </template>
        <v-icon>alarm</v-icon>
      </v-badge>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['todos']),
    undone: function() {
      if(this.todos !== null) {
      return this.todos.filter(todo => !todo.done).length
      }
    }
  }
}
</script>

<style scoped>
</style>