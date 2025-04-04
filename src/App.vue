<template>
    <div id="app">
        <GameHeader />
        <div class="game-container">
            <GameFigure />

            <GameWrongLetters />

            <GameWord />
        </div>

        <!-- Container for final message -->
        <GamePopup />

        <!-- Notification -->
        <GameNotification />
    </div>
</template>

<script setup lang="ts">
import GameFigure from './components/GameFigure.vue'
import GameHeader from './components/GameHeader.vue'
import GameNotification from './components/GameNotification.vue'
import GamePopup from './components/GamePopup.vue'
import GameWord from './components/GameWord.vue'
import GameWrongLetters from './components/GameWrongLetters.vue'
</script>

<style scoped></style>
