'use strict';

const debouncer = (callback, wait) => {
  let timeout = null
  return (...args) => {
    const next = () => callback(...args)
    clearTimeout(timeout)
    timeout = setTimeout(next, wait)
  }
}

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
