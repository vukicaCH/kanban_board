<template>
    <div class="options-and-legend">
        <h1>Key</h1>
        <div class="task-keys">
            <div class="task-key">
                <div class="task-key-color completed"></div>
                <div class="task-key-color-meaning">Completed</div>
            </div>
            <div class="task-key">
                <div class="task-key-color urgent"></div>
                <div class="task-key-color-meaning">Urgent</div>
            </div>
            <div class="task-key">
                <div class="task-key-color in-progress"></div>
                <div class="task-key-color-meaning">In Progress</div>
            </div>
        </div>
        <div class="actions mt-5 space-y-3">
            <div class="bg-blue-300 px-4 py-3">
                <h3 class="font-bold">ADD USER</h3>
                <div class="flex flex-col items-start gap-1 mt-2">
                    <input v-model="userName" class="shadow border border-gray-100" placeholder="enter username"/>
                    <button @click="store.addUser(userName)" :disabled="!userName">Add New User</button>
                </div>
            </div>
            <div>
                <h3 class="font-bold">AVAILABLE USERS</h3>

                <div class="flex flex-col space-y-1">
                    <div v-for="user in store.users" :key="user.id" class="flex items-center">
                        <span class="underline text-lg">{{ user.name }}</span>
                        <button class="text-sm bg-red-500 text-white px-2 ml-3" @click="store.deleteUser(user.id)">OBRISI</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useStore} from '../store/index';
import {ref} from 'vue';

const store = useStore();

const userName = ref('');
</script>

<style scoped>
.options-and-legend {
    padding: 10px;
}

.options-and-legend h1 {
    font-size: 20px;
    font-weight: 500;
}

.task-keys {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.task-key {
    display: grid;
    grid-template-columns: 1fr 5fr;
    gap: 5px;
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