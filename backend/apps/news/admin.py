from django.contrib import admin

from .models import NewsArticle


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "published",
        "published_at",
        "created_at",
    )

    list_filter = (
        "category",
        "published",
        "published_at",
    )

    search_fields = (
        "title",
        "excerpt",
        "content",
    )

    prepopulated_fields = {
        "slug": ("title",),
    }

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "-published_at",
        "-created_at",
    )   