import * as $ from 'jquery';

export class MediaVideo {
   constructor() {
      this.$videoLink = $('[data-video-open]');
      this.$modal = $('#media-video-modal');

      if (!this.$videoLink.length) {
         return false;
      }

      this.init();
   }

   init = () => {
      this.initHandlers();
   };

   initHandlers = () => {
      $('body').find('[data-video-open]').on('click', this.openModal);
      this.$modal.find('.close').on('click', this.closeModal);
   };

   openModal = (e) => {
      e.preventDefault();

      let videoId = $(e.currentTarget).attr('data-video');

      if (videoId.split('/').length === 1) {
        videoId = `https://www.youtube.com/embed/${videoId}`
      }

      let videoTemplate = '<div class="thumb-wrap"><iframe width="560" height="315" src="' + videoId + '" frameborder="0" allowfullscreen></iframe></div>';

      this.$modal.find('.modal-content #video').html(videoTemplate);
   };

   closeModal = (e) => {
      this.$modal.find('.modal-content #video').html('');
   };
}
