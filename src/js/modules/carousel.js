function carousel({corouselSect, slidesSect, nextBtnSect, prevBtnSect, 
    navCarouselSect, cloneFrstSect, cloneLastSect, navItemClass, navItemClassActive, parentCarouselSect}) {
    const corousel = document.querySelector(corouselSect),
        slides = corousel.querySelectorAll(slidesSect),
        nextBtn = document.querySelector(nextBtnSect),
        prevBtn = document.querySelector(prevBtnSect),
        navCorousel = document.querySelector(navCarouselSect),
        parentCarousel = document.querySelector(parentCarouselSect),
        clones = [
            document.querySelector(cloneFrstSect),
            document.querySelector(cloneLastSect)
        ];

    let widthImg = slides[0].clientWidth;
    let start, x;
    let isImgComeRunning = false;
    let i = -widthImg,
        isMouse, newInterval, multiplier, whichWayWillIntervalGo, wasMove;
    
    window.addEventListener('resize', () => {
        multiplier =  i / -widthImg;
        widthImg = slides[0].clientWidth;
        i = multiplier * -widthImg;

        corousel.style.left = `${i}px`;
        removeActiveInNav((i / widthImg) * -1);
    });

    corousel.style.left = `${i}px`;

    clones[0].appendChild(slides[slides.length - 1].cloneNode(true));
    clones[1].appendChild(slides[0].cloneNode(true));

    nextBtn.addEventListener('click', () => {
        imgCome(-1);
        if(!newInterval) {
            newInterval = true;
        }
    });
    prevBtn.addEventListener('click', () => {
        imgCome(1);
        if(!newInterval) {
            newInterval = true;
        }
    });

    corousel.addEventListener('touchstart', changeSlideByTounchStart);

    corousel.addEventListener('mousedown', changeSlideByMouseStart);

    slides.forEach(() => {
        const navCorouselItem = document.createElement('div');
        navCorouselItem.classList.add(navItemClass);
    
        navCorousel.append(navCorouselItem);
    });

    const navCorouselItems = document.querySelectorAll(`.${navItemClass}`);

    navCorouselItems[0].classList.add(navItemClassActive);

    navCorouselItems.forEach((item, iterator) => {
        item.addEventListener('click', () => {
            if(!newInterval) {
                newInterval = true;
            }

            i = iterator * -widthImg;
            imgCome(-1);
        });
    });

    let direction = -1;

    function changeSlideByTimeout() {
        imgCome(direction);
    }

    let interval = setInterval(changeSlideByTimeout, 7500);

    function changeSlideByTounchStart(e) {
        if (isImgComeRunning) {
            return;
        }

        corousel.style.transition = ``;

        start = e.touches[0].clientX;
        
        corousel.addEventListener('touchmove', touchmoveCorousel);
        corousel.addEventListener('touchend', touchEnd);
    }

    function changeSlideByMouseStart(e) {
        if (isImgComeRunning) {
            return;
        }

        isMouse = true;
        corousel.removeEventListener('mousedown', changeSlideByMouseStart);

        corousel.style.transition = ``;
        corousel.style.cursor = 'grabbing';

        start = e.clientX;
        
        parentCarousel.addEventListener('mousemove', touchmoveCorousel);
        parentCarousel.addEventListener('mouseup', touchEnd);
    }

    function imgComeTimeount(num) {
        corousel.style.left = `${i}px`;

        setTimeout(() => {
            i = num;

            corousel.style.cssText = `transition: none !important;`;
            corousel.style.left = `${i}px`;

            isImgComeRunning = false;
        }, 1000);
    }

    function setNewInterval() {
        clearInterval(interval);
        interval = setInterval(changeSlideByTimeout, 10000);
    }

    function imgCome(pOrM) {
        if (isImgComeRunning) {
            return;
        }

        direction = pOrM;
        isImgComeRunning = true;
        i = i + widthImg * pOrM;

        corousel.style.cssText = `transition: 1s all;`;

        if (i == (slides.length + 1) * -widthImg) {
            imgComeTimeount(-widthImg);
            removeActiveInNav(slides.length + 1);
        } else if (i == 0) {
            imgComeTimeount(slides.length * -widthImg);
            removeActiveInNav(0);
        } else {
            corousel.style.left = `${i}px`;

            removeActiveInNav((i / widthImg) * -1);
            setTimeout(() => isImgComeRunning = false, 1000);
        }
    }

    function repeatCorouselByTouch() {
        if (i == (slides.length + 1) * -widthImg) {
            removeActiveInNav(slides.length + 1);
            frstSlideLast(-widthImg);
        } else if (i == 0) {
            removeActiveInNav(0);
            frstSlideLast((slides.length) * -widthImg);
        } else {
            removeActiveInNav((i / widthImg) * -1);

            corousel.style.cssText = `transition: 0.5s all;`;
            corousel.style.left = `${i}px`;
        }
    }

    function frstSlideLast(num) {
        corousel.style.cssText = `transition: 0.5s all;`;
        corousel.style.left = `${i}px`;

        isImgComeRunning = true;
        i = num;

        setTimeout(() => {
            corousel.style.cssText = ``;
            corousel.style.left = `${i}px`;
            isImgComeRunning = false;
        }, 500);
    }

    function thouchendCorousel(frstNum, secondNum) {
        if(x >= widthImg / 2 - 100) {
            i += widthImg * frstNum;
        } else if(x < -widthImg / 2 + 100) {
            i += widthImg * secondNum;
        }

        if(!newInterval) {
            newInterval = true;
        }

        repeatCorouselByTouch();
    }
    
    function touchmoveCorousel(e) {      
        if (isImgComeRunning) {
            return;
        }
  
        if(isMouse) {
            if(e.target.tagName !== 'IMG') {
                let newLeft = i + x * -1;
                corousel.style.left = `${newLeft}px`; 

                parentCarousel.removeEventListener('mousemove', touchmoveCorousel);
                parentCarousel.removeEventListener('mouseup', touchEnd);
                touchEnd();

                return;
            }
            x = (start - e.clientX);
        } else {
            x = (start - e.touches[0].clientX);
        }

        wasMove = true;
            
        let newLeft = i + x * -1;
        corousel.style.left = `${newLeft}px`;        

        if(x <= -widthImg || x >= widthImg) {
            corousel.removeEventListener('touchmove', touchmoveCorousel);
        }
    }

    function touchEnd() {     
        if (isImgComeRunning) {
            return;
        }
        if(!wasMove) {
            return;
        }
        
        if(isMouse) {
            corousel.style.cursor = 'grab';

            corousel.addEventListener('mousedown', changeSlideByMouseStart);

            parentCarousel.removeEventListener('mousemove', touchmoveCorousel);
            parentCarousel.removeEventListener('mouseup', touchEnd);

            isMouse = false;
        }

        if (i > 0) {
            thouchendCorousel(1, -1);
        } else if(i < 0) {
            thouchendCorousel(-1, 1);
        }

        wasMove = false;
    }

    function removeActiveInNav(num) {
        navCorouselItems.forEach(item => {
            item.classList.remove(navItemClassActive);
        });

        if(newInterval) {
            if(whichWayWillIntervalGo < num) {
                direction = -1;
            } else if(whichWayWillIntervalGo > num) {
                direction = 1;
            }

            setNewInterval();
        }

        whichWayWillIntervalGo = num;

        if(num == 0) {
            navCorouselItems[navCorouselItems.length - 1].classList.add(navItemClassActive);
            whichWayWillIntervalGo = navCorouselItems.length;
        } else if(num == navCorouselItems.length + 1) {
            navCorouselItems[0].classList.add(navItemClassActive);
            whichWayWillIntervalGo = 1;
        } else {
            navCorouselItems[num - 1].classList.add(navItemClassActive);
        }
    }
}

export default carousel;