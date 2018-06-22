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
      this.originalTaskCache = this.todo.task;
      if (this.editingTodo === todo) {
        this.editingTodo = null;
      } else {
        this.editingTodo = todo;
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

.container1.form-control:hover, .input-group:hover {
  background-color:#f8f9fa;
}

.container1.form-control.taskDone:hover {
  background-color:#f8f9fa;
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
/* Hide the browser's default checkbox
.container1 input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom checkbox */
/* .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
} */

/* On mouse-over, add a grey background color */
/* .container1:hover input ~ .checkmark {
  background-color: #ccc;
} */

/* When the checkbox is checked, add a blue background */
/* .container1 input:checked ~ .checkmark {
  background-color: #5bc0de;
} */

/* Create the checkmark/indicator (hidden when not checked) */
/* .checkmark:after {
  content: "";
  position: absolute;
  display: none;
} */

/* Show the checkmark when checked */
/* .container1 input:checked ~ .checkmark:after {
  display: block;
} */

/* Style the checkmark/indicator */
/* .container1 .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
} */
</style>


