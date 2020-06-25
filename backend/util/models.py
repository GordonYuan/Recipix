from app import api
from flask_restplus import fields

token_details = api.model('token_details',{
    'token': fields.String()
}) 

login_details = api.model('login_details', {
  'username': fields.String(required=True, example='Jamal'),
  'password': fields.String(required=True, example='password123'),
})

signup_details = api.model('signup_details', {
  'username': fields.String(required=True, example='hotmario258'),
  'password': fields.String(required=True, example='password123'),
})

