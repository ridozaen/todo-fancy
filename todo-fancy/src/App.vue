<template>
  <div id="app">
          <todo-list :todos="todos" @createTodo="addTodo" @deleteTodo="deleteTodo"
          @completedTask="completedTask"></todo-list>
    <!-- <router-view/> -->
  </div>
</template>

<script>
/* eslint-disable */
import TodoList from "./components/TodoList";

export default {
  name: "App",
  components: {
    TodoList
  },
  data() {
    return {
      todos: [
        {
          id: "1",
          task: "Makan Nasi Padang",
          isDone: true
        },
        {
          id: "2",
          task: "Makan Nasi Kucing",
          isDone: false
        },
        {
          id: "3",
          task: "Coding Javascript",
          isDone: false
        }
      ]
    };
  },
  methods : {
    addTodo(task){
      this.todos.push({
        id : "4",
        task,
        isDone : false
      })
    },
    deleteTodo(todo){
      console.log('delete Todo', todo);
    },
    completedTask(todo){
      console.log('completed task vue', todo)
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
