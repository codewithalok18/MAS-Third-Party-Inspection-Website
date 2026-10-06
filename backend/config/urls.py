from django.contrib import admin
from django.urls import include, path

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("admin/", admin.site.urls),

    path(
        "api/contact/",
        include("apps.contact.urls"),
    ),

    path(
        "api/news/",
        include("apps.news.urls"),
    ),
    path("api/industries/", include("apps.industries.urls")),

    path(
        "api/downloads/",
        include("apps.downloads.urls"),
    ),
    path("api/services/", include("apps.services.urls")),
]


if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )