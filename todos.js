const form = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const list = document.createElement("ul")
const template = document.querySelector("#list-item-template")

const LOCAL_STORAGE_PREFIX = "SORTABLE-TODO-LIST"
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`

let todos = loadTodos()
todos.forEach((todo) => renderTodo(todo))

list.setAttribute("id", "list")
form.after(list)

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const todoName = todoInput.value
  if (todoName === "") return
  const newTodo = {
    name: todoName,
    complete: false,
    edited: false,
    id: new Date().valueOf().toString(),
  }

  todos.push(newTodo)
  renderTodo(newTodo)
  saveTodos()
  todoInput.value = ""
})

function renderTodo(x) {
  const templateClone = template.content.cloneNode(true)
  const listItem = templateClone.querySelector(".list-item")
  listItem.dataset.todoId = x.id
  const textElement = templateClone.querySelector("[data-list-item-text]")
  textElement.innerText = x.name

  const completeBtnText = templateClone.querySelector("[data-button-complete]")
  x.complete
    ? (completeBtnText.innerText = "Uncomplete")
    : (completeBtnText.innerText = "Complete")

  listItem.classList.toggle("complete", x.complete)

  list.appendChild(templateClone)
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY)
  return JSON.parse(todosString) || []
}

// Edit button
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-edit]")) return

  e.target.innerText = e.target.innerText === "Edit" ? "Save edit" : "Edit"
  const parent = e.target.closest(".list-item")
  const text = parent.querySelector("[data-list-item-text]")

  text.toggleAttribute("contenteditable")

  const todoId = parent.dataset.todoId
  const todo = todos.find((t) => {
    return t.id === todoId
  })

  todo.edited = !text.hasAttribute("contenteditable")

  if (todo.edited) todo.name = text.innerText

  saveTodos()
})

// Complete button
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-complete]")) return
  e.target.innerText =
    e.target.innerText === "Complete" ? "Uncomplete" : "Complete"

  const parent = e.target.closest(".list-item")

  parent.classList.toggle("complete")

  const todoId = parent.dataset.todoId
  const todo = todos.find((t) => {
    return t.id === todoId
  })
  todo.complete = parent.classList.contains("complete")

  saveTodos()
})

// Delete button
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return

  // Remove from the screen
  const parent = e.target.closest(".list-item")

  parent.remove()

  // Remove from list
  const todoId = parent.dataset.todoId

  todos = todos.filter((todo) => {
    return todo.id !== todoId
  })

  saveTodos()
})

// Sortable drag and drop
if (list) {
  const sortable = Sortable.create(list, {
    group: "SORTED-TODOS",
    store: {
      /**
       * Get the order of elements. Called once during initialization.
       * @param   {Sortable}  sortable
       * @returns {Array}
       */
      get: function (sortable) {
        const order = localStorage.getItem(sortable.options.group.name)
        return order ? order.split("|") : []
      },
      /**
       * Save the order of elements. Called onEnd (when the item is dropped).
       * @param {Sortable}  sortable
       */
      set: function (sortable) {
        const order = sortable.toArray()
        localStorage.setItem(sortable.options.group.name, order.join("|"))
      },
    },
  })
}
