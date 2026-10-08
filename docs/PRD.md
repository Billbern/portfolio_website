# 01_PRD.md

## Product Name

Portfolio Content Backend

## Overview

A Django-based backend for a personal portfolio website. The system models portfolio content as dynamic sections, such as About, Experience, Highlights, Projects, Skills, and Contact.

The backend should allow the owner to manage content through Django Admin and expose the content through a GraphQL API so the frontend can request any section, group of sections, or filtered project data.

---

## Problem Statement

A portfolio website usually contains mixed content:

- Static text, such as About.
- Structured entries, such as Projects and Experience.
- Taxonomies, such as technologies and tags.
- UI-dependent rendering hints, such as display type.

Hardcoding this content makes it difficult to update. A purely generic JSON model makes filtering and structured content difficult.

The backend needs a balance between flexibility and structure.

---

## Product Goals

1. Allow portfolio content to be managed dynamically through Django Admin.
2. Model top-level portfolio topics as sections.
3. Allow each section to contain ordered items.
4. Support structured content for projects, experience, and skills.
5. Allow projects to be filtered by technology and tags.
6. Expose content through GraphQL.
7. Allow the frontend to request all sections or only selected sections.
8. Keep rendering instructions separate from core content.

---

## Non-Goals for Version 1

The following are not required for the first version unless explicitly decided otherwise:

1. A full drag-and-drop page builder.
2. Public content editing.
3. Multi-user CMS roles.
4. Internationalization/localization.
5. Comments or public feedback.
6. Full-text search.
7. Analytics tracking.
8. Newsletter integration.
9. Complex workflow/publishing states.
10. Real-time updates.

---

## Target Users

### 1. Portfolio Owner / Admin

The primary admin user who manages content.

Needs:

- Create/edit sections.
- Add items to sections.
- Reorder items.
- Show/hide sections and items.
- Add projects.
- Tag projects.
- Assign technologies.
- Control display type.

### 2. Frontend Application

The client application consuming the API.

Needs:

- Predictable GraphQL schema.
- Section-based content.
- Rendering hints via `display_type`.
- Optional filtering for projects.
- Efficient querying.

### 3. Website Visitor

The end user viewing the portfolio.

Needs:

- Fast page load.
- Correctly rendered sections.
- Filterable projects if the UI provides it.

---

## Core Concepts

### Section

A top-level content container.

Examples:

```text
About
Experience
Highlights
Projects
Skills
Contact
```

A section has:

- `slug`
- `title`
- `supporting_title`
- `description`
- `display_type`
- `display_config`
- `order`
- `is_visible`
- `metadata`

---

### Section Item

An ordered content entry inside a section.

Examples:

```text
A project card
A job role
A skill
A highlight
A contact method
A text block
```

A section item has common fields:

- `title`
- `subtitle`
- `body`
- `url`
- `image`
- `start_date`
- `end_date`
- `is_current`
- `order`
- `is_visible`
- `metadata`

---

### Typed Details

Some items require richer structured data.

Examples:

```text
ProjectDetails
ExperienceDetails
SkillDetails
```

These extend a `SectionItem` without forcing every item to have every field.

---

### Technology

A normalized tag-like entity used for project technologies.

Examples:

```text
Python
Django
PostgreSQL
GraphQL
QGIS
Pandas
```

---

### Tag

A general classification.

Examples:

```text
backend
frontend
data-engineering
gis
crypto
automation
api
```

---

### Display Type

A frontend rendering contract.

Examples:

```text
hero
markdown
timeline
card_grid
skill_groups
contact
```

The frontend maps `display_type` to a component.

---

## Functional Requirements

### Sections

| ID | Requirement |
|---|---|
| FR-SEC-01 | Admin can create a section. |
| FR-SEC-02 | Admin can edit section title, supporting title, description, and metadata. |
| FR-SEC-03 | Section slug must be unique. |
| FR-SEC-04 | Admin can set section display order. |
| FR-SEC-05 | Admin can show/hide a section. |
| FR-SEC-06 | Admin can assign a display type. |
| FR-SEC-07 | Admin can optionally provide display configuration as JSON. |

---

### Section Items

| ID | Requirement |
|---|---|
| FR-ITEM-01 | Admin can create items inside a section. |
| FR-ITEM-02 | Admin can reorder items. |
| FR-ITEM-03 | Admin can show/hide items. |
| FR-ITEM-04 | Each item must have an item type. |
| FR-ITEM-05 | Items should support common fields such as title, subtitle, body, image, URL, dates. |
| FR-ITEM-06 | Items may contain optional metadata. |

---

### Projects

| ID | Requirement |
|---|---|
| FR-PRJ-01 | A project item can have repository URL. |
| FR-PRJ-02 | A project item can have demo URL. |
| FR-PRJ-03 | A project item can have multiple technologies. |
| FR-PRJ-04 | A project item can have multiple tags. |
| FR-PRJ-05 | GraphQL API can filter projects by technology slug. |
| FR-PRJ-06 | GraphQL API can filter projects by tag slug. |

---

### Experience

| ID | Requirement |
|---|---|
| FR-EXP-01 | Experience item can store company. |
| FR-EXP-02 | Experience item can store location. |
| FR-EXP-03 | Experience item can store employment type. |
| FR-EXP-04 | Experience item can store highlights. |
| FR-EXP-05 | Experience item can store start/end dates. |
| FR-EXP-06 | Experience item can indicate current role. |

---

### Skills

| ID | Requirement |
|---|---|
| FR-SKL-01 | Skill item can store category. |
| FR-SKL-02 | Skill item can store optional numeric level. |
| FR-SKL-03 | Skill item can store level label. |

---

### GraphQL API

| ID | Requirement |
|---|---|
| FR-API-01 | API can return all visible sections. |
| FR-API-02 | API can return selected sections by slug. |
| FR-API-03 | API can return one section by slug. |
| FR-API-04 | API can return visible items inside sections. |
| FR-API-05 | API can return typed details for project/experience/skill items. |
| FR-API-06 | API can return filtered projects. |
| FR-API-07 | API can return technologies and tags. |
| FR-API-08 | API should avoid returning hidden sections/items by default. |

---

## Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-01 | Backend should be built with Django. |
| NFR-02 | API should use GraphQL. |
| NFR-03 | Public API should be read-only in v1. |
| NFR-04 | Admin should be protected by Django authentication. |
| NFR-05 | Database schema should support future extension. |
| NFR-06 | JSON fields should only be used for flexible non-critical data. |
| NFR-07 | Main queries should use prefetch/select_related to reduce N+1 issues. |
| NFR-08 | API should be usable by frontend without excessive overfetching. |
| NFR-09 | Content changes in admin should reflect immediately in API. |
| NFR-10 | The system should be easy to seed with default sections. |

---

## Success Metrics

1. Admin can create a new section without code migration.
2. Admin can add and reorder content items.
3. Frontend can render sections dynamically using `display_type`.
4. GraphQL can fetch one, some, or all sections.
5. Projects can be filtered by technology and tag.
6. API response is simple enough for frontend consumption.
7. No database migration is needed for adding ordinary content.

---

## Scope Summary

### In Scope

- Django models.
- Django Admin configuration.
- GraphQL read API.
- Section/item content model.
- Project details.
- Experience details.
- Skill details.
- Technologies and tags.
- Basic seed data.
- Documentation.
- Tests.

### Out of Scope for v1

- Public mutations.
- File upload pipeline.
- Full page builder.
- Custom frontend component generation.
- Multi-language content.
- Search infrastructure.
- Recommendation engine.
- Analytics dashboard.
