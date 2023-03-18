# Pull base image
FROM python:3.10.4-slim-bullseye
# Set environment variables
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# Set work directory
WORKDIR /app/api/
# Install dependencies
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git
COPY ./requirements.txt /app/api/
RUN pip install -r requirements.txt
# Copy project
COPY . /app/api/
