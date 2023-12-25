import { defineStore } from 'pinia'
import data from '../../data.json'

const info = data;

export const useStore = defineStore('store',{
    state: () => ({
        groups: info.groups,
        users: info.users,
        selectedTaskRow: info.groups[0].id,
        isNewItemFormOpened: false,
        isNewTaskRowFormOpened: false,
        isDraggable: true,
    }),
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
            const group = this.groups.find(group => group.id == groupId)

            const id = group.tasks[group.tasks.length - 1]?.id ? group.tasks[group.tasks.length - 1]?.id + 1 : 0;

            const newTask = {
                id: id,
                text,
                key,
                collaborators
            }

            group.tasks = [
                ...group.tasks,
                newTask
            ];

            this.groups = [...this.groups.filter(group => group.id != groupId), group].sort( (a,b) => a.id < b.id ? -1 : 1);
        },

        editTask(id, groupId, text, key, collaborators){

            const group = this.groups.find(group => group.id == groupId)

            const editedTask = {
                id,
                text,
                key,
                collaborators
            }

            group.tasks = [...group.tasks.filter(task => task.id != id), editedTask].sort( (a,b) => a.id < b.id ? -1 : 1);

            this.groups = [...this.groups.filter(group => group.id != groupId), group].sort( (a,b) => a.id < b.id ? -1 : 1);
        },

        deleteTask(id, groupId){
            const group = this.groups.find(group =>group.id == groupId)

            group.tasks = [...group.tasks.filter(task => task.id != id)];

            this.groups = [...this.groups.filter(group => group.id != groupId), group].sort( (a,b) => a.id < b.id ? -1 : 1);
        },

        addRow(name){
            this.groups = [...this.groups, {name, id: this.groups.length + 1, tasks: []}]
        },

        changeGroupName(name){
            const group = this.groups.find(group => group.id === this.selectedTaskRow);

            const newGroup = {...group, name};

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
            
            let newGroups = [];

            for(let group of this.groups){
                let newGroup = group;
                let newGroupTasks = [];

                for(let task of group.tasks){
                    newGroupTasks.push({...task, collaborators: task.collaborators.filter(userId => userId != id) })
                }

                newGroup = {...group, tasks: [...newGroupTasks]};

                newGroups.push(newGroup)
            }

            this.groups = [...newGroups];
        },

        sortTasks(tasks, groupId){
            const group = this.groups.find(group => group.id == groupId);

            group.tasks = tasks;

            this.groups = [...this.groups.filter(group => group.id != groupId), group].sort( (a,b) => a.id < b.id ? -1 : 1);
        }
    },
})