from rest_framework import serializers

from .models import ContactEnquiry


class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry

        fields = [
            "id",
            "first_name",
            "last_name",
            "company",
            "email",
            "phone",
            "service",
            "message",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "status",
            "created_at",
        ]