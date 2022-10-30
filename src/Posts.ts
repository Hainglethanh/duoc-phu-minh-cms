import { list } from "@keystone-6/core";
import {
  text,
  select,
  json,
  timestamp,
  relationship,
  image,
} from "@keystone-6/core/fields";
import path from "path";
import { componentBlocks } from "./component-blocks";
import { document } from "@keystone-6/fields-document";
import { buildSlug } from "../helpers";

export const PostType = list({
  hooks: {
    resolveInput: ({ operation, resolvedData }) => {
      return {
        ...resolvedData,
        slug: buildSlug(`${resolvedData.name}`),
      };
    },
  },
  fields: {
    name: text({ label: "Tên" }),
    slug: text({
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "hidden",
        },
      },
      // Define the hook function itself and attach it to the resolveInput
      // step of the mutation lifecycle
    }),
    posts: relationship({
      ref: "Post.postType",
      many: true,
      label: "Bài viết",
    }),
  },
  ui: {
    listView: {
      initialColumns: ["name"],
    },
    label: "Danh mục bài viết",
  },
});
export const Post = list({
  ui: {
    label: "Bài viết",
  },
  hooks: {
    resolveInput: ({ operation, resolvedData }) => {
      if (operation === "update") {
        return resolvedData;
      }
      return {
        ...resolvedData,
        slug: buildSlug(`${resolvedData.title}`),
      };
    },
  },
  fields: {
    title: text({
      label: "Tiêu đề",
      validation: {
        isRequired: true,
      },
    }),
    thumbnail: image({ storage: "images", label: "Ảnh Bìa" }),
    slug: text({
      // Being a slug, it should be indexed for lookups and unique
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "hidden",
        },
      },
      // Define the hook function itself and attach it to the resolveInput
      // step of the mutation lifecycle
    }),
    shortDescription: text({ label: "Mô tả", ui: { displayMode: "textarea" } }),

    // Having the status here will make it easy for us to choose whether to display
    // posts on a live site.
    status: select({
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      // We want to make sure new posts start off as a draft when they are created
      defaultValue: "draft",
      // fields also have the ability to configure their appearance in the Admin UI
      ui: {
        displayMode: "segmented-control",
      },
    }),
    // The document field can be used for making highly editable content. Check out our
    // guide on the document field https://keystonejs.com/docs/guides/document-fields#how-to-use-document-fields
    // for more information
    content: document({
      label: "Bài viết",
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
      ui: {
        views: path.join(__dirname, "./component-blocks"),
      },
      componentBlocks: componentBlocks,
    }),
    publishDate: timestamp({
      defaultValue: {
        kind: "now",
      },
    }),
    // Here is the link from post => author.
    // We've configured its UI display quite a lot to make the experience of editing posts better.
    author: relationship({
      ref: "User.posts",
      label: "Tác giả",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    postType: relationship({
      ref: "PostType.posts",
      many: false,
      label: "Danh mục",
      ui: {
        displayMode: "select",
        labelField: "name",
        // inlineEdit: { fields: ["name"] },
        // linkToItem: true,
        // inlineConnect: true,
        // inlineCreate: { fields: ["name"] },
      },
    }),
    // We also link posts to tags. This is a many <=> many linking.
    tags: relationship({
      ref: "Tag.posts",
      ui: {
        displayMode: "select",
        labelField: "name",
        // inlineEdit: { fields: ["name"] },
        // linkToItem: true,
        // inlineConnect: true,
        // inlineCreate: { fields: ["name"] },
      },
      many: true,
    }),
  },
});
