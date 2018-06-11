# 12-mysql

Here is DB script:

```
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT NOT null auto_increment,
product_name varchar(100) NOT null,
department_name varchar(50) NOT null,
price decimal (6,2) null,
stock_quantity INT null,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("boogie board", "Water Sports", 35.99, 34);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beach Umbrella", "Tents & Shelters", 67.97, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sleeping Bag", "Outdoors", 179.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hammock", "Outdoors", 111.12, 89);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beach Sling Chair", "Camping Furniture", 30.12, 23);    

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Polarized Sunglasses", "Sunglasses", 19.99, 109);    

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beach Tent", "Tents & Shelters", 122.89, 39);    

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Backpack", "Backpacks & Bags", 89.56, 22);    

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cooler", "Сooler", 12.90, 2);    

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Portable Stainless Steel Grill", "Grill", 45.23, 1);    

SELECT * FROM products    
```


