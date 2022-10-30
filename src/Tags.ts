import { list } from "@keystone-6/core";
import { text, relationship } from "@keystone-6/core/fields";

export const Tags = list({
  ui: {
    isHidden: false,
  },
  fields: {
    name: text(),
    posts: relationship({
      ref: "Post.tags",
      many: true,
      ui: {
        hideCreate: true,
        displayMode: "count",
      },
    }),
  },
});
