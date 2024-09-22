# Create your models here.
from django.db import models

class Patient(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField()
    diagnosis = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'