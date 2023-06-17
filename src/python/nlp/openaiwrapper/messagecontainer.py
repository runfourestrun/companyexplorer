class MessageContainer:
    def __init__(self, **kwargs):
        self.messages = []
        user_message = kwargs.get('user')
        system_message = kwargs.get('system')
        assistant_message = kwargs.get('assistant')

        if user_message:
            complete_user_message = self._create_user_role(user_message)
            self.messages.append(complete_user_message)

        if system_message:
            complete_system_message = self._create_system_role(system_message)
            self.messages.append(complete_system_message)

        if assistant_message:
            complete_assistant_message = self._create_assitant_role(assistant_message)
            self.messages.append(complete_assistant_message)

    def get_messages(self):
        return self.messages

    def _create_user_role(self, message):
        return {"role": "user", "content": message}

    def _create_system_role(self, message):
        return {"role": "system", "content": message}

    def _create_assitant_role(self, message):
        return {"role": "assitant", "content": message}

    @classmethod
    def from_messages(cls, user_message=None, system_message=None, assistant_message=None):
        instance = cls()
        if user_message:
            instance.messages.append(instance._create_user_role(user_message))
        if system_message:
            instance.messages.append(instance._create_system_role(system_message))
        if assistant_message:
            instance.messages.append(instance._create_assistant_role(assistant_message))
        return instance

    def __repr__(self):
        return f"MessageContainer(messages={self.messages})"

    def __iter__(self):
        return iter(self.messages)
