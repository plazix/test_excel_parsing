# Test Excel Processing (Test project)

Default user:
 * username: `user`
 * password: `passwd`

## Docker



## Environment

```
Ubuntu 20.04
Python 3.8.10
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
