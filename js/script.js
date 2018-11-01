/*
    Toggling class function
    elm = element(s) to have classes toggled
    cla = class(es) to toggle, an array
    sta = state, true or false

    true === remove first class, add second
    false === remove second class, add first
*/

function namenam(elem, classes) {
    if (Array.isArray(elem)) {
        if (Array.isArray(classes)) {
            elem.forEach(e => e.classList.replace(classes[0], classes[1]));
        } else {
            elem.forEach(e => e.classList.add(classes));
        }
    } else if (!Array.isArray(elem)) {
        if (Array.isArray(classes)) {
            elem.classList.replace(classes[0], classes[1]);
        } else {
            elem.classList.add(classes);
        }
    }
}

function toggleC(elm, cla, sta) {
    if (sta === true) {
        if (typeof cla === 'string') {
            if (elm[0] !== undefined) {
                elm.forEach(e => e.classList.add(cla));
            } else {
                elm.classList.add(cla);
            }
        } else if (elm[0] !== undefined) {
            elm.forEach(e => e.classList.remove(cla[0]));
            elm.forEach(e => e.classList.add(cla[1]));
        } else {
            elm.classList.remove(cla[0]);
            elm.classList.add(cla[1]);
        }
    } else if (sta === false) {
        if (typeof cla === 'string') {
            if (elm[0] !== undefined) {
                elm.forEach(e => e.classList.remove(cla));
            } else {
                elm.classList.remove(cla);
            }
        } else if (elm[0] !== undefined) {
            elm.forEach(e => e.classList.remove(cla[1]));
            elm.forEach(e => e.classList.add(cla[0]));
        } else {
            elm.classList.remove(cla[1]);
            elm.classList.add(cla[0]);
        }
    }
}

// Bold the currently focused section in the fixed nav
function toggleActiveSection(dataName) {
    const fixedNavLi = [].concat(...document.querySelectorAll('.fixed-nav__li'));
    const filtered = fixedNavLi.filter(e => e.getAttribute('data-name') === dataName);

    fixedNavLi.forEach(e => e.classList.remove('fixed-nav__li--active'));
    filtered[0].classList.add('fixed-nav__li--active');
}

/*

    Handle events related to scrolling

*/
(() => {
    // Variables
    const logo = document.querySelector('.landing__logo__du');
    const projElem = document.querySelector('#project');
    const contaElem = document.querySelector('#contact');
    const aboutElem = document.querySelector('#about');
    const fixedNav = document.querySelector('.fixed-nav');
    const fixedNavLogo = document.querySelector('.nav__logo');
    const fixedNavLiArr = [].concat(...document.querySelectorAll('.fixed-nav__li__a'));
    const fixedNavLi = [].concat(...document.querySelectorAll('.fixed-nav__li'));

    // Intersection Observer API - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    // Function used as callback for intersection observer
    function logoIntersect(entries) {
        if (entries[0].intersectionRatio === 0.0) {
            toggleC(fixedNav, ['fixed-nav--hide', 'fixed-nav--show'], true);
        } else if (entries[0].intersectionRatio >= 0.2) {
            toggleC(fixedNav, ['fixed-nav--hide', 'fixed-nav--show'], false);
        }
    }

    function createLogoObserver() {
        const options = {
            root: null, // element that is used as viewport (null = browser)
            rootMargin: '0px',
            threshold: [0, 0.2], // when 80% of the observe target is visible
        };

        const observer = new IntersectionObserver(logoIntersect, options);
        observer.observe(logo);
    }


    createLogoObserver();

    // Intersection Observer API - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    // Function used as callback for intersection observer
    function sectionIntersect(entries) {
        entries.forEach((e) => {
            // If the current element we're observing is intersecting
            if (e.intersectionRatio > 0) {
                // Specifically the project section
                if (e.target === projElem) {
                    // Change the color of the fixed nav links when reaching the threshold
                    toggleC(fixedNavLiArr, ['fixed-nav__a--basecolor', 'fixed-nav__a--logocolor'], true);

                    // Change the color of the fixed nav link bottom-border transition
                    toggleC(fixedNavLi, ['fixed-nav__li--alt', 'fixed-nav__li--def'], true);

                    // Change the color of the logo in the fixed nav
                    toggleC(fixedNavLogo, ['nav__logo--white', 'nav__logo--green'], true);

                    // Add active class to corresponding fixed nav element
                    toggleActiveSection('projects');
                }

                // About section
                if (e.target === aboutElem) {
                    toggleC(fixedNavLiArr, 'fixed-nav__a--logocolor', false);
                    toggleActiveSection('about');
                }

                //  Contact serction
                if (e.target === contaElem) {
                    toggleC(fixedNavLiArr, ['fixed-nav__a--logocolor', 'fixed-nav__a--basecolor'], true);
                    toggleC(fixedNavLi, ['fixed-nav__li--def', 'fixed-nav__li--alt'], true);
                    toggleC(fixedNavLogo, ['nav__logo--green', 'nav__logo--white'], true);
                    toggleActiveSection('contact');
                }
            }
        });
    }

    // Creating the observer function for the three sections
    function createSectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: [0.8],
        };

        const observer = new IntersectionObserver(sectionIntersect, options);
        observer.observe(aboutElem);
        observer.observe(projElem);
        observer.observe(contaElem);
    }

    createSectionObserver();

    function animateIntersect(entries) {
        const aboutTopLeft = document.querySelector('.about__top__left');
        const aboutTopLeftImg = document.querySelector('.about__top__left__img');
        const aboutTopRightList = Array.from(document.querySelectorAll('.about__top__right__li'));
        const aboutBot = Array.from(document.querySelectorAll('.about__bot__ani'));
        const contactMeHeader = document.querySelector('.contact__me__header');
        const contactMeEmail = document.querySelector('.contact__me__email');
        const contactSocialHeader = document.querySelector('.contact__social__header');
        const contactSocialLinks = Array.from(document.querySelectorAll('.contact__social__icons__link'));

        entries.forEach((e) => {
            if (e.intersectionRatio >= 0.4) {
                if (e.target === aboutElem) {
                    toggleC(aboutTopLeft, ['about__top--hide', 'about__top--show'], true);
                    toggleC(aboutTopLeftImg, ['about__top__img--hide', 'about__top__img--show'], true);

                    aboutTopRightList.forEach((n, i) => toggleC(n, ['about__top__right__li--hide', `about__top__right__li--show__${i}`], true));

                    aboutBot.forEach((n, i) => namenam(n, `about__bot__ani--show__${i}`));
                } else if (e.target === contaElem) {
                    toggleC(contactMeHeader, ['contact__me__header--hide', 'contact__me__header--show'], true);
                    toggleC(contactMeEmail, ['contact__me__email--hide', 'contact__me__email--show'], true);

                    toggleC(contactSocialHeader, ['contact__me__header--hide', 'contact__me__header--show'], true);
                    contactSocialLinks.forEach((n, i) => toggleC(n, ['contact__icons__link--hidden', `contact__social__icons__link--show__${i}`], true));
                }
            }
        });
    }

    function createAnimateObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.4,
        };

        const observer = new IntersectionObserver(animateIntersect, options);
        observer.observe(aboutElem);
        observer.observe(projElem);
        observer.observe(contaElem);
    }

    createAnimateObserver();
})();

