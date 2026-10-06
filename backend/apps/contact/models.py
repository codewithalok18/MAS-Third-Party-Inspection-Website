from django.db import models


class ContactEnquiry(models.Model):
    STATUS_CHOICES = [
        ("new", "New"),
        ("in_progress", "In Progress"),
        ("closed", "Closed"),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    company = models.CharField(max_length=200, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)

    service = models.CharField(max_length=200, blank=True)

    message = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="new",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.email}"

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact Enquiry"
        verbose_name_plural = "Contact Enquiries"