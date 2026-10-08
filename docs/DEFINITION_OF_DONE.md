# 07_DEFINITION_OF_DONE.md

## Purpose

Define when a feature, task, or release is considered complete.

---

## General Definition of Done

A task is done when:

1. Requirements are understood.
2. Implementation is complete.
3. Tests are written and passing.
4. Admin is usable.
5. Documentation is updated.
6. No known regressions.
7. Code is reviewed or self-reviewed against checklist.
8. Changes are deployed to a test/staging environment.
9. The frontend can consume the resulting API successfully.

---

## Definition of Done: Data Model

The data model is done when:

- [ ] `Section` model exists.
- [ ] `SectionItem` model exists.
- [ ] `Technology` model exists.
- [ ] `Tag` model exists.
- [ ] `ProjectDetails` model exists.
- [ ] `ExperienceDetails` model exists.
- [ ] `SkillDetails` model exists.
- [ ] Slugs are unique where required.
- [ ] Ordering fields exist.
- [ ] Visibility flags exist.
- [ ] JSON fields have sensible defaults.
- [ ] Indexes are added for common query paths.
- [ ] Migrations apply cleanly.
- [ ] Migrations can be reversed safely where practical.
- [ ] Model tests pass.

---

## Definition of Done: Admin

Admin is done when:

- [ ] Staff user can access admin.
- [ ] Sections can be created.
- [ ] Sections can be edited.
- [ ] Sections can be reordered.
- [ ] Sections can be hidden/shown.
- [ ] Section items can be created.
- [ ] Section items can be reordered.
- [ ] Section items can be hidden/shown.
- [ ] Project details can be edited.
- [ ] Experience details can be edited.
- [ ] Skill details can be edited.
- [ ] Technologies can be managed.
- [ ] Tags can be managed.
- [ ] Inline forms are usable.
- [ ] Admin tests pass.

---

## Definition of Done: GraphQL API

GraphQL API is done when:

- [ ] `/graphql/` endpoint is available.
- [ ] Public queries do not require authentication.
- [ ] `sections` query works.
- [ ] `section(slug)` query works.
- [ ] `projects` query works.
- [ ] `technologies` query works.
- [ ] `tags` query works.
- [ ] Hidden sections are excluded.
- [ ] Hidden items are excluded.
- [ ] Filtering by technology slug works.
- [ ] Filtering by tag slug works.
- [ ] Filtering by both technology and tag works.
- [ ] Results are deduplicated where necessary.
- [ ] GraphQL field names are stable and documented.
- [ ] Example queries are documented.
- [ ] GraphQL tests pass.

---

## Definition of Done: Performance

Performance is done when:

- [ ] Main section query uses prefetching.
- [ ] Main project query uses select/prefetch related.
- [ ] Query count is bounded for main queries.
- [ ] No obvious N+1 queries in section/item loading.
- [ ] Database indexes exist for common filters.
- [ ] API response time is acceptable on local/dev dataset.

Suggested local benchmark:

```text
Sections query: < 100ms on small dataset
Projects query: < 100ms on small dataset
```

Production targets may vary.

---

## Definition of Done: Seed Data

Seed data is done when:

- [ ] Seed command exists.
- [ ] Seed command is idempotent.
- [ ] Default sections are created.
- [ ] Default technologies are created.
- [ ] Default tags are created.
- [ ] Running seed twice does not duplicate data.
- [ ] Seed command is documented.

---

## Definition of Done: Documentation

Documentation is done when:

- [ ] PRD exists.
- [ ] Architecture document exists.
- [ ] Data model document exists.
- [ ] GraphQL API specification exists.
- [ ] Admin/content guide exists.
- [ ] Testing strategy exists.
- [ ] Definition of Done exists.
- [ ] Example GraphQL queries are included.
- [ ] Seed command usage is documented.
- [ ] Deployment environment variables are documented.

---

## Definition of Done: Frontend Integration

Frontend integration is done when:

- [ ] Frontend can fetch all sections.
- [ ] Frontend can fetch selected sections.
- [ ] Frontend can render known display types.
- [ ] Frontend gracefully handles unknown display types.
- [ ] Frontend can display projects.
- [ ] Frontend can filter projects by technology/tag if implemented.
- [ ] Frontend handles empty sections.
- [ ] Frontend handles missing optional fields.
- [ ] Frontend handles API errors gracefully.

---

## Definition of Done: Release

A release is done when:

- [ ] All tests pass in CI.
- [ ] Migrations run successfully in staging/production.
- [ ] Seed data can initialize a fresh environment.
- [ ] Admin is accessible in production.
- [ ] GraphQL endpoint is reachable.
- [ ] Debug mode is disabled in production.
- [ ] Secrets are stored securely.
- [ ] CORS is configured.
- [ ] HTTPS is enabled.
- [ ] Basic backup strategy exists.
- [ ] Rollback plan exists.
