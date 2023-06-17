import os

import openai
import tiktoken
from typing import List, Dict
from .messagecontainer import MessageContainer


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
        self.tiktoken_encoding = self._set_tiktoken_encoding()
        self.encoding: Dict[str, int] = self._set_encoding()
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


    def chat(self, message:MessageContainer) -> str:
        '''

        :param message:
        :return:
        '''
        openai.api_key = self.api_key
        response = openai.ChatCompletion.create(
            model=self.model,
            messages=message
        )
        response = response['choices'][0]['message']['content']
        print(response)
        return response

    def _set_tiktoken_encoding(self) -> str:
        '''
        Map the model type to the corresponding encoding.

        :param model_type: The model type to map
        :return: corresponding encoding
        '''
        models = {
            "cl100k_base": "gpt-4, gpt-3.5-turbo, text-embedding-ada-002",
            "p50k_base": "Codex models, text-davinci-002, text-davinci-003",
            "r50k_base": "GPT-3 models like davinci"
        }

        for _model, encodings in models.items():
            if self.model in encodings:
                return _model
            else:
                return "unknown"

    def _set_encoding(self) -> Dict[str, int]:
        self.encoding = tiktoken.get_encoding(self.tiktoken_encoding)
