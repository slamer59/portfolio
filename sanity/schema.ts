import type { SchemaTypeDefinition } from "sanity";

import article from "./schemas/article";
import author from "./schemas/author";
import blockContent from "./schemas/blockContent";
import category from "./schemas/category";
import devProject from "./schemas/devProject";
import imageGallery from "./schemas/imageGallery";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [article, author, category, blockContent, devProject, imageGallery],
};
