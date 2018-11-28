# shippo-api-demo
Sample demo of the Shippo API

### Installing requirements
`pip install -r requirements.txt`

### To start the server
`python manage.py runserver`

### Setting your API key
To get shipping rates you'll need to sign up for a shipping account. Once you are signed up copy your api key from (https://app.goshippo.com/settings/api)
and set the SHIPPO_APIKEY env var

`export SHIPPO_APIKEY=<YOUR_API_KEY_INSTEAD>`
