$('input[name="rbLotWidth"]').change(function () {
    if ($('#rbLotWidthGT').is(':checked') || $('#rbLotWidthLT').is(':checked')) {
        $('#lotWidth2').hide();
    } else if ($('#rbLotWidthBetween').is(':checked')) {
        $('#lotWidth2').show();
    }
});

function filterByLotWidth(feature, bbwidth) {
    var featureValue = feature.get('bbwidth');
    if (featureValue && bbwidth.minValue) {
        featureValue=parseFloat(featureValue);
        if (bbwidth.condition == 'greater' && featureValue >= bbwidth.minValue) {
            return style_simple;
        } else if (bbwidth.condition == 'less' && featureValue <= bbwidth.minValue) {
            return style_simple;
        } else if (featureValue >= bbwidth.minValue && featureValue <= bbwidth.maxValue) {
            return style_simple;
        }

    }
    return null;

}