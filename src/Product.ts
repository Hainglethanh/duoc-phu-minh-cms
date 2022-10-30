import { list } from "@keystone-6/core";
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  json,
  file,
  image,
  float,
  integer,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import path from "path";
import { buildSlug } from "../helpers";
import { componentBlocks } from "./component-blocks";

export const ProductFeature = list({
  fields: {
    name: text({ label: "Chức năng" }),
    product: relationship({ ref: "Product.feature", many: true }),
  },
});

export const Product = list({
  hooks: {
    resolveInput: ({ operation, resolvedData }) => {
      if (operation === "update") {
        return resolvedData;
      }
      return {
        ...resolvedData,
        slug: buildSlug(`${resolvedData.name}`),
      };
    },
  },
  ui: {
    label: "Sản phẩm",
  },
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
      label: "Tên",
    }),
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
    shortDescription: text({
      ui: {
        displayMode: "textarea",
      },
      label: "Mô tả ngắn",
    }),
    origin: text({
      label: "Xuất xứ",
    }),
    content: document({
      label: "Thông tin sản phẩm",
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
    uses: document({
      label: "Hướng dẫn sử dụng",
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
    price: integer({
      label: "Giá",
    }),
    feature: relationship({
      label: "Chức năng sản phẩm",
      ref: "ProductFeature.product",
      ui: {
        displayMode: "select",
        labelField: "name",
      },
    }),
    productImages: relationship({
      label: "Ảnh",
      ref: "ProductImage.product",
      many: true,
      ui: {
        displayMode: "select",
        labelField: "name",
      },
    }),
  },
});
