# twler

https://user-images.githubusercontent.com/99288419/229197079-2449edb6-063f-4296-9295-3a688ae11632.mp4

## Installation

First, clone the repo. 
```
git clone --recurse-submodules git@github.com:jwc20/twler.git
cd twler
```

Navigate to the iwf_api scraper repo and checkout the twler-integration branch. 
```
cd api/iwf_api 
git checkout twler-integration 
cd ../.. 
```

In root directory, run the following command to start both React web client and Django api.

```
docker-compose up -d --build
```

### To create Django superuser, run the following:

```
docker-compose exec api python3 manage.py migrate
docker-compose exec api python3 manage.py createsuperuser
```

- Visit [Django admin page](http://localhost:8000/admin) and login to superuser.

- To scrape all the data from IWF website and store them to ipfs, run the following command.

```
docker-compose exec api python3 scrapers/scrape_events.py
```

- Check [port 3000](http://localhost:3000/) and [port 8000](http://localhost:8000/) to see if they are working.

- Run `docker-compose down` to stop the docker containers.

## Requirements

### Frontend

- React
- Tailwindcss

### Backend

- Django

### Scraper

- request
- beautifulsoup4
- lxml

### IPFS Storage

- ipfshttpclient

(Go to ipfshttpclient library > client > **init**.py and modify VERSION_MAXIMUM to current version or use [this repo](https://github.com/jwc20/py-ipfs-http-client))
