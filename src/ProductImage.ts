import { list } from "@keystone-6/core";
import { text, relationship, image } from "@keystone-6/core/fields";

export const ProductImage = list({
  hooks: {
    resolveInput: async ({ operation, resolvedData, inputData }) => {
      // Lets only default the slug value on create and only if
      // it isn't supplied by the caller.
      // We probably don't want slugs to change automatically if an
      // item is renamed.
      // if (operation === "create" && !inputData.slug) {
      //   return buildSlug(inputData.title!);
      // }
      // Since this hook is a the field level we only return the
      // value for this field, not the whole item
      const imageData = await inputData.image.upload;
      return {
        ...resolvedData,
        altText: resolvedData.altText || imageData.filename,
        name: imageData.filename,
      };
    },
  },
  fields: {
    image: image({ storage: "product_images", label: "Ảnh" }),
    altText: text(),
    name: text(),
    product: relationship({ ref: "Product.productImages" }),
  },
  ui: {
    listView: {
      initialColumns: ["image", "altText", "product"],
    },
  },
});
