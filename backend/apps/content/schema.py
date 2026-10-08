"""GraphQL root query for the public, read-only content API."""

import graphene

from . import selectors
from .types import SectionItemType, SectionType, TagType, TechnologyType


class Query(graphene.ObjectType):
    sections = graphene.List(
        graphene.NonNull(SectionType),
        slugs=graphene.List(graphene.String),
        description="Visible sections ordered by `order`.",
    )
    section = graphene.Field(
        SectionType,
        slug=graphene.String(required=True),
        description="Single visible section by slug; null when not found.",
    )
    projects = graphene.List(
        graphene.NonNull(SectionItemType),
        technologies=graphene.List(graphene.String),
        tags=graphene.List(graphene.String),
        limit=graphene.Int(),
        offset=graphene.Int(),
        description="Visible project items with limit/offset pagination.",
    )
    technologies = graphene.List(graphene.NonNull(TechnologyType))
    tags = graphene.List(graphene.NonNull(TagType))

    @staticmethod
    def resolve_sections(root, info, slugs=None):
        return selectors.visible_sections(slugs)

    @staticmethod
    def resolve_section(root, info, slug):
        return selectors.visible_section(slug)

    @staticmethod
    def resolve_projects(root, info, technologies=None, tags=None, limit=None, offset=None):
        return selectors.projects(
            technologies=technologies,
            tags=tags,
            limit=limit,
            offset=offset,
        )

    @staticmethod
    def resolve_technologies(root, info):
        return selectors.technologies()

    @staticmethod
    def resolve_tags(root, info):
        return selectors.tags()


schema = graphene.Schema(query=Query)
