from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI
from django.conf import settings
import json


# Create your views here.
@csrf_exempt
def seo_opt(request):
	pass


@csrf_exempt
def translate(request):
	client = OpenAI(api_key=settings.OPENAI_API_KEY)
	
	if request.method == 'POST':
		data = json.loads(request.body)
		content = data.get('content')
		target_language = data.get('language')  # e.g., "French"

		print(content)
		print(target_language)

		response = client.chat.completions.create(
			model="gpt-4o",
			messages=[
				{"role": "system", "content": f"You are an assistant trained to translate subtitles from English to {target_language} .Provide translations in WebVTT format."},
				{"role": "user", "content": content},
				{"role": "assistant", "content": "Here is the translation in WebVTT format:"}
			]
		)
		# Extract the translated text from the response
		translated_text = response.choices[0].message.content

		return JsonResponse({"translated_text": translated_text})
	


	else:
		return JsonResponse({"error": "Invalid request method"})