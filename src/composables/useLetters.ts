import { computed, ref, type Ref } from 'vue'

export const useLetters = (word: Ref<string>) => {
    const letters = ref<string[]>([])
    const correctLetters = computed(() => letters.value.filter(item => word.value.includes(item)))
    const wrongLetters = computed(() => letters.value.filter(item => !word.value.includes(item)))

    const isStatusLose = computed(() => wrongLetters.value.length === 6)
    const isStatusWin = computed(() => [...word.value].every(l => correctLetters.value.includes(l)))

    const addLetter = (key: string) => {
        if (/[а-яА-ЯёЁ]/.test(key)) {
            letters.value.push(key.toLowerCase())
        }
    }

    const resetLetters = () => {
        letters.value = []
    }

    return {
        letters,
        correctLetters,
        wrongLetters,
        isStatusLose,
        isStatusWin,
        addLetter,
        resetLetters
    }
}
