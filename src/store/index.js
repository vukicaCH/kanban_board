import { defineStore } from 'pinia'
import data from '../../data.json'
import {useHelper} from '../helper';

const info = data;

const {find, filter, replace} = useHelper();

export const useStore = defineStore('store',{
    state: () => ({
        groups: info.groups,
        users: info.users,
        selectedTaskRow: info.groups[0].id,
        isNewTaskRowFormOpened: false,
    }),
    actions:{
        changeSelectedTaskRow(id){
            this.selectedTaskRow = id;
        },

        openNewTaskRowForm(){
            this.isNewTaskRowFormOpened = true;
        },

        closeNewTaskRowForm(){
            this.isNewTaskRowFormOpened = false;
        },

        addTask(text, groupId, key, collaborators){
            const group = find(this.groups, groupId);

            const lastTask = group.tasks[group.tasks.length - 1];

            const newTaskId = lastTask ? lastTask.id + 1 : 0;

            const newTask = {
                id: newTaskId,
                text,
                key,
                collaborators
            }

            group.tasks = [
                ...group.tasks,
                newTask
            ];

            this.groups = replace(this.groups, group);
        },

        editTask(id, groupId, text, key, collaborators){

            const group = find(this.groups, groupId);

            const editedTask = {
                id,
                text,
                key,
                collaborators
            }

            const newGroupTasks = replace(group.tasks, editedTask)

            group.tasks = newGroupTasks;

            this.groups = replace(this.groups, group);
        },

        deleteTask(id, groupId){
            const group = find(this.groups, groupId);

            group.tasks = filter(group.tasks, id);

            this.groups = replace(this.groups, group);
        },

        addRow(name){
            const newGroup = {
                name,
                id: this.groups.length + 1,
                tasks: []
            }

            this.groups.push(newGroup);
            this.closeNewTaskRowForm();
        },

        changeGroupName(name){
            const group = find(this.groups, this.selectedTaskRow);

            const newGroup = {...group, name};

            this.groups = replace(this.groups, newGroup);
        },

        addUser(name){
            const lastUser = this.users[this.users.length - 1];

            const newUserId = lastUser ? lastUser.id + 1 : 0;

            const newUser = {
                id: newUserId,
                name
            }

            this.users.push(newUser);
        },

        deleteUser(id){
            this.users = filter(this.users, id);
            
            let newGroups = [];

            for(let group of this.groups){
                let newGroup = group;
                let newGroupTasks = [];

                for(let task of group.tasks){
                    const newTask = {...task, collaborators: task.collaborators.filter(userId => userId != id) }

                    newGroupTasks.push(newTask);
                }

                newGroup = {...group, tasks: [...newGroupTasks]};

                newGroups.push(newGroup)
            }

            this.groups = newGroups;
        },

        sortTasks(tasks, groupId){
            const group = find(this.groups, groupId);

            group.tasks = tasks;

            this.groups = replace(this.groups, group);
        }
    },
})