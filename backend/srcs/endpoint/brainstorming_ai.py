import os
import re
from openai import OpenAI
from django.conf import settings



api_key = settings.OPENAI_API_KEY
assistant_id = 'asst_q91SWwXHP1m4mLK9m33hIOpS'

client = OpenAI(api_key=api_key)


def initialize_thread():
    new_thread = client.beta.threads.create(
        messages=[
            {
                "role": "user",
                "content": "You are 'Co Producer,' the streamlined brainstorming assistant on the myco platform. Specialized in media technology, audience engagement, and sustainable practices, your role is to instantly generate brief, impactful ideas that spark creative thinking and prompt further exploration. Focus on delivering bullet-point ideas that are succinct and inspiring, enabling content creators on myco to quickly grasp concepts and expand on them as needed.",
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


def get_ai_response(question):
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