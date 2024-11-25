<template>
    <code :class="tokenStyle" lang="java"><span v-for="i in indentation" style="color:white;">{{tabulation}}</span>{{text}}<br v-if="nextLine"></code>
</template>

<script setup>
import { computed } from 'vue'

const tabulation = '\u00A0';

const props = defineProps({
    token: Object
})

const value = computed(() => props.token.value);
const type = computed(() => props.token.type);
const nextLine = computed(() => props.token.nextLine);
const indentation = computed(() => props.token.indentation);
const space = computed(() => props.token.space);
const text = computed(() => {
    let text = (space.value ? ' ' : '') + value.value;
    return text;
});
const tokenStyle = computed(() => `${type.value}-code`);

</script>

<style scoped>
.class-code {
    color: #8d1dcd;
}

.reserved-code {
    color: #1da0cd;
}

.primitive-code {
    color: #b41e0d;
}

.annotation-code {
    color: #1d48cd;
}

.simbol-code {
    color: #b21667;
}

.simple-code {
    color: #000000;
}
</style>