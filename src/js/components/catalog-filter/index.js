import * as $ from 'jquery';
import { declOfNum, highlightSomeText } from '../helpers';
import { getCatalog } from './catalog-mock.js';

export class CatalogFilter {
   constructor() {
      this.$filter = $('#catalog-modal');
      if (this.$filter.length === 0) {
         return false;
      }

      this.$catalogList = $('#catalog__list');
      this.$catalogFilterList = $('#catalog-categories-list');
      this.$form = $('#catalog-filter-form');
      this.$catalogTitle = $('#catalog-filter-title');
      this.$catalogFilterOpen = $('#catalog-filter-open');
      this.$catalogFilterBtn = $('#catalog-filter-btn');
      this.$catalogFilterText = $('#catalog-filter-text');
      this.$catalogClearSearch = $('#clear-catalog-search');

      this.catalogType = $('#catalogType').val();

      this.isItFirstTouch = true;

      this.init();
   }

   init = () => {
      this.$filter.find('#catalog-filter-search').on('input', this.catalogSearchInput);
      this.$filter.find('input[type="checkbox"]').on('change', this.catalogCheckboxChange);
      this.$catalogFilterBtn.on('click', this.setCatalogData);
      this.$catalogClearSearch.on('click', this.clearSearch);
   };

   catalogCheckboxChange = e => {
      if ($(e.currentTarget).attr('id') === 'filter-select-all') {
         let isChecked = $(e.currentTarget).prop('checked');

         this.$filter.find('#catalog-categories-list input').each((index, item) => {
            $(item).prop('checked', isChecked);
         });
      } else {
         if (this.isItFirstTouch) {
            this.$filter.find('#catalog-categories-list input').each((index, item) => {
               $(item).prop('checked', false);
            });

            $('#filter-select-all').prop('checked', false);

            $(e.currentTarget).prop('checked', true);

            this.isItFirstTouch = false;
         }
      }

      this.getCatalogItems();
      this.setFilterTitle();
   };

   setFilterTitle = () => {
      let count = 0;
      let totalCount = 0;
      this.$catalogFilterList.find('.letter-item:not(.hide) input[type="checkbox"]').each((_, item) => {
         totalCount += 1;
         if ($(item).prop('checked')) {
            count += 1;
         }
      });

      if (count < totalCount && count !== 0) {
         this.$catalogTitle.find('.text-for-search').removeClass('hide');
         this.$catalogFilterOpen.find('.text-for-search').removeClass('hide');
         this.$catalogTitle.find('.count').text(count);
         this.$catalogFilterOpen.find('.count').text(count);
      } else {
         this.$catalogTitle.find('.text-for-search').addClass('hide');
         this.$catalogFilterOpen.find('.text-for-search').addClass('hide');
         this.$catalogTitle.find('.count').text('');
         this.$catalogFilterOpen.find('.count').text('');
      }
   };

   catalogSearchInput = e => {
      let query = $(e.currentTarget).val();

      if (query.length > 0) {
         this.$catalogClearSearch.addClass('show');
      } else {
         this.$catalogClearSearch.removeClass('show');
      }

      this.catalogSearch(query);
   };

   clearSearch = () => {
      this.$filter.find('#catalog-filter-search').val('');

      this.catalogSearch('');

      this.$catalogClearSearch.removeClass('show');
   };

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

   getCatalogItems = async () => {
      const checkedIds = [];

      this.$form.find('input').each((index, item) => {
         const isChecked = $(item).prop('checked');
         const id = $(item).attr('id');
         if (isChecked) {
            checkedIds.push(id);
         }
      });

      try {
         this.catalogData = await fetch('/getCatalog/', {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
               ids: checkedIds,
               type: this.catalogType
            })
         })
            .then(res => res.json())
            .catch(err => this.onError());

         if (this.catalogData.length) {
            this.$catalogFilterBtn.removeClass('hide').text('Показать ' + this.catalogData.length + ' ' + declOfNum(this.catalogData.length, ['продукт', 'продукта', 'продуктов']));
            this.$catalogFilterText.addClass('hide');
         } else {
            this.$catalogFilterBtn.addClass('hide');
            this.$catalogFilterText.removeClass('hide');
         }
      } catch (e) {
         //this.setCatalogData();
      }
   };

   setCatalogData = () => {
      let data = this.catalogData;
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

   getItemType = item => {
      return `
        <span class="card-item__tag color-${item.productType}">${item.productTypeName}</span>
      `;
   };
}
