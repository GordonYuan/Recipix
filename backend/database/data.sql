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
    ("jeff", "password123"),
    ("bigdave", "hello123");

INSERT INTO recipes (username, name, servings, description)
VALUES
    ("jeff", "eggs, ham, and cheese", 3, "Eggs ham and cheese is deluxe meal"),
    ("bigdave", "ice cream", 2, "I scream");

INSERT INTO methods (recipe_id, step, instruction)
VALUES
    (1, 1, "Crack the eggs and place into a bowl"),
    (1, 2, "Cut the ham into strips and place into egg mixture"),
    (1, 3, "Put the cheese into egg and ham mixture"),
    (1, 4, "Fry it"),
    (2, 1, "Scoop ice cream from container and place into a bowl");

INSERT INTO Tag (name)
VALUES 
    ("Entree"),
    ("Breakfast"),
    ("Lunch"),
    ("Dinner"),
    ("Desert");

INSERT INTO recipe_tag (recipe_id, tag)
VALUES
    (1, "Breakfast"),
    (1, "Lunch"),
    (1, "Dinner"),
    (2, "Desert");

INSERT INTO recipe_has (recipe_id, ingredient_name, amount, units)
VALUES 
    (1, "cheese", 500, "grams"),
    (1, "eggs", 2, "whole"),
    (1, "ham", 200, "grams"),
    (2, "ice Cream", 500, "mL");