            jQuery(document).ready(function () {

                var galleryImages = jQuery('.gallery-image');

                if (galleryImages.length > 0 && screen.width >= 768) {

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
                    jQuery('#prevButton').click(function () {
                        currentIndex--;
                        if (currentIndex < 0) {
                            currentIndex = galleryImages.length - 1;
                        }
                        showLightbox(currentIndex);
                    });

                    // Cambiar a la siguiente imagen
                    jQuery('#nextButton').click(function () {
                        currentIndex++;
                        if (currentIndex >= galleryImages.length) {
                            currentIndex = 0;
                        }
                        showLightbox(currentIndex);
                    });

                    // Cerrar la vista de luz de fondo
                    jQuery('#closeButton').click(function () {
                        jQuery('body').removeClass('lock-scroll');
                        jQuery('.lightbox').fadeOut();
                    });

                    //  Event listener para la tecla "Escape"
                    document.addEventListener("keydown", function (event) {
                        if (event.key === "Escape") {
                            jQuery('body').removeClass('lock-scroll');
                            jQuery('.lightbox').css("display", "none");
                        }
                    });
                }
            });