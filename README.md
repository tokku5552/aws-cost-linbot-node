# aws-cost-linbot-node

- 起動してエミュレータを起動するとき

```
docker-compose up
docker-compose run --rm aws-cli-container /bin/bash
```

- 起動済みのコンテナに接続するとき

```
docker ps
docker exec -i -t <CONTAINER ID> /bin/bash
```

- コンテナを停止するとき

```
docker-compose down
```
