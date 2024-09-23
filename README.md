System: Windows 11

3 tier stack:
* SolidJS
* Django
* PostgresSQL


# SolidJS (Frontend) project:

A simple UI in SolidJS with a button, and when clicked, it triggers a REST API call to the Django application.
The UI will present patient data received from the API response.

Instructions on how to create the SolidJS project is given in the readme under the project.

* project name: patient-records
* framework: Solid Start
* type: basic
* JavaScript flavour: TypeScript
====================================================

# Django (Backend/API) project:

Django will serve as the backend, providing a REST API endpoint to fetch patient data.
A Django model is defined for patients and Django's ORM is used to interact with a PostgreSQL database.
The API will handle the GET request, query the database, and return the list of patients in JSON format.




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