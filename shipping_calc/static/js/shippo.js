$(document).ready( function() {
  		//fromAddress();
	window.mode = 'from'

	$( ".toogleButtons" ).change(function() {
		des = $(this).attr("value");
		window.mode = des
		$('#pac-input').val('');
	});
	autocomplete()
  });

function fromAddress(zip, atreet){
	$.ajax({
		type: "GET",
		url: "https://api.goshippo.com/v1/addresses/",
		data:{
			"object_purpose": "QUOTE",
		    "name": "Laura Behrens Wu",
		    "company": "Shippo",
		    "street1": "Clayton St.",
		    "street_no": "215",
		    "street2": "",
		    "city": "San Francisco",
		    "state": "CA",
		    "zip": "94117",
		    "country": "US",
		    "phone": "+1 555 341 9393",
		    "email": "laura@goshippo.com",
		    "metadata": "Customer ID 123456"
		},

		dataType: 'jsonp',   
    	success: function() { console.log('Success!'); },                                                                                                                                                                                       
    	error: function() { console.log('Uh Oh!'); },
	})
}


function autocomplete(mode){
  var mapOptions = {
    center: new google.maps.LatLng(37.767997, -122.3921315),
    zoom: 10
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

  var types = document.getElementById('type-selector');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);


    //set to/from
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);

    $('#'+window.mode).html('<div><strong>' + place.name + '</strong><br>' + address);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    google.maps.event.addDomListener(radioButton, 'click', function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);


google.maps.event.addDomListener(window, 'load', autocomplete);

}


