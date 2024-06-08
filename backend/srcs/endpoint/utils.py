from openai import OpenAI
from collections import OrderedDict
from django.conf import settings



def generate_embeddings_from_openai(text: str) -> list[float]:
	client = OpenAI(api_key=settings.OPENAI_API_KEY)
	response = client.embeddings.create(
		input=text,
		model="text-embedding-ada-002"
	)
	return response.data[0].embedding