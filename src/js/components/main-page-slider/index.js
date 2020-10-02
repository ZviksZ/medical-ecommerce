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
         resistance: false,
         slidesPerView: 'auto',
         spaceBetween: 32,
         freeMode: true,
         pagination: {
            el: '.swiper-pagination'
         }
      });
   };
}
