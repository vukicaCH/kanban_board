<template>
    <div class="edit-task">
        <input type="text" v-model="task.text" />
        <select v-model="task.key">
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
        <div class="edit-task-buttons">
            <button @click="emit('taskEditDone');">Cancel</button>
            <button @click="submitEditTask()" :disabled="!(task.text && task.key)"
                :class="{ 'disabled:opacity-50': !(task.text && task.key) }">Add Task</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from 'vue';
import { useStore } from '../store/index';

const props = defineProps(['task']);
const emit = defineEmits('taskEditDone');
const store = useStore();

const task = reactive(props.task);

const submitEditTask = () => {
    store.editTask(task.id, task.groupId, task.text, task.key);
    emit('taskEditDone');
}

</script>

<style scoped>
.edit-task {
    width: 180px;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.edit-task input,select{
    max-width: 100%;
    border: 1px solid rgb(166, 164, 164);
}

.edit-task-buttons {
    font-size: 13px;
    font-weight: 500;
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
}

.edit-task-buttons button {
    margin: 0 2px;
    color: white;
    border: 1px solid rgb(69, 67, 67);
    padding: 3px 10px;
    border-radius: 5px;
}

.edit-task-buttons button:nth-child(1) {
    background-color: grey;
}

.edit-task-buttons button:nth-child(2) {
    background-color: rgb(53, 175, 189);
}
</style>