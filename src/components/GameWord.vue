<template>
    <div class="word">
        <span v-for="(letter, i) in word" :key="i" class="letter">
            {{ correctLetters.includes(letter) ? letter : '' }}
        </span>
    </div>
</template>
<script setup lang="ts">
interface Props {
    word: string
    correctLetters: string[]
}

defineProps<Props>()
</script>
<style scoped></style>
