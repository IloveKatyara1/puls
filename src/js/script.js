window.addEventListener('DOMContentLoaded', () => {
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
        } else if (i == 0) {
            imgComeTimeount(imgs.length * -widthImg);
        } else {
            corousel.style.left = `${i}px`;

            setTimeout(() => isImgComeRunning = false, 1000);
        }
    }

    function repeatCorouselByTouch() {
        if (i == (imgs.length + 1) * -widthImg) {
            frstSlideLast(-widthImg);
        } else if (i == 0) {
            frstSlideLast((imgs.length) * -widthImg);
        } else {
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

    const corousel = document.querySelector('.corousel__inner__contens'),
        imgs = corousel.querySelectorAll('.corousel__inner__contens .slide'),
        nextBtn = document.querySelector('.corousel__btn-next'),
        prevBtn = document.querySelector('.corousel__btn-prev'),
        clones = [
            document.querySelector('.clone__first'),
            document.querySelector('.clone__last')
        ],
        
        widthImg = imgs[0].clientWidth;

    let start, x;
    let isImgComeRunning = false;
    let i = -widthImg;
    
    corousel.style.left = `${i}px`;

    clones[0].appendChild(imgs[imgs.length - 1].cloneNode(true));
    clones[1].appendChild(imgs[0].cloneNode(true));

    nextBtn.addEventListener('click', () => imgCome(1));
    prevBtn.addEventListener('click', () => imgCome(-1));

    corousel.addEventListener('touchstart', e => {
        corousel.style.transition = ``;

        start = e.touches[0].clientX;
        
        corousel.addEventListener('touchmove', touchmoveCorousel);
    });

    corousel.addEventListener('touchend', touchEnd);
});