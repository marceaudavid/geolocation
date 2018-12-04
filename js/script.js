var geolocate = document.getElementById('geolocate');
var coords = {
    lat: 0,
    long: 0
};
var popup = document.getElementById('pop-close');
// create the map
var map = L.map('map');
map.setView([coords.lat, coords.long], 3);
// add th mapbox street layer to the map
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFyY2VhdWRhdmlkIiwiYSI6ImNqaDYzMmI4bjFkaXczMnByd3NqMmRlMmIifQ.JMtTasa8j29837RLwwcVOQ'
}).addTo(map);

function getCurrentPosition() {
    if (navigator.geolocation) {
        // return a coordinate object to the function specified in the parameter.
        popup.parentElement.style.visibility = "hidden";
        navigator.geolocation.getCurrentPosition(showCurrentPosition);
    } else {
        console.log("Sorry, Geolocation is not enabled in your browser");
    }
}

function watchCurrentPosition() {
    if (navigator.geolocation) {
        // return a coordinate object to the function specified in the parameter.
        popup.parentElement.style.visibility = "hidden";
        navigator.geolocation.watchPosition(showCurrentPosition);
    } else {
        console.log("Sorry, Geolocation is not enabled in your browser");
    }
}


function showCurrentPosition(position) {
    coords.lat = position.coords.latitude;
    coords.long = position.coords.longitude;
    console.log("Latitude: " + coords.lat + " Longitude: " + coords.long);
    map.setView([coords.lat, coords.long], 13)
    var marker = L.marker([coords.lat, coords.long]).addTo(map);
    marker.bindPopup("<b>You are here !</b>").openPopup();
}

geolocate.addEventListener('click', () => {
    getCurrentPosition();
})

track.addEventListener('click', () => {
    watchCurrentPosition();
})

popup.addEventListener('click', () => {
    popup.parentElement.style.visibility = "hidden";
})