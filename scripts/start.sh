#!/usr/bin/env sh
set -e

echo "Start services individually in separate terminals:"
echo "1) frontend: cd frontend && npm run dev"
echo "2) auth: cd backend/auth-service && uvicorn app.main:app --reload --port 8001"
echo "3) ai: cd backend/ai-service && python -m app.main"
echo "4) gateway: cd backend/api-gateway && uvicorn gateway:app --reload --port 8000"
