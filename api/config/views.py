from django.shortcuts import render

from rest_framework import generics

import json
from django.http import JsonResponse
from ipfs import IPFSClient

def get_ipfs_data(req, cid):
    ipfs = IPFSClient()
    data = ipfs.get_json_data_with_cid(cid)
    return JsonResponse(data, safe=False)

# def example_get_ipfs_data(request):
#     cid = "QmVW8NWUJvx1BgkXmhLxNFk6YiYNv9TjZZMW5cYX4CSN8H"
#     print(cid)
#     ipfs = IPFSClient()
#     data = ipfs.get_json_data_with_cid(cid)
#     print(type(data))
#     print("IPFS data loaded")
#     return JsonResponse(data, safe=False)
#     # return JsonResponse({"data": data})
