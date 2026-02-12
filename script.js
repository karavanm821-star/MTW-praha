var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2
});

var bounds = [[0,0], [2000,2000]];
var image = L.imageOverlay('world.png', bounds).addTo(map);
map.fitBounds(bounds);

fetch('lines.svg')
  .then(response => response.text())
  .then(data => {
    var parser = new DOMParser();
    var svg = parser.parseFromString(data, "image/svg+xml").documentElement;
    svg.style.position = "absolute";
    svg.style.width = "100%";
    svg.style.height = "100%";
    document.getElementById("map").appendChild(svg);
  });

function toggleLine(id) {
  var line = document.getElementById(id);
  if (line.style.display === "none") {
    line.style.display = "inline";
  } else {
    line.style.display = "none";
  }
}
