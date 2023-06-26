            jQuery(document).ready(function () {

                var mobile_device = isMobileDevice();
                var galleryImages = jQuery('.gallery-image');

                if (galleryImages.length > 0 && !mobile_device) {

                    jQuery("body").append("<div class='lightbox' style='display: none;'><div class='nav'><button id='prevButton'>&lt;</button><button id='nextButton'>&gt;</button></div><img id='lightboxImage' src='' alt='Imagen ampliada'><span class='close-button' id='closeButton'>×</span></div>");

                    if (galleryImages.length === 1) {
                        jQuery(".lightbox .nav button").css("display", "none");
                    }

                    jQuery(".lightbox .nav button, .lightbox .close-button").hover(function () {
                        jQuery(this).css("color", "white");
                    }, function () {
                        jQuery(this).css("color", "#999");
                    });

                    var currentIndex = 0;

                    // Mostrar la imagen ampliada al hacer clic
                    galleryImages.click(function () {
                        currentIndex = galleryImages.index(this);
                        showLightbox(currentIndex);
                        jQuery('body').addClass('lock-scroll');
                    });

                    // Mostrar la imagen ampliada en la luz de fondo
                    function showLightbox(index) {
                        var lightbox = jQuery('.lightbox');
                        var lightboxImage = jQuery('#lightboxImage');

                        var currentImage = galleryImages.eq(index);
                        var imageUrl = currentImage.attr('src');
                        lightboxImage.attr('src', imageUrl);

                        lightbox.fadeIn();
                    }

                    // Cambiar a la imagen anterior
                    jQuery('#prevButton').click(prevImgCustomCarousel);

                    // Cambiar a la siguiente imagen
                    jQuery('#nextButton').click(nextImgCustomCarousel);

                    // Cerrar la vista de luz de fondo
                    jQuery('#closeButton').click(function () {
                        jQuery('body').removeClass('lock-scroll');
                        jQuery('.lightbox').fadeOut();
                    });

                    //  Event listener para la tecla "Escape"
                    document.addEventListener("keydown", function (event) {
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
                            default:
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
