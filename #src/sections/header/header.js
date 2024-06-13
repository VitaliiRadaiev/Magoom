{
    const header = document.querySelector('[data-header]');
    if(header) {
        let isScroll = window.scrollY;

        window.addEventListener('scroll', () => {
            header.classList.toggle('header--scrolling', window.scrollY > 50);
    
            if(window.scrollY > 200) {
                if(window.scrollY > isScroll) {
                    header.classList.add('header--hide');
                } else if(window.scrollY < isScroll) {
                    header.classList.remove('header--hide');
                }
            }
    
            isScroll = window.scrollY;
        })
    }

    const mobileMenu = document.querySelector('[data-mobile-menu]');
    if(mobileMenu) {
        const burger = document.querySelector('[data-action="toggle-show-mobile-menu"]');

        
        const setHeaderAsFixed = () => {
            if (!header) return;
            header.style.setProperty('position', 'fixed');
            document.body.style.setProperty('padding-top', `${header.clientHeight}px`);
        }
    
        const unsetHeaderAsFixed = () => {
            if (!header) return;
            header.style.removeProperty('position');
            document.body.style.removeProperty('padding-top');
        }

        burger.addEventListener('click', () => {
            if(burger.classList.contains('active')) {
                unsetHeaderAsFixed();
                document.documentElement.classList.remove('overflow-hidden');
                document.body.classList.remove('overflow-hidden');
                burger.classList.remove('active');
                mobileMenu.classList.remove('mobile-menu--open');
            } else {
                setHeaderAsFixed();
                document.documentElement.classList.add('overflow-hidden');
                document.body.classList.add('overflow-hidden');
                burger.classList.add('active');
                mobileMenu.classList.add('mobile-menu--open');
            }
        })
    }
}