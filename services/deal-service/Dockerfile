# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# Add Maintainer Info
MAINTAINER Julien Nasser <julien.nasser@gmail.com>

# Copy the application's jar to the container
COPY target/deal-service-0.0.1-SNAPSHOT.jar deal-service.jar
COPY wait-for-it.sh /wait-for-it.sh

# Run the jar file
#ENTRYPOINT ["java","-jar","/deal-service.jar"]

# Make port 9001 available to the world outside this container
EXPOSE 9001