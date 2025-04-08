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
import axios from 'axios'

const word = ref('')
const letters = ref<string[]>([])
const correctLetters = computed(() => letters.value.filter(item => word.value.includes(item)))
const wrongLetters = computed(() => letters.value.filter(item => !word.value.includes(item)))
const notification = ref<InstanceType<typeof GameNotification> | null>(null)
const popup = ref<InstanceType<typeof GamePopup> | null>(null)
const isStatusLose = computed(() => wrongLetters.value.length === 6)
const isStatusWin = computed(() => [...word.value].every(l => correctLetters.value.includes(l)))

const getRandomWord = async () => {
    try {
        const { data } = await axios<{ FirstName: string }>(
            'https://api.randomdatatools.ru/?unescaped=false&params=FirstName'
        )

        word.value = data.FirstName.toLowerCase()
    } catch (error) {
        console.error(error)
        word.value = ''
    }
}

getRandomWord()

const restart = async () => {
    await getRandomWord()
    letters.value = []
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
