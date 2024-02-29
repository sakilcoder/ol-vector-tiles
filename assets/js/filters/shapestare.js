$('input[name="rbShapestare"]').change(function () {
    if ($('#rbShapestareGT').is(':checked') || $('#rbShapestareLT').is(':checked')) {
        $('#shapestare2').hide();
    } else if ($('#rbShapestareBetween').is(':checked')) {
        $('#shapestare2').show();
    }
});

function filterByShapestare(feature, shapestare) {
    var featureValue = feature.get('shapestare');
    if (featureValue && shapestare.minValue) {
        featureValue=parseInt(featureValue);
        if (shapestare.condition == 'greater' && featureValue >= shapestare.minValue) {
            return style_simple;
        } else if (shapestare.condition == 'less' && featureValue <= shapestare.minValue) {
            return style_simple;
        } else if (featureValue >= shapestare.minValue && featureValue <= shapestare.maxValue) {
            console.log(shapestare);
            return style_simple;
        }

    }
    return null;

}
