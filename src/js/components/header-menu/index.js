import * as $ from 'jquery';

export class HeaderMenu {
   constructor() {
      this.$html = $('html');
      this.$burgerBtn = $('#header__burger');

      this.init();
   }

   init = () => {
      this.$burgerBtn.on('click', this.toggleMenu);
   };

   toggleMenu = () => {
      if (this.$html.hasClass('menu-open')) {
         this.$html.removeClass('menu-open');
      } else {
         this.$html.addClass('menu-open');
      }
   };
}
