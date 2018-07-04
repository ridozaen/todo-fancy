<template>
    <div class="container">
        <div class="row">
            <todo-weather></todo-weather>
            <div class="col-sm-4 offset-sm-4 p-2">
                <div class="input-group mb-3">
                    <input type="text" placeholder="What Todo?" class="form-control" ref="task" @keyup.enter="createTodo">
                    <div class="input-group-append">
                        <span class="btn input-group-text" @click="createTodo">Add</span>
                    </div>
                </div>
            </div>
        </div>
        <todo v-for="todo in filteredTodos" :key="todo.id" :todo="todo"
        @deleteTodo="deleteTodo"
        @completedTask="completedTask"
        @editTodo="editTodo"></todo>
        <div class="row">
            <div class="col-sm-4 offset-sm-4 p-2 mt-3">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-outline-primary active"
                  @click="visibility='all'">
                    <input type="radio" name="options" id="option1" autocomplete="off" checked> All
                  </label>
                  <label class="btn btn-outline-primary"
                  @click="visibility='uncompleted'">
                    <input type="radio" name="options" id="option2" autocomplete="off"> Uncompleted
                  </label>
                  <label class="btn btn-outline-primary"
                  @click="visibility='completed'">
                    <input type="radio" name="options" id="option3" autocomplete="off"> Completed
                  </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import TodoWeather from "./Weather";
import Todo from "./Todo";
//filter todos function
var filters = {
  all: function(todos) {
    return todos;
  },
  completed: function(todos) {
    return todos.filter(todo => {
      return todo.isDone;
    });
  },
  uncompleted: function(todos) {
    return todos.filter(todo => {
      return !todo.isDone;
    });
  }
};

export default {
  data() {
    return {
      visibility: 'all'
    };
  },
  computed: {
    filteredTodos: function() {
      return filters[this.visibility](this.todos);
    }
  },
  methods: {
    deleteTodo(todo) {
      this.$emit("deleteTodo", todo);
    },
    createTodo() {
      this.$emit("createTodo", this.$refs.task.value);
      this.$refs.task.value = "";
    },
    editTodo(todo) {
      this.$emit("editTodo", todo);
    },
    completedTask(todo) {
      //   console.log("todolist completed", todo);
      this.$emit("completedTask", todo);
    },
    filterTodos(filter){
      this.visibility = filter;
    }
  },
  //   computed: {
  //       this.props.todos
  //   },
  components: {
    Todo,
    TodoWeather
  },
  props: ["todos"]
};

/* eslint-disable */
</script>

<style scoped>
label.btn{
  font-size: 13px;
}
</style>


