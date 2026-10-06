from django.urls import path

from .views import IndustryListView, IndustryDetailView


urlpatterns = [
    path("", IndustryListView.as_view(), name="industry-list"),
    path(
        "<slug:slug>/",
        IndustryDetailView.as_view(),
        name="industry-detail",
    ),
]