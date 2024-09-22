# SolidJS (Frontend):

A simple UI in SolidJS with a button, and when clicked, it triggers a REST API call to Django.
The UI will present patient data in a table once the API response is received.

* project name: patient-records
* framework: Solid Start
* type: basic
* javascript flavour: TypeScript
====================================================

# Django (Backend/API):

Django will serve as the backend, providing a REST API endpoint to fetch patient data.
A Django model is defined for patients and Django's ORM is used to interact with the PostgreSQL database.
The API will handle the GET request, query the database, and return the list of patients in JSON format.

Steps to Create Your Django API:
1. Install Django and Set Up a New Project
First, ensure you have Python installed. You can create a virtual environment to isolate your project’s dependencies.

bash
Copy code
# Create a virtual environment
python -m venv env

# Activate the environment
# On Windows:
env\Scripts\activate
# On MacOS/Linux:
source env/bin/activate
Then, install Django:

bash
Copy code
pip install django
Now, create your Django project:

bash
Copy code
django-admin startproject patients_api
cd patients_api
This creates the basic Django project structure.

2. Install Django REST Framework
Since you'll be building an API, you should install Django REST Framework (DRF), which makes building REST APIs simple.

bash
Copy code
pip install djangorestframework
3. Configure Django Settings
Open the settings.py file inside your patients_api folder and add 'rest_framework' to the INSTALLED_APPS list:

python
Copy code
INSTALLED_APPS = [
    # Other installed apps
    'rest_framework',
]
4. Create the Patients App
Next, create a Django app that will handle your patient-related functionality:

bash
Copy code
python manage.py startapp patients
Now add 'patients' to the INSTALLED_APPS list in settings.py.

5. Create the Patient Model
In the patients/models.py file, define a simple Patient model with some basic fields:

python
Copy code
from django.db import models

class Patient(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField()
    diagnosis = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
6. Create and Apply Migrations
Run the following commands to create and apply the database migrations, which will create the necessary database tables:

bash
Copy code
python manage.py makemigrations
python manage.py migrate
7. Create a Serializer
To convert the Patient model data into JSON format (for the API), create a serializer in patients/serializers.py:

python
Copy code
from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
8. Create a View for the API
In patients/views.py, define an API view that returns a list of patients:

python
Copy code
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Patient
from .serializers import PatientSerializer

@api_view(['GET'])
def get_patients(request):
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return Response(serializer.data)
9. Set Up URL Routing
In patients/urls.py, define a URL pattern for the get_patients API:

python
Copy code
from django.urls import path
from .views import get_patients

urlpatterns = [
    path('patients/', get_patients, name='get_patients'),
]
Next, include this in your main patients_api/urls.py file:

python
Copy code
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('patients.urls')),
]
10. Test the API
Run the Django development server:

bash
Copy code
python manage.py runserver
Now, you can visit http://127.0.0.1:8000/api/patients/ in your browser, and it should return a JSON response with a list of patients (though you’ll need to add some patient data to the database first).

11. (Optional) Set Up Admin Panel
You can add patient records via the Django admin panel:

Create a superuser:

bash
Copy code
python manage.py createsuperuser
Register the Patient model in patients/admin.py:

python
Copy code
from django.contrib import admin
from .models import Patient

admin.site.register(Patient)
Now, go to http://127.0.0.1:8000/admin/ and log in with your superuser credentials to add some patient records.


====================================================

# PostgreSQL (Database):

PostgreSQL in a Docker container.
Django will connect to this database to store and retrieve patient data.
Steps:

# Docker Setup:

Create a docker-compose.yml to spin up a PostgreSQL container and connect it to Django.

# Django REST API:

Create a simple model for patients.
Use Django REST Framework (DRF) to expose an endpoint that fetches the list of patients from the database.

# Common Extensions for Django Projects:
Python (Microsoft) – for Python IntelliSense, linting, and debugging.
Django (Baptiste Darthenay) – Django snippets and template support.
SQLite (Alex Covizzi) – if you're working with SQLite (useful for quick setups before PostgreSQL).
GitLens – for version control and tracking changes.
Docker – if you're using Docker for PostgreSQL or Django.