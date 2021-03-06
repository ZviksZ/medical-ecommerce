import * as $                                           from 'jquery';
import { CatalogDetailOrder, CatalogDetailSlider }      from './components/catalog-detail';
import { CatalogFilter }                                                        from './components/catalog-filter';
import { CustomSelect }                                                         from './components/custom-select';
import { CustomTabs }                                                                              from './components/custom-tabs';
import { initMaskedInput, initPlaceholders }                                                       from './components/form';
import { Header }                                                                                  from './components/header';
import { HeaderMenu }                                                                              from './components/header-menu';
import { initAboutPageTab, initInfoTabs, initSaveCatalogCookies, initVideoPreviews, videoPlayBtn } from './components/helpers/simple-fn.js';
import { InitForm }                                                                                from './components/init-form';
import { MainPageSlider }                                                                          from './components/main-page-slider';
import { InitMap }                                                                                 from './components/map';
import { ModalWindowFullScreen }                                                                   from './components/modal-window-fullscreen';
import { Preloader }                                                            from './components/preloader';
import { Search }                                       from './components/search';
import { MediaVideo }                                   from './components/video-modal';
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

   initInfoTabs();

   videoPlayBtn();

   initAboutPageTab();

   initSaveCatalogCookies();
   initVideoPreviews();

   new MediaVideo();

   // форма подписки на рассылку новостей
   new InitForm();

   // Инициализация плейсхолдеров и масок
   initMaskedInput();
   initPlaceholders();

   // инициализация функционала модальных окон
   let modal = new ModalWindowFullScreen();
});
