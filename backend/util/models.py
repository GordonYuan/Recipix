from app import api
from flask_restplus import fields

token_model = api.model('token_model',{
    'token': fields.String()
}) 

login_model = api.model('login_model', {
  'username': fields.String(required=True, example='Jamal'),
  'password': fields.String(required=True, example='password123'),
})

signup_model = api.model('signup_model', {
  'username': fields.String(required=True, example='hotmario258'),
  'password': fields.String(required=True, example='password123'),
})

