-- Création de la base de données
CREATE DATABASE location_voiture;
USE location_voiture;

-- Table Users
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    lastname VARCHAR(100),
    firstname VARCHAR(100),
    birthday DATE,
    address VARCHAR(255)
);

-- Table Messages
CREATE TABLE Messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    content TEXT NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Table Cars
CREATE TABLE Cars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    horses_power INT
);

-- Table Offers
CREATE TABLE Offers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_car INT,
    departure_city VARCHAR(100),
    return_city VARCHAR(100),
    departure_date DATETIME,
    return_date DATETIME,
    price DECIMAL(10, 2),
    FOREIGN KEY (id_car) REFERENCES Cars(id) ON DELETE CASCADE
);

-- Table Reservations
CREATE TABLE Reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    offer_id INT,
    reservation_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (offer_id) REFERENCES Offers(id) ON DELETE CASCADE
);
