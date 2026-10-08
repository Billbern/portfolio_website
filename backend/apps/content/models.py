"""Content models (docs/DATA_MODEL.md).

Sections hold ordered SectionItems; items reference optional typed details
(ExperienceDetails, ProjectDetails, SkillDetails) and shared taxonomy
(Technology, Tag). Images are URL-based in v1.
"""

from django.db import models


class ItemType(models.TextChoices):
    """item_type values — exposed as the GraphQL `ItemType` enum."""

    TEXT = "text", "Text"
    LINK = "link", "Link"
    PROJECT = "project", "Project"
    EXPERIENCE = "experience", "Experience"
    HIGHLIGHT = "highlight", "Highlight"
    SKILL = "skill", "Skill"
    CONTACT_METHOD = "contact_method", "Contact method"


class DisplayType(models.TextChoices):
    """Known display types (developer-defined, admin-selectable).

    The frontend must fall back to a generic renderer for any value it does
    not recognize (docs/GRAPHQL_SPEC.md §4).
    """

    HERO = "hero", "Hero"
    MARKDOWN = "markdown", "Markdown"
    TIMELINE = "timeline", "Timeline"
    CARD_GRID = "card_grid", "Card grid"
    SKILL_GROUPS = "skill_groups", "Skill groups"
    CONTACT = "contact", "Contact"
    CUSTOM = "custom", "Custom"


class Section(models.Model):
    """A page section (about, experience, highlights, ...)."""

    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=255)
    supporting_title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    display_type = models.CharField(
        max_length=50,
        choices=DisplayType.choices,
        default=DisplayType.CUSTOM,
    )
    display_config = models.JSONField(default=dict, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_visible = models.BooleanField(default=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("order", "id")
        constraints = [
            models.UniqueConstraint(fields=["slug"], name="section_slug_unique"),
        ]
        indexes = [
            models.Index(fields=["is_visible", "order"], name="section_visible_order"),
            models.Index(fields=["slug"], name="section_slug_idx"),
        ]

class Technology(models.Model):
    """Technology referenced by projects (React, Django, PostgreSQL...)."""

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("name",)
        indexes = [
            models.Index(fields=["slug"], name="technology_slug_idx"),
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify

            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Tag(models.Model):
    """Short label taxonomy (API, GIS, Frontend...)."""

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("name",)
        indexes = [
            models.Index(fields=["slug"], name="tag_slug_idx"),
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify

            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class SectionItem(models.Model):
    """An item inside a section; typed details hang off related models."""

    section = models.ForeignKey(
        Section,
        related_name="items",
        on_delete=models.CASCADE,
    )
    item_type = models.CharField(max_length=32, choices=ItemType.choices)
    title = models.CharField(max_length=255, blank=True, null=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    url = models.URLField(max_length=500, blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    is_visible = models.BooleanField(default=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("order", "id")
        indexes = [
            models.Index(
                fields=["section", "is_visible", "order"],
                name="item_section_visible_order",
            ),
            models.Index(fields=["item_type"], name="item_item_type_idx"),
        ]

    def __str__(self):
        return f"{self.title or self.item_type} [{self.section.slug}]"


class ProjectDetails(models.Model):
    """Optional typed details for SectionItem with item_type=project."""

    item = models.OneToOneField(
        SectionItem,
        related_name="project_details",
        on_delete=models.CASCADE,
    )
    repo_url = models.URLField(max_length=500, blank=True)
    demo_url = models.URLField(max_length=500, blank=True)
    technologies = models.ManyToManyField(Technology, related_name="projects", blank=True)
    tags = models.ManyToManyField(Tag, related_name="projects", blank=True)

    def __str__(self):
        return f"Details for {self.item_id}"


class ExperienceDetails(models.Model):
    """Optional typed details for SectionItem with item_type=experience."""

    item = models.OneToOneField(
        SectionItem,
        related_name="experience_details",
        on_delete=models.CASCADE,
    )
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    employment_type = models.CharField(max_length=100, blank=True, null=True)
    highlights = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.company} ({self.item_id})"


class SkillDetails(models.Model):
    """Optional typed details for SectionItem with item_type=skill."""

    item = models.OneToOneField(
        SectionItem,
        related_name="skill_details",
        on_delete=models.CASCADE,
    )
    category = models.CharField(max_length=100, blank=True, null=True)
    level = models.PositiveSmallIntegerField(blank=True, null=True)
    level_label = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"Skill {self.item_id}"
