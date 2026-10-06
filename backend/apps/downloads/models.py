from django.db import models


class DownloadDocument(models.Model):
    DOCUMENT_TYPE_CHOICES = [
        ("company", "Company"),
        ("brochure", "Brochure"),
        ("capability", "Capability Statement"),
        ("certificate", "Certificate"),
        ("policy", "Policy"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=250)

    description = models.TextField(
        blank=True,
    )

    document_type = models.CharField(
        max_length=30,
        choices=DOCUMENT_TYPE_CHOICES,
        default="company",
    )

    file = models.FileField(
        upload_to="downloads/",
    )

    published = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Download Document"
        verbose_name_plural = "Download Documents"

    def __str__(self):
        return self.title