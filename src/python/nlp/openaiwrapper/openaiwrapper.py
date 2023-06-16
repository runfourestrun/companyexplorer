import os

import openai
import tiktoken
from typing import List, Dict




class OpenaiWrapper:
    '''
    Wrapper class for interacting with OpenAI
    '''

    def __init__(self, model: str = "gpt-3.5-turbo", temperature: float = 1):
        '''
        :param model:
        :param temperature:
        '''
        self.api_key: str = os.getenv("OPEN_AI_API_KEY")
        self.model: str = model
        self.temperature: float = temperature
        self.encoding = tiktoken.get_encoding(self.model)
        self.messages: List[Dict[str, str]] = []

    def add_system_message(self, content: str) -> None:
        message = {"role": "system", "content": content}
        self.messages.append(message)

    def add_user_message(self, content: str) -> None:
        message = {"role": "user", "content": content}
        self.messages.append(message)

    def add_assistant_message(self, content: str) -> None:
        message = {"role": "assistant", "content": content}
        self.messages.append(message)

    def count_tokens(self) -> int:
        conversation = [message['content'] for message in self.messages]
        encoded_conversation = [self.encoding.encode(message) for message in conversation]
        encoding_lengths = [len(message) for message in encoded_conversation]
        return sum(encoding_lengths)


    def create_response(self,message):
        response =  openai.Completion.create(
            model = self.model,
            prompt=message
        )
        return response

