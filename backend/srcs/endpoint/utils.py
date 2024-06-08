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

def get_video_index(lst: list) -> list[str]:
	video_lst = []
	dictt = {"The Blockchain Life, Episode 6: The Alternate Economy in Nigeria - Trailer" : "video1",
				"Episode 4: The Ripple vs. SEC Saga - Trailer | myco" : "video2",
				"COPA90 | Trailer" : "video3",
				"Imtiaz Legends League" : "video4",
				"Hamza Khan | Sponsorship signing ceremony" : "video5",
				"Watch It. Earn It. Ramadan It! - Episode 11" : "video6",
				"Ocean Deep | Trailer - streaming now on myco" : "video7",
				"Behind The Scenes - El Salvador vs. The World Bank | myco" : "video8",
				"Supercar Blondie | Explaining the concept behind #ProjectBlackNFT" : "video9",}
	for e in lst:
		video_lst.append(dictt[e])
	return video_lst