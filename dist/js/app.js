function slideUp(target, duration = 500) {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target?.classList.remove('_slide');
    }, duration);
}
function slideDown(target, duration = 500) {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none')
        display = 'block';

    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target?.classList.remove('_slide');
    }, duration);
}
function slideToggle(target, duration = 500) {
    if (!target?.classList.contains('_slide')) {
        target?.classList.add('_slide');
        if (window.getComputedStyle(target).display === 'none') {
            return this.slideDown(target, duration);
        } else {
            return this.slideUp(target, duration);
        }
    }
}
function isSafari() {
    let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    return isSafari;
}
function Android() {
    return navigator.userAgent.match(/Android/i);
}
function BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
}
function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
}
function Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
}
function Windows() {
    return navigator.userAgent.match(/IEMobile/i);
}
function isMobile() {
    return (Android() || BlackBerry() || iOS() || Opera() || Windows());
}

function replaceImageToInlineSvg(query) {
    const images = document.querySelectorAll(query);

    if (images.length) {
        images.forEach(img => {
            img?.classList.remove('img-svg');
            let xhr = new XMLHttpRequest();
            const src = img.getAttribute('data-src') || img.src;
            xhr.open('GET', src);
            xhr.onload = () => {
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200) {
                        let svg = xhr.responseXML.documentElement;
                        svg?.classList.add('_svg', ...Array.from(img.classList));
                        img.parentNode.replaceChild(svg, img);
                    }
                }
            }
            xhr.send(null);
        })
    }
}

function toggleDisablePageScroll(state) {
    if (state) {
        const offsetValue = getScrollbarWidth();
        document.documentElement?.classList.add('overflow-hidden');
        document.body?.classList.add('overflow-hidden');
        document.documentElement.style.paddingRight = offsetValue + 'px';
    } else {
        document.documentElement?.classList.remove('overflow-hidden');
        document.body?.classList.remove('overflow-hidden');
        document.documentElement.style.removeProperty('padding-right');
    }
}

function getScrollbarWidth() {
    const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth;

    return lockPaddingValue;
}

function compensateWidthOfScrollbar(isAddPadding) {

    if (isAddPadding) {
        const scrollbarWidth = getScrollbarWidth();
        document.documentElement.style.paddingRight = scrollbarWidth + 'px';
    } else {
        document.documentElement.style.paddingRight = '0px';
    }
}

function initDisablePageScroll() {
    const selectors = new Set();

    return {
        add: (selector) => {
            selectors.add(selector);
        },
        remove: (selector) => {
            selectors.delete(selector);
        },
        contains: (selector) => {
            return selectors.has(selector);
        },
        getAll: () => {
            return selectors.values();
        }
    }
}

const skipEventBySelectors = initDisablePageScroll();

function checkSkipSelectors(e) {
    return skipEventBySelectors.getAll().some(selector => e.target.closest(selector))
}

function initCopyLink() {
    const copyElements = document.querySelectorAll('[data-copy-link]');
    copyElements.forEach(copyEl => {
        copyEl.addEventListener('click', (e) => {
            e.preventDefault();
            if (!copyEl.href) return;
            navigator.clipboard.writeText(copyEl.href);
            copyEl?.classList.add('copied');

            setTimeout(() => {
                copyEl?.classList.remove('copied');
            }, 1000)
        })
    })
}

function createScrollContainer(htmlEl) {
    const wrapper = document.createElement('div');
    const slide = document.createElement('div');
    const scrollbar = document.createElement('div');

    wrapper.className = 'swiper-wrapper';
    slide.className = 'swiper-slide';
    scrollbar.className = 'swiper-scrollbar';

    htmlEl?.classList.add('swiper');

    slide.append(...htmlEl.children);
    wrapper.append(slide);
    htmlEl.append(wrapper, scrollbar);

    const swiper = new Swiper(htmlEl, {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
            el: scrollbar,
        },
        mousewheel: true,
    });

    return swiper;
}

