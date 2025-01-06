import { defineStore } from 'pinia'
import type { Locale } from '../types/Locale'
import { fetchDirectus } from 'fari-directus-parser'
import { ref, reactive } from 'vue'
import demoConfig from './demoConfig.json'

export const useDemoStore = defineStore('demo', () => {
  const loading = ref(false)
  const error = ref<boolean | unknown>(false)
  const locale = ref<Locale>('en')

  const data = reactive({
    title: {
      en: '',
      'fr-FR': '',
      nl: ''
    },
    description: {
      en: '',
      'fr-FR': '',
      nl: ''
    },
    topic: {
      en: '',
      'fr-FR': '',
      nl: ''
    },
    media: {
      logos: [],
      video: '',
      sdg: []
    },
    research_head: '',
    research_lead: ''
  })

  async function getCMSData() {
    loading.value = true
    error.value = null

    try {
      const { id, slug } = demoConfig

      const { title, description, logos, sdg_images, topic, video, research_head, research_lead } =
        await fetchDirectus({ id, slug })

      ;(data.title = title), (data.description = description)
      data.topic = topic
      data.media.logos = logos
      data.media.logos = logos
      data.media.sdg = sdg_images
      data.media.video = video
      data.research_head = research_head
      data.research_lead = research_lead
    } catch (err) {
      error.value = `Error fetching data: ${err}`
    } finally {
      loading.value = false
    }
  }

  const setLocale = (l: Locale) => (l === 'fr-FR' ? (locale.value = 'fr') : (locale.value = l))

  return {
    getCMSData,
    setLocale,
    data,
    locale
  }
})
