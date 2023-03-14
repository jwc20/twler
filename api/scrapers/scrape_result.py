
# Access the "event_url" from the event objects.

import ipfshttpclient

class ResultScraper:
    def __init__(self):
        client = ipfshttpclient.connect()  # Connects to: /dns/localhost/tcp/5001/http
        res = client.add('test.txt')
        res
        pass

    def generate_url(self): 
        """
        Call to iwf-api to generate urls.
        """
        pass
    
    def fetch_result(self):
        """
        Fetch result for one event.
        """
        pass

    def fetch_results(self):
        """
        Fetch results for events stored in the database.
        """
        pass

    def generate_ipfs_cid_to_event(self):
        """
        Generate hash to use as ipfs CID.
        """
        pass

    def add_cid_to_event(self):
        """
        Add cid to one event.
        """
        pass

    def close(self):
        pass
