INSERT INTO ingredients 
VALUES 
    ("mozzarella cheese", "dairy"), 
    ("milk", "dairy"), 
    ("cheddar", "dairy"), 
    ("spinach", "vegetable"), 
    ("cabbage", "vegetable"), 
    ("broccoli", "vegetable"), 
    ("avocado", "fruit"), 
    ("ham", "meat"), 
    ("eggs", "meat"); 

INSERT INTO users (username, password)
VALUES 
    ("jeff", "password123")
    ("bigdave", "hello123")

INSERT INTO recipes (username, name, servings, description)
VALUES
    ("jeff", "eggs, ham, and cheese", 3, "Eggs ham and cheese is deluxe meal"),
    ("bigdave", "ice cream", 2, "I scream");

INSERT INTO methods (id, step, instruction)
VALUES
    (1, 1, "Crack the eggs and place into a bowl"),
    (1, 2, "Crack the eggs and place into a bowl"),
    (1, 3, "Crack the eggs and place into a bowl"),
    (1, 4, "Crack the eggs and place into a bowl"),
    (2, 1, "Scoop ice cream from container and place into a bowl");

INSERT INTO Tag 
VALUES 
    ("Entree"),
    ("Breakfast"),
    ("Lunch"),
    ("Dinner"),
    ("Desert");

INSERT INTO recipe_tag 
VALUES
    (1, "Breakfast"),
    (1, "Lunch"),
    (1, "Dinner"),
    (2, "Desert");