<template>
    <div id="app">
        <GameHeader />
        <div class="game-container">
            <GameFigure :wrong-letters-count="wrongLetters.length" />
            <GameWrongLetters :wrong-letters="wrongLetters" />
            <GameWord :word="word" :correct-letters="correctLetters" />
        </div>

        <GamePopup @restart="restart" ref="popup" :word="word" />
        <GameNotification ref="notification" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import GameFigure from './components/GameFigure.vue'
import GameHeader from './components/GameHeader.vue'
import GameNotification from './components/GameNotification.vue'
import GamePopup from './components/GamePopup.vue'
import GameWord from './components/GameWord.vue'
import GameWrongLetters from './components/GameWrongLetters.vue'

const word = ref('антон')
const letters = ref<string[]>([])
const correctLetters = computed(() => letters.value.filter(item => word.value.includes(item)))
const wrongLetters = computed(() => letters.value.filter(item => !word.value.includes(item)))
const notification = ref<InstanceType<typeof GameNotification> | null>(null)
const popup = ref<InstanceType<typeof GamePopup> | null>(null)

const restart = () => {
    letters.value = []
    popup.value?.close()
}

watch(wrongLetters, () => {
    if (wrongLetters.value.length === 6) {
        popup.value?.open('lose')
    }
})

watch(correctLetters, () => {
    if ([...word.value].every(l => correctLetters.value.includes(l))) {
        popup.value?.open('win')
    }
})

document.addEventListener('keydown', e => {
    if (letters.value.includes(e.key)) {
        notification.value?.open()
        setTimeout(() => notification.value?.close(), 2000)
        return
    }

    if (/[а-яА-ЯёЁ]/.test(e.key)) {
        letters.value.push(e.key.toLowerCase())
    }
})
</script>

<style scoped></style>
