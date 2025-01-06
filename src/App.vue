<template>
  <v-app>
    <v-main class="pa-4">
      <h1 class="text-center">ToDo List</h1>
      <ToDoList />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ToDoList from './components/ToDoList.vue';

export default defineComponent({
  components: { ToDoList },
});
</script>

<style scoped>
.pa-4 {
  background-color: #f9f9f9;
}
.text-center {
  text-align: center;
}
</style>
