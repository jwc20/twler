# TODO

## In Progress

#### High Priority

- (Backend) If the result object contains ranks that is only "---" or "DSQ", update the data accordingly.
- (Backend) Separate last and first name.
- (Backend) In event info table, update url to give full url.
  - new vs old weight category urls.

---

###### Backlog

- Add more columns options (age, sinclair coefficient, robi points. and etc. )
- Add charts.

- Create button to export result as csv file.
- Create tests for scraper and ipfs files.
- Put ipfs.py in api directory.
  - Rename the file.
- Figure out divide-and-conquer method for scheduling scraper.
- Create a scheduler on netlify.
- Delete django apps that is not being used.
- Fix the bookmarks migration error.

---

---

## Completed

- Create a component to organize table.

  - Create dropdown menu for tables.
  - Add sorting, filtering, and etc.
    - (Bug) In 2022 IWF World Championships 55kg Men category (and other category), the data with "---" stays in position when sorting.
      - (This might be fixable by changing the backend.)

- Create tables for EventsPage.
- Create a better frontend
  - Add tables.
  - Create loading indicator to ResultTable.js.
- Combine scrape_events.py and scrape_result.py.
- Fetch results data from events using the event object links.
- Need to figure out how to add json data from db.
  - Maybe use the serializer endpoint.
- Store scraped results to ipfs.
  - Generate CID
- Figure out how to use github repo [jwc20/py-ipfs-http-client](https://github.com/jwc20/py-ipfs-http-client) by updating DOCKERFILE and docker-compose.yml.
- Connect iwf-api with django.
  - Need to fix and adjust iwf-api to use with this project.
    - Need to update backend or iwf-api scraper to fetch **_all_** events data (this also applies to results).
- Implement authentication and permissions in Django.
- Connect frontend with backend (corsheaders).
- Create models for custom user accounts.
