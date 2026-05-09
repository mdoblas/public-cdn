jQuery(document).ready(function () {
	var mobile_device = isMobileDevice();
	var allGalleryImages = jQuery('.gallery-image');

	if (allGalleryImages.length > 0 && !mobile_device) {

		jQuery("body").append("<div class='lightbox' style='display: none;'><div class='nav'><button id='prevButton'>&lt;</button><button id='nextButton'>&gt;</button></div><img id='lightboxImage' src='' alt='Imagen ampliada'><p id='lightbox_img_counter'></p><span class='close-button' id='closeButton'>×</span></div>");

		var galleryImages = allGalleryImages;
		var currentIndex = 0;

		allGalleryImages.click(function () {
			galleryImages = getImagesForCarousel(this);
			currentIndex = galleryImages.index(this);

			updateNavVisibility();
			showLightbox(currentIndex);

			jQuery('body').addClass('lock-scroll');
		});

		function getImagesForCarousel(clickedImage) {
			var container = jQuery(clickedImage).closest('.gallery-image-container');

			if (container.length) {
				return container.find('.gallery-image');
			}

			return allGalleryImages.filter(function () {
				return jQuery(this).closest('.gallery-image-container').length === 0;
			});
		}

		function updateNavVisibility() {
			if (galleryImages.length <= 1) {
				jQuery(".lightbox .nav button").css("display", "none");
			} else {
				jQuery(".lightbox .nav button").css("display", "");
			}
		}

		jQuery(".lightbox .nav button, .lightbox .close-button").hover(function () {
			jQuery(this).css("color", "white");
		}, function () {
			jQuery(this).css("color", "#999");
		});

		function showLightbox(index) {
			var lightbox = jQuery('.lightbox');
			var lightboxImage = jQuery('#lightboxImage');

			var currentImage = galleryImages.eq(index);
			var imageUrl = currentImage.attr('src');

			lightboxImage.attr('src', imageUrl);
			jQuery("#lightbox_img_counter").text((index + 1) + "/" + galleryImages.length);

			lightbox.fadeIn();
		}

		jQuery('#prevButton').click(prevImgCustomCarousel);
		jQuery('#nextButton').click(nextImgCustomCarousel);

		jQuery('#closeButton').click(function () {
			jQuery('body').removeClass('lock-scroll');
			jQuery('.lightbox').fadeOut();
		});

		document.addEventListener("keydown", function (event) {
			if (!jQuery('.lightbox').is(':visible')) return;

			switch (event.key) {
				case "Escape":
					jQuery('body').removeClass('lock-scroll');
					jQuery('.lightbox').css("display", "none");
					break;
				case "ArrowRight":
					nextImgCustomCarousel();
					break;
				case "ArrowLeft":
					prevImgCustomCarousel();
					break;
			}
		});

		function prevImgCustomCarousel() {
			currentIndex--;

			if (currentIndex < 0) {
				currentIndex = galleryImages.length - 1;
			}

			showLightbox(currentIndex);
		}

		function nextImgCustomCarousel() {
			currentIndex++;

			if (currentIndex >= galleryImages.length) {
				currentIndex = 0;
			}

			showLightbox(currentIndex);
		}
	}

	function isMobileDevice() {
		if (screen.width <= 767) {
			return true;
		}

		const agent = navigator.userAgent.toLowerCase();
		const keywordsMovil = ['mobile', 'android', 'iphone', 'ipod', 'blackberry', 'windows phone'];
		const keywordsTablet = ['tablet', 'ipad', 'android'];

		for (let keyword of keywordsMovil) {
			if (agent.indexOf(keyword) !== -1) {
				return true;
			}
		}

		for (let keyword of keywordsTablet) {
			if (agent.indexOf(keyword) !== -1) {
				return true;
			}
		}

		return false;
	}
});
