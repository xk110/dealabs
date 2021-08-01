# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# Add Maintainer Info
MAINTAINER Julien Nasser <julien.nasser@gmail.com>

# Copy the application's jar to the container
COPY target/eureka-server-0.0.1-SNAPSHOT.jar eureka-server.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/eureka-server.jar"]

# Make port 9102 available to the world outside this container
EXPOSE 9102