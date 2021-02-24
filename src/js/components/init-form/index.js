import * as $                                 from 'jquery';
import { initFormWithValidate, validateForm } from '../form';

export class InitForm {
   constructor() {
      this.$form = $('.form');

      if (this.$form.length === 0) return false;

      this.init();
   }

   init = () => {
      this.$form.each(function() {
         initFormWithValidate($(this));
      });


      this.$form.on('submit', this.onSubmit);
      this.$form.find('.close-form-message').on('click', this.closeFormMessage);
   };

   closeFormMessage = e => {
      e.preventDefault();

      $(e.currentTarget).closest('.form').removeClass('show-message success');
   };

   onSubmit = e => {
      e.preventDefault();

      const form = $(e.currentTarget);

      let data = form.serialize();

      let captchaError = this.getCaptcha(form);

      if (validateForm(form, true) && !captchaError) {
         $.ajax({
            url: form.attr('action'),
            type: 'POST',
            dataType: 'text',
            data: data,
            success: res => {
               this.clearForm(form);

               form.find('.form-message .title').text('Успешно');
               form.find('.form-message .text').text('Данные были успешно отправлены');

               form.find('.close-form-message').show();

               form.addClass('show-message success');

               this.scrollToMessage(form)
            },
            error: res => {
               form.find('.form-message .title').text('Ошибка');
               form.find('.form-message .text').text('Отправка данных не удалась. Попробуйте повторить отправку формы.');

               form.addClass('show-message error');

               this.scrollToMessage(form)

               setTimeout(() => {
                  form.removeClass('show-message error');
               }, 2500);
            },
            timeout: 30000
         });
      }
   };

   scrollToMessage = (form) => {
      if (!$('html').hasClass('open-modal') && $(window).width() < 1000) {
         $('html, body').animate({
            scrollTop: form.offset().top
         }, 0)
      }
   }

   getCaptcha = (form) => {
      let captachaError = false;

      if (form.find('.g-recaptcha:visible').length) {
         let v = grecaptcha.getResponse();
         if (v.length == 0) {
            captachaError = true;

            form.find('.form-footer__captcha .error-message').text('Подтверждение обязательно');
         } else {
            form.find('.form-footer__captcha .error-message').text('');
         }
      }

      return captachaError;
   };

   clearForm = form => {
      form[0].reset();
      form
         .find('.field')
         .removeClass('success')
         .addClass('empty');
      form.find('.field input').val('');
      if (form.find('.g-recaptcha:visible').length) {
         grecaptcha.reset();
      }

   };
}