function initScrollContainers() {
    const containers = document.querySelectorAll('[data-scroll-container]');
    containers.forEach(container => {
        const mode = container.getAttribute('data-scroll-container');
        if (document.documentElement.clientWidth < 1024 && mode === 'desk') return;
        createScrollContainer(container);
    })
}

function initToggleClassesByClick() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('[data-remove-classes-by-click]')) {
            const actionEl = e.target.closest('[data-remove-classes-by-click]');

            let targetSelectors = actionEl.getAttribute('data-remove-classes-target').split(',').map(c => c.trim());
            const classes = actionEl.getAttribute('data-remove-classes-by-click').split(',').map(c => c.trim());

            if (/_self/.test(targetSelectors)) {
                targetSelectors = targetSelectors.filter(c => c !== '_self');
                actionEl?.classList.remove(...classes);
            };

            if (!targetSelectors.length) return;
            const targetElements = document.querySelectorAll(targetSelectors);
            targetElements.forEach(targetEl => {
                targetEl?.classList.remove(...classes);
            })
        }

        if (e.target.closest('[data-add-classes-by-click]')) {
            const actionEl = e.target.closest('[data-add-classes-by-click]');

            let targetSelectors = actionEl.getAttribute('data-add-classes-target').split(',').map(c => c.trim());
            const classes = actionEl.getAttribute('data-add-classes-by-click').split(',').map(c => c.trim());

            if (/_self/.test(targetSelectors)) {
                targetSelectors = targetSelectors.filter(c => c !== '_self');
                actionEl?.classList.add(...classes);
            };

            if (!targetSelectors.length) return;
            const targetElements = document.querySelectorAll(targetSelectors);
            targetElements.forEach(targetEl => {
                targetEl?.classList.add(...classes);
            })
        }
    })
}

function initSmoothScrollByAnchors() {
    let anchors = document.querySelectorAll('a[href^="#"]:not([data-action="open-popup"])');
    if (anchors.length) {
        let header = document.querySelector('[data-header]');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href')
                const id = href.length > 1 ? href : null;
                if (!id) return;
                let el = document.querySelector(href);

                if (el) {
                    e.preventDefault();
                    let top = Math.abs(document.body.getBoundingClientRect().top) + el.getBoundingClientRect().top;

                    if (header) {
                        top = top - header.clientHeight;
                    }

                    window.scrollTo({
                        top: top - 20,
                        behavior: 'smooth',
                    })
                }
            })

        })
    }
}

function initAnchorsLinkOffset() {
    let header = document.querySelector('[data-header]');
    const hash = window.location.hash;
    if (hash) {
        const element = document.querySelector(hash);
        if (element) {
            let top = Math.abs(document.body.getBoundingClientRect().top) + element.getBoundingClientRect().top;

            if (header) {
                top = top - header.clientHeight;
            }

            setTimeout(() => {
                window.scrollTo({
                    top: top - 20,
                    behavior: 'smooth',
                })
            }, 0);
        }
    }
}

function buildThresholdList() {
    const array = [];
    for (let i = 1; i <= 100; i++) {
        array.push(i / 100);
    }
    return array;
}


function initHideWhenOverElements() {
    const elements = document.querySelectorAll('[data-hide-when-over-elements]');
    if (!elements.length) return;

    elements.forEach(el => {
        const targetSelectors = el.getAttribute('data-hide-when-over-elements').split(',').map(c => c.trim());
        const overStates = [];

        targetSelectors.forEach((selector, i) => {
            const observeEl = document.querySelector(selector);
            if (!observeEl) return;

            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 0.01,
            };
            const callback = function (entries) {
                overStates[i] = entries[0].isIntersecting;

                const isOver = overStates.some(state => state);
                if (isOver) {
                    el?.classList.add('!hidden');
                } else {
                    el?.classList.remove('!hidden');
                }
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(observeEl);
        })
        //const observedElements = 
    })
}


