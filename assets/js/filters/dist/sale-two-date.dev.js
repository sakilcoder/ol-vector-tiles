"use strict";

$(function () {
  $('.dpsale_two_date').datepicker({
    autoclose: false,
    format: "yyyy/mm/dd",
    todayHighlight: true,
    clearBtn: true
  });
});
var datePickerInstanceSaleTwo;
var startSaleTwoDate;
var endSaleTwoDate;
$('input[name="rbsale_two_date"]').on('change', function () {
  var selectedValue = $('input[name="rbsale_two_date"]:checked').val();

  if (datePickerInstanceSaleTwo) {
    datePickerInstanceSaleTwo.destroy();
  }

  datePickerInstanceSaleTwo = $('.dpsale_two_date input').datepicker({
    autoclose: false,
    format: "yyyy/mm/dd",
    todayHighlight: true,
    clearBtn: true,
    multidate: selectedValue === 'Between' ? 2 : false
  }).data('datepicker');
  datePickerInstanceSaleTwo.picker.on('clearDate', function () {
    console.log(startSaleTwoDate, endSaleTwoDate);
    startSaleTwoDate = endSaleTwoDate = null;
  });
});
$('.dpsale_two_date input').on('changeDate', function (e) {
  if (e.dates.length === 1) {
    startSaleTwoDate = endSaleTwoDate = e.dates[0];
  } else if (e.dates.length === 2) {
    startSaleTwoDate = e.dates[0];
    endSaleTwoDate = e.dates[1];
  } else {
    startSaleTwoDate = endSaleTwoDate = null;
  }
});

function filterBysale_two_date(feature, sale_two_date) {
  var feature_date = feature.get('sale_two_date');

  if (feature_date) {
    feature_date = new Date(feature_date);

    if (sale_two_date[2] === 'Before' && feature_date < sale_two_date[0]) {
      return style_simple;
    } else if (sale_two_date[2] === 'After' && feature_date > sale_two_date[0]) {
      return style_simple;
    } else if (sale_two_date[2] === 'Between' && feature_date >= sale_two_date[0] && feature_date <= sale_two_date[1]) {
      return style_simple;
    } else {
      return null;
    }
  } else {
    return null;
  }
}