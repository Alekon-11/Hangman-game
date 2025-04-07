<template>
    <div v-show="isVisible" class="popup-container">
        <div class="popup">
            <h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>
            <template v-if="gameStatus === 'lose'">
                <h2>Вы проиграли. 😕</h2>
                <h3>...имя: {{ word }}</h3>
            </template>
            <button @click="emit('restart')">Сыграть еще раз</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { GameStatus } from '../types/GameStatus'

interface Props {
    word: string
}

const isVisible = ref(false)
const gameStatus = ref<GameStatus | null>(null)

const open = (status: GameStatus) => {
    isVisible.value = true
    gameStatus.value = status
}
const close = () => {
    isVisible.value = false
}

defineProps<Props>()
defineExpose({
    open,
    close
})
const emit = defineEmits<{
    (e: 'restart'): void
}>()
</script>
<style scoped></style>
