import * as $ from 'jquery';
import { CatalogDetailOrder, CatalogDetailSlider } from './components/catalog-detail';
import { CatalogFilter } from './components/catalog-filter';
import { CustomSelect }                      from './components/custom-select';
import { CustomTabs }                        from './components/custom-tabs';
import { FeedForm }                          from './components/feed-form';
import { initMaskedInput, initPlaceholders } from './components/form';
import { Header }                            from './components/header';
import { HeaderMenu }                        from './components/header-menu';
import { MainPageSlider }                    from './components/main-page-slider';
import { InitMap }                           from './components/map';
import { ModalWindowFullScreen }             from './components/modal-window-fullscreen';
import { Preloader }                         from './components/preloader';
import { Search }                            from './components/search';
window.jQuery = require('jquery');

$(function() {
   // прелоадер при загрузке главной
   new Preloader();

   // главное меню на мобильном
   new Header();
   new HeaderMenu();

   // инициализация плагина кастомных селектов
   new CustomSelect();

   // функционал табов
   new CustomTabs();

   // слайдер товаров на главной
   new MainPageSlider();

   // функционал фильтра каталогов
   new CatalogFilter();

   // детальная страница каталога
   new CatalogDetailSlider();
   new CatalogDetailOrder();

   new InitMap();
   new Search();

   // форма подписки на рассылку новостей
   new FeedForm();

   // инициализация функционала модальных окон
   let modal = new ModalWindowFullScreen();

   // Инициализация плейсхолдеров и масок
   initMaskedInput();
   initPlaceholders();
});
