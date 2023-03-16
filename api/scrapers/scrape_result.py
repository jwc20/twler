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

    # TODO: Access the "event_url" from the event objects.

    def __init__(self) -> None:
        self.conn = conn.cursor()

    def find_url(self):
        """
        Call to iwf-api to generate urls.
        """
        example_url = "?event_id=544"
        pass

    def fetch_result(self):
        """
        Fetch result for one event.
        """
        example_url = "?event_id=544"

        client = Iwf()
        # __import__("pdb").set_trace()
        result = client.get_results(example_url) 
        pprint(result)

    def fetch_results(self):
        """
        Fetch results for events stored in the database.
        """
        pass

    def store_cid_to_database(self, event_id):
        """Store or update CID in event object."""
        pass

    def close_connection(self) -> None:
        self.conn.commit()
        self.conn.close()



if __name__ == "__main__":
    scraper = ResultScraper()
    scraper.fetch_result()
    # scraper.fetch_all_events()
    # scraper.close_connection()
