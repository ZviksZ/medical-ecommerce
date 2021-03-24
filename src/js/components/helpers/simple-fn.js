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

export function initAboutPageTab() {
   if ($('.about').length > 0) {
      const activeTab = localStorage.getItem('aboutActiveTab');
      if (activeTab) {
         $('.about .tabs .item[data-tab="' + activeTab + '"]').click();
         localStorage.removeItem('aboutActiveTab');
      }

      $('.about .about-list .about-list__item').on('click', function() {
         localStorage.setItem(
            'aboutActiveTab',
            $(this)
               .closest('.tab-block')
               .attr('data-tab')
         );
      });
   }
}

export function initVideoPreviews() {
   $('.about-list__img').each(function() {
      const videoLinkArray = $(this).closest('.about-list__item').attr('data-video').split('/')
      const videoHash = videoLinkArray[videoLinkArray.length - 1]

      $(this).css('background-image', 'url(//img.youtube.com/vi/' + videoHash + '/3.jpg)');
   })
}

export function initSaveCatalogCookies() {
   $('.save-cookie').on('click', function(e) {
      const cookie = $(e.currentTarget).attr('data-cookie');

      setCookie('catalogCookie', cookie)
   });
}

// возвращает cookie если есть или undefined
export function getCookie(name) {
   let matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
   return matches ? decodeURIComponent(matches[1]) : undefined;
}

// уcтанавливает cookie
export function setCookie(name, value, props) {
   props = props || {};

   let exp = props.expires;

   if (typeof exp == 'number' && exp) {
      let d = new Date();

      d.setTime(d.getTime() + exp * 1000);

      exp = props.expires = d;
   }

   if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
   }

   value = encodeURIComponent(value);

   let updatedCookie = name + '=' + value;

   for (let propName in props) {
      updatedCookie += '; ' + propName;

      let propValue = props[propName];

      if (propValue !== true) {
         updatedCookie += '=' + propValue;
      }
   }

   document.cookie = updatedCookie;
}

// удаляет cookie
export function deleteCookie(name) {
   setCookie(name, null, { expires: -1 });
}
