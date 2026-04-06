CREATE TABLE service_order (
so_number INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
id_customer uuid REFERENCES customer(id_customer),
place_id uuid REFERENCES places(place_id),
equipment_type_id uuid REFERENCES equipment(equipment_type_id),
brand_name VARCHAR(120),
modelo VARCHAR(120),
serial_number VARCHAR(120),
employee_name VARCHAR(120),
customer_phone_num VARCHAR(30),
problem_reported VARCHAR(600),
status statusOs,
opened timestamp,
closed timestamp,
created_by_id uuid REFERENCES app_user(id_user)
);