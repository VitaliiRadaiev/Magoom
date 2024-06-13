{
    const reviewsCarousel = document.querySelectorAll('[data-slider="reviews-carousel"]');
    reviewsCarousel.forEach(carousel => {
        let swiper = new Swiper(carousel.querySelector('.swiper'), {
            // observer: true,
            // observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 400,
            navigation: {
                nextEl: carousel.querySelector('.btn-right'),
                prevEl: carousel.querySelector('.btn-left'),
            },
        });
    })
}