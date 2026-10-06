from rest_framework import serializers

from .models import NewsArticle


class NewsArticleSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = NewsArticle

        fields = [
            "id",
            "title",
            "slug",
            "category",
            "excerpt",
            "content",
            "image",
            "published",
            "published_at",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "published",
            "created_at",
        ]

    def get_image(self, obj):
        if not obj.image:
            return None

        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(obj.image.url)

        return obj.image.url