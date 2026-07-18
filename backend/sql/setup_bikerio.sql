-- MySQL setup script for bikerIO data
-- Run from MySQL Command Line Client:
-- mysql -u root -p < backend/sql/setup_bikerio.sql

CREATE DATABASE IF NOT EXISTS bikerio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bikerio_db;

DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS apps;

CREATE TABLE apps (
  id INT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  companyName VARCHAR(255) NOT NULL,
  image VARCHAR(1000),
  description TEXT,
  size INT,
  reviews INT,
  ratingAvg DECIMAL(2,1),
  downloads BIGINT
);

CREATE TABLE ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  app_id INT NOT NULL,
  name VARCHAR(20) NOT NULL,
  count INT NOT NULL,
  CONSTRAINT fk_ratings_app
    FOREIGN KEY (app_id) REFERENCES apps(id)
    ON DELETE CASCADE
);

INSERT INTO apps (id, title, companyName, image, description, size, reviews, ratingAvg, downloads) VALUES
(1, 'Suzuki Gixxer Fi ABS', 'Suzuki', 'https://i.ibb.co.com/W4wP8fzJ/SUZUKI-Gixxer-Fi-ABS.png', 'Powered by 155 cc which generates Maximum power 13.6ps@8000rpm.', 45, 12450, 4.5, 500000),
(2, 'Yamaha FZS v2', 'Yamaha', 'https://i.ibb.co.com/qMJh8RVK/9cfe5830-0ed6-41f6-8e13-e1b35c1b35ce.png', 'Maximum power 13 Bhp @ 8000 rpm and its maximum torque is 12.8 Nm @ 6000 rpm.', 60, 9800, 4.3, 300000),
(3, 'Yamaha FZS V3 ABS', 'Yamaha', 'https://i.ibb.co.com/bMVK5LCT/ae3815ec-fa5e-44c9-87ec-f8205a86d0b8.png', 'Maximum power 13 Bhp @ 8000 rpm and its maximum torque is 12.8 Nm @ 6000 rpm.', 30, 7400, 4.2, 250000),
(4, 'Yamaha MT 15', 'Yamaha', 'https://i.ibb.co.com/0pj80BLx/401c2786-b185-46dc-a149-9639b1079ca8.png', 'Maximum power 13 Bhp @ 8000 rpm and its maximum torque is 12.8 Nm @ 6000 rpm.', 75, 15800, 4.6, 800000),
(5, 'Yamaha FZS FI V4', 'Yamaha', 'https://i.ibb.co.com/SXhsBKnx/8543d7e8-603b-49c5-976b-9454e55b77e7.png', 'Maximum power 13 Bhp @ 8000 rpm and its maximum torque is 12.8 Nm @ 6000 rpm.', 55, 20300, 4.7, 1200000),
(6, 'Honda SP 125', 'Honda', 'https://i.ibb.co.com/PGB1XYRg/f50ff3f1-d75c-415f-97b0-c604207c747c.png', 'Maximum power 13 Bhp @ 8000 rpm and its maximum torque is 12.8 Nm @ 6000 rpm.', 50, 17800, 4.4, 900000),
(7, 'Yamaha R15M', 'Yamaha', 'https://i.ibb.co.com/2YjJY4sm/493536df-2c60-47aa-8d49-41b7de337dee.png', 'Maximum power 13 Bhp @ 8000 rpm and its maximum torque is 12.8 Nm @ 6000 rpm.', 65, 8700, 4.4, 400000),
(8, 'Bajaj Discover 125 Disc', 'Bajaj', 'https://i.ibb.co.com/Q7Lm6Gdz/d0dff190-6e53-4829-96a5-583ce7f74df2.png', 'Maximum power 13 Bhp @ 8000 rpm and its maximum torque is 12.8 Nm @ 6000 rpm.', 80, 11200, 4.5, 600000),
(9, 'Bajaj Pulsar N160', 'Bajaj', 'https://i.ibb.co.com/pBrcSq4w/90a4007b-3e43-41f5-a05c-b472c86247c7.png', 'Maximum power 13 Bhp @ 8000 rpm and its maximum torque is 12.8 Nm @ 6000 rpm.', 40, 6900, 4.3, 200000),
(10, 'GamerHub', 'PlayVerse', 'https://picsum.photos/200?random=9', 'Discover and connect with gamers worldwide.', 90, 13400, 4.6, 700000),
(11, 'Weatherly', 'SkyNet', 'https://picsum.photos/200?random=11', 'Real-time weather updates and forecasts.', 25, 5400, 4.1, 150000),
(12, 'BookNest', 'Readify', 'https://picsum.photos/200?random=12', 'Read and manage your favorite books digitally.', 35, 6200, 4.2, 180000),
(13, 'ShopCart', 'EcomX', 'https://picsum.photos/200?random=13', 'Shop online with deals and fast delivery.', 70, 21000, 4.5, 1500000),
(14, 'Videofy', 'StreamLabs', 'https://picsum.photos/200?random=14', 'Watch and share videos with global audiences.', 85, 19500, 4.6, 1100000),
(15, 'LangMate', 'LinguaTech', 'https://picsum.photos/200?random=15', 'Learn new languages with AI-powered lessons.', 48, 8900, 4.4, 350000),
(16, 'SecureVault', 'CyberSafe', 'https://picsum.photos/200?random=16', 'Keep your passwords and data secure with encryption.', 38, 4700, 4.3, 120000),
(21, 'Forest: Focus For Productivity', 'seekrtech.com', 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/0e/7e/3d/0e7e3d1a-6d1a-4d1a-8d1a-3d1a6d1a4d1a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg', 'Stay focused, be present. Forest is an app that helps you put down your phone and focused on what''s more important in your life.', 156, 120000, 4.8, 9000000),
(22, 'SmPlan: ToDo List With Reminder', 'productive.io', 'https://cdn-icons-png.flaticon.com/512/2693/2693507.png', 'This focus app takes the proven Pomodoro technique and makes it even more practical for modern lifestyles. Instead of just setting a timer, it builds a complete environment for deep work.', 291, 54000, 4.9, 8000000),
(23, 'FLIP - Focus Timer For Study', 'flipcorp.app', 'https://play-lh.googleusercontent.com/9-38-r8u_U9z-38-r8u_U9z-38-r8u_U9z', 'FLIP can help you improve your study habits through a focus timer and detailed statistics of your study time.', 88, 42000, 4.7, 5000000),
(24, 'Pomocat - Cute Pomodoro Timer', 'meowfocus.com', 'https://play-lh.googleusercontent.com/meow-icon', 'A cute cat-themed productivity timer that makes working fun. Collect virtual cats while you focus on your tasks!', 45, 15000, 5.0, 2000000);

INSERT INTO ratings (app_id, name, count) VALUES
(1, '1 star', 500), (1, '2 star', 700), (1, '3 star', 1500), (1, '4 star', 4000), (1, '5 star', 5750),
(2, '1 star', 300), (2, '2 star', 600), (2, '3 star', 1200), (2, '4 star', 3500), (2, '5 star', 4200),
(3, '1 star', 250), (3, '2 star', 500), (3, '3 star', 1100), (3, '4 star', 2700), (3, '5 star', 2850),
(4, '1 star', 600), (4, '2 star', 800), (4, '3 star', 1800), (4, '4 star', 5200), (4, '5 star', 7400),
(5, '1 star', 700), (5, '2 star', 900), (5, '3 star', 2000), (5, '4 star', 6500), (5, '5 star', 10200),
(6, '1 star', 600), (6, '2 star', 900), (6, '3 star', 2000), (6, '4 star', 5800), (6, '5 star', 8500),
(7, '1 star', 300), (7, '2 star', 500), (7, '3 star', 1400), (7, '4 star', 3200), (7, '5 star', 3300),
(8, '1 star', 400), (8, '2 star', 700), (8, '3 star', 1600), (8, '4 star', 3800), (8, '5 star', 4700),
(9, '1 star', 200), (9, '2 star', 400), (9, '3 star', 1200), (9, '4 star', 2500), (9, '5 star', 2600),
(10, '1 star', 500), (10, '2 star', 700), (10, '3 star', 1500), (10, '4 star', 4300), (10, '5 star', 6400),
(11, '1 star', 200), (11, '2 star', 300), (11, '3 star', 1000), (11, '4 star', 2000), (11, '5 star', 1900),
(12, '1 star', 250), (12, '2 star', 350), (12, '3 star', 1100), (12, '4 star', 2300), (12, '5 star', 2200),
(13, '1 star', 800), (13, '2 star', 1200), (13, '3 star', 2500), (13, '4 star', 7000), (13, '5 star', 9500),
(14, '1 star', 700), (14, '2 star', 1000), (14, '3 star', 2200), (14, '4 star', 6000), (14, '5 star', 9600),
(15, '1 star', 300), (15, '2 star', 500), (15, '3 star', 1400), (15, '4 star', 3200), (15, '5 star', 3500),
(16, '1 star', 150), (16, '2 star', 250), (16, '3 star', 900), (16, '4 star', 1800), (16, '5 star', 1600),
(21, '5 star', 10000), (21, '4 star', 6500), (21, '3 star', 2800), (21, '2 star', 1500), (21, '1 star', 800),
(22, '5 star', 11000), (22, '4 star', 6200), (22, '3 star', 2500), (22, '2 star', 1800), (22, '1 star', 900),
(23, '5 star', 8000), (23, '4 star', 5000), (23, '3 star', 3000), (23, '2 star', 1000), (23, '1 star', 500),
(24, '5 star', 14000), (24, '4 star', 800), (24, '3 star', 100), (24, '2 star', 50), (24, '1 star', 50);

SELECT 'Database setup complete' AS status;
