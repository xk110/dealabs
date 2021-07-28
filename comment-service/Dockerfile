# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# Add Maintainer Info
LABEL maintainer="julien.nasser@gmail.com"

# Add a volume pointing to /tmp
#VOLUME /tmp

# Make port 9002 available to the world outside this container
EXPOSE 9002

# Copy the application's jar to the container
COPY target/comment-service-0.0.1-SNAPSHOT.jar comment-service.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/comment-service.jar"]