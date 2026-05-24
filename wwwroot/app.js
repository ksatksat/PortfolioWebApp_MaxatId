document.addEventListener('DOMContentLoaded', () => {
// ============================= THEME =============================
const themeToggleBtn = document.getElementById('theme-toggle');
const body           = document.body;

// ============================= TRANSLATION =============================
const langEl      = document.querySelector('.langWrap');
const links       = document.querySelectorAll('.langWrap a');
const logoEl      = document.querySelector('.logo');
const aboutMe_li  = document.querySelector('.header-left nav ul li:nth-child(1) a');
const skills_li   = document.querySelector('.header-left nav ul li:nth-child(2) a');
const portfolio_li= document.querySelector('.header-left nav ul li:nth-child(3) a');
const videos_li   = document.querySelector('.header-left nav ul li:nth-child(4) a');
const games_li    = document.querySelector('.header-left nav ul li:nth-child(5) a');
const contacts_li = document.querySelector('.header-left nav ul li:nth-child(6) a');
const aboutH2     = document.querySelector('.about h2');
const aboutP      = document.querySelector('.about p');
const aboutCBtn   = document.querySelector('.contact-btn');
const skillsH2    = document.querySelector('.skills h2');
const portfolioH2 = document.querySelector('.portfolio h2');
const videosH2    = document.querySelector('.videos h2');
const gamesH2     = document.querySelector('.games h2');
const contactsH2  = document.querySelector('.contacts h2');
const contactsBtn = document.querySelector('.contact-form button');
const locationH3  = document.querySelector('.footer-content h3');
const aboutWebsite= document.querySelector('.aboutWebsite');

let data; // holds translations
let portfolioItems = []; // holds portfolio items from DB
let currentLang = 'english'; // tracks active language

// ============================= CONTACT BUTTON =============================
document.getElementById('contact-btn').addEventListener('click', function() {
    document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
});

// ============================= THEME =============================
function updateThemeToggleText() {
    if (body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = data[currentLang].theme_toggle_light;
    } else {
        themeToggleBtn.textContent = data[currentLang].theme_toggle_dark;
    }
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
    updateThemeToggleText();
}

themeToggleBtn.addEventListener('click', toggleTheme);

// ============================= PORTFOLIO RENDER =============================
function getPortfolioTitle(item, lang) {
    if (lang === 'kyrgyz'  && item.titleKy)  return item.titleKy;
    if (lang === 'russian' && item.titleRu)  return item.titleRu;
    return item.title;
}

function getPortfolioDescription(item, lang) {
    if (lang === 'kyrgyz'  && item.descriptionKy) return item.descriptionKy;
    if (lang === 'russian' && item.descriptionRu) return item.descriptionRu;
    return item.description;
}

function renderPortfolio(lang) {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (portfolioItems.length === 0) {
        grid.innerHTML = '<p style="color:#888;">No portfolio items yet.</p>';
        return;
    }

    portfolioItems.forEach(item => {
        const title       = getPortfolioTitle(item, lang);
        const description = getPortfolioDescription(item, lang);

        const div = document.createElement('div');
        div.className = 'portfolio-item';

        div.innerHTML = `
            ${item.imageUrl
                ? `<img src="${item.imageUrl}" alt="${title}">`
                : ''}
            <h3>${title}</h3>
            <p>${description}</p>
            ${item.projectUrl
                ? `<a href="${item.projectUrl}" target="_blank" 
                      rel="noopener noreferrer">${item.projectUrl}</a>`
                : ''}
        `;
        grid.appendChild(div);
    });
}

async function loadPortfolioItems() {
    try {
        const res = await fetch('/api/portfolio');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        portfolioItems = await res.json();
        renderPortfolio(currentLang);
    } catch (err) {
        console.error('Failed to load portfolio items:', err);
    }
}

// ============================= LANGUAGE SWITCH =============================
function applyLanguage(lang) {
    currentLang = lang;

    logoEl.textContent          = data[lang].logo;
    aboutMe_li.textContent      = data[lang].aboutMe_li_;
    skills_li.textContent       = data[lang].skills_li_;
    portfolio_li.textContent    = data[lang].portfolio_li_;
    games_li.textContent        = data[lang].games_li_;
    videos_li.textContent       = data[lang].videos_li_;
    contacts_li.textContent     = data[lang].contacts_li_;
    aboutH2.textContent         = data[lang].aboutH2_;
    aboutP.innerHTML            = data[lang].aboutP_;
    aboutCBtn.textContent       = data[lang].aboutCBtn_;
    skillsH2.textContent        = data[lang].skillsH2_;
    portfolioH2.textContent     = data[lang].portfolioH2_;
    videosH2.textContent        = data[lang].videosH2_;
    gamesH2.textContent         = data[lang].gamesH2_;
    contactsH2.textContent      = data[lang].contactsH2_;
    contactsBtn.textContent     = data[lang].contactsBtn_;
    locationH3.textContent      = data[lang].locationH3_;
    aboutWebsite.textContent    = data[lang].aboutWebsite_;

    // Re-render portfolio in the new language
    renderPortfolio(lang);
    updateThemeToggleText();
}

links.forEach(el => {
    el.addEventListener('click', () => {
        langEl.querySelector('.active').classList.remove('active');
        el.classList.add('active');
        const lang = el.getAttribute('language');
        applyLanguage(lang);
    });
});

// ============================= INIT =============================

fetch('/data.json')
    .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    })
    .then(json => {
        data = json;
        const defaultLang = langEl.querySelector('.active').getAttribute('language');
        applyLanguage(defaultLang);
        // Load portfolio from DB after translations are ready
        loadPortfolioItems();
    })
    .catch(err => console.error('Failed to load translations:', err));



// ============================= CONTACT FORM =============================
document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name    = document.querySelector('.contact-form input[type="text"]').value;
    const email   = document.querySelector('.contact-form input[type="email"]').value;
    const message = document.querySelector('.contact-form textarea').value;
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });
        if (response.ok) {
            alert('Message sent successfully!');
            e.target.reset();
        } else {
            alert('Something went wrong. Please try again.');
        }
    } catch (err) {
        alert('Could not connect to server.');
        console.error(err);
    }
});

// ============================= VISITOR COUNTER =============================
fetch('/api/visitor')
    .then(res => res.json())
    .then(data => {
        document.querySelector('.visits').textContent =
            `Баруулар: | Визиты: | Visits: ${data.visits}`;
    })
    .catch(err => console.error('Visitor counter error:', err));
});

// ============================= GAME LOADER =============================
function activateGame(element) {
    const gameUrl = element.getAttribute('data-src');
    const iframeHtml = `
        <iframe src="${gameUrl}" 
                allowtransparency="true" 
                width="485" height="402" 
                frameborder="0" scrolling="no" 
                allowfullscreen>
        </iframe>`;
    element.innerHTML = iframeHtml;
    element.onclick = null;
}