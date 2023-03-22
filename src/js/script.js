import carousel from './modules/carousel';
import cards from './modules/cards';
import module from './modules/module';
import forms from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {
    carousel({
        corouselSect: '.corousel__inner__contens',
        slidesSect: '.corousel__inner__contens .slide',
        nextBtnSect: '.corousel__btn-next',
        prevBtnSect: '.corousel__btn-prev',
        navCarouselSect: '.corousel-nav',
        navItemClass: 'corousel-nav__item',
        navItemClassActive: 'corousel-nav__item-active',
        cloneFrstSect: '.clone__first',
        cloneLastSect: '.clone__last',
        parentCarouselSect: '.corousel'
    });
    cards('dataBase/db.json');
    module('.overflow', '#consultation', '.modall__close', '[data-consultation]');

    const findCatalogBtn = setInterval(() => {
        if(document.querySelector('.button_catalog')) {
            module('.overflow', '#order','.modall__close' , '.button_catalog');
            clearInterval(findCatalogBtn);
        }
    }, 5);
    forms('./server/server.php');
});