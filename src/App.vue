<template>
  <div class="container">
    <div class="content">
      <OptionsAndLegend />
      <TaskBoard/>
    </div>
  </div>
</template>

<script setup>
import TaskBoard from './components/TaskBoard.vue'
import OptionsAndLegend from './components/OptionsAndLegends.vue'
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
