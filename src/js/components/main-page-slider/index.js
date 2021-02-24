import * as $ from 'jquery';
import Swiper from 'swiper/js/swiper.min';

export class MainPageSlider {
   constructor() {
      this.$container = $('#product-popular-slider');
      if (this.$container.length === 0) {
         return false;
      }

      this.init();
   }
   init = () => {
      this.initSlider();
   };

   initSlider = () => {
      this.slider = new Swiper(this.$container, {
         effect: 'slide',
         loop: false,
         preloadImages: false,
         lazy: true,
         slidesPerView: 'auto',
         spaceBetween: 32,
         centeredSlides: true,
         navigation: {
            nextEl: '.product-popular-slider__wrap .swiper-button-next',
            prevEl: '.product-popular-slider__wrap .swiper-button-prev',
         },
         pagination: {
            el: '.swiper-pagination'
         },
         breakpoints: {
            1000: {
               slidesPerView: 3,
               centeredSlides: false,
            },
            1350: {
               slidesPerView: 4,
               centeredSlides: false,
            },
            1600: {
               slidesPerView: 5,
               centeredSlides: false,
            }
         }
      });
   };
}
