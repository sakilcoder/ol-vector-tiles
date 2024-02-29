$('input[name="rblast_sale_amount"]').change(function () {
    if ($('#rblast_sale_amountGT').is(':checked') || $('#rblast_sale_amountLT').is(':checked')) {
        $('#last_sale_amount2').hide();
    } else if ($('#rblast_sale_amountBetween').is(':checked')) {
        $('#last_sale_amount2').show();
    }
});

function filterBylast_sale_amount(feature, bblength) {
    var featureValue = feature.get('last_sale_amount');
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