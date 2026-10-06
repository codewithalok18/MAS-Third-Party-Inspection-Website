from django.contrib import admin

from .models import DownloadDocument


@admin.register(DownloadDocument)
class DownloadDocumentAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "document_type",
        "published",
        "created_at",
    )

    list_filter = (
        "document_type",
        "published",
        "created_at",
    )

    search_fields = (
        "title",
        "description",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "-created_at",
    )