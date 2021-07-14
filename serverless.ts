import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import line from "@functions/line";
// import { DEFAULT_MAX_VERSION } from "tls";

require("dotenv").config();

const serverlessConfiguration: AWS = {
  useDotenv: true,
  service: "workdir",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-northeast-1",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      AWS_SDK_LOAD_CONFIG: "1",
      LINE_CHANNEL_ACCESS_TOKEN: process.env.LINE_CHANNEL_ACCESS_TOKEN,
      LINE_CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET,
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["ce:MyCostExplorerRead"],
        Resource: "*",
      },
    ],
  },
  // import the function via paths
  functions: { hello, line },
};

module.exports = serverlessConfiguration;
