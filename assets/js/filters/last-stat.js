function filterByLastStat(feature, lastStat) {
    var featureLastStat = feature.get('last_stat');
    if (featureLastStat && lastStat && featureLastStat === lastStat) {
        return style_simple;
    }
    return null;
}
