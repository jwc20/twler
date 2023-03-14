# TODO

## In Progress

- Figure out how to use github repo [jwc20/py-ipfs-http-client](https://github.com/jwc20/py-ipfs-http-client) by updating DOCKERFILE and docker-compose.yml.

- Need to fetch data for results.

  - Need to fetch the links from the events model.

  - Might have to use data fetched from results to add/update athlete data.

- Store scraped results to ipfs.

  - Generate CID

- Refactor event_competitor to have different models for snatch, clean and jerk, and total.
  - snatch1, snatch2, snatch3, and snatch.
  - jerk1, jerk2, jerk3, and jerk.
  - total
  - rank_snatch, rank_jerk, rank_total.
  - medal_snatch, medal_jerk, medal_total.

---

###### Backlog

- Create advanced user registration (only require email and password).
- Create models for event, bookmarks, athlete, event_competitor.
  - Create relationships with the models.
- Create custom permissions for the views.

---

---

## Completed

- Create models for custom user accounts.
- Connect frontend with backend (corsheaders).
- Implement authentication and permissions in Django.

- Connect iwf-api with django.
  - Need to fix and adjust iwf-api to use with this project.
    - Need to update backend or iwf-api scraper to fetch **_all_** events data (this also applies to results).
