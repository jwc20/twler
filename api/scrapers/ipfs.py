import ipfshttpclient


class IPFSClient:

    # Share TCP connections until the client session is closed
    def __init__(self):
        self._client = ipfshttpclient.connect("/dns4/ipfs0/tcp/5001")

    # def check_results(self):
    #     """
    #     Check to see if the result page changed before scraping.
    #     """
    #     pass

    def generate_cid_for_result(self, json_data):
        """
        Add to IPFS node and generate hash to use as ipfs CID.
        """
        hash = self._client.add_json(json_data)
        print(hash)
        # __import__('pdb').set_trace()
        return hash

    def close(self):  # Call this when your done
        self._client.close()


# data1 = {"Action": "Closed"}
# print(client)
# assert data == client.get_json(res)
# assert '{"Action":"Open","Name":"IPFS","Pubkey":7,"Type":"PR"}' == client.cat(
#     res
# ).decode("utf-8")
#
# print(client.get_json(res), client.cat(res).decode("utf-8"))


if __name__ == "__main__":
    client = IPFSClient()
    # client.upload_to_ipfs()
    client.generate_cid_for_result()
    client.close()
