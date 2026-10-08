"""Production profile: hardened defaults, PostgreSQL, no GraphiQL."""

from django.core.exceptions import ImproperlyConfigured

from .base import *  # noqa: F401,F403
from .base import env  # noqa: F401

DEBUG = env("DJANGO_DEBUG", default=False)

# Fail fast on a misconfigured deployment (docs/DEFINITION_OF_DONE.md).
if not ALLOWED_HOSTS:
    raise ImproperlyConfigured(
        "DJANGO_ALLOWED_HOSTS must be set when using config.settings.production."
    )
if SECRET_KEY.startswith("django-insecure-"):
    raise ImproperlyConfigured(
        "DJANGO_SECRET_KEY must be set to a real secret in production."
    )

# GraphiQL is a development tool.
GRAPHIQL_ENABLED = env("GRAPHIQL_ENABLED", default=False)

# TLS termination happens at the proxy / platform (nginx, Fly, Heroku...).
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = env("DJANGO_SECURE_SSL_REDIRECT", default=True)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = env.int("DJANGO_SECURE_HSTS_SECONDS", default=0)
if SECURE_HSTS_SECONDS:
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

# The API is public and read-only; CORS origins must be explicit.
if not CORS_ALLOWED_ORIGINS:
    raise ImproperlyConfigured(
        "CORS_ALLOWED_ORIGINS must list the frontend origin(s) in production."
    )
