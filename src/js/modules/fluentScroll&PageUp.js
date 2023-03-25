function fluentScrollPageUp() {
    const pageUp = document.querySelector('.page_up');

    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop >= 1500) {
            pageUp.classList.add('active');
        } else if(document.documentElement.scrollTop <= 1500) {
            pageUp.classList.remove('active');
        }
    });

    if(document.documentElement.scrollTop >= 1500) {
        pageUp.classList.add('active');
    } else if(document.documentElement.scrollTop <= 1500) {
        pageUp.classList.remove('active');
    }

    const a = document.querySelectorAll('a');

    a.forEach(a => {
        if(a.getAttribute('href')[0] == '#') {
            a.addEventListener('click', e => {
                e.preventDefault();

                let sect;

                if(a.getAttribute('href').length > 1) {
                    sect = document.querySelector(a.getAttribute('href'));
                } else {
                    return;
                }

                document.documentElement.style.transition = '1.75s all';
                document.documentElement.scrollTop = sect.offsetTop;

                setTimeout(() => document.documentElement.style.transition = '', 1750);
            });
        }
    });
}

export default fluentScrollPageUp;