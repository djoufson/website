## Research Context

This Engineering Degree thesis explores how Cloud Native principles can be applied to build large-scale, resilient applications on Microsoft Azure. The research uses a real-world online consultation platform (Alice Care) as the case study to demonstrate these architectural patterns in practice.

## Core Concepts Explored

The thesis covers several fundamental Cloud Native pillars:

### Microservices Architecture

Breaking down the monolithic application into independently deployable services, each owning its data and business logic. The research analyzes the trade-offs between monolithic and microservices approaches, providing guidelines for when to adopt each pattern.

### Containerization & Orchestration

Using **Docker** for containerization and **Kubernetes** for orchestration, the thesis demonstrates how to package, deploy, and manage microservices at scale. Key topics include:

- Container image optimization
- Kubernetes deployment strategies (rolling updates, blue-green)
- Auto-scaling based on demand
- Service mesh for inter-service communication

### CI/CD with GitHub Actions

The implementation of automated pipelines for continuous integration and deployment:

```yaml
# Simplified CI/CD pipeline
name: Deploy to Azure
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build and push container
        run: |
          docker build -t app:${{ github.sha }} .
          docker push acr.azurecr.io/app:${{ github.sha }}
      - name: Deploy to AKS
        run: kubectl set image deployment/app app=acr.azurecr.io/app:${{ github.sha }}
```

### Observability

Implementing comprehensive observability using **OpenTelemetry** standards across all services — distributed tracing, structured logging, and metrics collection to understand system behavior in production.

## Key Findings

The research demonstrates that Cloud Native architecture, while introducing operational complexity, significantly improves deployment confidence, system resilience, and development team velocity when applied correctly. The thesis provides a practical framework for organizations looking to adopt these patterns incrementally.
