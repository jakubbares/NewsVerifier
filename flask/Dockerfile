# Python Alpine is a lightweighted version of Python
FROM python:3.7

# install mysqlclient
RUN apt-get update \
    && apt-get install --yes gcc python3-dev musl-dev \
    && apt-get install --yes  mariadb-client \
    && apt-get install --yes libpython-dev libyaml-dev

# Installing dependencies
COPY ./tagger/requirements.txt ./requirements.txt
RUN pip install -r /requirements.txt
RUN python -m spacy download en_core_web_lg

# Copying the source code to
RUN mkdir /app
WORKDIR /app
ADD . /app

RUN chmod 777 /app/logs

# Creating and logging a user
RUN adduser --disabled-login user
USER user

# Commands for Docker run
EXPOSE 8000
CMD ["gunicorn", "tagger.main:app", "-b", "0.0.0.0:8000"]
