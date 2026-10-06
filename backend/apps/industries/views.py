from rest_framework import generics

from .models import Industry
from .serializers import IndustrySerializer


class IndustryListView(generics.ListAPIView):
    serializer_class = IndustrySerializer

    def get_queryset(self):
        return Industry.objects.filter(
            published=True
        ).order_by(
            "display_order",
            "-created_at",
        )


class IndustryDetailView(generics.RetrieveAPIView):
    serializer_class = IndustrySerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Industry.objects.filter(
            published=True
        )