"use strict";

minZoom = 12;
var view = new ol.View({
  center: [-118.331461, 33.795996],
  zoom: 13,
  minZoom: minZoom,
  resolutions: resolutions,
  projection: projection,
  extent: [-180.0, -90.0, 180.0, 90.0]
});
var popup = new ol.Overlay.Popup({
  popupClass: "default",
  //"tooltips", "warning" "black" "default", "tips", "shadow",
  closeBox: true,
  onshow: function onshow() {
    console.log("You opened the box");
  },
  onclose: function onclose() {
    console.log("You close the box");
  },
  positioning: 'bottom-auto',
  autoPan: {
    animation: {
      duration: 250
    }
  }
});
var osmLayer = new ol.layer.Tile({
  title: 'OpenStreetMap',
  source: new ol.source.OSM()
});
var googleStreetLayer = new ol.layer.Tile({
  title: 'Google Street',
  source: new ol.source.XYZ({
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
  })
});
var googleSatelliteLayer = new ol.layer.Tile({
  title: 'Google Satellite',
  source: new ol.source.XYZ({
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
  })
});
var layerSwitcher = new ol.control.LayerSwitcher({
  tipLabel: 'Layers'
});
var map = new ol.Map({
  controls: [new ol.control.MousePosition(), new ol.control.Zoom(), layerSwitcher],
  layers: [osmLayer, googleStreetLayer, googleSatelliteLayer, parcelVectorTile],
  overlays: [popup],
  target: 'map',
  view: view
}); // Click interaction

map.on('click', function (event) {
  var feature = map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
    return feature;
  });

  if (feature) {
    var coordinate = event.coordinate; // Create HTML content for the popup

    var content = '<ol>';
    var properties = feature.getProperties();

    for (var key in properties) {
      if (key === 'ain' || key === 'list_price' || key === 'last_stat' || key === 'stat1_date1' || key === 'recty' || key === 'bblength' || key === 'bbwidth' || key === 'lottype') {
        content += '<li><strong>' + key + ':</strong> ' + properties[key] + '</li>';
      }
    }

    content += '</ol>'; // Set the popup content and position

    popup.getElement().innerHTML = content;
    popup.setPosition(coordinate);
    popup.setPositioning('bottom-center');
  } else {
    popup.setPosition(undefined);
  }
});
map.getView().on('change:resolution', function () {
  var currentZoom = view.getZoom();
  parcelVectorTile.setVisible(currentZoom >= minZoom);
});