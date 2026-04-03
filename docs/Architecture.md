# Architecture

AI Universe follows a service-oriented architecture:

- Frontend: React app for discovery, comparison, and chat UX
- Auth Service (FastAPI): signup/login, JWT issuance
- AI Service (Flask): tools catalog, recommendation, API key guidance, chat assistant
- API Gateway (FastAPI): single entry point for frontend

Data flow:

1. Frontend calls gateway endpoints
2. Gateway routes auth requests to auth-service
3. Gateway routes AI requests to ai-service
4. AI service loads local JSON dataset and computes rankings

Future improvements:

- Replace in-memory auth DB with PostgreSQL/MongoDB
- Add Redis caching for recommendation responses
- Add observability with OpenTelemetry
- Add provider APIs for live pricing sync
