<template>
    <div class="w-[200px] space-y-2 bg-gray-300 overflow-hidden rounded-lg">
        <input type="text" class="w-full" v-model="taskText" placeholder="Task Name..."/>
        <select v-model="taskKeyColor" class="w-full">
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
        <UserPicker @userSelected="(users) => taskUsers = users" :collaborators="taskUsers"/>
        <div class="flex justify-between text-white gap-2">
            <button class="py-1 px-2 bg-gray-600 rounded-lg" @click="props.close()">Cancel</button>
            <button @click="submitNewTask()" :disabled="!isDisabled"
             class="py-1 px-2 bg-blue-300 border border-gray-500 rounded-lg"   :class="{ 'disabled:opacity-50': !isDisabled }">Add Task</button>
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