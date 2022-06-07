

$('.nav').hide();
$('.icon').hide();

// Initialise swiper 
var swiper = new Swiper('.swiper-container', {
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    pagination: {
        el: 'swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});
gsap.to('.swiper-slide-active', {
    ease: "back",
    scaleY: 1.5,
    duration: 0.2,
});
// scaling central / active slide - 
var scaleActive = function() {
    $(".swiper-slide").each(function() {
        console.log(swiper.params)

        if ($(this).hasClass("tile")) {
            if ($(this).hasClass("swiper-slide-active")) {
                gsap.to('.swiper-slide-active', {
                    ease: "back",
                    scaleY: 1.5,
                    duration: 0.1,
                });
            } else {
                gsap.to('.swiper-slide', {
                    scaleY: 1,
                    duration: 0,
                    ease: "back"
                });
            }
        } else {
            gsap.to('.swiper-slide', {
                ease: "back",
                scaleY: 1,
                duration: 0,
            });
        }
    });
};

swiper.on('slideChange', function() {
    setTimeout(function() {
        scaleActive();
    }, 0);
});

// On click expansion.
$('.swiper-slide').click(function() {
    event.stopPropagation();

    $('.swiper-container').addClass('big');
    $('.nav').show();
    $('.about').hide();
    $('.icon').show();
    $('.swiper-slide').removeClass('tile');

    $('.swiper-slide').addClass('grow');
    $('.mood').addClass('large');


    swiper.params.slidesPerView = 1;
    swiper.params.spaceBetween = 0;
    swiper.params.centeredSlides = true;
    swiper.params.loop = true;


    swiper.update();
    scaleActive();
});
// Closing mood board
$(".icon").click(function() {
    event.stopPropagation();
    $('.swiper-container').removeClass('big');
    $('.nav').hide();
    $('.about').show();
    $('.icon').hide();
    $('.swiper-slide').addClass('tile');
    $('.swiper-slide').removeClass('grow');
    $('.mood').removeClass('large');
    gsap.fromTo(".about", { x: -80, y: 0 }, { duration: 0.2, x: 0, y: 0, ease: "back" })
    $('.swiper-slide').width(175);
    swiper.params.slidesPerView = "auto";
    swiper.params.spaceBetween = 20;
    swiper.params.coverflowEffect = {};
    swiper.update();
    scaleActive();

});