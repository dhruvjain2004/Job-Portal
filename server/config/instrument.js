// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://583dba4896f9878bce1d55086df379db@o4509710442889216.ingest.us.sentry.io/4509710446886912",
  integrations: [
    Sentry.mongooseIntegration(),
  ],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});