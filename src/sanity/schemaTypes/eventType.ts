// src/sanity/schemaTypes/eventType.ts
import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Event title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Event slug is required.'),
    }),
    defineField({
      name: 'eventDateTime',
      title: 'Event Date and Start Time',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today'
      },
      validation: (Rule) => Rule.required().error('Event date and start time are required.'),
    }),
    // --- NEW FIELD ADDED HERE ---
    defineField({
      name: 'eventEndDateTime',
      title: 'Event End Date and Time (Optional)',
      type: 'datetime',
      description: 'Specify if the event has a defined end time. If the event spans multiple days, this should be the end date and time.',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today'
      },
      // No validation: Rule.required() making it optional
    }),
    // --- END OF NEW FIELD ---
    defineField({
      name: 'timeDisplay',
      title: 'Time Display (e.g., 12:00 PM - 6:00 PM)',
      type: 'string',
      description: 'Optional: Use this for complex time descriptions (e.g., "All day", "Multiple sessions") or if the precise start/end times are not sufficient.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required().error('Event location is required.'),
    }),
    defineField({
      name: 'description',
      title: 'Short Description (for cards/previews)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().error('A short description is required.'),
    }),
    defineField({
      name: 'longDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } }
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('A main image is required for the event.'),
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            }
          ]
        }
      ],
    }),
    defineField({
      name: 'features',
      title: 'Event Features/Highlights',
      type: 'array',
      of: [
        defineType({
          name: 'eventFeature',
          title: 'Event Feature',
          type: 'object',
          fields: [
            defineField({
              name: 'iconName',
              title: 'Icon Name (from Lucide Icons)',
              type: 'string',
              description: 'E.g., "Music", "Utensils", "Users", "CalendarDays". You will map this to the Lucide icon component in your frontend code.',
            }),
            defineField({
              name: 'text',
              title: 'Feature Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'iconName',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'No text',
                subtitle: subtitle ? `Icon: ${subtitle}` : 'No icon specified',
              }
            }
          }
        })
      ],
    }),
    defineField({
      name: 'organizer',
      title: 'Organizer',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'eventDateTime',
      media: 'mainImage',
    },
    prepare({ title, date, media }) {
      return {
        title: title || 'Untitled Event',
        subtitle: date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No date',
        media: media || CalendarIcon,
      }
    },
  },
})
