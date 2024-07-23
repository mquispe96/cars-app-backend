\c cars_dev;

INSERT INTO cars (year, make, model, trim, color, price, img_url, discontinued, created_at, updated_at) VALUES
('2016', 'Subaru', 'WRX', 'Base', 'Gray', 26500, 'https://www.cars.com/i/large/in/v2/stock_photos/9cc44da5-4b4f-4ffd-9798-d4c2d50b9eb4/cc34434a-4219-4caf-a46d-e3fdeb250226.png', true, '2024-07-17 14:25:33.789', '2024-07-17 14:25:33.789'),
('2011', 'Honda', 'Civic', 'LX', 'Gray', 18000, 'https://images.dealer.com/autodata/us/large_stockphoto/2011/USC10HOC021C1.jpg?impolicy=resize&w=414', true, '2024-07-17 14:25:33.789', '2024-07-17 14:25:33.789'),
('2010', 'Honda', 'CRV', 'EXL', 'Blue',20000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUMqo_yNDMHfhwy8nkmKro2roXFcimrtMBIg&s', true, '2024-07-17 14:25:33.789', '2024-07-17 14:25:33.789'),
('2024', 'Lamborghini', 'Huracan', null, 'Yellow',250000, 'https://cdn.motor1.com/images/mgl/y2pn8Y/s3/lamborghini-huracan-hybrid-il-render-di-motor1.com.jpg', false, '2024-07-17 14:25:33.789', '2024-07-17 14:25:33.789');

INSERT INTO users (username, email, first_name, last_name, birth_date, password) VALUES
('admin', 'mquispe@pursuit.org', 'Marco', 'Quispe', '2006-06-06', 'Pursuit@2024');

INSERT INTO favorites (user_id, car_id) VALUES
(1, 1),
(1, 2),
(1, 3);

INSERT INTO comments (user_id, car_id, comment) VALUES
(1, 1, 'This is a nice car!'),
(1, 2, 'This is a great car!'),
(1, 3, 'This is a cool car!');
