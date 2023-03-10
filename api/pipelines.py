from api.iwf_api.iwf import (
    Iwf,
)  # Note, to run this script, you must be in the root directory.

from pprint import pprint


client = Iwf()

# for event in client.get_events():
#     print(event['name'])


url = "https://iwf.sport/results/results-by-events/?event_id=486"
result = client.get_results(url)
pprint(result)
