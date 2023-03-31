# twler



https://user-images.githubusercontent.com/99288419/229197079-2449edb6-063f-4296-9295-3a688ae11632.mp4


## Installation

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

- Check [port 3000](http://localhost:3000/) and [port 8000](http://localhost:8000/) to see if they are working.

- Run `docker-compose down` to stop the docker containers.

## Requirements

### Frontend

- React

### Backend

- Django

### Scraper

- request
- beautifulsoup4
- lxml

### IPFS Storage

(Go to ipfshttpclient library > client > **init**.py and modify VERSION_MAXIMUM to current version.)

- ipfshttpclient
