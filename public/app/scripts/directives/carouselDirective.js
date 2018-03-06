angular.module('app').directive('carouselDirective', ['dataService', carousel]);

function carousel(dataService) {
    return {
        restrict: 'E',
        templateUrl: 'app/views/directiveViews/carousel.html',
        link: function($scope, element, attrs) {
            var figures = $('#carousel figure');
            function slide(slideObject, index, nextImage) {
                $(slideObject.array[index]).animate({
                    left: (slideObject.sign1 + slideObject.leftAnimate),
                    opacity: 0
                }, 500, function() {
                    $(slideObject.array[index])
                    .removeClass('vissible')
                    .css({'left': slideObject.left, 'opacity': '1'});
                });
                setTimeout(function(){
                    $(slideObject.array[nextImage]).css({'opacity': '0', 'left': `${slideObject.sign2}${slideObject.nextCss}`})
                    .addClass('vissible')
                    .animate({
                        opacity: 1,
                        left: (`${slideObject.sign1}=${slideObject.nextLeft}`)
                    }, 500);
                }, 20)
            }
            function rotateImagesFront() {
                var slideObject = {
                    array: figures,
                    sign1: '+',
                    sign2: '-',
                }
                if($('.not-phone').is(':visible')) {
                    slideObject.left = '33.5%';
                    slideObject.leftAnimate = '=67%';
                    slideObject.nextLeft = '100.5%';
                    slideObject.nextCss = '67%';
                } else {
                    slideObject.left = '25%';
                    slideObject.leftAnimate = '=50%';
                    slideObject.nextLeft = '75%';
                    slideObject.nextCss = '50%';
                }
                for(var i = 0; i < figures.length; i++){
                    if(figures[i].className == 'vissible' && i != figures.length - 1){
                        slide(slideObject, i, (i + 1));
                        break;
                    } else if(figures[i].className == 'vissible' && i == figures.length - 1) {
                        slide(slideObject, i, (0));
                        break;
                    }
                }
            }
            function rotateImagesBack() {
                var slideObject = {
                    array: figures,
                    sign1: '-',
                    sign2: '+',
                }
                if($('.not-phone').is(':visible')) {
                    slideObject.left = '33.5%';
                    slideObject.leftAnimate = '=67%';
                    slideObject.nextLeft = '67%';
                    slideObject.nextCss = '100.5%';
                } else {
                    slideObject.left = '25%';
                    slideObject.leftAnimate = '=50%';
                    slideObject.nextLeft = '50%';
                    slideObject.nextCss = '75%';
                }
                for(var i = 0; i < figures.length; i++){
                    if(figures[i].className == 'vissible' && i != 0){
                        slide(slideObject, i, (i - 1));
                        break;
                    } else if(figures[i].className == 'vissible' && i == 0) {
                        slide(slideObject, i, (figures.length - 1));
                        break;
                    }
                }
            }

            function callRotateImages() {
                callRotateInterval = setInterval(function(){
                    rotateImagesBack();
                }, 3000);
            }

            $('#toggle-carousel').change(function() {
                if(this.checked) {
                    callRotateImages();
                } else {
                    clearInterval(callRotateInterval);
                }
            });

            $('#next').click(function() {
                if($('#toggle-carousel').is(':checked')) {
                    clearInterval(callRotateInterval);
                    if($('figure').is(':animated')) {
                        $('figure').promise().done(function() {
                            rotateImagesFront();
                        });
                    } else {
                        rotateImagesFront();
                    }
                    callRotateImages();
                } else {
                    rotateImagesFront();
                }
            });

            $('#back').click(function() {
                if($('#toggle-carousel').is(':checked')) {
                    clearInterval(callRotateInterval);
                    if($('figure').is(':animated')) {
                        $('figure').promise().done(function() {
                            rotateImagesBack();
                        });
                    } else {
                        rotateImagesBack();
                    }
                    callRotateImages();
                } else {
                    rotateImagesBack();
                }
            });
        }
    };
}