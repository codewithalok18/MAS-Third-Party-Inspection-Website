from django.db import models


class Service(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)

    short_description = models.TextField()
    description = models.TextField(blank=True)

    points = models.JSONField(
    default=list,
    blank=True,
    help_text="Enter key service areas as a JSON list.",
)

    icon = models.CharField(
        max_length=100,
        blank=True,
        help_text="Lucide icon name, for example: ShieldCheck, Search, Settings",
    )

    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=True)

    display_order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "-created_at"]
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return self.title