<template>
  <v-list>
    <v-list-item
      v-for="task in tasks"
      :key="task.id"
      class="task-item"
    >
      <v-list-item-content>
        <span :class="{ completed: task.completed }">{{ task.text }}</span>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon
          class="icon-complete"
          color="success"
          @click="$emit('toggle-task', task.id)"
        >
          mdi-check-circle
        </v-icon>
        <v-icon
          class="icon-delete"
          color="error"
          @click="$emit('delete-task', task.id)"
        >
          mdi-delete
        </v-icon>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default defineComponent({
  name: 'TaskList',
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      required: true,
    },
  },
  emits: ['toggle-task', 'delete-task'],
});
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}

.completed {
  text-decoration: line-through;
  color: #6c757d;
}

.icon-complete,
.icon-delete {
  cursor: pointer;
  font-size: 24px;
  margin-left: 8px;
}
</style>
