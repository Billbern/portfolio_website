# 04_GRAPHQL_API_SPECIFICATION.md

## Endpoint

```text
POST /graphql/
```

For development:

```text
GET /graphql/
```

GraphiQL can be enabled in development.

---

## Authentication

Public queries:

```text
No authentication required.
```

Admin content editing:

```text
Django Admin authentication.
```

GraphQL mutations:

```text
Out of scope for v1 unless decided otherwise.
```

---

## Visibility Rules

The public GraphQL API should only return:

```text
Section.is_visible = true
SectionItem.is_visible = true
```

Hidden sections and hidden items should not appear in public responses.

---

## GraphQL Scalar Types

```graphql
scalar JSON
scalar Date
scalar DateTime
```

Implementation note:

With Graphene-Django, JSON may be exposed as `JSONString` depending on configuration.

---

## Enum: ItemType

```graphql
enum ItemType {
  TEXT
  LINK
  PROJECT
  EXPERIENCE
  HIGHLIGHT
  SKILL
  CONTACT_METHOD
}
```

---

## Type: Technology

```graphql
type Technology {
  id: ID!
  name: String!
  slug: String!
}
```

---

## Type: Tag

```graphql
type Tag {
  id: ID!
  name: String!
  slug: String!
}
```

---

## Type: ProjectDetails

```graphql
type ProjectDetails {
  repoUrl: String
  demoUrl: String
  technologies: [Technology!]!
  tags: [Tag!]!
}
```

---

## Type: ExperienceDetails

```graphql
type ExperienceDetails {
  company: String
  location: String
  employmentType: String
  highlights: JSON
}
```

---

## Type: SkillDetails

```graphql
type SkillDetails {
  category: String
  level: Int
  levelLabel: String
}
```

---

## Type: SectionItem

```graphql
type SectionItem {
  id: ID!
  itemType: ItemType!
  title: String
  subtitle: String
  body: String
  url: String
  image: String
  startDate: Date
  endDate: Date
  isCurrent: Boolean!
  order: Int!
  metadata: JSON

  projectDetails: ProjectDetails
  experienceDetails: ExperienceDetails
  skillDetails: SkillDetails
}
```

---

## Type: Section

```graphql
type Section {
  id: ID!
  slug: String!
  title: String!
  supportingTitle: String
  description: String
  displayType: String!
  displayConfig: JSON
  order: Int!
  metadata: JSON
  updatedAt: DateTime!
  items: [SectionItem!]!
}
```

---

## Root Query

```graphql
type Query {
  sections(
    slugs: [String!]
  ): [Section!]!

  section(
    slug: String!
  ): Section

  projects(
    technologies: [String!]
    tags: [String!]
    limit: Int
    offset: Int
  ): [SectionItem!]!

  technologies: [Technology!]!

  tags: [Tag!]!
}
```

---

## Query Behavior

### `sections`

Returns visible sections ordered by `order`.

Arguments:

| Argument | Type | Description |
|---|---|---|
| slugs | [String!] | Optional list of section slugs |

Behavior:

- If `slugs` is omitted, return all visible sections.
- If `slugs` is provided, return matching visible sections.
- Items should be visible only.
- Items should be ordered by item `order`.

Example:

```graphql
query {
  sections {
    slug
    title
    displayType
  }
}
```

Example with selected sections:

```graphql
query {
  sections(slugs: ["about", "projects", "skills"]) {
    slug
    title
    displayType
    items {
      id
      itemType
      title
    }
  }
}
```

---

### `section`

Returns one visible section by slug.

Arguments:

| Argument | Type | Description |
|---|---|---|
| slug | String! | Section slug |

Behavior:

- Returns `null` if section does not exist or is hidden.

Example:

```graphql
query {
  section(slug: "projects") {
    title
    supportingTitle
    displayType
    items {
      itemType
      title
      subtitle
    }
  }
}
```

---

### `projects`

Returns visible project items.

Arguments:

| Argument | Type | Description |
|---|---|---|
| technologies | [String!] | Technology slugs |
| tags | [String!] | Tag slugs |
| limit | Int | Optional result limit |
| offset | Int | Optional offset |

Behavior:

- Return only items where `item_type = PROJECT`.
- Return only visible items.
- Filter by technology slug if provided.
- Filter by tag slug if provided.
- Use distinct results to avoid duplicates from M2M filters.
- Order by item order, then ID or start date.

Example:

```graphql
query {
  projects(technologies: ["django", "python"], tags: ["backend"]) {
    title
    subtitle
    image
    projectDetails {
      repoUrl
      demoUrl
      technologies {
        slug
        name
      }
      tags {
        slug
        name
      }
    }
  }
}
```

---

### `technologies`

Returns all technologies.

Example:

```graphql
query {
  technologies {
    slug
    name
  }
}
```

---

### `tags`

Returns all tags.

Example:

```graphql
query {
  tags {
    slug
    name
  }
}
```

---

## Example Full Section Query

```graphql
query GetSections($slugs: [String!]) {
  sections(slugs: $slugs) {
    slug
    title
    supportingTitle
    description
    displayType
    displayConfig
    metadata
    updatedAt
    items {
      id
      itemType
      title
      subtitle
      body
      url
      image
      startDate
      endDate
      isCurrent
      metadata

      projectDetails {
        repoUrl
        demoUrl
        technologies {
          slug
          name
        }
        tags {
          slug
          name
        }
      }

      experienceDetails {
        company
        location
        employmentType
        highlights
      }

      skillDetails {
        category
        level
        levelLabel
      }
    }
  }
}
```

Variables:

```json
{
  "slugs": ["about", "projects", "skills"]
}
```

---

## Error Handling

### Section Not Found

Return:

```json
{
  "data": {
    "section": null
  }
}
```

Do not treat missing section as a fatal GraphQL error unless requested slug is malformed.

---

### Invalid Slug Format

Slug input should be treated as a normal string filter.

If no match is found:

```json
{
  "data": {
    "section": null
  }
}
```

---

### Server Errors

Standard GraphQL error format:

```json
{
  "data": null,
  "errors": [
    {
      "message": "Internal server error"
    }
  ]
}
```

Production should avoid leaking stack traces.

---

## Pagination

Version 1 can use simple limit/offset for projects.

Example:

```graphql
query {
  projects(limit: 10, offset: 0) {
    title
  }
}
```

Default limit recommendation:

```text
limit = 50
max_limit = 100
```

If the portfolio grows large, switch to cursor-based pagination.

---

## Caching Strategy

Optional but recommended later:

```text
Cache-Control: public, max-age=60
```

Cache key examples:

```text
sections:all
sections:slugs=about,projects
projects:tech=django&tags=backend
```

Invalidation:

- Invalidate content caches when Section, SectionItem, or related details are saved.
- Invalidate project caches when technologies/tags/project details change.

---