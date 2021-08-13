# dealabs
dealabs clone website

## stack
Stack : Architecture microservices avec gestion du load balancing et API Gateway, Spring Boot, Spring Cloud, Eureka, Ribbon, Zuul, Java 8, Angular 12

## installation
git clone https://github.com/xk110/dealabs.git

## build all microservices
./mvnw install

## build images and run dockers
docker-compose --env-file ./env.list up --build

## check servers
eureka server : http://localhost:9102/

config-server properties : 
http://localhost:9100/microservice-client-ui/default
http://localhost:9100/microservice-deal-service/default
http://localhost:9100/microservice-comment-service/default
http://localhost:9100/eureka-server/default
http://localhost:9100/zuul-server/default

## url dealabs-app
http://localhost:3200/
