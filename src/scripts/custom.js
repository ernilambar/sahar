'use strict';

// Debounce helper.
const debouncer = ( a, b = 250, c ) => (...d ) => clearTimeout( c, c=setTimeout( a, b, ...d ) )

document.addEventListener("DOMContentLoaded",function(){
	const scrollUp = document.getElementById('scrollup');

	if ( scrollUp ) {

		let scrollHandler = debouncer(function() {
			var scrollPosition = window.pageYOffset | document.body.scrollTop;

			if ( scrollPosition > 300) {
				scrollUp.classList.add('scroll-on');
			} else {
				scrollUp.classList.remove('scroll-on');
			}
		}, 250);

		window.addEventListener('scroll', scrollHandler);

		scrollUp.addEventListener('click', (e) => {
			e.preventDefault();

			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		});
	}
});
