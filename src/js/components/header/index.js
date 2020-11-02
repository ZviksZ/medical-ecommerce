import * as $ from 'jquery';

export class Header {
    constructor() {
        this.$header = $('#header');
        this.headerClassName = 'header-color';
        this.scrollPosition = 0;
        this.lastScrollDownPosition = 0;

        this.init();
    }

    init = () => {
        if (pageYOffset > 0) {
            this.$header.addClass(this.headerClassName);
        } else {
            this.$header.removeClass(this.headerClassName);
        }

        $(window).on('scroll', this.refreshStateHeader);
    }

    refreshStateHeader = (e) => {
        let $this = $(e.currentTarget);

        if (pageYOffset > 0) {
            this.$header.addClass(this.headerClassName);
        } else {
            this.$header.removeClass(this.headerClassName);
        }

        if (window.innerWidth >= 1000) {
            let st = $this.scrollTop();

            if (st > this.scrollPosition){
                this.$header.addClass('no-fixed');
                this.lastScrollDownPosition = st;
            } else {
                if (this.scrollPosition < (this.lastScrollDownPosition - 100) || st < 100) {
                    this.$header.removeClass('no-fixed');
                }

            }
            this.scrollPosition = st;
        }
    }
}
