$(document).ready(function() {
	var utm_source = getUrlParameter('utm_source');
	var utm_medium = getUrlParameter('utm_medium');
	var utm_term = getUrlParameter('utm_term');
	var utm_campaign = getUrlParameter('utm_campaign');
	$('input[name=utm_source]').val(utm_source);
	$('input[name=utm_medium]').val(utm_medium);
	$('input[name=utm_term]').val(utm_term);
	$('input[name=utm_campaign]').val(utm_campaign);
});

// script to get utm
var getUrlParameter = function getUrlParameter(sParam)
{
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;
	for (i = 0; i < sURLVariables.length; i++)
	{
		sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] === sParam)
		{
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};


function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/" + "; domain=" + document.domain;
}

function clearF1Cookie() {
	setCookie("name","",-1);
	setCookie("email","",-1);
	setCookie("last1","",-1);
}
$(window).load(function() {
	$("input.name").val(getCookie("name"));
	$("input.email").val(getCookie("email"));
	$("input.phone").val(getCookie("phone"));
});

// $('.btn-anchor').on('click', function(e) {
// 	e.preventDefault();
// 	anchorScroller(this, 1500);
// });


// UTM SCRIPTS //
var utm ='?' + window.location.search.substr(1);
$('.btn-utm').each(function(){
	var url = $(this).attr('href');
	$(this).attr('href', url + '?' + utm);
});
var tyurl = $('#checkrespo').val();
$('#checkrespo, #emailexist').val(tyurl + utm);
//END UTM SCRIPTS //



var lazyLoadInstance = new LazyLoad({
	// Your custom settings go here
});

$(document).ready(function(){
	$.getJSON('https://ipapi.co/json/?key=e4192db949f63bdb4a84f9d73bf5cafa9921a6a5', function (data) {
		var obj = data;
		var country = obj.country;
		var timezone = obj.timezone;
		console.log(obj)

		$('.module__time_kyiv b').each(function(){
			var time = $(this).text();
			var kievTime = moment.tz('2020-11-11 ' + time , 'Europe/Kiev');
			// var localTime = kievTime.clone().tz(timezone);
			var moscowTime = kievTime.clone().tz('Europe/Moscow');
			$(this).closest('.module__time').find('.msk_time').text(moscowTime.format('HH:mm'));
		});

		if(getCookie("phone")){
			$('input.phone').val(getCookie("phone"));
		}
		else {
			$('input.phone').val(obj.country_calling_code);
		}
		$("input.phone").intlTelInput({
			utilsScript       : 'js/utils.js',
			defaultCountry    : 'auto',
			separateDialCode  : false,
			nationalMode      : false,
			initialCountry    : obj.country,
			preferredCountries: ['ua', 'ru', 'by', 'kz']
		});

		if (obj.country_code != 'UA') {
			$('.notsng_text').hide();
		} else {
			$('.sng_text').hide();
		}

		if (obj.country_code == 'UA') {
			$('.world_text, .ru_text').hide();
		}

		if (obj.country_code == 'RU') {
			$('.world_text, .ua_text').hide();
		}

		if (obj.country_code != 'UA' && obj.country_code != 'RU') {
			$('.ua_text, .ru_text').hide();
		}

	});
})



$('form .subm').on('click', function(e){
	e.preventDefault();
	var form = $(this).closest('form');
	form.addClass('loading');
	setTimeout(function(){
		form.submit();
	}, 1000)
});
new WOW().init();

$('.item__question').on('click', function(){
	$(this).closest('.item').toggleClass('active');
})

// SHOW BUTTON IN TIME //
// $(document).ready(function() {
// 	function showContentAfterTargetDate () {
// 		var targetElement = $('[data-targetdate]'),
// 			ted = targetElement.data('targetdate').split(',');
// 			date = new Date(),
// 			curentDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()).getTime(),
// 			targetDate = new Date(ted[0], ted[1], ted[2], ted[3], ted[4]).getTime();
// 		if (curentDate > targetDate) {
// 			targetElement.fadeIn()
// 		} else {
// 			setTimeout(showContentAfterTargetDate, 1000);
// 		}
// 	}
// 	showContentAfterTargetDate();
// });
// END SHOW BUTTON IN TIME //

