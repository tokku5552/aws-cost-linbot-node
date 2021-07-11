const AWS = require('aws-sdk');
const line = require('@line/bot-sdk');

exports.handler = async (event, context) => {

    const response = {

        foo: 'Hello, world',
        bar: 'Goodbye, world',
        event: event, // 呼び出し元からの情報を見たいので出力に含める
        context: context, // コンテキスト情報を見たいので出力に含める

        // Amazon API Gateway を利用して Lambda 関数を WebAPI 化するときは
        // 必要に応じて isBase64Encoded, statusCode, headers, body をセットする。
        // 今回は不要だがサンプル的にセットしておく。
        statusCode: 200, // HTTP 200 OK
        headers: {
            'x-custom-header': 'my custom header value'
        },
        body: JSON.stringify({
            foo: 'Hello, world',
            bar: 'Goodbye, world',
        })
    };

    return response;
};