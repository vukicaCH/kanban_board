<template>
  <div class="container">
    <div class="content">
      <OptionsAndLegend />
      <TaskBoard :groups="state.groups" />
    </div>
  </div>
</template>

<script setup>
import TaskBoard from './components/TaskBoard.vue'
import OptionsAndLegend from './components/OptionsAndLegends.vue'
import data from '../data.json';
import { provide, ref } from 'vue';

const state = ref(data);
const selectedTaskRow = ref(3);

const changeSelectedTaskRow = (id) => {
  selectedTaskRow.value = id;
  console.log(selectedTaskRow.value);
}

provide('state', {
  groups: state.value.groups,
  tasks: state.value.tasks,
  selectedTaskRow: selectedTaskRow.value,
  changeSelectedTaskRow
});

</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  display: table;
  height: 100%;
  position: absolute;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: grid;
  grid-template-columns: 1fr 5fr;
}
</style>
