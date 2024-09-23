Environment: Windows 11

### Summary of steps:
* [Install Django and Set Up a New Project](#install-django-and-set-up-a-new-project)<br>
* [Create your Django project](#create-your-django-project)<br>
* [Install Django REST Framework](#install-django-rest-framework)<br>
* [Configure Django Settings](#configure-django-settings)<br>
* [Create the Patients App](#create-the-patients-app)<br>
* [Create the Patient Model](#create-the-patient-model)<br>
* [Create and Apply Migrations](#create-and-apply-migrations)<br>
* [Add data to the database](#add-data-to-the-database)<br>
* [Create a Serializer](#create-a-serializer)<br>
* [Create a View for the API](#create-a-view-for-the-api)<br>
* [Set Up URL Routing](#set-up-url-routing)<br>
* [Test the API](#test-the-api)<br>
* [Set Up Admin Panel (Optional)](#set-up-admin-panel-optional)<br>
* [Useful commands](#useful-commands)<br>
* [Enable CORS](#enable-cors)<br>

### Steps to Create a Django API:
#### Install Django and Set Up a New Project
With Python installed, setup a virtual environment, activate it and install Django:

```bash
python -m venv env
env\Scripts\activate
```
Then, install Django:

```
pip install django
```
#### Create your Django project

```bash
django-admin startproject patients_api
cd patients_api
```

This creates the basic Django project structure.

#### Install Django REST Framework
Since building an API, install Django REST Framework (DRF), making building REST APIs more simple.

```bash
pip install djangorestframework
```

#### Configure Django Settings
Open the settings.py file inside the patients_api folder and add 'rest_framework' to the INSTALLED_APPS list:

```python
INSTALLED_APPS = [
    # Other installed apps
    'rest_framework',
]
```

#### Create the Patients App
Create a Django app that will handle your patient-related functionality:

```python
python manage.py startapp patients
```

Add 'patients' to the INSTALLED_APPS list in settings.py so that Django knows about it:

```python
INSTALLED_APPS = [
  .
  .
  .
    'rest_framework',

    # custom apps
    'patients',
]
```

#### Create the Patient Model
In the ```patients/models.py file```, define a simple Patient model with some basic fields:

```python
from django.db import models

class Patient(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField()
    diagnosis = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

```
#### Create and Apply Migrations
Continue if have a PostgreSQL database running. Otherwise jump to [Running PostgreSQl in a Docker container](#running-postgresql-in-a-docker-container) to setup the database.

Run the following commands to create a migration file:
```bash
python manage.py makemigrations
```

Now run the migrations to apply the changes to the database:
```bash
python manage.py migrate
```

#### Add data to the database
Can access the database vi pgadmin at http://localhost:8080/
Can create a volume i.e. specify a location that the container has permission to access

```bash
docker run --network local-network --name patient-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=p@ssw0rd -e POSTGRES_DB=patients -p 5432:5432 -d postgres -v <file-path>
```

or
 copy the file directly onto the container e.g.

 ```bash
 docker cp <local-file-path> <docker-name>:/<filename>
 ```

 or add data via Django admin - see [Set Up Admin Panel](#set-up-admin-panel-optional)

 or create a csv/json file and import directly into PostgreSQL


#### Create a Serializer
To convert the Patient model data into JSON format (for the API), create a serializer in ```patients/serializers.py```:

```python
from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
```

#### Create a View for the API
In ```patients/views.py```, define an API view that returns a list of patients:

```python
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Patient
from .serializers import PatientSerializer

@api_view(['GET'])
def get_patients(request):
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return Response(serializer.data)
```  
   
#### Set Up URL Routing
In ```patients/urls.py```, define a URL pattern for the get_patients API:

```python
from django.urls import path
from .views import get_patients

urlpatterns = [
    path('patients/', get_patients, name='get_patients'),
]
```

Next, include this in your main ```patients_api/urls.py``` file:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('patients.urls')),
]
```

#### Test the API
Run the Django development server:

```bash
python manage.py runserver
```

Now, can visit http://127.0.0.1:8000/api/patients/ in the browser, and it should return a JSON response with a list of patients (tassuming patient data exists in the database).

#### Set Up Admin Panel (Optional)
You can add patient records via the Django admin panel:

Create a superuser:

```python manage.py createsuperuser```

e.g. can use following for local use:
```
Username: admin
Email: admin@admin.com
password: p@ssw0rd
```

Register the Patient model in ```patients/admin.py```:

```python
from django.contrib import admin
from .models import Patient

admin.site.register(Patient)
```
Visit http://127.0.0.1:8000/admin (or http://localhost:8000/admin) to access the admin panel.

===========================================

### Running PostgreSQl in a Docker container
#### Install Docker Desktop
Go to the Docker Desktop website and download the installer for your operating system - https://www.docker.com/products/docker-desktop/

#### Create container to run PostgreSQL
docker run --network local-network --name patient-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=p@ssw0rd -e POSTGRES_DB=patients -p 5432:5432 -d postgres

#### Create a container for the PostgreSQl UI (pgadmin)
docker run --network local-network --name patient-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=p@ssw0rd -e POSTGRES_DB=patients -p 5432:5432 -d postgres -d postgres

#### Enable CORS
So that the frontend (e.g. localhost:3000) can talk to this backend on localhost:8000 need to enable CORS:

```pip install django-cors-headers```

update ```settings.py``` by adding ```corsheaders``` to INSTALLED_APPS

Add middleware for CORS:
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # other middleware
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # SolidJS frontend
]
```

#### Useful Commands
```python
python manage.py startapp <app name>
python manage.py runserver
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```