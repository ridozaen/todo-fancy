<template>
    <todo-list :todos="todos" @createTodo="addTodo" @deleteTodo="deleteTodo"
          @completedTask="completedTask"
          @editTodo="updateTodo"></todo-list>
</template>

<script>
/* eslint-disable */
import TodoList from "./TodoList";
import axios from "axios";
import swal from "sweetalert2";

// const baseUrl = "http://localhost:3000";

export default {
  name: "Home",
  components: {
    TodoList
  },
  data() {
    return {
      todos: [],
      email: "",
      token: ""
    };
  },
  methods: {
    getTodos() {
      axios
        .get(`/todos`, { headers: { Authorization: this.token } })
        .then(response => {
          this.todos = response.data.todos;
          console.log(response.data);
        })
        .catch(err => {
          console.log("error: ", err.response);
        });
    },
    addTodo(task) {
      axios
        .post(`/todos`, { task }, { headers: { Authorization: this.token } })
        .then(response => {
          this.todos.unshift(response.data.result);
          console.log(response.data);
        })
        .catch(err => {
          console.log("error", err.response);
        });
    },
    updateTodo(todo) {
      if (todo.isDone) {
            swal({
              type: "error",
              title: "Oops...",
              text: "Task is done cannot be modified"
            });        
      } else {
        axios
          .put(
            `/todos/${todo._id}`,
            { task: todo.task },
            { headers: { Authorization: this.token } }
          )
          .then(response => {
            console.log(response.data);
          })
          .catch(err => {
            swal({
              type: "error",
              title: "Oops...",
              text: err
            });
            console.log("error", err.response);
          });
      }
    },
    deleteTodo(todo) {
      console.log("delete Todo", todo);
      axios
        .delete(`/todos/${todo._id}`, {
          headers: { Authorization: this.token }
        })
        .then(response => {
          let index = this.todos.findIndex(x => x._id === todo._id);
          this.todos.splice(index, 1);
          console.log("delete success", response.data);
        })
        .catch(err => {
          console.log("error: ", err.response);
        });
    },
    completedTask(todo) {
      console.log("completed task home", todo);
      axios
        .put(
          `/todos/done/${todo._id}`,
          { isDone: todo.isDone },
          { headers: { Authorization: this.token } }
        )
        .then(response => {
          console.log("task completed", response.data);
        })
        .catch(err => {
          console.log("error", err.response);
        });
    }
  },
  created: function() {
    this.token = localStorage.getItem("curr-token");
    console.log("create home");
    // if (!this.token) {
    // this.$router.push({ name: "Login" });
    // } else {
    this.getTodos();
    // }
  }
};
</script>
<style>
</style>
