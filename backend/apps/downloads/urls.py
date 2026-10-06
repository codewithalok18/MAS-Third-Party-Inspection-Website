from django.urls import path

from .views import DownloadDocumentListView


urlpatterns = [
    path(
        "",
        DownloadDocumentListView.as_view(),
        name="downloads-list",
    ),
]