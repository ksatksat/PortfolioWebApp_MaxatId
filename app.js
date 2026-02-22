//JSON start here for Language wrap
        // \u00AE - it stands for R symbol
/*var data = {
    "english":{
        "logo": "Dmitriy Ivanov \u00AE",
        "aboutMe_li_": "About me",
        "skills_li_": "My skills",
        "portfolio_li_": "Portfolio",
        "videos_li_": "Video",
        "contacts_li_": "Contacts",

        "theme_toggle_1": "Light mode",
        "theme_toggle_2": "Dark mode"
    },
    "kyrgyz":{
        "logo":"Дмитрийбек Ивановбай \u00AE",
        "aboutMe_li_": "Мен жөнүндө",
        "skills_li_": "Менин чеберчилигим",
        "portfolio_li_": "Портфолио",
        "videos_li_": "Видеолор",
        "contacts_li_": "Контакттар",

        "theme_toggle_1": "Жарык",
        "theme_toggle_2": "Караңгы"
    },
    "russian":{
        "logo":"Дмитрий Иванов \u00AE",
        "aboutMe_li_": "Обо мне",
        "skills_li_": "Мои навыки",
        "portfolio_li_": "Портфолио",
        "videos_li_": "Видео",
        "contacts_li_": "Контакты",

        "theme_toggle_1": "Светлый",
        "theme_toggle_2": "Темный"
    }
}
*/
// Select the toggle button and the body
const themeToggleBtn = document.getElementById('theme-toggle');
const body           = document.body;
//============================= TRANSLATION - language wrap
const langEl         = document.querySelector('.langWrap');

//============================= TRANSLATION - language wrap
//const langEl = document.querySelector('.langWrap');
        // i got here only 'a' tags from only '.langWrap' class
        //without involving other 'a' tags here
        //here is an alternative way to reach the same result:
        // grab the container…
        //const langWrap = document.querySelector('.langWrap');
        // …then only its <a> children
        //const links = langWrap.querySelectorAll('a');
const links          = document.querySelectorAll('.langWrap a');
//variables holds html elements : 
const logoEl         = document.querySelector('.logo');
//a[href="#about"] - так можно получить нужный элемент - или как на строчке ниже
const aboutMe_li     = document.querySelector('.header-left nav ul li:nth-child(1) a');
const skills_li      = document.querySelector('.header-left nav ul li:nth-child(2) a');
const portfolio_li   = document.querySelector('.header-left nav ul li:nth-child(3) a');
const videos_li      = document.querySelector('.header-left nav ul li:nth-child(4) a');
const contacts_li    = document.querySelector('.header-left nav ul li:nth-child(5) a');
//about section
const aboutH2        = document.querySelector('.about h2');
const aboutP         = document.querySelector('.about p');
const aboutCBtn      = document.querySelector('.contact-btn');
//skills section
const skillsH2       = document.querySelector('.skills h2');
//portfolio section
const portfolioH2    = document.querySelector('.portfolio h2');
const pH3List        = document.querySelectorAll('.portfolio-grid .portfolio-item h3');
const portfolioH3_1  = pH3List[0];//race game
const portfolioH3_2  = pH3List[1];//runner game
const portfolioH3_3  = pH3List[2];//fight game
//videos section
const videosH2       = document.querySelector('.videos h2');
//contacts section
const contactsH2     = document.querySelector('.contacts h2');
const contactsBtn    = document.querySelector('.contact-form button');
//Location section
const locationH3     = document.querySelector('.footer-content h3');
//social links section
const aboutWebsite   = document.querySelector('.aboutWebsite');
let data; // will hold your translations

