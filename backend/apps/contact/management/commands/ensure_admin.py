import os

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "Create or update the Django admin user from environment variables."

    def handle(self, *args, **options):
        username = os.getenv("DJANGO_ADMIN_USERNAME")
        email = os.getenv("DJANGO_ADMIN_EMAIL")
        password = os.getenv("DJANGO_ADMIN_PASSWORD")

        if not username or not email or not password:
            self.stdout.write(
                self.style.WARNING(
                    "Admin environment variables are not configured. "
                    "Skipping admin user setup."
                )
            )
            return

        User = get_user_model()

        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                "email": email,
            },
        )

        user.email = email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()

        if created:
            self.stdout.write(
                self.style.SUCCESS(
                    f"Admin user '{username}' created successfully."
                )
            )
        else:
            self.stdout.write(
                self.style.SUCCESS(
                    f"Admin user '{username}' updated successfully."
                )
            )