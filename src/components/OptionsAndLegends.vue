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
        <div class="new-item">
            <button @click="store.openNewItemForm()">Add New Item</button>
        </div>
    </div>
</template>

<script setup>
import {useStore} from '../store/index';

const store = useStore();
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

.new-item button {
    margin: 10px 0;
    padding: 5px;
    font-size: 13px;
    font-weight: 500;
    color: white;
    background-color: rgb(59, 191, 59);
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