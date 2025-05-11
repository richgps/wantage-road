import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('event').title('Events'), 
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      // And updated the filter below to exclude 'event'
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'event'].includes(item.getId()!),
      ),
    ])
