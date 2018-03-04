angular.module('app').directive('carouselDirective', ['dataService', carousel]);

function carousel(dataService) {
    return {
        restrict: 'E',
        templateUrl: 'app/views/directiveViews/carousel.html',
        link: function($scope, element, attrs) {
            var figures = $('#carousel figure');
            function slide(array, index, sign1, sign2, nextImage) {
                $(array[index]).animate({
                    left: (sign1 + '=300px'),
                    opacity: 0
                }, 500, function() {
                    $(array[index])
                    .removeClass('vissible')
                    .css({'left': '0px', 'opacity': '1'});
                });
                setTimeout(function(){
                    $(array[nextImage]).css({'opacity': '0', 'left': (sign2 + '400px')})
                    .addClass('vissible')
                    .animate({
                        opacity: 1,
                        left: (sign1 + '=400px')
                    }, 500);
                }, 20)
            }
            function rotateImagesFront() {
                for(var i = 0; i < figures.length; i++){
                    if(figures[i].className == 'vissible' && i != figures.length - 1){
                        slide(figures, i, '+', '-', (i + 1));
                        break;
                    } else if(figures[i].className == 'vissible' && i == figures.length - 1) {
                        slide(figures, i, '+', '-', (0));
                        break;
                    }
                }
            }
            function rotateImagesBack() {
                for(var i = 0; i < figures.length; i++){
                    if(figures[i].className == 'vissible' && i != 0){
                        slide(figures, i, '-', '+', (i - 1));
                        break;
                    } else if(figures[i].className == 'vissible' && i == 0) {
                        slide(figures, i, '-', '+', (figures.length - 1));
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
                rotateImagesFront();
            });

            $('#back').click(function() {
                rotateImagesBack();
            });
        }
    };
}