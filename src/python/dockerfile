FROM python:3.9
MAINTAINER AlexanderFournier

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./neo4jclient /usr/src/app
COPY main.py /usr/src/app

ENV PYTHONPATH=/usr/src/app/pyarrow:$PYTHONPATH


CMD ["python","./client/main.py"]