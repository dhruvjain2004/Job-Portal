// Import Sentry modules for ESM
import Sentry from "@sentry/node";

// Access mongooseErrorHandler from Sentry
const { mongooseErrorHandler } = Sentry;

Sentry.init({
  dsn: "https://583dba4896f9878bce1d55086df379db@o4509710442889216.ingest.us.sentry.io/4509710446886912",
  integrations: [
    // Add other integrations here if needed
  ],
  beforeSend(event) {
    return mongooseErrorHandler(event);
  },
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
});