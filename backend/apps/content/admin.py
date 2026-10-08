"""Django Admin configuration (docs/ADMIN_CONTENT_SPEC.md)."""

from django.contrib import admin

from .models import (
    ExperienceDetails,
    ProjectDetails,
    Section,
    SectionItem,
    SkillDetails,
    Tag,
    Technology,
)


class ProjectDetailsInline(admin.StackedInline):
    model = ProjectDetails
    fk_name = "item"
    extra = 1
    filter_horizontal = ("technologies", "tags")
    fieldsets = (
        (None, {"fields": (("repo_url", "demo_url"),)}),
        ("Taxonomy", {"fields": (("technologies", "tags"),)}),
    )


class ExperienceDetailsInline(admin.StackedInline):
    model = ExperienceDetails
    fk_name = "item"
    extra = 1
    fields = ("company", "location", "employment_type", "highlights")


class SkillDetailsInline(admin.StackedInline):
    model = SkillDetails
    fk_name = "item"
    extra = 1
    fields = ("category", "level", "level_label")


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "display_type", "order", "is_visible", "updated_at")
    list_editable = ("order", "is_visible")
    list_filter = ("is_visible", "display_type")
    search_fields = ("title", "slug", "description")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("order", "id")
    fieldsets = (
        (None, {"fields": ("title", "slug", "supporting_title", "description")}),
        ("Presentation", {"fields": ("display_type", "display_config", "metadata")}),
        ("Ordering & visibility", {"fields": ("order", "is_visible")}),
    )


@admin.register(SectionItem)
class SectionItemAdmin(admin.ModelAdmin):
    list_display = ("title", "section", "item_type", "order", "is_visible")
    list_editable = ("order", "is_visible")
    list_filter = ("is_visible", "item_type", "section")
    search_fields = ("title", "subtitle", "body", "section__title", "section__slug")
    autocomplete_fields = ("section",)
    inlines = (ProjectDetailsInline, ExperienceDetailsInline, SkillDetailsInline)
    ordering = ("section", "order", "id")


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "updated_at")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "updated_at")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
