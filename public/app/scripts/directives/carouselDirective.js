angular.module('app').directive('carouselDirective', ['dataService', carousel]);

function carousel(dataService) {
    return {
        restrict: 'E',
        templateUrl: 'app/views/directiveViews/carousel.html',
        link: function($scope, element, attrs) {
            var figures = $('#carousel figure');
            function slide(array, index, sign1, sign2, nextLeft, nextCss, nextImage) {
                $(array[index]).animate({
                    left: (sign1 + '=67%'),
                    opacity: 0
                }, 500, function() {
                    $(array[index])
                    .removeClass('vissible')
                    .css({'left': ('33.5%'), 'opacity': '1'});
                });
                setTimeout(function(){
                    $(array[nextImage]).css({'opacity': '0', 'left': `${sign2}${nextCss}`})
                    .addClass('vissible')
                    .animate({
                        opacity: 1,
                        left: (`${sign1}=${nextLeft}`)
                    }, 500);
                }, 20)
            }
            function rotateImagesFront() {
                for(var i = 0; i < figures.length; i++){
                    if(figures[i].className == 'vissible' && i != figures.length - 1){
                        slide(figures, i, '+', '-', '100.5%', '67%', (i + 1));
                        break;
                    } else if(figures[i].className == 'vissible' && i == figures.length - 1) {
                        slide(figures, i, '+', '-', '100.5%', '67%', (0));
                        break;
                    }
                }
            }
            function rotateImagesBack() {
                for(var i = 0; i < figures.length; i++){
                    if(figures[i].className == 'vissible' && i != 0){
                        slide(figures, i, '-', '+', '67%', '100.5%', (i - 1));
                        break;
                    } else if(figures[i].className == 'vissible' && i == 0) {
                        slide(figures, i, '-', '+', '67%', '100.5%', (figures.length - 1));
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