<template>
  <div id="app">
          <todo-header></todo-header>
          <router-view></router-view>
          <todo-footer></todo-footer>
  </div>
</template>

<script>
/* eslint-disable */
import TodoHeader from './components/TodoHeader'
import TodoFooter from './components/TodoFooter'
export default {
  name: "App",
  components : {
    TodoHeader,
    TodoFooter
  },
  data() {
    return {
    };
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #1e2a36;
  margin-top: 60px;
}

.form-group.invalid input {
  border: 1px solid red;
  background-color: #f2dede;
}

.form-group input:focus {
  border: none;
  outline: 0;
  box-shadow: 0px;
}
.error {
  font-size: 11px;
  color: red;
}

.alert {
  font-size: 12px;
}

.btn:active:focus{
  outline: none;
  /* /* border: none; */
}

</style>
