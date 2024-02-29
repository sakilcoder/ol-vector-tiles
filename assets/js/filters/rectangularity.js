$("#rectangularity").slider();

function filterByRectangularity(feature, rectangularity) {
    var feature_value = feature.get('recty');
    if(feature_value){
        feature_value=parseFloat(feature_value);
        if (feature_value && feature_value >= rectangularity[0] && feature_value <= rectangularity[1]) {
            return style_simple;
        }
    }
    return null;
}