import * as $                                from "jquery";
import { CustomSelect }                      from './components/custom-select';
import { initMaskedInput, initPlaceholders } from "./components/form";
import { HeaderMenu }                        from './components/header-menu';
import { MainPageSlider }                    from './components/main-page-slider';
import { ModalWindowFullScreen }             from "./components/modal-window-fullscreen";
import { Preloader }                         from './components/preloader';
window.jQuery = require("jquery");




$(function() {
  // прелоадер при загрузке главной
  new Preloader();

  // главное меню на мобильном
  new HeaderMenu();

  // инициализация плагина кастомных селектов
  new CustomSelect()

  // слайдер товаров на главной
  new MainPageSlider()

  // инициализация функционала модальных окон
  let modal = new ModalWindowFullScreen();

  // Инициализация плейсхолдеров и масок
  initMaskedInput();
  initPlaceholders();
});
