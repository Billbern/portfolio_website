"""Public read helpers implementing the visibility rules of
docs/GRAPHQL_SPEC.md: only `is_visible=True` sections/items are public,
results are pre-ordered and pre-prefetched to keep query counts bounded.
"""

from django.db.models import Prefetch

from .models import ItemType, Section, SectionItem, Tag, Technology

DEFAULT_PROJECT_LIMIT = 50
MAX_PROJECT_LIMIT = 100


def _visible_items_queryset():
    """SectionItem queryset used for section prefetches."""
    return (
        SectionItem.objects.filter(is_visible=True)
        .select_related(
            "project_details",
            "experience_details",
            "skill_details",
        )
        .prefetch_related(
            "project_details__technologies",
            "project_details__tags",
        )
        .order_by("order", "id")
    )


def _project_item_queryset():
    """Base queryset for project items (visibility + details prefetching)."""
    return (
        SectionItem.objects.filter(
            is_visible=True,
            section__is_visible=True,
            item_type=ItemType.PROJECT,
        )
        .select_related(
            "project_details",
            "experience_details",
            "skill_details",
        )
        .prefetch_related(
            "project_details__technologies",
            "project_details__tags",
        )
    )


def visible_sections(slugs=None):
    """Visible sections ordered by `order`, items prefetched."""
    qs = Section.objects.filter(is_visible=True).prefetch_related(
        Prefetch(
            "items",
            queryset=_visible_items_queryset(),
            to_attr="api_items",
        )
    )
    if slugs is not None:
        qs = qs.filter(slug__in=slugs)
    return qs.order_by("order", "id")


def visible_section(slug):
    """Single visible section by slug, or None."""
    return visible_sections([slug]).first()


def projects(technologies=None, tags=None, limit=None, offset=None):
    """Visible project items.

    Filtering logic:
    - within a list (technologies/tags): OR — any listed slug matches;
    - across dimensions: AND — technology filter AND tag filter.
    """
    qs = _project_item_queryset()

    if technologies:
        qs = qs.filter(project_details__technologies__slug__in=technologies)
    if tags:
        qs = qs.filter(project_details__tags__slug__in=tags)
    if technologies and tags:
        qs = qs.distinct()

    qs = qs.order_by("section__order", "order", "id")

    if limit is None:
        limit = DEFAULT_PROJECT_LIMIT
    else:
        limit = max(0, min(limit, MAX_PROJECT_LIMIT))
    offset = max(0, offset or 0)

    return qs[offset : offset + limit]


def technologies():
    return Technology.objects.all()


def tags():
    return Tag.objects.all()
