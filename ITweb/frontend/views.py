from django.shortcuts import render

def home(request):
    # You can pass context data to your template here
    context = {}
    return render(request, 'frontend/home.html', context)

def departments(request):
    # You can pass context data to your template here
    context = {}
    return render(request, 'frontend/departments.html', context)