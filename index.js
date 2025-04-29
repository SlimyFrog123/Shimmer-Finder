const guideMap = {
    0: {
        'name': 'Joe',
        'value': 0
    },
    1: {
        'name': 'Connor',
        'value': 0.0278
    },
    2: {
        'name': 'Tanner',
        'value': 0.0566
    },
    3: {
        'name': 'Wyatt',
        'value': 0.0833
    },
    4: {
        'name': 'Cody',
        'value': 0.1111
    },
    5: {
        'name': 'Levi',
        'value': 0.1389
    },
    6: {
        'name': 'Luke',
        'value': 0.1667
    },
    7: {
        'name': 'Jack',
        'value': 0.1944
    },
    8: {
        'name': 'Scott',
        'value': 0.2222
    },
    9: {
        'name': 'Logan',
        'value': 0.25
    },
    10: {
        'name': 'Cole',
        'value': 0.2778
    },
    11: {
        'name': 'Asher',
        'value': 0.3056
    },
    12: {
        'name': 'Bradley',
        'value': 0.3333
    },
    13: {
        'name': 'Jacob',
        'value': 0.3611
    },
    14: {
        'name': 'Garrett',
        'value': 0.3889
    },
    15: {
        'name': 'Dylan',
        'value': 0.4167
    },
    16: {
        'name': 'Maxwell',
        'value': 0.4444
    },
    17: {
        'name': 'Steve',
        'value': 0.4722
    },
    18: {
        'name': 'Brett',
        'value': 0.5
    },
    19: {
        'name': 'Andrew',
        'value': 0.5278
    },
    20: {
        'name': 'Harley',
        'value': 0.5556
    },
    21: {
        'name': 'Kyle',
        'value': 0.5833
    },
    22: {
        'name': 'Jake',
        'value': 0.6111
    },
    23: {
        'name': 'Ryan',
        'value': 0.6389
    },
    24: {
        'name': 'Jeffrey',
        'value': 0.6667
    },
    25: {
        'name': 'Seth',
        'value': 0.6944
    },
    26: {
        'name': 'Marty',
        'value': 0.7222
    },
    27: {
        'name': 'Brandon',
        'value': 0.75
    },
    28: {
        'name': 'Zach',
        'value': 0.7778
    },
    29: {
        'name': 'Jeff',
        'value': 0.8056
    },
    30: {
        'name': 'Daniel',
        'value': 0.8333
    },
    31: {
        'name': 'Trent',
        'value': 0.8611
    },
    32: {
        'name': 'Kevin',
        'value': 0.8889
    },
    33: {
        'name': 'Brian',
        'value': 0.9167
    },
    34: {
        'name': 'Colin',
        'value': 0.9444
    },
    35: {
        'name': 'Jan',
        'value': 0.9722
    },
};

const jungleMap = {
    'left': {
        'small': (num) => 3800 - 524 * num,
        'medium': (num) => 6000 - 1008 * num,
        'large': (num) => 8000 - 1448 * num
    },
    'right': {
        'small': (num) => 3276 + 524 * num,
        'medium': (num) => 4992 + 1008 * num,
        'large': (num) => 6552 + 1448 * num
    }
};

document.addEventListener('DOMContentLoaded', () => {
    let loadingContent = document.getElementById('loadingContent');
    let mainContent = document.getElementById('mainContent');
    let form = document.getElementById('appForm');
    let nameSelect = document.getElementById('nameSelect');
    let resultElement = document.getElementById('shimmerLocation');

    function getGuideId() {
        return parseInt(nameSelect.value);
    }
    
    function getWorldSize() {
        return document.querySelector('input[name="world_size"]:checked').value;
    }

    function getJungleSide() {
        return document.querySelector('input[name="jungle_side"]:checked').value;
    }

    function addGuideOptions() {
        for (let i = 0; i < Object.keys(guideMap).length; i++) {
            // Get the guide instance.
            let guide = guideMap[i];

            // Create the option.
            let option = document.createElement('option');

            // Populate the option with the guide's information.
            option.innerText = guide['name'];
            option.value = i;

            // Add the option to the select element.
            nameSelect.appendChild(option);
        }
    }

    function calculateShimmerLocation() {
        let jungleSide = getJungleSide(); // Get the selected jungle side.
        let jungle = jungleMap[jungleSide]; // Get the jungle map based on its side.
        let calculationMethod = jungle[getWorldSize()]; // Get the calculation method based on the size of the world.
        let guideInstance = guideMap[getGuideId()]; // Get the selected Guide's instance.
        let shimmerLocation = Math.trunc(calculationMethod(guideInstance['value'])); // Calculate the location of the shimmer.
        let direction = jungleSide == 'left' ? 'West' : 'East'; // Calculate the direction of the shimmer.

        // Update the results.
        resultElement.innerHTML = `The shimmer is located at <span class="font-bold">${shimmerLocation}' ${direction}</span>`;
    }

    form.addEventListener('change', () => {
        calculateShimmerLocation()
    });

    // Set up.
    addGuideOptions();

    // Hide the loading content and show the main content.
    loadingContent.classList.add('hidden');
    mainContent.classList.remove('hidden');

    // Start the calculation.
    calculateShimmerLocation();
});