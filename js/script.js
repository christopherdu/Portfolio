//Stickty nav toggling

window.onscroll = () => {
    
    // variables
    const logo = document.querySelector('.landing__logo__du');
    const proj = document.querySelector('#projects');
    const conta = document.querySelector('#contact');
    const about = document.querySelector('#about');
    const stickyNav = document.querySelector(".fixed-nav");
    const navLogo = document.querySelector('.nav__logo')
    const navLi = document.querySelectorAll(".fixed-nav__li__a")

    // if top of the window reaches bottom of the LOGO show nav/if top of window goes about logo hide nav else 
    if(window.pageYOffset > logo.getBoundingClientRect().bottom + window.scrollY) {
        stickyNav.classList.remove('fixed-nav--hide');
        stickyNav.classList.add('fixed-nav--show');
        stickyNav.style.display = 'grid';
    }else if(window.pageYOffset < logo.getBoundingClientRect().bottom + window.scrollY) {
        stickyNav.classList.remove('fixed-nav--show');
        stickyNav.classList.add('fixed-nav--hide');
        stickyNav.style.display = "none";
    }

    // if top of window reachs PROJECTS change nav color to #348c7b
    if(window.pageYOffset > (proj.getBoundingClientRect().top + window.scrollY) - 5) {
        navLi.forEach((e) => {
            e.classList.add('fixed-nav-li--green');
        })
    }

    // if top of window reaches bottom of ABOUT revet color
    if(window.pageYOffset < about.getBoundingClientRect().bottom + window.scrollY) {
        navLi.forEach((e) => {
            e.classList.remove('fixed-nav-li--green');
        })
    }

    // if top of window reaches top of CONTACT change nav color to ##fffcf1 else if window goes past bottom of projects section change color to #348c7b
    if(window.pageYOffset >= (contact.getBoundingClientRect().top + window.scrollY) - 2) {
        navLi.forEach((e) => {
            e.classList.remove('fixed-nav-li--green');
            e.classList.add('fixed-nav-li--white');
        })

        const navLogo = document.querySelector('.nav__logo');
        navLogo.classList.add("nav__logo--white");
    } else if (window.pageYOffset < conta.getBoundingClientRect().top + window.scrollY) {
        navLi.forEach((e) => {
            e.classList.remove('fixed-nav-li--white');
        })

        
        const navLogo = document.querySelector('.nav__logo');
        navLogo.classList.remove('nav__logo--white');
    }
}

//Smooth scroll for nav elements
(() => {
    const nav = document.querySelectorAll
    ('.nav__container__link');
    const navLi = document.querySelectorAll(".fixed-nav__li__a");

    nav.forEach((e) => {
        const val = e.attributes.value.value;
        e.addEventListener('click', () => {
            document.querySelector(`#${val}`).scrollIntoView({
                behavior: 'smooth'
            });
        });
    })

    navLi.forEach((e) => {
        const val = e.attributes.value.value;
        e.addEventListener('click', () => {
            document.querySelector(`#${val}`).scrollIntoView({
                behavior: 'smooth'
            });
        })
    })

    document.querySelector(".nav__logo").addEventListener('click', (e) => {
        document.querySelector(`#landing`).scrollIntoView({
            behavior: 'smooth'
        });
    })

})();

