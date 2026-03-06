// Select the toggle button and the body
const themeToggleBtn = document.getElementById('theme-toggle');
const body           = document.body;
//============================= TRANSLATION - language wrap
const langEl         = document.querySelector('.langWrap');
//============================= TRANSLATION - language wrap
const links          = document.querySelectorAll('.langWrap a');
//variables holds html elements : 
const logoEl         = document.querySelector('.logo');
//a[href="#about"] - так можно получить нужный элемент - или как на строчке ниже
const aboutMe_li     = document.querySelector('.header-left nav ul li:nth-child(1) a');
const skills_li      = document.querySelector('.header-left nav ul li:nth-child(2) a');
const portfolio_li   = document.querySelector('.header-left nav ul li:nth-child(3) a');
const videos_li      = document.querySelector('.header-left nav ul li:nth-child(4) a');
const games_li       = document.querySelector('.header-left nav ul li:nth-child(5) a');
const contacts_li    = document.querySelector('.header-left nav ul li:nth-child(6) a');
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
const portfolioH3_3  = pH3List[2];//fighting game
const portfolioH3_4  = pH3List[3];//Retro PC 3d model
const portfolioH3_5  = pH3List[4];//Sneakers Shop web app
const portfolioH3_6  = pH3List[5];//Comics app
const portfolioH3_7  = pH3List[6];//Replica of Spirit Breaker
const portfolioH3_8  = pH3List[7];//Finance app
const portfolioH3_9  = pH3List[8];//Parkour game
const portfolioH3_10 = pH3List[9];//Web app of "Puppets Theater"
const portfolioH3_11 = pH3List[10];//Kanban web site
const portfolioH3_12 = pH3List[11];//Notepad app
const pPList         = document.querySelectorAll('.portfolio-grid .portfolio-item p');
const portfolioP_1   = pPList[0];//race game
const portfolioP_2   = pPList[1];//runner game
const portfolioP_3   = pPList[2];//fighting game
const portfolioP_4   = pPList[3];//Retro PC 3d model
const portfolioP_5   = pPList[4];//Sneakers Shop web app
const portfolioP_6   = pPList[5];//Comics app
const portfolioP_7   = pPList[6];//Replica of Spirit Breaker
const portfolioP_8   = pPList[7];//Finance app
const portfolioP_9   = pPList[8];//Parkour game
const portfolioP_10  = pPList[9];//Web app of "Puppets Theater"
const portfolioP_11  = pPList[10];//Kanban web site
const portfolioP_12  = pPList[11];//Notepad app
//videos section
const videosH2       = document.querySelector('.videos h2');
//games section
const gamesH2        = document.querySelector('.games h2');
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
        logoEl.textContent         = data[lang].logo;
        //header-left elements 
        aboutMe_li.textContent     = data[lang].aboutMe_li_;
        skills_li.textContent      = data[lang].skills_li_;
        portfolio_li.textContent   = data[lang].portfolio_li_;
        games_li.textContent       = data[lang].games_li_;
        videos_li.textContent      = data[lang].videos_li_;
        contacts_li.textContent    = data[lang].contacts_li_;
        //about section 
        aboutH2.textContent        = data[lang].aboutH2_;
        aboutP.textContent         = data[lang].aboutP_;
        aboutCBtn.textContent      = data[lang].aboutCBtn_;
        //skills section 
        skillsH2.textContent       = data[lang].skillsH2_;
        //portfolio section 
        portfolioH2.textContent    = data[lang].portfolioH2_;
        portfolioH3_1.textContent  = data[lang].portfolioH3_1_;
        portfolioH3_2.textContent  = data[lang].portfolioH3_2_;
        portfolioH3_3.textContent  = data[lang].portfolioH3_3_;
        portfolioH3_4.textContent  = data[lang].portfolioH3_4_;
        portfolioH3_5.textContent  = data[lang].portfolioH3_5_;
        portfolioH3_6.textContent  = data[lang].portfolioH3_6_;
        portfolioH3_7.textContent  = data[lang].portfolioH3_7_;
        portfolioH3_8.textContent  = data[lang].portfolioH3_8_;
        portfolioH3_9.textContent  = data[lang].portfolioH3_9_;
        portfolioH3_10.textContent = data[lang].portfolioH3_10_;
        portfolioH3_11.textContent = data[lang].portfolioH3_11_;
        portfolioH3_12.textContent = data[lang].portfolioH3_12_;

        portfolioP_1.textContent   = data[lang].portfolioP_1_;
        portfolioP_2.textContent   = data[lang].portfolioP_2_;
        portfolioP_3.textContent   = data[lang].portfolioP_3_;
        portfolioP_4.textContent   = data[lang].portfolioP_4_;
        portfolioP_5.textContent   = data[lang].portfolioP_5_;
        portfolioP_6.textContent   = data[lang].portfolioP_6_;
        portfolioP_7.textContent   = data[lang].portfolioP_7_;
        portfolioP_8.textContent   = data[lang].portfolioP_8_;
        portfolioP_9.textContent   = data[lang].portfolioP_9_;
        portfolioP_10.textContent  = data[lang].portfolioP_10_;
        portfolioP_11.textContent  = data[lang].portfolioP_11_;
        portfolioP_12.textContent  = data[lang].portfolioP_12_;
        //videos section
        videosH2.textContent       = data[lang].videosH2_;
        //games section
        gamesH2.textContent        = data[lang].gamesH2_;
        //contacts section
        contactsH2.textContent     = data[lang].contactsH2_;
        contactsBtn.textContent    = data[lang].contactsBtn_;
        //Location section
        locationH3.textContent     = data[lang].locationH3_;
        //social links section
        aboutWebsite.textContent   = data[lang].aboutWebsite_;
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
    const defaultLang          = langEl.querySelector('.active').getAttribute('language');
    logoEl.textContent         = data[defaultLang].logo;
    aboutMe_li.textContent     = data[defaultLang].aboutMe_li_;
    skills_li.textContent      = data[defaultLang].skills_li_;
    portfolio_li.textContent   = data[defaultLang].portfolio_li_;
    games_li.textContent       = data[defaultLang].games_li_;
    videos_li.textContent      = data[defaultLang].videos_li_;
    contacts_li.textContent    = data[defaultLang].contacts_li_;
    //about section 
    aboutH2.textContent        = data[defaultLang].aboutH2_;
    aboutP.textContent         = data[defaultLang].aboutP_;
    aboutCBtn.textContent      = data[defaultLang].aboutCBtn_;
    //skills section 
    skillsH2.textContent       = data[defaultLang].skillsH2_;
    //portfolio section
    portfolioH2.textContent    = data[defaultLang].portfolioH2_;
    portfolioH3_1.textContent  = data[defaultLang].portfolioH3_1_;
    portfolioH3_2.textContent  = data[defaultLang].portfolioH3_2_;
    portfolioH3_3.textContent  = data[defaultLang].portfolioH3_3_;
    portfolioH3_4.textContent  = data[defaultLang].portfolioH3_4_;
    portfolioH3_5.textContent  = data[defaultLang].portfolioH3_5_;
    portfolioH3_6.textContent  = data[defaultLang].portfolioH3_6_;
    portfolioH3_7.textContent  = data[defaultLang].portfolioH3_7_;
    portfolioH3_8.textContent  = data[defaultLang].portfolioH3_8_;
    portfolioH3_9.textContent  = data[defaultLang].portfolioH3_9_;
    portfolioH3_10.textContent = data[defaultLang].portfolioH3_10_;
    portfolioH3_11.textContent = data[defaultLang].portfolioH3_11_;
    portfolioH3_12.textContent = data[defaultLang].portfolioH3_12_;

    portfolioP_1.textContent   = data[defaultLang].portfolioP_1_;
    portfolioP_2.textContent   = data[defaultLang].portfolioP_2_;
    portfolioP_3.textContent   = data[defaultLang].portfolioP_3_;
    portfolioP_4.textContent   = data[defaultLang].portfolioP_4_;
    portfolioP_5.textContent   = data[defaultLang].portfolioP_5_;
    portfolioP_6.textContent   = data[defaultLang].portfolioP_6_;
    portfolioP_7.textContent   = data[defaultLang].portfolioP_7_;
    portfolioP_8.textContent   = data[defaultLang].portfolioP_8_;
    portfolioP_9.textContent   = data[defaultLang].portfolioP_9_;
    portfolioP_10.textContent  = data[defaultLang].portfolioP_10_;
    portfolioP_11.textContent  = data[defaultLang].portfolioP_11_;
    portfolioP_12.textContent  = data[defaultLang].portfolioP_12_;
    //videos section
    videosH2.textContent       = data[defaultLang].videosH2_;
    //games section
    gamesH2.textContent        = data[defaultLang].gamesH2_;
    //contacts section
    contactsH2.textContent     = data[defaultLang].contactsH2_;
    contactsBtn.textContent    = data[defaultLang].contactsBtn_;
    //Location section
    locationH3.textContent     = data[defaultLang].locationH3_;
    //social links section
    aboutWebsite.textContent   = data[defaultLang].aboutWebsite_;
    // finally, set the correct toggle‐button label
    updateThemeToggleText();
  })
  .catch(err => console.error('Failed to load translations:', err));

function activateGame(element) {
    const gameUrl = element.getAttribute('data-src');
    
    // Create the iframe string
    const iframeHtml = `
        <iframe src="${gameUrl}" 
                allowtransparency="true" 
                width="485" height="402" 
                frameborder="0" scrolling="no" 
                allowfullscreen>
        </iframe>`;
    
    // Replace the placeholder content with the iframe
    element.innerHTML = iframeHtml;
    
    // Remove the click event so it doesn't reload if clicked again
    element.onclick = null;
}