from django.shortcuts import render
import requests , re, json, random , string
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
@csrf_exempt
def seo_opt(request):
	pass

@csrf_exempt
def say_hello(request):
	return JsonResponse({"message": "Hello, World!"})