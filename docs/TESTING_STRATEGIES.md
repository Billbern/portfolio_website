# 06_TESTING_STRATEGY.md

## Testing Goals

Ensure that:

1. Models are valid and constraints work.
2. Admin can manage content.
3. GraphQL returns correct visible data.
4. Hidden content is not exposed.
5. Project filtering works.
6. Query optimization remains healthy.
7. Seed data works.

---

## Testing Tools

Recommended:

```text
pytest
pytest-django
factory-boy
```

Alternative:

```text
Django TestCase
```

---

## Test Layers

### Model Tests

Test model constraints and relationships.

Examples:

- Section slug uniqueness.
- SectionItem ordering.
- ProjectDetails relation.
- Technology slug uniqueness.
- Tag slug uniqueness.
- Hidden items are still stored but not public.

---

### Admin Tests

Test admin access and basic CRUD.

Examples:

- Superuser can access Section admin.
- Superuser can create Section.
- Superuser can create SectionItem.
- Inline details can be created.
- Non-staff user cannot access admin.

---

### GraphQL Tests

Test schema behavior.

Examples:

- `sections` returns visible sections.
- Hidden sections are excluded.
- Hidden items are excluded.
- `section(slug)` returns section.
- `section(slug)` returns null for unknown slug.
- `projects` returns only project items.
- `projects` filters by technology slug.
- `projects` filters by tag slug.
- Combined filters use AND logic.
- Technologies and tags are returned correctly.

---

## Example Test Cases

### Section Visibility

Given:

```text
Section A visible
Section B hidden
```

When:

```graphql
sections
```

Then:

```text
Only Section A is returned.
```

---

### Item Visibility

Given:

```text
Section A visible
Item 1 visible
Item 2 hidden
```

When:

```graphql
section(slug: "section-a")
```

Then:

```text
Only Item 1 is returned.
```

---

### Project Technology Filtering

Given:

```text
Project A uses Django
Project B uses React
```

When:

```graphql
projects(technologies: ["django"])
```

Then:

```text
Only Project A is returned.
```

---

### Project Tag Filtering

Given:

```text
Project A tagged backend
Project B tagged frontend
```

When:

```graphql
projects(tags: ["backend"])
```

Then:

```text
Only Project A is returned.
```

---

### Combined Project Filtering

Given:

```text
Project A uses Django and tagged backend
Project B uses Django and tagged frontend
```

When:

```graphql
projects(technologies: ["django"], tags: ["backend"])
```

Then:

```text
Only Project A is returned.
```

---

## Query Count Tests

To reduce N+1 issues, add tests asserting query count for:

```text
sections query
section query
projects query
```

Example:

```python
def test_sections_query_count(django_assert_num_queries):
    with django_assert_num_queries(2):
        execute_sections_query()
```

Exact query count can vary, but the important thing is that it remains bounded.

---

## Fixtures / Factories

Recommended factories:

```text
SectionFactory
SectionItemFactory
TechnologyFactory
TagFactory
ProjectFactory
ExperienceFactory
SkillFactory
```

Example factory logic:

```text
SectionFactory.create(slug="projects", is_visible=True)
ProjectFactory.create(section=projects_section)
```