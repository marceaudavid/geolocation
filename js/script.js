var geolocate = document.getElementById('geolocate');
var track = document.getElementById('track');
var coords = {
    time: 0,
    lat: 0,
    long: 0
};
var menu = document.getElementById('menu');
var panel = document.getElementById('panel');
var del = document.getElementById('delete');

var i;

// get the row counter if stored
if (localStorage.getItem(0)) {
    i = localStorage.getItem(0)
} else {
    i = 0;
}

// restore the history on page refresh
window.onload = () => {
    for (let i = 1; i < localStorage.length; i++) {
        showData(i);
        dataEvents(i);
    }
}

// store the row counter before refresh
window.onbeforeunload = () => {
    if (localStorage.length == i && localStorage.length != 0) {
        localStorage.setItem(0, i);
    }
}

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

// get the current position
function getCurrentPosition() {
    if (navigator.geolocation) {
        // return a coordinate object to the function specified in the parameter.
        navigator.geolocation.getCurrentPosition(storePosition);
    } else {
        console.log("Sorry, Geolocation is not enabled in your browser");
    }
}

// track the user position
function watchCurrentPosition() {
    if (navigator.geolocation) {
        // return a coordinate object to the function specified in the parameter.
        navigator.geolocation.watchPosition(storePosition);
    } else {
        console.log("Sorry, Geolocation is not enabled in your browser");
    }
}

// set the marker on the user position and zoom in
function setMapPosition(lat, long) {
    map.setView([lat, long], 13);
    var marker = L.marker([lat, long]).addTo(map);
    marker.bindPopup("<b>You are here !</b>").openPopup();
}

// get the user position and store it in browser's localStorage
function storePosition(position) {
    var date = new Date();
    coords.time = date.toLocaleTimeString();
    coords.lat = position.coords.latitude;
    coords.long = position.coords.longitude;
    setMapPosition(coords.lat, coords.long);
    var coordsJSON = JSON.stringify(coords);
    i++;
    localStorage.setItem(i, coordsJSON);
    showData(i);
}

// show the stored position in a html table
function showData(index) {
    var data = JSON.parse(localStorage.getItem(index));
    var table = document.getElementById('table').getElementsByTagName('tbody')[0];
    var row = table.insertRow(index - 1);
    var id = row.insertCell(0);
    var time = row.insertCell(1);
    var lat = row.insertCell(2);
    var long = row.insertCell(3);
    id.innerHTML = index;
    time.innerHTML = data.time;
    lat.innerHTML = data.lat.toFixed(5)
    long.innerHTML = data.long.toFixed(5)
}

// set an event on row to retrieve former user's position
function dataEvents(i) {
    var table = document.getElementById('table');
    var rows = table.getElementsByTagName('tr');
    var row = rows[i];
    row.addEventListener('click', () => {
        let data = row.getElementsByTagName('td');
        let lat = parseFloat(data[2].innerHTML);
        let long = parseFloat(data[3].innerHTML);
        setMapPosition(lat, long);
    })
}

// click listener on position buttons
geolocate.addEventListener('click', () => {
    getCurrentPosition();
})

track.addEventListener('click', () => {
    watchCurrentPosition();
})

// click listener on burger icon
menu.addEventListener('click', () => {
    panel.classList.toggle('active');
    del.classList.toggle('btn-active');
})

// click listener on delete button
del.addEventListener('click', () => {
    let table = document.getElementById('table');
    table.getElementsByTagName('tbody')[0].innerHTML = "";
    localStorage.clear();
    i = 0;
})