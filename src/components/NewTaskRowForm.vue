<template>
    <div v-if="!store.isNewTaskRowFormOpened">
        <button
            @click="store.openNewTaskRowForm()"
            class="p-4 bg-purple-600 border border-gray-500 rounded-lg font-bold text-lg text-white"
        >
            +
        </button>
    </div>
    <div v-else class="flex flex-col justify-center items-center border border-gray-300 rounded-lg">
        <input type="text" v-model="taskRowName" placeholder="Name..." />
        <div class="flex justify-between text-white gap-2 mt-3">
            <button @click="store.closeNewTaskRowForm" class="py-1 px-2 bg-gray-600 rounded-lg">Cancel</button>
            <button @click="submitNewTaskRow" :disabled="!taskRowName"
                :class="{ 'disabled:opacity-50': !taskRowName }" class="py-1 px-2 bg-blue-300 border border-gray-500 rounded-lg">Add Row</button>
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