<template>
    <div class="flex flex-col relative w-[250px] cursor-pointer border border-gray-300 rounded-lg" :class="{'bg-blue-200' : isSelectedRow}">
        <div class="absolute top-3 left-3">
            <div class="flex flex-col" v-if="editMode && isSelectedRow">
                <input type="text" v-model="rowName" />
                <button @click="editName()">Save</button>
            </div>
            <div class="flex items-center gap-2" v-else>
                <h2 class="font-bold">{{ props.group.name }}</h2>
                <PencilIcon class="w-4 h-4 text-black hover:text-white" @click="toggleEdit()"  v-if="isSelectedRow"/>
            </div>
        </div>
        <div class="w-100 mt-16 mb-8 m-auto">
            <draggable
                class="w-100 space-y-3 min-h-[100px]"
                v-model="tasks"
                group="tasks"
                item-key="id"
                :disabled="isTaskEdit"
                :id="group.id"
            >
                <template #item="{ element }">
                    <Task
                        :key="element.id"
                        :itemKey="element.id"
                        :task="element"
                        :toggle-task-edit="toggleTaskEdit"
                    />
                </template>
            </draggable>
            <div
                v-if="isSelectedRow"
                class="min-w-[200px] w-full flex flex-col gap-2 mt-3"
            >
                <span
                    class="w-[200px] inline-block w-full bg-red-500 text-center text-white rounded-lg font-bold"
                    v-if="!addMode"
                    @click="toggleAdd"
                >
                    +
                </span>
                <NewTaskForm :close="toggleAdd" v-else/>
            </div>
        </div>
    </div>
</template>

<script setup>
import {defineProps, watchEffect, watch, ref} from 'vue';
import Task from './SingleTask.vue';
import { useStore } from '../store/index';
import draggable from 'vuedraggable'
import NewTaskForm from './NewTaskForm.vue'
import { PencilIcon } from '@heroicons/vue/24/outline'

const store = useStore();

const props = defineProps(['group']);

const rowName = ref(props.group.name);

const isSelectedRow = ref(props.group.id == store.selectedTaskRow);

const tasks = ref(props.group.tasks);

const editMode = ref(false);
const addMode = ref(false);

const toggleEdit = () => {
    editMode.value = !editMode.value;
}

const toggleAdd = () =>{
    addMode.value = !addMode.value;
}

const editName = () => {
    store.changeGroupName(rowName.value);
    toggleEdit();
}

const isTaskEdit = ref(false);

const toggleTaskEdit = () => isTaskEdit.value = !isTaskEdit.value;

watchEffect(()=>{
    tasks.value = props.group.tasks;
})

watch(()=> store.selectedTaskRow, ()=>{
    isSelectedRow.value = props.group.id == store.selectedTaskRow;
    rowName.value = props.group.name; //SVAKI PUT KADA SELEKTUJEMO DRUGI RED, rowName mora da se vrati na pocetnu vrednost
    editMode.value = false;
    addMode.value = false;
})

watch(()=> tasks.value, ()=>{
    store.sortTasks(tasks.value, props.group.id);
})
</script>

<style scoped>

.task-row-name {
    display: flex;
    flex-direction: column;
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