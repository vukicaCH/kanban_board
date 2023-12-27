<template>
    <div v-if="!isTaskBeingEdited" class="w-[200px] rounded-lg flex overflow-hidden border border-white" @dblclick="disableDrag()">
        <div class="w-3" :class="color"></div>
        <div class="w-full">
            <h3 class="text-center text-white bg-black font-bold py-1">{{ task.text }}</h3>
            <div class="bg-gray-300 flex flex-col justify-center items-center p-3 relative">
                <span class="text-sm font-bold absolute top-1 left-1">Ucesnici:</span>
                <ul class="text-xs mt-6 grid grid-cols-2 gap-2">
                    <li v-for="user in users" :key="user.id" class="block w-16 h-4 bg-white text-center rounded-lg">
                        {{ user.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <EditTaskForm v-else :task="task" @taskEditDone = "enableDrag()" />
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, reactive, watch } from 'vue';
import EditTaskForm from './EditTaskForm.vue';
import { useStore } from '../store/index';

const props = defineProps(['task', 'toggleTaskEdit']);
const emit = defineEmits(['editDone']);

const task = reactive(props.task);

const store = useStore();

const isTaskBeingEdited = ref(false);

function taskColor() {
    switch (task.key) {
        case "1":
            return 'bg-blue-500';
        case "2":
            return 'bg-red-500';
        case "3":
            return 'bg-yellow-500';
    }
}

const color = computed(()=> taskColor());

const closeEditForm = () => isTaskBeingEdited.value = false;

const disableDrag = () => {
    isTaskBeingEdited.value = true;
    props.toggleTaskEdit();
}

const enableDrag = () => {
    closeEditForm();
    props.toggleTaskEdit();
    emit('editDone');
}

const users = ref(store.users.filter(user => props.task.collaborators.includes(user.id)))

watch(()=> props.task, ()=>{
    task.value = props.task
    const collabs = [...task.value.collaborators];
    console.log(collabs);
    users.value = store.users.filter(user => collabs.includes(user.id));
    users.value = users.value.map(user => Object.assign({}, user))
    
})

</script>

<style scoped>

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