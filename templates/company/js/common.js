// preloader
function loadData() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000);
    })
}

loadData()
    .then(() => {
        let preloaderEl = document.getElementById('preloader');
        let bodyEl = document.getElementById('bodyEl');
        preloaderEl.classList.add('hidden');
        preloaderEl.classList.remove('visible');
        bodyEl.style.overflowY = "scroll";
    });


// carousel
$(function(){
    function slider(selector) {
        let carouselStage = $(selector).find('.carousel .carousel-stage'),
            btnNext         = $(selector).find('.next'),
            btnPrev         = $(selector).find('.prev');

        // !!! already unnecessary thing(below in the comments)
        // 
        // $(window).resize(function(){
        //     // carouselStage.width($(selector).find('.carousel .carousel-stage').children().length * $(selector).find('.carousel .carousel-stage').children().innerWidth());
        //     // carouselStage.css('left', -$(selector).find('.carousel .carousel-stage').children().innerWidth());
        // });

        $(btnNext).click(function() { shiftSlide(-1) })
        $(btnPrev).click(function() { shiftSlide(1) })
        
        function shiftSlide(direction) {
            if (carouselStage.hasClass('transition')) return;
            carouselStage.addClass('transition')
                         .css('transform','translateX(' + (direction * carouselStage.children().outerWidth(true)) + 'px)');
            setTimeout(function() {
                if (direction === 1) {
                    $(selector + ' .carousel-item:first').before($(selector + ' .carousel-item:last'));
                } else if (direction === -1) {
                    $(selector + ' .carousel-item:last').after($(selector + ' .carousel-item:first'))
                }
                carouselStage.removeClass('transition')
                carouselStage.css('transform', 'translateX(0px)');
            }, 700)
        }
    }

    slider('.banner-content');
    slider('.services');
    slider('.feedback');
    sliderAuto('.clients');

    function sliderAuto(selector) {
        let carouselStage = $(selector).find('.carousel .carousel-stage');
        function shiftSlide(direction) {
            if (carouselStage.hasClass('transition')) return;
            carouselStage.addClass('transition')
                         .css('transform','translateX(' + (direction * carouselStage.children(':last-of-type').innerWidth()) + 'px)');
            setTimeout(function() {
                if (direction === 1) {
                    $(selector + ' .carousel-item:first').before($(selector + ' .carousel-item:last'));
                } else if (direction === -1) {
                    $(selector + ' .carousel-item:last').after($(selector + ' .carousel-item:first'))
                }
                carouselStage.removeClass('transition')
                carouselStage.css('transform', 'translateX(0px)');
            
            }, 1700)
        }
        setInterval(function() {
            shiftSlide(-1)
        },2000); 
    }

});


