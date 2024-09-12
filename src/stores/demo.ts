import { defineStore } from 'pinia'
import type { Locale } from '../types/Locale'
import type { CMSDataParsed } from '../types/CMS'

export const useDemoStore = defineStore('demo', {
  state: () => ({
    loading: false,
    error: null as null | string,
    locale: 'en',
    data: {
      title: {
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
      research_lead: '',
      explanation_short: {
        en: '',
        'fr-FR': '',
        nl: ''
      }
    } as CMSDataParsed
  }),
  actions: {
    async getCMSData() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch('http://localhost:3000/api/data')
        const parsed = await response.json()

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        this.data = parsed
      } catch (error) {
        this.error = 'Error fetching data'
      } finally {
        this.loading = false
      }
    },
    setLocale(locale: Locale): any {
      this.locale = locale
    }
  }
})
