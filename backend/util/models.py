from app import api
from flask_restplus import fields

token_model = api.model('token_model',{
    'token': fields.String()
}) 

login_model = api.model('login_model', {
  'username': fields.String(required=True, example='Jamal'),
  'password': fields.String(required=True, example='password123'),
})

register_model = api.model('register_model', {
  'username': fields.String(required=True, example='hotmario258'),
  'password': fields.String(required=True, example='password123'),
})

ingredient_detail_model = api.model('ingredient_detail_model', {
  'name': fields.String(required=True, example='cheese'),
  'category': fields.String(required=True, example='dairy')
})

ingredient_list_detail_model = api.model('ingredient_list_detail_model', {
  'ingredients': fields.List(fields.Nested(ingredient_detail_model)),
})

ingredient_model = api.model('ingredient_model', {
  'name': fields.String(required=True, example='cheese'),
})

ingredient_list_model = api.model('ingredient_list_model', {
  'ingredients': fields.List(fields.Nested(ingredient_model)),
})

category_ingredient_model = api.model('category_ingredient_model', {
  'category': fields.String(required=True, example='dairy'),
  'ingredients': fields.List(fields.Nested(ingredient_model))
})

categories_model = api.model('categories_model', {
  'categories' : fields.List(fields.Nested(category_ingredient_model)), 
})

ingredients_recipe_model = api.model('ingredients_recipe_model', {
  'name': fields.String(required=True, example='cheese'),
  'amount': fields.String(required=True, example='500'),
  'units': fields.String(required=True, example='grams')
})

recipe_id_model = api.model('recipe_id_model', {
  'recipe_id' : fields.Integer(required=True, min=0)
})

meal_type_model = api.model('meal_type', {
  'tag' : fields.String(required=True, example='entree')
})

tags_model = api.model('tags_model', {
  'tags' : fields.List(fields.Nested(meal_type_model))
})
recipe_method_model = api.model('recipe_method_model', {
  'step_number' : fields.Integer(required=True, min=1),
  'instruction' : fields.String(required=True, example='Boil the water for 50 minutes until evaporated')
})

recipe_complete_model = api.model('recipe_complete_model', {
  'recipe_id' : fields.Integer(required=True, min=0), 
  'recipe_creator' : fields.String(required=True, example='hotmario258'),
  'recipe_name' : fields.String(required=True, example='eggs and Cheese ham'),
  'image' : fields.String(required=True, example='base64String'),
  'tags' : fields.List(fields.Nested(meal_type_model)),
  'ingredients' : fields.List(fields.Nested(ingredients_recipe_model)),
  'servings' : fields.Integer(required=True, min=0),
  'method' : fields.List(fields.Nested(recipe_method_model)),
  'description' : fields.String(required=True, example='Eggs and cheese ham is a deluxe meal served for kings')
})

recipe_list_model = api.model('recipe_list_model', {
  'recipes': fields.List(fields.Nested(recipe_complete_model)),
})

auth_model = api.parser().add_argument('Authorization', help="Authorization token given from logging in",location='headers')