<template>
    <div class="w-[200px] space-y-2 bg-gray-300 overflow-hidden rounded-lg">
        <input type="text" v-model="task.text" class="w-full"/>
        <select v-model="task.key" class="w-full">
            <option disabled value="">Please select key</option>
            <option class="bg-blue-500" value="1">
                <div>Completed</div>
            </option>
            <option class="bg-red-500" value="2">
                <div>Urgent</div>
            </option>
            <option class="bg-yellow-500" value="3">
                <div>In Progress</div>
            </option>
        </select>
        <UserPicker @userSelected="(users) => task.collaborators = users" :collaborators="task.collaborators"/>
        <div class="flex justify-between text-white gap-2">
            <button @click="emit('taskEditDone');" class="py-1 px-2 bg-gray-600 rounded-lg">Cancel</button>
            <button class="py-1 px-2 bg-red-500 border border-gray-500 rounded-lg" @click="deleteTask">Delete</button>
            <button
                @click="submitEditTask()"
                :disabled="!(task.text && task.key && task.collaborators.length)"
                :class="{ 'disabled:opacity-50': !(task.text && task.key && task.collaborators.length) }"
                class="py-1 px-2 bg-blue-300 border border-gray-500 rounded-lg"
            >
            Edit
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from 'vue';
import { useStore } from '../store/index';
import UserPicker from './UserPicker.vue';

const props = defineProps(['task']);
const emit = defineEmits('taskEditDone');
const store = useStore();

const task = reactive(props.task);

const submitEditTask = () => {
    store.editTask(task.id, store.selectedTaskRow, task.text, task.key, [...task.collaborators]);
    emit('taskEditDone');
}

const deleteTask = () => {
    store.deleteTask(task.id, store.selectedTaskRow);
    emit('taskEditDone');
}

</script>