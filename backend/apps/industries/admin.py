from django.contrib import admin

from .models import Industry


@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "featured",
        "published",
        "display_order",
        "created_at",
    )

    list_filter = (
        "featured",
        "published",
        "created_at",
    )

    search_fields = (
        "title",
        "short_description",
        "description",
    )

    prepopulated_fields = {
        "slug": ("title",),
    }

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "display_order",
        "-created_at",
    )