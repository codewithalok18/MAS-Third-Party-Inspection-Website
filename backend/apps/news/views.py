from rest_framework import generics

from .models import NewsArticle
from .serializers import NewsArticleSerializer


class NewsArticleListView(generics.ListAPIView):
    serializer_class = NewsArticleSerializer

    def get_queryset(self):
        return NewsArticle.objects.filter(
            published=True
        ).order_by(
            "-published_at",
            "-created_at",
        )


class NewsArticleDetailView(generics.RetrieveAPIView):
    serializer_class = NewsArticleSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return NewsArticle.objects.filter(
            published=True
        )