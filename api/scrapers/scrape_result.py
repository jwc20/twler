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

from ipfs import IPFSClient


class ResultScraper:
    """
    Here we are scraping the results from an event url.
        - Access events endpoint from database (e.g. "http://localhost:8000/api/events/1/") and take the event_url.
            {
                "id": 1,
                ...
                "event_url": "?event_id=562"
            }

        - (upload_to_ipfs.py) returns ipfs CID
            - Need checking to see if results page has changed.
        - Store/Update CID to event object.
            {
                "id": 1,
                ...
                "event_url": "?event_id=562"
                "CID": "Q..."
            }
    """

    def __init__(self) -> None:
        self.conn = conn.cursor()

    def fetch_result(self, url):
        """
        Fetch result for one event.
        => [{sn1: ..., ...}]

        TODO: Add conditional to check if page changed.
        """
        client = Iwf()
        result = client.get_results(url)
        return result

    def fetch_results(self):
        """
        Fetch results for events stored in the database.
        =>[ [{sn1: ..., ...}],  [{sn1: ..., ...}], ... ]

        TODO:
            - Need to have parameters, not sure if I want to grab from all events in database.
            - Access the event object.
        """

        output = []
        example_event_url_list = ["?event_id=544", "?event_id=562"]
        for result_url in example_event_url_list:
            result_scraped = self.fetch_result(result_url)
            output.append(result_scraped)

        pprint(len(output))
        # __import__("pdb").set_trace()
        # return output

    def get_result_cid(self, result_json):
        """
        Upload file to ipfs node.
        => cid
        """
        ipfs = IPFSClient()
        cid = ipfs.generate_cid_for_result(result_json)

        return cid

    # def add_result_files_to_ipfs(self):
    #     """Upload multiple files to ipfs node."""
    #     pass

    def store_cid_to_database(self):
        """Store or update CID in event object."""
        hash = self.get_result_cid(self.fetch_result(event["result_url"])),
        print(hash)

        event_info: Dict[str, str] = {
            "name": event["name"],
            "location": event["location"],
            "result_url": event["result_url"],
            "date": formatted_date,
            # "cid": self.get_result_cid(fetch_result(event["result_url"])),
        }
        pprint(event_info)

        obj, created = Event.objects.get_or_create(
            location=event_info["location"],
            event_url=event_info["result_url"],
            cid=event_info["cid"],
            defaults={"name": event_info["name"], "date": event_info["date"]},
        )

        if created:
            obj.save()

    def close_connection(self) -> None:
        self.conn.commit()
        self.conn.close()


if __name__ == "__main__":
    client = ResultScraper()

    example_url = "?event_id=544"

    # result = client.fetch_result(example_url)
    # client.add_result_file_to_ipfs(result)
    client.store_cid_to_database()





    # client.fetch_results()
    # client.fetch_all_events()
    # client.close_connection()
