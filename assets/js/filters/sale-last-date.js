$(function () {
    $('.dplast_sale_date').datepicker({
        autoclose: false,
        format: "yyyy/mm/dd",
        todayHighlight: true,
        clearBtn: true,
    });
});

var datePickerInstanceLastSale;
var startLastSaleDate;
var endLastSaleDate;

$('input[name="rblast_sale_date"]').on('change', function () {
    var selectedValue = $('input[name="rblast_sale_date"]:checked').val();

    if (datePickerInstanceLastSale) {
        datePickerInstanceLastSale.destroy();
    }

    datePickerInstanceLastSale = $('.dplast_sale_date input').datepicker({
        autoclose: false,
        format: "yyyy/mm/dd",
        todayHighlight: true,
        clearBtn: true,
        multidate: (selectedValue === 'Between') ? 2 : false,
    }).data('datepicker');

    datePickerInstanceLastSale.picker.on('clearDate', function () {

        console.log(startLastSaleDate, endLastSaleDate);
        startLastSaleDate = endLastSaleDate = null;
    });
});



$('.dplast_sale_date input').on('changeDate', function (e) {
    if (e.dates.length === 1) {
        startLastSaleDate = endLastSaleDate = e.dates[0];
    } else if (e.dates.length === 2) {
        startLastSaleDate = e.dates[0];
        endLastSaleDate = e.dates[1];
    } else {
        startLastSaleDate = endLastSaleDate = null;
    }
});

function filterBylast_sale_date(feature, last_sale_date) {
    var feature_date = feature.get('last_sale_date');
    if (feature_date) {
        
        feature_date = new Date(feature_date);
        // console.log(feature_date > last_sale_date[1]);
        if (last_sale_date[2] === 'Before' && feature_date < last_sale_date[0]) {
            return style_simple;
        } else if (last_sale_date[2] === 'After' && feature_date > last_sale_date[0]) {
            
            return style_simple;
        } else if (last_sale_date[2] === 'Between' && feature_date >= last_sale_date[0] && feature_date <= last_sale_date[1]) {
            return style_simple;
        } else {
            return null;
        }
    } else {
        return null;
    }
}
