import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import path from "path";
import { componentBlocks } from "./component-blocks";

export const FAQs = list({
  ui: {
    label: "Tư vấn",
  },
  fields: {
    question: text({
      validation: {
        isRequired: true,
      },
      label: "Câu hỏi",
      ui: {
        displayMode: "textarea",
      },
    }),

    content: document({
      label: "Trả lời",
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
  },
});
