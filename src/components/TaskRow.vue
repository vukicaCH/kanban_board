<template>
    <div class="task-row" :class="{'bg-blue-200' : isSelectedRow}">
        <div class="task-row-name" v-if="editMode && isSelectedRow">
            <input type="text" v-model="rowName" />
            <button @click="editName()">Save</button>
        </div>
        <div class="flex items-center gap-2" v-else>
            <h2>{{ props.group.name }}</h2>
            <PencilIcon class="w-4 h-4" @click="toggleEdit()"/>
        </div>
            <!-- <draggable
                class="tasks"
                v-model="tasks"
                group="people"
                @start="drag = true;"
                @end="drag = false"
                item-key="id"
                :disabled = "!store.isDraggable"
            >
                <template #item="{ element }">
                    <Task
                        :key="element.id"
                        :itemKey="element.id"
                        :task="element"
                        @is-task-being-edited="(bool) => draggableDisabled = bool"
                    />
                </template>
            </draggable> -->
            <!-- <div v-if="isRowActive">
                <button @click="toggleEdit()">Edit</button>
            </div> -->
        </div>
</template>

<script setup>
import {defineProps, watchEffect,  ref} from 'vue';
//import Task from './SingleTask.vue';
import { useStore } from '../store/index';
//import draggable from 'vuedraggable'
//import NewTaskForm from './NewTaskForm.vue'
import { PencilIcon } from '@heroicons/vue/24/outline'

const store = useStore();

const props = defineProps(['group']);

const rowName = ref(props.group.name);

const isSelectedRow = ref();

//const tasks = ref();

const editMode = ref(false);

const toggleEdit = () => {
    editMode.value = !editMode.value;
}

const editName = () => {
    store.changeGroupName(rowName.value);
    toggleEdit();
}

watchEffect(()=>{
    isSelectedRow.value = props.group.id == store.selectedTaskRow;
    rowName.value = props.group.name; //SVAKI PUT KADA SELEKTUJEMO DRUGI RED, rowName mora da se vrati na pocetnu vrednost
})
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
    position:relative;
}

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