<template>
  <div v-if="!loading">
    <v-layout justify-center align-center>
      <v-flex xs12 sm8 md6>
        <v-form class="mb-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="text" :counter="20" :rules="textRules" label="Title" required></v-text-field>
          <v-btn @click="submit" color="success">Add</v-btn>
          <v-btn @click="clear" color="error">clear</v-btn>
        </v-form>
        <transition
          enter-active-class="animated fadeInRight"
          leave-active-class="animated fadeOutRight"
          mode="out-in"
        >
          <todolist-app
            :todos="todos"
            :errorMessage="'Please add something!'"
            v-if="listView === 'all'"
            key="all"
          />
          <todolist-app
            :todos="todos.filter(i => !i.done)"
            :errorMessage="'Yay!'"
            v-if="listView === 'not-done'"
            key="not-done"
          />
          <todolist-app
            :todos="todos.filter(i => i.done)"
            :errorMessage="'Lets get things done!'"
            v-if="listView === 'done'"
            key="done"
          />
        </transition>
      </v-flex>
    </v-layout>
    <v-footer fixed inset app style="height: -15px;">
      <v-bottom-nav :value="true" :active.sync="listView" :color="bottomNavColor">
        <v-btn flat color="white" value="all">
          <span>All</span>
          <v-icon>fas fa-tasks</v-icon>
        </v-btn>
        <v-btn flat color="white" value="not-done">
          <span>Not Done Yet</span>
          <v-icon>far fa-minus-square</v-icon>
        </v-btn>
        <v-btn flat color="white" value="done">
          <span>Done</span>
          <v-icon>far fa-check-square</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ToDoList from '@/components/ToDoList.vue'

export default {
  components: {
    todolistApp: ToDoList
  },
  data: function() {
    return {
      text: '',
      valid: true,
      textRules: [
        v => !!v || 'Title is required!',
        v => /^\w+/.test(v) || 'No spaces at the beginning!'
      ],
      listView: 'all',
      loading: false
    }
  },
  computed: {
    ...mapGetters(['todos']),
    bottomNavColor: function() {
      switch (this.listView) {
        case 'all':
          return 'blue lighten-1'
        case 'not-done':
          return 'deep-orange darken-1'
        case 'done':
          return 'teal accent-3'
      }
    }
  },
  methods: {
    clear: function() {
      this.$refs.form.reset()
    },
    submit: async function() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        const id = await this.$axios
          .get('/api/counter')
          .then(response => response.data)

        const todo = { id: id, title: this.text, dateDone: '', done: false }
        this.$axios.post('/api/add', todo)
        this.addTodo(todo)
        this.clear()
      }
    },
    ...mapActions(['addTodo']),
    getDate: function() {
      return this.$moment().format('DD/MM')
    }
  },
  async fetch({ store }) {
    await store.dispatch('getTodos')
  },
  //TO ENSURE THAT ASYNC FETCH IS COMPLETED BEFORE PAGE RENDER
  mounted: function() {
    this.loading = false
  },
  created: function() {
    this.loading = true
  }
}
</script>
<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');

.bottom {
  position: absolute;
  z-index: 3;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>