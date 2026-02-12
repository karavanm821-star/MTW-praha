var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2
});

var img = new Image();
img.src = "map.png";

img.onload = function() {
  var width = img.width;
  var height = img.height;
  var bounds = [[0,0], [height,width]];

  // Mapa
  L.imageOverlay("map.png", bounds).addTo(map);
  map.fitBounds(bounds);

  // Načtení SVG
  fetch("lines.svg")
    .then(res => res.text())
    .then(data => {
      var parser = new DOMParser();
      var svgDoc = parser.parseFromString(data, "image/svg+xml");
      var svgElement = svgDoc.documentElement;

      svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);

      var overlay = L.svgOverlay(svgElement, bounds);
      overlay.addTo(map);

      window.toggleLine = function(line) {
        var elements = svgElement.querySelectorAll("." + line);
        elements.forEach(el => {
          el.style.display =
            el.style.display === "none" ? "block" : "none";
        });
      };
    });
};

