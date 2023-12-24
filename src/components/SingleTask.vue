<template>
    <div v-if="!isTaskBeingEdited" class="task" @dblclick="disableDrag()">
        <div class="task-importance" :class="color"></div>
        <div class="task-data">
            <h3 class="task-name">{{ task.text }}</h3>
            <div class="task-collaborators bg-gray-400 text-white py-1 px-2">
                <span>Ucesnici:</span>
                <ul class="text-xs flex space-x-2">
                    <li v-for="user in users" :key="user.id">
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
            return 'completed';
        case "2":
            return 'urgent';
        case "3":
            return 'in-progress';
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
.task {
    border: 1px solid rgb(166, 164, 164);
    width: 180px;
    max-height: fit-content;
    min-height: 50px;
    display: flex;
    margin: 10px 0;
}

.task-importance {
    background-color: rgb(71, 181, 228);
    min-width: 5px;
    max-width: 5px;
}

.task-data {
    flex-grow: 1;
    padding: 5px;
    background-color: rgb(230, 225, 225);
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