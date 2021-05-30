$(document).ready(function () {
	$(".carousel__inner").slick({
		speed: 1000,
		adaptiveHeight: false,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.svg"></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				dots: true,
				arrows: false
			}
		}]
	});

	$("ul.catalog__tabs").on("click", "li:not(catalog__tab_active)", function () {
		$(this)
			.addClass("catalog__tab_active")
			.siblings()
			.removeClass("catalog__tab_active")
			.closest("div.container")
			.find("div.catalog__content")
			.removeClass("catalog__content_active")
			.eq($(this).index())
			.addClass("catalog__content_active");
	});

	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on("click", function (e) {
				e.preventDefault();
				$(".catalog__item__content")
					.eq(i)
					.toggleClass("catalog__item__content_active");
				$(".catalog__item__list")
					.eq(i)
					.toggleClass("catalog__item__list_active");
			});
		});
	}
	toggleSlide(".catalog__link_back");
	toggleSlide(".catalog__link");

	// MODAL WINDOWS

	$("[data-modal=consultation]").on("click", function () {
		$(".overlay, #consultation").fadeIn("slow");
	});
	$(".modal__close").on("click", function () {
		$(".overlay, #consultation, #order, #thanks").fadeOut("slow");
	});

	$(".button_mini").each(function (i) {
		$(this).on("click", function () {
			$("#order .modal__descr").text($(".catalog__subtitle").eq(i).text());
			$(".overlay, #order").fadeIn("0.1s");
		});
	});

	function valideForms(form) {
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true,
				},
			},
			messages: {
				name: "Пожалуйста, введите свое имя",
				phone: "Пожалуйста, введите свой номер",
				email: {
					required: "Нам нужен ваш e-mail для контакта с вами",
					email: "Введите e-mail в формате: name@domain.com",
				},
			},
		});
	}
	valideForms("#consultation-form");
	valideForms("#consultation form");
	valideForms("#order form");

	$("input[name=phone]").mask("+38 (999) 999-99-99");

	$("form").submit(function (e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "src/mailer/smart.php",
			data: $(this).serialize(),
		}).done(function () {
			$(this).find("input").val("");
			$("#consultation, #order").fadeOut();
			$(".overlay, #thanks").fadeIn("slow");

			$("form").trigger("reset");
		});
		return false;
	});

	// SMOOTH SCROLL AND PAGEUP

	$(window).scroll(function () {
		if ($(this).scrollTop() > 1150) {
			$(".pageup").fadeIn();
		} else $(".pageup").fadeOut();
	});
	$("a[href=#up]").click(function () {
		const _href = $(this).attr("href");
		$("html, body").animate({
			scrollTop: $(_href).offset().top + "px"
		});
		return false;
	});
	new WOW().init();
});

const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		const blockID = anchor.getAttribute('href').substr(1);

		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	});
}