function initToggleClassByMatchReqExp() {
    const elements = document.querySelectorAll('[data-action="toggle-class-by-match-req-exp"]');
    elements.forEach(el => {
        const input = el.querySelector('input[type="text"], input[type="email"]');
        if (!input) return;

        const classes = el.getAttribute('data-classes').split(',').map(c => c.trim());

        let regExp;
        if (el.getAttribute('data-reg-exp') === 'email') {
            regExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
        } else {
            regExp = new RegExp(el.getAttribute('data-reg-exp'), 'i');
        }

        let targetSelectors = el.getAttribute('data-target').split(',').map(c => c.trim());
        let targetElements = [];

        if (!targetSelectors.length) return;

        if (/_self/.test(targetSelectors)) {
            targetSelectors = targetSelectors.filter(c => c !== '_self');
            targetElements.push(el);
        };

        targetElements.push(...document.querySelectorAll(targetSelectors));

        input.addEventListener('input', (e) => {
            if (regExp.test(e.target.value)) {
                targetElements.forEach(targetEl => {
                    targetEl?.classList.remove(...classes);
                })
            } else {
                targetElements.forEach(targetEl => {
                    targetEl?.classList.add(...classes);
                })
            }
        })
    })
}

function initAddClassByChangeEvent() {
    const elements = document.querySelectorAll('[data-action="add-classes-by-change-event"]');
    elements.forEach(el => {
        const input = el.querySelector('input[type="radio"]', 'input[type="checkbox"]');
        if (!input) return;

        const classes = el.getAttribute('data-classes').split(',').map(c => c.trim());
        let targetSelectors = el.getAttribute('data-target').split(',').map(c => c.trim());

        let targetElements = [];

        if (!targetSelectors.length) return;

        if (/_self/.test(targetSelectors)) {
            targetSelectors = targetSelectors.filter(c => c !== '_self');
            targetElements.push(el);
        };

        targetElements.push(...document.querySelectorAll(targetSelectors));

        input.addEventListener('change', (e) => {
            if (e.target.checked) {
                targetElements.forEach(targetEl => {
                    targetEl?.classList.add(...classes);
                })
            }
        })
    })
}
function initRemoveClassByChangeEvent() {
    const elements = document.querySelectorAll('[data-action="remove-classes-by-change-event"]');
    elements.forEach(el => {
        const input = el.querySelector('input[type="radio"]', 'input[type="checkbox"]');
        if (!input) return;

        const classes = el.getAttribute('data-classes').split(',').map(c => c.trim());
        let targetSelectors = el.getAttribute('data-target').split(',').map(c => c.trim());

        let targetElements = [];

        if (!targetSelectors.length) return;

        if (/_self/.test(targetSelectors)) {
            targetSelectors = targetSelectors.filter(c => c !== '_self');
            targetElements.push(el);
        };

        targetElements.push(...document.querySelectorAll(targetSelectors));

        input.addEventListener('change', (e) => {
            if (e.target.checked) {
                targetElements.forEach(targetEl => {
                    targetEl?.classList.remove(...classes);
                })
            }
        })
    })
}

function initToggleCollapse() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('[data-toggle-collapse]')) {
            e.preventDefault();
            const el = e.target.closest('[data-toggle-collapse]');

            const selector = el.getAttribute('data-toggle-collapse').trim();
            let targetEl;
            if (/next-element-sibling/.test(selector)) {
                targetEl = el.nextElementSibling;
            } else {
                targetEl = document.querySelector(selector);
            }
            if (!targetEl) return;

            if (el?.classList.contains('active')) {
                el?.classList.remove('active');
                slideUp(targetEl, 300);
            } else {
                el?.classList.add('active');
                slideDown(targetEl, 300);
            }
        }
    })
}

function initTruncateText() {
    const truncateString = (el, stringLength = 0) => {
        let str = el.innerText.trim();
        console.log(stringLength);
        if (str.length <= stringLength) return;
        el.innerText = str.slice(0, stringLength) + '...';
    }

    const truncateTextBoxes = document.querySelectorAll('[data-truncate-text]');
    truncateTextBoxes.forEach(truncateTextBox => {
        truncateString(truncateTextBox, +truncateTextBox.getAttribute('data-truncate-text'))
    })
}

