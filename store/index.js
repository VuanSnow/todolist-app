export const strict = false

export const state = () => ({
  todos: []
})

export const getters = {
  todos: state => state.todos
}

export const mutations = {
  SET_TODO: (state, payload) => (state.todos = payload),
  TOGGLE_DONE: (state, payload) => {
    state.todos[payload.id].done = payload.done
    state.todos[payload.id].dateDone = payload.dateDone
  },
  ADD_TODO: (state, payload) => state.todos.push(payload),
  REMOVE_TODO: (state, payload) => state.todos.splice(payload, 1)
}

export const actions = {
  //Get all todos
  async getTodos({ commit }) {
    const data = await this.$axios.get('/api')
    console.log(data)
    commit('SET_TODO', data.data)
  },
  //Toggle done todo
  toggleDone({ state, commit }, id) {
    const index = state.todos.findIndex(e => e.id === id)
    const status = state.todos[index].done
    const date = this.$moment().format('DD/MM')

    status
      ? commit('TOGGLE_DONE', { id: index, dateDone: '', done: false })
      : commit('TOGGLE_DONE', { id: index, dateDone: date, done: true })
  },
  //Add todo
  addTodo: function({ commit }, todo) {
    commit('ADD_TODO', todo)
  },
  //Remove todo
  removeTodo: function({ commit, state }, id) {
    //Index of the todo in todos arr
    const index = state.todos.findIndex(e => e.id === id)
    commit('REMOVE_TODO', index)
  }
}
