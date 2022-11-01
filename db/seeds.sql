INSERT INTO departments (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");
       

-- May need to add department_id
INSERT INTO roles (title, salary, department_id) 
VALUES ("Sales Lead", 120000, 1),
       ("Salesperson", 95000, 1),
       ("Lead Engineer", 210000, 2),
       ("Software Engineer", 180000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Stacy", "Adams", 2, 1),
       ("Tony", "Stark", 3, NULL),
       ("Scott", "Lang", 4, 3),
       ("Wade", "Wilson", 5, NULL),
       ("Natasha", "Romanoff", 6, 5),
       ("Jennifer", "Walters", 7, NULL),
       ("Thor", "Odinson", 8, 7);
       