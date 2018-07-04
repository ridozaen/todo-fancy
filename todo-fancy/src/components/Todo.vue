<template>
        <div class="row">
            <div class="col-sm-4 offset-sm-4 p-2 border border-top-0 border-left-0 border-right-0">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input class="checkbox" type="checkbox" ref="isDone" v-model="todo.isDone" @click="completedTask(todo)">
                        </div>
                    </div>
                    <label class="container1 form-control" 
                    :class="{taskDone : todo.isDone }"
                        v-show ="todo!== editingTodo"><span class="taskText">{{taskUpperCase}}</span>
                        <br/>
                        <span  v-show="todo.isDone" class="updatedAt">Done At: {{updatedAtFormat}}</span>
                        </label>
                    <input class="container1 form-control" type="text" ref="editMode" v-show="todo === editingTodo"
                           v-model="todo.task"
                           v-auto-focus="todo === editingTodo"
                           @blur="doneEdit(todo)"
                           @keyup.enter="doneEdit(todo)">
                    <label class="float-right">
                        <span class="btn btn-sm" @click="deleteTodo(todo)"><i class="far fa-trash-alt"></i></span>
                        <span class="btn btn-sm" @click="editTodo(todo)"><i class="far fa-edit"></i></span>
                    </label>
                </div>
            </div>
        </div>
</template>

<script>
/* eslint-disable */
import swal from "sweetalert2";

export default {
  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    "auto-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },
  data() {
    return {
      editingTodo: null
    };
  },
  methods: {
    deleteTodo(todo) {
      // console.log(todo);
      this.$emit("deleteTodo", todo);
    },
    editTodo(todo) {
      if (todo.isDone) {
        swal({
          type: "error",
          title: "Oops...",
          text: "Task is done cannot be modified"
        });
      } else {
        this.originalTaskCache = this.todo.task;
        if (this.editingTodo === todo) {
          this.editingTodo = null;
        } else {
          this.editingTodo = todo;
        }
      }
    },
    doneEdit(todo) {
      if (!this.editingTodo) {
        return;
      }
      console.log("done editing");
      this.editingTodo = null;
      if (todo.task.trim() === "") {
        this.deleteTodo(todo);
      } else {
        if (this.originalTaskCache && todo.task !== this.originalTaskCache) {
          this.$emit("editTodo", todo);
        }
      }
    },
    completedTask(todo) {
      todo.isDone = this.$refs.isDone.checked;
      this.$emit("completedTask", todo);
    }
  },
  computed: {
    taskUpperCase() {
      return this.todo.task.charAt(0).toUpperCase() + this.todo.task.slice(1);
    },
    updatedAtFormat() {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      let updated = new Date(this.todo.updatedAt);
      return updated.toLocaleTimeString("en-us", options);
    }
  },
  props: ["todo"]
};
</script>
<style scope>
/* The container */
.container1 {
  padding-left: 10px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container1.form-control,
.input-group-prepend .input-group-text {
  border: 0;
}

.container1.form-control:hover,
.input-group:hover {
  background-color: #f8f9fa;
}

.container1.form-control.taskDone:hover {
  background-color: #f8f9fa;
}

.taskDone .taskText {
  text-decoration-line: line-through;
  color: #999999;
}

.updatedAt {
  font-size: 9px;
  text-decoration-line: unset;
  color: #999999;
}
</style>


