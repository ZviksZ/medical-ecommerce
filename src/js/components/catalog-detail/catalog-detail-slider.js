import * as $ from 'jquery';
import Swiper from 'swiper/js/swiper.min';

export class CatalogDetailSlider {
   constructor() {
      this.$container = $('#cd-slider');
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
         resistance: false,
         slidesPerView: 1,
         navigation: {
            nextEl: '.cd-slider-wrap .swiper-button-next',
            prevEl: '.cd-slider-wrap .swiper-button-prev',
         },
         pagination: {
            el: '.swiper-pagination',
            clickable: true,
         }
      });
   };
}