// Attach scrollIntoView to fixed nav elements
function smoothScrolling(e) {
    const dataName = e.getAttribute('data-name');
    e.addEventListener('click', () => {
        document.querySelector(`#${dataName}`).scrollIntoView({
            behavior: 'smooth',
        });
    });
}

// Smooth scroll for nav elements
(() => {
    // Variables
    const nav = document.querySelectorAll('.nav__container__link');
    const navLi = document.querySelectorAll('.fixed-nav__li__a');
    const fixedNavLogo = document.querySelector('.nav__logo');

    // Landing page nav smooth scroll
    nav.forEach(e => smoothScrolling(e));

    // Fixed nav smooth scroll
    navLi.forEach(e => smoothScrolling(e));

    //  Fixed nav logo smooth scroll to landing page
    smoothScrolling(fixedNavLogo);
})();

// Projects section populating
(() => {
    // Object containing project information to be added to projects section

    const projectObj = {
        1: {
            header: 'Christopher Du Portfolio',
            subheader: 'My personal portfolio',
            tech: ['js', 'sass', 'html5'],
            desc: `<p>This project is my personal portfolio. Used to display projects I've made, how to contact me, and getting to know me a bit more. I feel an online portfolio is a necessary tool for anyone looking to work in the tech industry. I felt it was crucial for me to have a centralized location for anyone to have access to me and my work.</p>
            <p>With that said, when creating my portfolio I had a minimalistic design in mind. I wanted to create my portfolio in a way that showed off my design and front-end skills but also delivered information in an efficient way. In the end, I believe I achieved the goals I had set out for this project.</p>`,
            links: [{
                'fab fa-github': 'https://github.com/christopherdu/Portfolio',
                'fas fa-link': 'https://christopherdu.com',
            }],
            colours: ['#fffcf1', '#141414', '#348c7b'],
        },
        2: {
            header: 'Task List',
            subheader: 'A simple task list',
            tech: ['js', 'css3', 'html5'],
            desc: '<p>A simple task list created using HTML5, Materalize, and ES6+.</p><p>This task list features local and session storage manipulation, and filtering. This was a project to explore DOM manipulation, and working with local and session storaging.</p>',
            links: [{
                'fab fa-github': 'https://github.com/christopherdu/task-list',
                'fas fa-link': 'https://christopherdu.github.io/task-list/',
            }],
            colours: ['#26a79a', '#000000'],
        },
    };

    const projObj = Object.freeze(projectObj);
    const projArr = Object.keys(projObj).map(e => projObj[e]);

    // DOM variables
    const projSection = document.querySelector('.projects__wrapper');
    const element = document.createElement('div');

    projArr.forEach((e) => {
        element.innerHTML += `
            <div class='projects__panel'>
                <header class='projects__panel__header'>
                    <h1 class='projects__panel__header__h1'>${e.header}</h1>
                    <h3 class='projects__panel__header__h3'>${e.subheader}</h3>
                </header>
                <ul class='projects__panel__tech'>
                   ${e.tech.map(key => `
                    <i class='fab fa-${key}'></i>
                   `).join('')} 
                </ul>
                <section class='projects__panel__desc'>
                    ${e.desc}
                </section>
                <ul class='projects__panel__links'>
                    ${e.links.map(key => `
                    ${Object.getOwnPropertyNames(key).map(n => `<li>
                        <a href='${key[n]}' target='__blank' class='${n} projects__panel__links__a'></a>
                    </li>`).join('')}
                    `)}
                </ul>
                <section class='projects__panel__colours'>
                    <ul class='projects__panel__colours__list'>
                        ${e.colours.map(key => `<li class='projects__panel__colours__list__li' style='background:${key}; width:${(100 / e.colours.length)}%;'></li>`).join('')}
                    </ul>
                </section>
            </div>      
        `;
    });

    projSection.innerHTML = element.innerHTML;
})();
