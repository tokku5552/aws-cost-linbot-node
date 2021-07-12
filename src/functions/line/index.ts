import { handlerPath } from "@libs/handlerResolver";
// import schema from "@functions/line/schema";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "line",
        // request: {
        //   schemas: {
        //     "application/json": schema,
        //   },
        // },
      },
    },
  ],
};
