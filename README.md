# AI Universe - Unified Intelligence Platform

AI Universe is a full-stack platform to discover, compare, and choose AI tools and API services.

## Monorepo Structure

- frontend: React + Vite UI
- backend/auth-service: FastAPI authentication service
- backend/ai-service: Flask AI tools and recommendation service
- backend/api-gateway: FastAPI gateway facade
- database: seed schemas for MongoDB and DynamoDB
- devops: Dockerfiles and Nginx config
- docs: architecture and API docs

## Quick Start

1. Start frontend:
   - cd frontend
   - npm install
   - npm run dev

2. Start auth service:
   - cd backend/auth-service
   - pip install -r requirements.txt
   - uvicorn app.main:app --reload --port 8001

3. Start ai service:
   - cd backend/ai-service
   - pip install -r requirements.txt
   - python -m app.main

4. Start api gateway:
   - cd backend/api-gateway
   - pip install fastapi uvicorn httpx
   - uvicorn gateway:app --reload --port 8000

## Docker

- docker-compose up --build

## Notes

- This is an extensible starter foundation with clear service boundaries.
- Replace in-memory/demo logic with production DB and provider integrations as needed.
