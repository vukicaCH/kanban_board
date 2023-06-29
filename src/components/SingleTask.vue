<template>
    <div v-if="!isTaskBeingEdited" class="task" @dblclick="disableDrag()">
        <div class="task-importance" :class="color"></div>
        <div class="task-data">
            <h3 class="task-name">{{ task.text }}</h3>
        </div>
    </div>
    <EditTaskForm v-else :task="task" @taskEditDone = "enableDrag()" />
</template>

<script setup>
import { defineProps, ref, computed, reactive } from 'vue';
import EditTaskForm from './EditTaskForm.vue';
import { useStore } from '../store/index';

const props = defineProps(['task']);

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
    store.isDraggable = false;
}

const enableDrag = () => {
    closeEditForm();
    store.isDraggable = true;
}

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