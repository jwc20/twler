import os
import sys
import psycopg2
from pprint import pprint
import datetime
from django.core.wsgi import get_wsgi_application

###########################################################
# TODO: Create separate file to call these.
sys.path.append(os.path.abspath("/app/api"))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
application = get_wsgi_application()

hostname = "db"
username = "postgres"
password = ""
database = "postgres"

## Create/Connect to database
conn = psycopg2.connect(
    host=hostname, user=username, password=password, dbname=database
)
###########################################################

from iwf_api.iwf import Iwf
from events.models import Event

# TODO: use OOP (class EventScraper:)

## Create cursor, used to execute commands
cur = conn.cursor()

# Scrape the web and get data
client = Iwf()


# TODO: make functions for fetching individual events, fetch events by year, and fetching all events.
# Use typing when fetching individual events to check. (Need to create typing for event object).

# Use Django ORM to create instances of your model and populate them with scraped data
for event in client.get_events():

    # Must convert scraped event date.
    date_tuple = event["date"]
    date_obj = datetime.datetime.strptime(date_tuple, "%b %d, %Y")
    formatted_date = date_obj.strftime("%Y-%m-%d")

    obj, created = Event.objects.get_or_create(
        name=event["name"],
        location=event["location"],
        event_url=event["result_url"],
        defaults={"name": event["name"], "date": formatted_date},
    )
    if created:
        obj.save()

# Commit changes and close the conn
conn.commit()
conn.close()
