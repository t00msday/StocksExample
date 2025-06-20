# StocksExample

Retrieving selected stock prices via nest.js backend and displaying in angular frontend

# Setup & Run
replace `FINNHUB_API_KEY: "YOURKEYHERE"` in docker-compose.yml with proper API-Key

run `docker-compose up -d`

- Frontend at localhost:8080
- Backend/SwaggerUI at localhost:3000/api

# Project Outline

- set up as npm workspace
- libs/shared: shared DTOs between frontend end backend
- apps/frontend: angular frontend
- apps/backend: nest.js backend

# Docker Setup
- Base docker image in project root
- individual images for frontend and backend in their respective directories

# Mocking in Backend
- the backend can be started using a mock-stock provider using `start:dev_mock` to provide randomized data sets


# ADR

## Use REST with Finnhub API

### Status
Accepted

### Context
Finnhub provides a REST interface and a Websocket connection. 
Websockets allow the subscription of all trades per Stock.

### Decision
Only use the Rest interface.

### Consequences
- Polling the REST interface at intervals is necessary to keep price info up to date
- Only one interface has to be implemented (REST is needed for market status)
- No calculations are necessary to calculate the actual current price

## Provide collections of values via rest

### Status
Accepted

### Context
The frontend could poll single values via REST from the backend and combine those 
via Observables (scan) or get complete collections (last hour at most) from the backend

### Decision
Backend delivers collection of values

### Consequence
- Frontend does not need to store data 
- Less complicated solution when additional stocks are selected
( No unnecessary polling from frontend of unselected stocks, no special handling for missing values in charts)
- Calculation of time based averages less 'observable based' and more complex (instead of scan / bufferTime) 
