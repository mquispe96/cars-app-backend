# cars-app-backend

## Description

This is a simple backend application that provides a REST API for a car listing application.

## Car Properties

- id: SERIAL PRIMARY KEY
- year: TEXT
- make: TEXT
- model: TEXT
- trim: TEXT
- price: INTEGER (default: NOT LESS THAN 0) 
- img_url: TEXT
- discontinued: BOOLEAN (default: false)
- created_at: TIMESTAMP (default: CURRENT_TIMESTAMP)?
- updated_at: TIMESTAMP (default: CURRENT_TIMESTAMP)?

## API Endpoints

- GET /cars
- GET /cars/:id
- POST /cars
- PUT /cars/:id
- DELETE /cars/:id
