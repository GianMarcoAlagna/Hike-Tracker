document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.text-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const long = document.querySelector('#long');
        const lat = document.querySelector('#lat');
        const url = `https://api.sunrisesunset.io/json?lat=${lat.value}&lng=${long.value}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const form = document.querySelector('.text-form');
            form.style.animation = 'close-form 1s';
            
            setTimeout(() => {
                form.style.display = 'none';
                const info = document.createElement('div');
                info.classList.add('info-box');

                const goldenHour = document.createElement('h3');
                goldenHour.innerText = data.results.golden_hour;
                info.appendChild(goldenHour);
                document.body.appendChild(info);
            }, 1001);
        })
        .catch(error => console.error('Error:', error))
        // display sunrise, golden hour, and sunset
        
    });
});


//function logToBackgroundConsole(message) {
//  chrome.extension.getBackgroundPage().console.log(message);
//}