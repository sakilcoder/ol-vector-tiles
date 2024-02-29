$('input[name="rbLotDepth"]').change(function () {
    if ($('#rbLotDepthGT').is(':checked') || $('#rbLotDepthLT').is(':checked')) {
        $('#lotDepth2').hide();
    } else if ($('#rbLotDepthBetween').is(':checked')) {
        $('#lotDepth2').show();
    }
});

function filterByLotDepth(feature, bblength) {
    var featureValue = feature.get('bblength');
    if (featureValue && bblength.minValue) {
        featureValue=parseFloat(featureValue);
        if (bblength.condition == 'greater' && featureValue >= bblength.minValue) {
            return style_simple;
        } else if (bblength.condition == 'less' && featureValue <= bblength.minValue) {
            return style_simple;
        } else if (featureValue >= bblength.minValue && featureValue <= bblength.maxValue) {
            return style_simple;
        }

    }
    return null;

}