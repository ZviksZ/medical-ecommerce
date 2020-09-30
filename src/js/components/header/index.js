export class Header {
    constructor() {
        this.$header = document.getElementById('header');
        this.headerClassName = 'compact';

        this.init();
    }

    init = () => {
        this.refreshStateHeader();

        window.addEventListener('scroll', () => {
            this.refreshStateHeader();
        });
    }

    refreshStateHeader = () => {
        if (window.innerWidth < 1000) {
            if (pageYOffset > 0) {
                this.$header.classList.add(this.headerClassName);
            } else {
                this.$header.classList.remove(this.headerClassName);
            }
        } else {
            if (pageYOffset > 40) {
                this.$header.classList.add(this.headerClassName);
            } else {
                this.$header.classList.remove(this.headerClassName);
            }
        }

    }
}
