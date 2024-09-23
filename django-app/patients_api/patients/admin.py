from django.contrib import admin
from .models import Patient

# Register models with the admin class
admin.site.register(Patient)