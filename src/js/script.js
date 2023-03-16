window.addEventListener('DOMContentLoaded', () => {
    // carousel

    function imgComeTimeount(num) {
        corousel.style.left = `${i}px`;

        setTimeout(() => {
            i = num;

            corousel.style.cssText = `transition: none !important;`;
            corousel.style.left = `${i}px`;

            isImgComeRunning = false;
        }, 1000);
    }

    function imgCome(pOrM) {
        if (isImgComeRunning) {
            return;
        }

        isImgComeRunning = true;
        i = i + widthImg * pOrM;

        corousel.style.cssText = `transition: 1s all;`;

        if (i == (imgs.length + 1) * -widthImg) {
            imgComeTimeount(-widthImg);
            removeActiveInNav(imgs.length + 1);
        } else if (i == 0) {
            imgComeTimeount(imgs.length * -widthImg);
            removeActiveInNav(0);
        } else {
            corousel.style.left = `${i}px`;

            removeActiveInNav((i / widthImg) * -1);
            setTimeout(() => isImgComeRunning = false, 1000);
        }
    }

    function repeatCorouselByTouch() {
        if (i == (imgs.length + 1) * -widthImg) {
            removeActiveInNav(imgs.length + 1);
            frstSlideLast(-widthImg);
        } else if (i == 0) {
            removeActiveInNav(0);
            frstSlideLast((imgs.length) * -widthImg);
        } else {
            removeActiveInNav((i / widthImg) * -1);

            corousel.style.cssText = `transition: 0.5s all;`;
            corousel.style.left = `${i}px`;
        }
    }

    function frstSlideLast(num) {
        corousel.style.cssText = `transition: 0.5s all;`;
        corousel.style.left = `${i}px`;

        i = num;

        setTimeout(() => {
            corousel.style.cssText = ``;
            corousel.style.left = `${i}px`;
        }, 500);
    }

    function thouchendCorousel(frstNum, secondNum) {
        if(x >= widthImg / 2 - 100) {
            i += widthImg * frstNum;
        } else if(x < -widthImg / 2 + 100) {
            i += widthImg * secondNum;
        }

        repeatCorouselByTouch();
    }
    
    function touchmoveCorousel(e) {
        x = (start - e.touches[0].clientX);
            
        let newLeft = i + x * -1;
        corousel.style.left = `${newLeft}px`;        

        if(x <= -widthImg || x >= widthImg) {
            corousel.removeEventListener('touchmove', touchmoveCorousel);
        }
    }

    function touchEnd() {
        corousel.removeEventListener('touchmove', touchmoveCorousel);

        if (i > 0) {
            thouchendCorousel(1, -1);
        } else if(i < 0) {
            thouchendCorousel(-1, 1);
        }
    }

    function removeActiveInNav(num) {
        navCorouselItems.forEach(item => {
            item.classList.remove('corousel-nav__item-active');
        });

        if(num == 0) {
            navCorouselItems[navCorouselItems.length - 1].classList.add('corousel-nav__item-active');
        } else if(num == navCorouselItems.length + 1) {
            navCorouselItems[0].classList.add('corousel-nav__item-active');
        } else {
            navCorouselItems[num - 1].classList.add('corousel-nav__item-active');
        }
    }

    const corousel = document.querySelector('.corousel__inner__contens'),
        imgs = corousel.querySelectorAll('.corousel__inner__contens .slide'),
        nextBtn = document.querySelector('.corousel__btn-next'),
        prevBtn = document.querySelector('.corousel__btn-prev'),
        navCorousel = document.querySelector('.corousel-nav'),
        clones = [
            document.querySelector('.clone__first'),
            document.querySelector('.clone__last')
        ];

    let widthImg = imgs[0].clientWidth;
    let start, x;
    let isImgComeRunning = false;
    let i = -widthImg;
    
    window.addEventListener('resize', () => {
        widthImg = imgs[0].clientWidth;
        i = -widthImg;

        corousel.style.left = `${i}px`;
    });

    corousel.style.left = `${i}px`;

    clones[0].appendChild(imgs[imgs.length - 1].cloneNode(true));
    clones[1].appendChild(imgs[0].cloneNode(true));

    nextBtn.addEventListener('click', () => imgCome(-1));
    prevBtn.addEventListener('click', () => imgCome(1));

    corousel.addEventListener('touchstart', e => {
        corousel.style.transition = ``;

        start = e.touches[0].clientX;
        
        corousel.addEventListener('touchmove', touchmoveCorousel);
    });

    corousel.addEventListener('touchend', touchEnd);

    imgs.forEach(() => {
        const navCorouselItem = document.createElement('div');
        navCorouselItem.classList.add('corousel-nav__item');
    
        navCorousel.append(navCorouselItem);
    });

    const navCorouselItems = document.querySelectorAll('.corousel-nav__item');

    navCorouselItems[0].classList.add('corousel-nav__item-active');

    navCorouselItems.forEach((item, iterator) => {
        item.addEventListener('click', () => {
            i = iterator * -widthImg;
            imgCome(-1);
        });
    });

    // tabs

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
                        <ul>
                            <a href="#" class="catalog-item__link-back">НАЗАД</a>
                        </ul>
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

    async function getData(url) {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`сталося помилка ${res.status} подробніше дивитися в консолі`);
        }

        return await res.json();
    }

    getData('dataBase/db.json')
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
                    document.querySelectorAll(`${parentBtn} .catalog-item__datalis ul .catalog-item__link-back`);
    
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
    });

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