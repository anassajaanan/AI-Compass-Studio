from pymongo import MongoClient
from pymongo.errors import CollectionInvalid
import openai
from collections import OrderedDict

openai.api_key = "sk-proj-Z3zWy5wqqc7XD5YQwUuPT3BlbkFJRTMNO8sTSOKjzDobeDxN"


def generate_embeddings_from_openai(text: str) -> list[float]:
	response = openai.Embedding.create(
		input=text,
		engine="text-embedding-ada-002"
	)
	return response['data'][0]['embedding']

client = MongoClient("mongodb+srv://aboodytukka:etip1oHamMlrXgJz@cluster0.dsxiqji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client['db']

videos_collection = db['video']
#1
"Foreign music sets the backdrop for discussions on Nigeria's crypto revolution and its challenges. Despite governmental opposition, crypto stands as a beacon of hope against police brutality and systemic corruption, sparking debates on fundamental policy and leadership issues."
video_document = {
    "video_length": "1.16",  # Example length in seconds
    "embedding": generate_embeddings_from_openai("Foreign investments and the potential for cryptocurrency to flourish in Nigeria are highlighted in this trailer. The speaker discusses Nigeria's role as a catalyst for the crypto revolution, emphasizing its potential to enhance the country's economic landscape. However, challenges such as government regulations and concerns about police brutality are also addressed, underscoring the complexity of Nigeria's economic and social dynamics. Despite these obstacles, the narrative conveys a sense of optimism about the transformative power of cryptocurrency in Nigeria's alternate economy."),  # Example embedding vector
    "video_title": "The Blockchain Life, Episode 6: The Alternate Economy in Nigeria - Trailer",
    "video_plot": "Embark on a riveting journey through Nigeria's burgeoning cryptocurrency scene, exploring its potential amid challenges. Join the discussion on how crypto could shape the nation's economic future"
}

# Insert the document into the collection
result = videos_collection.insert_one(video_document)

#2
"This is the biggest case we've ever seen in crypto. The SEC suing Ripple hit XRP holders like a train. XRP was supposed to be my retirement. See, holders should be concerned, someone's got to stand up. I think I'm going to sue the SEC. Episode 4: The Ripple vs. SEC Saga - Trailer | myco "
video_document = {
    "video_length": "0.32",
    "embedding": generate_embeddings_from_openai("This is the biggest case we've ever seen in crypto. The SEC suing Ripple hit XRP holders like a train. XRP was supposed to be my retirement. See, holders should be concerned, someone's got to stand up. I think I'm going to sue the SEC. Episode 4: The Ripple vs. SEC Saga - Trailer | myco "),
    "video_title": "Episode 4: The Ripple vs. SEC Saga - Trailer | myco",
    "video_plot": "Experience the seismic impact of the SEC's lawsuit against Ripple, sending shockwaves through XRP holders like a speeding train. As uncertainty looms, witness the community grappling with the repercussions, realizing the urgency to take a stand. Join us as we delve into this monumental crypto saga, where the fate of XRP hangs in the balance."
}

videos_collection.insert_one(video_document)

#3
"some say football is a drug an addiction others say it's just a game a bit of banter some people even say it's a matter of life and death but we can assure you it's much more serious than that this is INS football is an identity for the fans it's loyalty for the nostalgic it's about to return to a time we're telling stories that go beyond the fact drawing us closer to the idea of an experience taking us into unattainable places opening up different perspectives showing us how football feels and connecting us to the world like nothing else get ready for the Creator commissions showcase featuring the most unique stories brought to you by the Copa fan Timeless documentary celebrating the ground breakers who are reclaiming the game here is the real football with passion and love and it's back Darby days spanning the matches that define the generation this is copa90 storiesCOPA90 | Trailer"

video_document = {
    "video_length": "1.34",
    "embedding": generate_embeddings_from_openai("some say football is a drug an addiction others say it's just a game a bit of banter some people even say it's a matter of life and death but we can assure you it's much more serious than that this is INS football is an identity for the fans it's loyalty for the nostalgic it's about to return to a time we're telling stories that go beyond the fact drawing us closer to the idea of an experience taking us into unattainable places opening up different perspectives showing us how football feels and connecting us to the world like nothing else get ready for the Creator commissions showcase featuring the most unique stories brought to you by the Copa fan Timeless documentary celebrating the ground breakers who are reclaiming the game here is the real football with passion and love and it's back Darby days spanning the matches that define the generation this is copa90 storiesCOPA90 | Trailer"),
    "video_title": "COPA90 | Trailer",
    "video_plot": "Football is more than a game; it's a way of life. Dive into its deep impact on fans, the nostalgia, and the defining matches that shape generations. Experience unique stories, passion, and love for the sport. Welcome to COPA90 Stories."
}

videos_collection.insert_one(video_document)

#4
"get ready for an electrifying Clash of the Titans at Al NASA Stadium Dubai on November 18th witness Legends like Kaka Roberto Carlos Berbatov Robert Perez and many more as the Red Devils Take On The World 11 get ready to be part of football history as these legendary players take to the field for an epic battle experience the thrill the skill and the magic of the game played by the true Legends of the game watch it earn it Own It repeat it"
video_document = {
    "video_length": "0.36",
    "embedding": generate_embeddings_from_openai("get ready for an electrifying Clash of the Titans at Al NASA Stadium Dubai on November 18th witness Legends like Kaka Roberto Carlos Berbatov Robert Perez and many more as the Red Devils Take On The World 11 get ready to be part of football history as these legendary players take to the field for an epic battle experience the thrill the skill and the magic of the game played by the true Legends of the game watch it earn it Own It repeat it in Imtiaz Legends League"),
    "video_title": "Imtiaz Legends League",
    "video_plot": "Experience an epic football clash at Al Nasr Stadium, Dubai, on November 18th! Watch legends like Kaka, Roberto Carlos, and Berbatov in an unforgettable battle. Witness the thrill and magic of the game with these iconic players. Don't miss out—watch it, own it, and repeat it!"
}
videos_collection.insert_one(video_document)

#5
"Four-time Asian champion, British junior champion, US champion, and recently a 37-year world champion, he is proud of what he's done. As a corporate contribution, media has to show the matches to get the viewership. Viewership brings sponsorship money, which funds the sport. It's just economic sense. Pakistan's hopes are on you."

video_document = {
    "video_length": "1.16",
    "embedding": generate_embeddings_from_openai("Four-time Asian champion, British junior champion, US champion, and recently a 37-year world champion, he is proud of what he's done. As a corporate contribution, media has to show the matches to get the viewership. Viewership brings sponsorship money, which funds the sport. It's just economic sense. Pakistan's hopes are on you in Hamza Khan | Sponsorship signing ceremony."),
    "video_title": "Hamza Khan | Sponsorship signing ceremony",
    "video_plot": "Don't miss Hamza Khan's sponsorship signing ceremony! Follow his incredible journey from four-time Asian champion to recent world champion. Discover how media exposure and sponsorship are reshaping sports in Pakistan. Join us for an inspiring story of dedication and the future of sports funding."
}
videos_collection.insert_one(video_document)

#6
"Have you ever tried to fast for a day to just see what it's like even though you're not Muslim I made a conscious effort to make sure that I was fasting and I thought this is my first time let's give it a go and try and I didn't do too badly I did okay I tried did you tried not not succeeded how do you maintain a positive mindset and avoid negative thoughts maybe about you know keeping calm focusing on your tasks wake up early to play after your exercise focus on your to-do list and yeah okay your favorite people is going on my favorite people to annoy during Ramadan are actually my cats because everyone in Ramadan is usually very cranky in my house so I'm always with my cats and I'm annoying them and they just want me to leave favorite place for iftar um I actually like going to like ramen places for Explorer because like you have like the filling food it has you know protein in it but at the same time there's like soup so it's kind of like a balanced meal and I don't feel like super sick afterwards favorite activity well um I don't work out before I break the fast drinking a lot of water and trying not to stuff myself too much."
video_document = {
    "video_length": "1.29",
    "embedding": generate_embeddings_from_openai("Have you ever tried to fast for a day to just see what it's like even though you're not Muslim I made a conscious effort to make sure that I was fasting and I thought this is my first time let's give it a go and try and I didn't do too badly I did okay I tried did you tried not not succeeded how do you maintain a positive mindset and avoid negative thoughts maybe about you know keeping calm focusing on your tasks wake up early to play after your exercise focus on your to-do list and yeah okay your favorite people is going on my favorite people to annoy during Ramadan are actually my cats because everyone in Ramadan is usually very cranky in my house so I'm always with my cats and I'm annoying them and they just want me to leave favorite place for iftar um I actually like going to like ramen places for Explorer because like you have like the filling food it has you know protein in it but at the same time there's like soup so it's kind of like a balanced meal and I don't feel like super sick afterwards favorite activity well um I don't work out before I break the fast drinking a lot of water and trying not to stuff myself too much Watch It. Earn It. Ramadan It! - Episode 11."),
    "video_title": "Watch It. Earn It. Ramadan It! - Episode 11",
    "video_plot": "Experience a unique perspective on fasting and Ramadan rituals, accompanied by insights and humorous anecdotes. Join in for a delightful exploration of favorite foods and activities during this holy month."
}
videos_collection.insert_one(video_document)

#7
"I'm going to introduce you to the magic of the ocean open your eyes huh I love it here he truly believed that Coral could be the cure for so many illnesses I can already see how this will disrupt the entire business model what the is going on I have to get to the samples going on your own it's just not right the way he vanished no better man we're shutting down with Rory missing the lab is basically Sovereign all the staff have been fired and everything have been sold off the IP is basically worthless you sitting there day and night you look like you haven't slept or eating for a week you know Rory couldn't get into his computer the day he disappeared these numbers show that we'll getting some positive results Vanessa said they were failing bod's resurface months after they've gone missing War wouldn't just disappear like that why I know it's you I Want to Say Goodbye I've been dealing with these leaks what would an ocean be without a monster lurking in the dark."
video_document = {
    "video_length": "1.36",
    "embedding": generate_embeddings_from_openai("I'm going to introduce you to the magic of the ocean open your eyes huh I love it here he truly believed that Coral could be the cure for so many illnesses I can already see how this will disrupt the entire business model what the is going on I have to get to the samples going on your own it's just not right the way he vanished no better man we're shutting down with Rory missing the lab is basically Sovereign all the staff have been fired and everything have been sold off the IP is basically worthless you sitting there day and night you look like you haven't slept or eating for a week you know Rory couldn't get into his computer the day he disappeared these numbers show that we'll getting some positive results Vanessa said they were failing bod's resurface months after they've gone missing War wouldn't just disappear like that why I know it's you I Want to Say Goodbye I've been dealing with these leaks what would an ocean be without a monster lurking in the dark in Ocean Deep | Trailer - streaming now on myco."),
    "video_title": "Ocean Deep | Trailer - streaming now on myco",
    "video_plot": "Embark on a journey into the ocean's mystique, uncovering its secrets and solving the mysterious disappearance. Experience the thrill of discovery and unraveling the truth in this captivating tale of intrigue."
}
videos_collection.insert_one(video_document)

#8
"yeah I did see the magazine article that called me the Godfather of Bitcoin here that's definitely not the case it's really important my hair's not good I'm pissed off that's why I went out are we good thank you if I knew the car was getting filmed I would I would have washed the car"
video_document = {
    "video_length": "1.39",
    "embedding": generate_embeddings_from_openai("yeah I did see the magazine article that called me the Godfather of Bitcoin here that's definitely not the case it's really important my hair's not good I'm pissed off that's why I went out are we good thank you if I knew the car was getting filmed I would I would have washed the car in Behind The Scenes - El Salvador vs. The World Bank | myco "),
    "video_title": "Behind The Scenes - El Salvador vs. The World Bank | myco",
    "video_plot": "Experience the candid moments of a crypto luminary as he navigates fame, frustration, and unexpected encounters, offering a glimpse into the real life behind the headlines."
}
videos_collection.insert_one(video_document)

#9
"Looking for Mercedes AMG GT Black Series, difficult to find one when there are only just a handful of these babies in the world. What if I tell you you can own a part of the car, drive it, and sell it for a profit by buying a limited one of 12 NFTs? Sounds pretty cool! M-Content is introducing the world's first car ownership NFT, the Project Black, which gives you the opportunity to own part of the world's most popular AMG right here. This one and you get another art masterpiece designed by a world-famous NFT artist drawn live at the world's first AMG store in Dubai. So you get two NFTs for the price of one, and it gets better than this - the car is yours to drive for a whole 30 days each year. And when this car is sold at a premium, you get your share in the proceeds. How cool is this idea? I love it! All right, so for more details, check out the link below for the white paper."
video_document = {
    "video_length": "1.24",
    "embedding": generate_embeddings_from_openai("the Supercar Blondie | Explaining the concept behind #ProjectBlackNFT video talks about Looking for Mercedes AMG GT Black Series, difficult to find one when there are only just a handful of these babies in the world. What if I tell you you can own a part of the car, drive it, and sell it for a profit by buying a limited one of 12 NFTs? Sounds pretty cool! M-Content is introducing the world's first car ownership NFT, the Project Black, which gives you the opportunity to own part of the world's most popular AMG right here. This one and you get another art masterpiece designed by a world-famous NFT artist drawn live at the world's first AMG store in Dubai. So you get two NFTs for the price of one, and it gets better than this - the car is yours to drive for a whole 30 days each year. And when this car is sold at a premium, you get your share in the proceeds. How cool is this idea? I love it! All right, so for more details, check out the link below for the white paper."),
    "video_title": "Supercar Blondie | Explaining the concept behind #ProjectBlackNFT",
    "video_plot": "Own a part of the exclusive Mercedes AMG GT Black Series with M-Content's innovative car ownership NFT, Project Black. Drive it, sell it, and profit, plus get an exclusive NFT artwork - it's car ownership redefined!"
}
videos_collection.insert_one(video_document)