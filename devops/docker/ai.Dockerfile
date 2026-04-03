FROM python:3.11-slim
WORKDIR /app
COPY backend/ai-service/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ai-service/ ./
EXPOSE 8002
CMD ["python", "-m", "app.main"]
