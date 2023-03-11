from iwf_api.iwf import (
    Iwf,
)  # Note, to run this script, you must be in the root directory.
import psycopg2
from pprint import pprint

import os
from django.core.wsgi import get_wsgi_application
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
application = get_wsgi_application()


from events.models import Event

# client = Iwf()

# for event in client.get_events():
#     print(event["name"])
#     print(event["result_url"])


# url = "https://iwf.sport/results/results-by-events/?event_id=486"
# result = client.get_results(url)
# pprint(result)


hostname = 'db'
username = 'postgres'
password = '' # your password
database = 'postgres'

## Create/Connect to database
connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)

## Create cursor, used to execute commands
cur = connection.cursor()


# Scrape the web and get data
client = Iwf()

# Use Django ORM to create instances of your model and populate them with scraped data
for event in client.get_events():
    object = Event(
        name = event['name'], 
        location = event['location'], 
        date = event['date'],
        event_url = event['result_url']
    )
    object.save()

# Commit changes and close the connection
conn.commit()
conn.close()






