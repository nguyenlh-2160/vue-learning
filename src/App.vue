<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png" class="logo" />
    <todo-list />
  </div>
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'App',

  components: {
    TodoList
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  animation-duration: 0.4ms;
  margin-top: 60px;
  font-size: 20px;
}

.logo {
  display: block;
  margin: auto;
  margin-bottom: 25px;
  height: 75px;
}
</style>
