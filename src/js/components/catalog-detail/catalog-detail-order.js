import * as $ from 'jquery';

export class CatalogDetailOrder {
   constructor() {
      this.$container = $('#cd-order');
      if (this.$container.length === 0) {
         return false;
      }

      this.$tabsContainer = $('#cd-order__tabs');
      this.$select = $('#cd-order__select');
      this.$btn = $('#cd-order__btn');

      this.init();
   }
   init = () => {
      this.$tabsContainer.find('.item:not(.disabled)').on('click', this.initCatalogTabs);
   };

   initCatalogTabs = e => {
      this.$tabsContainer.find('.item:not(.disabled)').removeClass('active');
      $(e.currentTarget).addClass('active');
   };
}
