<template>
  <v-container>
    <!-- Título -->
    <v-card-title class="text-h4 text-center mb-4" style="font-weight: bold;">Minha To-Do List</v-card-title>

    <!-- Formulário -->
    <v-form @submit.prevent="addTask" class="d-flex mb-4">
      <v-text-field
        v-model="newTask"
        label="Adicione uma nova tarefa"
        outlined
        class="flex-grow-1 mr-2"
      ></v-text-field>
      <v-btn type="submit" color="primary" :disabled="!newTask">
        <v-icon left>mdi-plus</v-icon> Adicionar
      </v-btn>
    </v-form>

    <!-- Lista de Tarefas -->
    <v-list>
      <v-slide-y-transition group>
        <v-card
          v-for="(task, index) in filteredTasks"
          :key="index"
          class="pa-2 mb-3 d-flex align-center"
          style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
        >
          <!-- Checkbox para concluir -->
          <v-checkbox
            v-model="task.completed"
            color="success"
            class="mr-3"
            :aria-label="`Marcar ${task.text} como concluída`"
          ></v-checkbox>

          <!-- Texto da tarefa -->
          <v-list-item-content>
            <span :style="{ textDecoration: task.completed ? 'line-through' : 'none', fontSize: '16px' }">
              {{ task.text }}
            </span>
          </v-list-item-content>

          <!-- Botão de excluir -->
          <v-btn
            icon
            color="error"
            @click="deleteTask(index)"
            :aria-label="`Excluir ${task.text}`"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card>
      </v-slide-y-transition>
    </v-list>
    <v-btn-toggle v-model="filter" color="primary" class="mb-4 justify-center">
      <v-btn value="all">Todas</v-btn>
      <v-btn value="completed">Concluídas</v-btn>
      <v-btn value="pending">Pendentes</v-btn>
    </v-btn-toggle>

  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const newTask = ref('');
const tasks = ref<{ text: string; completed: boolean }[]>([]);

// Adicionar tarefa
const addTask = () => {
  if (newTask.value) {
    tasks.value.push({ text: newTask.value, completed: false });
    newTask.value = '';
  }
};

// Deletar tarefa
const deleteTask = (index: number) => {
  tasks.value.splice(index, 1);
};

// Filtros de tarefas
const filter = ref('all');
const filteredTasks = computed(() => {
  if (filter.value === 'completed') return tasks.value.filter(task => task.completed);
  if (filter.value === 'pending') return tasks.value.filter(task => !task.completed);
  return tasks.value;
});
</script>
