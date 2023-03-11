
from api.iwf_api.iwf import (
    Iwf,
)  # Note, to run this script, you must be in the root directory.

# from pprint import pprint

# client = Iwf()

# for event in client.get_events():
#     print(event['name'])

# url = "https://iwf.sport/results/results-by-events/?event_id=486"
# result = client.get_results(url)
# pprint(result)


class PostgresDemoPipeline:

    def __init__(self): 
        hostname = 'db'
        username = 'postgres'
        password = '' # your password
        database = 'twler-database'

        ## Create/Connect to database
        self.connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)
        
        ## Create cursor, used to execute commands
        self.cur = self.connection.cursor()

        self.cur.execute("""
        CREATE TABLE IF NOT EXISTS quotes(
            id serial PRIMARY KEY, 
            name VARCHAR(255)
        )
        """)




    def process_item(self, item):
        # client = Iwf()
        
        # for event in client.get_events():
        #     print(event['name'])


        return item
