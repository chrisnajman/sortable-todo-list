---
permalink: /index.html
---

[Website (Git Pages)](https://chrisnajman.github.io/sortable-todo-list)

# Sortable Todo List

This todo list is combined from two sources:

1. The 'Advanced Todo List' tutorial in the [Javascript Simplified](https://courses.webdevsimplified.com/view/courses/javascript-simplified-beginner) course, by Kyle Cook.
2. [SortableJs](https://github.com/SortableJS/Sortable)

My own contribution to the code is:

1. The 'Completed' button, and
2. the 'Edit' button.

The todos, including completed and edited states, are successfully stored and retrieved from local storage. Likewise with the sort order: change the order, refresh the browser, and the rearranged items stay in place.

However, a problem arises if you:

1. Create a list of todo items,
2. rearrange the order, then
3. complete and / or edit a todo, then
4. refresh the browser

After refreshing, the completed and / or edited items move to the top of the list.
