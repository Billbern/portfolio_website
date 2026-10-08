# 03_DATA_MODEL.md

## Entity Relationship Overview

```text
Section
  |
  |----< SectionItem
              |
              |---- ProjectDetails
              |          |
              |          |----< Technology
              |          |----< Tag
              |
              |---- ExperienceDetails
              |
              |---- SkillDetails
```

One `Section` has many `SectionItem`s.

A `SectionItem` may have one of:

```text
ProjectDetails
ExperienceDetails
SkillDetails
```

A project can have many technologies and many tags.

---

## Section

Represents a top-level content block.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | integer/uuid | yes | Primary key |
| slug | slug | yes | Unique API identifier |
| title | string | yes | Section title |
| supporting_title | string | no | Secondary title |
| description | text | no | Section description |
| display_type | string | yes | Frontend component key |
| display_config | JSON | no | Rendering config |
| order | integer | yes | Display order |
| is_visible | boolean | yes | Public visibility |
| metadata | JSON | no | Flexible extra data |
| created_at | datetime | auto | Audit field |
| updated_at | datetime | auto | Audit field |

Constraints:

```text
UNIQUE slug
```

Indexes:

```text
slug
is_visible
order
```

Example:

```json
{
  "slug": "projects",
  "title": "Projects",
  "supporting_title": "Selected work",
  "description": "Some of my recent projects.",
  "display_type": "card_grid",
  "display_config": {
    "columns": 3,
    "show_tags": true
  },
  "order": 4,
  "is_visible": true
}
```

---

## SectionItem

Represents an item inside a section.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | integer/uuid | yes | Primary key |
| section | FK | yes | Parent section |
| item_type | enum/string | yes | Type of item |
| title | string | no | Item title |
| subtitle | string | no | Item subtitle |
| body | text | no | Main content |
| url | URL | no | Generic link |
| image | URL or file | no | Image reference |
| start_date | date | no | Start date |
| end_date | date | no | End date |
| is_current | boolean | yes | Current status |
| order | integer | yes | Item order |
| is_visible | boolean | yes | Public visibility |
| metadata | JSON | no | Flexible extra data |
| created_at | datetime | auto | Audit field |
| updated_at | datetime | auto | Audit field |

Item types:

```text
text
link
project
experience
highlight
skill
contact_method
```

Indexes:

```text
(section_id, is_visible, order)
item_type
```

---

## Technology

Represents a technology used in projects.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | integer/uuid | yes | Primary key |
| name | string | yes | Human-readable name |
| slug | slug | yes | Stable API identifier |

Constraints:

```text
UNIQUE name
UNIQUE slug
```

---

## Tag

Represents a general classification.

| Field | Type | Required | Notes |
|---|---|---:|---|
| id | integer/uuid | yes | Primary key |
| name | string | yes | Human-readable name |
| slug | slug | yes | Stable API identifier |

Constraints:

```text
UNIQUE name
UNIQUE slug
```

---

## ProjectDetails

Extends a `SectionItem` of type `project`.

| Field | Type | Required | Notes |
|---|---|---:|---|
| item | OneToOne | yes | Linked SectionItem |
| repo_url | URL | no | Repository link |
| demo_url | URL | no | Live/demo link |
| technologies | M2M | no | Related Technology records |
| tags | M2M | no | Related Tag records |

Relationships:

```text
ProjectDetails.item -> SectionItem
ProjectDetails.technologies -> Technology
ProjectDetails.tags -> Tag
```

---

## ExperienceDetails

Extends a `SectionItem` of type `experience`.

| Field | Type | Required | Notes |
|---|---|---:|---|
| item | OneToOne | yes | Linked SectionItem |
| company | string | no | Company name |
| location | string | no | Job location |
| employment_type | string | no | full_time, contract, etc. |
| highlights | JSON list | no | Bullet points |

---

## SkillDetails

Extends a `SectionItem` of type `skill`.

| Field | Type | Required | Notes |
|---|---|---:|---|
| item | OneToOne | yes | Linked SectionItem |
| category | string | no | Skill category |
| level | integer | no | Optional numeric level |
| level_label | string | no | beginner/intermediate/advanced |

---

## Contact Handling

There are two distinct concepts:

### Contact Section Content

Stored using:

```text
Section: slug = contact
SectionItem: item_type = contact_method
```

Example:

```json
{
  "item_type": "contact_method",
  "title": "Email",
  "body": "hello@example.com",
  "url": "mailto:hello@example.com"
}
```

### Contact Form Submissions

If the site has a contact form, use a separate model:

```text
ContactMessage
  name
  email
  subject
  message
  is_read
  created_at
```

This should not be mixed with section content unless you want submissions to appear as CMS content.
