from openaiwrapper import OpenaiWrapper,MessageContainer


if __name__ == '__main__':
    openai = OpenaiWrapper(model='gpt-3.5-turbo')
    example_content = '''Hello OpenAPI! start a conversation for my colleagues at neo4j'''
    example_message = MessageContainer.from_messages(user_message=example_content).get_messages()
    openai.chat(example_message)





