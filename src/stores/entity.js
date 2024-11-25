import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useEntityStore = defineStore('entity', () => {
    const name = ref('MyEntity');
    const table = ref('myentity');
    const packageName = ref('com.example');
    return { name, table, packageName };
});