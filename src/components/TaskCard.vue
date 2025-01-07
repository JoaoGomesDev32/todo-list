<template>
    <v-card class="task-card">
      <div class="d-flex align-center justify-space-between">
        <v-checkbox v-model="task.completed" @click="toggleTask(task.id)" />
        <span :class="{ 'line-through': task.completed }">{{ task.text }}</span>
        <v-btn icon color="red" @click="deleteTask(task.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      task: {
        type: Object,
        required: true,
        default: () => ({ id: '', text: '', completed: false })
      },
      toggleTask: Function,
      deleteTask: Function,
    },
  };
  </script>
  
  <style scoped>
  .line-through {
    text-decoration: line-through;
    color: #aaa;
  }
  </style>  