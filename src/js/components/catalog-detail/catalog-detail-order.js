import * as $ from 'jquery';

export class CatalogDetailOrder {
   constructor() {
      this.$container = $('#cd-order');
      if (this.$container.length === 0) {
         return false;
      }

      this.$quantity = $('.cd-quantity');
      this.$quantityArrowMinus = this.$quantity.find('.cd-quantity-minus');
      this.$quantityArrowPlus = this.$quantity.find('.cd-quantity-plus');
      this.$quantityNum = this.$quantity.find('.cd-quantity-num');

      this.init();
   }
   init = () => {
      this.initQuantity();
   };

   initQuantity = () => {
      this.$quantityArrowMinus.on('click', () => {
         console.log(this.$quantityNum.val())
         if (this.$quantityNum.val() > 1) {
            this.$quantityNum.val(+this.$quantityNum.val() - 1);
            this.setQuantityToForm();
         }
      });
      this.$quantityArrowPlus.on('click', () => {
         this.$quantityNum.val(+this.$quantityNum.val() + 1);
         this.setQuantityToForm();
      });

      this.$quantityNum.on('blur', e => {
         if (+$(e.currentTarget).val() < 1) {
            $(e.currentTarget).val('1');
         }
         this.setQuantityToForm();
      });

      this.setQuantityToForm();
   };

   setQuantityToForm = () => {
      const value = this.$quantityNum.val();
      $('#order-count').val(value);
      $('#order-count-text').text(value);
   };
}
