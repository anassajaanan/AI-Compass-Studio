import requests
import json

UNSPLASH_ACCESS_KEY = "HYk89EK44LnvhSIWL3CgnyOIvFFXZzYHP_hrGP4VsbI"

def get_images_from_unsplash(query):
	url = "https://api.unsplash.com/search/photos"

	headers = {
		"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"
	}

	params = {
		"query": query,
		"count": 3
	}

	response = requests.get(url, headers=headers, params=params)

	if response.status_code == 200:
		data = response.json()
		# print(data)
		# print all links
		images = []
		for image in data["results"]:
			images.append(image["urls"]["regular"])
		return images

	else:
		print("An error occurred while getting images from Unsplash")
		return None
	