$('a[href*="#"]')
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
		// On-page links
		$('.header').removeClass('active');
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			&&
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				var headerHeight = $('.header').height();
				console.log(headerHeight);
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1500, function() {
					// Callback after animation
					// Must change focus!
					var $target = $(target);
					$target.focus();
					if ($target.is(":focus")) { // Checking if the target was focused
						return false;
					} else {
						$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					};
				});
			}
		}
	});

$('.reviews__slider').slick({
	slidesToShow: 5,
	slidesToScroll: 1,
	centerMode:true,
	swipeToSlide: true,
	responsive: [
		 {
			 breakpoint: 1260,
			 settings: {
				 slidesToShow: 3,
			 }
		 },
			{
			 breakpoint: 760,
			 settings: {
					// dots: true,
					slidesToShow: 1,
			 }
			},
	 ]
});

$('.profit__slider').slick({
	slidesToShow: 2,
	slidesToScroll:1,
	rows: 2,
	swipeToSlide: true,
	variableWidth: true,
	dots: true
});

$('.students__logos').slick({
	variableWidth: true,
	rows: 2,
	arrows: false,
	autoplay: true,
	autoplaySpeed: 0,
	speed: 9000,
	cssEase: 'linear',
	pauseOnHover: true,
	swipeToSlide: true,
	responsive: [
		 {
			 breakpoint: 760,
			 settings: {
				 rows: 4,
				 speed: 6000,
			 }
		 },
	 ]
});

if($(window).width() < 1260){
	$('.speakers__list').slick({
		slidesToShow:2,
		swipeToSlide: true,
		responsive: [
			 {
				 breakpoint: 760,
				 settings: {
					 slidesToShow: 1,
				 }
			 },
		 ]
	})
}

// if($(window).width() < 760){
// 	$('.package-desc').remove();
// 	$('.packages__wrap').slick({
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		arrows: false,
// 		adaptiveHeight: true,
// 		// fade: true,
// 		asNavFor: '.packages__nav'
// 	});
// 	$('.packages__nav').slick({
// 		// slidesToShow: 3,
// 		variableWidth: true,
// 		slidesToScroll: 1,
// 		asNavFor: '.packages__wrap',
// 		dots: false,
// 		arrows: false,
// 		centerMode: true,
// 		focusOnSelect: true
// 	});
// }

$('.header__burger').on('click', function(){
	$('.header').toggleClass('active');
});

$('.module__header').on('click', function(){
	if($(this).closest('.module').hasClass('active')){
		$(this).closest('.module').toggleClass('active');
	}
	else {
		$('.module').removeClass('active');
		$(this).closest('.module').addClass('active');
		if($(window).width() < 1260){
			var targetSelector = $(this).closest('.module').attr('id');
			var $target = $('#'+targetSelector);
			$('html, body').animate(
				{
						scrollTop: $target.offset().top
				}, {
					duration: 1000,
					step: function( now, fx ) {
					var newOffset = $target.offset().top;
					if(fx.end !== newOffset)
						fx.end = newOffset;
					}
				}
			);
		}
	}
});

$('.speaker').on('click', function(){
	$(this).toggleClass('active');
});

// var waypoints = $('#main, #packages, #reviews, #register, #calltoaction').waypoint({
//   handler: function(direction) {
//     $('.header__btn').addClass('hidden');
//   }
// })

// var waypoints = $('#for, #speakers, #program, #about, #how, #profit, #employment, #students, #faq').waypoint({
//   handler: function(direction) {
//     $('.header__btn').removeClass('hidden');
//   }
// });

$('.input__wrap').on('focusin', function(){
	$(this).addClass('focused');
});


