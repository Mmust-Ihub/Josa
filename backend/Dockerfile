FROM python:3.8-slim-buster

RUN mkdir /app

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

RUN apt update && apt install -y netcat

COPY requirements.txt ./

RUN pip install --no-cache --upgrade pip

RUN pip install -r requirements.txt

COPY ./entrypoint.sh /app
COPY . .

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
