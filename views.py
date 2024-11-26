from django.shortcuts import render, redirect
from django.http import HttpResponse

def contacto(request):
    if request.method == 'POST':
        # Obtener los datos del formulario
        nombre = request.POST.get('nombre')
        email = request.POST.get('email')
        mensaje = request.POST.get('mensaje')
        
        # Validar que los campos no estén vacíos
        if not nombre or not email or not mensaje:
            # Si algún campo está vacío, devolver un mensaje de error
            return render(request, 'contacto.html', {'error': 'Por favor, completa todos los campos.'})
        
        # Validación del formato del correo electrónico
        if '@' not in email or '.' not in email:
            return render(request, 'contacto.html', {'error': 'Por favor, ingresa un correo electrónico válido.'})
        
        # Si todo está bien, redirigir a la página de gracias
        return redirect('gracias')

    return render(request, 'contacto.html')

def gracias(request):
    return render(request, 'gracias.html')
