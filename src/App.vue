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
import { ref, watch } from 'vue'
import GameFigure from './components/GameFigure.vue'
import GameHeader from './components/GameHeader.vue'
import GameNotification from './components/GameNotification.vue'
import GamePopup from './components/GamePopup.vue'
import GameWord from './components/GameWord.vue'
import GameWrongLetters from './components/GameWrongLetters.vue'
import { useRandomWord } from './composables/useRandomWord'
import { useLetters } from './composables/useLetters'
import { useNotification } from './composables/useNotification'

const { word, getRandomWord } = useRandomWord()
const { letters, correctLetters, wrongLetters, isStatusLose, isStatusWin, addLetter, resetLetters } = useLetters(word)
const { notification, showNotification } = useNotification()

const popup = ref<InstanceType<typeof GamePopup> | null>(null)

const restart = async () => {
    await getRandomWord()
    resetLetters()
    popup.value?.close()
}

watch(wrongLetters, () => {
    if (isStatusLose.value) {
        popup.value?.open('lose')
    }
})

watch(correctLetters, () => {
    if (isStatusWin.value) {
        popup.value?.open('win')
    }
})

document.addEventListener('keydown', e => {
    if (isStatusLose.value || isStatusWin.value) return

    if (letters.value.includes(e.key)) {
        showNotification()
        return
    }

    addLetter(e.key)
})
</script>

<style scoped></style>
