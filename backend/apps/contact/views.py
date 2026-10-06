from rest_framework import generics

from .models import ContactEnquiry
from .serializers import ContactEnquirySerializer


class ContactEnquiryCreateView(generics.CreateAPIView):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer