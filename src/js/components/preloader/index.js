import * as $ from 'jquery';

export class Preloader {
   constructor() {
      this.$pagePreloader = $('#page_preloader');

      if (this.$pagePreloader.length === 0) {
         return false
      }

      this.init();
   }

   init = () => {
      if (this.$pagePreloader.length) {
         this.$pagePreloader.addClass('animate-start');
         $('body').addClass('overflow-hidden');

         setTimeout(() => {
            $('.preloader-page').addClass('preloader-hide')
         }, 2000)
         setTimeout(() => {
            this.hidePreloaderPage();
            this.$pagePreloader.remove();
            $('html').addClass('main-page-animate')
            $('body').removeClass('overflow-hidden');
         }, 2500);
      } else {
         this.hidePreloaderPage();
      }
   }

   hidePreloaderPage = () => {
      $('.preloader-page').removeClass('preloader-page');
      setTimeout(() => {
         $('.preloader-page-pxl').remove();
      }, 600);
   }

}
