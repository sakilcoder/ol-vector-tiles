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
    title: 'Parcel Map',
    style: style_simple,
    source: constructSource()
});

function getMinDate(when) {
    if (when == 'Before') {
        return new Date().setHours(0, 0, 0, 0);
    } else {
        return new Date('1971/01/01').setHours(0, 0, 0, 0);
    }
}

function updateParcelVectorTile() {

    parcelVectorTile.setStyle(style_simple);

    // ----------priceRange----------
    var priceRange = $("#priceRange").val();
    priceRange = priceRange.split(',');
    priceRange = [parseInt(priceRange[0]), parseInt(priceRange[1])];

    if (priceRange[0] != 0 || priceRange[1] != 65000000) {
        parcelVectorTile.setStyle(function (feature) {
            return filterByPriceRange(feature, priceRange);
        });
    }

    // ----------lastStat------------
    var lastStat = $('#lastStat').val();
    if (lastStat !== 'All') {
        parcelVectorTile.setStyle(function (feature) {
            return filterByLastStat(feature, lastStat);
        });
    }

    // ----------listingDate------------
    var listingDateVal = $("#listingDate").val();
    var listingDate = listingDateVal.split(',');

    let sdate = new Date('1971/01/01').setHours(0, 0, 0, 0);
    let edate = new Date().setHours(0, 0, 0, 0);

    if (listingDate.length == 0 || listingDate[0] == '') {
        sdate = getMinDate($('input[name="rbListingDate"]:checked').val());
    } else {
        sdate = new Date(listingDate[0]).setHours(0, 0, 0, 0);
        edate = listingDate.length > 1 ? new Date(listingDate[1]).setHours(0, 0, 0, 0) : edate;
    }

    if (sdate > edate) {
        let tdate = sdate;
        sdate = edate;
        edate = tdate;
    }

    var listingDates = [sdate, edate, $('input[name="rbListingDate"]:checked').val()];

    if (listingDateVal !== null && listingDateVal !== '') {
        parcelVectorTile.setStyle(function (feature) {
            return filterByListingDate(feature, listingDates);
        });
    }

    // ----------shapestare------------
    var shapestare_condition = $('input[name="rbShapestare"]:checked').val();
    var shapestare_minValue = $('#shapestare1').val();
    var shapestare_maxValue = $('#shapestare2').val();
    if (shapestare_minValue) {
        parcelVectorTile.setStyle(function (feature) {
            return filterByShapestare(feature, { condition: shapestare_condition, minValue: parseInt(shapestare_minValue), maxValue: parseInt(shapestare_maxValue) });
        });
    }

    // ----------Rectangularity----------
    var rectangularity = $("#rectangularity").val();
    rectangularity = rectangularity.split(',');
    rectangularity = [parseFloat(rectangularity[0]), parseFloat(rectangularity[1])];

    if (rectangularity[0] != 0 || rectangularity[1] != 1) {
        parcelVectorTile.setStyle(function (feature) {
            return filterByRectangularity(feature, rectangularity);
        });
    }

    // ----------Lot Depth------------
    var condition_lot_depth = $('input[name="rbLotDepth"]:checked').val();
    var minValue_lot_depth = $('#lotDepth1').val();
    var maxValue_lot_depth = $('#lotDepth2').val();
    if (minValue_lot_depth) {
        parcelVectorTile.setStyle(function (feature) {
            return filterByLotDepth(feature, { condition: condition_lot_depth, minValue: parseFloat(minValue_lot_depth), maxValue: parseFloat(maxValue_lot_depth) });
        });
    }

    // ----------Lot Width------------
    var condition_lot_width = $('input[name="rbLotWidth"]:checked').val();
    var minValue_lot_width = $('#lotWidth1').val();
    var maxValue_lot_width = $('#lotWidth2').val();
    if (minValue_lot_width) {
        parcelVectorTile.setStyle(function (feature) {
            return filterByLotWidth(feature, { condition: condition_lot_width, minValue: parseFloat(minValue_lot_width), maxValue: parseFloat(maxValue_lot_width) });
        });
    }

    // ---------------Lot Type---------------
    var isInteriorChecked = $('#cbInterior').prop('checked');
    var isCornerChecked = $('#cbCorner').prop('checked');
    var isThroughChecked = $('#cbThrough').prop('checked');
    var isPeninsulaChecked = $('#cbPeninsula').prop('checked');

    var lotTypes = [];
    if (isInteriorChecked) {
        lotTypes.push('Interior');
    }
    
    if (isCornerChecked) {
        lotTypes.push('Corner');
    }
    
    if (isThroughChecked) {
        lotTypes.push('Through');
    }
    
    if (isPeninsulaChecked) {
        lotTypes.push('Peninsula');
    }

    if (lotTypes.length>0) {
        parcelVectorTile.setStyle(function (feature) {
            return filterByLotType(feature, lotTypes);
        });
    }

    //-----------Last Sale Date------------
    var last_sale_dateVal = $("#last_sale_date").val();
    var last_sale_date = last_sale_dateVal.split(',');

    let sLastSaleDate = new Date('1971/01/01').setHours(0, 0, 0, 0);
    let eLastSaleDate = new Date().setHours(0, 0, 0, 0);

    if (last_sale_date.length == 0 || last_sale_date[0] == '') {
        sLastSaleDate = getMinDate($('input[name="rblast_sale_date"]:checked').val());
    } else {
        sLastSaleDate = new Date(last_sale_date[0]).setHours(0, 0, 0, 0);
        eLastSaleDate = last_sale_date.length > 1 ? new Date(last_sale_date[1]).setHours(0, 0, 0, 0) : eLastSaleDate;
    }

    if (sLastSaleDate > eLastSaleDate) {
        let tdate = sLastSaleDate;
        sLastSaleDate = eLastSaleDate;
        eLastSaleDate = tdate;
    }

    var last_sale_dates = [sLastSaleDate, eLastSaleDate, $('input[name="rblast_sale_date"]:checked').val()];

    if (last_sale_dateVal !== null && last_sale_dateVal !== '') {
        parcelVectorTile.setStyle(function (feature) {
            return filterBylast_sale_date(feature, last_sale_dates);
        });
    }

    // ----------Last Sale Amount------------
    var condition_last_sale_amount = $('input[name="rblast_sale_amount"]:checked').val();
    var minValue_last_sale_amount = $('#last_sale_amount1').val();
    var maxValue_last_sale_amount = $('#last_sale_amount2').val();
    if (minValue_last_sale_amount) {
        parcelVectorTile.setStyle(function (feature) {
            return filterBylast_sale_amount(feature, { condition: condition_last_sale_amount, minValue: parseFloat(minValue_last_sale_amount), maxValue: parseFloat(maxValue_last_sale_amount) });
        });
    }
    
    //----------- Sale Two Date------------
    var sale_two_dateVal = $("#sale_two_date").val();
    var sale_two_date = sale_two_dateVal.split(',');

    let sSaleTwoDate = new Date('1971/01/01').setHours(0, 0, 0, 0);
    let eSaleTwoDate = new Date().setHours(0, 0, 0, 0);

    if (sale_two_date.length == 0 || sale_two_date[0] == '') {
        sSaleTwoDate = getMinDate($('input[name="rbsale_two_date"]:checked').val());
    } else {
        sSaleTwoDate = new Date(sale_two_date[0]).setHours(0, 0, 0, 0);
        eSaleTwoDate = sale_two_date.length > 1 ? new Date(sale_two_date[1]).setHours(0, 0, 0, 0) : eSaleTwoDate;
    }

    if (sSaleTwoDate > eSaleTwoDate) {
        let tdate = sSaleTwoDate;
        sSaleTwoDate = eSaleTwoDate;
        eSaleTwoDate = tdate;
    }

    var sale_two_dates = [sSaleTwoDate, eSaleTwoDate, $('input[name="rbsale_two_date"]:checked').val()];

    if (sale_two_dateVal !== null && sale_two_dateVal !== '') {
        parcelVectorTile.setStyle(function (feature) {
            return filterBysale_two_date(feature, sale_two_dates);
        });
    }

    // ----------Last Sale Amount------------
    var condition_sale_two_amount = $('input[name="rbsale_two_amount"]:checked').val();
    var minValue_sale_two_amount = $('#sale_two_amount1').val();
    var maxValue_sale_two_amount = $('#sale_two_amount2').val();
    if (minValue_sale_two_amount) {
        parcelVectorTile.setStyle(function (feature) {
            return filterBysale_two_amount(feature, { condition: condition_sale_two_amount, minValue: parseFloat(minValue_sale_two_amount), maxValue: parseFloat(maxValue_sale_two_amount) });
        });
    }


    // ---------------Legal Characteristics---------------
    var iscbcoastalChecked = $('#cbcoastal').prop('checked');
    var iscbhillsideChecked = $('#cbhillside').prop('checked');
    var iscboppzoneChecked = $('#cboppzone').prop('checked');

    var legalCharacteristics = [];
    if (iscbcoastalChecked) {
        legalCharacteristics.push('coastal');
    }
    
    if (iscbhillsideChecked) {
        legalCharacteristics.push('hillside');
    }
    
    if (iscboppzoneChecked) {
        legalCharacteristics.push('oppzone');
    }
    
    if (legalCharacteristics.length>0) {
        parcelVectorTile.setStyle(function (feature) {
            return filterBylegalCharacteristics(feature, legalCharacteristics);
        });
    }
    


    // filter affects here

    parcelVectorTile.getSource().changed();
}

