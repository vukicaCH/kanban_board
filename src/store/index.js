import { defineStore } from 'pinia'
import data from '../../data.json'

const info = data;

export const useStore = defineStore('store', {
    state: () => ({
        groups: info.groups,
        tasks: info.tasks,
        selectedTaskRow: info.groups[0].id,
        isNewItemFormOpened: false
    }),
    getters:{
        getTasks(state){
            return (id) => state.tasks.filter(task => task.groupId === id);
        }
    },
    actions:{
        changeSelectedTaskRow(id){
            this.selectedTaskRow = id;
            this.isNewItemFormOpened = false;
        },
        openNewItemForm(){
            this.isNewItemFormOpened = true;
        },

        closeNewItemForm(){
            this.isNewItemFormOpened = false;
        },

        addTask(text, groupId, key){
            const newTask = {
                id: this.tasks.length,
                groupId,
                text,
                key
            }

            this.tasks = [
                ...this.tasks,
                newTask
            ];
        },

        editTask(id, groupId, text, key){

            this.tasks = this.tasks.filter(task => task.id != id);

            const editedTask = {
                id,
                groupId,
                text,
                key
            }

            this.tasks = [...this.tasks, editedTask].sort( (a,b) => a.id < b.id ? -1 : 1);
        }
    }
})