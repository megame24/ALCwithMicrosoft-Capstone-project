/*=========================================================================
    carousel directive, responsible for the  carousel feature of the app
===========================================================================*/

angular.module('app').directive('carouselDirective', ['dataService', carousel]);

function carousel(dataService) {
    return {
        restrict: 'E',
        templateUrl: 'app/views/directiveViews/carousel.html',
        link: function($scope, element, attrs) {
            //get all images
            var figures = $('#carousel figure');

            //responsible for the slide animation
            function slide(slideObject, index, nextImage) { //'slideObject' contains properties needed for animating the images on different occasions

                $(slideObject.array[index]).animate({ //animate the present image to the left while setting its opacity to zero within 0.5 seconds, using properties from the slideObject

                    left: (slideObject.sign1 + slideObject.leftAnimate),
                    opacity: 0
                }, 500, function() { //after the animation, make present image invisible, return it to its previous position and revert its opacity to one

                    $(slideObject.array[index])
                    .removeClass('vissible')
                    .css({'left': slideObject.left, 'opacity': '1'});
                });

                //just a little while after the present image's animation starts, trigger the animation of the next slide image through a 'setTimeout'
                setTimeout(function(){ 

                    //first set its opacity to zero, displace it a greater degree to the left and make it vissible
                    //then animate it to the initial position of the present image while setting its opacity to one
                    $(slideObject.array[nextImage]).css({'opacity': '0', 'left': slideObject.sign2 + slideObject.nextCss})
                    .addClass('vissible')
                    .animate({
                        opacity: 1,
                        left: (slideObject.sign1 + '=' + slideObject.nextLeft)
                    }, 500);
                }, 20)
            }

            //slides to the previous image in the carousel
            function rotateImagesBack() {
                //'slideObject' contains properties required to animate the slide
                var slideObject = {
                    array: figures,
                    sign1: '+',
                    sign2: '-',
                }

                //tweaks the positions for the animation, depending on the screen size
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

                //loops through the images and animate the present image as well as the previous one
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

            //slides to the next image in the carousel
            function rotateImagesFront() {
                //'slideObject' contains properties required to animate the slide
                var slideObject = {
                    array: figures,
                    sign1: '-',
                    sign2: '+',
                }

                //tweaks the positions for the animation, depending on the screen size
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

                //loops through the images and animate the present image as well as the next one
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

            //calls 'rotateImagesFront' every 3 seconds to implement auto slide function of the carousel
            function callRotateImages() {
                callRotateInterval = setInterval(function(){
                    rotateImagesFront();
                }, 3000);
            }

            //on checking or unchecking the 'toggle-slide' checkbox, stops or activates the auto slide
            $('#toggle-carousel').change(function() {
                if(this.checked) {
                    callRotateImages();
                } else {
                    clearInterval(callRotateInterval);
                }
            });

            //on clicking the right arrow icon, checks to see if the carousel is on auto slide and stops it if so. And then slides to the next image in the carousel
            $('#next').click(function() {
                if($('#toggle-carousel').is(':checked')) { //if auto slide on, stop it
                    clearInterval(callRotateInterval);
                    if($('figure').is(':animated')) { //if in the middle of an animation, let it finish
                        $('figure').promise().done(function() { 
                            rotateImagesFront();
                        });
                    } else {
                        rotateImagesFront();
                    }
                    callRotateImages(); //resume auto slide
                } else { //else if auto slide is off, just slide to the next image in the carousel
                    rotateImagesFront();
                }
            });

            //on clicking the left arrow icon, checks to see if the carousel is on auto slide and stops it if so. And then slides to the previous image in the carousel
            $('#back').click(function() {
                if($('#toggle-carousel').is(':checked')) { //if auto slide on, stop it
                    clearInterval(callRotateInterval);
                    if($('figure').is(':animated')) { //if in the middle of an animation, let it finish
                        $('figure').promise().done(function() {
                            rotateImagesBack();
                        });
                    } else {
                        rotateImagesBack();
                    }
                    callRotateImages(); //resume auto slide
                } else { //else if auto slide is off, just slide to the previous image in the carousel
                    rotateImagesBack();
                }
            });
        }
    };
}