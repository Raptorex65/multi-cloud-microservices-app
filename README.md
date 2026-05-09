# Multi-Cloud Microservices App

## Project Structure
This platform is split into two repositories:
- multi-cloud-platform-app  
  → application services, Docker images, CI pipelines
- multi-cloud-platform-gitops  
  → infrastructure, Kubernetes manifests, GitOps, and environment management

This repository contains the **application layer** of the platform.

It is responsible for:
- service source code
- Docker images
- CI pipeline (build + push + GitOps update)

## 🧩 Services

- frontend → UI
- api → backend service
- worker → background processor

- **frontend**
  - simple UI
  - exposed via ingress `/`

- **api**
  - REST API
  - endpoints:
    - `/`
    - `/health`

- **worker**
  - background processing service


This repo does **NOT deploy anything directly**.

Instead:

```text
CI builds → pushes image → updates GitOps repo
```

Deployment is handled by Argo CD in the platform repo.

## ⚙️ Tech Stack
```text
Node.js
Docker
Docker Compose (local)
Amazon ECR
```

## 🧪 Local Development
```bash
docker compose up --build
```

Access:
```text
Frontend: http://localhost:8081
API:      http://localhost:8080
Health:   http://localhost:8080/health
```

## 🚀 CI/CD Pipeline
On push to main:

1. Build Docker image
2. Tag image with Git SHA
3. Push to ECR
4. Update GitOps repo (values.yaml)
5. Argo CD deploys automatically


## 🧠 Image Strategy
We use immutable tagging. For the pruposes of:
  - reproducible deployments
  - easy rollback
  - traceable versions

```text
image: <repo>:<git-sha>
```
Example:
```text
multi-cloud/api:3c6bbd3
```

