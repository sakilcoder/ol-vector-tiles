var gridsetName = 'EPSG:4326';
var gridNames = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];
var baseUrl = 'http://198.44.66.10:8080/geoserver/webparcels/gwc/service/wmts';
var style = style_simple;
var format = 'application\/vnd.mapbox\-vector\-tile';
var infoFormat = 'text/html';
var layerName = 'webparcels:webmap_parcels';
var projection = new ol.proj.Projection({
    code: 'EPSG:4326',
    units: 'degrees',
    axisOrientation: 'neu'
});
var resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];
params = {
    'REQUEST': 'GetTile',
    'SERVICE': 'WMTS',
    'VERSION': '1.0.0',
    'LAYER': layerName,
    // 'STYLE': style,
    'STYLE': '',
    'TILEMATRIX': gridsetName + ':{z}',
    'TILEMATRIXSET': gridsetName,
    'FORMAT': format,
    'TILECOL': '{x}',
    'TILEROW': '{y}'
};

function constructSource(minZoom) {
    var url = baseUrl + '?'
    for (var param in params) {
        url = url + param + '=' + params[param] + '&';
    }
    url = url.slice(0, -1);

    var source = new ol.source.VectorTile({
        url: url,
        format: new ol.format.MVT({}),
        projection: projection,
        tileGrid: new ol.tilegrid.WMTS({
            tileSize: [256, 256],
            origin: [-180.0, 90.0],
            resolutions: resolutions,
            matrixIds: gridNames
        }),
        wrapX: true,
        minZoom: minZoom
    });
    return source;
}

var parcelVectorTile = new ol.layer.VectorTile({
    style: style_simple,
    source: constructSource()
});

function getMinDate(when) {
    if (when == 'Before') {
        return new Date();
    } else {
        return new Date('1971/01/01');
    }
}

function getMaxDate(when) {
    return new Date();
}

function updateParcelVectorTile() {
    var lastStatFilter = $('#lastStatFilter').val();
    // var priceRange = $("#priceRange").val();
    // priceRange = priceRange.split(',');
    // priceRange = [parseInt(priceRange[0]), parseInt(priceRange[1])];

    var priceRange = $("#priceRange").val();
    priceRange = priceRange.split(',');
    priceRange = [parseInt(priceRange[0]), parseInt(priceRange[1])];
    console.log('priceRange:', priceRange);

    var listingDateVal = $("#listingDate").val();
    var listingDate = listingDateVal.split(',');

    let sdate = new Date('1971/01/01');
    let edate = new Date();

    if (listingDate.length == 0 || listingDate[0] == '') {
        sdate = getMinDate($('input[name="rbListingDate"]:checked').val());
        edate = getMaxDate($('input[name="rbListingDate"]:checked').val());
    } else {
        sdate = new Date(listingDate[0]);
        edate = new Date(listingDate[1]);
    }

    if (sdate > edate) {
        let tdate = sdate;
        sdate = edate;
        edate = tdate;
    }

    var listingDates = [sdate, edate, $('input[name="rbListingDate"]:checked').val()];

    // Determine which filters have values and apply only those
    if (lastStatFilter !== 'All') {
        parcelVectorTile.setStyle(function (feature) {
            return updateStyle(feature, lastStatFilter, null, null);
        });
    } else if (priceRange[0] > 0 && priceRange[1] < 65000000) {
        parcelVectorTile.setStyle(function (feature) {
            return updateStyle(feature, null, priceRange, null);
        });
    } else if (listingDateVal !== null && listingDateVal !== '') {
        parcelVectorTile.setStyle(function (feature) {
            return updateStyle(feature, null, null, listingDates);
        });
    }

    parcelVectorTile.getSource().changed();
}


// function updateParcelVectorTile() {
//     var lastStatFilter = $('#lastStatFilter').val();
//     var priceRange = $("#priceRange").val();
//     priceRange = priceRange.split(',');
//     priceRange = [parseInt(priceRange[0]), parseInt(priceRange[1])]

//     var listingDate = $("#listingDate").val();
//     listingDate = listingDate.split(',');

//     let sdate = new Date();
//     let edate = new Date();

//     if (listingDate.length == 0 || listingDate[0] == '') {
//         sdate = getMinDate($('input[name="rbListingDate"]:checked').val());
//         edate = getMaxDate($('input[name="rbListingDate"]:checked').val());
//     } else {
//         sdate = new Date(listingDate[0]);
//         edate = new Date(listingDate[1]);
//     }

//     if (sdate > edate) {
//         let tdate = sdate;
//         sdate = edate;
//         edate = tdate;
//     }

//     var listingDates = [sdate, edate, $('input[name="rbListingDate"]:checked').val()];

//     parcelVectorTile.setStyle(function (feature) {
//         return updateStyle(feature, lastStatFilter, priceRange, listingDates);
//     });

//     parcelVectorTile.getSource().changed();
// }
