# Python virtual environment path
VENV = .venv

# Detect OS
ifeq ($(OS),Windows_NT)
    ACTIVATE = .\$(VENV)\Scripts\activate
    PYTHON = $(VENV)\Scripts\python
    PIP = $(VENV)\Scripts\pip
else
    ACTIVATE = source $(VENV)/bin/activate
    PYTHON = $(VENV)/bin/python
    PIP = $(VENV)/bin/pip
endif

# =====================================================
# Commands
# =====================================================

# 1️⃣ Setup backend environment (venv + pip install)
setup:
	@echo "🚀 Creating virtual environment and installing dependencies..."
	python3 -m venv $(VENV)
	@$(ACTIVATE) && $(PIP) install -r backend/requirements.txt
	@echo "✅ Backend environment ready! Use 'make run-backend' to start Flask."

# 2️⃣ Run backend (Flask server)
run-backend:
	@echo "🏃 Running Flask backend..."
	@$(ACTIVATE) && $(PYTHON) backend/app.py

# 3️⃣ Run frontend (React dev server)
run-frontend:
	@echo "🧠 Starting React frontend..."
	cd frontend && npm run dev

# 4️⃣ Cleanup (remove virtual environment and cache)
clean:
	@echo "🧹 Cleaning virtual environment and cache..."
	rm -rf $(VENV) __pycache__ backend/__pycache__ */__pycache__
	@echo "✅ Cleanup complete."
