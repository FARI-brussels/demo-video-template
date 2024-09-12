import type { CMSDataParsed } from '../src/types/CMS'

import dotenv from 'dotenv'
dotenv.config()

type LocalizationAttributes = {
  locale: string
  title: string
  topic: string
  explanation_short: string
}

type MediaItemAttributes = {
  url: string
}

type LocalizationsData = {
  attributes: LocalizationAttributes
}

type ImageSDGData = {
  attributes: MediaItemAttributes
}

type CarousselData = {
  attributes: MediaItemAttributes
}

type VideoData = {
  data?: {
    attributes: MediaItemAttributes
  }
}

type CMSData = {
  attributes: {
    localizations: {
      data: LocalizationsData[]
    }
    explanation_short: string
    research_head: string
    research_lead: string
    title: string
    topic: string
    video?: VideoData
    caroussel?: {
      data: CarousselData[]
    }
    images_sdg?: {
      data: ImageSDGData[]
    }
  }
}

export function parseData(data: CMSData): CMSDataParsed {
  const {
    localizations,
    explanation_short,
    research_head,
    research_lead,
    title,
    topic,
    video,
    caroussel,
    images_sdg
  } = data.attributes

  const item = {
    title: {
      en: title
    },
    topic: {
      en: topic
    },
    explanation_short: {
      en: explanation_short
    },
    research_head,
    research_lead,
    media: {
      video: undefined,
      logos: [],
      sdg: []
    }
  } as CMSDataParsed

  localizations.data.forEach(({ attributes }) => {
    const { locale, title, topic, explanation_short } = attributes
    item.title[locale] = title
    item.topic[locale] = topic
    item.explanation_short[locale] = explanation_short
  })

  if (images_sdg && images_sdg.data)
    images_sdg.data.forEach(({ attributes }) =>
      item.media.sdg.push(process.env.STRAPI_BASE_URL + attributes.url)
    )

  if (caroussel && caroussel.data)
    caroussel.data.forEach(({ attributes }) =>
      item.media.logos.push(process.env.STRAPI_BASE_URL + attributes.url)
    )

  if (video && video.data)
    item.media.video = process.env.STRAPI_BASE_URL + video?.data?.attributes?.url

  return item
}
