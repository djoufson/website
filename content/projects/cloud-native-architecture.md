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
# Simplified CI workflow
name: Build and Test

on:
  push:
    branches:
      - main
      - master
      - development
      - feature

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Setup .NET
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 8.x

    - name: Restore dependencies
      run: dotnet restore

    - name: Build the API Project
      run: |
        dotnet build src/Api --configuration Release --no-restore

    - name: Run tests
      run: dotnet test
```

```yaml
# Simplified CD workflow
name: Deploy to Production

on:
  workflow_run:
    workflows: ["Build and Test"]
    types:
      - completed
    branches:
      - main

jobs:
  deploy:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push Docker images
        run: |
          docker build -t djoufson/alice-api -f src/Api/Dockerfile .
          docker push djoufson/alice-api:latest

      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: ${{ secrets.VPS_PORT }}
          script: |
            cd ${{ secrets.PROJECT_PATH }}
            echo ${{ secrets.DOCKERHUB_TOKEN }} | docker login -u ${{ secrets.DOCKERHUB_USERNAME }} --password-stdin
            docker compose -f docker-compose.prod.yml pull
            docker compose -f docker-compose.prod.yml up -d --force-recreate
```

### Observability

Implementing comprehensive observability using **OpenTelemetry** standards across all services - distributed tracing, structured logging, and metrics collection to understand system behavior in production.

## Key Findings

The research demonstrates that Cloud Native architecture, while introducing operational complexity, significantly improves deployment confidence, system resilience, and development team velocity when applied correctly. The thesis provides a practical framework for organizations looking to adopt these patterns incrementally.
