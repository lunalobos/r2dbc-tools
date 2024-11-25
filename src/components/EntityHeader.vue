<template>
    <div class="flex flex-row mb-2">
        <div class="w-1/4 mt-1 text-center">
            <label class="font-medium">Entity Name:</label>
        </div>
        <div class="w-3/4">
            <input type="text" class="block h-9 w-full rounded-lg border-0 ml-2 text-gray-900 
            ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 text-center"
            v-model="entityName"/>
        </div>    
    </div>
    <div class="flex flex-row mb-2">
        <div class="w-1/4 mt-1 text-center">
            <label class="font-medium">Table Name:</label>
        </div>
        <div class="w-3/4">
            <input type="text" class="block h-9 w-full rounded-lg border-0 ml-2 text-gray-900 
            ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 text-center"
            v-model="tableName"/>
        </div>    
    </div>
    <div class="flex flex-row mb-2">
        <div class="w-1/4 mt-1 text-center">
            <label class="font-medium">Package:</label>
        </div>
        <div class="w-3/4">
            <input type="text" class="block h-9 w-full rounded-lg border-0 ml-2 text-gray-900 
            ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 text-center"
            v-model="packageName"/>
        </div>    
    </div>
    <div class="flex flex-row mt-2 mb-1">
        <div class="w-full mt-1 text-center">
            <label class="text-lg font-medium">Properties</label>
        </div>
    </div>

</template>

<script setup>
import { ref, watch } from 'vue';
import { useEntityStore } from '@/stores/entity';

const entityName = ref('');
const tableName = ref('');
const packageName = ref('');
const entityStore = useEntityStore();

watch(entityName, () => {
    entityStore.name = entityName.value
});

watch(tableName, () => {
    entityStore.table = tableName.value
})

watch(packageName, () => {
    entityStore.packageName = packageName.value
})

</script>