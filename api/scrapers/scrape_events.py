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

# TODO: Use typing


class EventScraper:
    def __init__(self):
        cur = conn.cursor()

    def fetch_event(self, event):
        """
        Fetch result for a single event.
        Use typing when fetching individual events to check. (Need to create typing for event object).
        """
        date_tuple = event["date"]
        date_obj = datetime.datetime.strptime(date_tuple, "%b %d, %Y")
        formatted_date = date_obj.strftime("%Y-%m-%d")

        pprint({event["name"], event["location"], event["result_url"], formatted_date})

        obj, created = Event.objects.get_or_create(
            location=event["location"],
            event_url=event["result_url"],
            defaults={"name": event["name"], "date": formatted_date},
        )

        if created:
            obj.save()
        pass

    def fetch_new_bodyweight_events_by_year(self, client, year):
        """
        Fetch result for new bodyweight events by year.
        """
        for event in client.get_events(year=year):
            self.fetch_event(event)

    def fetch_old_bodyweight_events_by_year(self, client, year):
        for event in client.get_events(year=year, new_or_old="old"):
            self.fetch_event(event)
        pass

    def fetch_all_events(self):
        """
        Fetch results for all events for all years that are available.
        """
        client = Iwf()
        year_list = client.get_years()

        i = 0

        while i < len(year_list):
            self.fetch_new_bodyweight_events_by_year(client, year_list[i])
            if year_list[i] == "2018":
                break
            i += 1

        while i < len(year_list):
            self.fetch_old_bodyweight_events_by_year(client, year_list[i])
            i += 1

    def close_connection(self):
        conn.commit()
        conn.close()


# client.fetch_events_by_year()
EventScraper().fetch_all_events()
EventScraper().close_connection()
