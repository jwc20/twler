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

from typing import Dict, List, Tuple
import datetime

from iwf_api.iwf import Iwf
from events.models import Event


class EventScraper:
    def __init__(self) -> None:
        self.conn = conn.cursor()

    def fetch_event(self, event: Dict[str, str]) -> None:
        """
        Fetch result for a single event.

        TODO: Apply DRY principle.
        """
        date_tuple: Tuple[str, str] = event["date"]
        date_obj: datetime.datetime = datetime.datetime.strptime(
            date_tuple, "%b %d, %Y"
        )
        formatted_date: str = date_obj.strftime("%Y-%m-%d")

        event_info: Dict[str, str] = {
            "name": event["name"],
            "location": event["location"],
            "result_url": event["result_url"],
            "date": formatted_date,
        }
        pprint(event_info)

        obj, created = Event.objects.get_or_create(
            location=event_info["location"],
            event_url=event_info["result_url"],
            defaults={"name": event_info["name"], "date": event_info["date"]},
        )

        if created:
            obj.save()

    def fetch_new_bodyweight_events_by_year(self, client: Iwf, year: str) -> None:
        """
        Fetch result for new bodyweight events by year.
        """
        for event in client.get_events(year=year):
            self.fetch_event(event)

    def fetch_old_bodyweight_events_by_year(self, client: Iwf, year: str) -> None:
        """
        Fetch result for old bodyweight events by year.
        """
        for event in client.get_events(year=year, new_or_old="old"):
            self.fetch_event(event)

    def fetch_all_events(self) -> None:
        """
        Fetch results for all events for all years that are available.
        """
        client = Iwf()
        year_list: List[str] = client.get_years()

        for year in year_list:
            self.fetch_new_bodyweight_events_by_year(client, year)
            if year == "2018":
                break

        for year in year_list:
            if year > "2018":
                self.fetch_old_bodyweight_events_by_year(client, year)

    def close_connection(self) -> None:
        self.conn.commit()
        self.conn.close()


if __name__ == "__main__":
    scraper = EventScraper()
    scraper.fetch_all_events()
    scraper.close_connection()
