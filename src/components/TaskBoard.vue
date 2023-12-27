<template>
        <div class="grid grid-cols-5 auto-rows-fr m-auto min-w-[800px] max-w-fit gap-5 mb-16">
            <TaskRow
                v-for="group in groups" :group="group" :key="group.id"
                @click="store.changeSelectedTaskRow(group.id)"
            />
            <NewTaskRowForm />
        </div>
</template>

<script setup>
import TaskRow from './TaskRow.vue';
import NewTaskRowForm from './NewTaskRowForm.vue';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useStore();

const {groups} = storeToRefs(store);
</script>