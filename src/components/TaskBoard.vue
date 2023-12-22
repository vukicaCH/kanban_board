<template>
        <div class="task-board">
            <TaskRow
                v-for="group in groups" :group="group" :key="group.id"
                @click="store.changeSelectedTaskRow(group.id)"
            />
            <NewTaskRowForm />
        </div>
</template>

<script setup>
import TaskRow from './TaskRow.vue';
import NewTaskRowForm from './NewTaskRowForm.vue'
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const store = useStore();

const {groups} = storeToRefs(store);

watch(()=> groups.value, ()=>{
    console.log(groups.value);
})
</script>

<style scoped>
.task-board {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(5,1fr);
    gap: 5px;
    padding: 10px;
    min-width: 800px;
    max-width: fit-content;
    margin: auto;
}
</style>