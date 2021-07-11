# aws-cost-linbot-node

# docker コマンド

- コンテナを起動して shell に接続する

```shell:
docker-compose up
docker-compose run --rm aws-cli-container /bin/bash
```

- 起動済みのコンテナに接続するとき

```shell:
docker ps
docker exec -i -t <CONTAINER ID> /bin/bash
```

- コンテナを停止するとき

```shell:
docker-compose down
```

# serverless コマンドでのデプロイ

```
serverless deploy
```

# awscli での S3 へのアップロード

- バケットの作成

```shell:
aws s3 mb s3://<backet name>
```

- ファイルのアップロード

```shell:
aws s3 cp <upload file> s3://<backet uri>
```

# 各種モジュールインストール

このリポジトリをクローンした場合は`npm install`とだけ打てば OK

```
npm install @line/bot-sdk --save
npm install -g serverless --save
npm install --save dotenv
```

初回だけ実行

```
serverless create --template aws-nodejs-typescript
```
