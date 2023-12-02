CREATE DATABASE varuosad;

USE varuosad;

CREATE TABLE manufacturer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    createdDate TIMESTAMP NOT NULL,
    updatedDate TIMESTAMP NOT NULL,
    deletedDate TIMESTAMP NULL
);

CREATE TABLE statuses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('Olemas', 'Otsas') NOT NULL
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'User') NOT NULL,
    createdDate TIMESTAMP NOT NULL,
    updatedDate TIMESTAMP NULL,
    deletedDate TIMESTAMP NULL
);

CREATE TABLE spares (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    manufacturer INT NOT NULL, 
    code VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    volume INT NOT NULL,
    age VARCHAR(255) NOT NULL,
    createdDate TIMESTAMP NOT NULL,
    updatedDate TIMESTAMP NOT NULL,
    deletedDate TIMESTAMP NULL,
    statusId INT,
    userId INT,
    FOREIGN KEY (statusId) REFERENCES statuses(id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (manufacturer) REFERENCES manufacturer(id) ON DELETE CASCADE
);
