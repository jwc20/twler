import ipfshttpclient


class IPFSClient:
    def __init__(self):
        self._client = ipfshttpclient.connect("/dns4/ipfs0/tcp/5001")

    def generate_cid_for_result(self, json_data):
        """
        Add to IPFS node and generate hash to use as ipfs CID.
        """
        hash = self._client.add_json(json_data)
        return hash
    
    def get_json_data_with_cid(self, cid): 
        data = self._client.get_json(cid)
        return data

    def close(self):
        self._client.close()


if __name__ == "__main__":
    client = IPFSClient()
    # client.upload_to_ipfs()
    # client.generate_cid_for_result()
    # client.close()
