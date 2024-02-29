
function filterByLotType(feature, lotTypes) {
    var featureValue = feature.get('lottype');
    if (featureValue) {
        if (lotTypes.includes(featureValue)) {
            return style_simple;
        }
    }
    return null;

}