<template>
  <v-app :theme="darkTheme ? 'dark' : 'light'">
    <div class="app-layout">
      <!-- Header -->
      <header class="app-header">
        <h1 class="app-title">ToDo List</h1>
      </header>

      <!-- Main Content -->
      <main class="app-main">
        <TaskInput @add-task="addTask" />
        <TaskFilter v-model="filter" />
        <TaskList
          :tasks="filteredTasks"
          @toggle-task="toggleTask"
          @delete-task="deleteTask"
        />
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        Desenvolvido por João Gomes © 2025
      </footer>
    </div>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}
import TaskInput from './components/TaskInput.vue';
import TaskList from './components/TaskList.vue';
import TaskFilter from './components/TaskFilter.vue';

export default defineComponent({
  name: 'App',
  components: {
    TaskInput,
    TaskList,
    TaskFilter,
  },
  setup() {
    const tasks = ref<Task[]>([]);
    const filter = ref('all'); // "all", "completed", "pending"
    const darkTheme = ref(true); // Tema escuro ativado por padrão

    const addTask = (text: string) => {
      tasks.value.push({ id: Date.now(), text, completed: false });
    };

    const toggleTask = (id: number) => {
      const task = tasks.value.find((t) => t.id === id);
      if (task) task.completed = !task.completed;
    };

    const deleteTask = (id: number) => {
      tasks.value = tasks.value.filter((t) => t.id !== id);
    };

    const filteredTasks = computed(() => {
      if (filter.value === 'completed') {
        return tasks.value.filter((t) => t.completed);
      } else if (filter.value === 'pending') {
        return tasks.value.filter((t) => !t.completed);
      }
      return tasks.value;
    });

    // Persistência local
    onMounted(() => {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) tasks.value = JSON.parse(savedTasks);
    });

    watch(
      tasks,
      (newTasks) => {
        localStorage.setItem('tasks', JSON.stringify(newTasks));
      },
      { deep: true }
    );

    return {
      tasks,
      filter,
      darkTheme,
      addTask,
      toggleTask,
      deleteTask,
      filteredTasks,
    };
  },
});
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-header {
  background-color: #1c1e21;
  color: #28a745;
  text-align: center;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  position: sticky;
  top: 0;
}

.app-main {
  flex-grow: 1;
  padding: 1rem;
  background-color: #212529;
  color: #fff;
  overflow-y: auto;
}

.app-footer {
  background-color: #1c1e21;
  color: #6c757d;
  text-align: center;
  padding: 1rem;
  position: sticky;
  bottom: 0;
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .app-title {
    font-size: 1.2rem;
  }
}
</style>