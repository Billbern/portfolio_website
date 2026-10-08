# 08_OPEN_QUESTIONS_AND_DECISIONS.md

These are the questions that may affect the final implementation.

---

## Question 1: Should content be reusable across sections?

If the same project should appear in multiple sections, such as:

```text
Projects
Highlights
Featured
```

then the current `SectionItem + typed details` model may need to evolve into a pointer-based model.

Possible future design:

```text
SectionItem
  section
  content_type
  object_id
  order
  is_visible
```

Decision needed:

```text
Is content reuse required in v1?
```

Current recommendation:

```text
No for v1 unless already needed.
```

---

## Question 2: Should admins create arbitrary display types?

If admins can only choose from known display types, the current design works.

If admins need to create arbitrary layouts without frontend code, the system becomes a page builder.

Decision needed:

```text
Are display types developer-defined or admin-defined?
```

Current recommendation:

```text
Developer-defined, admin-selectable.
```

---

## Question 3: Should GraphQL include mutations?

Version 1 can use Django Admin for content editing.

If you later want a custom dashboard, you may need:

```graphql
mutation CreateSection(...)
mutation UpdateSection(...)
mutation ReorderItems(...)
```

Decision needed:

```text
Should v1 remain read-only GraphQL?
```

Current recommendation:

```text
Yes.
```

---

## Question 4: Should images be uploaded or URL-based?

Current model can use URL-based images.

If you want upload support, you need:

- Django `ImageField`.
- Media storage.
- Possibly S3 or local media.
- GraphQL upload handling if needed.

Decision needed:

```text
Use external image URLs or uploaded files?
```

Current recommendation:

```text
URL-based for v1, uploads later if needed.
```

---

## Question 5: Should contact messages be stored?

If the contact section is only display content, no extra model is required.

If visitors can submit messages, add:

```text
ContactMessage
```

Decision needed:

```text
Does the portfolio need a working contact form?
```

Current recommendation:

```text
Optional separate feature.
```

---

# Implementation Checklist

You can use this as the build plan.

## Phase 1: Project Setup

- [ ] Create Django project.
- [ ] Create `content` app.
- [ ] Configure database.
- [ ] Add Graphene-Django.
- [ ] Configure CORS if needed.
- [ ] Add docs folder.

---

## Phase 2: Models

- [ ] Add `Section`.
- [ ] Add `SectionItem`.
- [ ] Add `Technology`.
- [ ] Add `Tag`.
- [ ] Add `ProjectDetails`.
- [ ] Add `ExperienceDetails`.
- [ ] Add `SkillDetails`.
- [ ] Add indexes.
- [ ] Generate migrations.
- [ ] Test migrations.

---

## Phase 3: Admin

- [ ] Register models.
- [ ] Add inlines.
- [ ] Add list displays.
- [ ] Add filters.
- [ ] Add search.
- [ ] Add prepopulated slugs.
- [ ] Test admin workflows.

---

## Phase 4: GraphQL

- [ ] Add GraphQL types.
- [ ] Add `sections` query.
- [ ] Add `section` query.
- [ ] Add `projects` query.
- [ ] Add `technologies` query.
- [ ] Add `tags` query.
- [ ] Add visibility filtering.
- [ ] Add prefetching.
- [ ] Add GraphQL tests.

---

## Phase 5: Seed Data

- [ ] Create seed command.
- [ ] Seed sections.
- [ ] Seed technologies.
- [ ] Seed tags.
- [ ] Make command idempotent.

---

## Phase 6: Frontend Integration

- [ ] Document example queries.
- [ ] Test section rendering.
- [ ] Test project filtering.
- [ ] Test unknown display type fallback.
- [ ] Test empty content states.

---

# Recommended Definition of Ready

Before starting a task, it should have:

- [ ] Clear goal.
- [ ] Affected models identified.
- [ ] Affected GraphQL fields identified.
- [ ] Admin workflow identified.
- [ ] Acceptance criteria written.
- [ ] Test cases identified.
- [ ] No unresolved dependency on undefined frontend behavior.

---

# Recommended Acceptance Criteria Example

## Feature: Filter projects by technology

### Given

- A visible project exists with technology slug `django`.
- A visible project exists with technology slug `react`.
- GraphQL endpoint is available.

### When

The client sends:

```graphql
query {
  projects(technologies: ["django"]) {
    title
    projectDetails {
      technologies {
        slug
      }
    }
  }
}
```

### Then

- Only the Django project is returned.
- Hidden projects are not returned.
- Technologies are returned with slug/name.
- No duplicate project items are returned.

---