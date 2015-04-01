var map;
var poitiers = new google.maps.LatLng(46.580446,0.336622);


function initialize() {

    var mapOptions = {
        zoom: 13
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

    //https ? no need ! #PJLRenseignement
    //map.data.loadGeoJson('http://inspire.sgmap.fr/api/datasets/54e30715410fc47e759a3cba/resources/54e30715410fc47e759a3ccd/download?format=GeoJSON&projection=WGS84');
    map.data.loadGeoJson('data.json');

    map.data.setStyle({
        icon: 'coeur.png'
    });



    //geolocalisable ?
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'Vous êtes ici'
            });

            map.setCenter(pos);

        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // bé non
        handleNoGeolocation(false);
    }
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Erreur: Impossible de vous localiser.';
    } else {
        var content = 'Erreur: changez de navigateur.';
    }

    var options = {
        map: map,
        position: poitiers,
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);

}

google.maps.event.addDomListener(window, 'load', initialize);