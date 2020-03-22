<template>
  <div class="container">
    <logo />
    <todo-list />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Logo from '~/components/Logo.vue'
import TodoList from '~/components/TodoList.vue'

@Component({
  components: {
    Logo,
    TodoList
  }
})
export default class Index extends Vue {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 15em;
  width: 40%;
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
