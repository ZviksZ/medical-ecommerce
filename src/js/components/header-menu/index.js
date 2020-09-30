export class HeaderMenu {
   constructor() {
      this.$body = document.querySelector('body');
      this.$menu = document.querySelector('.header__menu');
      this.$openBtn = document.querySelector('#header .header__menu-btn');
      this.$closeBtn = document.querySelector('.header__menu .header__menu-close');
      this.$menuOverlay = document.querySelector('.header__menu-overlay');


      this.init();
   }

   init = () => {
      this.$openBtn.addEventListener('click', this.openMenu);

      this.$closeBtn.addEventListener('click', this.closeMenu);

      this.$menuOverlay.addEventListener('click', this.closeMenu);
   }

   openMenu = (e) => {
      e.preventDefault();

      this.$body.classList.add('header__menu-open');
   }

   closeMenu = (e) => {
      e.preventDefault();

      this.$body.classList.remove('header__menu-open');
   }
}
