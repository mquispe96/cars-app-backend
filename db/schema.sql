DROP DATABASE IF EXIST cars_dev;

CREATE DATABASE cars_dev;

\connect cars_dev

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    year TEXT NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    color TEXT, 
    price INTEGER,
    img_url TEXT,
    discontinued BOOLEAN DEFAULT FALSE,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the trigger function for inserts
CREATE OR REPLACE FUNCTION set_timestamp_on_insert()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at := CURRENT_TIMESTAMP;
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger function for updates
CREATE OR REPLACE FUNCTION set_timestamp_on_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the insert trigger
CREATE TRIGGER before_insert_cars
BEFORE INSERT ON cars
FOR EACH ROW
EXECUTE FUNCTION set_timestamp_on_insert();

-- Create the update trigger
CREATE TRIGGER before_update_cars
BEFORE UPDATE ON cars
FOR EACH ROW
EXECUTE FUNCTION set_timestamp_on_update();