INSERT INTO department (department_name)
VALUES
    ("Engineering"),
    ("Product Management"),
    ("Quality Assurance"),
    ("Developer Operations"),
    ("Design"),
    ("Sales"),
    ("Customer Service"),
    ("Research and Development"),
    ("Human Resources"),
    ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Software Engineer", 112000.00, 1),
    ("Senior Software Engineer", 156000.00, 1),
    ("System Engineer", 169000.00, 1),
    ("Engineering Manager", 187000.00, 1),
    ("Associate Product Manager", 86000.00, 2),
    ("Product Owner", 101000.00, 2),
    ("Product Manager", 144000.00, 2),
    ("QA Analyst", 68000.00, 3),
    ("Test Engineer", 81000.00, 3),
    ("QA Manager", 132000.00, 3),
    ("DevOps Engineer", 97000.00, 4),
    ("Cloud Engineer", 95000.00, 4),
    ("Infrastructure Developer", 82000.00, 4),
    ("DevOps Manager", 145000.00, 4),
    ("UI/UX Designer", 78000.00, 5),
    ("Graphic Designer", 61000.00, 5),
    ("Web Designer", 73000.00, 5),
    ("Design Manager", 124000.00, 5),
    ("Sales Rep.", 82000.00, 6),
    ("Sales Director", 123000.00, 6),
    ("Sales Manager", 159000.00, 6),
    ("Customer Support Rep.", 56000.00, 7),
    ("Technical Support Spec.", 63000.00, 7),
    ("Customer Support Manager", 105000.00, 7),
    ("Research Scientist", 79000.00, 8),
    ("R&D Engineer", 92000.00, 8),
    ("Data Scientist", 95000.00, 8),
    ("R&D Manager", 128000.00, 8),
    ("HR Coordinator", 65000.00, 9),
    ("HR Director", 107000.00, 9),
    ("Recruitment Specialist", 81000.00, 9),
    ("Accountant", 79000.00, 10),
    ("Controller", 109000.00, 10),
    ("Finance Manager", 137000, 10);

-- Managers
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Renee", "Klein", 4, NULL),
    ("Benjamin", "Blake", 7, NULL),
    ("Hugh", "Saunders", 10, NULL),
    ("Tanya", "Stokes", 14, NULL),
    ("Margarita", "Wilkerson", 18, NULL),
    ("Bryant", "Keller", 21, NULL),
    ("Dolores", "Banks", 24, NULL),
    ("Duane", "Jefferson", 28, NULL),
    ("Kay", "Tayloer", 30, NULL),
    ("Darryl", "Garrett", 34, NULL);

-- All other employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Mildred", "Ward", 1, 1),
    ("Rodney", "Brady", 2, 1),
    ("Lula", "Poole", 1, 1),
    ("Grant", "Stephens", 3, 1),
    ("Annie", "Parks", 6, 2),
    ("Mack", "Valdez", 5, 2),
    ("Cody", "Knight", 5, 2),
    ("Winston", "Wilkerson", 8, 3),
    ("Alton", "Daniels", 9, 3),
    ("Luz", "Roberts", 8, 3),
    ("Loretta", "Park", 11, 4),
    ("Jackie", "Tate", 12, 4),
    ("Kenny", "Day", 13, 4),
    ("Emilio", "Berry", 15, 5),
    ("Georgia", "Huff", 16, 5),
    ("Sergio", "Richardson", 17, 5),
    ("Mark", "Sherman", 19, 6),
    ("Llyod", "Martin", 19, 6),
    ("Wendell", "Green", 20, 6),
    ("Edmund", "Cortez", 22, 7),
    ("Susan", "Ramirez", 22, 7),
    ("Mike", "Hammond", 23, 7),
    ("Judy", "Vargas", 25, 8),
    ("Jimmy", "McGuire", 26, 8),
    ("Ollie", "Gray", 27, 8),
    ("Levi", "Rivera", 29, 9),
    ("Pat", "Lopez", 31, 9),
    ("Sonia", "Burton", 32, 10),
    ("Max", "Miles", 33, 10);


