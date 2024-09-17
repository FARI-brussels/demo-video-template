<template>
  <div class="start-screen bg-color-blue">
    <FLanguageSelector @update:locale="setLocale" class="locale-item" />

    <div>
      <FButtonIcon
        v-if="!videoPlaying"
        name="play"
        small
        color="blue-light"
        class="play-button"
        @click="togglePlayPause"
      />
    </div>

    <video
      ref="videoRef"
      :src="data.media.video"
      class="video-bg"
      @play="onVideoPlay"
      @pause="onVideoPause"
      @ended="onVideoPause"
      @click="togglePlayPause"
      loop
    />
    <div class="video-overlay" :class="{ 'video-blur': !videoPlaying }"></div>

    <div class="heading" :class="{ 'fade-out': videoPlaying }">
      <div class="title">
        <FTitle class="title"> {{ data.title[locale] }}</FTitle>
        <FButtonIcon name="tooltip" color="blue-light" class="tooltip" @click="toggleCard" />
      </div>
      <FSubTitle class="subtitle"> {{ data.topic[locale] }} </FSubTitle>
    </div>

    <FSlideTransition :show="showCard">
      <FCard v-if="showCard" @close="toggleCard" @update:locale="setLocale" class="card">
        {{ data.explanation_short[locale] }}
        <div v-if="data.media.sdg.length" class="sdg-wrapper">
          <img v-for="item in data.media.sdg" :key="item" :src="item" class="logo mr-sm" />
        </div>
        <template #footer>
          <div v-if="data.media.logos.length">
            <img v-for="item in data.media.logos" :key="item" :src="item" class="logo mr-sm" />
          </div>
        </template>
      </FCard>
    </FSlideTransition>

    <div class="backdrop" :class="{ 'backdrop-active': showCard }"></div>
    <FFooter v-if="!videoPlaying" />
  </div>
</template>

<script setup lang="ts">
import {
  FTitle,
  FSubTitle,
  FButtonIcon,
  FFooter,
  FSlideTransition,
  FCard,
  FLanguageSelector
} from 'fari-component-library'
import { useDemoStore } from '@/stores/demo'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

const { data, locale } = storeToRefs(useDemoStore())
const { getCMSData, setLocale } = useDemoStore()

const showCard = ref(false)
const videoPlaying = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

onMounted(getCMSData)

const togglePlayPause = () => {
  const video = videoRef.value
  if (!video) return
  if (video.paused) video.play()
  else video.pause()
}

const onVideoPlay = () => (videoPlaying.value = true)

const onVideoPause = () => (videoPlaying.value = false)

const toggleCard = () => {
  showCard.value = !showCard.value
}
</script>

<style scoped lang="scss">
.video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  cursor: pointer;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(24, 62, 145, 0.4);
  z-index: -1;
  pointer-events: none;
  transition: opacity 0.5s ease;
  opacity: 0;
  backdrop-filter: blur(4px);
}

.video-blur {
  opacity: 1;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.start-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 0;
}

.heading {
  margin-top: 6rem;
  margin-bottom: auto;
  text-align: center;
  transition: opacity 0.5s ease;
  .title {
    gap: 1rem;
    display: flex;
  }
  &.fade-out {
    opacity: 0;
  }
}

.sdg-wrapper {
  margin-top: auto;
}

.logo {
  width: 2.8rem;
}

.card {
  position: absolute;
  top: 25%;
  left: 20%;
  z-index: 2;
}

.backdrop {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(24, 62, 145, 0.4);
  backdrop-filter: blur(0);
  z-index: 1;
  transition: all 0.5s ease;

  &-active {
    visibility: visible;
    opacity: 1;
    backdrop-filter: blur(2px);
    transition: all 0.5s ease;
  }
}
</style>
