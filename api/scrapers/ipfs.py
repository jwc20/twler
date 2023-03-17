import ipfshttpclient

# Share TCP connections using a context manager
# with ipfshttpclient.connect("/dns4/ipfs0/tcp/5001") as client:
#     hash = client.add('test.txt')['Hash']
#     print(hash)

# Share TCP connections until the client session is closed
class IPFSClient:
    def __init__(self):
        self._client = ipfshttpclient.connect("/dns4/ipfs0/tcp/5001")

    def check_results(self):
        """
        Check to see if the result page changed before scraping.
        """
        pass

    def upload_to_ipfs(self, json_data):
        # Need to figure out how to add json data from db.
        # Maybe use the serializer endpoint.

        # hash = self._client.add("test.txt")["Hash"]
        print("Hello from ipfs client")
        print(json_data)
        __import__('pdb').set_trace()

    def generate_cid_for_result(self):
        """
        Generate hash to use as ipfs CID.
        """
        pass

    def close(self):  # Call this when your done
        self._client.close()


# client = SomeObject()
# client = ipfshttpclient.connect("/dns4/ipfs0/tcp/5001")
# data = [1,2]
# client.add_json(data)

# data = {"Action": "Open", "Type": "PR", "Name": "IPFS", "Pubkey": 7}
# res = client.add_json(data)
#
# data1 = {"Action": "Closed"}
# print(client)
# assert data == client.get_json(res)
# assert '{"Action":"Open","Name":"IPFS","Pubkey":7,"Type":"PR"}' == client.cat(
#     res
# ).decode("utf-8")
#
# print(client.get_json(res), client.cat(res).decode("utf-8"))

# client.do_something()

if __name__ == "__main__":
    client = IPFSClient()
    client.upload_to_ipfs() 
    client.close()
