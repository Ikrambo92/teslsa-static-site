const topbar = document.querySelector('#top-bar');
const exteriorColourSelection = document.querySelector('#exterior-buttons');
const interiorColourSelection = document.querySelector('#interior-buttons');
const exteriorImage = document.querySelector('#exterior-image');
const interiorImage = document.querySelector('#interior-image');
const wheelsButtonsSection = document.querySelector('#wheels-options');
const performanceBtn = document.querySelector('#performance-btn');
const totalPriceElement = document.querySelector('#total-price');


let selectedColour = 'Stealth Grey'
const basePrice = 60000;
let currentPrice = basePrice;

const pricing = {
    'Performance Wheels': 2000,
    'Performance Package': 5000,
    'Full Self-Driving': 8000,
    'Accessesories': {
        'Center Console Trays': 35,
        'Sunshade': 105,
        'All-weather Interior Liners': 225,
    }
}

const selectedOptions = {
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving': false
}

const updateTotalPrice = () => {
    currentPrice = basePrice;
    if (selectedOptions['Performance Wheels']) {
        currentPrice += pricing['Performance Wheels'];
    }
    if (selectedOptions['Performance Package']) {
        console.log(pricing['Performance Package']);
        currentPrice += pricing['Performance Package']
    }

    totalPriceElement.textContent = `£${currentPrice.toLocaleString()}`;

};


// handles the topbar visibility
function hideTopbarWhenScrolled() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
        topbar.style.visibility = 'hidden';
    } else {
        topbar.style.visibility = 'visible';
    }
}

// Image mapping
const exteriorImages = {
    'Deep Blue': './images/model-y-deep-blue-metallic.jpg',
    'Solid Black': './images/model-y-solid-black.jpg',
    'Stealth Grey': './images/model-y-stealth-grey.jpg',
    'Pearl White': './images/model-y-pearl-white.jpg',
    'Quicksilver': './images/model-y-quicksilver.jpg',
    'Ultra Red': './images/model-y-ultra-red.jpg'
};

const interiorImages = {
    'Dark': './images/model-y-interior-dark.jpg',
    'Light': './images/model-y-interior-light.jpg'
}

// handles the colour selection buttons
function handlerColourButtonClick(event) {
    let button;
    if (event.target.tagName === 'IMG') {
        button = event.target.closest('button')
    } else if (event.target.tagName === 'button') {
        button = event.target;
    }

    if (button) {
        const buttons = event.currentTarget.querySelectorAll('button');
        buttons.forEach(button => button.classList.remove('btn-selected'));
        button.classList.add('btn-selected');

        // Update the exterior image
        if (event.currentTarget === exteriorColourSelection) {
            selectedColour = button.querySelector('img').alt;
            updateExteriorImage();
        }

        // Update the interior image
        if (event.currentTarget === interiorColourSelection) {
            interiorImage.src = interiorImages[button.querySelector('img').alt];
        }

    }
};

const updateExteriorImage = () => {
    const performanceSuffix = selectedOptions['Performance Wheels'] ? '-performance' : '';
    const colourKey = selectedColour in exteriorImages ? selectedColour : 'Stealth Grey';
    exteriorImage.src = exteriorImages[colourKey].replace('.jpg', `${performanceSuffix}.jpg`);
}

// Wheel section
const handleWheelButtonClick = (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttons = document.querySelectorAll('#wheels-options button');
        buttons.forEach((button) => button.classList.remove('bg-gray-700', 'text-white'));

        // Add styles to the selected button
        event.target.classList.add('bg-gray-700', 'text-white');

        selectedOptions['Performance Wheels'] = event.target.textContent.includes('Performance');

        updateExteriorImage();
        updateTotalPrice();
    }
}

const handlePerformanceButtonClick = () => {
    const isSelected = performanceBtn.classList.toggle('bg-gray-700');
    performanceBtn.classList.toggle('text-white');

    selectedOptions['Performance Wheels'] = isSelected;
    updateTotalPrice();

}

window.addEventListener('scroll', hideTopbarWhenScrolled);
exteriorColourSelection.addEventListener('click', handlerColourButtonClick);
interiorColourSelection.addEventListener('click', handlerColourButtonClick);
wheelsButtonsSection.addEventListener('click', handleWheelButtonClick);
performanceBtn.addEventListener('click', handlePerformanceButtonClick);
