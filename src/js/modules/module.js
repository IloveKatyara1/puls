import {clearInputs, timeouts, formsS} from './forms';

function closeModal(overflow, modal) {
    overflow.classList.remove('active');
    modal.classList.remove('active');

    formsS.forEach((form, i) => {
        if(form == modal.children[3]) {
            clearInputs(form);
            clearTimeout(timeouts[i]);
        }
    });
    
    lever = true;
}

let lever;

function module(overflowSect, modalSect, btnCloseSect, btnCallSect) {
    lever = false;
 
    const btnCall = document.querySelectorAll(btnCallSect),
            modal = document.querySelector(modalSect),
            overflow = document.querySelector(overflowSect),
            btnModalClose = document.querySelectorAll(btnCloseSect);
    
    if(!btnCallSect) {
        setTimeout(() => {
            if(!lever) {
                closeModal(overflow, modal);
            }
        }, 5000);
    }
        
    function openModal() {
        overflow.classList.add('active');
        modal.classList.add('active');
    }

    btnCall.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            openModal();

            if(btn.getAttribute('class') == 'button button_catalog') {
                const cardTitle = document.querySelectorAll('.catalog-item__title'),
                      modalDescr = modal.querySelector('.modall__descr');
                    
                modalDescr.innerHTML = cardTitle[i].textContent;
            }
        });
    });

    btnModalClose.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(overflow, modal);
        });
    });

    overflow.addEventListener('click', e => {
        if(e.target === overflow) {
            closeModal(overflow, modal);
        }
    });

    window.addEventListener('keydown', e => {
        if(overflow.classList[1] == 'active') {
            if(e.key === 'Escape') {
                closeModal(overflow, modal);
            }
        }
    });
}

export default module;