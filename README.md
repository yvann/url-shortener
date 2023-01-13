# url-shortener

> Assuming **Docker** is installed and is running

## Run

Start the application with:

```
docker compose start
```

Then visit http://localhost:3500/api/shorturl/analytics

Shorten an URL with:

```
curl -X POST -d 'originalUrl=https://www.lunii.com' http://localhost:3500/api/shorturl/

# -> {"originalUrl":"https://www.lunii.com/","shortUrl":"5HjPOA"}
```

Then try the redirection at http://localhost:3500/api/shorturl/5HjPOA

Ensure the visit is counted at http://localhost:3500/api/shorturl/analytics

## Test

Run the tests with:

```
docker compose run --rm app yarn run test
```
