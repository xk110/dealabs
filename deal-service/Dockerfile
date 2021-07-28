# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# Add Maintainer Info
LABEL maintainer="julien.nasser@gmail.com"

# Add a volume pointing to /tmp
#VOLUME /tmp

# Make port 9001 available to the world outside this container
EXPOSE 9001

# Copy the application's jar to the container
COPY target/deal-service-0.0.1-SNAPSHOT.jar deal-service.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/deal-service.jar"]