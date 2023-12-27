<template>
        <div class="flex justify-start items-center p-8 -mb-12">
            <div class="flex flex-col space-y-1">
            <h1>Key</h1>
            <div class="flex gap-2">
                <div class="w-5 h-5 bg-blue-500"></div>
                <div>Completed</div>
            </div>
            <div class="flex gap-2">
                <div class="w-5 h-5 bg-red-500"></div>
                <div>Urgent</div>
            </div>
            <div class="flex gap-2">
                <div class="w-5 h-5 bg-yellow-500"></div>
                <div>In Progress</div>
            </div>
            </div>
        </div>

        <div class="absolute p-8 space-y-4">
            <div class="bg-blue-300 px-4 py-3">
                    <h3 class="font-bold">ADD USER</h3>
                    <div class="flex flex-col items-start gap-1 mt-2">
                        <input v-model="userName" class="shadow border border-gray-100" placeholder="enter username"/>
                        <button @click="addUser" :disabled="!userName" class="py-1 px-2 bg-white border border-gray-500 rounded-lg">Add New User</button>
                    </div>
            </div>
            <div>
                <h3 class="font-bold">AVAILABLE USERS</h3>

                <div class="grid space-y-1 max-h-[400px]" :class="{'overflow-y-scroll' : store.users.length > 15}">
                    <div v-for="user in store.users" :key="user.id" class="flex items-center">
                        <span class="underline text-lg">{{ user.name }}</span>
                        <button class="text-sm bg-red-500 text-white px-2 ml-3" @click="store.deleteUser(user.id)">OBRISI</button>
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

const addUser = () =>{
    store.addUser(userName.value);
    userName.value = '';
}
</script>