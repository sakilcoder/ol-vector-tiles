$("#priceRange").slider();

function filterByPriceRange(feature, priceRange) {
    var featureListPrice = feature.get('list_price');
    if (featureListPrice && priceRange && featureListPrice >= priceRange[0] && featureListPrice <= priceRange[1]) {
        return style_simple;
    }
    return null;
}
