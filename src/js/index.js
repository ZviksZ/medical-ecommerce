import * as $           from "jquery";
import { CustomSelect } from './components/custom-select';
import { initMaskedInput, initPlaceholders } from "./components/form";
import { ModalWindowFullScreen } from "./components/modal-window-fullscreen";
window.jQuery = require("jquery");



$(function() {
  // инициализация плагина кастомных селектов
  new CustomSelect()

  // инициализация функционала модальных окон
  let modal = new ModalWindowFullScreen();

  // Инициализация плейсхолдеров и масок
  initMaskedInput();
  initPlaceholders();
});
