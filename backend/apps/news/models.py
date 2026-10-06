from django.db import models


class NewsArticle(models.Model):
    CATEGORY_CHOICES = [
        ("company", "Company"),
        ("services", "Services"),
        ("industry", "Industry"),
        ("announcement", "Announcement"),
    ]

    title = models.CharField(max_length=250)

    slug = models.SlugField(
        max_length=280,
        unique=True,
    )

    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES,
        default="company",
    )

    excerpt = models.TextField()

    content = models.TextField(
        blank=True,
    )

    image = models.ImageField(
        upload_to="news/",
        blank=True,
        null=True,
    )

    published = models.BooleanField(
        default=False,
    )

    published_at = models.DateTimeField(
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-published_at", "-created_at"]
        verbose_name = "News Article"
        verbose_name_plural = "News Articles"

    def __str__(self):
        return self.title