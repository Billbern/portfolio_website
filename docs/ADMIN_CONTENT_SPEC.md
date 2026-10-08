# 05_ADMIN_CONTENT_SPECIFICATION.md

## Purpose

Define how content is managed in Django Admin.

---

## Admin Roles

### Superuser / Owner

Can:

- Create sections.
- Edit all content.
- Manage technologies and tags.
- Show/hide content.
- Reorder items.

No additional roles are required for v1.

---

## Admin Modules

### Section Admin

Admin can:

- Create section.
- Edit slug.
- Edit title.
- Edit supporting title.
- Edit description.
- Choose display type.
- Edit display config JSON.
- Set order.
- Toggle visibility.

List view should show:

```text
title
slug
display_type
order
is_visible
updated_at
```

Editable in list:

```text
order
is_visible
```

---

### SectionItem Admin

Admin can:

- Create item.
- Assign item to section.
- Choose item type.
- Edit common fields.
- Set order.
- Toggle visibility.

Inline editors should include:

```text
ProjectDetailsInline
ExperienceDetailsInline
SkillDetailsInline
```

---

### ProjectDetails Admin

For project items, admin can:

- Add repository URL.
- Add demo URL.
- Assign technologies.
- Assign tags.

Use:

```python
filter_horizontal = ("technologies", "tags")
```

or autocomplete fields if taxonomy becomes large.

---

### Technology Admin

Admin can:

- Create technology.
- Edit name.
- Auto-generate slug from name.

List display:

```text
name
slug
```

---

### Tag Admin

Admin can:

- Create tag.
- Edit name.
- Auto-generate slug from name.

List display:

```text
name
slug
```

---

## Content Rules

### Slug Rules

Section slugs should be:

```text
lowercase
url-safe
unique
stable
```

Examples:

```text
about
experience
highlights
projects
skills
contact
```

Avoid changing slugs once frontend depends on them.

---

### Display Type Rules

`display_type` must correspond to a known frontend component.

Suggested initial values:

```text
hero
markdown
timeline
card_grid
skill_groups
contact
custom
```

The frontend should have a fallback for unknown values.

---

### Display Config Rules

`display_config` should contain only frontend rendering hints.

Good examples:

```json
{
  "columns": 3,
  "show_image": true,
  "show_tags": true
}
```

Avoid storing critical content here.

If a field needs filtering or validation, promote it to a proper model field.

---

## Seed Data

A management command should create default sections if they do not exist.

Command:

```bash
python manage.py seed_content
```

Seed sections:

```text
about
experience
highlights
projects
skills
contact
```

Seed technologies:

```text
python
django
postgresql
graphql
javascript
typescript
```

Seed tags:

```text
backend
frontend
data-engineering
gis
automation
api
crypto
```