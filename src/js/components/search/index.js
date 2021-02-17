import * as $     from 'jquery';
import {search} from './search-mock.js'

export class Search {
   constructor() {
      this.$search = $('#search');

      if (this.$search.length === 0) return false;

      this.$searchInput = $('#search-input');
      this.$searchInputClear = $('#search-input-clear');
      this.$searchResults = $('#search-results');
      this.$searchClose = this.$search.find('.close');

      this.init();
   }

   init = () => {
      this.initHandlers();
   };

   initHandlers = () => {
      this.$searchInput.on('input', this.searchInputHandler);
      this.$searchInputClear.on('click', this.clearSearch);
   };

   searchInputHandler = e => {
      let query = $(e.currentTarget).val();

      if (query.length > 0) {
         this.$searchInputClear.addClass('show');

         this.getSearch(query);
      } else {
         this.$searchInputClear.removeClass('show');
         this.$searchResults.html('')
      }
   };

   getSearch = async (query) => {
      this.searchData = await fetch('/search/', {
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify({
            query
         })
      }).then((res) => res.json());

      this.getSearchResults()
   }

   getSearchResults = () => {
      let template = ''

      if (this.searchData.length > 0) {
         for(let i = 0; i < this.searchData.length; i++) {
            let block = this.searchData[i]
            if (block.data) {
               template += `<div class="search-block"><div class="search-block__title">${block.title}</div>`

               for(let j in block.data) {
                  const item = block.data[j]
                  template += `<a href="${item.link}" class="search-block__item">${item.name}</a>`
               }

               template += '</div>'
            }
         }
      } else {
         template += '<div class="search-block"><div class="search-block__title">Ничего не найдено</div></div>'
      }


      this.$searchResults.html(template)
   }

   clearSearch = () => {
      this.$searchInput.val('');

      this.getSearch('');

      this.$searchResults.html('')

      this.$searchInputClear.removeClass('show');
   }
}
