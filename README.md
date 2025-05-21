## Tarea Docker Compose: Aplicación Fullstack (Spring Boot + Angular + PostgreSQL)

Este proyecto consiste en una aplicación fullstack desarrollada con Spring Boot en el backend, Angular en el frontend, y una base de datos PostgreSQL. Todo el sistema se despliega utilizando Docker Compose, lo cual permite levantar fácilmente los tres servicios de forma simultánea.

## Estructura del proyecto
Tarea_Docker_Compose/
├── backend/
│   ├── src/
│   └── Dockerfile
├── frontend/
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml
└── README.md





## Backend - Spring Boot

### Creación del proyecto
El proyecto se generó desde Spring Initializr con las siguientes dependencias:

Spring Web
Spring Data JPA
PostgreSQL Driver
Lombok (opcional)
### Estructura del backend
Controlador REST en controller/PersonaController.java
Lógica de negocio en service/PersonaService.java
Repositorio JPA en repository/PersonaRepository.java
Entidad Persona en model/Persona.java
### Configuración del application.properties
spring.datasource.url=jdbc:postgresql://db:5432/practica_db
spring.datasource.username=usuario1
spring.datasource.password=clave123
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

### Dockerfile del Backend
FROM openjdk:17
WORKDIR /app
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

### Frontend - Angular

### Creación del frontend
ng new frontend
cd frontend
ng generate component persona

## El frontend incluye funcionalidades para:

- Listar personas
- Crear nuevas personas
- Editar y eliminar (si implementado)
### Estructura relevante
- Servicio en src/app/persona/persona.service.ts
- Componente en src/app/persona/persona.component.ts
- Interfaz gráfica con TailwindCSS o estilos personalizados
### Conexión al backend
Asegurarse de que el servicio consuma la API en:

 - private baseUrl = 'http://localhost:8080/api/personas';

# Dockerfile del Frontend
## Etapa 1: build Angular
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install && npm run build --prod

## Etapa 2: nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Base de datos - PostgreSQL

Configuración en docker-compose.yml
- db:
- image: postgres:15
  - environment:
  POSTGRES_DB: practica_db
  POSTGRES_USER: usuario1
  POSTGRES_PASSWORD: clave123
  ports:
- "5432:5432"
volumes:
- pgdata:/var/lib/postgresql/data
## Docker Compose

docker-compose.yml
version: '3.8'

services:
backend:
build: ./backend
ports:
- "8080:8080"
depends_on:
- db

frontend:
build: ./frontend
ports:
- "4200:80"
depends_on:
- backend

db:
image: postgres:15
environment:
POSTGRES_DB: practica_db
POSTGRES_USER: usuario1
POSTGRES_PASSWORD: clave123
ports:
- "5432:5432"
volumes:
- pgdata:/var/lib/postgresql/data

volumes:
pgdata:
# Instrucciones de uso

## Requisitos previos
- Docker y Docker Compose instalados
- Node.js y Angular CLI (si deseas correr el frontend localmente sin Docker)
- Java 17+ y Maven (si deseas correr el backend sin Docker)
## Construcción y despliegue

  - Compilar el backend:
  cd backend
  mvn clean package
  cd ..
  - Levantar todos los servicios:
  docker-compose up --build
  Accede a:
  Backend: http://localhost:8080/api/personas
  Frontend: http://localhost:4200
## Notas

- Asegúrate de que el archivo target/backend-0.0.1-SNAPSHOT.jar exista antes de levantar Docker.
- Puedes agregar autenticación, validación y manejo de errores como mejoras.