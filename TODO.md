# TODO

## In Progress

#### High Priority

- Create a component to organize table.

  - Create dropdown menu for tables.
  - Add sorting, filtering, and etc.

- Create a better frontend

  - Add tables.
  - Add charts.
  - Create loading indicator to ResultTable.js.

- Create tests for scraper and ipfs files.

- Put ipfs.py in api directory.
  - Rename the file.

---

###### Backlog

- Figure out divide-and-conquer method for scheduling scraper.

- Create a scheduler on netlify.
- Delete django apps that is not being used.
- Fix the bookmarks migration error.

---

---

## Completed

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
