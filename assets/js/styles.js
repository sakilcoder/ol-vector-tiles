var style_simple = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(173, 216, 230, 0.2)',
  }),
  stroke: new ol.style.Stroke({
    color: '#880000',
    width: 1
  })
});

// function updateStyle(feature, lastStatFilter, priceRange, listingDate) {
//   console.log(lastStatFilter, priceRange, listingDate);
//   var isLastStatMatch = (lastStatFilter !== null) ? filterByLastStat(feature, lastStatFilter) : true;
//   var isPriceRangeMatch = (priceRange !== null) ? filterByPriceRange(feature, priceRange) : true;
//   var isListingDateMatch = (listingDate !== null) ? filterByListingDate(new Date(feature.get('stat1_date1')), listingDate) : true;

//   if (isLastStatMatch && isPriceRangeMatch && isListingDateMatch) {
//       return style_simple;
//   } else {
//       return null;
//   }
// }

// function updateStyle(feature, lastStatFilter, priceRange, listingDate) {
//   var isLastStatMatch = filterByLastStat(feature, lastStatFilter);
//   var isPriceRangeMatch = filterByPriceRange(feature, priceRange);
//   var isListingDateMatch = filterByListingDate(new Date(feature.get('stat1_date1')), listingDate);

//   if (isLastStatMatch && isPriceRangeMatch && isListingDateMatch) {
//     return style_simple;
//   } else {
//     return null;
//   }
// }
