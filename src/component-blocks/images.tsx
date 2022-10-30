/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@keystone-ui/core";
import {
  component,
  fields,
  NotEditable,
} from "@keystone-6/fields-document/component-blocks";

export const images = component({
  label: "Ảnh",
  schema: {
    imageSrc: fields.text({
      label: "Đường dẫn",
    }),
    alt: fields.text({
      label: "Alt",
    }),
  },
  preview: function Hero(props) {
    return (
      <div>
        <NotEditable>
          <img
            src={`${props.fields.imageSrc.value}`}
            css={{
              minHeight: 200,
              width: "100%",
            }}
          />
        </NotEditable>
      </div>
    );
  },
});
