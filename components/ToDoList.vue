<template>
  <v-card class="mb-5">
    <v-card-title class="justify-center" v-if="todos.length < 1">
      <h2>{{ errorMessage }} <v-icon color="cyan">far fa-laugh-wink</v-icon></h2>
      </v-card-title>
    <v-list>
      <v-list-tile v-for="(todo) in todos" :key="todo.id">
        <v-list-tile-content>
          <v-list-tile-title>
            <span>{{ todo.title }}</span>
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn flat icon :color="todo.done ? 'green' : 'red'" @click="toggleDone(todo.id)">
            <v-icon>{{ todo.done ? 'far fa-check-circle' : 'fas fa-circle-notch'}}</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action>
          <v-btn flat icon @click="removeTodo(todo.id)">
            <v-icon color="red accent-2">far fa-trash-alt</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['todos', 'errorMessage'],
  methods: {
    ...mapActions({ toggleDoneStore: 'toggleDone', removeTodoStore: 'removeTodo' }),
    toggleDone: function(id) {
      const date = this.$moment().format('DD/MM')
      this.$axios.post(`http://localhost:3000/api/done/${id}&${date}`)
      this.toggleDoneStore(id)
    },
    removeTodo(id) {
      this.$axios.post(`http://localhost:3000/api/remove/${id}`)
      this.removeTodoStore(id)
    }
  }
}
</script>

<style scoped>
</style>