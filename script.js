document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.text-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const long = document.querySelector('#long').value;
        const lat = document.querySelector('#lat').value;
        const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const info = document.createElement('div');
            // info.className = 'info-box'; this works too, just less fancy
            info.classList.add('info-box');
            const goldenHour = document.createElement('h3');
            goldenHour.innerText = data.results.golden_hour;
            info.appendChild(goldenHour);
            document.body.appendChild(info);
        })
        .catch(error => console.error('Error:', error))
        // display sunrise, golden hour, and sunset
        
    });
});


//function logToBackgroundConsole(message) {
//  chrome.extension.getBackgroundPage().console.log(message);
//}