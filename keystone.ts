/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from "@keystone-6/core";

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from "./src/schema";

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from "./auth";

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    server: {
      port: 8000,
      cors: {
        origin: "*",
        credentials: false,
      },
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
    storage: {
      /** more storage */
      product_images: {
        kind: "s3",
        // This store is used for the file field type
        type: "image",
        // The S3 bucket name pulled from the S3_BUCKET_NAME environment variable
        bucketName: "duoc-phu-minh",
        // The S3 bucket region pulled from the S3_REGION environment variable
        region: "ap-southeast-1",
        // The S3 Access Key ID pulled from the S3_ACCESS_KEY_ID environment variable
        accessKeyId: "AKIA5ZLUZMUNCMW4OBPH",
        // The S3 Secret pulled from the S3_SECRET_ACCESS_KEY environment variable
        secretAccessKey: "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",
      },
      images: {
        kind: "s3",
        // This store is used for the file field type
        type: "image",
        // The S3 bucket name pulled from the S3_BUCKET_NAME environment variable
        bucketName: "duoc-phu-minh",
        // The S3 bucket region pulled from the S3_REGION environment variable
        region: "ap-southeast-1",
        // The S3 Access Key ID pulled from the S3_ACCESS_KEY_ID environment variable
        accessKeyId: "AKIA5ZLUZMUNCMW4OBPH",
        // The S3 Secret pulled from the S3_SECRET_ACCESS_KEY environment variable
        secretAccessKey: "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",
      },
    },
  })
);
