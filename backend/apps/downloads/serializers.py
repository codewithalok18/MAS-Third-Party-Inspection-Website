from rest_framework import serializers

from .models import DownloadDocument


class DownloadDocumentSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()

    class Meta:
        model = DownloadDocument

        fields = [
            "id",
            "title",
            "description",
            "document_type",
            "file",
            "published",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "published",
            "created_at",
        ]

    def get_file(self, obj):
        if not obj.file:
            return None

        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(obj.file.url)

        return obj.file.url