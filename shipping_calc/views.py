from django.conf import settings
from django.shortcuts import render
from pyzipcode import ZipCodeDatabase

import shippo
shippo.api_key = settings.SHIPPO_APIKEY

# Create your views here
def home(request):
 	context = {}
 	if request.GET:
		shipment = create_shipment(request)
		rates = shipment['rates']
		context = { 'rates' : rates, 'request' : request.GET, 'shipment' : shipment }

	return render(request, 'home.html', context)

def create_shipment(request):
	from_zipcode = request.GET['from_zipcode']
	to_zipcode = request.GET['to_zipcode']

	#UPS rates require passing the state
	from_state =  get_state_from_zip(from_zipcode)
	to_state = get_state_from_zip(to_zipcode)

	#construct address dict for getting sample rates
	address_from = {'zip' : from_zipcode, 'country' : 'US', "state": from_state }
	address_to = {'zip' : to_zipcode, 'country' : 'US' , "state": to_state }

	#Parcel weight, dimensions, and units
	parcel_width = request.GET['parcel_width']
	parcel_length = request.GET['parcel_length']
	parcel_height = request.GET['parcel_height']
	parcel_weight = request.GET['parcel_weight']
	dimensions_unit = request.GET['dimensions_unit']
	mass_unit = request.GET['mass_unit']

	#construct parcel dict for getting sample rates
	parcel={"length":parcel_length,
			"width":parcel_width,
			"height": parcel_height,
			"distance_unit": dimensions_unit,
			"weight":parcel_weight,
			"mass_unit": mass_unit}

	shipment = shippo.Shipment.create(
         object_purpose= 'QUOTE',
         address_from= address_from,
         address_to= address_to,
         parcels= [parcel],
         submission_type= 'PICKUP',
         insurance_currency= 'USD',
		 async=False)

	return shipment

'''Helper method to get the state of a given zipcode.'''
def get_state_from_zip(zip):
	try:
		return ZipCodeDatabase()[zip].state
	except:
		return ""



