from django.conf import settings
from django.core.mail import EmailMessage

from rest_framework import generics

from .models import ContactEnquiry
from .serializers import ContactEnquirySerializer


class ContactEnquiryCreateView(generics.CreateAPIView):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer

    def perform_create(self, serializer):
        enquiry = serializer.save()

        subject = f"New Contact Enquiry - {enquiry.first_name} {enquiry.last_name}".strip()

        message = f"""
New contact enquiry received from MAS website.

Name: {enquiry.first_name} {enquiry.last_name}
Company: {enquiry.company or "Not provided"}
Email: {enquiry.email}
Phone: {enquiry.phone or "Not provided"}
Service: {enquiry.service or "Not specified"}

Message:
{enquiry.message}

Status: {enquiry.status}
"""

        email = EmailMessage(
            subject=subject,
            body=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.CONTACT_RECEIVER_EMAIL],
            reply_to=[enquiry.email],
        )

        try:
            email.send(fail_silently=False)
        except Exception as exc:
            print(f"Contact enquiry email failed: {exc}")