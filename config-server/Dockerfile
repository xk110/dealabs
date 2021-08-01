# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# Add Maintainer Info
MAINTAINER Julien Nasser <julien.nasser@gmail.com>

# Copy the application's jar to the container
COPY target/config-server-0.0.1-SNAPSHOT.jar config-server.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/config-server.jar"]

# Make port 9100 available to the world outside this container
EXPOSE 9100