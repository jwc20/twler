
# from api.iwf_api.iwf import (
#     Iwf,
# )  # Note, to run this script, you must be in the root directory.

# from pprint import pprint

# client = Iwf()

# for event in client.get_events():
#     print(event['name'])
#     print(event['result_url'])


# url = "https://iwf.sport/results/results-by-events/?event_id=486"
# result = client.get_results(url)
# pprint(result)




####################################


from iwf_api.iwf import (
    Iwf,
)  # Note, to run this script, you must be in the root directory.
import psycopg2

class PostgresDemoPipeline:

    def __init__(self): 
        hostname = 'db'
        username = 'postgres'
        password = '' # your password
        database = 'postgres'

        ## Create/Connect to database
        self.connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)
        
        ## Create cursor, used to execute commands
        self.cur = self.connection.cursor()

        self.cur.execute("""
        CREATE TABLE IF NOT EXISTS events(
            id serial PRIMARY KEY, 
            name VARCHAR(255),
            location VARCHAR(255),
            date VARCHAR(255),
            url VARCHAR(255)
        )
        """)




    def process_item(self):
        client = Iwf()

        events = []

        for event in client.get_events():
            # print(event['name'])
            events.append(event)
            
        
        for event in client.get_events():
            print(event['name'])
            self.cur.execute(""" insert into events (name, location, date, url) values (%s,%s,%s,%s)""", (
                event["name"],
                event["location"],
                event["date"],
                event["result_url"],
            ))

            events.append(event)
            
            self.connection.commit()

        return events


    def close_spider(self, spider):

        ## Close cursor & connection to database 
        self.cur.close()
        self.connection.close()

events1 = PostgresDemoPipeline().process_item()
print(events1)
