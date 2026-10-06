from django.db import models


class Industry(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)

    short_description = models.TextField()
    description = models.TextField(blank=True)

    points = models.JSONField(
        default=list,
        blank=True,
        help_text="Enter key industry areas as a JSON list.",
    )

    icon = models.CharField(
        max_length=100,
        blank=True,
        help_text="Lucide icon name, for example: Factory, Zap, Building2",
    )

    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=True)

    display_order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "-created_at"]
        verbose_name = "Industry"
        verbose_name_plural = "Industries"

    def __str__(self):
        return self.title