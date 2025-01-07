<template>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model="newTask"
        label="Adicione uma nova tarefa"
        outlined
        dense
        color="primary"
      />
      <v-btn color="success" @click="onSubmit">Adicionar</v-btn>
    </v-form>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'TaskInput',
    emits: ['add-task'],
    setup(_, { emit }) {
      const newTask = ref('');
  
      const onSubmit = () => {
        if (newTask.value.trim()) {
          emit('add-task', newTask.value.trim());
          newTask.value = '';
        }
      };
  
      return {
        newTask,
        onSubmit,
      };
    },
  });
  </script>
  