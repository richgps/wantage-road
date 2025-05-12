import {defineQuery} from 'next-sanity'

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...3]{
  _id, title, slug, mainImage, publishedAt, body
}`)

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage
}`)

export const LATEST_EVENT_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current) && defined(eventDateTime)] | order(eventDateTime desc)[0]{
    _id,
    title,
    "slug": slug.current,
    eventDateTime,
    eventEndDateTime,
    location,
    description,
    mainImage,
    "organizerName": organizer,
    "timeDisplay": timeDisplay 
  }
`);

export const ALL_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current) && eventDateTime >= now()] | order(eventDateTime asc){
    _id,
    title,
    "slug": slug.current,
    eventDateTime,
    eventEndDateTime,
    location,
    description,
    mainImage,
    "organizerName": organizer,
    "timeDisplay": timeDisplay
  }
`);

export const EVENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current, // Already stringified in event-card
    eventDateTime,
    eventEndDateTime,
    timeDisplay,
    location,
    description, // Short description for cards
    longDescription, // Detailed description
    mainImage,
    gallery,
    features,
    organizer,
    contactEmail
    // Add any other fields needed for the event details page
  }
`);
