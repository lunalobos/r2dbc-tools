<template>

    <form>
        <div class="flex flex-row m-2">
            <div class="w-1/6">

            </div>
            <div class="w-1/12 ml-1">
                <label class="block leading-6 text-gray-900 font-medium mb-1">Id</label>
            </div>
            <div class="w-1/12 ml-1">
                <label class="block leading-6 text-gray-900 font-medium mb-1">Un</label>
            </div>
            <div class="w-1/4 text-center ml-1">
                <label class="block leading-6 text-gray-900 font-medium mb-1">Type</label>
            </div>

            <div class="w-5/12 text-center">
                <label class="block leading-6 text-gray-900 font-medium mb-1">Name</label>
            </div>
        </div>

        <div v-for="inputProperty in inputProperties" class="flex flex-row m-2" :id="inputProperty.internalId">
            <div class="w-1/6">
                <button type="button" class="bg-red-800 hover:bg-red-900 text-white 
                font-bold py-2 px-4 rounded-2xl delay-300 transition-all align-middle " @click="deteleProperty(inputProperty.internalId)">
                    <svg class="w-6 h-6 text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                    </svg>
                </button>
            </div>
            <div class="w-1/12 items-center align-middle ml-1">
                <input type="checkbox" class="mt-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
                 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2
                  dark:bg-gray-700 dark:border-gray-600" v-model="inputProperty.id">
            </div>
            <div class="w-1/12 items-center align-middle ml-1">
                <input type="checkbox" class="mt-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
                 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2
                  dark:bg-gray-700 dark:border-gray-600 " :disabled="inputProperty.id" v-model="inputProperty.unique">
            </div>
            <div class="w-1/4 text-center">

                <select class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 
                ring-inset ring-gray-300 sm:text-sm sm:leading-6 text-center" v-model="inputProperty.type">
                    <option v-for="type in types">
                        {{ type.name }}
                    </option>
                </select>
            </div>

            <div class="w-5/12 text-center ml-1">
                <input type="text" class="block h-9 w-full rounded-lg border-0 ml-2 text-gray-900 
                    ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 text-center" v-model="inputProperty.name">
            </div>
        </div>
        <div class="flex flex-row m-2">
            <div class="w-1/6">
                <button type="button" class="bg-green-700 hover:bg-green-800 text-white 
                font-bold py-2 px-4 rounded-2xl delay-300 transition-all"
                    @click="inputProperties.push({ internalId: uuidv6(), name: '', id: false, type: 'String', unique: false })">
                    <svg class="w-6 h-6 text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </button>
            </div>
        </div>
    </form>

</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { types} from '@/scripts/javaCode';
import { JavaProperty, JavaAnnotation } from '@/scripts/codeTypes';
import { usePropertiesStore } from '@/stores/properties';
import { v6 as uuidv6 } from 'uuid';

const propertiesStore = usePropertiesStore();

const inputProperties = ref([{
    internalId: uuidv6(),
    name: '',
    id: false,
    type: 'String',
    unique: false
}]);

function deteleProperty(internalId) {
    const index = inputProperties.value.findIndex(e => e.internalId === internalId);
    inputProperties.value.splice(index, 1);
}

const properties = computed(() => {
    return inputProperties.value.map(e => {
        const idAnnotation = e.id ? new JavaAnnotation("Id") : new JavaAnnotation("none");
        const annotations = [ ];
        if(e.id){
            annotations.push(new JavaAnnotation("Id"))
        }
        if(e.unique && !e.id){
            annotations.push(new JavaAnnotation("Column", "unique = true"));
        }
        if(!e.id && !e.unique){
            annotations.push(new JavaAnnotation("none"));
        }
        const type = types.find(t => t.name === e.type);
        return new JavaProperty(e.name, type, annotations);
    });
})

watch(properties, () => {
    propertiesStore.properties = properties.value;
})

</script>
