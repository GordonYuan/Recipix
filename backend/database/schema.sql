--
-- Comp3900 Recipix Database for MealMatch
--

-- List of Recipes
create table Recipes (
	id 	     		integer,
	username 		text,
	name	 		text,
	servings 		integer,
	description  	text,
	thumbnail   	blob,
	time_created 	integer,
	primary key (id),
	foreign key (username) references Users(Username)
);

-- List of Methods in Recipes
create table Methods (
	recipe_id	integer,
	step		integer, 
	instruction text,
	primary key (recipe_id, step),
	foreign key (recipe_id) references Recipes(id)
);

-- List of Ingredients
create table Ingredients (
	name 	 text,
	category text,
	primary key (name)
);

-- (recipe_id, ingredient_name) tuples
create table Recipe_Has (
	recipe_id		integer,
	ingredient_name text,
	amount			integer,
	units			text,
	primary key (recipe_id, ingredient_name),
	foreign key (recipe_id) references Recipes(id),
	foreign key (ingredient_name) references Ingredients(name)
);

-- List of Users
create table Users (
	username	 	text,
	password	 	text,
	token			integer,
	primary key (username)
);

-- (username, recipe_id) tuples
create table Owns (
	username 	text,
	recipe_id	integer,
	primary key (username, recipe_id),
	foreign key (recipe_id) references Recipes(id),
	foreign key (username) references Users(username)
);

-- recipe tag/category 
create table Tag (
	name text,
	primary key(name)
);

-- (recipe_id, tag) tuples
create table Recipe_tag (
	recipe_id	integer,
	tag		 	text,
	primary key (recipe_id, tag),
	foreign key (recipe_id) references Recipes(id),
	foreign key (tag) references Tag(name)
);

-- ingredient category
create table Category (
	name text,
	primary key(name)
);

-- recipe requests
create table Requests (
	id		integer,
	name 	text,
	count	integer,
	primary key (id, name)
);

-- (request_id, ingredient_name) tuples
create table Request_Has (
	request_id		integer,
	ingredient_name text,
	primary key (request_id, ingredient_name),
	foreign key (request_id) references Requests(id),
	foreign key (ingredient_name) references Ingredients(name)
);

