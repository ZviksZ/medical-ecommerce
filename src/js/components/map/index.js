import * as $ from 'jquery';

export class InitMap {
   constructor() {
      this.$block = $('#map');

      if (this.$block.length === 0) return false;

      this.coords = this.$block.attr('data-coords').split(',')
      this.mapId = this.$block.attr('id')

      this.init();
   }

   init = () => {
      this.initMap(this.mapId).then(map => this.map = map);
   }

   initMap = (id) => {
      return new Promise(resolve => {
         ymaps.ready(() => {
            const map = new ymaps.Map(id, {
               center: this.coords,
               controls: ['zoomControl'],
               zoom: 14
            }, {
               suppressMapOpenBlock: true
            });

            map.behaviors.disable('scrollZoom');
            map.behaviors.disable('dblClickZoom');
            map.behaviors.disable('multiTouch');

            const myPlacemark = new ymaps.Placemark(this.coords, {}, {
               iconLayout: 'default#image',
               iconImageHref: './img/balloon.svg',
               iconImageSize: [33, 49],
               iconImageOffset: [-16, -49]
            });


            map.geoObjects.add(myPlacemark);

            resolve(map);
         });
      })
   }
}
