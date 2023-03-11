import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
application = get_wsgi_application()

from iwf_api.iwf import Iwf
import psycopg2
from pprint import pprint
import datetime

from events.models import Event

hostname = "db"
username = "postgres"
password = ""
database = "postgres"

## Create/Connect to database
connection = psycopg2.connect(
    host=hostname, user=username, password=password, dbname=database
)

## Create cursor, used to execute commands
cur = connection.cursor()

# Scrape the web and get data
client = Iwf()

# Use Django ORM to create instances of your model and populate them with scraped data
for event in client.get_events():

    # Must convert scraped event date.
    date_tuple = event["date"]
    date_obj = datetime.datetime.strptime(date_tuple, "%b %d, %Y")
    formatted_date = date_obj.strftime("%Y-%m-%d")

    object = Event(
        name=event["name"],
        location=event["location"],
        date=formatted_date,
        event_url=event["result_url"],
    )
    object.save()

# Commit changes and close the connection
connection.commit()
connection.close()
