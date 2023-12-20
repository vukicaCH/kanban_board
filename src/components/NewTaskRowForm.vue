<template>
    <div v-if="!store.isNewTaskRowFormOpened">
        <button @click="store.openNewTaskRowForm()">+</button>
    </div>
    <div v-else class="task-row">
        <input type="text" v-model="taskRowName" placeholder="Name..." />
        <div class="new-task-row-buttons">
            <button @click="store.closeNewTaskRowForm">Cancel</button>
            <button @click="submitNewTaskRow" :disabled="!taskRowName"
                :class="{ 'disabled:opacity-50': !taskRowName }">Add Row</button>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import {useStore} from '@/store'

const store = useStore();

const taskRowName = ref('');

const submitNewTaskRow = () => {
    store.addRow(taskRowName.value);
    taskRowName.value = '';
}

</script>

<style scoped>
.task-row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 220px;
    max-height: fit-content;
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid rgb(142, 136, 136);
}

.new-task-row-buttons {
    font-size: 13px;
    font-weight: 500;
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
}

.new-task-row-buttons button {
    margin: 0 2px;
    color: white;
    border: 1px solid rgb(69, 67, 67);
    padding: 3px 10px;
    border-radius: 5px;
}

.new-task-row-buttons button:nth-child(1) {
    background-color: grey;
}

.new-task-row-buttons button:nth-child(2) {
    background-color: rgb(53, 175, 189);
}
</style>