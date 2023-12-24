<script setup>
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import { defineProps, defineEmits, toRef, watch} from 'vue';

const props = defineProps(['collaborators']);
const emit = defineEmits(['userSelected']);

const store = useStore();
const {users} = storeToRefs(store);

const collaborators = toRef(props, 'collaborators');

const toggleUserAssign = (userId) => {

    if(!collaborators.value.includes(userId)){
        emit('userSelected', [...collaborators.value, userId]);
    }else{
        emit('userSelected', [...collaborators.value.filter(id => id != userId)]);
    }
}
</script>

<template>
    <div class="grid grid-cols-2 gap-2">
            <div
                class="bg-white text-center shadow rounded-lg"
                v-for="user in users"
                :key="user.id"
                @click="toggleUserAssign(user.id)"
            >
                <div :class="{'bg-blue-200' : collaborators.includes(user.id)}">
                    {{ user.name }}
                </div>
            </div>
        </div>
</template>