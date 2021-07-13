import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
// import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import * as Line from "@line/bot-sdk";
import * as Types from "@line/bot-sdk/lib/types";
import schema from "./schema";

const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
const channelSecret = process.env.LINE_CHANNEL_SECRET!;

const config: Line.ClientConfig = {
  channelAccessToken: accessToken,
  channelSecret: channelSecret,
};

const client = new Line.Client(config);
// const crypto = require("crypto");

async function eventHandler(event: Line.WebhookEvent): Promise<any> {
  if (event.type !== "message" || event.message.type !== "text") {
    return null;
  }
  const message: Types.Message = {
    type: "text",
    text: event.message.text + "ってか?",
  };
  return client.replyMessage(event.replyToken, message);
}

const line: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  proxyEvent
) => {
  console.log(JSON.stringify(proxyEvent));
  // 署名確認
  // const signature = proxyEvent.headers["X-Line-Signature"];
  // const digest = crypto
  //   .createHmac("SHA256", channelSecret)
  //   .update(proxyEvent.body)
  //   .digest("base64");
  // if (signature != digest) {
  //   throw new Line.SignatureValidationFailed(
  //     "signature validation failed",
  //     signature
  //   );
  // }

  const body: Line.WebhookRequestBody = proxyEvent.body;

  await Promise.all(
    body.events.map(async (event) => eventHandler(event))
  ).catch((err) => {
    console.error(err.Message);
    return {
      statusCode: 500,
      body: "Error",
    };
  });

  return {
    statusCode: 200,
    body: "OK",
  };
};

export const main = middyfy(line);
