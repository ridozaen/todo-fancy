<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-4 offset-sm-4 p-2">
                <div class="input-group mb-3">
                    <input type="text" placeholder="What Todo?" class="form-control" ref="task">
                    <div class="input-group-append">
                        <span class="btn input-group-text" @click="createTodo">Add</span>
                    </div>
                </div>
            </div>
        </div>
        <todo v-for="todo in todos" :key="todo.id" :todo="todo"
        @deleteTodo="deleteTodo"
        @completedTask="completedTask"></todo>
    </div>
</template>

<script>
/* eslint-disable */
import Todo from "./Todo";
export default {
  methods: {
    deleteTodo(todo) {
      this.$emit("deleteTodo", todo);
    },
    createTodo() {
      this.$emit("createTodo", this.$refs.task.value);
      this.$refs.task.value = "";
    },
    completedTask(todo) {
    //   console.log("todolist completed", todo);
      this.$emit("completedTask", todo)
    }
  },
//   computed: {
//       this.props.todos
//   },
  components: {
    Todo
  },
  props: ["todos"]
};

/* eslint-disable */
</script>

<style>
</style>


