function fluentScrollPageUp() {
    const pageUp = document.querySelector('.page_up');

    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop >= 1500) {
            pageUp.classList.add('active');
        } else if(document.documentElement.scrollTop <= 1500) {
            pageUp.classList.remove('active');
        }
    });

    const a = document.querySelectorAll('a');

    a.forEach(a => {
        if(a.getAttribute('href')[0] == '#' && a.getAttribute('href').length > 1) {
            a.addEventListener('click', e => {
                e.preventDefault();

                const sect = document.querySelector(a.getAttribute('href'));

                if(sect.offsetTop > document.documentElement.scrollTop) {
                    const intervalPlus = setInterval(() => {
                        if (sect.offsetTop < document.documentElement.scrollTop + 1) {
                            clearInterval(intervalPlus);
                        }

                        document.documentElement.scrollTop += 30;
                    }, 1);
                } else if(sect.offsetTop < document.documentElement.scrollTop) {
                    const intervalMinus = setInterval(() => {
                        if (sect.offsetTop > document.documentElement.scrollTop - 1) {
                            clearInterval(intervalMinus);
                        }

                        document.documentElement.scrollTop -= 30;
                    }, 1);
                }
            });
        }
    });
}

export default fluentScrollPageUp;