import * as $ from 'jquery';
import { initFormWithValidate, validateForm } from '../form';

export class InitForm {
   constructor() {
      this.$form = $('.form');

      if (this.$form.length === 0) return false;

      this.$formMessage = this.$form.find('.form-message');
      this.$captcha = this.$form.find('.g-recaptcha');

      this.init();
   }

   init = () => {
      initFormWithValidate(this.$form);

      this.$form.on('submit', this.onSubmit);
   };

   onSubmit = e => {
      e.preventDefault();

      let data = this.$form.serialize();

      let captchError = this.getCaptcha();

      if (validateForm(this.$form, true) && !captchError) {
         $.ajax({
            url: '/netcat/add.php',
            type: 'POST',
            dataType: 'text',
            data: data,
            success: res => {
               this.successForm();
            },
            error: res => {
               this.errorForm();
            },
            timeout: 30000
         });
      }
   };

   getCaptcha = () => {
      let captachaError = false;

      if (this.$form.find('.g-recaptcha:visible').length) {
         let v = grecaptcha.getResponse();
         if (v.length == 0) {
            captachaError = true;

            this.$form.find('.form-footer__captcha .error-message').text('Подтверждение обязательно');
         } else {
            this.$form.find('.form-footer__captcha .error-message').text('');
         }
      }

      return captachaError;
   };

   successForm = () => {
      this.clearForm(this.$form);

      this.$formMessage.find('.title').text('Успешно!');
      this.$formMessage.find('.text').text('Мы получили вашу заявку и скоро свяжемся с вами для уточнения всех деталей');

      this.$form.addClass('show-message success');
   };

   errorForm = () => {
      this.$formMessage.find('.title').text('Ошибка');
      this.$formMessage.find('.text').text('Отправка данных не удалась. Попробуйте повторить отправку формы.');

      this.$form.addClass('show-message error');

      setTimeout(() => {
         this.$form.removeClass('show-message error');
      }, 2500);
   };

   clearForm = form => {
      form[0].reset();
      form
         .find('.field')
         .removeClass('success')
         .addClass('empty');
      form.find('.field input').val('');
   };
}
