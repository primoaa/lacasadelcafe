const viewer = document.getElementById('viewer');
const pageNav = document.getElementById('page-nav');
const totalPages = 12;

const pageImages = [
    'page1.png', 'page2.png', 'page3.png', 'page4.png',
    'page5.png', 'page6.png', 'page7.png', 'page8.png',
    'page9.png', 'page10.png', 'page11.png', 'page12.png'
];

const buttonNames = [
    'Menu', 'Bienvenue', 'Café & Thé', 'Milkshake & Frappuccino',
    'Ice Coffee & Ice Tea', 'les JUS', 'Mojito & Energy Drinks', 'Crepe & Gaufre',
    'Churros', 'Tacos & Pizza', 'Burger & Panini & Shawarma', 'Thank you'
];

// Create and append images
pageImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Page ${index + 1}`;
    img.className = 'page-image';
    img.id = `page${index + 1}`;
    viewer.appendChild(img);

    // Create navigation button for each page
    const button = document.createElement('button');
    button.textContent = buttonNames[index];
    button.className = 'nav-button';
    button.onclick = () => {
        document.getElementById(`page${index + 1}`).scrollIntoView({ behavior: 'smooth' });
        setActiveButton(button);
    };
    pageNav.appendChild(button);
});

function setActiveButton(activeButton) {
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Highlight current page in navigation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const pageNum = entry.target.id.replace('page', '');
            const activeButton = document.querySelectorAll('.nav-button')[parseInt(pageNum) - 1];
            setActiveButton(activeButton);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.page-image').forEach(img => observer.observe(img));

// Set initial focus and active state to the first button
window.addEventListener('load', () => {
    const firstButton = document.querySelector('.nav-button');
    firstButton.focus();
    setActiveButton(firstButton);
});

// Function to scroll to a specific page
function scrollToPage(pageNumber) {
    const pageElement = document.getElementById(`page${pageNumber}`);
    if (pageElement) {
        pageElement.scrollIntoView({ behavior: 'smooth' });
        setActiveButton(document.querySelectorAll('.nav-button')[pageNumber - 1]);
    }
}

// Add keyboard navigation
document.addEventListener('keydown', (event) => {
    const activeButton = document.querySelector('.nav-button.active');
    if (!activeButton) return;

    const activeIndex = Array.from(document.querySelectorAll('.nav-button')).indexOf(activeButton);

    if (event.key === 'ArrowUp' && activeIndex > 0) {
        scrollToPage(activeIndex);
    } else if (event.key === 'ArrowDown' && activeIndex < totalPages - 1) {
        scrollToPage(activeIndex + 2);
    }
});

// Handle hash change for direct links
window.addEventListener('hashchange', () => {
    const pageNumber = parseInt(window.location.hash.replace('#page', ''));
    if (pageNumber && pageNumber > 0 && pageNumber <= totalPages) {
        scrollToPage(pageNumber);
    }
});

// Scroll to page from URL hash on initial load
window.addEventListener('load', () => {
    const pageNumber = parseInt(window.location.hash.replace('#page', ''));
    if (pageNumber && pageNumber > 0 && pageNumber <= totalPages) {
        scrollToPage(pageNumber);
    }
});

