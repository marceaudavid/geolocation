var geolocate = document.getElementById('geolocate');
var coords = {
    time: 0,
    lat: 0,
    long: 0
};

if (localStorage.getItem(0)) {
    var i = localStorage.getItem(0)
} else {
    var i = 0;
}

window.onload = () => {
    for (let a = 1; a < localStorage.length; a++) {
        showData(a);
    }
}

window.onbeforeunload = () => {
    if (localStorage.length == i) {
        localStorage.setItem(0, i);
    }
}

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
    var coordsJSON = JSON.stringify(coords);
    i++;
    localStorage.setItem(i, coordsJSON);
    showData(i);
}

function showData(index) {
    var data = JSON.parse(localStorage.getItem(index));
    console.log(data);
    var table = document.getElementById('table');
    var row = table.insertRow(index);
    var id = row.insertCell(0);
    var time = row.insertCell(1);
    var lat = row.insertCell(2);
    var long = row.insertCell(3);
    id.innerHTML = index;
    time.innerHTML = data.time;
    lat.innerHTML = data.lat.toFixed(5);
    long.innerHTML = data.long.toFixed(5);
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

menu.addEventListener('click', () => {
    panel.classList.toggle('active');
})