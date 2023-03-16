import ipfshttpclient

# Share TCP connections using a context manager
# with ipfshttpclient.connect("/dns4/ipfs0/tcp/5001") as client:
#     hash = client.add('test.txt')['Hash']
#     print(hash)

# Share TCP connections until the client session is closed
class SomeObject:
    def __init__(self):
        self._client = ipfshttpclient.connect("/dns4/ipfs0/tcp/5001")


    def do_something(self):
        hash = self._client.add('test.txt')['Hash']

    def close(self):  # Call this when your done
	    self._client.close()



# client = SomeObject() 
client = ipfshttpclient.connect("/dns4/ipfs0/tcp/5001")
# data = [1,2]
# client.add_json(data)

data = {"Action": "Open", "Type": "PR", "Name": "IPFS", "Pubkey": 7}
res = client.add_json(data)

print(client)
assert data == client.get_json(res)
assert '{"Action":"Open","Name":"IPFS","Pubkey":7,"Type":"PR"}' == client.cat(res).decode("utf-8")

print(client.get_json(res), client.cat(res).decode("utf-8"))
	
# print(client.get_json("Qmf8oj9wbfu73prNAA1cRQVDqA52gD5B3ApnYQQjcjffH4"))

# client.do_something() 

client.close()
