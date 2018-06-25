navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    
    var map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 8
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow({
    map: map
  });

    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: pos,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
    map.setStreetView(panorama);
    geocodeLatLng(geocoder, map, infowindow, pos);
  });

function geocodeLatLng(geocoder, map, infowindow, pos) {
 geocoder.geocode({
    'location': pos
  }, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(16);
        var marker = new google.maps.Marker({
          position: pos,
          map: map
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}