// Function to switch themes
function updateThemeToggleText() {
    //body.classList.toggle('dark-mode'); // Add/remove dark-mode class from body
            // Update the button text based on active theme
    //if (body.classList.contains('dark-mode')) {
    //    //themeToggleBtn.textContent = "Light Mode";//Dark mode active – show Light Mode option
    //    themeToggleBtn.textContent = data[attr].theme_toggle_1;
    //} else {
    //    //themeToggleBtn.textContent = "Dark Mode";//Light mode active – show Dark Mode option
    //    themeToggleBtn.textContent = data[attr].theme_toggle_2;
    //}
    const currentLang = langEl.querySelector('.active').getAttribute('language');
    if (body.classList.contains('dark-mode')) {
            //themeToggleBtn.textContent = "Light Mode";//Dark mode active – show Light Mode option
        themeToggleBtn.textContent = data[currentLang].theme_toggle_light;
    } else {
            //themeToggleBtn.textContent = "Dark Mode";//Light mode active – show Dark Mode option
        themeToggleBtn.textContent = data[currentLang].theme_toggle_dark;
    }
}
function toggleTheme(){
    body.classList.toggle('dark-mode');
    updateThemeToggleText();
}
        // Listen for button clicks and call toggleTheme function
themeToggleBtn.addEventListener('click', toggleTheme);

        
        //main logic start here
links.forEach(el => {
    el.addEventListener('click', () => {
        langEl.querySelector('.active').classList.remove('active');
        el.classList.add('active');
        const lang = el.getAttribute('language');
        //switch lang
        logoEl.textContent        = data[lang].logo;
        //header-left elements
        aboutMe_li.textContent    = data[lang].aboutMe_li_;
        skills_li.textContent     = data[lang].skills_li_;
        portfolio_li.textContent  = data[lang].portfolio_li_;
        videos_li.textContent     = data[lang].videos_li_;
        contacts_li.textContent   = data[lang].contacts_li_;
        //about section
        aboutH2.textContent       = data[lang].aboutH2_;
        aboutP.textContent        = data[lang].aboutP_;
        aboutCBtn.textContent     = data[lang].aboutCBtn_;
        //skills section
        skillsH2.textContent      = data[lang].skillsH2_;
        //portfolio section
        portfolioH2.textContent   = data[lang].portfolioH2_;
        portfolioH3_1.textContent = data[lang].portfolioH3_1_;
        portfolioH3_2.textContent = data[lang].portfolioH3_2_;
        portfolioH3_3.textContent = data[lang].portfolioH3_3_;
        //videos section
        videosH2.textContent      = data[lang].videosH2_;
        //contacts section
        contactsH2.textContent    = data[lang].contactsH2_;
        contactsBtn.textContent   = data[lang].contactsBtn_;
        //Location section
        locationH3.textContent    = data[lang].locationH3_;
        //social links section
        aboutWebsite.textContent  = data[lang].aboutWebsite_;
        updateThemeToggleText();
    });
});
// fetch the JSON and initialize
fetch('./data.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(json => {
    data = json;

    // set all static text to your default language (e.g. “english”)
    const defaultLang = langEl.querySelector('.active').getAttribute('language');
    logoEl.textContent        = data[defaultLang].logo;
    aboutMe_li.textContent    = data[defaultLang].aboutMe_li_;
    skills_li.textContent     = data[defaultLang].skills_li_;
    portfolio_li.textContent  = data[defaultLang].portfolio_li_;
    videos_li.textContent     = data[defaultLang].videos_li_;
    contacts_li.textContent   = data[defaultLang].contacts_li_;
    //about section 
    aboutH2.textContent       = data[defaultLang].aboutH2_;
    aboutP.textContent        = data[defaultLang].aboutP_;
    aboutCBtn.textContent     = data[defaultLang].aboutCBtn_;
    //skills section 
    skillsH2.textContent      = data[defaultLang].skillsH2_;
    //portfolio section
    portfolioH2.textContent   = data[defaultLang].portfolioH2_;
    portfolioH3_1.textContent = data[defaultLang].portfolioH3_1_;
    portfolioH3_2.textContent = data[defaultLang].portfolioH3_2_;
    portfolioH3_3.textContent = data[defaultLang].portfolioH3_3_;
    //videos section
    videosH2.textContent      = data[defaultLang].videosH2_;
    //contacts section
    contactsH2.textContent    = data[defaultLang].contactsH2_;
    contactsBtn.textContent   = data[defaultLang].contactsBtn_;
    //Location section
    locationH3.textContent    = data[defaultLang].locationH3_;
    //social links section
    aboutWebsite.textContent  = data[defaultLang].aboutWebsite_;
    // finally, set the correct toggle‐button label
    updateThemeToggleText();
  })
  .catch(err => console.error('Failed to load translations:', err));
        