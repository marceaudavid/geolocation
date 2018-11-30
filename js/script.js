var geolocate = document.getElementById('geolocate');
var coordinates = document.getElementById('coordinates');

function getCurrentPosition() {
    if (navigator.geolocation) {
        // return a coordinate object to the function specified in the parameter.
        navigator.geolocation.getCurrentPosition(showCurrentPosition);
    } else {
        console.log("Sorry, Geolocation is not enabled in your browser");
    }
}

function showCurrentPosition(position) {
    var lat = position.coords.latitude
    var long = position.coords.longitude
    coordinates.innerHTML = "<p>Latitude: " + lat + "</p><p>Longitude: " + long + "</p>";
}

geolocate.addEventListener('click', () => {
    getCurrentPosition();
})