import * as $ from 'jquery';
import { lockyOn } from 'dom-locky';
import { lockBodyOnModalOpen } from '../helpers';

export class HeaderMenu {
   constructor() {
      this.$html = $('html');
      this.$burgerBtn = $('#header__burger');

      this.$body = document.querySelector('body');
      this.scrollPosition = 0;

      this.init();
   }

   init = () => {
      this.$burgerBtn.on('click', this.toggleMenu);

      $('.header-menu__mobile a').on('click', () => {
         this.$html.removeClass('menu-open');
         lockBodyOnModalOpen(false);
      });
   };

   toggleMenu = () => {
      if (this.$html.hasClass('menu-open')) {
         this.$html.removeClass('menu-open');

         lockBodyOnModalOpen(false);
      } else {
         this.$html.addClass('menu-open');

         lockBodyOnModalOpen(true);
      }
   };
}
