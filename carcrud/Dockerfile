# -------- FRONTEND BUILD --------
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY ../frontend/package.json ../frontend/package-lock.json ./
RUN npm install
COPY ../frontend/ .
RUN npm run build

# -------- BACKEND BUILD --------
FROM maven:3.9.6-eclipse-temurin-17 AS backend
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
# Copy the frontend build into backend's resources
COPY --from=frontend /app/frontend/build ./src/main/resources/static
RUN mvn clean package -DskipTests

# -------- RUN STAGE --------
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
