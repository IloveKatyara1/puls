import {getData} from '../services/services';

function cards(url) {
    class AddNewCard {
        constructor(img, altimg, title, descr, parant) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.parant = document.querySelector(parant);
        }

        render() {
            const item = document.createElement('div');
            item.classList.add('catalog-item');

            item.innerHTML = `
                <div class="catalog-item_carousel">
                    <div class="catalog-item__main">
                        <img src="${this.img}" alt="${this.altimg}" class="catalog-item__img">
                        <h4 class="catalog-item__title">${this.title}</h4>
                        <p class="catalog-item__descr">${this.descr}</p>
                        <a href="#" class="catalog-item__link">ПОДРОБНЕЕ</a>
                    </div>
                    <div class="catalog-item__datalis">
                        <ul></ul>
                        <a href="#" class="catalog-item__link-back">НАЗАД</a>
                    </div>
                </div>
                <hr>
                <div class="catalog-item__footer">
                    <div class="catalog-item__price">

                    </div>
                    <button class="button button_catalog">КУПИТЬ</button>
                </div>
            `;
            this.parant.append(item);
        }
    }

    function findParent(num) {
        if(num == 0) {
            return '.catalog-fitnes';
        } else if(num == 1) {
            return '.catalog-run';
        } else if(num == 2) {
            return '.catalog-triathlon';
        }
    }

    getData(url)
    .then(data => data.catalog)
    .then(data => {
        const newObj = Object.values(data);
        return newObj;
    })
    .then(data => {
        data.forEach((arr, i) => {
            const parent = findParent(i);

            arr.forEach(({img, altimg, title, descr}) => {
                new AddNewCard(img, altimg, title, descr, parent).render();
            });
        });

        return data;
    })
    .then(data => {
        data.forEach((arr, iParent) => {
            const parent = findParent(iParent);
            const catalogPrice = document.querySelectorAll(`${parent} .catalog-item__price`);

            arr.forEach(({oldPrice, newPrice, price}, i) => {
                if(oldPrice && newPrice && price) {
                    catalogPrice[i].innerHTML = price;
                } else if(oldPrice && newPrice) {
                    catalogPrice[i].innerHTML = `
                        <div class="catalog-item__price-old">${oldPrice}</div>
                        <div class="catalog-item__price-new">${newPrice}</div>
                    `;
                } else if(price) {
                    catalogPrice[i].innerHTML = price;
                }
            });
        });

        return data;
    })
    .then(data => {
        data.forEach((arr, iParent) => {
            const parentBtn = findParent(iParent);
            const ul = document.querySelectorAll(`${parentBtn} .catalog-item__datalis ul`);

            arr.forEach(({details}, count) => {
                details.forEach((item) => {  
                    const li = document.createElement('li');
    
                    li.innerHTML = item;
                    
                    ul[count].append(li);
                });
            });

            ul.forEach((ulFnc, i) => {
                if(ulFnc.scrollHeight > 350){   
                    const catalogLinkBack = 
                    document.querySelectorAll(`${parentBtn} .catalog-item__datalis .catalog-item__link-back`);
    
                    catalogLinkBack[i].style.bottom = `${-ulFnc.scrollHeight + 350 - 30}px`;
                    ulFnc.parentElement.style.cssText = 'right: -15px; margin-left: 0px;';
                }
            });
        });
    })
    .then(() => {
        function moveCatalogCorousel(e, right, i) {
            e.preventDefault();
            catalogCarousel[i].style.right = right;
        }
    
        const catalogLink = document.querySelectorAll('.catalog-item__link'),
              catalogLinkBack = document.querySelectorAll('.catalog-item__link-back'),
              catalogCarousel = document.querySelectorAll('.catalog-item_carousel');
    
        catalogCarousel.forEach(carousel => {
            carousel.style.right = '0px';
        });
    
        catalogLink.forEach((a, i) => {
            a.addEventListener('click', e => moveCatalogCorousel(e, 'calc(100% + 40px)', i));
        });
        catalogLinkBack.forEach((a, i) => {
            a.addEventListener('click', e => moveCatalogCorousel(e, '0px', i));
        });
    })
    .then(() => {
        const catalogWrapper = document.querySelectorAll('.catalog-wrapper'),
              catalogBtnsChangeWrapper = document.querySelectorAll('.catalog__btn');

        catalogWrapper[0].style.cssText = 'right: 0; position: relative';
        catalogBtnsChangeWrapper[0].classList.add('catalog__btn_active');

        catalogBtnsChangeWrapper.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                catalogBtnsChangeWrapper.forEach(btn => btn.classList.remove('catalog__btn_active'));
                catalogWrapper.forEach(wrapper => wrapper.style.cssText = 'left: -9999999px; position: fixed');

                catalogBtnsChangeWrapper[i].classList.add('catalog__btn_active');
                catalogWrapper[i].style.cssText = 'right: 0; position: relative';
            });
        }); 
    });
}

export default cards;