function initTabs() {
    const tabsContainers = document.querySelectorAll('[data-tabs]');
    if (tabsContainers.length) {
        tabsContainers.forEach(tabsContainer => {
            let triggerItems = Array.from(tabsContainer.querySelectorAll('[data-tab-trigger]'));
            let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));

            if (!(tabsContainer.getAttribute('data-tabs') === 'nested')) {
                triggerItems = triggerItems.filter(item => !item.closest('[data-tabs="nested"]'));
                contentItems = contentItems.filter(item => !item.closest('[data-tabs="nested"]'));
            }

            const getContentItem = (id) => {
                if (!id.trim()) return;
                return contentItems.filter(item => item.dataset.tabContent === id)[0];
            }

            if (triggerItems.length && contentItems.length) {
                // init
                let activeItem = tabsContainer.querySelector('.tab-active[data-tab-trigger]');
                if (activeItem) {
                    activeItem?.classList.add('tab-active');
                    getContentItem(activeItem.dataset.tabTrigger)?.classList.add('tab-active');
                } else {
                    if (!(tabsContainer.getAttribute('data-tabs') === 'no-start-active')) {
                        triggerItems[0]?.classList.add('tab-active');
                        getContentItem(triggerItems[0].dataset.tabTrigger)?.classList.add('tab-active');
                    }
                }

                triggerItems.forEach(item => {
                    item.addEventListener('click', () => {
                        item?.classList.add('tab-active');
                        getContentItem(item.dataset.tabTrigger)?.classList.add('tab-active');

                        triggerItems.forEach(i => {
                            if (i === item) return;

                            i?.classList.remove('tab-active');
                            getContentItem(i.dataset.tabTrigger)?.classList.remove('tab-active');
                        })
                    })
                })
            }

        })
    }
}

function initScrollTopByClick() {
    const elements = document.querySelectorAll('[data-action="scroll-top-by-click"]');
    elements.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                // behavior: 'smooth',
            })
        })
    })
}

class LazyLoadScript {
    constructor(src) {
        this.src = src
        this.isScriptLoaded = false;
        this.callbackList = [];
        this.observer = this._createIntersectionObserver();
        this.onLoadSubscription = [];
    }

    async _loadScript() {
        if (this.isScriptLoaded) {
            return true;
        } else {
            return new Promise((res, rej) => {
                const script = document.createElement('script');
                script.src = this.src;
                script.onload = () => {
                    this.isScriptLoaded = true;
                    res(true);
                }
                script.onerror = () => {
                    res(false);
                }
                document.body.append(script);
            })
        }
    }

    _createIntersectionObserver() {
        let options = {
            root: null,
            rootMargin: "0px 0px 50% 0px",
            threshold: [0.01],
        };

        const observer = new IntersectionObserver(async (entries) => {
            for (let index = 0; index < entries.length; index++) {
                const entry = entries[index];
                if (entry.isIntersecting) {
                    const isScriptLoaded = await this._loadScript();

                    console.log('scriptLoaded', isScriptLoaded);

                    if (isScriptLoaded) {
                        this.onLoadSubscription.forEach(fn => fn());
                        this.callbackList.forEach(fn => fn())
                        console.log('called callback function');
                    }

                    console.log('observer disconnect');
                    observer.disconnect();
                    break;
                }
            }
        }, options);

        return observer;
    }

    async addObserver(htmlEl, callback) {
        this.callbackList.push(callback);
        this.observer.observe(htmlEl);
        return this.observer;
    }

    onLoad(callback) {
        this.onLoadSubscription.push(callback);
    }
}

