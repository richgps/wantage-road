import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {eventType} from './eventType' // Import the new eventType

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    postType,        // Often good to group main document types
    eventType,         // Add eventType here
    categoryType,
    authorType
  ],
}
