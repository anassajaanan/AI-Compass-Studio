from django.shortcuts import render
from pymongo import MongoClient
import pymongo
import requests , re, json, random , string
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI
import openai
from django.conf import settings
import json
from .utils import generate_embeddings_from_openai , get_video_index


from .brainstorming_ai import get_ai_response
from .writing_ai import get_ai_response_writing
from .unsplash import get_images_from_unsplash
from .reviews_ai import get_ai_response_reviews

# Create your views here.
@csrf_exempt
def seo_opt(request):
	pass

@csrf_exempt
def get_summary(request):
	if (request.method != 'POST'):
		return JsonResponse({"error": "Invalid request method"}, status=405)
	try:
		body_json = json.loads(request.body) 
		msg = str(body_json["msg"])
		client = pymongo.MongoClient("mongodb+srv://aboodytukka:etip1oHamMlrXgJz@cluster0.dsxiqji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
		db = client.db
		collection = db.video
		video_document = collection.find_one({"video_title": msg})
		print(msg)
		# print(video_document)

		if video_document:
			return JsonResponse({"summary": video_document['video_plot']})
		else:
			return JsonResponse({"error": "Video not found"}, status=404)
	except Exception as e:
		return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
def say_hello(request):
	return JsonResponse({"message": "Hello, World!"})


@csrf_exempt
def translate(request):
	client = OpenAI(api_key=settings.OPENAI_API_KEY)
	
	if request.method == 'POST':
		data = json.loads(request.body)
		content = data.get('msg')
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
	

@csrf_exempt
def create_thumbnail(request):
	client = OpenAI(api_key=settings.OPENAI_API_KEY)
	

	if request.method == 'POST':
		data = json.loads(request.body)
		user_prompt = data.get('msg')
		print(user_prompt)
		
		enhanced_prompt = f"Create a detailed, visually appealing thumbnail that illustrates: {user_prompt}. The image should be vibrant, clear, and engaging, suitable for a digital media platform viewer."

		response = client.images.generate(
			model="dall-e-3",
			prompt=enhanced_prompt,
			size="1792x1024",
			quality="standard",
			n=1
		)

		image_url = response.data[0].url
		print(image_url)

		my_list = [image_url]
		return JsonResponse({"content": my_list})
	else:
		return JsonResponse({"error": "Invalid request method"})

@csrf_exempt
def ai_search(request):
	if (request.method != 'POST'):
		return JsonResponse({"error": "Invalid request method"}, status=405)
	body_json = json.loads(request.body) 
	msg = str(body_json["msg"])
	client = pymongo.MongoClient("mongodb+srv://aboodytukka:etip1oHamMlrXgJz@cluster0.dsxiqji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
	db = client.db
	collection = db.video
	# search for the video in the database
	results = collection.aggregate([
	{"$vectorSearch": {
		"queryVector": generate_embeddings_from_openai(msg),
		"path": "embedding",
		"numCandidates": 100,
		"limit": 3,
		"index": "PlotSemanticSearch"
	}}
])
	
	return JsonResponse({"videos": get_video_index([result["video_title"] for result in results])})

@csrf_exempt
def brainstorming_view(request):
	if request.method == 'POST':
		data = json.loads(request.body)
		user_prompt = data.get('msg')

		# print(user_prompt)

		response = get_ai_response(user_prompt)
		if response:
			return JsonResponse({"content": response})
		else:
			return JsonResponse({"error": "An error occurred while getting AI response."})
	else:
		return JsonResponse({"error": "Invalid request method"})
	

@csrf_exempt
def writing_view(request):
	if request.method == 'POST':
		data = json.loads(request.body)
		user_prompt = data.get('msg')

		response = get_ai_response_writing(user_prompt)
		if response:
			return JsonResponse({"content": response})
		else:
			return JsonResponse({"error": "An error occurred while getting AI response."})
	else:
		return JsonResponse({"error": "Invalid request method"})

@csrf_exempt
def editing_view(request):
	client = OpenAI(api_key=settings.OPENAI_API_KEY)

	if request.method == 'POST':
		data = json.loads(request.body)
		user_prompt = data.get('msg')


		# check if thumbnail in the user_prompt
		if "thumbnail" in user_prompt:
			print("Thumbnail in user_prompt")
			return create_thumbnail(request)

		print(user_prompt)
	

		response = client.chat.completions.create(
				model="gpt-4o",
				messages=[
					{"role": "system", "content": "You are an assistant trained to extract the most relevant and specific tags from a content description provided by digital creators. These tags should represent key concepts or elements within the content that are suitable for fetching corresponding images." + " Based Based on the description provided, identify and list the most important 3 tags that can be used to fetch images relevant to each aspect of the content."},
					{"role": "user", "content": user_prompt},
					{"role": "assistant", "content": "Here are the most important 3 tags that can be used to fetch images relevant to each aspect of the content: Tag_1\nTag_2\nTag_3 "}
				]
			)
		
		# Extract the tags from the response
		tags = response.choices[0].message.content
		tags_list = tags.split("\n")
		print(tags_list)
		images = []
		for tag in tags_list:
			array = get_images_from_unsplash(tag)
			# add all links images to the list
			if array:
				images.extend(array)

		return JsonResponse({"content": images})


	else:
		return JsonResponse({"error": "Invalid request method"})

@csrf_exempt
def reviews_view(request):
	if request.method == 'POST':
		data = json.loads(request.body)
		user_prompt = data.get('msg')

		response = get_ai_response_reviews(user_prompt)
		if response:
			return JsonResponse({"content": response})
		else:
			return JsonResponse({"error": "An error occurred while getting AI response."})
	else:
		return JsonResponse({"error": "Invalid request method"})
