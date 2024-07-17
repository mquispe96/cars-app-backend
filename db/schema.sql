DROP DATABASE IF EXISTS cars_dev;

CREATE DATABASE cars_dev;

\connect cars_dev

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    year TEXT NOT NULL,
    make TEXT NOT NULL,
    trim TEXT,
    model TEXT NOT NULL,
    color TEXT, 
    price INTEGER,
    img_url TEXT,
    discontinued BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drop the insert trigger function if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'set_timestamp_on_insert') THEN
        DROP FUNCTION set_timestamp_on_insert();
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Drop the update trigger function if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'set_timestamp_on_update') THEN
        DROP FUNCTION set_timestamp_on_update();
    END IF;
END;
$$ LANGUAGE plpgsql;

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

-- Drop the insert trigger if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'before_insert_cars') THEN
        DROP TRIGGER before_insert_cars ON cars;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Drop the update trigger if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'before_update_cars') THEN
        DROP TRIGGER before_update_cars ON cars;
    END IF;
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