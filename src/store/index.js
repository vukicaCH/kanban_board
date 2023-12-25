import { defineStore } from 'pinia'
import data from '../../data.json'

const info = data;

export const useStore = defineStore('store',{
    state: () => ({
        groups: info.groups,
        tasks: info.tasks,
        users: info.users,
        selectedTaskRow: info.groups[0].id,
        isNewItemFormOpened: false,
        isNewTaskRowFormOpened: false,
        isDraggable: true,
    }),
    getters:{
        getTasks(state){
            return (id) => state.tasks.filter(task => task.groupId == id);
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

        openNewTaskRowForm(){
            this.isNewTaskRowFormOpened = true;
        },

        closeNewTaskRowForm(){
            this.isNewTaskRowFormOpened = false;
        },

        addTask(text, groupId, key, collaborators){
            const newTask = {
                id: this.tasks[this.tasks.length - 1].id + 1,
                groupId,
                text,
                key,
                collaborators
            }

            this.tasks = [
                ...this.tasks,
                newTask
            ];
        },

        editTask(id, groupId, text, key, collaborators){

            this.tasks = this.tasks.filter(task => task.id != id);

            const editedTask = {
                id,
                groupId,
                text,
                key,
                collaborators
            }

            this.tasks = [...this.tasks, editedTask].sort( (a,b) => a.id < b.id ? -1 : 1);
        },

        deleteTask(id){
            this.tasks = this.tasks.filter(task => task.id != id);
        },

        addRow(name){
            this.groups = [...this.groups, {name, id: this.groups.length + 1}]
        },

        changeGroupName(name){
            const group = this.groups.find(group => group.id === this.selectedTaskRow);

            const newGroup = {name, id: group.id};

            this.groups = [...this.groups.filter(group => group.id != this.selectedTaskRow), newGroup].sort( (a,b) => a.id < b.id ? -1 : 1);
        },

        addUser(name){
            const newUser = {
                id: this.users[this.users.length - 1].id + 1,
                name
            }

            this.users = [...this.users, newUser];
        },

        deleteUser(id){
            this.users = [...this.users.filter(user => user.id != id)];
            
            const newTasks = [];

            for(let task of this.tasks){
                const newTaskCollaborators = task.collaborators.filter(userId => userId != id);
                const newTask = {...task, collaborators : [...newTaskCollaborators]};

                newTasks.push(newTask);
            }

            this.tasks = [...newTasks];
        },

        changeTasks(params){
            const task = {...params.task, groupId: params.to };
        
            const oldTasks = this.tasks.filter(task => task.id != params.task.id);
        
            const newTasks = [...oldTasks, task];
        
            this.tasks = [...newTasks];
        }
    },
})