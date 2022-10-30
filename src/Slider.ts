import { list } from "@keystone-6/core";
import { text, image, checkbox } from "@keystone-6/core/fields";

export const Slider = list({
  ui: {
    listView: {
      initialColumns: ["name", "status", "image"],
    },
  },
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
      label: "Tên",
    }),
    title: text({ label: "Tiêu đề chính" }),
    subTitle: text({ label: "Tiêu đề phụ" }),
    status: checkbox({
      label: "Trạng thái",
      defaultValue: true,
    }),
    url: text({
      label: "Đường dẫn",
      validation: {
        match: {
          regex:
            /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
          explanation: "Đường dẫn không hợp lệ",
        },
      },
    }),
    image: image({ storage: "images", label: "Ảnh" }),
  },
});
