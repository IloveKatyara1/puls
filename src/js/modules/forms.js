import {postData} from '../services/services';
import module from './module';

let productName, data;

let timeouts = [];
const formsS = document.querySelectorAll('form');

function findUrl(form) {
    if(form.getAttribute('id') == 'orderForm') {
        productName = form.parentElement.querySelector('.modall__descr').textContent;

        data.productName = productName;
    }
}

function removeInputError(input) {
    if(input.nextElementSibling.tagName == 'DIV') {
        input.nextElementSibling.remove();
    }
}

function clearInputs(form) {
    form.querySelectorAll('input').forEach(input => {
        input.value = '';
        input.classList.remove('input_active');
    });

    form.querySelectorAll('div').forEach(div => div.remove());
}

function inputsEvent(input) {
    const div = document.createElement('div');
    div.classList.add('massege-failed');

    input.classList.add('input_active');

    if(input.value == 0) {   
        removeInputError(input);
        
        div.innerHTML = 'ви не вели нічого у верхньому блоці, будь ласка ведіть дані';
        input.after(div);
    } else {
        if(input.getAttribute('name') == 'email') {
            return;
        }
        removeInputError(input);
    }
}

function inputEventForEmail(inputEmail) {
    removeInputError(inputEmail);

    let isBad, haveAtsign;

    const div = document.createElement('div');
    div.classList.add('massege-failed');
    div.innerHTML = 'ви не коректно ввели почту';

    for(let i = 0; i <= inputEmail.value.length; i++) {
        if(inputEmail.value[i] !== '@' && !haveAtsign && inputEmail.value[i] == '.') {
            isBad = 0;
        } else if(inputEmail.value[i] == '@') {
            haveAtsign = true;
            isBad = i;
        }
        if(isBad) {
            if(isBad == inputEmail.value.length - 1) {
                inputEmail.after(div);
            } else {
                removeInputError(inputEmail);
            }
        } else {
            inputEmail.after(div);
        }
    }
}

function inputForEach(inputs, i) {
    clearTimeout(timeouts[i]);
    timeouts[i] = setTimeout(() => clearInputs(formsS[i]), 30000);  

    if(inputs[0].value == '' && inputs[1].value == '' && inputs[2].value == '') {
        clearTimeout(timeouts[i]);
        clearInputs(formsS[i]);
        return;
    }
    inputs.forEach(input => inputsEvent(input));
}

function forms(url) {
    const modalThanks = document.querySelector('#thanks'),
          overflow = document.querySelector('.overflow');

    formsS.forEach((form, i) => {
        const submit = form.querySelector('.button_submit'),
              inputs = form.querySelectorAll('input'),
              inputEmail = form.querySelector('input[name="email"]');

        submit.addEventListener('click', () => {
            form.querySelectorAll('div').forEach(div => div.remove());

            inputEventForEmail(inputEmail);
            inputForEach(inputs, i);
        });

        inputEmail.addEventListener('input', () => {
            form.querySelectorAll('div').forEach(div => div.remove());

            inputEventForEmail(inputEmail);
            inputForEach(inputs, i);
        });

        inputs.forEach(input => input.addEventListener('input', () => inputForEach(inputs, i)));

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

            await postData(url, json)
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
                clearInputs(form);
                module('.overflow', '#thanks', '.modall__close', null);
            });
        });
    });
}

export default forms;
export {clearInputs, timeouts, formsS};