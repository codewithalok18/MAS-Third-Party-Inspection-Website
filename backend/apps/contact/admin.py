from django.contrib import admin

from .models import ContactEnquiry


@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "company",
        "email",
        "service",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "service",
        "created_at",
    )

    search_fields = (
        "first_name",
        "last_name",
        "company",
        "email",
        "phone",
        "message",
    )

    readonly_fields = (
        "created_at",
    )

    ordering = (
        "-created_at",
    )