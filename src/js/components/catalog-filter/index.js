import * as $ from 'jquery';
import { declOfNum, highlightSomeText } from '../helpers';

export class CatalogFilter {
   constructor() {
      this.$filter = $('#catalog-modal');
      if (this.$filter.length === 0) {
         return false;
      }

      this.$catalogList = $('#catalog__list');
      this.data = JSON.parse(this.$catalogList.attr('data-items'));
      this.filteredData = this.data;

      this.$catalogFilterList = $('#catalog-categories-list');
      this.$form = $('#catalog-filter-form');
      this.$formSearchInput = $('#catalog-filter-field');
      this.$catalogTitle = $('#catalog-filter-title');
      this.$catalogFilterOpen = $('.catalog-filter-open');
      this.$catalogFilterBtn = $('#catalog-filter-btn');
      this.$catalogFilterText = $('#catalog-filter-text');
      this.$catalogClearSearch = $('#clear-catalog-search');
      this.$catalogTabs = $('#catalog-filter-tabs');

      this.currentTab = $('#catalog-filter-tabs .item.active').attr('data-tab');
      this.catalogType = $('#catalogType').val();
      this.isItFirstTouch = true;

      this.availableNosologies = [];
      this.availableCategories = [];

      this.init();
   }

   init = () => {
      this.initHandlers();
      this.setCatalogData();
   };

   initHandlers = () => {
      this.$catalogFilterOpen.on('click', this.initActiveTab);
      this.$filter.find('#catalog-filter-search').on('input', this.catalogSearchInput);
      this.$filter.find('input[type="checkbox"]').on('change', this.catalogCheckboxChange);
      this.$catalogFilterBtn.on('click', this.setCatalogData);
      this.$catalogClearSearch.on('click', this.clearSearch);
      this.$filter.find('.tab-block.catalog-block[data-tab="nosology"] input[type="checkbox"]').on('change', this.changeNosology);
      this.$filter.find('.tab-block.catalog-block[data-tab="product"] input[type="checkbox"]').on('change', this.changeCategory);
      this.$filter.find('.select-all').on('change', this.catalogCheckboxAll);
   };

   /*Показываем активный фильтр*/
   initActiveTab = e => {
      this.currentTab = $(e.currentTarget).attr('data-tab');
      this.$filter.find('.tab-block').removeClass('active');
      this.$filter.find('.tab-block[data-tab="' + this.currentTab + '"]').addClass('active');

      this.initInputLabel();
   };

   /*Показываем плейсхолдер в поле для поиска*/
   initInputLabel = () => {
      const label = this.$formSearchInput.find('.label');

      if (this.currentTab === 'nosology') {
         label.text('Поиск по нозологиям');
      } else {
         label.text('Поиск по товарам');
      }
   };

   /*Чекбокс выбрать все для каждого фильтра*/
   catalogCheckboxAll = e => {
      let isChecked = $(e.currentTarget).prop('checked');
      let type = $(e.currentTarget).attr('data-tab');

      this.$filter.find('.tab-block[data-tab="' + type + '"] input:not(.disabled)').each((index, item) => {
         $(item).prop('checked', isChecked);
      });
   };

   /*Изменение в нозологиях*/
   changeNosology = e => {
      this.getAvailableNosology();

      this.filterData();
      this.disableCategories();
      this.setCatalogData();

      this.uncheckSelectAll();
   };

   /*Изменение в категориях*/
   changeCategory = e => {
      this.getAvailableCategories();

      this.filterData();
      this.disableNosologies();
      this.setCatalogData();

      this.uncheckSelectAll();
   };

   /*Снятие чекбокса Выбрать все*/
   uncheckSelectAll = () => {
      this.$filter.find('.select-all[data-tab="' + this.currentTab + '"]').prop('checked', false);
   };

   /*Получение id выбранных нозологий в массив доступных*/
   getAvailableNosology = () => {
      let availableNosologies = [];

      this.$filter.find('.tab-block.catalog-block[data-tab="nosology"] input[type="checkbox"]').each(function() {
         let id = $(this).attr('id');
         if ($(this).prop('checked')) {
            availableNosologies.push(id);
         }
      });

      this.availableNosologies = availableNosologies;
   };

   /*Получение id выбранных категорий в массив доступных*/
   getAvailableCategories = () => {
      let availableCategories = [];

      this.$filter.find('.tab-block.catalog-block[data-tab="product"] input[type="checkbox"]').each(function() {
         if ($(this).prop('checked')) {
            availableCategories.push($(this).attr('data-category'));
         }
      });

      this.availableCategories = availableCategories;
   };

   /*Выключение недоступных категорий после выбора нозологий*/
   disableCategories = () => {
      let categories = [];

      for (let i = 0; i < this.filteredData.length; i++) {
         if (!categories.includes(this.filteredData[i].category)) {
            categories.push(this.filteredData[i].category);
         }
      }

      this.$filter.find('.tab-block.catalog-block[data-tab="product"] input[type="checkbox"]').each(function() {
         let id = $(this).attr('data-category');

         if (!categories.includes(id)) {
            $(this)
               .prop('checked', false)
               .addClass('disabled')
               .closest('.filter-item')
               .addClass('disabled');
         } else {
            $(this)
               .removeClass('disabled')
               .closest('.filter-item')
               .removeClass('disabled');
         }
      });
   };

