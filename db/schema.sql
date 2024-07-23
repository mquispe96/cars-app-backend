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

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birth_date DATE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    car_id INTEGER REFERENCES cars(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    car_id INTEGER REFERENCES cars(id),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drop the existing constraint if it exists (favorites table)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'favorites_car_id_fkey') THEN
        ALTER TABLE favorites DROP CONSTRAINT favorites_car_id_fkey;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'favorites_user_id_fkey') THEN
        ALTER TABLE favorites DROP CONSTRAINT favorites_user_id_fkey;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Add the new constraints with ON DELETE CASCADE (favorites table)
ALTER TABLE favorites
ADD CONSTRAINT favorites_car_id_fkey FOREIGN KEY (car_id)
REFERENCES cars (id) ON DELETE CASCADE,
ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id)
REFERENCES users (id) ON DELETE CASCADE;

-- Drop the existing constraint if it exists (comments table)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'comments_car_id_fkey') THEN
        ALTER TABLE comments DROP CONSTRAINT comments_car_id_fkey;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'comments_user_id_fkey') THEN
        ALTER TABLE comments DROP CONSTRAINT comments_user_id_fkey;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Add the new constraints with ON DELETE CASCADE (comments table)
ALTER TABLE comments
ADD CONSTRAINT comments_car_id_fkey FOREIGN KEY (car_id)
REFERENCES cars (id) ON DELETE CASCADE,
ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id)
REFERENCES users (id) ON DELETE CASCADE;


-- Drop the update trigger function if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'set_timestamp_on_update') THEN
        DROP FUNCTION set_timestamp_on_update();
    END IF;
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

-- Drop the update trigger if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'before_update_cars') THEN
        DROP TRIGGER before_update_cars ON cars;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create the update trigger
CREATE TRIGGER before_update_cars
BEFORE UPDATE ON cars
FOR EACH ROW
EXECUTE FUNCTION set_timestamp_on_update();
