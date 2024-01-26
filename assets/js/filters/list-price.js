$("#priceRange").slider();

// $("#priceRange").on("slide", function (slideEvt) {
//     console.log(slideEvt.value);
//     updateParcelVectorTile();
// });

// function filterByPriceRange(feature, priceRange) {
//     var listPrice = feature.get('list_price');
//     if (!listPrice || listPrice < priceRange[0] || listPrice > priceRange[1]) {
//         return false;
//     }

//     return true;
// }

// function filterByPriceRange(feature, priceRange) {
//     var featureListPrice = feature.get('list_price');

//     // Check if the feature has the 'list_price' property
//     if (featureListPrice !== undefined && priceRange !== null) {
//         return featureListPrice >= priceRange[0] && featureListPrice <= priceRange[1];
//     }

//     // Handle cases where the feature doesn't have the 'list_price' property
//     return false;
// }

function filterByPriceRange(feature, priceRange) {
    console.log('price called');
    var featureListPrice = feature.get('list_price');

    // Log information for debugging
    console.log('featureListPrice:', featureListPrice);
    console.log('priceRange:', priceRange);

    // Check if the feature has the 'list_price' property
    if (featureListPrice !== undefined && priceRange !== null) {
        console.log('Filtering...');
        return featureListPrice >= priceRange[0] && featureListPrice <= priceRange[1];
    }

    // Handle cases where the feature doesn't have the 'list_price' property
    console.log('Skipped due to missing data...');
    return false;
}