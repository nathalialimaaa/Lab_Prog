CREATE TABLE places(
place_id uuid PRIMARY KEY,
customer_id uuid REFERENCES customer(id_customer),
place_name VARCHAR(120)
);