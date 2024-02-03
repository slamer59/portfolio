import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import category from './schemas/category'
import article from './schemas/article'
import author from './schemas/author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, author, category, blockContent],
}
