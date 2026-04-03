#!/usr/bin/env sh
set -e

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "Installing auth-service dependencies..."
cd backend/auth-service
pip install -r requirements.txt
cd ../..

echo "Installing ai-service dependencies..."
cd backend/ai-service
pip install -r requirements.txt
cd ../..

echo "Setup completed."
