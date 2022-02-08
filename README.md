# Test Excel Processing (Test project)

Default user:
 * username: `user`
 * password: `passwd`

## Docker

```bash
$ docker-compose build
$ docker-compose up
```

UI URL: http://localhost:8000

API URL: http://localhost:8000/api (or http://localhost:8001/api)

API Docs: http://localhost:8000/docs

### Authentication

Requests:

```bash
$ curl -X POST -H 'Content-Type: application/json' -d '{"username":"user","password":"passwd"}' http://localhost:8000/api/auth
```

Response (example):

```json
{
  "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6InVzZXIiLCJleHAiOjE2NDQzMjI2MzN9.JeWp_vRcWINk3hhUmaAxbAJzkjbW-mIvUxFS9BKk_40",
  "token_type":"Bearer"
}
```

### API Requests (example)

```bash
$ curl -H 'Content-Type: application/json' -H 'Authorization: <token_type> <access_token>' http://localhost:8000/api/processing
```

Example:

```bash
$ curl -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6InVzZXIiLCJleHAiOjE2NDQzMjI2MzN9.JeWp_vRcWINk3hhUmaAxbAJzkjbW-mIvUxFS9BKk_40' http://localhost:8000/api/processing
```

## Environment

```
Ubuntu 20.04
Python 3.8.10
Poetry 1.1.12
Nvm 0.39.1
Node.js v16.13.2
Yarn 1.22.17
```

Installing:
 * Poetry: https://python-poetry.org/docs/#installation
 * Nvm: https://github.com/nvm-sh/nvm#installing-and-updating
 * Node: `nvm install v16.13.2` and/or `nvm use v16.13.2`
 * Yarn: `npm install --global yarn`

## Backend

Installing dependencies:

```bash
$ python3 -m venv venv
$ source ./venv/bin/activate
$ pip install --upgrade pip
$ cd backend
$ poetry install
```

Run

```bash
$ cd backend
$ cp .env.example .env
$ export APP_ENV=dev
$ poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

URL: http://localhost:8000

## Frontend

Installing dependencies:

```bash
$ cd frontend
$ yarn install
```

Run:

```bash
$ yarn run start
```

URL: http://localhost:3000