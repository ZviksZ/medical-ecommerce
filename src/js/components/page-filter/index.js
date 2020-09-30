import * as $                    from 'jquery';

export class PageFilter {
   constructor() {
      this.$filter = $('.page-filter');
      this.$toggleFilterBtn = this.$filter.find('.page-filter_toggle');
      this.$switches = this.$filter.find('.page-filter_switches');
      this.$switchesItems = this.$switches.find('.page-filter_item');
      this.$activeTab = this.$switches.find('.page-filter_item.active');
      this.$activeTabId = this.$activeTab.attr('data-id') || null;
      this.$tabs = this.$filter.find('.page-filter_tab');

      if (!this.$filter.length) {
         return false
      }

      this.init();
   }

   init = () => {
      this.initTabs();
      this.initHandlers();
   }

   initHandlers = () => {
      this.$toggleFilterBtn.on('click', this.openFilter)
      this.$switches.on('click', this.changeTabs)
   }

   openFilter = (e) => {
      e.preventDefault();

      this.$filter.toggleClass('filter-open')
   }

   initTabs = () => {
      this.$tabs.removeClass('active');
      if (this.$activeTab.length) {
         this.$filter.find('.page-filter_tab[data-tab="' + this.$activeTabId + '"]').addClass('active');
      } else {
         let tab = this.$switchesItems.first().attr('data-id');

         this.$switches.find('.page-filter_item[data-id="' + tab + '"]').addClass('active');
         this.$filter.find('.page-filter_tab[data-tab="' + tab + '"]').addClass('active');
      }
   }

   changeTabs = (e) => {
      e.preventDefault();

      if (!$(e.target).hasClass('active')) {
         this.removeActive();

         e.target.classList.add('active');
         this.$filter.find('.page-filter_tab[data-tab="' + e.target.dataset['id'] + '"]').addClass('active');
      }
   }

   removeActive = () => {
      this.$switchesItems.removeClass('active');
      this.$tabs.removeClass('active');
   }


}
