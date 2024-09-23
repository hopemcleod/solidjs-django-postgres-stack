"""
ASGI config for patients_api project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/

An ASGI (Asynchronous Server Gateway Interface) configuration is used to set up
and manage asynchronous web applications in Python. It serves as a successor to 
WSGI (Web Server Gateway Interface), enabling support for asynchronous protocols
like WebSockets, HTTP/2,...

In the context of a Django project, the ASGI configuration is typically defined 
in a file named asgi.py. This file contains an application callable that the ASGI 
server uses to communicate with your code.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'patients_api.settings')

application = get_asgi_application()
