
from api.iwf_api.iwf import Iwf
# import api.iwf_api.iwf


client = Iwf()

# for event in client.get_events():
#     print(event['name'])



url = "https://iwf.sport/results/results-by-events/?event_id=486"
result = client.get_results(url)
print(result)
