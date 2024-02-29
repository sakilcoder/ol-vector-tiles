"use strict";

$('input[name="rbsale_two_amount"]').change(function () {
  if ($('#rbsale_two_amountGT').is(':checked') || $('#rbsale_two_amountLT').is(':checked')) {
    $('#sale_two_amount2').hide();
  } else if ($('#rbsale_two_amountBetween').is(':checked')) {
    $('#sale_two_amount2').show();
  }
});

function filterBysale_two_amount(feature, bblength) {
  var featureValue = feature.get('sale_two_amount');

  if (featureValue && bblength.minValue) {
    featureValue = parseFloat(featureValue);

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