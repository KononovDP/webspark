$(document).ready(() => {

  $('#button-grid').on('click', () => {
    $('#button-list').removeClass('catalog__toggle--active');
    $('#button-grid').addClass('catalog__toggle--active');
    $('#catalog').removeClass('catalog__body--list');
  });
  $('#button-list').on('click', () => {
    $('#button-grid').removeClass('catalog__toggle--active');
    $('#button-list').addClass('catalog__toggle--active');
    $('#catalog').addClass('catalog__body--list');
  })
  
  $(window).on('resize', () => {
    if($(window).width() < 768) {
      $('#catalog').removeClass('catalog__body--list')
    }else{
      if($('#button-list').hasClass('catalog__toggle--active')) {        
        $('#catalog').addClass('catalog__body--list');
      }
    }
  })

  $(() => {
    $(function () {
      $("#datepicker__start").datepicker({
        numberOfMonths: 1,
        onSelect: (selected) => {
          const date = new Date(selected);
          date.setDate(date.getDate() + 1);
          $("#datepicker__end").datepicker("option", "minDate", date);
        }
      });
      $("#datepicker__end").datepicker({
        numberOfMonths: 1,
        onSelect: (selected) => {
          const date = new Date(selected);
          date.setDate(date.getDate() - 1);
          $("#datepicker__start").datepicker("option", "maxDate", date);
        }
      });
  
      $("#show__start").click(() => $('#datepicker__start').datepicker('show', null));
      $("#refresh__start").click(() => $('#datepicker__start').datepicker('setDate', null));
    
      $("#show__end").click(() => $('#datepicker__end').datepicker('show', null));
      $("#refresh__end").click(() => $('#datepicker__end').datepicker('setDate', null));
    });
  } );
})
