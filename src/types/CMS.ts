import type { Locale } from './Locale'

export type LocaleItem = {
  [k in Locale]: string
}

export type CMSDataParsed = {
  title: Record<string, string>
  topic: Record<string, string>
  explanation_short: Record<string, string>
  research_head: string
  research_lead: string
  media: {
    video?: string
    logos: string[]
    sdg: string[]
  }
}
