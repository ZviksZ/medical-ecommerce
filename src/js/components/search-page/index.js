import * as $          from 'jquery';
import {getMockupNews} from "../news/news-mockup-data.js";
import {result}        from "./search-mockup-data.js";

export class SearchPage {
   constructor() {
      this.$section = $('.search');
      if (!this.$section.length) {
         return false
      }

      this.$input = $('#search-input');
      this.$inputBtn = $('#search-btn');
      this.$resultsBlock = $('#search-results');
      this.$searchItemsBlock = $('#search-items');


      this.init();
   }

   init = () => {
      this.initHandlers();
   }

   initHandlers = () => {
      this.$inputBtn.on('click', this.getSearch);
   }

   getSearch = async (e) => {
      e.preventDefault();
      this.hideContent();

      let inputValue = this.$input.val();

      if (inputValue.length > 0) {
         this.$searchData = await this.getSearchResults(inputValue);

         this.$resultsBlock.find('.search-query').removeClass('hide');
         this.$resultsBlock.find('span.query').text(inputValue);

         if (this.$searchData.length > 0) {
            this.$searchItemsBlock.removeClass('hide');

            let searchTemplates = this.getSearchTemplates(this.$searchData);

            this.$searchItemsBlock.html(searchTemplates);
         } else {
            this.$resultsBlock.find('.search-noresult').removeClass('hide');
         }

      }
   }

   hideContent = () => {
      this.$resultsBlock.find('.search-query').addClass('hide');
      this.$resultsBlock.find('.search-noresult').addClass('hide');
      this.$searchItemsBlock.addClass('hide').html('');
   }

   getSearchResults = (query) => {
      /*let res;
      await $.get( `/search/${query}`, function( data ) {
          res = data
      });
      return res*/

      $.ajax({
         url: '/getSearch',
         type: 'POST',
         dataType: 'text',
         data: {query},
         success: (res) => {
            console.log('success')
         },
         error: (res) => {
            console.log('error')
         },
         timeout: 30000
      });

      return result;
   }

   getSearchTemplates = (data) => {
      let template = ``;

      for (let i = 0; i < data.length; i++) {
         template += this.searchTemplate(data[i])
      }

      return template;
   }

   searchTemplate = (item) => {
      const img = item?.image || './img/news/empty-news.jpg';

      return `
         <div class="item">
                    <a href=${item.link} class="bg" style="background-image: url(${img})">
                        <span class="tag">${item.type}</span>
                    </a>
                    <div class="info">
                        <div class="title">${item.title}</div>
                        <div class="text">
                            ${item.text}
                        </div>
                        <a href=${item.link} class="more-btn">Подробнее</a>
                    </div>
                </div>
      `
   }
}
