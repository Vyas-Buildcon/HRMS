import os
from pathlib import Path

from dotenv import load_dotenv

BACKEND_ROOT = Path(__file__).resolve().parents[1]

# Must run before other modules read os.environ.
load_dotenv(BACKEND_ROOT / ".env")

DATA_FILE = Path(os.environ.get("HRMS_DATA_FILE") or BACKEND_ROOT / "data" / "hrms_store.json")
UPLOADS_DIR = BACKEND_ROOT / "uploads"
FRONTEND_DIST = BACKEND_ROOT.parent / "frontend" / "dist"

DEV_JWT_SECRET = "zenith-hrms-enterprise-jwt-super-secret-key-2026"
JWT_SECRET = os.environ.get("JWT_SECRET") or DEV_JWT_SECRET
JWT_EXPIRES_SECONDS = 24 * 60 * 60

PORT = int(os.environ.get("PORT") or 5000)
CORS_ORIGINS = [
    origin.strip().rstrip("/")
    for origin in os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]


def is_production() -> bool:
    return os.environ.get("NODE_ENV") == "production" or os.environ.get("APP_ENV") == "production"


if not CORS_ORIGINS:
    raise ValueError("CORS_ORIGINS must contain at least one browser origin.")
if is_production() and "*" in CORS_ORIGINS:
    raise ValueError("CORS_ORIGINS must list explicit browser origins in production (no '*').")
