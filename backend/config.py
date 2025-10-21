# config.py
from pathlib import Path
from dotenv import load_dotenv
import os

# Load .env from backend folder root
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

BASE_DIR = Path(__file__).resolve().parent  # backend/

AWS_REGION: str = os.getenv("AWS_DEFAULT_REGION", "us-east-1")
REPORT_FILE = str(BASE_DIR / os.getenv("REPORT_FILE", "iam_security_report.json"))
USERS_FILE = str(BASE_DIR / os.getenv("USERS_FILE", "iam_users.json"))
PORT = int(os.getenv("PORT", "5001"))
