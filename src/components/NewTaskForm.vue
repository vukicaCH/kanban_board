<template>
    <div class="new-task">
        <input type="text" v-model="taskText" />
        <select v-model="taskKeyColor">
            <option disabled value="">Please select key</option>
            <option class="completed" value="1">
                <div>Completed</div>
            </option>
            <option class="urgent" value="2">
                <div>Urgent</div>
            </option>
            <option class="in-progress" value="3">
                <div>In Progress</div>
            </option>
        </select>
        <div class="new-task-buttons">
            <button @click="store.closeNewItemForm()">Cancel</button>
            <button @click="submitNewTask()" :disabled="!(taskText && taskKeyColor)"
                :class="{ 'disabled:opacity-50': !(taskText && taskKeyColor) }">Add Task</button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useStore } from '@/store';

const taskText = ref('');
const taskKeyColor = ref('');

const emit = defineEmits(['newTaskAdded']);

const store = useStore();

const submitNewTask = () => {
    store.addTask(taskText.value, store.selectedTaskRow, taskKeyColor.value.toLowerCase());
    taskText.value = '';
    taskKeyColor.value = '';
    emit('newTaskAdded');
}

</script>

<style scoped>
.new-task {
    width: 180px;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.new-task input,
select {
    max-width: 100%;
    border: 1px solid rgb(166, 164, 164);
}

.new-task-buttons {
    font-size: 13px;
    font-weight: 500;
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
}

.new-task-buttons button {
    margin: 0 2px;
    color: white;
    border: 1px solid rgb(69, 67, 67);
    padding: 3px 10px;
    border-radius: 5px;
}

.new-task-buttons button:nth-child(1) {
    background-color: grey;
}

.new-task-buttons button:nth-child(2) {
    background-color: rgb(53, 175, 189);
}

.urgent {
    background-color: rgb(248, 22, 22);
}

.completed {
    background-color: rgb(71, 181, 228);
}

.in-progress {
    background-color: rgb(248, 214, 18);
}
</style>