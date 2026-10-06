from rest_framework import generics

from .models import DownloadDocument
from .serializers import DownloadDocumentSerializer


class DownloadDocumentListView(generics.ListAPIView):
    serializer_class = DownloadDocumentSerializer

    def get_queryset(self):
        return DownloadDocument.objects.filter(
            published=True
        ).order_by(
            "-created_at"
        )