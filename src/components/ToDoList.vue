<template>
    <VContainer class="my-4">
        <v-card class="mx-auto pa-4" max-width="600" elevation="3">
            <v-card-title class="text-h5">
                Gerenciador de Tarefas
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="addTask" class="d-flex">
                <v-text-field
                    v-model="newTask"
                    label="Nova Tarefa"
                    variant="outlined"
                    class="flex-grow-1 mr-2"
                    required
                ></v-text-field>
                <v-btn type="submit" color="primary" :disabled="!newTask">
                    <v-icon left>mdi-plus</v-icon> Adicionar
                </v-btn>
                </v-form>
        
                <!-- Filtro de Tarefas -->
                <v-card class="mx-auto mt-4 pa-3" max-width="600" elevation="3">
                    <v-btn-toggle v-model="filter" color="primary">
                    <v-btn value="all">Todas</v-btn>
                    <v-btn value="completed">Concluídas</v-btn>
                    <v-btn value="pending">Pendentes</v-btn>
                    </v-btn-toggle>
                </v-card>
        
                <!-- Lista de Tarefas -->
                <v-card class="mx-auto mt-4 pa-4" max-width="600" elevation="3">
                    <v-list>
                    <v-list-item
                        v-for="(task, index) in filteredTasks"
                        :key="index"
                        class="d-flex align-center"
                    >
                        <v-list-item-content>
                            <v-checkbox
                                v-model="task.completed"
                                @change="toggleTask(index)"
                                color="primary"
                            >
                                <template v-slot:label>
                                    <s v-if="task.completed">{{ task.text }}</s>
                                    <span v-else>{{ task.text }}</span>
                                </template>
                            </v-checkbox>
                        <!-- <s v-if="task.completed">{{ task.text }}</s>
                        <span v-else>{{ task.text }}</span> -->
                        </v-list-item-content>
                        <v-list-item-action>
                        <v-tooltip bottom>
                            <template #activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" @click="toggleTask(index)">
                                <v-icon>
                                {{ task.completed ? 'mdi-check-circle-outline' : 'mdi-circle-outline' }}
                                </v-icon>
                            </v-btn>
                            </template>
                            <span>
                            {{ task.completed ? 'Marcar como não concluída' : 'Marcar como concluída' }}
                            </span>
                        </v-tooltip>
            
                        <v-tooltip bottom>
                            <template #activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" @click="deleteTask(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                            </template>
                            <span>Excluir Tarefa</span>
                        </v-tooltip>
                        </v-list-item-action>
                    </v-list-item>
                    </v-list>
                </v-card>
            </v-card-text>
        </v-card>
    </VContainer>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted, watch } from 'vue';
  
  interface Task {
    text: string;
    completed: boolean;
  }
  
  export default defineComponent({
    name: 'ToDoList',
    setup() {
      const tasks = ref<Task[]>([]);
      const newTask = ref('');
      const filter = ref<'all' | 'completed' | 'pending'>('all'); // Filtro selecionado
  
      const saveTasksToLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks.value));
      };
  
      const loadTasksFromLocalStorage = () => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
          tasks.value = JSON.parse(savedTasks);
        }
      };
  
      const addTask = () => {
        if (newTask.value.trim()) {
          tasks.value.push({ text: newTask.value, completed: false });
          newTask.value = '';
        }
      };
  
      const toggleTask = (index: number) => {
        tasks.value[index].completed = !tasks.value[index].completed;
      };
  
      const deleteTask = (index: number) => {
        tasks.value.splice(index, 1);
      };
  
      // Computed para obter as tarefas filtradas
      const filteredTasks = computed(() => {
        if (filter.value === 'completed') {
          return tasks.value.filter((task) => task.completed);
        } else if (filter.value === 'pending') {
          return tasks.value.filter((task) => !task.completed);
        }
        return tasks.value;
      });
  
      onMounted(() => {
        loadTasksFromLocalStorage();
      });
  
      watch(tasks, saveTasksToLocalStorage, { deep: true });
  
      return {
        tasks,
        newTask,
        addTask,
        toggleTask,
        deleteTask,
        filter,
        filteredTasks,
      };
    },
  });
  </script>
  
  <style scoped>
  s {
    color: gray;
    text-decoration: line-through;
  }
  </style>
  