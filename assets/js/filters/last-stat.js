// $('#lastStatFilter').on('change', function () {
//     updateParcelVectorTile();
// });

// function filterByLastStat(feature, lastStatFilter) {
//     var lastStat = feature.get('last_stat');

//     if (lastStat === undefined && lastStatFilter != 'all')
//         return false;
//     return lastStatFilter === 'all' || lastStat === lastStatFilter;
// }

function filterByLastStat(feature, lastStatFilter) {
    console.log('last stat called');
    if (lastStatFilter === 'all') {
        return true;
    }

    var featureLastStat = feature.get('last_stat');

    // Check if the feature has the 'last_stat' property
    if (featureLastStat !== undefined && lastStatFilter !== null) {
        return featureLastStat === lastStatFilter;
    }

    // Handle cases where the feature doesn't have the 'last_stat' property
    return false;
}
