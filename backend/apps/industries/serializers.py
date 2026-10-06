from rest_framework import serializers

from .models import Industry


class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry

        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "description",
            "points",
            "icon",
            "featured",
            "published",
            "display_order",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]