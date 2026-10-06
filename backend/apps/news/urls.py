from django.urls import path

from .views import (
    NewsArticleListView,
    NewsArticleDetailView,
)


urlpatterns = [
    path(
        "",
        NewsArticleListView.as_view(),
        name="news-list",
    ),

    path(
        "<slug:slug>/",
        NewsArticleDetailView.as_view(),
        name="news-detail",
    ),
]