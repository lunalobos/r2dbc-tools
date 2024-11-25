import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePropertiesStore = defineStore('properties', () => {
    
    const properties = ref([]);

    return { properties };
});