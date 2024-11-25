<template>
    <div class="m-2 text-center">
        <h4 class="font-medium text-xl">
        Entity Code
        </h4>
    </div>
    
    <div class="m-2 border-2 border-blue-200 rounded-xl p-4">
        
        <div class="relative w-8 justify-self-end cursor-pointer" @click="copyCode()">
            <div v-if="!clip">
                <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"/>
                </svg>
            </div>
            <div v-else>
                <svg class="w-6 h-6 text-green-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
                </svg>
            </div>
            
        </div>
        
        
        <TokenComponet v-for="token in tokenCode" :token="token" />
    </div>
</template>

<script setup>
import { tokens } from '@/scripts/format';
import { computed } from 'vue';
import TokenComponet from './TokenComponent.vue';
import { ref } from 'vue';

const props = defineProps({
    code: String
});

const code = computed(() => {
    return props.code;
})

const tokenCode = computed(() => {
    return tokens(code.value);
})

const clip = ref(false);

async function copyCode(){
    navigator.clipboard.writeText(code.value);
    clip.value = true;
    setTimeout(() => {
        clip.value = false;
    }, 3000);
}

</script>