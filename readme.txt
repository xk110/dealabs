git clone https://github.com/xk110/dealabs.git

build all microservices :
go to root directory
./mvnw install

build and run dockers :
docker-compose --env-file ./env.list up --build

url eureka : http://localhost:9102/
url dealabs-app : http://localhost:3200/

check config-server properties : 
http://localhost:9100/microservice-client-ui/default
http://localhost:9100/microservice-deal-service/default
http://localhost:9100/microservice-comment-service/default
http://localhost:9100/eureka-server/default
http://localhost:9100/zuul-server/default