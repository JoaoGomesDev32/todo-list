<template>
  <v-btn-toggle v-model="filter" color="success" borderless>
    <v-btn value="all">Todas</v-btn>
    <v-btn value="completed">Concluídas</v-btn>
    <v-btn value="pending">Pendentes</v-btn>
  </v-btn-toggle>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'TaskFilter',
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const filter = ref(props.modelValue || 'all');

    watch(filter, (newValue) => {
      emit('update:modelValue', newValue);
    });

    return {
      filter,
    };
  },
});
</script>