function initCssVariableHeight() {
    const elements = document.querySelectorAll('[data-css-variable-height]');
    elements.forEach(el => {
        const variableName = el.getAttribute('data-css-variable-height');
        if (!variableName) return;

        const setVariable = () => {
            document.body.style.setProperty(variableName, el.clientHeight + 'px');
        }

        setVariable();

        window.addEventListener('resize', setVariable);
    })
}
function initCssVariableWidth() {
    const elements = document.querySelectorAll('[data-css-variable-width]');
    elements.forEach(el => {
        const variableName = el.getAttribute('data-css-variable-width');
        if (!variableName) return;

        const parent = el.closest(el.getAttribute('data-parent'));

        const setVariable = () => {
            if(parent) {
                parent.style.setProperty(variableName, el.clientWidth + 'px');
            } else {
                document.body.style.setProperty(variableName, el.clientWidth + 'px');
            }
        }

        setVariable();

        setInterval(setVariable, 200);

        window.addEventListener('resize', setVariable);
    })
}

function initParallax() {
    const elements = document.querySelectorAll('[data-scroll-parallax]');
    if (document.documentElement.clientWidth >= 992) {
        elements.forEach(el => {
            gsap.fromTo(el,
                { y: Number(el.getAttribute('data-start-y'))},
                {
                    y: Number(el.getAttribute('data-end-y')) ,
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: true,
                    }
                }
            );
        })
    }
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};


