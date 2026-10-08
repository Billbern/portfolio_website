"""Development profile: local SQLite, GraphiQL enabled, CRA origin allowed."""

from .base import *  # noqa: F401,F403
from .base import CORS_ALLOWED_ORIGINS, GRAPHIQL_ENABLED, env  # noqa: F401

DEBUG = env("DJANGO_DEBUG", default=True)

# Hosts served by `manage.py runserver`.
ALLOWED_HOSTS = ALLOWED_HOSTS or ["localhost", "127.0.0.1", "[::1]"]

# GraphiQL IDE available locally unless explicitly disabled.
GRAPHIQL_ENABLED = env("GRAPHIQL_ENABLED", default=True)

# React dev server is allowed out of the box (docs/ARCHITECTURE.md CORS rules).
CORS_ALLOWED_ORIGINS = CORS_ALLOWED_ORIGINS or [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
