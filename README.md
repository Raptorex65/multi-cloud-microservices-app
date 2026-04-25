## Project Structure

This platform is split into two repositories:

- multi-cloud-platform-app  
  → application services, Docker images, CI pipelines

- multi-cloud-platform-gitops  
  → infrastructure, Kubernetes manifests, GitOps, and environment management

# Multi-Cloud Microservices App

This repository contains the application source code for a multi-cloud GitOps platform project.

## Components

- frontend: minimal static UI
- api: minimal HTTP API
- worker: minimal background worker

## Current Sprint

Sprint 0:
- repository bootstrap
- local Docker build
- local docker-compose validation
- image push to AWS ECR

## Local Run

```bash
docker compose up --build

Frontend:

http://localhost:8081

API:

http://localhost:8080
http://localhost:8080/health

