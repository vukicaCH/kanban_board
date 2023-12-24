<template>
    <div class="new-task">
        <input type="text" v-model="taskText" placeholder="Task Name..."/>
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
        <UserPicker @userSelected="(users) => taskUsers = users" :collaborators="taskUsers"/>
        <div class="new-task-buttons">
            <button @click="props.close()">Cancel</button>
            <button @click="submitNewTask()" :disabled="!isDisabled"
                :class="{ 'disabled:opacity-50': !isDisabled }">Add Task</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import { useStore } from '@/store';
import UserPicker from './UserPicker.vue';

const props = defineProps(['close']);

const store = useStore();

const taskText = ref('');
const taskKeyColor = ref('');
const taskUsers = ref([]);

const isDisabled = computed(()=> taskText.value && taskKeyColor.value && taskUsers.value.length);

const submitNewTask = () => {
    store.addTask(taskText.value, store.selectedTaskRow, taskKeyColor.value.toLowerCase(), [...taskUsers.value]);
    taskText.value = '';
    taskKeyColor.value = '';
    props.close();
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