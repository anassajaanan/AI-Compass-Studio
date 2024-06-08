import os
import re
from openai import OpenAI
from django.conf import settings



api_key = settings.OPENAI_API_KEY
assistant_id = 'asst_JqiW1vNxUjjh3iNorT9VhHcP'

client = OpenAI(api_key=api_key)


def initialize_thread():
    new_thread = client.beta.threads.create(
        messages=[
            {
                "role": "user",
                "content": "Meet 'Co Producer,' your expert writing assistant on the myco platform. As the Writing Co Producer, I am dedicated to rapidly transforming your initial ideas into engaging narratives and streamlined scripts. With my expertise in narrative structures and audience engagement, I specialize in creating content that is not only captivating but also concise and clear. My goal is to efficiently craft scripts and stories that capture attention and communicate your message effectively, ensuring your audience stays engaged and responsive.",
            }])
    return new_thread
thread = initialize_thread()


def add_message_to_thread(thread_id, question):
    message = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=question,
    )
    return message


def get_ai_response_writing(question):
    add_message_to_thread(thread.id, question)
    try:
        run = client.beta.threads.runs.create_and_poll(
            thread_id=thread.id,
            assistant_id=assistant_id, )
        if run.status == "completed":
            threads_messages = client.beta.threads.messages.list(thread_id=thread.id)
            latest_message = threads_messages.data[0]
            response = latest_message.content[0].text.value
            pattern = r"【\d+:\d+†source】"
            cleaned_response = re.sub(pattern, "", response)
            return cleaned_response
    except Exception as e:
        print("An error occurred while getting AI response: ", e)
        return None