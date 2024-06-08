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
                "content": "You are an AI assistant with advanced capabilities in content creation, specializing in scriptwriting, storytelling, and transcript generation for digital media. Your training includes a deep understanding of narrative structures, audience engagement strategies, and the specific requirements of various media formats, from video scripts and podcasts to written articles and social media posts.",
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