import { defineDocumentType, makeSource } from 'contentlayer2/source-files';

const computedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
};

const Page = defineDocumentType(()=> ({
    name: 'Page',
    filePathPattern: "pages/**/*.mdx",
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true
        },
        image: {
            type: 'string',
            required: true,
        },
    },
    computedFields
}));

const Post = defineDocumentType(()=> ({
    name: 'Post',
    filePathPattern: "posts/**/*.mdx",
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
        },
        date: {
            type: 'date',
            required: true,
        },
    },
    computedFields
}));

export default makeSource({
    contentDirPath: './content',
    documentTypes: [Page, Post],
})