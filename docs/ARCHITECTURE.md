# 02_ARCHITECTURE.md

## High-Level Architecture

The system is a Django monolith exposing a GraphQL endpoint.

```text
+----------------------+
|      Frontend        |
|  React/Vue/Svelte/etc|
+----------+-----------+
           |
           | GraphQL POST /graphql/
           v
+----------+-----------+
|      Django API      |
|  GraphQL Schema      |
|  Query Resolvers     |
|  Selectors/Services  |
+----------+-----------+
           |
           v
+----------+-----------+
|     Django Models    |
|  Section             |
|  SectionItem         |
|  ProjectDetails      |
|  ExperienceDetails   |
|  SkillDetails        |
|  Technology          |
|  Tag                 |
+----------+-----------+
           |
           v
+----------+-----------+
|       Database       |
| PostgreSQL / SQLite  |
+----------------------+
```

---

## Architectural Style

For this project, a simple layered Django architecture is recommended.

```text
GraphQL Layer
  - Types
  - Queries
  - Resolvers

Application/Selector Layer
  - Query construction
  - Filtering
  - Prefetching
  - Visibility rules

Domain/Model Layer
  - Django models
  - Relationships
  - Constraints

Admin Layer
  - Content management
  - Inline editing
  - Seed/admin actions
```

This avoids unnecessary abstraction while keeping the project maintainable.

---

## Django Project Layout

Suggested structure:

```text
config/
  settings/
    base.py
    development.py
    production.py
  urls.py
  schema.py

apps/
  content/
    migrations/
    __init__.py
    models.py
    admin.py
    schema.py
    selectors.py
    services.py
    tests/
    factories.py
    management/
      commands/
        seed_content.py

docs/
static/
media/
manage.py
```

---

## Main Application: `content`

The `content` app owns:

- Sections.
- Section items.
- Project details.
- Experience details.
- Skill details.
- Technologies.
- Tags.
- GraphQL schema for content.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Backend framework | Django |
| API | GraphQL |
| GraphQL library | Graphene-Django, unless Strawberry is preferred |
| Database dev | SQLite  |
| Database production | PostgreSQL recommended |
| Admin | Django Admin |
| Testing | pytest-django or Django TestCase |
| CORS | django-cors-headers if frontend is separate |
| Deployment | Gunicorn/Nginx or platform PaaS |

---

## Environment Configuration

Required environment variables:

```text
DJANGO_SECRET_KEY
DJANGO_DEBUG
DJANGO_ALLOWED_HOSTS
DATABASE_URL
CORS_ALLOWED_ORIGINS
```

Optional:

```text
GRAPHIQL_ENABLED
DEFAULT_FROM_EMAIL
SENTRY_DSN
```

---

## Data Flow

### Content Management Flow

```text
Admin user
  -> Django Admin
  -> Django models
  -> Database
```

### Public Read Flow

```text
Frontend
  -> GraphQL query
  -> GraphQL resolver
  -> selector/service layer
  -> Django ORM
  -> Database
  -> GraphQL response
```

---

## Key Architectural Decisions

### ADR-001: Use section-based content model

Decision:

Model portfolio content as sections and section items.

Reason:

- Flexible.
- Admin-editable.
- Good for GraphQL.
- Matches the desired UI composition.

Tradeoff:

Less rigid than fully typed page models.

---

### ADR-002: Use typed detail models for structured content

Decision:

Use `ProjectDetails`, `ExperienceDetails`, and `SkillDetails` linked to `SectionItem`.

Reason:

- Allows filtering.
- Avoids putting everything into JSON.
- Keeps common item fields reusable.

Tradeoff:

Slightly more complexity than pure JSON.

---

### ADR-003: Use normalized technologies and tags

Decision:

Use separate `Technology` and `Tag` models.

Reason:

- Enables filtering.
- Prevents inconsistent naming.
- Allows future project taxonomy pages.

Tradeoff:

Requires admin management of taxonomies.

---

### ADR-004: Use GraphQL for public API

Decision:

Expose content through GraphQL.

Reason:

- Frontend can request only needed fields.
- Good for nested section/item data.
- Supports flexible querying.

Tradeoff:

More complex than simple REST serializers.

---

### ADR-005: Use Django Admin for CMS in v1

Decision:

Use Django Admin instead of building a custom CMS.

Reason:

- Fast to implement.
- Secure.
- Good enough for single-owner portfolio.

Tradeoff:

Less polished than a custom admin UX.

---

### ADR-006: `display_type` is a frontend contract

Decision:

`display_type` must correspond to a frontend component.

Reason:

The backend should not define arbitrary UI behavior.

Tradeoff:

New visual components still require frontend code.

---

## Security Architecture

### Public API

- Read-only.
- No authentication required.
- Should only expose visible content.
- Should not expose draft/internal metadata unless intended.

### Admin

- Protected by Django authentication.
- CSRF protection enabled.
- Strong password required.
- Production admin should be behind HTTPS.

### GraphQL Considerations

Recommended:

- Limit query depth if public.
- Add rate limiting if exposed widely.
- Disable GraphiQL in production unless desired.
- Avoid exposing internal IDs if not needed, though numeric IDs are usually acceptable.

---

## Performance Considerations

### Database Indexes

Add indexes on:

```text
Section.slug
Section.is_visible
Section.order
SectionItem.section_id
SectionItem.is_visible
SectionItem.order
SectionItem.item_type
Technology.slug
Tag.slug
```

### Query Optimization

Use:

```python
select_related(
    "project_details",
    "experience_details",
    "skill_details",
)

prefetch_related(
    "project_details__technologies",
    "project_details__tags",
)
```

### Caching

Optional for v1, but possible later:

- Cache section queries.
- Cache project lists by filter.
- Invalidate on model save.
