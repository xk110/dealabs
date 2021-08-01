docker build . -t config-server
docker network create --driver bridge config-server-network
docker run --network=config-server-network --name=config-server --env-file ./env.list -p 9100:9100 config-server