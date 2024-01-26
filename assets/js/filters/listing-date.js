$(function () {
    $('.dpListingDate').datepicker({
        autoclose: false,
        format: "yyyy/mm/dd",
        todayHighlight: true,
        clearBtn: true,
    });
});

// $('#listingDate').on('change', function () {
//     console.log($('#listingDate').val());
// });

var datePickerInstance;
var startDate;
var endDate;

$('input[name="rbListingDate"]').on('change', function () {
    var selectedValue = $('input[name="rbListingDate"]:checked').val();

    if (datePickerInstance) {
        datePickerInstance.destroy();
    }

    datePickerInstance = $('.dpListingDate input').datepicker({
        autoclose: false,
        format: "yyyy/mm/dd",
        todayHighlight: true,
        clearBtn: true,
        multidate: (selectedValue === 'Between') ? 2 : false,
    }).data('datepicker');

    datePickerInstance.picker.on('clearDate', function () {

        console.log(startDate, endDate);
        startDate = endDate = null;
    });
    // datePickerInstance.picker.on('show', function() {
    //     if (selectedValue === 'Between' && startDate && endDate) {
    //         $('.dpListingDate input').datepicker('setDates', [startDate, endDate]);
    //         $('.datepicker tbody td').filter(function() {
    //             var currentDate = new Date($(this).data('date'));
    //             return currentDate >= startDate && currentDate <= endDate;
    //         }).addClass('bg-selected-range');
    //     }
    // });
});



$('.dpListingDate input').on('changeDate', function (e) {
    if (e.dates.length === 1) {
        startDate = endDate = e.dates[0];
    } else if (e.dates.length === 2) {
        startDate = e.dates[0];
        endDate = e.dates[1];
    } else {
        startDate = endDate = null;
    }
});

function filterByListingDate(feature_date, listingDate) {

    if (feature_date) {
        if (listingDate[2] === 'Before' && feature_date < listingDate[0]) {
            return true;
        } else if (listingDate[2] === 'After' && feature_date > listingDate[1]) {
            return true;
        } else if (listingDate[2] === 'Between' && feature_date >= listingDate[0] && feature_date <= listingDate[1]) {
            // console.log(feature_date);
            return true;
        } else {
            return false;
        }
    } else {
        // Handle cases where the feature doesn't have a listing_date property
        return false;
    }
}

// function filterByListingDate(featureStatDate, listingDate) {
//     console.log('date called');
//     var startDate = new Date(listingDate[0]);
//     var endDate = new Date(listingDate[1]);

//     return featureStatDate >= startDate && featureStatDate <= endDate;

//     // if (!isNaN(featureStatDate.getTime()) && listingDate !== null) {
//     //     var startDate = new Date(listingDate[0]);
//     //     var endDate = new Date(listingDate[1]);

//     //     return featureStatDate >= startDate && featureStatDate <= endDate;
//     // }
//     // return false;
// }