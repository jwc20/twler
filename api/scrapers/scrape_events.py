import os
import sys
import psycopg2
from pprint import pprint
import datetime
from django.core.wsgi import get_wsgi_application
import time

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

from ipfs import IPFSClient


class EventScraper:
    def __init__(self) -> None:
        self.conn = conn.cursor()

    def fetch_single_event(self, event: Dict[str, str]) -> None:
        """
        Fetch result for a single event.
        """
        hash = self.get_result_cid(self.fetch_result(event["result_url"]))

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
            "cid": hash,
        }

        print(event_info["name"], event_info["result_url"])
        self.store_to_database(event_info)

    def fetch_new_bodyweight_events_by_year(self, client: Iwf, year: str) -> None:
        """
        Fetch result for new bodyweight events by year.
        """
        for event in client.get_events(year=year):
            self.fetch_single_event(event)

    def fetch_old_bodyweight_events_by_year(self, client: Iwf, year: str) -> None:
        """
        Fetch result for old bodyweight events by year.
        """
        for event in client.get_events(year=year, new_or_old="old"):
            self.fetch_single_event(event)

    def fetch_all_events(self) -> None:
        """
        Fetch results for all events for all years that are available.
        """
        _client = Iwf()
        year_list: List[str] = _client.get_years()
        i = 0

        while i < len(year_list):
            self.fetch_new_bodyweight_events_by_year(_client, year_list[i])
            print(year_list[i])
            if year_list[i] == "2018":
                break
            i += 1

        while i < len(year_list):
            print(year_list[i])
            self.fetch_old_bodyweight_events_by_year(_client, year_list[i])
            i += 1

    #################################################################################3

    def fetch_result(self, url):
        """
        Fetch result for one event.
        => [{sn1: ..., ...}]

        TODO: Add conditional to check if page changed.
        """
        _client = Iwf()
        result = _client.get_results(url)
        return result

    def get_result_cid(self, result_json):
        """
        Upload file to ipfs node.
        => cid
        """
        ipfs = IPFSClient()
        cid = ipfs.generate_cid_for_result(result_json)

        return cid

    def store_to_database(self, event_info):

        obj, created = Event.objects.get_or_create(
            location=event_info["location"],
            event_url=event_info["result_url"],
            cid=event_info["cid"],
            defaults={"name": event_info["name"], "date": event_info["date"]},
        )

        if created:
            obj.save()

    #################################################################################3

    def close_connection(self) -> None:
        self.conn.commit()
        self.conn.close()


if __name__ == "__main__":
    client = EventScraper()
    client.fetch_all_events()

    # Get single event
    # event = Iwf().get_events(year="2022")[0]
    # client.fetch_single_event(event)

    # example_url = "?event_id=544"
    # result = client.fetch_result(example_url)
    # client.get_result_cid(result)

    # client.close_connection()
