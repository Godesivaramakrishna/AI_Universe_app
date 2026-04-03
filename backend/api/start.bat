@echo off
echo ====================================
echo   AI Universe Backend - FastAPI
echo ====================================
echo.

cd /d "%~dp0"

:: Check if venv exists
if not exist ".venv" (
    echo Creating virtual environment...
    python -m venv .venv
)

:: Activate venv
call .venv\Scripts\activate.bat

:: Install requirements
echo Installing dependencies...
pip install -r requirements.txt --quiet

echo.
echo Starting server on http://localhost:8000
echo API docs at http://localhost:8000/docs
echo.
uvicorn server:app --host 0.0.0.0 --port 8000 --reload
