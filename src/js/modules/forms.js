import {postData} from '../services/services';
import module from './module';

let productName, data;

function findUrl(form) {
    if(form.getAttribute('id') == 'consultationForm') {
        // return 'http://localhost:3000/consultations';
    } else if(form.getAttribute('id') == 'orderForm') {
        productName = form.parentElement.querySelector('.modall__descr').textContent;

        data.productName = productName;

        // return 'http://localhost:3000/orders';
    }
}

function forms(url) {
    const modalThanks = document.querySelector('#thanks');
    const forms = document.querySelectorAll('form'),
          overflow = document.querySelector('.overflow');

    forms.forEach(form => {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            
            if (form.parentElement.getAttribute('class') == 'modall active') {
                form.parentElement.classList.remove('active');
            }
            overflow.classList.add('active');
            modalThanks.classList.add('modal_center');
            modalThanks.innerHTML = '<div class="modall__close">&times;</div><img src="icons/spinner.svg" alt="spinner">';

            const formData = new FormData(form);

            data = Object.fromEntries(formData.entries());
            // const url = 
            findUrl(form);

            const json = JSON.stringify(data);

            postData(url, json)
            .then((data) => {
                console.log(data);
                if (form.parentElement.getAttribute('class') == 'modal') {
                    form.parentElement.classList.remove('active');
                }

                modalThanks.classList.remove('modal_center');
                modalThanks.classList.add('active');
                
                modalThanks.innerHTML = '<div class="modall__close">&times;</div><div class="modall__title">Спасибо за вашу заявку!</div><div class="modall__descr">Наш менеджер свяжется с вами в ближайшее время!</div>';
            })
            .catch((status) => {
                if (form.parentElement.getAttribute('class') == 'modal') {
                    form.parentElement.classList.remove('active');
                }

                modalThanks.classList.remove('modal_center');
                modalThanks.classList.add('active');

                modalThanks.innerHTML = `<div class="modall__close">&times;</div><div class="modall__title">щось пішло не так</div><div class="modall__descr">вибачте щось пішло не так спробуйте трохи пізніше Помилка <span>${status}</span></div>`;
            })
            .finally(() => {
                form.reset();
                module('.overflow', '#thanks', '.modall__close', null);
            });
        });
    });
    
    $('input[name=phone]').mask("+380 (99) 999-99-99");
}

export default forms;