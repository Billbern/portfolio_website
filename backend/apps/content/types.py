"""GraphQL types (docs/GRAPHQL_SPEC.md).

Field names are auto-camelCased by graphene-django. `JSON`, `Date` and
`DateTime` scalars come from graphene-django's automatic conversions
(the spec explicitly allows `JSONString` for JSON).
"""

import graphene
from graphene_django import DjangoObjectType

from .models import (
    ExperienceDetails,
    ItemType,
    ProjectDetails,
    Section,
    SectionItem,
    SkillDetails,
    Tag,
    Technology,
)

# GraphQL enum values use the TextChoices member names: TEXT, LINK, PROJECT,
# EXPERIENCE, HIGHLIGHT, SKILL, CONTACT_METHOD — matching the spec exactly.
ItemTypeEnum = graphene.Enum.from_enum(ItemType)


class TechnologyType(DjangoObjectType):
    class Meta:
        model = Technology
        fields = ("id", "name", "slug")


class TagType(DjangoObjectType):
    class Meta:
        model = Tag
        fields = ("id", "name", "slug")


class ProjectDetailsType(DjangoObjectType):
    class Meta:
        model = ProjectDetails
        fields = ("repo_url", "demo_url", "technologies", "tags")


class ExperienceDetailsType(DjangoObjectType):
    class Meta:
        model = ExperienceDetails
        fields = ("company", "location", "employment_type", "highlights")


class SkillDetailsType(DjangoObjectType):
    class Meta:
        model = SkillDetails
        fields = ("category", "level", "level_label")


class SectionItemType(DjangoObjectType):
    project_details = graphene.Field(ProjectDetailsType)
    experience_details = graphene.Field(ExperienceDetailsType)
    skill_details = graphene.Field(SkillDetailsType)
    image = graphene.String()  # maps model field `image_url` per spec

    class Meta:
        model = SectionItem
        fields = (
            "id",
            "item_type",
            "title",
            "subtitle",
            "body",
            "url",
            "start_date",
            "end_date",
            "is_current",
            "order",
            "metadata",
        )

    item_type = ItemTypeEnum(required=True)

    @staticmethod
    def resolve_image(root, info):
        return root.image_url

    @staticmethod
    def resolve_project_details(root, info):
        return getattr(root, "project_details", None)

    @staticmethod
    def resolve_experience_details(root, info):
        return getattr(root, "experience_details", None)

    @staticmethod
    def resolve_skill_details(root, info):
        return getattr(root, "skill_details", None)


class SectionType(DjangoObjectType):
    items = graphene.List(graphene.NonNull(SectionItemType), required=True)

    class Meta:
        model = Section
        fields = (
            "id",
            "slug",
            "title",
            "supporting_title",
            "description",
            "display_type",
            "display_config",
            "order",
            "metadata",
            "updated_at",
        )

    @staticmethod
    def resolve_items(root, info):
        # Prefer the visibility-filtered prefetch from selectors.
        prefetched = getattr(root, "api_items", None)
        if prefetched is not None:
            return prefetched
        return root.items.filter(is_visible=True)
