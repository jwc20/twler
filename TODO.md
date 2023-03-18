# TODO

## In Progress

- In iwf-api, add more time loading the results page.

```
ARTEMOVA Yulia 118 ['Rank:', '14']
GOPPOLD Anett 113 ['Rank:', '15']
PERDUE Natasha 109 ['Rank:', '16']
BERTRAM Sarah 107 ['Rank:', '17']
DOMINGUEZ DE LA ROSA Yesenia 105 ['Rank:', '18']
BERNTSSON Annika 103 ['Rank:', '19']
TANI Ayano --- ['Rank:', '---']
ALONSO Raquel 111 ['Rank:']
Traceback (most recent call last):
  File "/app/api/scrapers/scrape_events.py", line 158, in <module>
    client.fetch_all_events()
  File "/app/api/scrapers/scrape_events.py", line 93, in fetch_all_events
    self.fetch_old_bodyweight_events_by_year(_client, year_list[i])
  File "/app/api/scrapers/scrape_events.py", line 75, in fetch_old_bodyweight_events_by_year
    self.fetch_single_event(event)
  File "/app/api/scrapers/scrape_events.py", line 42, in fetch_single_event
    hash = self.get_result_cid(self.fetch_result(event["result_url"]))
  File "/app/api/scrapers/scrape_events.py", line 106, in fetch_result
    result = _client.get_results(url)
  File "/app/api/iwf_api/iwf/result.py", line 158, in get_results
    success, data = self._scrape_result_info(page_data)
  File "/app/api/iwf_api/iwf/result.py", line 106, in _scrape_result_info
    rank_cj = card.find_all("p")[0].text.strip().split()[1]
IndexError: list index out of range
```

the above error might be caused by lack of loading time for results page.

- In scrape_events.py, separate the function for fetch_all_events() with old and new bodyweight.

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
