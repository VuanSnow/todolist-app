<template>
  <v-navigation-drawer app permanent class="grey lighten-4">
    <v-layout class="fill-height" column>
      <v-list>
        <v-list-tile
          avatar
          v-for="(link, i) in links"
          :key="i"
          :active-class="link.color"
          :to="link.to"
          class="v-list-item ma-1"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ link.name }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  data: function() {
    return {
      links: [
        { name: 'Dashboard', to: '/', color: 'success1', icon: 'home' },
        {
          name: 'Todo List',
          to: '/todolist',
          color: 'cyan accent-3',
          icon: 'format_list_bulleted'
        }
      ]
    }
  }
}
</script>

<style>
.v-list-item {
  margin: 0 15px;
}

.v-list__tile {
  border-radius: 4px;
}

.v-list__tile--active {
  color: white;
}
</style>