window.addEventListener("DOMContentLoaded", () => {
	if (isMobile()) {
		document.body.classList.add('mobile');
	}

	if (iOS()) {
		document.body.classList.add('mobile-ios');
	}

	if (isSafari()) {
		document.body.classList.add('safari');
	}

	gsap.registerPlugin(ScrollTrigger);

	replaceImageToInlineSvg('.img-svg');
	initSmoothScrollByAnchors();
	initAnchorsLinkOffset();
	initCssVariableHeight();
	initCssVariableWidth();
	initParallax();

	// ==== sections =====================================================
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
        const mobileMenuList = mobileMenu.querySelector('.mobile-menu__list');
        const listItems = Array.from(mobileMenuList.children);

        listItems.forEach(li => {
            const link = li.firstElementChild;
            if(link.nextElementSibling) {
                link.setAttribute('data-spoiler-trigger', '');
            }
        })

        
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
	// let paintingPreview = document.querySelector('[data-home-intro]');
// if (paintingPreview) {

//     //let myPanel = paintingPreview.querySelector('.home-intro__row-1');
//     let myPanel = paintingPreview;
//     let subpanel = paintingPreview.querySelector('.home-intro__title--desk');
//     let parent = paintingPreview;

//     myPanel.onmousemove = transformPanel;
//     myPanel.onmouseenter = handleMouseEnter;
//     myPanel.onmouseleave = handleMouseLeave;

//     let mouseX, mouseY;

//     let transformAmount = 2;

//     function transformPanel(mouseEvent) {
//         mouseX = mouseEvent.pageX;
//         mouseY = mouseEvent.pageY;

//         const centerX = myPanel.offsetLeft + myPanel.clientWidth / 2;
//         const centerY = myPanel.offsetTop + myPanel.clientHeight / 2;

//         const percentX = (mouseX - centerX) / (myPanel.clientWidth / 2);
//         const percentY = -((mouseY - centerY) / (myPanel.clientHeight / 2));

//         //subpanel.style.transform = "perspective(400px) rotateY(" + percentX * transformAmount + "deg) rotateX(" + percentY * transformAmount + "deg)";
//         gsap.to(subpanel, 1, {
//             transformPerspective: 400,
//             rotateY: percentX * transformAmount,
//             rotateX: percentY * transformAmount,
//         });
//     }

//     function handleMouseEnter() {
//         parent.classList.add('hover');

//         setTimeout(() => {
//             subpanel.style.transition = "";
//         }, 100);
//         //subpanel.style.transition = "transform 0.1s";
//     }

//     function handleMouseLeave() {
//         parent.classList.remove('hover');
//         //subpanel.style.transition = "transform 0.1s";
//         setTimeout(() => {
//             subpanel.style.transition = "";
//         }, 100);

//         //subpanel.style.transform = "perspective(400px) rotateY(0deg) rotateX(0deg)";
//         gsap.to(subpanel, 1, {
//             transformPerspective: 400,
//             rotateY: 0,
//             rotateX: 0,
//         });
//     }
// }
	
	{
    const reviewsCarousel = document.querySelectorAll('[data-slider="reviews-carousel"]');
    reviewsCarousel.forEach(carousel => {
        let swiper = new Swiper(carousel.querySelector('.swiper'), {
            // observer: true,
            // observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 400,
            navigation: {
                nextEl: carousel.querySelector('.btn-right'),
                prevEl: carousel.querySelector('.btn-left'),
            },
        });
    })
}
	// {
//     const footer = document.querySelector('[data-footer]');
//     if (footer) {
//         const transformWrapper = footer.querySelector('.footer__transform-wrapper');
//         if (transformWrapper && document.documentElement.clientWidth >= 992)  {
//             gsap.set(transformWrapper, { yPercent: -50 })
    
//             const uncover = gsap.timeline({ paused: true })
    
//             uncover.to(transformWrapper, { yPercent: 0, ease: 'none' });
    
//             const end = document.documentElement.clientWidth < 992
//                 ? 'bottom 10%'
//                 : `bottom ${document.documentElement.clientHeight - transformWrapper.clientHeight}`;
    
//             ScrollTrigger.create({
//                 trigger: footer.previousElementSibling,
//                 start: 'bottom bottom',
//                 end: end,
//                 animation: uncover,
//                 scrub: true,
//                 //markers: {startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20}
//             })
    
//             window.addEventListener('resize', () => {
//                 ScrollTrigger.update();
//             })

//         }
//     }
// }
	// ==== // sections =====================================================

	// ==== components =====================================================
	{
    const spoilers = document.querySelectorAll('[data-spoiler]');
    if (spoilers.length) {
        spoilers.forEach(spoiler => {
            const swiper = spoiler.closest('[data-scroll-container]')?.swiper;
            let isOneActiveItem = spoiler.dataset.spoiler.trim() === 'one' ? true : false;
            let triggers = spoiler.querySelectorAll('[data-spoiler-trigger]');
            if (triggers.length) {
                triggers.forEach(trigger => {
                    let parent = trigger.parentElement;
                    let content = trigger.nextElementSibling;

                    // init
                    if (trigger.classList.contains('active')) {
                        content.style.display = 'block';
                        parent.classList.add('active');
                    }

                    trigger.addEventListener('click', (e) => {
                        e.preventDefault();
                        parent.classList.toggle('active');
                        trigger.classList.toggle('active');
                        content && slideToggle(content, 300);
                        swiper && setTimeout(() => swiper.update(), 300);

                        if (isOneActiveItem) {
                            triggers.forEach(i => {
                                if (i === trigger) return;

                                let parent = i.parentElement;
                                let content = i.nextElementSibling;

                                parent.classList.remove('active');
                                i.classList.remove('active');
                                content && slideUp(content, 300);
                                swiper && setTimeout(() => swiper.update(), 300);
                            })
                        }
                    })
                })
            }
        })
    }

    const radioSpoilers = document.querySelectorAll('[data-radio-spoiler]');
    radioSpoilers.forEach(radioSpoiler => {
        let triggers = Array.from(radioSpoiler.querySelectorAll('[data-radio-trigger]'))
            .map(el => {
                return {
                    wrapper: el,
                    input: el.querySelector('input[type="radio"]')
                }
            });
        
        triggers.forEach(trigger => trigger.input?.checked && trigger.wrapper.nextElementSibling.style.setProperty('display', 'block'));

        radioSpoiler.addEventListener('change', (e) => {
            const isEventFromTrigger = triggers.find(t => t.input === e.target);
            if(isEventFromTrigger) {
                triggers.forEach(trigger => {
                    if(trigger.input?.checked) {
                        slideDown(trigger.wrapper.nextElementSibling, 300);
                    } else {
                        slideUp(trigger.wrapper.nextElementSibling, 300);
                    }
                })
            }
        })
    })
}
	// ==== // components =====================================================

	

	document.body.classList.add('page-loaded');
});
