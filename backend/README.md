## Running this backend bro

Use virtualenv to install python dependencies without messing up other things
```bash
cd backend
# create a sandbox for the backend 
virtualenv -p python3 env
# enters into the zone
source env/bin/activate
# sets up the zone for the reqs to be in
pip install -r requirements.txt
# slams the backend into existence
python backend_server.py
```
