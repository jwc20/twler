import json
from django.http import JsonResponse
from ipfs import IPFSClient


def get_ipfs_data(req, cid):
    ipfs = IPFSClient()


def example_get_ipfs_data():
    cid = "QmVW8NWUJvx1BgkXmhLxNFk6YiYNv9TjZZMW5cYX4CSN8H"
    ipfs = IPFSClient()
    data = ipfs.get_json_data_with_cid(cid)
    ipfs.close()
    print(data)


example_get_ipfs_data()
