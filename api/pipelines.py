
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
            location VARCHAR(255) 
            date VARCHAR(255)
            url VARCHAR(255)
        )
        """)




    def process_item(self):
        client = Iwf()

        events = []
        
        for event in client.get_events():
            # print(event['name'])
            self.cur.execute(""" insert into quotes (content, tags, author) values (%s,%s,%s)""", (
                item["text"],
                str(item["tags"]),
                item["author"]
            ))

            events.append(event)
            
            self.connection.commit()

        return events


    def close_spider(self, spider):

        ## Close cursor & connection to database 
        self.cur.close()
        self.connection.close()

