# Access the "event_url" from the event objects.

import ipfshttpclient


# with ipfshttpclient.connect() as client:
#     print(client.id())
#     hash = client.add("test.txt")["Hash"]
#     print(client.stat(hash))

# client.close()


class ResultScraper:
    def __init__(self):
        # client = ipfshttpclient.connect()  # Connects to: /dns/localhost/tcp/5001/http
        client = ipfshttpclient.connect("/dns4/ipfs0/tcp/5001") 
        print(client.id())


        # # client = ipfshttpclient.connect(session=True)
        # res = client.add('test.txt')
        # res
        # self._client = ipfshttpclient.connect(session=True)

        # return res
        # pass

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


print(ResultScraper())
