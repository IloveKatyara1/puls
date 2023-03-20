import carousel from './modules/carousel';
import cards from './modules/cards';
import module from './modules/module';
import forms from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {
    carousel();
    cards('dataBase/db.json');
    module('.overflow', '#consultation', '.modall__close', '[data-consultation]');

    const findCatalogBtn = setInterval(() => {
        if(document.querySelector('.button_catalog')) {
            module('.overflow', '#order','.modall__close' , '.button_catalog');
            clearInterval(findCatalogBtn);
        }
    }, 5);
    forms('server/server.php');
});