from rest_framework import generics

from .models import ContactEnquiry
from .serializers import ContactEnquirySerializer


class ContactEnquiryCreateView(generics.CreateAPIView):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer

    def perform_create(self, serializer):
        enquiry = serializer.save()

        print(
            f"New contact enquiry saved: "
            f"{enquiry.first_name} {enquiry.last_name} | "
            f"{enquiry.email}"
        )