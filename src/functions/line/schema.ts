import { WebhookEvent } from "@line/bot-sdk/lib/types";
export default {
  type: "object",
  properties: {
    destination: { type: "string" },
    events: {
      type: "array",
      items: {
        type: <WebhookEvent>{},
      },
    },
  },
  required: ["destination", "events"],
} as const;
