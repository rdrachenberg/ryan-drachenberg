// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  }
};
var Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: "pages/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    image: {
      type: "string",
      required: true
    }
  },
  computedFields
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string"
    },
    date: {
      type: "date",
      required: true
    }
  },
  query: {
    sort: [
      {
        property: "date",
        direction: "acending"
      }
    ]
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [Page, Post]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-XPBNGPMD.mjs.map
