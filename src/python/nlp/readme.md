#### NLP

* The objective of this subproject is to extract relevant terms from unstructured text documents, merging those insights to the graph
* Uses the Neo4j driver to query the database to retrieve contextual information from the graph database to be used as prompts
* Uses OpenAI APIs to generate queries for the database (using Neo4j has the 'ground of truth')

#### example chat gpt response
```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Hello there! How may I assist you today?",
        "role": "assistant"
      }
    }
  ],
  "created": 1681134595,
  "id": "chatcmpl-73mC3tbOlMNHGci3gyy9nAxIP2vsU",
  "model": "gpt-3.5-turbo",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 10,
    "prompt_tokens": 11,
    "total_tokens": 21
  }

```