   /*Выключение недоступных категорий после выбора нозологий*/
   disableNosologies = () => {
      let nosologies = [];

      for (let i = 0; i < this.filteredData.length; i++) {
         let itemNosologies = this.filteredData[i].nosologies;
         for (let j = 0; j < itemNosologies.length; j++) {
            if (!nosologies.includes(itemNosologies[j])) {
               nosologies.push(itemNosologies[j]);
            }
         }
      }

      this.$filter.find('.tab-block.catalog-block[data-tab="nosology"] input[type="checkbox"]').each(function() {
         let id = $(this).attr('id');

         if (!nosologies.includes(id)) {
            $(this)
               .prop('checked', false)
               .addClass('disabled')
               .closest('.filter-item')
               .addClass('disabled');
         } else {
            $(this)
               .removeClass('disabled')
               .closest('.filter-item')
               .removeClass('disabled');
         }
      });
   };

   /*Фильтрация*/
   filterData = () => {
      console.log(this.availableNosologies)
      console.log(this.availableCategories)
      console.log(this.data)
      this.filteredData = this.data.filter(item => {
         const nosologies = item.nosologies;
         let isTrue = this.availableNosologies.length === 0;

         if (!isTrue) {
            console.log(isTrue)
            for (let i = 0; i < nosologies.length; i++) {
               if (this.availableNosologies.includes(nosologies[i])) {
                  isTrue = true;
               }
            }
         }


         return isTrue && this.availableCategories.includes(item.category);
      });

      this.showBtnOrText();
   };

   showBtnOrText = () => {
      if (this.filteredData.length) {
         this.$catalogFilterBtn.removeClass('hide').text('Показать ' + this.filteredData.length + ' ' + declOfNum(this.filteredData.length, ['продукт', 'продукта', 'продуктов']));
         this.$catalogFilterText.addClass('hide');
      } else {
         this.$catalogFilterBtn.addClass('hide');
         this.$catalogFilterText.removeClass('hide');
      }
   };

   /*Поиск по чекбоксам*/
   catalogSearchInput = e => {
      let query = $(e.currentTarget).val();

      if (query.length > 0) {
         this.$catalogClearSearch.addClass('show');
      } else {
         this.$catalogClearSearch.removeClass('show');
      }

      this.catalogSearch(query);
   };

   /*Очистка поля для поиска*/
   clearSearch = () => {
      this.$filter.find('#catalog-filter-search').val('');

      this.catalogSearch('');

      this.$catalogClearSearch.removeClass('show');
   };

   /*Поиск по чекбоксам*/
   catalogSearch = query => {
      this.$catalogFilterList.find('.letter-item').addClass('hide');
      this.$catalogFilterList.find('.letter-item .filter-item').addClass('hide');

      this.$catalogFilterList.find('.letter-item .filter-item').each((_, item) => {
         let text = $(item)
            .text()
            .toLowerCase();

         if (text.indexOf(query.toLowerCase()) !== -1) {
            $(item)
               .removeClass('hide')
               .closest('.letter-item')
               .removeClass('hide');
         }
      });

      this.$catalogFilterList.find('.letter-item .filter-item label > span').each((_, item) => {
         let text = $(item).text();

         $(item).html(text);
      });

      if (query.length > 0) {
         highlightSomeText(query, document.getElementById('catalog-categories-list'));
      }
   };

   /*Установка шаблонов карточек товаров*/
   setCatalogData = () => {
      let data = this.filteredData;
      console.log(data);
      let template = ``;

      for (let i = 0; i < data.length; i++) {
         template += this.getItemTemplate(data[i]);
      }

      if (data.length !== 0) {
         this.$catalogList.html(template);
      } else {
         this.$catalogList.html(`<p class="text-align-center margin-top-x3">По вашему фильтру ничего не найдено</p>`);
      }
   };
   /*ИШаблон карточки товара*/
   getItemTemplate = item => {
      let stars = this.getItemStars(item.stars);
      let itemType = this.getItemType(item);

      return `
         <a href="${item.url}" class="card-item">
                <span class="divider"></span>
                <div class="card-item__img hide-desktop" style="background-image: url(${item.img})"></div>
                <div class="card-item__top">
                    <div class="card-item__rating">
                        ${stars}
                    </div>
                    ${itemType}
                </div>
                <div class="card-item__content">
                    <div class="card-item__img" style="background-image: url(${item.img})"></div>
                    <div class="card-item__text-wrap">
                        <div class="card-item__text-block">
                            <div class="card-item__title">${item.title}</div>
                            ${item.desc}
                        </div>
                        <button class="button small blue">Узнать подробнее</button>
                    </div>

                </div>
            </a>
      `;
   };

   /*Звездный рейтинг в карточке товара*/
   getItemStars = stars => {
      let count = +stars;
      let grayStarsCount = 5 - count;
      let template = ``;

      for (let i = 0; i < count; i++) {
         template += `<div class="star"></div>`;
      }
      for (let j = 0; j < grayStarsCount; j++) {
         template += `<div class="star star-gray"></div>`;
      }

      return template;
   };

   /*Тэг с типом на карточке товара*/
   getItemType = item => {
      return `
        <span class="card-item__tag color-${item.productType}">${item.productTypeName}</span>
      `;
   };
}
