( function( $ ) {

	'use strict';

	$( document ).ready( function( $ ) {

		let test = 'test';

		// Implement go to top.
		if ( $( '#scrollup' ).length > 0 ) {
			$(window).scroll( function () {
			    if ( $( this ).scrollTop() > 100 ) {
			        $( '#scrollup' ).addClass('scroll-on');
			    } else {
			        $('#scrollup').removeClass('scroll-on');
			    }
			});

			$( '#scrollup' ).on( 'click', function () {
			    $( 'body, html' ).animate({
			        scrollTop: 0
			    }, 500 );
			    return false;
			});
		}
	});

} )( jQuery );
