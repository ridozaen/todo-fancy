<template>
        <div class="row">
            <div class="col-sm-4 offset-sm-4 p-2 border border-top-0 border-left-0 border-right-0">
                <label class="container1 float-left" :class="{taskDone : todo.isDone }">{{taskUpperCase}}
                    <input type="checkbox" ref="isDone" v-model="todo.isDone" @click="completedTask(todo)">
                    <span class="checkmark"></span>
                </label>
                <!-- <span>{{todo.task}}</span> -->
                <label class="float-right">
                    <span class="btn btn-sm" @click="deleteTodo(todo)"><i class="far fa-trash-alt"></i></span>
                    <span class="btn btn-sm" @click="editTodo(todo)"><i class="far fa-edit"></i></span>
                </label>
            </div>
        </div>
</template>

<script>
/* eslint-disable */
export default {
  data(){
      return {
        //   todo: {
        //       task : ''
        //   }
      }
  },
  methods: {
    deleteTodo(todo) {
      // console.log(todo);
      this.$emit("deleteTodo", todo);
    },
    editTodo(todo) {
      console.log(todo);
    },
    completedTask(todo){
        todo.isDone = this.$refs.isDone.checked;
        this.$emit("completedTask", todo)
    }
  },
  computed : {
      taskUpperCase(){
          return this.todo.task.charAt(0).toUpperCase() + this.todo.task.slice(1);
      }
  },
  props: ["todo"]
};
</script>
<style scope>
/* The container */
.container1{
    display: block;
    position: relative;
    padding-left: 35px;
    /* margin-bottom: 12px; */
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.taskDone {
    text-decoration-line: line-through;
}

/* Hide the browser's default checkbox */
.container1 input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container1:hover input ~ .checkmark {
    background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container1 input:checked ~ .checkmark {
    background-color: #5bc0de;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.container1 input:checked ~ .checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.container1 .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>


