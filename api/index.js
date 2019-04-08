const express = require('express')
const app = express()

app.use(express.json())

var todos = [
  { id: 0, title: 'Eat more food', dateDone: '', done: false },
  { id: 1, title: 'Get faceit level 10', dateDone: '', done: false },
  { id: 2, title: 'Start a todolist project', dateDone: '06/04', done: true },
  { id: 3, title: 'Mukbang!', dateDone: '', done: false },
  { id: 4, title: 'Deadlift 3x bodyweight', dateDone: '05/04', done: true },
  { id: 5, title: 'Learn VueJS', dateDone: '06/04', done: true },
  {
    id: 6,
    title: 'Make a new project using NuxtJS',
    dateDone: '06/04',
    done: true
  }
]

var idCounter = 7

//GET ALL TODOS
app.get('/', (req, res) => {
  res.json(todos)
})

//GET COUNTER
app.get('/counter', (req, res, next) => {
  res.json(idCounter)
})

//ADD A NEW TODO TO THE LIST OF TODOS
app.post('/add', (req, res, next) => {
  const todo = req.body
  todo.id = idCounter
  idCounter++
  todos.push(todo)
  res.sendStatus(200)
  res.end()
})

//SET TODO DONE/UNDONE
app.post('/done/:id&*', (req, res, next) => {
  const id = req.params.id
  const date = req.params[0]
  let index

  todos.forEach((item, i) => {
    if (item.id == id) {
      index = i
    }
  })

  if (todos[index].done === false) {
    todos[index].done = true
    todos[index].dateDone = date
  } else {
    todos[index].done = false
    todos[index].dateDone = ''
  }
  res.sendStatus(200)
  res.end()
})

//REMOVE TODO
app.post('/remove/:id', (req, res, next) => {
  const id = req.params.id

  todos.forEach((item, i) => {
    if (item.id == id) {
      todos.splice(i, 1)
    }
  })
  res.sendStatus(200)
  res.end()
})

module.exports = {
  path: '/api',
  handler: app
}
