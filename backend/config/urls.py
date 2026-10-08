"""Root URLconf: Django Admin + the public read-only GraphQL endpoint."""

from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

# The GraphQL API is public and read-only (docs/GRAPHQL_SPEC.md), so CSRF
# protection does not apply: there is no authenticated state to forge.
graphql_view = csrf_exempt(
    GraphQLView.as_view(graphiql=settings.GRAPHIQL_ENABLED)
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("graphql/", graphql_view, name="graphql"),
]
