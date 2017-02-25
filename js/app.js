(function () {
  'use strict';
})();

$(document).ready( () => {
  let clicks = -1; // -1 to ignore first click
  let fillBackground = 0;
  let seconds = 0;

  const $html = $('html');
  const $title = $('.triggerReload');
  const $clickHolder = $('.clickHolder');

  $html.css('cursor', 'pointer'); // Helps user know entire document can be clicked

  $('.modalWrapper').on('click', () => {
    $('.modalWrapper').hide();

    let stopTimeAt20 = setInterval( () => { 
      // Use pre-increment operator to update value
      if(++seconds < 20) {
        console.log('if block = ' + seconds + 's'); // For visual aid in console
        let fillAlpha = (fillBackground += 0.05);
        $title.css('background', 'rgba(0, 0, 0,' + fillAlpha + ')');
      } else {
        console.log('else block = ' + seconds +'s'); // For visual aid in console

        // When finished, update with a red-family color
        $title.css('background', 'rgba(242, 24, 24, .75)');

        clearInterval(stopTimeAt20);
      }
    }, 1000); // Fire function every second until seconds === 20

    setTimeout( () => { 
      $html.off('click'); // Use off method to stop event handler
      $html.css('cursor', 'default'); // After 20 seconds, restore defaults

      const singularPlural = (clicks === 1 ? ' time.' : ' times.'); // Ternary operator, store singular/plural in const

      $('.message').append('<div>You clicked ' + clicks + singularPlural + '</div>').hide().fadeIn(2000);

      $(".removeSelect").removeClass('removeSelect');

      // In case user is clicking top, two second delay before ability to "restart" (refresh)
      setTimeout( () => {
        $title.wrapInner('<a href=""' + 'onclick=window.location.reload(true);' + '></a>');
      }, 2000);

    }, 20000);

    $('html').on('click', () => {
      // Use pre-increment operator
        // So -1 is zeroed at onset
      $clickHolder.text(++clicks);
    });

  });
  
}); // ready() method
