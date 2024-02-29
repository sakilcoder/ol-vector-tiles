
function filterBylegalCharacteristics(feature, legalCharacteristics) {

    if(legalCharacteristics.includes('coastal')){
        var featureValue = feature.get('coastal');
        if (featureValue=="1") {
            return style_simple;
        }
    }

    if(legalCharacteristics.includes('hillside')){
        var featureValue = feature.get('hillside');
        if (featureValue==1) {
            return style_simple;
        }
    }

    if(legalCharacteristics.includes('oppzone')){
        var featureValue = feature.get('oppzone');
        if (featureValue!=null) {
            return style_simple;
        }
    }

    return null;

}