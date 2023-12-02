INSERT INTO manufacturer (name, title, description, createdDate, updatedDate, deletedDate) VALUES
('Intel', 'Intel Corporation', 'A leading manufacturer of computer components.', NOW(), NOW(), NULL),
('AMD', 'Advanced Micro Devices, Inc.', 'A multinational semiconductor company.', NOW(), NOW(), NULL),
('NVIDIA', 'NVIDIA Corporation', 'Specialized in graphics processing units (GPUs).', NOW(), NOW(), NULL);

INSERT INTO statuses (status) VALUES
('Olemas'),
('Otsas');

INSERT INTO users (firstName, lastName, email, password, role, createdDate, updatedDate, deletedDate) VALUES
('Juhan', 'Juurikas', 'juhan@juurikas.ee', '$2b$10$6GQ9wtfJ3JZ8Bavkpj9Z8udV3qDMJYyN0h1DWCxzWF2qylJxmRK7i', 'Admin', NOW(), NOW(), NULL),
('Mati', 'Maasikas', 'mati@maasikas.ee', '$2b$10$6GQ9wtfJ3JZ8Bavkpj9Z8udV3qDMJYyN0h1DWCxzWF2qylJxmRK7i', 'User', NOW(), NOW(), NULL);

INSERT INTO spares (name, manufacturer, code, type, volume, age, createdDate, updatedDate, deletedDate, statusId, userId) VALUES
('CPU', 1, 'INTEL123', 'Processor', 1, 'New', NOW(), NOW(), NULL, 1, NULL),
('GPU', 3, 'NVIDIA456', 'Graphics Card', 1, 'Used', NOW(), NOW(), NULL, 2, 2),
('RAM', 2, 'AMD789', 'Memory', 2, 'New', NOW(), NOW(), NULL, 1, NULL);
