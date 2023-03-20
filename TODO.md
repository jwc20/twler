# TODO

## In Progress

- Put ipfs.py in api directory. 
    - Rename the file. 

- Delete django apps that is not being used.
- Fix the bookmarks migration error.
- Combine scrape_events.py and scrape_result.py.

- Create test for scraper and ipfs files.

---

###### Backlog

- Use data fetched from results to add/update athlete data.
- Create advanced user registration (only require email and password).
- Create models for event, bookmarks, athlete, event_competitor.
  - Create relationships with the models.
- Create custom permissions for the views.

- Refactor event_competitor to have different models for snatch, clean and jerk, and total.
  - snatch1, snatch2, snatch3, and snatch.
  - jerk1, jerk2, jerk3, and jerk.
  - total
  - rank_snatch, rank_jerk, rank_total.
  - medal_snatch, medal_jerk, medal_total.

---

---

## Completed

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
