"""
Django settings for config project.
"""

from pathlib import Path
import os

from dotenv import load_dotenv


# =========================================================
# Base directory
# =========================================================

BASE_DIR = Path(__file__).resolve().parent.parent


# =========================================================
# Environment variables
# =========================================================

load_dotenv(BASE_DIR / ".env")


# =========================================================
# Security
# =========================================================

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is not configured.")


DEBUG = os.getenv("DEBUG", "False").lower() == "true"


# =========================================================
# Hosts
# =========================================================

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
]


# =========================================================
# Production security
# =========================================================

if not DEBUG:
    # HTTPS
    SECURE_SSL_REDIRECT = True

    # HSTS
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

    # Secure cookies
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

    # Browser security
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"

    # Prevent browser from using HTTPS content over HTTP
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")


# =========================================================
# Applications
# =========================================================

INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "rest_framework",
    "corsheaders",

    # Local apps
    "apps.contact",
    "apps.news",
    "apps.services",
    "apps.industries",
    "apps.downloads",
]


# =========================================================
# Middleware
# =========================================================

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",

    # React frontend -> Django API
    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# =========================================================
# URLs
# =========================================================

ROOT_URLCONF = "config.urls"


# =========================================================
# Templates
# =========================================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# =========================================================
# WSGI
# =========================================================

WSGI_APPLICATION = "config.wsgi.application"


# =========================================================
# Database
# =========================================================

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST", "127.0.0.1"),
        "PORT": os.getenv("DB_PORT", "5433"),
    }
}


# =========================================================
# Django REST Framework
# =========================================================

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],
}


# =========================================================
# CORS
# =========================================================

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]


# =========================================================
# CSRF Trusted Origins
# =========================================================

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
]


# =========================================================
# Password validation
# =========================================================

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "UserAttributeSimilarityValidator"
        ),
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "MinimumLengthValidator"
        ),
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "CommonPasswordValidator"
        ),
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "NumericPasswordValidator"
        ),
    },
]


# =========================================================
# Internationalization
# =========================================================

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Kolkata"

USE_I18N = True

USE_TZ = True


# =========================================================
# Static files
# =========================================================

STATIC_URL = "static/"

STATIC_ROOT = BASE_DIR / "staticfiles"


# =========================================================
# Media files
# =========================================================

MEDIA_URL = "media/"

MEDIA_ROOT = BASE_DIR / "media"


# =========================================================
# Email
# =========================================================

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


# =========================================================
# Default primary key
# =========================================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"