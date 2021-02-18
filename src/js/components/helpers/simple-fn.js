import * as $ from 'jquery';

export function initInfoTabs() {
   $('.info__wrap .item .top').on('click', function() {
      $(this)
         .closest('.item')
         .toggleClass('item-show-content');
   });
}

export function videoPlayBtn() {
   $('.news-detail__video .play-btn').on('click', function(e) {
      let video = $(this)
         .closest('.news-detail__video')
         .find('video');
      let videoInstance = $(this)
         .closest('.news-detail__video')
         .find('video')
         .get(0);

      if (videoInstance.paused) {
         video.attr('controls', 'controls');
         videoInstance.play();
         $(this).hide();
      }
   });
}
