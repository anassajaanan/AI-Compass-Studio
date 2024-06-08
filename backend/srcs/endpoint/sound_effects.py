import requests

# use freesound.org API to get sound effects


def get_sound_effects(query):
	url = "https://freesound.org/apiv2/search/text/"

	params = {
		"query": query,
		"token":
		"KY9Ov3dhlSPn2nwaT81Hlr2bz0oM6mHpHqJHhgEh"
	}

	response = requests.get(url, params=params)

	if response.status_code == 200:
		data = response.json()
		print(data)
		# print all links
		# sounds = []
		# for sound in data["results"]:
		# 	sounds.append(sound["previews"]["preview-hq-mp3"])
		# return sounds
	
	else:
		print("An error occurred while getting sound effects")
		return None
	

get_sound_effects("explosion")