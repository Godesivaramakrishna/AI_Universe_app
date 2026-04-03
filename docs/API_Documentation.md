# API Documentation

## Auth Service (8001)

- POST /auth/signup
  - Body: { name, email, password }
  - Response: { id, name, email, access_token }

- POST /auth/login
  - Body: { email, password }
  - Response: { id, name, email, access_token }

- GET /health

## AI Service (8002)

- GET /tools/
- GET /tools/categories
- GET /tools/pricing
- GET /recommend/?category=voice&budget=1.0&multilingual=true
- POST /chat/ with body { message }
- GET /api-keys/guide/{provider}
- GET /health

## API Gateway (8000)

- POST /auth/signup
- POST /auth/login
- GET /tools
- GET /recommend
- GET /health
