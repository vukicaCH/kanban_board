<template>
    <div class="task-row" :class="{ 'bg-blue-200': isRowActive }">
        <div class="task-row-name">
            <h2 @click="store.changeSelectedTaskRow(props.group.id)">{{ props.group.name }}</h2>
        </div>
            <draggable
                class="tasks"
                v-model="tasks"
                group="people"
                @start="drag = true;"
                @end="drag = false"
                item-key="id"
                :disabled = "draggableDisabled"
            >
                <template #item="{ element }">
                    <Task
                        :key="element.id"
                        :itemKey="element.id"
                        :task="element"
                        @is-task-being-edited="(bool) => draggableDisabled = bool"
                    />
                </template>
            </draggable>
            <NewTaskForm v-if="isRowActive && store.isNewItemFormOpened" @new-task-added="refreshTasks()"/>
        </div>
</template>

<script setup>
import { defineProps, watch, ref } from 'vue';
import Task from './SingleTask.vue';
import { useStore } from '../store/index';
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import NewTaskForm from './NewTaskForm.vue'

const props = defineProps(['group', 'tasks']);

const store = useStore();
const { selectedTaskRow } = storeToRefs(store);

const draggableDisabled = ref(false);

const tasks = ref(store.tasks.filter(task => task.groupId === props.group.id));

const isRowActive = ref(selectedTaskRow.value == Number(props.group.id));

watch(() => selectedTaskRow.value, () => {
    isRowActive.value = selectedTaskRow.value == Number(props.group.id)
})

const refreshTasks = () => tasks.value = store.tasks.filter(task => task.groupId === props.group.id);

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

.task-row-name {
    display: flex;
    margin-top: 10px;
}

.task-row-name h2 {
    margin: 0 5px;
}

.task-row-name button {
    background-color: white;
    border: 1px solid rgb(102, 100, 100);
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 12px;
    font-weight: 800;
}

.active {
    background-color: blue;
}

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