function carousel() {
    let direction = -1;

    function changeSlideByTimeout() {
        imgCome(direction);
    }

    let interval = setInterval(changeSlideByTimeout, 7500);

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

        direction = pOrM;
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

        clearInterval(interval);
        interval = setInterval(changeSlideByTimeout, 10000);
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

        clearInterval(interval);
        interval = setInterval(changeSlideByTimeout, 10000);
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
            direction = frstNum;
        } else if(x < -widthImg / 2 + 100) {
            i += widthImg * secondNum;
            direction = secondNum;
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
}

export default carousel;