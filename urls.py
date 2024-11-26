from django.urls import path
from . import views

urlpatterns = [
    path('contacto/', views.contacto, name='contacto'),  # Ruta para el formulario
    path('gracias/', views.gracias, name='gracias'),      # Ruta para la página de gracias
]
