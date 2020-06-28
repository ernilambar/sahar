'use strict';

document.addEventListener("DOMContentLoaded",function(){
	const scrollUp = document.getElementById('scrollup');

	if ( scrollUp ) {

		window.addEventListener('scroll', () => {

			var scrollPosition = window.pageYOffset | document.body.scrollTop;

			if ( scrollPosition > 300) {
				scrollUp.classList.add('scroll-on');
			} else {
				scrollUp.classList.remove('scroll-on');
			}
		});

		scrollUp.addEventListener('click', (e) => {
			e.preventDefault();

			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		});
	}
});
