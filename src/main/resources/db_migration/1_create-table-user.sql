CREATE TABLE app_user(
id_user uuid PRIMARY KEY,
cpf_user VARCHAR(11),
last_name VARCHAR(120),
first_name VARCHAR(120),
phone_number VARCHAR(25),
email VARCHAR(120),
city VARCHAR(120),
UF VARCHAR(120),
password_hash VARCHAR(255),
profile_user profile
);